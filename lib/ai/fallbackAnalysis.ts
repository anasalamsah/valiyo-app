import { DOMAIN_LABEL_ID } from "@/lib/ai/domainLabels";
import { generatePersonalizedRoadmap } from "@/lib/ai/roadmapGenerator";
import type { AssessmentChildProfile, DiscoveryAssessment } from "@/types/discoveryAssessment";

/**
 * Ported from the (now-retired) external Discovery app's
 * generateFallbackAnalysis. Deterministic pattern-matching over the raw
 * domain scores — used whenever GEMINI_API_KEY is missing or the Gemini
 * call itself fails, so a parent always gets a real, useful report instead
 * of an error page.
 */
export function generateFallbackAnalysis(
  childProfile: AssessmentChildProfile,
  domainScores: Record<string, number>
): Omit<DiscoveryAssessment, "id" | "uid" | "childId" | "status" | "answers" | "createdAt" | "updatedAt" | "completedAt" | "pdfUrl"> {
  const sortedDomains = Object.entries(domainScores).sort(([, a], [, b]) => b - a);
  const top5 = sortedDomains.slice(0, 5);
  const bottom3 = sortedDomains.slice(-3);
  const age = Number(childProfile.age) || 5;

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return "Tinggi";
    if (score >= 60) return "Sedang";
    return "Perlu Stimulasi Warm";
  };

  const label = (domain: string) => DOMAIN_LABEL_ID[domain as keyof typeof DOMAIN_LABEL_ID] || domain;

  const mathScore = domainScores["Mathematics"] || 75;
  const codingScore = (domainScores["Computational Thinking"] || 70) + (domainScores["Logic"] || 70) / 2;
  const creatScore = domainScores["Creativity"] || 80;
  const sciScore = (domainScores["Science"] || 70) + (domainScores["Curiosity"] || 80) / 2;
  const langScore = (domainScores["Language"] || 75) + (domainScores["Communication"] || 75) / 2;

  let traitOlympiad = "Penalaran Pola & Logika Gambar Usia Dini";
  let traitCoding = "Berpikir Sekuensial & Pola Algoritma Unplugged";
  let traitMath = "Konsep Angka, Ukuran, & Perbandingan Benda";
  let traitSci = "Pengamatan Eksperimen Alam & Rasa Ingin Tahu";
  let academies = [
    {
      name: "Klub Sains & Eksperimen Cilik",
      type: "Eksplorasi Sains",
      reason: "Mengakomodasi rasa ingin tahu tinggi melalui eksperimen air dan tanaman aman.",
    },
    {
      name: "Sanggar Seni & Storytelling Kreatif",
      type: "Seni & Ekspresi",
      reason: "Menyalurkan imajinasi visual dan kemampuan bercerita ke tingkat terarah.",
    },
    {
      name: "Valiyo Math & Robotics Unplugged",
      type: "Logika & Coding Usia Dini",
      reason: "Mengasah daya penalaran logika tanpa dependensi layar gadget berlebih.",
    },
  ];
  const homeActivities = [
    {
      title: "1. Sorter Kancing & Biji-bijian",
      itemNeeded: "Kancing baju / mangkuk kecil",
      instruction: "Minta anak memisahkan kancing berdasarkan warna dan ukuran ke mangkuk yang berbeda.",
      benefit: "Melatih klasifikasi matematika dasar dan motorik halus.",
    },
    {
      title: "2. Eksperimen Es Mencair & Garam",
      itemNeeded: "Es batu, garam dapur, pewarna makanan",
      instruction:
        "Teteskan pewarna di atas es batu, lalu taburkan sedikit garam dan amati pola celah es yang meleleh.",
      benefit: "Mengenalkan reaksi fisika sederhana dengan cara ajaib.",
    },
    {
      title: "3. Labirin Tali Tisu di Koridor",
      itemNeeded: "Tali rafia / pita / tisu gulung",
      instruction: "Tempelkan pita bersilangan di lorong rumah, minta anak melewati rintangan tanpa menyenggol pita.",
      benefit: "Mengasah kesadaran spasial dan kontrol koordinasi tubuh.",
    },
    {
      title: "4. Menara Gelas Plastik Bertingkat",
      itemNeeded: "Gelas plastik bekas 10-15 buah",
      instruction: "Ajak anak menyusun piramida gelas setinggi mungkin lalu hitung jumlah gelas yang terpakai.",
      benefit: "Belajar konsep keseimbangan, kestabilan, dan bilangan.",
    },
    {
      title: "5. Musik Botol Air Berwarna",
      itemNeeded: "3-4 botol kaca/plastik + air beda ketinggian",
      instruction:
        "Isi air dengan tinggi bervariasi, minta anak mengetuk pelan menggunakan sendok kayu untuk mendengar beda nada.",
      benefit: "Mengeksplorasi akustik nada dan variasi frekuensi suara.",
    },
    {
      title: "6. Menembak Bayangan Senter",
      itemNeeded: "Senter kecil + mainan karakter",
      instruction:
        "Sorotkan senter ke dinding di ruangan agak redup, bentuk bayangan tangan/mainan dan buat pertunjukan teater.",
      benefit: "Stimulasi imajinasi naratif dan konsep optik sains.",
    },
    {
      title: "7. Kolase Daun & Ranting Halaman",
      itemNeeded: "Daun gugur, lem kertas, HVS",
      instruction: "Kumpulkan daun beraneka bentuk di halaman rumah, tempel membentuk hewan kesukaan.",
      benefit: "Mengasah kreativitas alami dan apresiasi keanekaragaman flora.",
    },
    {
      title: '8. Teka-teki "Mana Yang Hilang?"',
      itemNeeded: "5 benda kecil di atas nampan (sendok, kunci, dsb)",
      instruction: "Minta anak menutup mata, sembunyikan 1 benda, lalu minta anak menebak benda apa yang hilang.",
      benefit: "Sangat ampuh melatih memori kerja dan fokus visual.",
    },
    {
      title: "9. Restoran Imajinasi Piring Kertas",
      itemNeeded: "Piring kertas, spidol, makanan mainan",
      instruction:
        "Anak berperan sebagai koki/pelayan yang mencatat pesanan orang tua dan menyiapkan porsi sesuai jumlah.",
      benefit: "Mengembangkan kecerdasan sosial, bahasa, dan hitung sederhana.",
    },
    {
      title: "10. Balap Perahu Kertas di Waskom",
      itemNeeded: "Kertas bekas dilipat perahu + waskom air",
      instruction: "Tiup perahu kertas dari satu sisi washbasin ke sisi lain dengan kekuatan tiupan berbeda.",
      benefit: "Belajar gaya dorong, dinamika udara, serta regulasi pernapasan.",
    },
  ];

  if (age <= 3) {
    traitOlympiad = "Pengenalan Bentuk, Warna, & Sortir Sederhana Usia Batita";
    traitCoding = "Sebab-Akibat Fisik & Sekuens Lapis Dasar";
    traitMath = "Pengenalan Jumlah Benda (1-5) & Pasangan Bentuk";
    traitSci = "Sensori Tekstur, Air, & Suara Benda Alam";
    academies = [
      {
        name: "Klub Sensori & Motorik Dini",
        type: "Sensori Batita",
        reason: "Menstimulasi pancaindra dan refleks motorik secara eksploratif.",
      },
      {
        name: "Sanggar Musik & Gerak Balita",
        type: "Auditori & Ritme",
        reason: "Mengembangkan kepekaan nada, bahasa, dan irama gerak tubuh.",
      },
      {
        name: "Kelas Bermain Eksplorasi Dini",
        type: "Sosialisasi Balita",
        reason: "Melatih kemampuan sosialisasi dan kemandirian dasar dengan menyenangkan.",
      },
    ];
  } else if (age >= 7 && age <= 9) {
    traitOlympiad = "Logika Matematika SD & Problem Solving Pola Angka";
    traitCoding = "Algoritma Block Coding (Scratch) & Sekuens Logis";
    traitMath = "Penjumlahan, Perkalian Pola, & Geometri Dasar SD";
    traitSci = "Metode Ilmiah, Prediksi Eksperimen, & Observasi Hayati";
    academies = [
      {
        name: "Akademi Matematika Kritis & Logic SD",
        type: "Olimpiade Math SD",
        reason: "Memperkuat penalaran angka, soal cerita, dan pola unik matematika.",
      },
      {
        name: "Sanggar Coding & Game Creator Scratch",
        type: "Pemrograman Block",
        reason: "Menyusun logika algoritma interaktif untuk membuat game dan animasi sendiri.",
      },
      {
        name: "Klub Eksperimen Sains & Robotik SD",
        type: "Sains & Teknologi",
        reason: "Memahami hukum alam, Rube Goldberg machine, dan rakitan mesin sederhana.",
      },
    ];
  } else if (age >= 10) {
    traitOlympiad = "Penalaran Matematika & Sains Kompetitif SD Lanjut";
    traitCoding = "Pemrograman Algoritma, Python Dasar, & Problem Solving";
    traitMath = "Logika Aljabar, Pecahan, Persentase, & Pemecahan Soal Cerita Lanjut";
    traitSci = "Analisis Eksperimen Fisika/Biologi & Proyek Inovasi Sains";
    academies = [
      {
        name: "Akademi Olimpiade Sains & Matematika SD Atas",
        type: "Olimpiade Math/Science",
        reason: "Mempersiapkan kompetisi sains dan logika dengan metode pemecahan masalah mendalam.",
      },
      {
        name: "Young App Developer & Python Coding Club",
        type: "Coding Lanjut",
        reason: "Melatih logika pemrograman teks/block lanjut untuk merancang aplikasi dan game.",
      },
      {
        name: "Klub Literasi Riset & Public Speaking",
        type: "Debat & Komunikasi",
        reason: "Mengasah logika argumen, presentasi karya, dan pemikiran kritis mandiri.",
      },
    ];
  }

  const base = {
    childProfileSnapshot: childProfile,
    domainScores,
    topStrengths: top5.map(([domain, score]) => ({
      title: label(domain),
      domain: label(domain),
      description: `${childProfile.name} menunjukkan potensi luar biasa dalam area ${label(domain)} di usia ${age} tahun dengan kebiasaan positif yang konsisten.`,
      score: Math.round(score),
    })),
    skillsToDevelop: bottom3.map(([domain]) => ({
      title: label(domain),
      domain: label(domain),
      guidance: `Fokus memberikan permainan eksploratif yang menyenangkan dan sesuai tahap perkembangan usia ${age} tahun untuk mengasah ${label(domain)}.`,
    })),
    learningStyle: {
      primary:
        top5[0]?.[0] === "Creativity" || top5[0]?.[0] === "Observation"
          ? "Visual-Eksploratif"
          : top5[0]?.[0] === "Motor Skills"
            ? "Kinestetik-Praktis"
            : "Logis-Sistematis",
      secondary: "Auditori-Interaktif",
      description: `${childProfile.name} (usia ${age} tahun) paling cepat memahami hal baru melalui pendekatan eksplorasi langsung yang menggabungkan benda nyata, contoh visual, dan ruang berkreasi.`,
      tips: [
        "Gunakan media gambar berukuran besar atau benda nyata saat menjelaskan konsep baru.",
        "Sediakan jeda bergerak di antara sesi belajar atau membaca buku.",
        "Ajak berdialog aktif dengan memberikan pertanyaan terbuka yang memancing imajinasi.",
      ],
    },
    olympiadReadiness: {
      level: getReadinessLevel(mathScore),
      traitOrFocus: traitOlympiad,
      commentary: `${childProfile.name} memiliki ketertarikan tinggi pada struktur dan pola dasar. Cocok dikenalkan dengan tantangan teka-teki logika yang disesuaikan usia ${age} tahun.`,
    },
    codingReadiness: {
      level: getReadinessLevel(codingScore),
      traitOrFocus: traitCoding,
      commentary: `${childProfile.name} siap belajar dasar pemikiran komputasional melalui permainan instruksi fisik dan pemecahan masalah berjenjang.`,
    },
    creativityPotential: {
      level: getReadinessLevel(creatScore),
      traitOrFocus: age <= 5 ? "Imajinasi Ekspresif & Bermain Peran" : "Kreativitas Solutif & Desain Karya",
      commentary: `Potensi imajinasi yang hangat dan kaya. Terlihat dari antusiasmenya mengekspresikan ide melalui karya, cerita, atau gagasan unik.`,
    },
    scienceCuriosity: {
      level: getReadinessLevel(sciScore),
      traitOrFocus: traitSci,
      commentary: `Rasa ingin tahu yang alami mengenai fenomena di sekitarnya. Terus dukung dengan percobaan relevan untuk usia ${age} tahun.`,
    },
    mathematicalThinking: {
      level: getReadinessLevel(mathScore),
      traitOrFocus: traitMath,
      commentary: `Pengenalan kuantitas dan logika matematika berjalan sangat alami melalui aktivitas harian.`,
    },
    languageDevelopment: {
      level: getReadinessLevel(langScore),
      traitOrFocus: age <= 6 ? "Kosakata & Komunikasi Ekspresif" : "Literasi Kritis & Komunikasi Argumentatif",
      commentary: `Anak memiliki pemahaman komunikasi yang baik dan percaya diri saat mengekspresikan gagasan maupun emosinya.`,
    },
    recommendedActivities: [
      {
        title: age <= 6 ? "Misi Detektif Pola Warna & Bentuk" : "Tantangan Pola & Teka-teki Logika SD",
        category: "Logika & Eksplorasi",
        description:
          age <= 6
            ? "Ajak anak menemukan benda-benda rumah yang memiliki pola berulang."
            : "Berikan puzzle logika, sudokids, atau tantangan pola matematika bergambar.",
        impact: "Melatih konsentrasi dan kepekaan berpikir struktur.",
      },
      {
        title: age <= 6 ? "Buku Cerita Bergambar Tanpa Kata" : "Jurnal Storytelling & Resensi Buku Favorit",
        category: "Kreativitas & Bahasa",
        description:
          age <= 6
            ? "Minta anak menceritakan kisahnya sendiri dengan melihat alur gambar."
            : "Minta anak menceritakan alur cerita, karakter utama, serta ide kelanjutan cerita.",
        impact: "Meningkatkan imajinasi dan percaya diri dalam berbahasa.",
      },
      {
        title: age <= 6 ? "Arsitek Balok Bangunan & Kardus" : "Proyek Maket / Konstruksi Daur Ulang",
        category: "Spatial & Motorik",
        description:
          "Membuat jembatan, menara, atau maket bangunan dari kardus bekas yang kokoh dan seimbang.",
        impact: "Mengasah pemecahan masalah spasial dan ketelitian.",
      },
    ],
    suggestedAcademy: academies,
    homeActivities,
    schoolRecommendations: [
      {
        area: "Strategi Kelas",
        suggestion:
          age <= 6
            ? 'Berikan peran "Asisten Cilik" saat sesi merapikan alat belajar untuk menyalurkan jiwa kepemimpinan.'
            : "Fasilitasi tantangan studi kasus atau kepemimpinan kelompok kecil dalam proyek kelas.",
      },
      {
        area: "Media Pembelajaran",
        suggestion:
          age <= 6
            ? "Gunakan alat peraga konkret (balok hitung, kartu gambar) sebelum lembar kerja."
            : "Gunakan diagram visual, mind mapping, dan diskusi interaktif berbasis proyek.",
      },
      {
        area: "Dukungan Sosial",
        suggestion:
          "Gabungkan anak dalam kelompok diskusi kecil yang memungkinkannya mengutarakan ide tanpa rasa canggung.",
      },
    ],
    aiSummary: `Halo Ayah dan Bunda dari ${childProfile.name}! Sungguh membahagiakan melihat bagaimana ${childProfile.name} berkembang di usianya yang ke-${age} tahun. Dari jawaban yang disampaikan, ${childProfile.name} memancarkan potensi luar biasa, terutama pada kepekaan ${top5[0] ? label(top5[0][0]) : "Pengamatan"} dan ketertarikannya pada eksplorasi hal baru. ${childProfile.name} adalah pembelajar yang antusias yang paling optimal menyerap wawasan melalui pengalaman eksploratif langsung. Mari terus dampingi tumbuh kembangnya dengan suasana belajar yang penuh kegembiraan dan tanpa tekanan!`,
    radarData: Object.entries(domainScores).map(([domain, score]) => ({
      subject: label(domain),
      score: Math.round(score),
      fullMark: 100,
    })),
    nextMonthGoals: [
      "Menyelesaikan puzzle 30-40 potong secara mandiri",
      "Eksplorasi 3 eksperimen sains sederhana di rumah",
      "Membaca cerita bergambar dan mendiskusikan pesan moral bersama Bunda",
    ],
    parentTips: [
      "Apresiasi proses dan usahanya, bukan sekadar hasil akhir.",
      "Sediakan sudut kreativitas khusus di rumah tempat ia bebas berkreasi.",
      "Jadikan momen sehari-hari (seperti memasak atau berkebun) sebagai sarana belajar seru.",
    ],
    teacherTips: [
      "Beri ruang untuk menyampaikan pendapat saat sesi lingkaran (circle time).",
      "Fasilitasi tantangan permainan berseri sesuai tingkat kecepatannya.",
    ],
  };

  return { ...base, roadmap: generatePersonalizedRoadmap(base) };
}
