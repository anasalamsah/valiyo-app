import type { GrowthRoadmap, StrengthItem, GrowthSkillItem, LearningStyleInfo } from "@/types/discoveryAssessment";

/**
 * Ported from the (now-retired) external Discovery app's roadmapGenerator.
 * Pure/deterministic — no AI call — so it can both backfill a roadmap when
 * Gemini's JSON omits one, and power the offline fallback analysis.
 */
type RoadmapInput = {
  childProfile?: { name?: string; age?: number };
  topStrengths?: StrengthItem[];
  skillsToDevelop?: GrowthSkillItem[];
  learningStyle?: LearningStyleInfo;
};

export function generatePersonalizedRoadmap(result: RoadmapInput): GrowthRoadmap {
  const childName = result.childProfile?.name || "Buah Hati";
  const age = result.childProfile?.age || 5;
  const topStrengthName = result.topStrengths?.[0]?.title || "Kreativitas & Eksplorasi";
  const growthSkillName = result.skillsToDevelop?.[0]?.title || "Atensi & Konsentrasi";
  const learningStylePrimary = result.learningStyle?.primary || "Visual-Eksploratif";

  const lower = topStrengthName.toLowerCase();
  const isLogicOrMath =
    lower.includes("logika") ||
    lower.includes("matematis") ||
    lower.includes("komputasional") ||
    lower.includes("pola");
  const isCreativityOrArt = lower.includes("kreativitas") || lower.includes("imajinasi") || lower.includes("seni");
  const isLanguageOrComm = lower.includes("bahasa") || lower.includes("komunikasi") || lower.includes("cerita");
  const isScienceOrObs = lower.includes("sains") || lower.includes("observasi") || lower.includes("rasa ingin tahu");

  let phase1Goal = `Fokus awal: Menstimulasi domain ${topStrengthName} melalui rutinitas singkat di rumah.`;
  let phase1Actions = [
    `Hitung dan klasifikasikan benda mainan bersama ${childName} sebelum tidur (kurang dari 10 menit).`,
    `Ajak ${childName} menyusun urutan 3 langkah aktivitas harian (contoh: cuci tangan → makan → cuci piring plastik).`,
    `Baca 1 buku cerita bergambar dan berikan pertanyaan terbuka "Kenapa ya?" sebanyak 3 kali.`,
  ];

  if (isLogicOrMath) {
    phase1Goal = `Fokus minggu ini: Mempertajam daya sekuensial dan pengenalan pola alami ${childName}.`;
    phase1Actions = [
      `Ajak ${childName} mengurutkan 5 kancing atau sendok dari ukuran terkecil ke terbesar saat bersiap makan.`,
      `Minta ${childName} menyusun blok mainan dengan aturan pola warna berulang (merah-kuning-merah-kuning).`,
      `Beri tantangan mini 10 menit: "Temukan 3 benda di ruang tamu yang berbentuk lingkaran sempurna!"`,
    ];
  } else if (isCreativityOrArt) {
    phase1Goal = `Fokus minggu ini: Menyalurkan daya imajinasi bebas ${childName} tanpa batasan instruksi kaku.`;
    phase1Actions = [
      `Sediakan kertas bekas dan spidol, biarkan ${childName} menggambar bebas selama 10 menit tanpa dikoreksi.`,
      `Gunakan selimut dan kardus bekas untuk membuat "Pintu Rahasia Istana" bersama ${childName}.`,
      `Ajak ${childName} menciptakan nama pahlawan super baru berdasarkan hewan favoritnya.`,
    ];
  } else if (isLanguageOrComm) {
    phase1Goal = `Fokus minggu ini: Memperkaya kosa kata eksploratif dan rasa percaya diri berkomunikasi.`;
    phase1Actions = [
      `Minta ${childName} menceritakan kembali kejadian paling menyenangkan di sekolah/PAUD hari ini dalam 3 kalimat.`,
      `Mainkan permainan tebak kata: Deskripsikan 1 benda di rumah dari cirinya dan biarkan ${childName} menebaknya.`,
      `Baca 1 halaman buku cerita dan minta ${childName} melanjutkan dialog karakter utama dengan gayanya.`,
    ];
  } else if (isScienceOrObs) {
    phase1Goal = `Fokus minggu ini: Mengasah rasa ingin tahu ilmiah dan kepekaan observasi lingkungan.`;
    phase1Actions = [
      `Ajak ${childName} mengamati 3 jenis daun berbeda di halaman rumah dan meraba tekstur permukaannya.`,
      `Masukkan es batu ke dalam segelas air hangat dan amati proses lelehnya selama 5 menit bersama ${childName}.`,
      `Gunakan senter HP di kamar redup untuk mengamati bayangan benda mainan di dinding.`,
    ];
  }

  const phase2Goal = `Membangun kebiasaan belajar eksploratif mingguan yang menyenangkan tanpa beban berlebih.`;
  let phase2Activities = [
    {
      activity: `Detektif Kancing & Biji (Menggunakan kancing baju / mangkuk dapur)`,
      why: `Aktivitas ini mengasah kemampuan klasifikasi kategori dan koordinasi motorik halus ${childName}.`,
    },
    {
      activity: `Labirin Rintangan Tali Rafia (Tali rafia ditempel di koridor rumah)`,
      why: `Meningkatkan kesadaran spasial, keseimbangan fisik, serta kontrol pemecahan masalah.`,
    },
    {
      activity: `Teka-teki "Benda Mana yang Hilang?" (5 benda kecil di atas piring)`,
      why: `Sangat efektif melatih memori kerja visual dan daya atensi fokus ${childName}.`,
    },
    {
      activity: `Piramida Gelas Plastik Bertingkat (Gelas plastik bekas 10-15 buah)`,
      why: `Mengenalkan konsep keseimbangan arsitektural dan penalaran bilangan secara konkret.`,
    },
    {
      activity: `Restoran Imajinasi Piring Kertas (Piring kertas & spidol warna)`,
      why: `Mengembangkan keterampilan bahasa ekspresif, perhitungan sederhana, dan simulasi sosial.`,
    },
  ];

  if (isLogicOrMath) {
    phase2Activities = [
      {
        activity: `Unplugged Coding Maze (Ubin lantai rumah & mainan karakter)`,
        why: `Melatih logika sekuensial dan penalaran instruksi algoritma dasar tanpa gadget.`,
      },
      {
        activity: `Piramida Gelas Bertingkat (Gelas plastik bekas 12 buah)`,
        why: `Mengasah pemahaman struktur geometris, simetri, serta kestabilan beban.`,
      },
      {
        activity: `Sorter Kancing Berpola (Kancing baju bervariasi warna & mangkuk)`,
        why: `Memperkuat kepekaan penalaran pola matematika dan fokus logika dasar.`,
      },
      {
        activity: `Tebak Benda Hilang (5 benda di atas nampan kayu/plastik)`,
        why: `Sangat efektif mempertajam memori spasial dan daya konsentrasi ${childName}.`,
      },
      {
        activity: `Pengukur Langkah Rumah (Mengukur panjang ruangan dengan langkah kaki)`,
        why: `Mengenalkan konsep estimasi jarak dan perbandingan kuantitas secara langsung.`,
      },
    ];
  } else if (isCreativityOrArt) {
    phase2Activities = [
      {
        activity: `Panggung Teater Bayangan (Senter kecil, kardus bekas, & mainan)`,
        why: `Menyediakan media naratif untuk menyalurkan imajinasi visual dan ekspresi emosi ${childName}.`,
      },
      {
        activity: `Kolase Daun & Ranting Halaman (Daun gugur, lem kertas, HVS)`,
        why: `Mendorong eksplorasi tekstur alami dan kreativitas komposisi bentuk terbuka.`,
      },
      {
        activity: `Arsitek Kardus Bekas (Kardus bekas kemasan makanan & selotip)`,
        why: `Menggabungkan daya cipta imajinatif dengan pemecahan masalah konstruksi nyata.`,
      },
      {
        activity: `Lukisan Cap Jari & Sayur (Potongan pelepah pisang/wortel & pewarna makanan)`,
        why: `Mengasah stimulasi sensori tactile sekaligus kebebasan berkreasi warna.`,
      },
      {
        activity: `Cerita Bergambar Tanpa Kata (Buku bergambar tanpa teks)`,
        why: `Melatih ${childName} mengkonstruksi alur cerita imajinatif secara mandiri.`,
      },
    ];
  }

  const phase3Goal = `Memperkuat dan menyalurkan bakat alami ${childName} ke arena eksplorasi yang lebih terarah.`;

  let phase3Project = {
    title: `Proyek Maket Miniatur Kota Kardus`,
    description: `${childName} merancang dan merakit kompleks jalanan mini dari bahan daur ulang rumah tangga.`,
  };
  let phase3Competition = {
    title: `Tantangan Lego / Puzzle Kreatif Usia Dini`,
    description: `Ikut serta dalam ajang unjuk karya puzzle/balok santai di tingkat sekolah atau komunitas.`,
  };
  let phase3Skill = {
    title: `Berpikir Komputasional Unplugged`,
    description: `Mengenal logika pemecahan masalah terstruktur melalui permainan peta instruksi.`,
  };
  let phase3Academy = {
    title: `Klub Logic & Creative Building Cilik`,
    description: `Program pengayaan mingguan untuk memfasilitasi daya cipta dan logika arsitektural anak.`,
  };

  if (isLogicOrMath) {
    phase3Project = {
      title: age <= 6 ? `Buku Peta Harta Karun & Sandi Bergambar` : `Peta Miniatur Algoritma & Logika Sandi`,
      description: `${childName} membuat peta denah rumah/sekolah dengan kode petunjuk simbol dan logika rute khusus.`,
    };
    phase3Competition = {
      title: age <= 6 ? `Olimpiade Logika & Matematika Visual Usia Dini` : `Olimpiade Matematika & Logic Challenge SD`,
      description: `Mengikuti tantangan pola bergambar dan teka-teki matematika yang disesuaikan usia ${age} tahun.`,
    };
    phase3Skill = {
      title: age <= 6 ? `Coding & Algoritma Unplugged` : `Logic & Block Coding (Scratch/Python Dasar)`,
      description:
        age <= 6
          ? `Belajar merancang rute langkah robot mainan di atas ubin.`
          : `Menyusun logika alur program dan algoritma permainan interaktif.`,
    };
    phase3Academy = {
      title: age <= 6 ? `Valiyo Logic & Unplugged Robotics` : `Valiyo Math & Young Programmer Academy`,
      description: `Akademi pengayaan logika dan struktur berpikir untuk melatih penalaran kritis anak.`,
    };
  } else if (isCreativityOrArt) {
    phase3Project = {
      title: age <= 6 ? `Buku Cerita Pilihan ${childName}` : `Komik & Jurnal Cerita Ilustrasi Kreatif`,
      description: `${childName} merancang ilustrasi dan alur cerita fiksi mandiri dengan bimbingan orang tua.`,
    };
    phase3Competition = {
      title: age <= 6 ? `Festival Gambar & Imajinasi Cilik` : `Lomba Karya Seni & Storytelling Kreatif SD`,
      description: `Menambah pengalaman sosial dan rasa percaya diri mengekspresikan karya di depan umum.`,
    };
    phase3Skill = {
      title: age <= 6 ? `Seni Kriya & Clay Modeling` : `Desain Grafis Cilik & Seni Digital/Kriya`,
      description: `Membentuk karakter 3 dimensi dan mengasah kepekaan warna serta komposisi visual.`,
    };
    phase3Academy = {
      title: `Valiyo Creative Art & Storytelling Studio`,
      description: `Wadah eksplorasi ekspresi visual, cerita, dan seni yang terstruktur serta menyenangkan.`,
    };
  } else if (isScienceOrObs) {
    phase3Project = {
      title: age <= 6 ? `Jurnal Kebun Botanis Cilik` : `Mini Lab & Proyek Riset Lingkungan SD`,
      description: `${childName} melakukan eksperimen sederhana di rumah dan mencatat observasinya secara berkala.`,
    };
    phase3Competition = {
      title: age <= 6 ? `Pameran Eksperimen Sains Cilik` : `Pameran Inovasi Sains & Teknologi SD`,
      description: `Menampilkan demonstrasi rekaan sains dan hasil pengamatan ilmiah yang seru.`,
    };
    phase3Skill = {
      title: age <= 6 ? `Metode Observasi Ilmiah Usia Dini` : `Metode Riset Ilmiah & Pengujian Hipotesis`,
      description: `Menggunakan alat bantu observasi untuk mengamati fenomena alam dan analisis sederhana.`,
    };
    phase3Academy = {
      title: `Valiyo Young Science Explorers Club`,
      description: `Komunitas belajar berbasis praktik eksperimen langsung yang memicu rasa ingin tahu.`,
    };
  }

  const quickWins = [
    `Puji usaha spesifik ${childName} hari ini (contoh: "Bunda bangga kamu gigih mencoba susun balok ini sampai berdiri!").`,
    `Luangkan 8 menit penuh tanpa membendung gadget untuk mendengarkan cerita ${childName} tentang aktivitas favoritnya.`,
    `Berikan 1 tantangan tebak-tebakan menyenangkan berbasis benda di dekat tempat duduk saat ini.`,
  ];

  const summaryText = `${childName} memancarkan keunggulan utama pada domain ${topStrengthName} dengan daya serap belajar ${learningStylePrimary}. Peluang pertumbuhan terbesarnya terletak pada penguatan ${growthSkillName} melalui aktivitas santai tanpa tekanan. Langkah terpenting selanjutnya adalah konsisten memberikan stimulasi mingguan berbasis benda rumah tangga serta mengapresiasi setiap proses usahanya.`;

  return {
    phase1ThisWeek: { goal: phase1Goal, actions: phase1Actions },
    phase2Month1To3: { goal: phase2Goal, activities: phase2Activities },
    phase3Month4To6: {
      goal: phase3Goal,
      project: phase3Project,
      competitionOrChallenge: phase3Competition,
      newSkillToExplore: phase3Skill,
      recommendedAcademy: phase3Academy,
    },
    quickWins,
    aiInsight: {
      biggestStrength: `${topStrengthName} (Skor tinggi dengan minat alami pada kebiasaan ${learningStylePrimary}).`,
      biggestOpportunity: `Pengembangan daya ${growthSkillName} melalui pendekatan bermain yang positif.`,
      mostImportantNextStep: `Jalankan 3 aksi minggu ini secara konsisten selama 10-15 menit sehari di rumah.`,
      summaryText,
    },
  };
}
