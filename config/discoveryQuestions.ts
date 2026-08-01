import type { AnswerOption, DiscoveryQuestion } from "@/types/discoveryQuestion";

/**
 * Ported verbatim from the (now-retired) external Discovery app's question
 * bank — text, domains, and examples are already tested content, not
 * something to rewrite from scratch. Only ANSWER_OPTIONS below was
 * recolored, from the old app's generic rose/amber/emerald/sky palette to
 * Valiyo's actual design tokens.
 */
export const DISCOVERY_QUESTIONS: DiscoveryQuestion[] = [
  {
    id: "q1",
    domain: "Observation",
    domainLabelIndo: "Pengamatan & Observasi",
    text: "Anak saya memperhatikan detail-detail kecil di sekitarnya yang sering terlewat oleh orang dewasa.",
    example:
      "Contoh: Melihat semut membawa makanan, perubahan posisi barang di kamar, atau perbedaan warna daun.",
    iconName: "Eye",
  },
  {
    id: "q2",
    domain: "Memory",
    domainLabelIndo: "Daya Ingat & Memori",
    text: "Anak saya dengan cepat mengingat lirik lagu, tempat yang pernah dikunjungi, atau kejadian beberapa minggu lalu.",
    example: "Contoh: Hapal lagu favorit setelah mendengar 2-3 kali, atau ingat jalan ke rumah nenek.",
    iconName: "Brain",
  },
  {
    id: "q3",
    domain: "Logic",
    domainLabelIndo: "Penalaran & Logika",
    text: "Anak saya gemar menyelesaikan teka-teki, puzzle, atau permainan mencocokkan bentuk.",
    example: "Contoh: Menyusun puzzle 20-30 potong, atau menebak sebab-akibat sederhana.",
    iconName: "Puzzle",
  },
  {
    id: "q4",
    domain: "Curiosity",
    domainLabelIndo: "Rasa Ingin Tahu",
    text: 'Anak saya sering mengajukan pertanyaan "Mengapa?" atau "Bagaimana bisa?" tentang hal-hal baru.',
    example:
      "Contoh: Bertanya mengapa hujan turun, mengapa bulan mengikuti mobil, atau bagaimana mainan bekerja.",
    iconName: "HelpCircle",
  },
  {
    id: "q5",
    domain: "Creativity",
    domainLabelIndo: "Kreativitas & Imajinasi",
    text: "Anak saya suka membuat cerita imajinatif, menggambar bentuk unik, atau bermain peran.",
    example:
      "Contoh: Mengubah kardus bekas menjadi pesawat terbang, atau punya teman imajiner saat bermain.",
    iconName: "Palette",
  },
  {
    id: "q6",
    domain: "Mathematics",
    domainLabelIndo: "Berpikir Matematis",
    text: "Anak saya secara alami suka menghitung benda-benda di sekitar dan membandingkan ukurannya.",
    example: "Contoh: Menghitung buah di piring, membandingkan mana yang lebih tinggi atau lebih berat.",
    iconName: "Calculator",
  },
  {
    id: "q7",
    domain: "Language",
    domainLabelIndo: "Kemampuan Bahasa",
    text: "Anak saya senang mendengarkan dongeng, bercerita kembali, dan menggunakan kosakata baru.",
    example: "Contoh: Menceritakan kembali kejadian di TK dengan kalimat yang terstruktur dan lancar.",
    iconName: "BookOpen",
  },
  {
    id: "q8",
    domain: "Communication",
    domainLabelIndo: "Komunikasi Verbal",
    text: "Anak saya dapat menyampaikan perasaan atau keinginannya dengan jelas kepada orang lain.",
    example: 'Contoh: Mengatakan "Aku merasa sedih karena mainanku diambil" daripada hanya menangis.',
    iconName: "MessageSquare",
  },
  {
    id: "q9",
    domain: "Science",
    domainLabelIndo: "Eksplorasi Sains",
    text: "Anak saya tertarik mengeksplorasi alam, hewan, tumbuhan, atau melakukan eksperimen sederhana.",
    example: "Contoh: Suka mengamati tanaman, bermain es mencair, atau mencampur warna air.",
    iconName: "FlaskConical",
  },
  {
    id: "q10",
    domain: "Motor Skills",
    domainLabelIndo: "Motorik & Koordinasi",
    text: "Anak saya lincah dalam aktivitas fisik seperti melompat, menyeimbangkan badan, atau menggunting kertas.",
    example:
      "Contoh: Bisa menaiki sepeda roda tiga/dua, memegang pensil dengan mantap, atau melipat kertas.",
    iconName: "Activity",
  },
  {
    id: "q11",
    domain: "Focus",
    domainLabelIndo: "Atensi & Konsentrasi",
    text: "Anak saya dapat fokus pada satu aktivitas yang disukainya dalam waktu yang lumayan lama (15-20 menit+).",
    example: "Contoh: Duduk tenang saat mewarnai gambar, meronce manik-manik, atau menyusun balok.",
    iconName: "Target",
  },
  {
    id: "q12",
    domain: "Problem Solving",
    domainLabelIndo: "Pemecahan Masalah",
    text: "Anak saya mencoba menemukan cara sendiri ketika menghadapi hambatan saat bermain.",
    example: "Contoh: Saat baloknya runtuh, ia mencoba cara baru agar menaranya lebih kokoh.",
    iconName: "Lightbulb",
  },
  {
    id: "q13",
    domain: "Persistence",
    domainLabelIndo: "Kegigihan & Ketahanan",
    text: "Anak saya tidak mudah menyerah saat mengalami kesulitan dalam menyelesaikan tugas.",
    example: "Contoh: Terus mencoba memasang tali sepatu atau merapikan mainan meski sempat gagal.",
    iconName: "ShieldCheck",
  },
  {
    id: "q14",
    domain: "Pattern Recognition",
    domainLabelIndo: "Pengenalan Pola",
    text: "Anak saya dapat mengenali dan melanjutkan pola urutan warna, bentuk, atau irama suara.",
    example: "Contoh: Melanjutkan susunan manik-manik Merah-Kuning-Merah-Kuning secara tepat.",
    iconName: "Grid",
  },
  {
    id: "q15",
    domain: "Computational Thinking",
    domainLabelIndo: "Berpikir Komputasional",
    text: "Anak saya suka mengikuti petunjuk langkah demi langkah atau membuat urutan aktivitas.",
    example: 'Contoh: Menjelaskan urutan "pertama cuci tangan, kedua ambil piring, ketiga makan".',
    iconName: "Cpu",
  },
  {
    id: "q16",
    domain: "Leadership",
    domainLabelIndo: "Jiwa Kepemimpinan",
    text: "Anak saya sering mengambil inisiatif dan mengarahkan teman saat bermain bersama.",
    example:
      'Contoh: Mengajak teman "Ayo kita buat benteng!", membagi tugas saat bermain rumah-rumahan.',
    iconName: "Crown",
  },
  {
    id: "q17",
    domain: "Collaboration",
    domainLabelIndo: "Kerjasama & Sosialisasi",
    text: "Anak saya mudah berbagi mainan dan bisa bekerja sama dalam kelompok kecil.",
    example: "Contoh: Mau bergantian main ayunan atau membantu teman merapikan mainan bersama.",
    iconName: "Users",
  },
  {
    id: "q18",
    domain: "Independence",
    domainLabelIndo: "Kemandirian",
    text: "Anak saya suka melakukan aktivitas mandiri seperti memakai baju, sepatu, atau menyiapkan peralatan sendiri.",
    example: 'Contoh: Bangga mengutarakan "Aku bisa sendiri!" saat memakai tas sekolah.',
    iconName: "UserCheck",
  },
  {
    id: "q19",
    domain: "Logic",
    domainLabelIndo: "Penalaran & Logika",
    text: "Anak saya mengerti konsep mengelompokkan benda berdasarkan kategori tertentu.",
    example: "Contoh: Memisahkan mainan mobil menurut warna, atau memisahkan binatang air dan darat.",
    iconName: "Boxes",
  },
  {
    id: "q20",
    domain: "Mathematics",
    domainLabelIndo: "Berpikir Matematis",
    text: 'Anak saya memahami konsep "tambah sedikit" atau "kurang sebagian" dalam kehidupan sehari-hari.',
    example: "Contoh: Memahami jika biskuitnya dimakan satu, jumlahnya menjadi lebih sedikit.",
    iconName: "PlusCircle",
  },
  {
    id: "q21",
    domain: "Creativity",
    domainLabelIndo: "Kreativitas & Imajinasi",
    text: "Anak saya suka bernyanyi, menari, atau menciptakan gerakan unik mengikuti musik.",
    example: "Contoh: Menari mengekspresikan irama lagu atau membuat variasi nada buatan sendiri.",
    iconName: "Music",
  },
  {
    id: "q22",
    domain: "Science",
    domainLabelIndo: "Eksplorasi Sains",
    text: "Anak saya peka terhadap fenomena alam seperti bayangan, angin, air, atau bayangan cermin.",
    example: "Contoh: Suka mengejar bayangan sendiri di bawah sinar matahari atau bermain senter.",
    iconName: "Sun",
  },
  {
    id: "q23",
    domain: "Motor Skills",
    domainLabelIndo: "Motorik & Koordinasi",
    text: "Anak saya menikmati kegiatan yang melatih jari-jemari seperti meronce, menempel stiker, atau memeras spons.",
    example: "Contoh: Menempel stiker dengan rapi di dalam garis gambar.",
    iconName: "Hand",
  },
  {
    id: "q24",
    domain: "Communication",
    domainLabelIndo: "Komunikasi Verbal",
    text: "Anak saya suka berpura-pura menjadi karakter tertentu (guru, dokter, koki) dan berbicara sesuai peran itu.",
    example: "Contoh: Pura-pura mengajar boneka-bonekanya dan menjelaskan pelajaran dengan semangat.",
    iconName: "Smile",
  },
  {
    id: "q25",
    domain: "Computational Thinking",
    domainLabelIndo: "Berpikir Komputasional",
    text: 'Anak saya pandai menemukan pola kesalahan atau benda yang "tidak cocok" dalam kelompoknya.',
    example: "Contoh: Menyebutkan bahwa gambar apel tidak cocok di antara kelompok mobil-mobilan.",
    iconName: "Compass",
  },
  {
    id: "q26",
    domain: "Observation",
    domainLabelIndo: "Pengamatan & Observasi",
    text: "Anak saya mengenali ekspresi wajah atau suasana hati orang-orang di sekitarnya.",
    example: 'Contoh: Mengatakan "Ibu sedang capek ya?" ketika melihat wajah ibu murung.',
    iconName: "HeartHandshake",
  },
  {
    id: "q27",
    domain: "Pattern Recognition",
    domainLabelIndo: "Pengenalan Pola",
    text: "Anak saya cepat mengenali huruf, simbol, atau logo merek yang sering ia lihat di jalan.",
    example: "Contoh: Mengenali logo supermarket favorit atau huruf depan namanya di papan petunjuk.",
    iconName: "Sparkles",
  },
  {
    id: "q28",
    domain: "Problem Solving",
    domainLabelIndo: "Pemecahan Masalah",
    text: "Anak saya bisa menggunakan benda di sekitarnya sebagai alat bantu untuk mencapai tujuannya.",
    example: "Contoh: Menggunakan bangku kecil untuk mengambil mainan yang tinggi di atas meja.",
    // NOTE: original data used iconName "Tool", which lucide-react 1.x doesn't
    // export (only "Wrench" exists). Mapped at the source instead of patching
    // it in the icon resolver, so this file stays the single source of truth.
    iconName: "Wrench",
  },
  {
    id: "q29",
    domain: "Leadership",
    domainLabelIndo: "Jiwa Kepemimpinan",
    text: "Anak saya dengan percaya diri menyapa orang baru atau tampil di depan kelompok teman seusianya.",
    example:
      "Contoh: Mau maju ke depan kelas untuk menyanyi atau memperkenalkan diri di acara ulang tahun.",
    iconName: "Megaphone",
  },
  {
    id: "q30",
    domain: "Curiosity",
    domainLabelIndo: "Rasa Ingin Tahu",
    text: "Anak saya senang membongkar atau mengamati bagian dalam dari mainan atau benda di rumah.",
    example: "Contoh: Membuka roda mobil-mobilan untuk melihat porosnya atau mengintip bagian dalam jam.",
    iconName: "Search",
  },
];

/** Recolored to Valiyo's design tokens (was generic rose/amber/emerald/sky). */
export const ANSWER_OPTIONS: AnswerOption[] = [
  { value: 1, label: "Tidak Pernah", description: "Hampir tidak pernah terlihat" },
  { value: 2, label: "Kadang-kadang", description: "Terlihat beberapa kali" },
  { value: 3, label: "Sering", description: "Cukup sering menunjukkan" },
  { value: 4, label: "Selalu", description: "Sangat sering & konsisten" },
];
