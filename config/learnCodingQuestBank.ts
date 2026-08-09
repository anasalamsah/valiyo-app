import type { Level, CodingActivity } from "@/types/learnAcademy";

/**
 * Ported from the (now-retired) external Learn app's codingQuestBank.ts.
 * getCodingActivitiesByLevel() below has been fixed to never backfill from
 * another level (it used to silently pad short/empty results with
 * wrong-level activities) — see the function for details. Content itself
 * (TK A/A(Adv)/B/B(Adv) only) is unchanged; SD Kelas 1-6 Coding Quest
 * activities are a future batch.
 */
export const CODING_QUEST_BANK: CodingActivity[] = [
  // -------------------------------------------------------------
  // TK A Activities
  // -------------------------------------------------------------
  {
    id: "CQ_TKA_01",
    level: "TK A",
    type: "arrange_steps",
    title: "Urutan Rutinitas Pagi",
    prompt: "Susun langkah kegiatan di pagi hari dari awal sampai akhir!",
    skill: "Sequencing",
    stepItems: [
      { id: "step_1", text: "Bangun Tidur", icon: "🛌" },
      { id: "step_2", text: "Sikat Gigi", icon: "🪥" },
      { id: "step_3", text: "Sarapan Pagi", icon: "🍞" },
      { id: "step_4", text: "Pergi Sekolah", icon: "🏫" }
    ],
    correctStepOrder: ["step_1", "step_2", "step_3", "step_4"],
    successFeedback: "Luar biasa! Kamu berhasil menyusun urutan pagi dengan benar! 🌞"
  },
  {
    id: "CQ_TKA_02",
    level: "TK A",
    type: "find_pattern",
    title: "Tebak Pola Hewan",
    prompt: "Lihat pola ini: Anjing, Kucing, Anjing, Kucing. Hewan berikutnya adalah?",
    skill: "Pattern Recognition",
    patternSequence: ["🐶", "🐱", "🐶", "🐱", "?"],
    patternOptions: [
      { text: "Anjing", icon: "🐶", isCorrect: true },
      { text: "Kucing", icon: "🐱", isCorrect: false },
      { text: "Tikus", icon: "🐭", isCorrect: false }
    ],
    successFeedback: "Hebat! Kamu menemukan pola berulang hewan dengan tepat! 🐶"
  },
  {
    id: "CQ_TKA_03",
    level: "TK A",
    type: "follow_robot",
    title: "Bantu Robot Ke Bintang",
    prompt: "Pilih petunjuk arah panah agar Robot berjalan lurus sampai ke Bintang!",
    skill: "Navigation & Planning",
    gridSize: { rows: 1, cols: 3 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 0, c: 2 },
    obstacles: [],
    availableCommands: ["➡", "⬅"],
    correctCommandSequence: ["➡", "➡"],
    successFeedback: "Hebat! Kamu membantu robot mencapai Bintang Impian! ⭐️🤖"
  },
  {
    id: "CQ_TKA_04",
    level: "TK A",
    type: "odd_one_out",
    title: "Mana yang Berbeda?",
    prompt: "Mana benda yang TIDAK sama jenisnya dengan teman-temannya?",
    skill: "Categorization",
    oddOptions: [
      { id: "o1", text: "Apel", icon: "🍎", category: "Buah", isCorrect: false },
      { id: "o2", text: "Pisang", icon: "🍌", category: "Buah", isCorrect: false },
      { id: "o3", text: "Mobil Mainan", icon: "🚗", category: "Kendaraan", isCorrect: true },
      { id: "o4", text: "Anggur", icon: "🍇", category: "Buah", isCorrect: false }
    ],
    successFeedback: "Tepat sekali! Mobil adalah kendaraan, bukan buah! 🚗✨"
  },
  {
    id: "CQ_TKA_05",
    level: "TK A",
    type: "fix_mistake",
    title: "Perbaiki Petunjuk Robot",
    prompt: "Robot berjalan menabrak batu! Perbaiki petunjuk kedua agar robot belok ke atas!",
    skill: "Debugging",
    faultyCommands: ["➡", "⬇"],
    faultyIndex: 1,
    correctCommand: "⬆",
    successFeedback: "Hebat! Kamu berhasil memperbaiki bug petunjuk robot! 🛠️🤖"
  },
  {
    id: "CQ_TKA_06",
    level: "TK A",
    type: "build_algorithm",
    title: "Aturan Jika Lapar",
    prompt: "Susun langkah pintar saat merasa lapar!",
    skill: "Decision Making",
    stepItems: [
      { id: "a1", text: "Makan Makanan", icon: "🍛" },
      { id: "a2", text: "Minum Air", icon: "🥛" },
      { id: "a3", text: "Main Kembali", icon: "⚽️" }
    ],
    correctStepOrder: ["a1", "a2", "a3"],
    successFeedback: "Sempurna! Algoritma makan dan minum selesai! 🍛🥛"
  },
  {
    id: "CQ_TKA_07",
    level: "TK A",
    type: "complete_sequence",
    title: "Gerakan Robot Dansa",
    prompt: "Robot berdansa: Maju, Lompat, Maju, Lompat. Gerakan berikutnya adalah?",
    skill: "Loops & Sequences",
    patternSequence: ["🚶", "🦘", "🚶", "🦘", "?"],
    patternOptions: [
      { text: "Maju", icon: "🚶", isCorrect: true },
      { text: "Lompat", icon: "🦘", isCorrect: false }
    ],
    successFeedback: "Keren! Robot berdansa dengan ritme yang sempurna! 💃🤖"
  },
  {
    id: "CQ_TKA_08",
    level: "TK A",
    type: "find_pattern",
    title: "Pola Warna Lampu Robot",
    prompt: "Perhatikan warna lampu: Merah, Hijau, Merah, Hijau. Selanjutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["🔴", "🟢", "🔴", "🟢", "?"],
    patternOptions: [
      { text: "Lampu Merah", icon: "🔴", isCorrect: true },
      { text: "Lampu Hijau", icon: "🟢", isCorrect: false },
      { text: "Lampu Biru", icon: "🔵", isCorrect: false }
    ],
    successFeedback: "Pintar! Kamu memahami pengulangan warna lampu! 🚦"
  },
  {
    id: "CQ_TKA_09",
    level: "TK A",
    type: "arrange_steps",
    title: "Menanam Bunga Cantik",
    prompt: "Urutkan cara menanam bunga di taman!",
    skill: "Sequencing",
    stepItems: [
      { id: "b1", text: "Tanam Benih", icon: "🌱" },
      { id: "b2", text: "Siram Air", icon: "🚿" },
      { id: "b3", text: "Bunga Tumbuh", icon: "🌸" }
    ],
    correctStepOrder: ["b1", "b2", "b3"],
    successFeedback: "Indah sekali! Bunga mekar dengan urutan yang pas! 🌸"
  },
  {
    id: "CQ_TKA_10",
    level: "TK A",
    type: "odd_one_out",
    title: "Cari Benda Terbang",
    prompt: "Pilih benda yang TIDAK bisa terbang di angkasa!",
    skill: "Categorization",
    oddOptions: [
      { id: "f1", text: "Burung", icon: "🕊️", category: "Terbang", isCorrect: false },
      { id: "f2", text: "Pesawat", icon: "✈️", category: "Terbang", isCorrect: false },
      { id: "f3", text: "Ikan", icon: "🐟", category: "Berenang", isCorrect: true },
      { id: "f4", text: "Awan", icon: "☁️", category: "Angkasa", isCorrect: false }
    ],
    successFeedback: "Benar! Ikan berenang di air, bukan terbang di udara! 🐟🌊"
  },

  // -------------------------------------------------------------
  // TK A Advanced Activities
  // -------------------------------------------------------------
  {
    id: "CQ_TKA_ADV_01",
    level: "TK A (Advanced)",
    type: "follow_robot",
    title: "Navigasi Robot 2x2",
    prompt: "Susun 2 petunjuk arah agar Robot bergerak ke Kanan lalu ke Bawah menuju Bintang!",
    skill: "Planning",
    gridSize: { rows: 2, cols: 2 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 1, c: 1 },
    obstacles: [],
    availableCommands: ["➡", "⬇"],
    correctCommandSequence: ["➡", "⬇"],
    successFeedback: "Luar biasa! Robot berhasil mengarungi jalur 2D ke Bintang! 🚀"
  },
  {
    id: "CQ_TKA_ADV_02",
    level: "TK A (Advanced)",
    type: "find_pattern",
    title: "Pola Bentuk Geometri",
    prompt: "Perhatikan pola: Lingkaran, Segitiga, Lingkaran, Segitiga. Selanjutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["⚪️", "🔺", "⚪️", "🔺", "?"],
    patternOptions: [
      { text: "Lingkaran", icon: "⚪️", isCorrect: true },
      { text: "Segitiga", icon: "🔺", isCorrect: false },
      { text: "Kotak", icon: "⬛️", isCorrect: false }
    ],
    successFeedback: "Hebat! Kamu mengenali pola bentuk geometri! 🔺⚪️"
  },
  {
    id: "CQ_TKA_ADV_03",
    level: "TK A (Advanced)",
    type: "arrange_steps",
    title: "Membuat Jus Buah Segar",
    prompt: "Susun langkah membuat jus pisang lezat!",
    skill: "Sequencing",
    stepItems: [
      { id: "j1", text: "Kupas Pisang", icon: "🍌" },
      { id: "j2", text: "Blender Buah", icon: "🥤" },
      { id: "j3", text: "Tuang ke Gelas", icon: "🥛" }
    ],
    correctStepOrder: ["j1", "j2", "j3"],
    successFeedback: "Segar sekali! Jus pisang siap diminum! 🥤"
  },
  {
    id: "CQ_TKA_ADV_04",
    level: "TK A (Advanced)",
    type: "fix_mistake",
    title: "Navigasi Menghindari Rintangan",
    prompt: "Robot terhalang tembok di depan! Ganti petunjuk Ke Depan dengan Belok Kanan!",
    skill: "Debugging",
    faultyCommands: ["⬆", "⬆"],
    faultyIndex: 1,
    correctCommand: "➡",
    successFeedback: "Robot berhasil berbelok menghindari tembok! Keren! 🧱🤖"
  },
  {
    id: "CQ_TKA_ADV_05",
    level: "TK A (Advanced)",
    type: "odd_one_out",
    title: "Cari Makanan Manis",
    prompt: "Manakah benda yang BUKAN makanan manis?",
    skill: "Categorization",
    oddOptions: [
      { id: "m1", text: "Permen", icon: "🍬", category: "Manis", isCorrect: false },
      { id: "m2", text: "Cokelat", icon: "🍫", category: "Manis", isCorrect: false },
      { id: "m3", text: "Cabai Pedas", icon: "🌶️", category: "Pedas", isCorrect: true },
      { id: "m4", text: "Es Krim", icon: "🍦", category: "Manis", isCorrect: false }
    ],
    successFeedback: "Tepat! Cabai itu rasanya pedas, bukan manis! 🌶️"
  },
  {
    id: "CQ_TKA_ADV_06",
    level: "TK A (Advanced)",
    type: "complete_sequence",
    title: "Suara Musik Robot",
    prompt: "Robot bernyanyi: BIP, BUP, BIP, BUP. Suara berikutnya?",
    skill: "Loops & Sequences",
    patternSequence: ["🎵 BIP", "🎶 BUP", "🎵 BIP", "🎶 BUP", "?"],
    patternOptions: [
      { text: "BIP", icon: "🎵", isCorrect: true },
      { text: "BUP", icon: "🎶", isCorrect: false }
    ],
    successFeedback: "Merdu sekali lagu robotmu! 🎵🤖"
  },
  {
    id: "CQ_TKA_ADV_07",
    level: "TK A (Advanced)",
    type: "build_algorithm",
    title: "Algoritma Menyeberang Jalan",
    prompt: "Susun langkah aman saat menyeberang jalan raya!",
    skill: "Decision Making",
    stepItems: [
      { id: "s1", text: "Tengok Kiri Kanan", icon: "👀" },
      { id: "s2", text: "Pegang Tangan Ibu", icon: "🤝" },
      { id: "s3", text: "Jalan di Zebra Cross", icon: "🚶" }
    ],
    correctStepOrder: ["s1", "s2", "s3"],
    successFeedback: "Sangat aman! Kamu pintar menjaga diri! 🚦"
  },
  {
    id: "CQ_TKA_ADV_08",
    level: "TK A (Advanced)",
    type: "find_pattern",
    title: "Pola Angka Sederhana",
    prompt: "Perhatikan urutan angka: 1, 2, 1, 2. Angka berikutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["1️⃣", "2️⃣", "1️⃣", "2️⃣", "?"],
    patternOptions: [
      { text: "Angka 1", icon: "1️⃣", isCorrect: true },
      { text: "Angka 2", icon: "2️⃣", isCorrect: false },
      { text: "Angka 3", icon: "3️⃣", isCorrect: false }
    ],
    successFeedback: "Hebat! Angka 1 adalah urutan yang benar! 🔢"
  },
  {
    id: "CQ_TKA_ADV_09",
    level: "TK A (Advanced)",
    type: "arrange_steps",
    title: "Mencuci Tangan Bersih",
    prompt: "Urutkan cara cuci tangan agar bebas kuman!",
    skill: "Sequencing",
    stepItems: [
      { id: "w1", text: "Basahi Air & Sabun", icon: "🧼" },
      { id: "w2", text: "Gosok Telapak Tangan", icon: "🤲" },
      { id: "w3", text: "Bilas & Lap Kering", icon: "🧻" }
    ],
    correctStepOrder: ["w1", "w2", "w3"],
    successFeedback: "Tangan jadi sehat dan bersih dari kuman! 🧼"
  },
  {
    id: "CQ_TKA_ADV_10",
    level: "TK A (Advanced)",
    type: "follow_robot",
    title: "Robot Misi 3 Langkah",
    prompt: "Jalankan robot 3 langkah ke Kanan sampai ke Bintang!",
    skill: "Planning",
    gridSize: { rows: 1, cols: 4 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 0, c: 3 },
    obstacles: [],
    availableCommands: ["➡"],
    correctCommandSequence: ["➡", "➡", "➡"],
    successFeedback: "Robot melaju kencang ke tujuan! 🚀🤖"
  },

  // -------------------------------------------------------------
  // TK B Activities
  // -------------------------------------------------------------
  {
    id: "CQ_TKB_01",
    level: "TK B",
    type: "follow_robot",
    title: "Labirin Robot L-Path",
    prompt: "Bantu Robot berjalan 2 kali ke Kanan, lalu 1 kali ke Bawah!",
    skill: "Planning",
    gridSize: { rows: 2, cols: 3 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 1, c: 2 },
    obstacles: [{ r: 1, c: 0 }],
    availableCommands: ["➡", "⬇"],
    correctCommandSequence: ["➡", "➡", "⬇"],
    successFeedback: "Hebat! Robot berhasil melewati rintangan batu! 🪨🤖"
  },
  {
    id: "CQ_TKB_02",
    level: "TK B",
    type: "find_pattern",
    title: "Pola 3 Elemen",
    prompt: "Pola bintang: Merah, Kuning, Biru, Merah, Kuning. Bintang berikutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["🔴", "🟡", "🔵", "🔴", "🟡", "?"],
    patternOptions: [
      { text: "Bintang Biru", icon: "🔵", isCorrect: true },
      { text: "Bintang Merah", icon: "🔴", isCorrect: false },
      { text: "Bintang Kuning", icon: "🟡", isCorrect: false }
    ],
    successFeedback: "Bagus sekali! Pola 3 warna terpecahkan! 🌈"
  },
  {
    id: "CQ_TKB_03",
    level: "TK B",
    type: "arrange_steps",
    title: "Membuat Surat Pesan",
    prompt: "Urutkan cara mengirim surat untuk teman!",
    skill: "Sequencing",
    stepItems: [
      { id: "s1", text: "Tulis Surat", icon: "✏️" },
      { id: "s2", text: "Masukan Amplop", icon: "✉️" },
      { id: "s3", text: "Tempel Perangko", icon: "📮" },
      { id: "s4", text: "Kirim ke Pak Pos", icon: "🚴" }
    ],
    correctStepOrder: ["s1", "s2", "s3", "s4"],
    successFeedback: "Surat terkirim dengan aman ke tujuan! ✉️"
  },
  {
    id: "CQ_TKB_04",
    level: "TK B",
    type: "fix_mistake",
    title: "Perbaiki Arah Robot",
    prompt: "Robot seharusnya naik ke Atas, tapi salah ke Kiri. Perbaiki tombol kedua!",
    skill: "Debugging",
    faultyCommands: ["➡", "⬅"],
    faultyIndex: 1,
    correctCommand: "⬆",
    successFeedback: "Debug berhasil! Robot melompat gembira! 🤖⚡"
  },
  {
    id: "CQ_TKB_05",
    level: "TK B",
    type: "build_algorithm",
    title: "JIKA Hujan Turun",
    prompt: "Susun logika keputusan saat cuaca hujan di luar!",
    skill: "Decision Making",
    stepItems: [
      { id: "r1", text: "Pakai Jas Hujan", icon: "🧥" },
      { id: "r2", text: "Bawa Payung", icon: "☂️" },
      { id: "r3", text: "Jalan Hati-hati", icon: "🚶" }
    ],
    correctStepOrder: ["r1", "r2", "r3"],
    successFeedback: "Pintar! Kamu siap menghadapi hujan tanpa basah! ☔"
  },
  {
    id: "CQ_TKB_06",
    level: "TK B",
    type: "complete_sequence",
    title: "Pengulangan Langkah Robot",
    prompt: "Langkah robot: Kanan, Atas, Kanan, Atas. Selanjutnya?",
    skill: "Loops & Sequences",
    patternSequence: ["➡", "⬆", "➡", "⬆", "?"],
    patternOptions: [
      { text: "Ke Kanan", icon: "➡", isCorrect: true },
      { text: "Ke Atas", icon: "⬆", isCorrect: false }
    ],
    successFeedback: "Langkah berulang berhasil diselesaikan! 🧭"
  },
  {
    id: "CQ_TKB_07",
    level: "TK B",
    type: "odd_one_out",
    title: "Kelompok Alat Tulis",
    prompt: "Pilih benda yang BUKAN alat tulis sekolah!",
    skill: "Categorization",
    oddOptions: [
      { id: "t1", text: "Pensil", icon: "✏️", category: "Alat Tulis", isCorrect: false },
      { id: "t2", text: "Penggaris", icon: "📐", category: "Alat Tulis", isCorrect: false },
      { id: "t3", text: "Buku Tulis", icon: "📓", category: "Alat Tulis", isCorrect: false },
      { id: "t4", text: "Sendok Makan", icon: "🥄", category: "Alat Makan", isCorrect: true }
    ],
    successFeedback: "Sendok dipakai untuk makan, bukan menulis! Tepat sekali! 🥄"
  },
  {
    id: "CQ_TKB_08",
    level: "TK B",
    type: "find_pattern",
    title: "Pola Ukuran Benda",
    prompt: "Pola ukuran: Kecil, Besar, Kecil, Besar. Selanjutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["🔹 Kecil", "🔷 Besar", "🔹 Kecil", "🔷 Besar", "?"],
    patternOptions: [
      { text: "Kecil", icon: "🔹", isCorrect: true },
      { text: "Besar", icon: "🔷", isCorrect: false }
    ],
    successFeedback: "Pemahaman pola ukuran yang sangat cerdas! 🔷"
  },
  {
    id: "CQ_TKB_09",
    level: "TK B",
    type: "arrange_steps",
    title: "Daur Hidup Kupu-kupu",
    prompt: "Urutkan pertumbuhan kupu-kupu yang cantik!",
    skill: "Sequencing",
    stepItems: [
      { id: "k1", text: "Telur Kecil", icon: "🥚" },
      { id: "k2", text: "Ulat Bulu", icon: "🐛" },
      { id: "k3", text: "Kepompong", icon: "🥖" },
      { id: "k4", text: "Kupu-kupu", icon: "🦋" }
    ],
    correctStepOrder: ["k1", "k2", "k3", "k4"],
    successFeedback: "Sains & Logika menyatu sempurna! Kupu-kupu terbang tinggi! 🦋"
  },
  {
    id: "CQ_TKB_10",
    level: "TK B",
    type: "follow_robot",
    title: "Navigasi Misi Bintang Z",
    prompt: "Petunjuk: Ke Kanan ➔ Ke Bawah ➔ Ke Kanan!",
    skill: "Planning",
    gridSize: { rows: 2, cols: 3 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 1, c: 2 },
    obstacles: [{ r: 0, c: 1 }],
    availableCommands: ["➡", "⬇"],
    correctCommandSequence: ["⬇", "➡", "➡"],
    successFeedback: "Misi Z selesai! Bintang emas berhasil didapatkan! ⭐️"
  },

  // -------------------------------------------------------------
  // TK B Advanced Activities
  // -------------------------------------------------------------
  {
    id: "CQ_TKB_ADV_01",
    level: "TK B (Advanced)",
    type: "follow_robot",
    title: "Master Labirin 3x3",
    prompt: "Pandu Robot melewati 3 rintangan batu untuk mengambil Bintang!",
    skill: "Computational Thinking",
    gridSize: { rows: 3, cols: 3 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 2, c: 2 },
    obstacles: [{ r: 0, c: 1 }, { r: 1, c: 0 }],
    availableCommands: ["➡", "⬇"],
    correctCommandSequence: ["⬇", "⬇", "➡", "➡"],
    successFeedback: "Luar biasa! Algoritma navigasi tingkat tinggi berhasil! 🧠🤖"
  },
  {
    id: "CQ_TKB_ADV_02",
    level: "TK B (Advanced)",
    type: "build_algorithm",
    title: "Program Robot Pembuat Roti",
    prompt: "Susun program robot untuk membuat roti lapis lezat!",
    skill: "Computational Thinking",
    stepItems: [
      { id: "r1", text: "Ambil Roti", icon: "🍞" },
      { id: "r2", text: "Oles Mentega", icon: "🧈" },
      { id: "r3", text: "Beri Keju", icon: "🧀" },
      { id: "r4", text: "Tutup Roti", icon: "🥪" }
    ],
    correctStepOrder: ["r1", "r2", "r3", "r4"],
    successFeedback: "Master Chef Robot! Roti lapis siap disantap! 🥪"
  },
  {
    id: "CQ_TKB_ADV_03",
    level: "TK B (Advanced)",
    type: "fix_mistake",
    title: "Debugging Jalur Kompleks",
    prompt: "Perbaiki kesalahan perintah ketiga dari robot agar tidak jatuh ke lubang!",
    skill: "Debugging",
    faultyCommands: ["➡", "➡", "⬇", "➡"],
    faultyIndex: 2,
    correctCommand: "⬆",
    successFeedback: "Hebat! Kamu seorang programmer cilik sejati! 💻✨"
  },
  {
    id: "CQ_TKB_ADV_04",
    level: "TK B (Advanced)",
    type: "find_pattern",
    title: "Pola Angka Ganjil-Genap",
    prompt: "Pola simbol: ⭐️, 🌙, ☀️, ⭐️, 🌙. Simbol selanjutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["⭐️", "🌙", "☀️", "⭐️", "🌙", "?"],
    patternOptions: [
      { text: "Matahari", icon: "☀️", isCorrect: true },
      { text: "Bintang", icon: "⭐️", isCorrect: false },
      { text: "Bulan", icon: "🌙", isCorrect: false }
    ],
    successFeedback: "Hebat! Analisis pola alam semesta sukses! ☀️"
  },
  {
    id: "CQ_TKB_ADV_05",
    level: "TK B (Advanced)",
    type: "complete_sequence",
    title: "Loop Perulangan Robotik",
    prompt: "Loop: [Maju 2 Kali, Lompat 1 Kali] -> Maju, Maju, Lompat, Maju, Maju, ?",
    skill: "Loops & Sequences",
    patternSequence: ["🚶", "🚶", "🦘", "🚶", "🚶", "?"],
    patternOptions: [
      { text: "Lompat", icon: "🦘", isCorrect: true },
      { text: "Maju", icon: "🚶", isCorrect: false }
    ],
    successFeedback: "Konsep perulangan (Looping) berhasil dikuasai! 🔄"
  },
  {
    id: "CQ_TKB_ADV_06",
    level: "TK B (Advanced)",
    type: "odd_one_out",
    title: "Klasifikasi Energi Benda",
    prompt: "Mana benda yang memancarkan CAHAYA sendiri?",
    skill: "Categorization",
    oddOptions: [
      { id: "c1", text: "Matahari", icon: "☀️", category: "Cahaya", isCorrect: false },
      { id: "c2", text: "Senter", icon: "🔦", category: "Cahaya", isCorrect: false },
      { id: "c3", text: "Lampu", icon: "💡", category: "Cahaya", isCorrect: false },
      { id: "c4", text: "Batu Kali", icon: "🪨", category: "Batu", isCorrect: true }
    ],
    successFeedback: "Batu tidak mengeluarkan cahaya! Pilihan yang tepat! 💡"
  },
  {
    id: "CQ_TKB_ADV_07",
    level: "TK B (Advanced)",
    type: "arrange_steps",
    title: "Proses Daur Ulang Sampah",
    prompt: "Urutkan langkah memilah sampah daur ulang!",
    skill: "Sequencing",
    stepItems: [
      { id: "d1", text: "Kumpulkan Botol", icon: "🍾" },
      { id: "d2", text: "Pilahkan Sampah", icon: "♻️" },
      { id: "d3", text: "Masukan Pabrik", icon: "🏭" },
      { id: "d4", text: "Mainan Baru", icon: "🧸" }
    ],
    correctStepOrder: ["d1", "d2", "d3", "d4"],
    successFeedback: "Pahlawan lingkungan dan logika yang cerdas! ♻️"
  },
  {
    id: "CQ_TKB_ADV_08",
    level: "TK B (Advanced)",
    type: "build_algorithm",
    title: "Algoritma Pemadam Kebakaran",
    prompt: "Susun urutan kerja Robot Pemadam saat melihat api!",
    skill: "Computational Thinking",
    stepItems: [
      { id: "f1", text: "Bunyikan Sirine", icon: "🚨" },
      { id: "f2", text: "Arahkan Selang", icon: "🧯" },
      { id: "f3", text: "Semprot Air", icon: "💦" },
      { id: "f4", text: "Api Padam", icon: "✅" }
    ],
    correctStepOrder: ["f1", "f2", "f3", "f4"],
    successFeedback: "Misi penyelamatan sukses! Luar biasa! 🚨"
  },
  {
    id: "CQ_TKB_ADV_09",
    level: "TK B (Advanced)",
    type: "find_pattern",
    title: "Pola Arah Panah",
    prompt: "Pola panah: Atas ⬆, Kanan ➡, Atas ⬆, Kanan ➡. Panah berikutnya?",
    skill: "Pattern Recognition",
    patternSequence: ["⬆", "➡", "⬆", "➡", "?"],
    patternOptions: [
      { text: "Panah Atas", icon: "⬆", isCorrect: true },
      { text: "Panah Kanan", icon: "➡", isCorrect: false },
      { text: "Panah Bawah", icon: "⬇", isCorrect: false }
    ],
    successFeedback: "Sangat teliti! Arah panah tertebak sempurna! 🧭"
  },
  {
    id: "CQ_TKB_ADV_10",
    level: "TK B (Advanced)",
    type: "follow_robot",
    title: "Misi Penyelamatan Bintang",
    prompt: "Pilih rute panah tercepat tanpa menyentuh jurang!",
    skill: "Planning",
    gridSize: { rows: 2, cols: 3 },
    robotStart: { r: 0, c: 0 },
    starGoal: { r: 1, c: 2 },
    obstacles: [{ r: 0, c: 1 }, { r: 1, c: 0 }],
    availableCommands: ["➡", "⬇", "⬆"],
    correctCommandSequence: ["⬇", "➡", "➡"],
    successFeedback: "Selamat! Kamu telah menyelesaikan seluruh Tantangan Coding Quest! 🏆🤖🌟"
  }
];

// Number of real Coding Quest activities available for a given level, no padding.
export function getAvailableCodingActivityCount(level: Level): number {
  return CODING_QUEST_BANK.filter((act) => act.level === level).length;
}

// Levels that actually have at least one Coding Quest activity.
export function getLevelsWithCodingActivities(): Level[] {
  return Array.from(new Set(CODING_QUEST_BANK.map((act) => act.level)));
}

// Get activities for a given level. STRICT: only returns activities matching
// the exact requested level. Never falls back to another level — if there
// are fewer than 10 (or none), the caller receives that real, shorter (or
// empty) list rather than a session silently padded with wrong-level
// activities. CodingQuestFlow already renders a graceful "not available yet"
// state when the returned array is empty.
export function getCodingActivitiesByLevel(level: Level): CodingActivity[] {
  return CODING_QUEST_BANK.filter((act) => act.level === level).slice(0, 10);
}
