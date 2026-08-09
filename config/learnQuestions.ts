/**
 * Question engine + full question bank for the Learn product.
 *
 * Ported from the external Learn app, then substantially extended:
 * - Strict level/category filtering with NO cross-level fallback
 *   (getRandomSessionQuestions and getCodingActivitiesByLevel-equivalent
 *   used to silently backfill from other levels when a level+category
 *   combo lacked enough questions — that has been removed. A request that
 *   cannot be satisfied now returns a structured failure instead of
 *   contaminating a session with wrong-level content).
 * - Full 100-question content for Matematika, Sains, Bahasa Inggris, and
 *   Pengetahuan Umum across Preschool 1, Preschool 2, and SD Kelas 1-6
 *   (previously only TK A / TK A Advanced / TK B / TK B Advanced had
 *   content — all other levels returned wrong-level questions via the
 *   fallback above).
 */
import type { Level, Category, Question } from "@/types/learnAcademy";

export type { Question };

// Helper to shuffle array (used for options/questions when requested)
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate Matematika TK A (100 questions)
function generateMathTKA(): Question[] {
  const list: Question[] = [];

  // 1. Counting & Simple additions up to 5 (30 questions)
  const items = [
    "apel", "jeruk", "permen", "balon", "kelereng", 
    "stroberi", "mangga", "boneka", "mobil mainan", "buku", 
    "pensil", "biskuit", "kue donat", "pisang", "bunga",
    "topi", "bintang", "ikan mas", "kucing", "kelinci",
    "kupu-kupu", "burung", "telur", "cokelat", "es krim",
    "roti", "jeruk purut", "gundu", "krayon", "penghapus"
  ];

  for (let i = 0; i < 30; i++) {
    const item = items[i];
    const x = (i % 3) + 1; // 1, 2, 3
    const y = (i % 2) + 1; // 1, 2
    const total = x + y;
    list.push({
      id: `MATH_TKA_${String(i + 1).padStart(3, "0")}`,
      level: "TK A",
      category: "Matematika",
      question: `Jika kamu punya ${x} buah ${item}, lalu Ibu memberi ${y} ${item} lagi. Berapa total ${item} kamu sekarang?`,
      options: [
        String(total),
        String(total + 1),
        String(total - 1 === 0 ? total + 2 : total - 1),
        String(total + 2)
      ],
      answer: String(total)
    });
  }

  // 2. Shape Recognition & Geometry (25 questions)
  const shapeQuestions = [
    { q: "Benda apa yang bentuknya bulat seperti roda sepeda?", a: "Uang koin", w: ["Buku kotak", "Atap rumah", "Pintu kelas"] },
    { q: "Manakah benda di bawah ini yang berbentuk segitiga?", a: "Potongan pizza", w: ["Roda mobil", "Papan tulis", "Buku gambar"] },
    { q: "Benda apa yang berbentuk persegi panjang?", a: "Papan tulis", w: ["Uang koin", "Gelas minum", "Topi badut"] },
    { q: "Buah semangka utuh memiliki bentuk dasar...?", a: "Lingkaran", w: ["Segitiga", "Kotak persegi", "Layang-layang"] },
    { q: "Dadu permainan ular tangga memiliki bentuk...?", a: "Kotak persegi", w: ["Segitiga", "Lingkaran", "Lonjong"] },
    { q: "Atap rumah pada umumnya berbentuk menyerupai...?", a: "Segitiga", w: ["Lingkaran", "Lonjong", "Bintang"] },
    { q: "Pintu rumah kita biasanya berbentuk...?", a: "Persegi panjang", w: ["Segitiga", "Lingkaran", "Bintang"] },
    { q: "Bentuk balon gas yang ditiup biasanya berbentuk...?", a: "Lonjong / Oval", w: ["Kotak", "Segitiga", "Bintang"] },
    { q: "Donat cokelat yang manis memiliki lubang di tengah dan berbentuk...?", a: "Lingkaran", w: ["Kotak", "Segitiga", "Persegi panjang"] },
    { q: "Topi ulang tahun anak-anak berbentuk...?", a: "Kerucut (Segitiga)", w: ["Kotak", "Lingkaran", "Bintang"] },
    { q: "Cermin di meja rias yang bulat menyerupai bentuk...?", a: "Lingkaran", w: ["Segitiga", "Kotak", "Persegi panjang"] },
    { q: "Kotak susu kemasan mini berbentuk...?", a: "Kotak persegi", w: ["Lingkaran", "Segitiga", "Bintang"] },
    { q: "Benda langit yang bersinar di malam hari dengan lima sudut runcing disebut bentuk...?", a: "Bintang", w: ["Segitiga", "Lingkaran", "Kotak"] },
    { q: "Piring makan di rumah pada umumnya berbentuk...?", a: "Lingkaran", w: ["Segitiga", "Bintang", "Segi lima"] },
    { q: "Buku tulis sekolah adik berbentuk...?", a: "Kotak persegi", w: ["Lingkaran", "Segitiga", "Bintang"] },
    { q: "Gantungan baju (hanger) memiliki bentuk dasar...?", a: "Segitiga", w: ["Lingkaran", "Kotak", "Bintang"] },
    { q: "Televisi layar datar di ruang tamu berbentuk...?", a: "Persegi panjang", w: ["Segitiga", "Lingkaran", "Bintang"] },
    { q: "Permukaan meja makan segi empat berbentuk...?", a: "Kotak persegi", w: ["Lingkaran", "Segitiga", "Bintang"] },
    { q: "Kue lapis dipotong rapi berbentuk...?", a: "Kotak persegi", w: ["Lingkaran", "Segitiga", "Bintang"] },
    { q: "Papan karambol berbentuk...?", a: "Kotak persegi", w: ["Segitiga", "Lingkaran", "Bintang"] },
    { q: "Roti tawar biasanya berbentuk...?", a: "Kotak persegi", w: ["Lingkaran", "Segitiga", "Bintang"] },
    { q: "Manakah yang berbentuk bulat?", a: "Bakso sapi", w: ["Dadu", "Atap rumah", "Lemari pakaian"] },
    { q: "Manakah yang berbentuk segitiga?", a: "Sajadah lipat segitiga", w: ["Ban sepeda", "Koin emas", "Buku tulis"] },
    { q: "Manakah benda yang berbentuk persegi panjang?", a: "Kasur tidur", w: ["Kelereng", "Topi ulang tahun", "Roda gerobak"] },
    { q: "Gelas minum jika dilihat dari atas berbentuk...?", a: "Lingkaran", w: ["Segitiga", "Kotak", "Bintang"] }
  ];

  for (let i = 0; i < 25; i++) {
    const sq = shapeQuestions[i];
    list.push({
      id: `MATH_TKA_${String(i + 31).padStart(3, "0")}`,
      level: "TK A",
      category: "Matematika",
      question: sq.q,
      options: [sq.a, ...sq.w],
      answer: sq.a
    });
  }

  // 3. Comparisons - Size, height, count (25 questions)
  const compareQuestions = [
    { q: "Hewan mana yang ukurannya paling BESAR?", a: "Gajah", w: ["Semut", "Kucing", "Kelinci"] },
    { q: "Hewan mana yang ukurannya paling KECIL?", a: "Semut", w: ["Kucing", "Sapi", "Kambing"] },
    { q: "Mana benda yang lebih TINGGI?", a: "Pohon kelapa", w: ["Rumput hijau", "Tanaman hias", "Bunga mawar"] },
    { q: "Mana benda yang lebih RINGAN?", a: "Kapas", w: ["Batu besar", "Meja kayu", "Lemari besi"] },
    { q: "Mana benda yang lebih BERAT?", a: "Mobil", w: ["Sepeda mainan", "Balon udara", "Sandal jepit"] },
    { q: "Siapa yang tubuhnya lebih TINGGI?", a: "Ayah", w: ["Adik bayi", "Kakak TK", "Kucing peliharaan"] },
    { q: "Mana yang jumlah kakinya paling BANYAK?", a: "Laba-laba", w: ["Ayam", "Burung pipit", "Kucing"] },
    { q: "Hewan mana yang jalannya paling LAMBAT?", a: "Siput", w: ["Kuda", "Kelinci", "Burung"] },
    { q: "Kendaraan mana yang paling PANJANG?", a: "Kereta api", w: ["Mobil sedan", "Sepeda motor", "Becak"] },
    { q: "Mana yang lebih banyak: 5 permen atau 2 permen?", a: "5 permen", w: ["2 permen", "Sama saja", "Semuanya sedikit"] },
    { q: "Mana yang lebih sedikit: 1 buah apel atau 4 buah apel?", a: "1 buah apel", w: ["4 buah apel", "Sama saja", "Semuanya banyak"] },
    { q: "Buah mana yang kulitnya berduri TAJAM?", a: "Durian", w: ["Apel", "Pisang", "Anggur"] },
    { q: "Benda mana yang teksturnya paling HALUS?", a: "Bulu kelinci", w: ["Batang pohon", "Batu kali", "Jalan aspal"] },
    { q: "Benda mana yang teksturnya KASAR?", a: "Kulit pohon", w: ["Sutra", "Piring kaca", "Cermin"] },
    { q: "Mana yang lebih cepat bergerak?", a: "Burung terbang", w: ["Siput berjalan", "Kura-kura", "Cacing tanah"] },
    { q: "Anak tangga yang paling atas letaknya ada di...?", a: "Paling tinggi", w: ["Paling rendah", "Di bawah tanah", "Di dasar laut"] },
    { q: "Mana yang jumlahnya paling sedikit di wajah kita?", a: "Hidung (1)", w: ["Mata (2)", "Telinga (2)", "Gigi (Banyak)"] },
    { q: "Mana yang lebih pendek?", a: "Pensil baru diraut pendek", w: ["Penggaris panjang", "Tongkat pramuka", "Galah bambu"] },
    { q: "Air di dalam gelas penuh lebih ... daripada gelas kosong?", a: "Berat", w: ["Ringan", "Kecil", "Tipis"] },
    { q: "Wadah mana yang bisa menampung air paling BANYAK?", a: "Ember besar", w: ["Gelas kecil", "Sendok teh", "Tutup botol"] },
    { q: "Hewan mana yang memiliki leher paling PANJANG?", a: "Jerapah", w: ["Gajah", "Kambing", "Kucing"] },
    { q: "Hewan mana yang telinganya paling LEBAR?", a: "Gajah", w: ["Kucing", "Burung", "Semut"] },
    { q: "Mana yang lebih dingin?", a: "Es batu", w: ["Air hangat", "Sup bakso", "Teh manis panas"] },
    { q: "Mana yang paling terang di siang hari?", a: "Matahari", w: ["Lampu senter", "Lilin kecil", "Bintang malam"] },
    { q: "Kendaraan mana yang rodanya paling BANYAK?", a: "Truk tronton", w: ["Sepeda motor", "Becak", "Mobil sedan"] }
  ];

  for (let i = 0; i < 25; i++) {
    const cq = compareQuestions[i];
    list.push({
      id: `MATH_TKA_${String(i + 56).padStart(3, "0")}`,
      level: "TK A",
      category: "Matematika",
      question: cq.q,
      options: [cq.a, ...cq.w],
      answer: cq.a
    });
  }

  // 4. Numbers, sequence and basic sets (20 questions)
  const seqQuestions = [
    { q: "Angka berapa setelah angka 1?", a: "2", w: ["3", "4", "5"] },
    { q: "Angka berapa setelah angka 2?", a: "3", w: ["4", "1", "5"] },
    { q: "Angka berapa setelah angka 3?", a: "4", w: ["5", "2", "6"] },
    { q: "Angka berapa setelah angka 4?", a: "5", w: ["6", "3", "7"] },
    { q: "Angka berapa setelah angka 5?", a: "6", w: ["5", "7", "4"] },
    { q: "Angka berapa sebelum angka 2?", a: "1", w: ["3", "4", "5"] },
    { q: "Angka berapa sebelum angka 3?", a: "2", w: ["1", "4", "5"] },
    { q: "Angka berapa sebelum angka 4?", a: "3", w: ["2", "5", "1"] },
    { q: "Angka berapa sebelum angka 5?", a: "4", w: ["3", "5", "2"] },
    { q: "Berapakah jumlah jari pada satu tangan yang sehat?", a: "5", w: ["4", "3", "2"] },
    { q: "Berapakah jumlah kaki pada seekor ayam?", a: "2", w: ["4", "3", "1"] },
    { q: "Berapakah jumlah roda pada sepeda roda tiga?", a: "3", w: ["2", "4", "1"] },
    { q: "Berapakah jumlah mata pada wajah kita?", a: "2", w: ["1", "3", "4"] },
    { q: "Berapakah jumlah telinga kita?", a: "2", w: ["3", "1", "4"] },
    { q: "Antara angka 2 dan 4, ada angka berapa?", a: "3", w: ["1", "5", "6"] },
    { q: "Antara angka 1 dan 3, ada angka berapa?", a: "2", w: ["4", "5", "6"] },
    { q: "Antara angka 3 dan 5, ada angka berapa?", a: "4", w: ["2", "5", "6"] },
    { q: "Mari berhitung: 1, 2, ..., 4. Angka yang hilang adalah?", a: "3", w: ["5", "1", "6"] },
    { q: "Mari berhitung: 2, 3, 4, ..., 6. Angka yang hilang adalah?", a: "5", w: ["7", "1", "3"] },
    { q: "Berapakah jumlah hidung kita?", a: "1", w: ["2", "3", "4"] }
  ];

  for (let i = 0; i < 20; i++) {
    const sq = seqQuestions[i];
    list.push({
      id: `MATH_TKA_${String(i + 81).padStart(3, "0")}`,
      level: "TK A",
      category: "Matematika",
      question: sq.q,
      options: [sq.a, ...sq.w],
      answer: sq.a
    });
  }

  return list;
}

// Generate Matematika TK B (100 questions)
function generateMathTKB(): Question[] {
  const list: Question[] = [];

  // 1. Addition & Subtraction up to 10/20 (35 questions)
  const addSubQuestions = [
    // Tambah-tambahan sederhana
    { q: "3 ditambah 2 sama dengan...?", a: "5", w: ["4", "6", "7"] },
    { q: "4 ditambah 3 sama dengan...?", a: "7", w: ["6", "8", "9"] },
    { q: "5 ditambah 4 sama dengan...?", a: "9", w: ["8", "10", "7"] },
    { q: "6 ditambah 2 sama dengan...?", a: "8", w: ["7", "9", "10"] },
    { q: "2 ditambah 2 sama dengan...?", a: "4", w: ["3", "5", "6"] },
    { q: "5 ditambah 5 sama dengan...?", a: "10", w: ["9", "11", "8"] },
    { q: "7 ditambah 3 sama dengan...?", a: "10", w: ["9", "8", "11"] },
    { q: "1 ditambah 8 sama dengan...?", a: "9", w: ["8", "10", "7"] },
    { q: "4 ditambah 4 sama dengan...?", a: "8", w: ["7", "9", "10"] },
    { q: "6 ditambah 3 sama dengan...?", a: "9", w: ["8", "10", "7"] },
    
    // Kurang-kurangan sederhana
    { q: "5 dikurangi 2 sama dengan...?", a: "3", w: ["2", "4", "1"] },
    { q: "6 dikurangi 3 sama dengan...?", a: "3", w: ["4", "2", "5"] },
    { q: "8 dikurangi 4 sama dengan...?", a: "4", w: ["3", "5", "6"] },
    { q: "10 dikurangi 5 sama dengan...?", a: "5", w: ["4", "6", "7"] },
    { q: "4 dikurangi 2 sama dengan...?", a: "2", w: ["1", "3", "4"] },
    { q: "9 dikurangi 3 sama dengan...?", a: "6", w: ["5", "7", "8"] },
    { q: "7 dikurangi 2 sama dengan...?", a: "5", w: ["4", "6", "3"] },
    { q: "8 dikurangi 5 sama dengan...?", a: "3", w: ["4", "2", "5"] },
    { q: "10 dikurangi 3 sama dengan...?", a: "7", w: ["6", "8", "9"] },
    { q: "5 dikurangi 5 sama dengan...?", a: "0", w: ["1", "2", "3"] },

    // Soal cerita sederhana
    { q: "Budi punya 5 kelereng, lalu diberi Kakak 3 kelereng. Berapa kelereng Budi sekarang?", a: "8 kelereng", w: ["7 kelereng", "9 kelereng", "6 kelereng"] },
    { q: "Siti memetik 6 apel, lalu memberikan 2 apel ke Siti. Berapa sisa apel Siti?", a: "4 apel", w: ["3 apel", "5 apel", "2 apel"] },
    { q: "Ada 4 burung di pohon, terbang lagi 3 burung ke pohon itu. Berapa burung sekarang?", a: "7 burung", w: ["6 burung", "8 burung", "5 burung"] },
    { q: "Ayah membeli 10 telur, ternyata pecah 2 telur. Berapa telur yang utuh?", a: "8 telur", w: ["9 telur", "7 telur", "6 telur"] },
    { q: "Adik mempunyai 3 balon, Ayah membelikan 4 balon lagi. Berapa balon Adik sekarang?", a: "7 balon", w: ["6 balon", "8 balon", "5 balon"] },
    { q: "Di kolam ada 8 ikan mas, dipancing Kakak 3 ikan mas. Sisa berapa ikan di kolam?", a: "5 ikan mas", w: ["4 ikan mas", "6 ikan mas", "3 ikan mas"] },
    { q: "Siti membagikan 5 biskuit kepada temannya, ia mula-mula punya 9 biskuit. Berapa sisa biskuit Siti?", a: "4 biskuit", w: ["5 biskuit", "3 biskuit", "2 biskuit"] },
    { q: "Ada 3 mobil di parkiran, masuk lagi 5 mobil. Berapa jumlah mobil di parkiran sekarang?", a: "8 mobil", w: ["7 mobil", "9 mobil", "6 mobil"] },
    { q: "Di piring ada 10 kue, dimakan Adik 4 kue. Berapa sisa kue di piring?", a: "6 kue", w: ["5 kue", "7 kue", "4 kue"] },
    { q: "Ani punya 2 boneka, Ibu membelikan 5 boneka lagi. Berapa boneka Ani sekarang?", a: "7 boneka", w: ["6 boneka", "8 boneka", "5 boneka"] },
    
    // Angka 11-20
    { q: "10 ditambah 2 sama dengan...?", a: "12", w: ["11", "13", "14"] },
    { q: "12 ditambah 3 sama dengan...?", a: "15", w: ["14", "16", "17"] },
    { q: "15 dikurangi 5 sama dengan...?", a: "10", w: ["11", "9", "12"] },
    { q: "11 ditambah 4 sama dengan...?", a: "15", w: ["13", "16", "14"] },
    { q: "14 dikurangi 2 sama dengan...?", a: "12", w: ["13", "11", "10"] }
  ];

  for (let i = 0; i < 35; i++) {
    const aq = addSubQuestions[i];
    list.push({
      id: `MATH_TKB_${String(i + 1).padStart(3, "0")}`,
      level: "TK B",
      category: "Matematika",
      question: aq.q,
      options: [aq.a, ...aq.w],
      answer: aq.a
    });
  }

  // 2. Logic, Patterns & Calendar (20 questions)
  const calQuestions = [
    { q: "Setelah hari Senin adalah hari...?", a: "Selasa", w: ["Rabu", "Kamis", "Minggu"] },
    { q: "Setelah hari Rabu adalah hari...?", a: "Kamis", w: ["Jumat", "Selasa", "Sabtu"] },
    { q: "Sebelum hari Minggu adalah hari...?", a: "Sabtu", w: ["Senin", "Jumat", "Selasa"] },
    { q: "Dalam satu minggu, ada berapa hari?", a: "7 hari", w: ["5 hari", "6 hari", "8 hari"] },
    { q: "Hari libur sekolah biasanya jatuh pada hari...?", a: "Minggu", w: ["Senin", "Selasa", "Rabu"] },
    { q: "Sebelum hari Selasa adalah hari...?", a: "Senin", w: ["Rabu", "Minggu", "Sabtu"] },
    { q: "Lengkapi pola warna ini: Merah, Hijau, Merah, Hijau, ...?", a: "Merah", w: ["Kuning", "Biru", "Hitam"] },
    { q: "Lengkapi pola bentuk ini: Segitiga, Bulat, Segitiga, Bulat, ...?", a: "Segitiga", w: ["Bulat", "Kotak", "Bintang"] },
    { q: "Lengkapi pola angka ini: 2, 4, 6, 8, ...?", a: "10", w: ["9", "11", "12"] },
    { q: "Lengkapi pola angka ini: 1, 3, 5, 7, ...?", a: "9", w: ["8", "10", "11"] },
    { q: "Lengkapi pola lompat: 5, 10, 15, ...?", a: "20", w: ["16", "18", "25"] },
    { q: "Setelah bulan Januari adalah bulan...?" , a: "Februari", w: ["Maret", "April", "Desember"] },
    { q: "Bulan terakhir dalam satu tahun adalah bulan...?", a: "Desember", w: ["Januari", "November", "Oktober"] },
    { q: "Ada berapa bulan dalam satu tahun?", a: "12 bulan", w: ["10 bulan", "11 bulan", "13 bulan"] },
    { q: "Jika kemarin hari Jumat, maka hari ini adalah hari...?", a: "Sabtu", w: ["Minggu", "Kamis", "Senin"] },
    { q: "Jika besok hari Kamis, maka hari ini adalah hari...?", a: "Rabu", w: ["Selasa", "Jumat", "Senin"] },
    { q: "Bila kita mengurutkan ukuran: kecil, sedang, ...?", a: "besar", w: ["sempit", "tinggi", "panjang"] },
    { q: "Pola buah: Pisang, Apel, Pisang, Apel, ...?", a: "Pisang", w: ["Apel", "Jeruk", "Semangka"] },
    { q: "Urutkan angka dari yang terbesar: 5, 4, 3, ...?", a: "2", w: ["6", "1", "5"] },
    { q: "Pola tepuk tangan: Tepuk 1x, Tepuk 2x, Tepuk 1x, ...?", a: "Tepuk 2x", w: ["Tepuk 3x", "Tepuk 4x", "Diam"] }
  ];

  for (let i = 0; i < 20; i++) {
    const cq = calQuestions[i];
    list.push({
      id: `MATH_TKB_${String(i + 36).padStart(3, "0")}`,
      level: "TK B",
      category: "Matematika",
      question: cq.q,
      options: [cq.a, ...cq.w],
      answer: cq.a
    });
  }

  // 3. Time, Hours, Directions (20 questions)
  const timeQuestions = [
    { q: "Jika jarum pendek di angka 9 dan jarum panjang di angka 12, maka sekarang jam...?", a: "9 tepat", w: ["12 tepat", "3 tepat", "6 tepat"] },
    { q: "Jika jarum pendek di angka 12 dan jarum panjang di angka 12, maka sekarang jam...?", a: "12 tepat", w: ["6 tepat", "1 tepat", "12 lewat sedikit"] },
    { q: "Adik bangun tidur biasanya pada waktu...?", a: "Pagi hari", w: ["Malam hari", "Siang hari", "Tengah malam"] },
    { q: "Matahari terbit di sebelah timur pada waktu...?", a: "Pagi hari", w: ["Sore hari", "Malam hari", "Siang hari"] },
    { q: "Kita tidur malam hari biasanya saat langit sudah...?", a: "Gelap", w: ["Terang", "Kuning", "Biru muda"] },
    { q: "Matahari terbenam menandakan datangnya waktu...?", a: "Malam / Sore", w: ["Pagi", "Siang", "Subuh"] },
    { q: "Arah matahari terbenam berada di sebelah...?", a: "Barat", w: ["Timur", "Utara", "Selatan"] },
    { q: "Jarum jam yang berputar paling cepat menunjukkan...?", a: "Detik", w: ["Jam", "Menit", "Hari"] },
    { q: "Alat untuk mengukur waktu disebut...?", a: "Jam dinding", w: ["Penggaris", "Timbangan", "Termometer"] },
    { q: "Kita makan siang bersama keluarga di jam...?", a: "12.00 siang", w: ["07.00 malam", "12.00 malam", "05.00 pagi"] },
    { q: "Berapa kali kita makan utama dalam sehari untuk tubuh sehat?", a: "3 kali", w: ["1 kali", "5 kali", "10 kali"] },
    { q: "Jarum panjang pada jam dinding digunakan untuk menunjukkan...?", a: "Menit", w: ["Jam", "Detik", "Hari"] },
    { q: "Jarum pendek pada jam dinding digunakan untuk menunjukkan...?", a: "Jam", w: ["Menit", "Detik", "Tanggal"] },
    { q: "Sebelum makan malam kita melakukan kegiatan belajar di waktu...?", a: "Sore / Malam hari", w: ["Tengah malam", "Tidur nyenyak", "Bermain layangan siang bolong"] },
    { q: "Awan putih bersih terlihat jelas di langit pada waktu...?", a: "Siang hari yang cerah", w: ["Malam gelap", "Tengah malam sunyi", "Subuh fajar"] },
    { q: "Lilin dinyalakan untuk menerangi ruangan saat...?", a: "Mati lampu / Gelap", w: ["Siang terik", "Matahari bersinar", "Pagi cerah"] },
    { q: "Jarum pendek jam menunjuk angka 6, jarum panjang menunjuk angka 12. Berarti jam...?", a: "6 tepat", w: ["12 tepat", "9 tepat", "3 tepat"] },
    { q: "Kita biasanya pergi ke sekolah TK di jam...?", a: "07.00 pagi", w: ["12.00 malam", "07.00 malam", "03.00 sore"] },
    { q: "Berapa jam biasanya anak-anak tidur malam yang baik?", a: "8 jam", w: ["1 jam", "20 jam", "2 jam"] },
    { q: "Bayangan kita di luar ruangan akan terlihat sangat pendek saat jam...?", a: "12 siang", w: ["7 pagi", "5 sore", "8 malam"] }
  ];

  for (let i = 0; i < 20; i++) {
    const tq = timeQuestions[i];
    list.push({
      id: `MATH_TKB_${String(i + 56).padStart(3, "0")}`,
      level: "TK B",
      category: "Matematika",
      question: tq.q,
      options: [tq.a, ...tq.w],
      answer: tq.a
    });
  }

  // 4. Advanced Logic & Comparison (25 questions)
  const advCompare = [
    { q: "Manakah angka yang nilainya lebih BESAR dari 12?", a: "15", w: ["10", "8", "12"] },
    { q: "Manakah angka yang nilainya lebih KECIL dari 15?", a: "11", w: ["18", "20", "16"] },
    { q: "Angka di antara 14 dan 16 adalah...?", a: "15", w: ["13", "17", "12"] },
    { q: "Angka di antara 18 dan 20 adalah...?", a: "19", w: ["17", "21", "18"] },
    { q: "Jika satu buah pizza dipotong dua sama besar, satu potongnya disebut...?", a: "Setengah / Satu per dua", w: ["Satu", "Tiga", "Seperempat"] },
    { q: "Jika ada 4 potong kue dan dimakan 2 potong, maka kue tersebut sisa...?", a: "Setengah bagian", w: ["Satu bagian utuh", "Tidak ada sisa", "Tiga per empat"] },
    { q: "Urutan angka yang benar dari terkecil ke terbesar adalah...?", a: "8, 9, 10", w: ["10, 9, 8", "9, 8, 10", "8, 10, 9"] },
    { q: "Urutan angka yang benar dari terbesar ke terkecil adalah...?", a: "15, 14, 13", w: ["13, 14, 15", "14, 15, 13", "15, 13, 14"] },
    { q: "Manakah bilangan genap di bawah ini?", a: "2", w: ["1", "3", "5"] },
    { q: "Angka yang terletak sebelum angka 11 adalah...?", a: "10", w: ["12", "9", "13"] },
    { q: "Angka yang terletak sesudah angka 19 adalah...?", a: "20", w: ["18", "21", "19"] },
    { q: "Di antara angka 10, 15, dan 8, manakah yang paling kecil?", a: "8", w: ["10", "15", "Sama semua"] },
    { q: "Di antara angka 11, 19, dan 14, manakah yang paling besar?", a: "19", w: ["11", "14", "Semuanya kecil"] },
    { q: "Berapa jumlah sudut pada bangun segi empat?", a: "4 sudut", w: ["3 sudut", "5 sudut", "Tidak ada"] },
    { q: "Berapa jumlah sudut pada bangun segitiga?", a: "3 sudut", w: ["4 sudut", "5 sudut", "6 sudut"] },
    { q: "Bangun datar lingkaran memiliki berapa sudut?", a: "0 sudut (tidak ada)", w: ["4 sudut", "3 sudut", "1 sudut"] },
    { q: "Bila kamu melipat sapu tangan persegi menjadi dua bagian segitiga, kamu mendapat...?", a: "2 segitiga", w: ["4 kotak", "1 lingkaran", "3 bintang"] },
    { q: "Jika kamu menggabungkan dua kotak kecil yang sama, bisa membentuk...?", a: "Persegi panjang", w: ["Segitiga", "Lingkaran", "Bintang"] },
    { q: "Mana yang nilainya sama dengan 10?", a: "5 ditambah 5", w: ["4 ditambah 4", "6 ditambah 2", "7 ditambah 1"] },
    { q: "Mana yang nilainya sama dengan 6?", a: "10 dikurangi 4", w: ["10 dikurangi 2", "8 dikurangi 3", "5 dikurangi 1"] },
    { q: "Uang koin Rp 500 dan Rp 1000, mana yang nilainya lebih besar?", a: "Rp 1000", w: ["Rp 500", "Sama saja", "Semuanya kecil"] },
    { q: "Urutkan pola bangun ini: Kotak, Segitiga, Kotak, Segitiga, ...?", a: "Kotak", w: ["Segitiga", "Lingkaran", "Oval"] },
    { q: "Urutkan angka genap: 10, 12, 14, ...?", a: "16", w: ["15", "17", "18"] },
    { q: "Urutkan angka ganjil: 11, 13, 15, ...?", a: "17", w: ["16", "18", "19"] },
    { q: "Ibu membeli 12 jeruk, Ani memakan 2 jeruk, Ayah memakan 2 jeruk. Berapa sisa jeruk Ibu?", a: "8 jeruk", w: ["10 jeruk", "9 jeruk", "7 jeruk"] }
  ];

  for (let i = 0; i < 25; i++) {
    const aq = advCompare[i];
    list.push({
      id: `MATH_TKB_${String(i + 76).padStart(3, "0")}`,
      level: "TK B",
      category: "Matematika",
      question: aq.q,
      options: [aq.a, ...aq.w],
      answer: aq.a
    });
  }

  return list;
}

// Generate Sains TK A (100 questions)
function generateScienceTKA(): Question[] {
  const list: Question[] = [];

  // 1. Animal Sounds & Habitats (30 questions)
  const animalSounds = [
    { h: "Kucing", s: "meong-meong", t: "darat" },
    { h: "Anjing", s: "guk-guk", t: "darat" },
    { h: "Kambing", s: "mbeek-mbeek", t: "darat" },
    { h: "Sapi", s: "mooh-mooh", t: "darat" },
    { h: "Bebek", s: "kwek-kwek", t: "darat dan air" },
    { h: "Ayam jago", s: "kukuruyuk", t: "darat" },
    { h: "Burung", s: "ciap-ciap / kicau", t: "pohon / udara" },
    { h: "Katak", s: "teot-teblung / kintel", t: "air dan darat" },
    { h: "Tikus", s: "cit-cit", t: "darat" },
    { h: "Ular", s: "desis (sssh)", t: "tanah / pohon" },
    { h: "Harimau", s: "auman keras (aummm)", t: "hutan / darat" },
    { h: "Kuda", s: "meringkik (hihiiiik)", t: "darat" },
    { h: "Nyamuk", s: "dengungan tipis (nguung)", t: "udara" },
    { h: "Lebah", s: "dengungan madu (bzzz)", t: "udara" },
    { h: "Ikan mas", s: "tanpa suara (membuka mulut)", t: "dalam air" }
  ];

  // Sounds (15 questions)
  for (let i = 0; i < 15; i++) {
    const item = animalSounds[i];
    list.push({
      id: `SCI_TKA_${String(i + 1).padStart(3, "0")}`,
      level: "TK A",
      category: "Sains",
      question: `Suara khas yang dikeluarkan oleh hewan ${item.h} adalah...?`,
      options: [
        item.s,
        item.s === "meong-meong" ? "mbeek-mbeek" : "meong-meong",
        item.s === "mooh-mooh" ? "kukuruyuk" : "mooh-mooh",
        item.s === "cit-cit" ? "guk-guk" : "cit-cit"
      ],
      answer: item.s
    });
  }

  // Habitats & Diet (15 questions)
  const habitats = [
    { q: "Hewan apa yang hidup bebas berenang di dalam air?", a: "Ikan mas", w: ["Kucing", "Ayam", "Burung pipit"] },
    { q: "Hewan apa yang suka terbang tinggi di udara?", a: "Burung merpati", w: ["Kambing", "Sapi", "Cacing tanah"] },
    { q: "Di manakah tempat tinggal ikan lumba-lumba?", a: "Laut / Air", w: ["Pohon tinggi", "Tanah kering", "Kandang jerami"] },
    { q: "Hewan apa yang suka memakan wortel?", a: "Kelinci", w: ["Kucing", "Ayam", "Harimau"] },
    { q: "Monyet adalah hewan lincah yang sangat menyukai buah...?", a: "Pisang", w: ["Durian", "Kelapa", "Manggis"] },
    { q: "Hewan peliharaan yang suka makan ikan dan minum susu adalah...?", a: "Kucing", w: ["Ular", "Kuda", "Kambing"] },
    { q: "Hewan apa yang menghasilkan susu sehat untuk kita minum?", a: "Sapi", w: ["Ayam", "Kucing", "Kelinci"] },
    { q: "Hewan apa yang menghasilkan madu manis yang lezat?", a: "Lebah", w: ["Semut", "Kupu-kupu", "Lalat"] },
    { q: "Hewan lambat yang membawa 'rumahnya' di punggung adalah...?", a: "Siput / Bekicot", w: ["Kelinci", "Kucing", "Burung"] },
    { q: "Hewan apa yang suka memakan biji-bijian dan berkokok di pagi hari?", a: "Ayam jago", w: ["Anjing", "Sapi", "Singa"] },
    { q: "Kambing adalah hewan pemakan...?", a: "Rumput hijau", w: ["Ikan bakar", "Daging sapi", "Nasi goreng"] },
    { q: "Hewan yang memiliki belalai panjang untuk mengambil air adalah...?", a: "Gajah", w: ["Jerapah", "Singa", "Kelinci"] },
    { q: "Semut sangat menyukai makanan yang rasanya...?", a: "Manis (Gula)", w: ["Asin (Garam)", "Pahit (Obat)", "Pedas (Cabai)"] },
    { q: "Burung pipit membuat rumahnya berupa sarang di...?", a: "Dahan pohon", w: ["Dalam air kolam", "Dalam tanah", "Lantai rumah"] },
    { q: "Cacing tanah membantu menyuburkan tanah dengan tinggal di dalam...?", a: "Dalam tanah", w: ["Atap genteng", "Dahan pohon", "Air kolam"] }
  ];

  for (let i = 0; i < 15; i++) {
    const hq = habitats[i];
    list.push({
      id: `SCI_TKA_${String(i + 16).padStart(3, "0")}`,
      level: "TK A",
      category: "Sains",
      question: hq.q,
      options: [hq.a, ...hq.w],
      answer: hq.a
    });
  }

  // 2. Human Body & Five Senses (25 questions)
  const bodyQuestions = [
    { q: "Bagian tubuh mana yang kita gunakan untuk melihat indahnya warna pelangi?", a: "Mata", w: ["Telinga", "Hidung", "Mulut"] },
    { q: "Kita mendengarkan suara nasihat Ibu dengan menggunakan...?", a: "Telinga", w: ["Mata", "Hidung", "Tangan"] },
    { q: "Pancaindra yang kita gunakan untuk menghirup wangi bunga mawar adalah...?", a: "Hidung", w: ["Lidah", "Mata", "Kulit"] },
    { q: "Untuk merasakan manisnya es krim cokelat, kita menggunakan pancaindra...?", a: "Lidah / Mulut", w: ["Hidung", "Mata", "Telinga"] },
    { q: "Saat memegang bulu kucing yang lembut, kita merasakannya dengan...?", a: "Kulit / Tangan", w: ["Telinga", "Mata", "Hidung"] },
    { q: "Bagian tubuh yang paling atas dan ditumbuhi rambut adalah...?", a: "Kepala", w: ["Kaki", "Perut", "Tangan"] },
    { q: "Kita memakai sepatu dan kaos kaki pada bagian tubuh...?", a: "Kaki", w: ["Tangan", "Kepala", "Leher"] },
    { q: "Untuk menulis dan menggambar, kita menggunakan jemari...?", a: "Tangan", w: ["Kaki", "Lidah", "Telinga"] },
    { q: "Bagian tubuh di dalam mulut yang berfungsi untuk mengunyah makanan adalah...?", a: "Gigi", w: ["Hidung", "Mata", "Telinga"] },
    { q: "Kita memakai jam tangan pada bagian...?", a: "Pergelangan tangan", w: ["Leher", "Kaki", "Pinggang"] },
    { q: "Topi dipasang di bagian tubuh mana?", a: "Kepala", w: ["Kaki", "Tangan", "Perut"] },
    { q: "Kacamata dipasang untuk membantu indra...?", a: "Mata (Melihat)", w: ["Hidung (Mencium)", "Telinga (Mendengar)", "Lidah (Mengecap)"] },
    { q: "Bagian tubuh yang berbunyi 'krucuk-krucuk' saat kita lapar adalah...?", a: "Perut", w: ["Kepala", "Kaki", "Tangan"] },
    { q: "Masker wajah dipasang untuk menutupi bagian...?", a: "Hidung dan Mulut", w: ["Mata dan Telinga", "Rambut", "Kaki dan Tangan"] },
    { q: "Ada berapa jumlah mata yang sehat di wajah kita?", a: "2 buah", w: ["1 buah", "3 buah", "4 buah"] },
    { q: "Kita memiliki berapa jumlah ibu jari tangan?", a: "2 buah", w: ["5 buah", "10 buah", "1 buah"] },
    { q: "Bagian tubuh yang menghubungkan kepala dengan dada kita adalah...?", a: "Leher", w: ["Kaki", "Tangan", "Jari"] },
    { q: "Pancaindra kita berjumlah berapa jenis?", a: "5 jenis (pancaindra)", w: ["3 jenis", "4 jenis", "6 jenis"] },
    { q: "Saat udara sangat dingin, bagian luar tubuh kita akan merasakannya lewat...?", a: "Kulit", w: ["Rambut", "Kuku", "Gigi"] },
    { q: "Ketika ditiup angin, bagian kepala yang bergoyang lembut adalah...?", a: "Rambut", w: ["Gigi", "Kuku", "Akar"] },
    { q: "Sikat gigi digunakan untuk membersihkan bagian...?", a: "Gigi dan Mulut", w: ["Rambut kepala", "Kuku tangan", "Kaki bawah"] },
    { q: "Kita melompat menggunakan kekuatan otot...?", a: "Kaki", w: ["Telinga", "Hidung", "Mata"] },
    { q: "Kita melambaikan tangan sebagai tanda menyapa menggunakan...?", a: "Tangan", w: ["Kaki", "Hidung", "Kepala"] },
    { q: "Pancaindra yang berada di dalam mulut adalah...?", a: "Lidah", w: ["Mata", "Hidung", "Telinga"] },
    { q: "Bulu mata berfungsi untuk melindungi bagian...?", a: "Mata", w: ["Hidung", "Telinga", "Pipi"] }
  ];

  for (let i = 0; i < 25; i++) {
    const bq = bodyQuestions[i];
    list.push({
      id: `SCI_TKA_${String(i + 31).padStart(3, "0")}`,
      level: "TK A",
      category: "Sains",
      question: bq.q,
      options: [bq.a, ...bq.w],
      answer: bq.a
    });
  }

  // 3. Plants, Nature & Weather (25 questions)
  const plantQuestions = [
    { q: "Bagian pohon yang berwarna hijau, tipis, dan tumbuh di dahan adalah...?", a: "Daun", w: ["Akar", "Tanah", "Batu"] },
    { q: "Bagian tumbuhan yang harum, indah, dan berwarna-warni menarik lebah adalah...?", a: "Bunga", w: ["Akar", "Duri", "Biji"] },
    { q: "Bagian pohon kelapa yang berair manis dan berdaging putih di dalamnya adalah...?", a: "Buah kelapa", w: ["Akar kelapa", "Daun kelapa", "Batang kelapa"] },
    { q: "Tumbuhan membutuhkan siraman air dan cahaya ... agar tumbuh subur?", a: "Matahari", w: ["Lampu kamar", "Angin malam", "Es batu"] },
    { q: "Warna daun pohon mangga yang sehat pada umumnya adalah...?", a: "Hijau", w: ["Merah terang", "Biru muda", "Hitam pekat"] },
    { q: "Benda langit kuning bulat yang bersinar sangat terang di siang hari adalah...?", a: "Matahari", w: ["Bulan", "Bintang", "Pelangi"] },
    { q: "Benda langit yang sering terlihat berkelap-kelip indah di malam hari adalah...?", a: "Bintang", w: ["Matahari", "Awan mendung", "Pelangi"] },
    { q: "Saat awan di langit berwarna abu-abu gelap/hitam, tandanya akan segera...?", a: "Turun hujan", w: ["Siang hari", "Matahari terbit", "Udara panas sekali"] },
    { q: "Air hujan rasanya...?", a: "Tawar (tidak manis)", w: ["Manis seperti es sirup", "Asin seperti garam", "Pahit sekali"] },
    { q: "Benda yang kita pakai saat hujan turun agar tubuh tidak basah adalah...?", a: "Payung / Jas hujan", w: ["Sandal kayu", "Kacamata hitam", "Topi jerami"] },
    { q: "Udara yang bergerak dan mengayunkan daun di pohon disebut...?", a: "Angin", w: ["Air", "Tanah", "Api"] },
    { q: "Warna dari awan yang cerah di siang hari yang indah adalah...?", a: "Putih", w: ["Merah", "Hitam", "Hijau"] },
    { q: "Benda apa yang terasa sangat dingin dan membeku di dalam kulkas?", a: "Es batu", w: ["Air hangat", "Sup sayur", "Nasi hangat"] },
    { q: "Tanaman diletakkan di dalam pot berisi ... agar akarnya mendapat makanan?", a: "Tanah subur", w: ["Air sabun", "Batu kerikil tajam", "Minyak goreng"] },
    { q: "Bunga mawar memiliki batang yang berbahaya karena dipenuhi...?", a: "Duri tajam", w: ["Bulu halus", "Buah manis", "Air madu"] },
    { q: "Buah pisang yang sudah matang dan manis kulitnya berwarna...?", a: "Kuning", w: ["Biru", "Hitam", "Ungu"] },
    { q: "Buah jeruk biasanya berbentuk...?", a: "Bulat", w: ["Segitiga", "Kotak", "Bintang"] },
    { q: "Pohon cemara biasanya sering kita lihat dipajang saat hari raya...?", a: "Natal", w: ["Lebaran", "Nyepi", "Waisak"] },
    { q: "Awan putih melayang tinggi di...?", a: "Langit", w: ["Tanah", "Lantai", "Bawah meja"] },
    { q: "Saat cuaca panas terik, tubuh kita akan mengeluarkan...?", a: "Keringat", w: ["Air mata", "Darah", "Es batu"] },
    { q: "Manakah bunga yang indah dan terkenal sangat harum?", a: "Bunga Melati", w: ["Bunga Plastik", "Rumput teki", "Pohon mangga"] },
    { q: "Manakah buah yang memiliki banyak biji kecil di dalamnya?", a: "Semangka", w: ["Mangga (1 biji besar)", "Alpukat (1 biji)", "Rambutan"] },
    { q: "Alat perkembangbiakan tanaman yang biasanya ditanam di dalam tanah adalah...?", a: "Biji", w: ["Daun", "Duri", "Bunga kering"] },
    { q: "Pelangi yang indah berwarna-warni muncul setelah adanya...?", a: "Hujan dan Matahari", w: ["Malam yang gelap", "Angin topan kencang", "Gerhana bulan"] },
    { q: "Kita menyiram tanaman hias sebaiknya menggunakan air yang...?", a: "Bersih", w: ["Panas mendidih", "Bercampur sabun cuci", "Minyak tanah"] }
  ];

  for (let i = 0; i < 25; i++) {
    const pq = plantQuestions[i];
    list.push({
      id: `SCI_TKA_${String(i + 56).padStart(3, "0")}`,
      level: "TK A",
      category: "Sains",
      question: pq.q,
      options: [pq.a, ...pq.w],
      answer: pq.a
    });
  }

  // 4. Physical World & Properties (20 questions)
  const physicalQuestions = [
    { q: "Benda yang terbuat dari kaca, seperti cermin dan gelas, jika jatuh akan...?", a: "Pecah", w: ["Membal", "Mencair", "Menjadi balon"] },
    { q: "Benda yang ditiup menjadi besar dan melayang di udara adalah...?", a: "Balon gas", w: ["Batu kali", "Buku tulis", "Sandal jepit"] },
    { q: "Minyak goreng berwujud benda...?", a: "Cair", w: ["Padat keras", "Gas / Angin", "Beku"] },
    { q: "Meja belajar anak-anak pada umumnya berwujud benda...?", a: "Padat keras", w: ["Cair basah", "Gas tak terlihat", "Mencair"] },
    { q: "Benda yang rasanya manis sekali adalah...?", a: "Gula pasir", w: ["Garam dapur", "Cuka masam", "Obat sirup pahit"] },
    { q: "Benda yang rasanya asin dan biasa dipakai Ibu memasak di dapur adalah...?", a: "Garam dapur", w: ["Gula tebu", "Madu lebah", "Meses cokelat"] },
    { q: "Kertas gambar jika terkena air akan menjadi...?", a: "Basah dan Sobek", w: ["Keras seperti besi", "Kering sekali", "Harum wangi"] },
    { q: "Batu kali memiliki tekstur permukaan yang...?", a: "Keras dan Kasar", w: ["Sangat lembut", "Cair basah", "Mudah hancur ditiup"] },
    { q: "Bantal tidur rasanya empuk karena di dalamnya diisi oleh...?", a: "Kapas / Dakron", w: ["Batu kerikil", "Besi batangan", "Air keran"] },
    { q: "Spons pencuci piring memiliki sifat...?", a: "Empuk dan Menyerap air", w: ["Keras dan Tajam", "Licin sekali", "Mudah patah keras"] },
    { q: "Lampu senter mengeluarkan energi berupa...?", a: "Cahaya terang", w: ["Air bersih", "Suara musik", "Angin dingin"] },
    { q: "Radio yang dinyalakan mengeluarkan energi berupa...?", a: "Suara / Bunyi", w: ["Cahaya lampu", "Angin segar", "Panas api"] },
    { q: "Kompor di dapur mengeluarkan energi berupa...?", a: "Panas api", w: ["Dingin es", "Cahaya pelangi", "Air mengalir"] },
    { q: "Benda apa yang bisa menggelinding dengan mudah di lantai?", a: "Bola bulat", w: ["Buku kotak", "Kotak pensil", "Penghapus papan"] },
    { q: "Benda yang licin di kamar mandi dan menghasilkan banyak busa adalah...?", a: "Sabun mandi", w: ["Sikat gigi", "Gayung air", "Handuk kering"] },
    { q: "Ban sepeda diisi dengan ... agar mengembang keras?", a: "Udara / Angin", w: ["Air keran", "Batu pasir", "Tanah liat"] },
    { q: "Benda apa yang berbunyi nyaring saat dipukul Pak Guru untuk tanda masuk kelas?", a: "Lonceng besi", w: ["Buku gambar", "Bantal sofa", "Spons busa"] },
    { q: "Manakah mainan yang aman dimainkan anak TK karena teksturnya empuk?", a: "Boneka kain", w: ["Pecahan kaca", "Pisau dapur", "Paku besi"] },
    { q: "Air di dalam botol jika dimiringkan akan...?", a: "Ikut miring (mengikuti wadah)", w: ["Tetap tegak keras", "Berubah menjadi es", "Hilang menguap"] },
    { q: "Sampah sisa makanan sebaiknya kita buang ke dalam...?", a: "Tempat sampah", w: ["Lantai kelas", "Sungai mengalir", "Halaman tetangga"] }
  ];

  for (let i = 0; i < 20; i++) {
    const ph = physicalQuestions[i];
    list.push({
      id: `SCI_TKA_${String(i + 81).padStart(3, "0")}`,
      level: "TK A",
      category: "Sains",
      question: ph.q,
      options: [ph.a, ...ph.w],
      answer: ph.a
    });
  }

  return list;
}

// Generate Sains TK B (100 questions)
function generateScienceTKB(): Question[] {
  const list: Question[] = [];

  // 1. Lifecycles, Food Chain & Animal Classifications (30 questions)
  const lifeCycleQuestions = [
    { q: "Sebelum menjadi kupu-kupu yang indah, ia berwujud telur lalu menjadi...?", a: "Ulat", w: ["Semut", "Belalang", "Kecoa"] },
    { q: "Ulat membungkus dirinya di dahan pohon menjadi ... sebelum berubah menjadi kupu-kupu?", a: "Kepompong", w: ["Bunga", "Daun", "Buah"] },
    { q: "Anak katak yang baru menetas dari telur dan hidup berenang di air disebut...?", a: "Berudu / Kecebong", w: ["Katak dewasa", "Ikan kecil", "Ulat air"] },
    { q: "Hewan mamalia berkembang biak dengan melahirkan anak dan menyusui. Contohnya...?", a: "Sapi dan Kambing", w: ["Ayam dan Bebek", "Ikan mas", "Kupu-kupu"] },
    { q: "Hewan unggas yang bertelur, memiliki sayap dan paruh adalah...?", a: "Bebek dan Ayam", w: ["Kucing dan Anjing", "Sapi dan Kerbau", "Ular dan Buaya"] },
    { q: "Sebelum menjadi ayam yang berkokok jantan, ia berwujud...?", a: "Telur ayam", w: ["Anak burung", "Kupu-kupu", "Anak bebek"] },
    { q: "Hewan apa yang bisa hidup di dua alam, yaitu di darat dan di air?", a: "Katak", w: ["Kucing", "Burung", "Kelinci"] },
    { q: "Hewan pemakan tumbuhan (herbivora) contohnya adalah...?", a: "Kelinci dan Sapi", w: ["Singa dan Harimau", "Kucing", "Ular"] },
    { q: "Hewan pemakan daging (karnivora) contohnya adalah...?", a: "Singa dan Harimau", w: ["Kambing dan Sapi", "Kelinci", "Ulat daun"] },
    { q: "Cicak melindungi diri dari kejaran musuh dengan cara...?", a: "Memutuskan ekornya", w: ["Terbang tinggi", "Masuk ke air", "Pura-pura mati"] },
    { q: "Burung hantu adalah hewan nokturnal, artinya ia mencari makan pada...?", a: "Malam hari", w: ["Siang hari", "Pagi subuh", "Tengah hari"] },
    { q: "Hewan melata yang tidak memiliki kaki dan berjalan dengan perutnya adalah...?", a: "Ular", w: ["Kadal", "Katak", "Kelinci"] },
    { q: "Kelelawar tidur menggantung dengan kepala di bawah pada waktu...?", a: "Siang hari", w: ["Malam hari", "Tengah malam", "Pagi subuh"] },
    { q: "Unta dapat bertahan hidup di padang pasir yang panas karena memiliki ... di punggungnya?", a: "Punuk penyimpanan lemak", w: ["Kantung air minum", "Sayap lebar", "Tanduk tajam"] },
    { q: "Bulu tebal pada beruang kutub berfungsi untuk...?", a: "Menjaga tubuh tetap hangat", w: ["Membantu berenang cepat", "Menakuti musuh", "Menyimpan sisa makanan"] },
    { q: "Hewan laut yang bernapas dengan paru-paru dan menyusui anaknya adalah...?", a: "Paus / Lumba-lumba", w: ["Ikan hiu", "Kepiting", "Cumi-cumi"] },
    { q: "Hewan apa yang merayap di dinding dan suka memakan nyamuk?", a: "Cicak", w: ["Kucing", "Burung", "Semut"] },
    { q: "Bebek dapat berenang dengan mudah di permukaan air karena kakinya memiliki...?", a: "Selaput renang", w: ["Kuku cakar tajam", "Bulu lebat", "Sepatu karet"] },
    { q: "Tumbuhan hijau membuat makanannya sendiri dengan bantuan cahaya...?", a: "Matahari", w: ["Lampu neon", "Bulan", "Bintang"] },
    { q: "Hewan terkecil yang hidup berkelompok dan sangat rajin bekerja sama adalah...?", a: "Semut", w: ["Kucing", "Gajah", "Burung"] },
    { q: "Ulat sutra sangat disukai manusia karena dapat menghasilkan benang untuk membuat...?", a: "Kain sutra yang mewah", w: ["Tali sepatu", "Kertas gambar", "Batu bata"] },
    { q: "Hewan apa yang bernapas menggunakan insang di dalam air?", a: "Ikan", w: ["Burung", "Kucing", "Kambing"] },
    { q: "Hewan reptil yang kulitnya bersisik keras dan merayap contohnya...?", a: "Kadal dan Ular", w: ["Ayam dan Burung", "Kucing dan Kelinci", "Katak"] },
    { q: "Mengapa burung memiliki tulang yang berongga dan ringan?", a: "Agar mudah terbang", w: ["Agar bisa menyelam", "Agar tidak kedinginan", "Agar suaranya merdu"] },
    { q: "Hewan yang mengalami metamorfosis sempurna adalah...?", a: "Kupu-kupu", w: ["Kucing", "Ayam", "Kambing"] },
    { q: "Hewan yang melindungi tubuhnya dengan cangkang sangat keras adalah...?", a: "Kura-kura", w: ["Kelinci", "Cacing", "Ular"] },
    { q: "Bagaimana cara pohon pisang berkembang biak menghasilkan pohon baru?", a: "Tumbuh tunas di sampingnya", w: ["Dari biji pisang", "Dari daun yang gugur", "Dari duri batang"] },
    { q: "Burung pelatuk mematok batang pohon untuk...?", a: "Mencari serangga makanan", w: ["Membuat lubang mainan", "Menajamkan paruh saja", "Mencari air minum"] },
    { q: "Mengapa harimau memiliki motif loreng-loreng di badannya?", a: "Untuk menyamar di semak-semak", w: ["Agar terlihat lucu", "Agar tidak kepanasan", "Untuk menarik perhatian burung"] },
    { q: "Hewan yang menyerap air dan makanan menggunakan tentakel di laut adalah...?", a: "Gurita / Cumi-cumi", w: ["Ikan mas", "Kepiting", "Kerang"] }
  ];

  for (let i = 0; i < 30; i++) {
    const lq = lifeCycleQuestions[i];
    list.push({
      id: `SCI_TKB_${String(i + 1).padStart(3, "0")}`,
      level: "TK B",
      category: "Sains",
      question: lq.q,
      options: [lq.a, ...lq.w],
      answer: lq.a
    });
  }

  // 2. Solar System, Earth Science & Environment (25 questions)
  const earthQuestions = [
    { q: "Planet tempat tinggal seluruh manusia, hewan, dan tumbuhan bernama...?", a: "Bumi", w: ["Mars", "Yupiter", "Bulan"] },
    { q: "Bumi mengelilingi bintang raksasa yang sangat panas, yaitu...?", a: "Matahari", w: ["Bulan", "Bintang fajar", "Awan mendung"] },
    { q: "Satu-satunya satelit alami yang mengitari Bumi dan terlihat terang di malam hari adalah...?", a: "Bulan", w: ["Matahari", "Bintang fajar", "Planet Mars"] },
    { q: "Mengapa siang hari terasa panas dan terang benderang?", a: "Karena ada sinar Matahari", w: ["Karena ada lampu kota", "Karena Bulan mendekat", "Karena awan sedang pergi"] },
    { q: "Keadaan bumi berputar pada porosnya menyebabkan terjadinya...?", a: "Siang dan Malam", w: ["Hujan salju", "Pasang air laut saja", "Gerhana matahari total"] },
    { q: "Udara bersih yang kita hirup untuk bernapas sehat disebut...?", a: "Oksigen", w: ["Asap kendaraan", "Debu jalanan", "Uap air kompor"] },
    { q: "Gas berbahaya yang keluar dari knalpot kendaraan bermotor disebut...?", a: "Asap polusi", w: ["Udara segar", "Oksigen sehat", "Uap air bersih"] },
    { q: "Awan hitam pekat di langit menandakan akan terjadinya hujan yang disertai...?", a: "Petir dan Kilat", w: ["Pelangi indah", "Matahari terik", "Hujan salju tebal"] },
    { q: "Bencana alam tanah longsor di pegunungan gundul disebabkan karena...?", a: "Penebangan pohon liar", w: ["Udara terlalu dingin", "Banyak tanaman hias", "Gempa bumi kecil"] },
    { q: "Membuang sampah plastik ke sungai dapat menyebabkan bencana...?", a: "Banjir bandang", w: ["Gunung meletus", "Gempa bumi", "Angin puyuh"] },
    { q: "Kita harus menghemat penggunaan air bersih agar...?", a: "Tidak kekurangan saat kemarau", w: ["Air di laut habis", "Bumi menjadi beku", "Tanaman mati kebasahan"] },
    { q: "Bahan bakar kendaraan bermotor seperti mobil dan motor berasal dari...?", a: "Minyak bumi", w: ["Air kelapa", "Gas oksigen", "Pasir sungai"] },
    { q: "Benda langit yang memiliki ekor cahaya saat meluncur jatuh disebut...?", a: "Komet / Bintang jatuh", w: ["Matahari", "Bulan sabit", "Awan putih"] },
    { q: "Mengapa kita dilarang menebang pohon di hutan secara sembarangan?", a: "Karena hutan bisa gundul dan banjir", w: ["Agar hewan bisa bermain", "Agar udara menjadi panas", "Agar kayu tidak habis saja"] },
    { q: "Bagaimana cara merawat lingkungan rumah agar bebas dari nyamuk demam berdarah?", a: "Menguras wadah air tergenang", w: ["Menimbun sampah makanan", "Menanam pohon berduri banyak", "Membiarkan selokan mampet"] },
    { q: "Pelangi terdiri dari perpaduan warna indah. Warna pertamanya adalah...?", a: "Merah", w: ["Ungu", "Hijau", "Biru"] },
    { q: "Udara pegunungan terasa sangat sejuk karena banyak terdapat...?", a: "Pohon-pohon hijau", w: ["Gedung bertingkat", "Mobil lalu lalang", "Pasar malam"] },
    { q: "Bumi kita berbentuk bulat menyerupai...?", a: "Bola", w: ["Kotak lemari", "Atap rumah segitiga", "Piring makan"] },
    { q: "Suhu udara di daerah pantai terasa lebih ... dibanding daerah gunung?", a: "Panas", w: ["Dingin sekali", "Beku", "Sejuk basah"] },
    { q: "Batu bara dan gas alam adalah sumber energi yang diperoleh dari...?", a: "Dalam perut bumi", w: ["Dahan pohon tinggi", "Air laut dalam", "Awan melayang"] },
    { q: "Manakah tindakan yang termasuk menjaga kelestarian alam lingkungan?", a: "Menanam bibit pohon baru", w: ["Membakar sampah sembarangan", "Membuang baterai bekas ke selokan", "Menebang tanaman hias"] },
    { q: "Laut terlihat berwarna biru karena memantulkan warna dari...?", a: "Langit siang", w: ["Terumbu karang bawah", "Pasir pantai putih", "Ikan di dalam"] },
    { q: "Alat penunjuk arah mata angin yang menggunakan jarum magnet adalah...?", a: "Kompas", w: ["Termometer", "Timbangan", "Jam tangan"] },
    { q: "Kincir angin raksasa berputar karena memanfaatkan kekuatan...?", a: "Hembusan angin", w: ["Aliran air sungai", "Panas matahari", "Gaya dorong mesin"] },
    { q: "Bagian Bumi yang dipenuhi oleh perairan asin yang luas disebut...?", a: "Samudra / Lautan", w: ["Danau air tawar", "Sungai mengalir", "Rawa berlumpur"] }
  ];

  for (let i = 0; i < 25; i++) {
    const eq = earthQuestions[i];
    list.push({
      id: `SCI_TKB_${String(i + 31).padStart(3, "0")}`,
      level: "TK B",
      category: "Sains",
      question: eq.q,
      options: [eq.a, ...eq.w],
      answer: eq.a
    });
  }

  // 3. Health, Body Systems, Nutrition (25 questions)
  const healthQuestions = [
    { q: "Makanan sehat '4 Sehat 5 Sempurna' ditutup dengan minuman pelengkap yaitu...?", a: "Susu sapi segar", w: ["Teh manis", "Es sirup warna-warni", "Minuman bersoda"] },
    { q: "Sayur wortel sangat baik dikonsumsi karena mengandung vitamin A untuk kesehatan...?", a: "Mata kita", w: ["Gigi dan gusi", "Kuku jari", "Rambut kepala"] },
    { q: "Buah jeruk dikenal kaya akan Vitamin C yang berguna untuk mencegah...?", a: "Sariawan / Panas dalam", w: ["Sakit perut teramat", "Gigi berlubang", "Rambut rontok"] },
    { q: "Bagian tubuh mana yang bertugas memompa darah ke seluruh tubuh kita?", a: "Jantung", w: ["Paru-paru", "Lambung", "Otak"] },
    { q: "Organ tubuh di dalam kepala yang berfungsi untuk berpikir dan mengingat adalah...?", a: "Otak", w: ["Jantung", "Hati", "Lambung"] },
    { q: "Ketika kita bernapas menghirup udara segar, udara ditampung di dalam...?", a: "Paru-paru", w: ["Lambung", "Perut buncit", "Otak"] },
    { q: "Makanan yang masuk dari mulut akan dicerna dan dihancurkan di dalam...?", a: "Lambung / Perut", w: ["Jantung", "Paru-paru", "Tenggorokan"] },
    { q: "Untuk menjaga tulang dan gigi tetap kuat, kita membutuhkan zat ... dari susu?", a: "Kalsium", w: ["Zat besi", "Gula manis", "Minyak nabati"] },
    { q: "Sebelum makan makan malam, kita wajib mencuci tangan memakai...?", a: "Sabun dan air mengalir", w: ["Tisu basah saja", "Minyak kelapa", "Bedak tabur"] },
    { q: "Menggosok gigi secara teratur dilakukan minimal ... sehari?", a: "2 kali (pagi & malam)", w: ["1 kali seminggu", "10 kali sehari", "Saat ingat saja"] },
    { q: "Tidur malam yang cukup bagi anak-anak sangat berguna untuk...?", a: "Pertumbuhan tubuh sehat", w: ["Membuat badan lemas", "Mencegah lapar pagi", "Mengurangi kecerdasan"] },
    { q: "Kuman dan bakteri di tangan yang kotor dapat menyebabkan sakit...?", a: "Sakit perut / Diare", w: ["Sakit telinga", "Rambut rontok", "Kuku patah"] },
    { q: "Olahraga secara teratur di pagi hari membuat tubuh kita menjadi...?", a: "Bugar dan Kuat", w: ["Lelah dan Sakit", "Mengantuk berat", "Sangat lemas"] },
    { q: "Bahan makanan alami yang berfungsi sebagai zat pembangun tubuh adalah...?", a: "Protein (Telur/Tempe)", w: ["Permen manis", "Keripik asin", "Margarin mentega"] },
    { q: "Mengapa kita tidak boleh membaca buku sambil tiduran di tempat gelap?", a: "Dapat merusak mata", w: ["Buku bisa robek", "Dapat membuat lapar", "Tidur jadi nyenyak"] },
    { q: "Bagian tubuh luar yang berfungsi melindungi organ dalam kita adalah...?", a: "Kulit tubuh", w: ["Kuku jari", "Rambut halus", "Gigi seri"] },
    { q: "Ketika kita terluka gores kecil, cairan merah yang keluar disebut...?", a: "Darah", w: ["Keringat", "Air liur", "Air mata"] },
    { q: "Zat di dalam tubuh kita yang membantu melawan kuman penyakit adalah...?", a: "Sel darah putih", w: ["Rambut halus", "Kuku jari kaki", "Gigi taring"] },
    { q: "Mengapa kita disarankan membatasi makan permen manis dan cokelat?", a: "Dapat menyebabkan gigi berlubang", w: ["Dapat membuat tubuh tinggi", "Bisa bikin kenyang lama", "Supaya rambut hitam"] },
    { q: "Penyakit batuk dan pilek dapat menular lewat udara melalui...?", a: "Bersin dan Batuk", w: ["Tatapan mata", "Salaman tangan kering", "Mendengar suara"] },
    { q: "Lampu lalu lintas berwarna merah berarti kendaraan harus...?", a: "Berhenti", w: ["Jalan terus cepat", "Bersiap-siap", "Mundur perlahan"] },
    { q: "Kita berjemur di bawah matahari pagi hari untuk mendapatkan Vitamin...?", a: "Vitamin D (tulang)", w: ["Vitamin A", "Vitamin C", "Vitamin B"] },
    { q: "Ibu memasak air sampai mendidih agar kuman di dalam air...?", a: "Mati semua (steril)", w: ["Bertambah banyak", "Menjadi dingin", "Berwarna indah"] },
    { q: "Pemeriksaan kesehatan gigi ke dokter gigi sebaiknya dilakukan setiap...?", a: "6 bulan sekali", w: ["10 tahun sekali", "Setiap hari pagi sore", "Saat gigi copot saja"] },
    { q: "Makanan yang diproses secara alami dan menyehatkan bagi jantung adalah...?", a: "Buah dan Sayuran", w: ["Mi instan pedas", "Gorengan kering berminyak", "Junk food kalengan"] }
  ];

  for (let i = 0; i < 25; i++) {
    const hq = healthQuestions[i];
    list.push({
      id: `SCI_TKB_${String(i + 56).padStart(3, "0")}`,
      level: "TK B",
      category: "Sains",
      question: hq.q,
      options: [hq.a, ...hq.w],
      answer: hq.a
    });
  }

  // 4. Physical Properties & Simple Physics (20 questions)
  const physicsQuestions = [
    { q: "Es batu yang dikeluarkan dari kulkas ke piring terbuka lambat laun akan...?", a: "Mencair menjadi air", w: ["Membeku keras", "Menguap hilang instan", "Berubah jadi kayu"] },
    { q: "Air panas dalam gelas jika dibiarkan di meja terbuka lama-kelamaan menjadi...?", a: "Dingin / Hangat suam", w: ["Semakin mendidih panas", "Membeku jadi es", "Asin rasanya"] },
    { q: "Gaya tarik Bumi yang membuat daun gugur selalu jatuh ke tanah disebut...?", a: "Gaya gravitasi", w: ["Gaya magnet", "Gaya dorong angin", "Gaya pegas elastis"] },
    { q: "Magnet dapat menarik benda-benda kecil yang terbuat dari bahan...?", a: "Besi atau Logam", w: ["Plastik ember", "Kertas karton", "Kayu lapuk"] },
    { q: "Benda yang mengapung di permukaan air kolam biasanya memiliki sifat...?", a: "Ringan / Berongga udara", w: ["Sangat berat", "Terbuat dari batu utuh", "Penuh dengan air"] },
    { q: "Batu kerikil yang dilempar ke kolam akan tenggelam karena...?", a: "Berat jenisnya lebih besar dari air", w: ["Batu tersebut takut air", "Batu memiliki rongga udara", "Batu mencair di air"] },
    { q: "Bahan apa yang paling lentur dan bisa mulur panjang saat ditarik?", a: "Karet gelang", w: ["Bilah bambu", "Kertas koran", "Kawat besi"] },
    { q: "Alat musik gitar menghasilkan bunyi indah saat senarnya kita...?", a: "Petik dengan jari", w: ["Pukul keras dengan kayu", "Tiup corongnya", "Goyang-goyangkan"] },
    { q: "Alat musik seruling mengeluarkan suara merdu saat kita...?", a: "Tiup lubangnya", w: ["Petik senarnya", "Pukul badannya", "Gesek busurnya"] },
    { q: "Kaca jendela rumah kita memiliki sifat tembus pandang atau...?", a: "Transparan", w: ["Gelap gulita", "Keras membal", "Mudah mencair jika hujan"] },
    { q: "Mengapa minyak goreng selalu berada di atas air jika dicampurkan?", a: "Karena massa jenis minyak lebih ringan", w: ["Minyak benci air", "Air menolak minyak", "Minyak rasanya manis"] },
    { q: "Alat yang mempermudah mengangkat air dari sumur timba adalah...?", a: "Katrol putar", w: ["Pisau pemotong", "Gunting kertas", "Tali rafia saja"] },
    { q: "Cahaya matahari dapat diuraikan oleh titik air hujan menjadi warna-warni...?", a: "Pelangi", w: ["Awan mendung", "Petir menyambar", "Bintang fajar"] },
    { q: "Gaya yang kita berikan saat mendorong pintu kelas yang tertutup adalah...?", a: "Gaya dorong", w: ["Gaya tarik", "Gaya gravitasi", "Gaya magnet"] },
    { q: "Gaya yang kita berikan saat menarik tali tambang permainan adalah...?", a: "Gaya tarik", w: ["Gaya dorong", "Gaya gravitasi", "Gaya gesek"] },
    { q: "Benda yang memantulkan seluruh cahaya di depannya sehingga kita bisa berkaca adalah...?", a: "Cermin datar", w: ["Tembok semen", "Kertas putih", "Piring plastik"] },
    { q: "Pelumas rantai sepeda diberikan agar rantai tidak seret akibat gaya...?", a: "Gaya gesek kasar", w: ["Gaya gravitasi bumi", "Gaya magnet besi", "Gaya pegas lentur"] },
    { q: "Bunyi dihasilkan dari benda yang mengalami...?", a: "Getaran", w: ["Pencairan", "Pembekuan", "Penguapan"] },
    { q: "Bayang-bayang tubuh kita akan berada di sebelah ... jika matahari di timur?", a: "Barat (berlawanan)", w: ["Timur", "Utara", "Selatan"] },
    { q: "Bahan pakaian jas hujan terbuat dari plastik agar bersifat...?", a: "Kedap air / Anti basah", w: ["Menyerap air deras", "Sangat hangat berbulu", "Mudah sobek kusut"] }
  ];

  for (let i = 0; i < 20; i++) {
    const ph = physicsQuestions[i];
    list.push({
      id: `SCI_TKB_${String(i + 81).padStart(3, "0")}`,
      level: "TK B",
      category: "Sains",
      question: ph.q,
      options: [ph.a, ...ph.w],
      answer: ph.a
    });
  }

  return list;
}

// Generate Bahasa Inggris TK A (100 questions)
function generateEnglishTKA(): Question[] {
  const list: Question[] = [];

  // 1. Colors (25 questions)
  const colors = [
    { ind: "Merah", eng: "Red", w: ["Blue", "Green", "Yellow"] },
    { ind: "Kuning", eng: "Yellow", w: ["Pink", "Purple", "Red"] },
    { ind: "Biru", eng: "Blue", w: ["Black", "White", "Orange"] },
    { ind: "Hijau", eng: "Green", w: ["Brown", "Red", "Blue"] },
    { ind: "Merah Muda / Pink", eng: "Pink", w: ["Green", "Grey", "Yellow"] },
    { ind: "Ungu", eng: "Purple", w: ["Red", "Orange", "White"] },
    { ind: "Putih", eng: "White", w: ["Black", "Blue", "Green"] },
    { ind: "Hitam", eng: "Black", w: ["White", "Yellow", "Pink"] },
    { ind: "Cokelat", eng: "Brown", w: ["Blue", "Orange", "Red"] },
    { ind: "Jingga / Oranye", eng: "Orange", w: ["Purple", "Green", "White"] },
    { ind: "Abu-abu", eng: "Grey", w: ["Black", "Pink", "Yellow"] }
  ];

  for (let i = 0; i < 25; i++) {
    const c = colors[i % colors.length];
    const qNum = i + 1;
    list.push({
      id: `ENG_TKA_${String(qNum).padStart(3, "0")}`,
      level: "TK A",
      category: "Bahasa Inggris",
      question: i % 2 === 0 
        ? `Apakah bahasa Inggris dari warna '${c.ind}'?`
        : `What color is "${c.ind}" in English?`,
      options: [c.eng, ...c.w],
      answer: c.eng
    });
  }

  // 2. Animals (25 questions)
  const animals = [
    { ind: "Kucing", eng: "Cat", w: ["Dog", "Fish", "Bird"] },
    { ind: "Anjing", eng: "Dog", w: ["Cat", "Rabbit", "Cow"] },
    { ind: "Burung", eng: "Bird", w: ["Fish", "Butterfly", "Bee"] },
    { ind: "Ikan", eng: "Fish", w: ["Bird", "Cat", "Monkey"] },
    { ind: "Kelinci", eng: "Rabbit", w: ["Tiger", "Lion", "Elephant"] },
    { ind: "Monyet", eng: "Monkey", w: ["Cow", "Horse", "Sheep"] },
    { ind: "Sapi", eng: "Cow", w: ["Goat", "Pig", "Duck"] },
    { ind: "Bebek", eng: "Duck", w: ["Chicken", "Bird", "Cat"] },
    { ind: "Singa", eng: "Lion", w: ["Tiger", "Bear", "Elephant"] },
    { ind: "Gajah", eng: "Elephant", w: ["Mouse", "Frog", "Horse"] },
    { ind: "Kupu-kupu", eng: "Butterfly", w: ["Bee", "Ant", "Fly"] },
    { ind: "Kuda", eng: "Horse", w: ["Cow", "Goat", "Sheep"] }
  ];

  for (let i = 0; i < 25; i++) {
    const a = animals[i % animals.length];
    const qNum = i + 26;
    list.push({
      id: `ENG_TKA_${String(qNum).padStart(3, "0")}`,
      level: "TK A",
      category: "Bahasa Inggris",
      question: i % 2 === 0
        ? `Apakah bahasa Inggris dari hewan '${a.ind}'?`
        : `What animal is called "${a.eng}" in Indonesian?`,
      options: i % 2 === 0 ? [a.eng, ...a.w] : [a.ind, "Gajah", "Kambing", "Burung"],
      answer: i % 2 === 0 ? a.eng : a.ind
    });
  }

  // 3. Fruits & Food (25 questions)
  const foods = [
    { ind: "Apel", eng: "Apple", w: ["Banana", "Orange", "Mango"] },
    { ind: "Pisang", eng: "Banana", w: ["Apple", "Grape", "Melon"] },
    { ind: "Jeruk", eng: "Orange", w: ["Strawberry", "Papaya", "Lemon"] },
    { ind: "Susu", eng: "Milk", w: ["Water", "Juice", "Tea"] },
    { ind: "Telur", eng: "Egg", w: ["Bread", "Cake", "Cheese"] },
    { ind: "Roti", eng: "Bread", w: ["Rice", "Noodle", "Soup"] },
    { ind: "Air putih", eng: "Water", w: ["Milk", "Soda", "Coffee"] },
    { ind: "Anggur", eng: "Grape", w: ["Apple", "Pear", "Banana"] },
    { ind: "Nasi", eng: "Rice", w: ["Bread", "Egg", "Fish"] },
    { ind: "Kue", eng: "Cake", w: ["Ice Cream", "Candy", "Cookie"] }
  ];

  for (let i = 0; i < 25; i++) {
    const f = foods[i % foods.length];
    const qNum = i + 51;
    list.push({
      id: `ENG_TKA_${String(qNum).padStart(3, "0")}`,
      level: "TK A",
      category: "Bahasa Inggris",
      question: i % 2 === 0
        ? `Apakah bahasa Inggris dari '${f.ind}'?`
        : `Indonesian word for "${f.eng}" is...`,
      options: i % 2 === 0 ? [f.eng, ...f.w] : [f.ind, "Pisang", "Apel", "Jeruk"],
      answer: i % 2 === 0 ? f.eng : f.ind
    });
  }

  // 4. Family, Greetings & Numbers 1-10 (25 questions)
  const misc = [
    { q: "Bahasa Inggris dari 'Ayah' adalah...?", a: "Father", w: ["Mother", "Brother", "Sister"] },
    { q: "Bahasa Inggris dari 'Ibu' adalah...?", a: "Mother", w: ["Father", "Grandpa", "Grandma"] },
    { q: "Bahasa Inggris dari angka 'Satu' adalah...?", a: "One", w: ["Two", "Three", "Four"] },
    { q: "Bahasa Inggris dari angka 'Dua' adalah...?", a: "Two", w: ["One", "Three", "Five"] },
    { q: "Bahasa Inggris dari angka 'Tiga' adalah...?", a: "Three", w: ["Two", "Four", "Six"] },
    { q: "Bahasa Inggris dari angka 'Empat' adalah...?", a: "Four", w: ["Three", "Five", "One"] },
    { q: "Bahasa Inggris dari angka 'Lima' adalah...?", a: "Five", w: ["Four", "Six", "Ten"] },
    { q: "Bagaimana cara mengucapkan 'Selamat Pagi' dalam bahasa Inggris?", a: "Good morning", w: ["Good afternoon", "Good night", "Goodbye"] },
    { q: "Bagaimana mengucapkan 'Selamat Tinggal' dalam bahasa Inggris?", a: "Goodbye", w: ["Hello", "Thank you", "Good morning"] },
    { q: "Greeting 'Hello' artinya adalah...?", a: "Halo", w: ["Sampai jumpa", "Terima kasih", "Selamat malam"] },
    { q: "Bahasa Inggris dari 'Kakak laki-laki' adalah...?", a: "Brother", w: ["Sister", "Baby", "Uncle"] },
    { q: "Bahasa Inggris dari 'Kakak perempuan' adalah...?", a: "Sister", w: ["Brother", "Father", "Aunt"] },
    { q: "English word for 'Terima Kasih' is...?", a: "Thank you", w: ["Sorry", "Please", "Excuse me"] },
    { q: "Jika diberi hadiah, kita mengucapkan...?", a: "Thank you", w: ["Goodbye", "Good morning", "Sorry"] },
    { q: "English word for 'Maaf' is...?", a: "Sorry", w: ["Thank you", "Please", "Hello"] },
    { q: "What is 'Baby' in Indonesian?", a: "Bayi", w: ["Anak-anak", "Remaja", "Orang tua"] },
    { q: "What is the number 'Six' in Indonesian?", a: "Enam", w: ["Lima", "Tujuh", "Delapan"] },
    { q: "What is the number 'Seven' in Indonesian?", a: "Tujuh", w: ["Enam", "Delapan", "Sembilan"] },
    { q: "What is the number 'Eight' in Indonesian?", a: "Delapan", w: ["Tujuh", "Sembilan", "Sepuluh"] },
    { q: "What is the number 'Nine' in Indonesian?", a: "Sembilan", w: ["Delapan", "Sepuluh", "Tujuh"] },
    { q: "What is the number 'Ten' in Indonesian?", a: "Sepuluh", w: ["Sembilan", "Satu", "Nol"] },
    { q: "Bahasa Inggris dari 'Kakek' adalah...?", a: "Grandfather", w: ["Grandmother", "Father", "Uncle"] },
    { q: "Bahasa Inggris dari 'Nenek' adalah...?", a: "Grandmother", w: ["Grandfather", "Mother", "Aunt"] },
    { q: "The English word for 'Keluarga' is...?", a: "Family", w: ["Friend", "Teacher", "Baby"] },
    { q: "How many hands do we have? We have ... (Dua) hands?", a: "Two", w: ["One", "Three", "Four"] }
  ];

  for (let i = 0; i < 25; i++) {
    const m = misc[i];
    list.push({
      id: `ENG_TKA_${String(i + 76).padStart(3, "0")}`,
      level: "TK A",
      category: "Bahasa Inggris",
      question: m.q,
      options: [m.a, ...m.w],
      answer: m.a
    });
  }

  return list;
}

// Generate Bahasa Inggris TK B (100 questions)
function generateEnglishTKB(): Question[] {
  const list: Question[] = [];

  // 1. Action Verbs (25 questions)
  const verbs = [
    { ind: "Lari / Berlari", eng: "Run", w: ["Walk", "Sit", "Sleep"] },
    { ind: "Jalan / Berjalan", eng: "Walk", w: ["Run", "Jump", "Fly"] },
    { ind: "Tidur", eng: "Sleep", w: ["Eat", "Drink", "Read"] },
    { ind: "Makan", eng: "Eat", w: ["Drink", "Sing", "Dance"] },
    { ind: "Minum", eng: "Drink", w: ["Eat", "Write", "Sleep"] },
    { ind: "Membaca", eng: "Read", w: ["Write", "Draw", "Listen"] },
    { ind: "Menulis", eng: "Write", w: ["Read", "Paint", "Sing"] },
    { ind: "Bernyanyi", eng: "Sing", w: ["Dance", "Talk", "Jump"] },
    { ind: "Melompat", eng: "Jump", w: ["Sit", "Stand", "Sleep"] },
    { ind: "Duduk", eng: "Sit", w: ["Stand", "Walk", "Run"] },
    { ind: "Berdiri", eng: "Stand", w: ["Sit", "Fly", "Swim"] },
    { ind: "Berenang", eng: "Swim", w: ["Fly", "Jump", "Run"] }
  ];

  for (let i = 0; i < 25; i++) {
    const v = verbs[i % verbs.length];
    const qNum = i + 1;
    list.push({
      id: `ENG_TKB_${String(qNum).padStart(3, "0")}`,
      level: "TK B",
      category: "Bahasa Inggris",
      question: i % 2 === 0
        ? `Apakah bahasa Inggris dari kata kerja '${v.ind}'?`
        : `What is the meaning of the English word "${v.eng}"?`,
      options: i % 2 === 0 ? [v.eng, ...v.w] : [v.ind, "Duduk", "Makan", "Minum"],
      answer: i % 2 === 0 ? v.eng : v.ind
    });
  }

  // 2. Classroom & House Objects (25 questions)
  const objects = [
    { ind: "Meja", eng: "Table", w: ["Chair", "Window", "Door"] },
    { ind: "Kursi", eng: "Chair", w: ["Table", "Book", "Pen"] },
    { ind: "Buku", eng: "Book", w: ["Bag", "Pencil", "Ruler"] },
    { ind: "Tas sekolah", eng: "Bag", w: ["Box", "Book", "Crayon"] },
    { ind: "Pensil", eng: "Pencil", w: ["Pen", "Eraser", "Sharpener"] },
    { ind: "Penghapus", eng: "Eraser", w: ["Pencil", "Ruler", "Paper"] },
    { ind: "Penggaris", eng: "Ruler", w: ["Book", "Bag", "Crayon"] },
    { ind: "Pintu", eng: "Door", w: ["Window", "Wall", "Floor"] },
    { ind: "Jendela", eng: "Window", w: ["Door", "Roof", "Table"] },
    { ind: "Papan tulis", eng: "Whiteboard", w: ["Paper", "Book", "Table"] },
    { ind: "Rumah", eng: "House", w: ["School", "Park", "Market"] },
    { ind: "Sekolah", eng: "School", w: ["House", "Hospital", "Zoo"] }
  ];

  for (let i = 0; i < 25; i++) {
    const o = objects[i % objects.length];
    const qNum = i + 26;
    list.push({
      id: `ENG_TKB_${String(qNum).padStart(3, "0")}`,
      level: "TK B",
      category: "Bahasa Inggris",
      question: i % 2 === 0
        ? `Apakah bahasa Inggris dari benda '${o.ind}'?`
        : `What classroom/home object is "${o.eng}"?`,
      options: i % 2 === 0 ? [o.eng, ...o.w] : [o.ind, "Pintu", "Meja", "Kursi"],
      answer: i % 2 === 0 ? o.eng : o.ind
    });
  }

  // 3. Opposites & Adjectives (25 questions)
  const opposites = [
    { word: "Big (Besar)", opp: "Small", w: ["Tall", "Hot", "Short"] },
    { word: "Small (Kecil)", opp: "Big", w: ["Short", "Long", "Cold"] },
    { word: "Tall (Tinggi)", opp: "Short", w: ["Big", "Small", "Hot"] },
    { word: "Short (Pendek)", opp: "Long / Tall", w: ["Big", "Heavy", "Dry"] },
    { word: "Hot (Panas)", opp: "Cold", w: ["Warm", "Wet", "Dry"] },
    { word: "Cold (Dingin)", opp: "Hot", w: ["Cool", "Sweet", "Sour"] },
    { word: "Happy (Senang)", opp: "Sad", w: ["Angry", "Scared", "Sleepy"] },
    { word: "Sad (Sedih)", opp: "Happy", w: ["Sad", "Angry", "Tired"] },
    { word: "Clean (Bersih)", opp: "Dirty", w: ["Clean", "Wet", "Dry"] },
    { word: "Fast (Cepat)", opp: "Slow", w: ["Quick", "Tall", "Short"] }
  ];

  for (let i = 0; i < 25; i++) {
    const op = opposites[i % opposites.length];
    const qNum = i + 51;
    list.push({
      id: `ENG_TKB_${String(qNum).padStart(3, "0")}`,
      level: "TK B",
      category: "Bahasa Inggris",
      question: `What is the opposite (lawan kata) of "${op.word}"?`,
      options: [op.opp, ...op.w],
      answer: op.opp
    });
  }

  // 4. Body Parts & Numbers 11-20 (25 questions)
  const bodyNumbers = [
    { q: "Bahasa Inggris dari 'Kepala' adalah...?", a: "Head", w: ["Hand", "Foot", "Nose"] },
    { q: "Bahasa Inggris dari 'Mata' adalah...?", a: "Eyes", w: ["Ears", "Nose", "Mouth"] },
    { q: "Bahasa Inggris dari 'Telinga' adalah...?", a: "Ears", w: ["Eyes", "Nose", "Hair"] },
    { q: "Bahasa Inggris dari 'Hidung' adalah...?", a: "Nose", w: ["Mouth", "Head", "Hand"] },
    { q: "Bahasa Inggris dari 'Mulut' adalah...?", a: "Mouth", w: ["Nose", "Eyes", "Teeth"] },
    { q: "Bahasa Inggris dari 'Tangan' adalah...?", a: "Hand", w: ["Foot", "Leg", "Finger"] },
    { q: "Bahasa Inggris dari 'Kaki' (bagian bawah untuk jalan) adalah...?", a: "Foot", w: ["Hand", "Head", "Arm"] },
    { q: "What are 'Teeth' used for? We eat with our...?", a: "Teeth", w: ["Nose", "Ears", "Hair"] },
    { q: "Bahasa Inggris dari angka 'Sebelas' adalah...?", a: "Eleven", w: ["Twelve", "Ten", "Thirteen"] },
    { q: "Bahasa Inggris dari angka 'Dua Belas' adalah...?", a: "Twelve", w: ["Eleven", "Twenty", "Thirteen"] },
    { q: "Bahasa Inggris dari angka 'Tiga Belas' adalah...?", a: "Thirteen", w: ["Thirty", "Fourteen", "Twelve"] },
    { q: "Bahasa Inggris dari angka 'Empat Belas' adalah...?", a: "Fourteen", w: ["Fourteen", "Fifteen", "Forty"] },
    { q: "Bahasa Inggris dari angka 'Lima Belas' adalah...?", a: "Fifteen", w: ["Fifty", "Sixteen", "Fourteen"] },
    { q: "Bahasa Inggris dari angka 'Dua Puluh' adalah...?", a: "Twenty", w: ["Twelve", "Two", "Ten"] },
    { q: "Where do we wear a hat? On our ... (Kepala)?", a: "Head", w: ["Hand", "Foot", "Finger"] },
    { q: "We touch things with our ... (Tangan)?", a: "Hand", w: ["Ears", "Eyes", "Nose"] },
    { q: "The color of milk is ... (Putih)?", a: "White", w: ["Black", "Yellow", "Red"] },
    { q: "The color of grass is ... (Hijau)?", a: "Green", w: ["Red", "Blue", "Black"] },
    { q: "The opposite of 'Boy' (Anak laki-laki) is ... (Anak perempuan)?", a: "Girl", w: ["Man", "Woman", "Baby"] },
    { q: "What is 'Teacher' in Indonesian?", a: "Guru", w: ["Murid", "Sekolah", "Kelas"] },
    { q: "What is 'Student' in Indonesian?", a: "Murid", w: ["Guru", "Kepala Sekolah", "Satpam"] },
    { q: "The English word for 'Bintang' in the sky is...?", a: "Star", w: ["Sun", "Moon", "Cloud"] },
    { q: "The English word for 'Matahari' is...?", a: "Sun", w: ["Star", "Moon", "Rain"] },
    { q: "The English word for 'Bulan' is...?", a: "Moon", w: ["Sun", "Star", "Cloud"] },
    { q: "How many legs does a cat have? A cat has ... (Empat) legs?", a: "Four", w: ["Two", "Three", "Five"] }
  ];

  for (let i = 0; i < 25; i++) {
    const bn = bodyNumbers[i];
    list.push({
      id: `ENG_TKB_${String(i + 76).padStart(3, "0")}`,
      level: "TK B",
      category: "Bahasa Inggris",
      question: bn.q,
      options: [bn.a, ...bn.w],
      answer: bn.a
    });
  }

  return list;
}

function generateMathTKAAdvanced(): Question[] {
  const list: Question[] = [];

  // Mengenal angka 1-20
  const numQuestions = [
    { q: "Angka berapa di antara 12 dan 14?", a: "13", w: ["11", "15", "10"] },
    { q: "Angka sebelum 17 adalah...?", a: "16", w: ["18", "15", "14"] },
    { q: "Angka setelah 19 adalah...?", a: "20", w: ["18", "21", "10"] },
    { q: "10 permen ditambah 5 permen jadi...?", a: "15", w: ["14", "16", "13"] },
    { q: "Ada 18 telur, pecah 2. Sisa berapa?", a: "16", w: ["17", "15", "14"] },
    { q: "Lengkapi urutan: 15, 16, 17, [?], 19", a: "18", w: ["20", "14", "17"] },
    { q: "Berapa jumlah jari pada dua tangan?", a: "10", w: ["5", "15", "20"] },
    { q: "Lambang bilangan 'Tujuh Belas' adalah...?", a: "17", w: ["71", "15", "27"] },
    { q: "Ada 14 burung, terbang 4. Sisa berapa?", a: "10", w: ["12", "8", "6"] },
    { q: "Mana angka yang paling besar?", a: "19", w: ["11", "15", "13"] },
    { q: "Mana angka yang paling kecil?", a: "12", w: ["20", "18", "16"] },
    { q: "11 ditambah 3 sama dengan...?", a: "14", w: ["12", "15", "13"] },
    { q: "Lambang bilangan 'Sembilan Belas' adalah...?", a: "19", w: ["16", "18", "17"] },
    { q: "Ada 20 balon, meletus 5. Sisa berapa?", a: "15", w: ["16", "14", "10"] },
    { q: "Berapa kaki dari 3 ekor ayam?", a: "6", w: ["4", "8", "5"] }
  ];

  // Bentuk dan pola
  const patternQuestions = [
    { q: "Pola: Merah, Biru, Merah, Biru, Merah, ...?", a: "Biru", w: ["Merah", "Kuning", "Hijau"] },
    { q: "Pola: Segitiga, Kotak, Segitiga, Kotak, ...?", a: "Segitiga", w: ["Kotak", "Lingkaran", "Bintang"] },
    { q: "Bentuk dengan 3 sudut dan 3 sisi adalah...?", a: "Segitiga", w: ["Kotak", "Lingkaran", "Bintang"] },
    { q: "Roda sepeda dan uang koin berbentuk...?", a: "Lingkaran", w: ["Segitiga", "Kotak", "Lonjong"] },
    { q: "Pola: 🍎, 🍌, 🍎, 🍌, ...?", a: "🍎", w: ["🍌", "🍊", "🍇"] },
    { q: "Pola: Kuning, Hijau, Kuning, Hijau, ...?", a: "Kuning", w: ["Hijau", "Merah", "Biru"] },
    { q: "Pintu dan papan tulis berbentuk...?", a: "Persegi panjang", w: ["Lingkaran", "Segitiga", "Bintang"] },
    { q: "Telur ayam berbentuk...?", a: "Oval / Lonjong", w: ["Segitiga", "Kotak", "Bintang"] },
    { q: "Pola: Kucing, Kelinci, Kucing, Kelinci, ...?", a: "Kucing", w: ["Kelinci", "Burung", "Sapi"] },
    { q: "Benda dengan 4 sisi sama panjang adalah...?", a: "Kotak persegi", w: ["Segitiga", "Lingkaran", "Oval"] }
  ];

  // Perbandingan dan logika sederhana
  const logicQuestions = [
    { q: "Gajah besar, semut...?", a: "Kecil", w: ["Tinggi", "Lebar", "Besar"] },
    { q: "Sebelum hari Senin adalah hari...?", a: "Minggu", w: ["Selasa", "Sabtu", "Rabu"] },
    { q: "Siapa yang paling tinggi?", a: "Ayah", w: ["Ibu", "Adik Bayi", "Semua sama"] },
    { q: "Mana yang lebih banyak?", a: "19 jeruk", w: ["9 jeruk", "Sama banyak", "Semuanya sedikit"] },
    { q: "Mana benda yang paling ringan?", a: "Kapas", w: ["Buku tebal", "Meja belajar", "Sandal jepit"] },
    { q: "Harimau memakan...?", a: "Daging", w: ["Buah pisang", "Sayur bayam", "Nasi putih"] },
    { q: "Mana benda yang paling berat?", a: "Lemari kayu", w: ["Botol minum", "Buku gambar", "Krayon warna"] },
    { q: "Mana yang lebih sedikit?", a: "13 balon", w: ["17 balon", "Sama banyak", "Semuanya banyak"] },
    { q: "Burung terbang memakai...?", a: "Sayap", w: ["Kaki", "Ekor", "Paruh"] },
    { q: "Kapal laut berjalan di...?", a: "Air laut", w: ["Aspal jalan", "Udara bebas", "Tanah kering"] },
    { q: "Sup hangat rasanya...?", a: "Panas", w: ["Dingin", "Asin", "Pahit"] }
  ];

  let idCounter = 1;
  const allQ = [...numQuestions, ...patternQuestions, ...logicQuestions];
  for (const q of allQ) {
    list.push({
      id: `MATH_TKA_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK A (Advanced)",
      category: "Matematika",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }

  return list;
}

function generateScienceTKAAdvanced(): Question[] {
  const list: Question[] = [];

  // Panca Indra
  const senses = [
    { q: "Mata kita gunakan untuk...?", a: "Melihat pelangi", w: ["Mendengar lagu", "Menghirup wangi", "Mengecap rasa"] },
    { q: "Untuk mendengar, kita memakai...?", a: "Telinga", w: ["Mata", "Hidung", "Lidah"] },
    { q: "Untuk merasakan manis atau asin memakai...?", a: "Mulut / Lidah", w: ["Hidung", "Telinga", "Mata"] },
    { q: "Untuk mencium bau wangi memakai...?", a: "Hidung", w: ["Lidah", "Telinga", "Mata"] },
    { q: "Kulit kita gunakan untuk...?", a: "Meraba benda", w: ["Melihat warna", "Mengecap rasa", "Mendengar musik"] },
    { q: "Ada berapa jumlah panca indra kita?", a: "5", w: ["3", "4", "6"] },
    { q: "Jika menutup mata, kita tidak bisa...?", a: "Melihat sekitar", w: ["Mendengar suara", "Menghirup bau", "Mengunyah makanan"] }
  ];

  // Benda sekitar kita
  const environment = [
    { q: "Benda untuk duduk di kelas adalah...?", a: "Kursi", w: ["Meja", "Papan tulis", "Sapu lantai"] },
    { q: "Wadah kaca untuk minum adalah...?", a: "Gelas", w: ["Buku gambar", "Penghapus", "Pensil warna"] },
    { q: "Tempat menyimpan makanan agar dingin adalah...?", a: "Kulkas", w: ["Kompor", "Meja makan", "Lemari baju"] },
    { q: "Alat untuk merapikan rambut adalah...?", a: "Sisir", w: ["Sikat gigi", "Sendok", "Handuk"] },
    { q: "Krayon digunakan untuk...?", a: "Mewarnai gambar", w: ["Makan siang", "Tidur siang", "Menyapu kelas"] },
    { q: "Benda empuk untuk tidur adalah...?", a: "Kasur", w: ["Meja belajar", "Lemari pakaian", "Kipas angin"] },
    { q: "Penerang kamar di malam hari adalah...?", a: "Lampu", w: ["Cermin", "Kipas angin", "Buku tulis"] }
  ];

  // Mengenal tumbuhan
  const plants = [
    { q: "Bagian pohon di dalam tanah adalah...?", a: "Akar", w: ["Daun", "Bunga", "Batang"] },
    { q: "Bagian pohon yang berwarna hijau adalah...?", a: "Daun", w: ["Akar", "Duri", "Bunga"] },
    { q: "Agar tidak layu, tanaman disiram...?", a: "Air bersih", w: ["Susu manis", "Air teh", "Sirup manis"] },
    { q: "Bagian tanaman yang indah berwarna-warni adalah...?", a: "Bunga", w: ["Akar", "Duri", "Batang"] },
    { q: "Tanaman butuh air, tanah, dan cahaya...?", a: "Matahari", w: ["Lampu lilin", "Bulan malam", "Senter kecil"] },
    { q: "Buah mangga tumbuh di...?", a: "Dahan pohon", w: ["Dalam tanah", "Akar rumput", "Kelopak daun"] },
    { q: "Pohon yang menghasilkan buah pisang adalah...?", a: "Pohon pisang", w: ["Pohon kelapa", "Rumput hijau", "Bunga mawar"] }
  ];

  // Kebersihan dan Kesehatan
  const health = [
    { q: "Gosok gigi memakai...?", a: "Sikat dan pasta gigi", w: ["Sampo rambut", "Sabun mandi", "Minyak wangi"] },
    { q: "Sebelum makan kita harus...?", a: "Mencuci tangan", w: ["Mengelap ke celana", "Membilas air saja", "Memakai bedak"] },
    { q: "Agar badan bersih setelah bermain, kita harus...?", a: "Mandi pakai sabun", w: ["Mencuci kaki saja", "Memakai parfum", "Tidur siang langsung"] },
    { q: "Kuku yang panjang harus...?", a: "Dipotong rapi", w: ["Dibiarkan saja", "Digigit-gigit", "Diwarnai krayon"] },
    { q: "Makanan yang sehat adalah...?", a: "Sayur dan buah", w: ["Permen manis", "Keripik asin", "Es krim cokelat"] },
    { q: "Susu membuat bagian tubuh apa menjadi kuat?", a: "Tulang dan gigi", w: ["Kuku", "Rambut", "Baju"] },
    { q: "Saat bersin, kita menutup mulut dengan...?", a: "Tisu / Sapu tangan", w: ["Tangan kotor", "Buku tulis", "Mainan robot"] },
    { q: "Tidur malam yang cukup membuat badan...?", a: "Segar dan sehat", w: ["Lelah dan lemas", "Pusing kepala", "Cepat lapar"] }
  ];

  let idCounter = 1;
  const allQ = [...senses, ...environment, ...plants, ...health];
  for (const q of allQ) {
    list.push({
      id: `SCI_TKA_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK A (Advanced)",
      category: "Sains",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }

  return list;
}

function generateEnglishTKAAdvanced(): Question[] {
  const list: Question[] = [];

  // Shapes
  const shapes = [
    { q: "What is 'Lingkaran' in English?", a: "Circle", w: ["Triangle", "Square", "Star"] },
    { q: "A slice of pizza is a...?", a: "Triangle", w: ["Circle", "Square", "Star"] },
    { q: "What is 'Kotak' in English?", a: "Square", w: ["Circle", "Triangle", "Oval"] },
    { q: "A book is shaped like a...?", a: "Rectangle", w: ["Circle", "Triangle", "Star"] },
    { q: "An egg has the shape of...?", a: "Oval", w: ["Circle", "Square", "Triangle"] },
    { q: "A star in the sky is a...?", a: "Star", w: ["Circle", "Triangle", "Square"] },
    { q: "A donut is shaped like a...?", a: "Circle", w: ["Triangle", "Square", "Rectangle"] }
  ];

  // Classrooms
  const classrooms = [
    { q: "We write on the board using...?", a: "Chalk / Marker", w: ["Eraser", "Table", "Chair"] },
    { q: "What is 'Meja' in English?", a: "Table", w: ["Chair", "Window", "Door"] },
    { q: "What is 'Kursi' in English?", a: "Chair", w: ["Table", "Book", "Bag"] },
    { q: "What is 'Papan Tulis' in English?", a: "Blackboard", w: ["Window", "Table", "Door"] },
    { q: "What is 'Buku' in English?", a: "Book", w: ["Pencil", "Ruler", "Bag"] },
    { q: "What is 'Tas' in English?", a: "Bag", w: ["Pencil case", "Toy box", "Table"] },
    { q: "Who teaches us in class?", a: "Teacher", w: ["Student", "Doctor", "Pilot"] },
    { q: "What is 'Murid' in English?", a: "Student", w: ["Teacher", "Chef", "Nurse"] }
  ];

  // House room
  const houseRooms = [
    { q: "Mother cooks in the...?", a: "Kitchen", w: ["Bedroom", "Bathroom", "Living room"] },
    { q: "We sleep in the...?", a: "Bedroom", w: ["Kitchen", "Bathroom", "Garage"] },
    { q: "We take a bath in the...?", a: "Bathroom", w: ["Bedroom", "Kitchen", "Living room"] },
    { q: "We watch TV in the...?", a: "Living room", w: ["Bathroom", "Kitchen", "Garage"] },
    { q: "What is 'Rumah' in English?", a: "House", w: ["School", "Market", "Park"] },
    { q: "What is 'Pintu' in English?", a: "Door", w: ["Window", "Wall", "Roof"] },
    { q: "What is 'Jendela' in English?", a: "Window", w: ["Door", "Floor", "Gate"] }
  ];

  // Body part
  const bodyParts = [
    { q: "What is 'Mata' in English?", a: "Eyes", w: ["Ears", "Nose", "Mouth"] },
    { q: "What is 'Telinga' in English?", a: "Ears", w: ["Eyes", "Nose", "Mouth"] },
    { q: "We smell with our...?", a: "Nose", w: ["Mouth", "Eyes", "Ears"] },
    { q: "We speak and eat with our...?", a: "Mouth", w: ["Nose", "Ears", "Eyes"] },
    { q: "What is 'Tangan' in English?", a: "Hand", w: ["Foot", "Head", "Hair"] },
    { q: "We run and walk with our...?", a: "Feet", w: ["Hands", "Head", "Hair"] },
    { q: "What is 'Kepala' in English?", a: "Head", w: ["Hand", "Foot", "Nose"] },
    { q: "What is 'Rambut' in English?", a: "Hair", w: ["Head", "Eyes", "Mouth"] }
  ];

  let idCounter = 1;
  const allQ = [...shapes, ...classrooms, ...houseRooms, ...bodyParts];
  for (const q of allQ) {
    list.push({
      id: `ENG_TKA_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK A (Advanced)",
      category: "Bahasa Inggris",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }

  return list;
}

// Generate Matematika TK B (Advanced)
function generateMathTKBAdvanced(): Question[] {
  const list: Question[] = [];
  const mathAdv = [
    { q: "15 + 10 = ...?", a: "25", w: ["20", "30", "15"] },
    { q: "20 - 7 = ...?", a: "13", w: ["12", "14", "15"] },
    { q: "12 + 8 = ...?", a: "20", w: ["18", "22", "25"] },
    { q: "25 - 5 = ...?", a: "20", w: ["15", "30", "10"] },
    { q: "Angka setelah 29 adalah...?", a: "30", w: ["28", "31", "20"] },
    { q: "Lengkapi pola: 2, 4, 6, 8, [?]", a: "10", w: ["9", "12", "7"] },
    { q: "Lengkapi pola: 5, 10, 15, [?]", a: "20", w: ["25", "16", "30"] },
    { q: "Benda 3D seperti dadu dinamakan...?", a: "Kubus", w: ["Tabung", "Bola", "Kerucut"] },
    { q: "Benda 3D seperti kaleng susu dinamakan...?", a: "Tabung", w: ["Kubus", "Bola", "Piramida"] },
    { q: "Benda 3D seperti bola basket dinamakan...?", a: "Bola", w: ["Kubus", "Tabung", "Kerucut"] },
    { q: "Ibu membeli 15 telur, pecah 3. Sisa berapa?", a: "12", w: ["10", "13", "11"] },
    { q: "Andi punya 12 permen, dapat 12 lagi. Totalnya...?", a: "24", w: ["22", "20", "26"] },
    { q: "Mana angka yang paling besar: 21, 19, 28, 25?", a: "28", w: ["21", "25", "19"] },
    { q: "Mana angka yang paling kecil: 30, 18, 22, 14?", a: "14", w: ["18", "22", "30"] },
    { q: "Satu kue utuh dipotong 2 sama besar. Tiap bagian disebut...?", a: "Setengah (1/2)", w: ["Satu", "Sepertiga", "Seperempat"] },
    { q: "Jarum pendek di 3, jarum panjang di 12. Jam berapa?", a: "Jam 3", w: ["Jam 12", "Jam 6", "Jam 9"] },
    { q: "Berapa jumlah sisi pada persegi?", a: "4 sisi", w: ["3 sisi", "5 sisi", "2 sisi"] },
    { q: "18 + 7 = ...?", a: "25", w: ["24", "26", "23"] },
    { q: "30 - 10 = ...?", a: "20", w: ["10", "25", "15"] },
    { q: "Mana yang lebih berat: 1 kg besi atau 1 kg kapas?", a: "Sama berat", w: ["1 kg besi", "1 kg kapas", "Tidak tahu"] },
    { q: "Lengkapi pola: 10, 20, 30, [?]", a: "40", w: ["35", "50", "25"] },
    { q: "Berapa sudut pada bentuk segitiga?", a: "3 sudut", w: ["4 sudut", "5 sudut", "Tidak ada"] },
    { q: "14 + 6 - 5 = ...?", a: "15", w: ["20", "10", "16"] },
    { q: "24 dikurangi 4 sama dengan...?", a: "20", w: ["28", "18", "16"] },
    { q: "Dua puluh delapan ditulis dalam angka...?", a: "28", w: ["82", "18", "38"] }
  ];

  let idCounter = 1;
  for (const q of mathAdv) {
    list.push({
      id: `MATH_TKB_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK B (Advanced)",
      category: "Matematika",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// Generate Sains TK B (Advanced)
function generateScienceTKBAdvanced(): Question[] {
  const list: Question[] = [];
  const sciAdv = [
    { q: "Air di dalam freezer akan membeku menjadi...?", a: "Es batu", w: ["Uap air", "Minyak", "Awan"] },
    { q: "Es batu di tempat panas akan...?", a: "Mencair", w: ["Membeku", "Menjadi batu", "Menjelang malam"] },
    { q: "Tumbuhan membuat makanan dengan bantuan sinar...?", a: "Matahari", w: ["Bulan", "Lampu", "Lilin"] },
    { q: "Magnet dapat menarik benda dari bahan...?", a: "Besi / Logam", w: ["Plastik", "Kertas", "Kain"] },
    { q: "Planet tempat kita tinggal adalah...?", a: "Bumi", w: ["Mars", "Bulan", "Matahari"] },
    { q: "Bulan bersinar malam hari memantulkan cahaya...?", a: "Matahari", w: ["Bintang", "Lampu", "Api"] },
    { q: "Buah jatuh ke bawah karena gaya...?", a: "Gravitasi", w: ["Lompat", "Angin", "Magnet"] },
    { q: "Hewan pemakan rumput/tumbuhan disebut...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Amfibi"] },
    { q: "Hewan pemakan daging disebut...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Serangga"] },
    { q: "Rumput dimakan kelinci, kelinci dimakan elang. Ini contoh...?", a: "Rantai makanan", w: ["Daur air", "Tidur siang", "Pencernaan"] },
    { q: "Uap air di langit yang mengumpul akan turun sebagai...?", a: "Hujan", w: ["Angin", "Petir", "Pelangi"] },
    { q: "Alat untuk mengukur suhu tubuh saat demam adalah...?", a: "Termometer", w: ["Penggaris", "Timbangan", "Jam tangan"] },
    { q: "Alat untuk melihat kuman yang sangat kecil adalah...?", a: "Mikroskop", w: ["Kaca pembesar", "Kacamata", "Kamera"] },
    { q: "Ulat berubah menjadi kepompong lalu jadi...?", a: "Kupu-kupu", w: ["Lalat", "Lebah", "Katak"] },
    { q: "Hewan yang hidup di darat dan air (seperti katak) disebut...?", a: "Amfibi", w: ["Reptil", "Mamalia", "Burung"] },
    { q: "Gas yang kita hirup saat bernapas adalah...?", a: "Oksigen", w: ["Asap", "Air", "Minyak"] },
    { q: "Benda yang dapat menghantarkan panas dengan cepat adalah...?", a: "Sendok logam", w: ["Sendok kayu", "Sumpit plastik", "Kain"] },
    { q: "Bunyi terjadi karena adanya benda yang...?", a: "Bergetar", w: ["Diam", "Dingin", "Basah"] },
    { q: "Pelangi muncul karena pembiasan cahaya matahari oleh...?", a: "Tetesan air hujan", w: ["Awan hitam", "Angin kencang", "Tanah basah"] },
    { q: "Pohon menghasilkan gas segar bagi kita bernama...?", a: "Oksigen", w: ["Karbon", "Asap", "Uap"] }
  ];

  let idCounter = 1;
  for (const q of sciAdv) {
    list.push({
      id: `SCI_TKB_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK B (Advanced)",
      category: "Sains",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// Generate Bahasa Inggris TK B (Advanced)
function generateEnglishTKBAdvanced(): Question[] {
  const list: Question[] = [];
  const engAdv = [
    { q: "What is 'Twenty' in Indonesian?", a: "Dua puluh", w: ["Dua belas", "Sepuluh", "Tiga puluh"] },
    { q: "Opposite of 'Big' is...?", a: "Small", w: ["Tall", "Long", "Fast"] },
    { q: "Opposite of 'Hot' is...?", a: "Cold", w: ["Warm", "Dry", "Soft"] },
    { q: "Opposite of 'Fast' is...?", a: "Slow", w: ["Quick", "High", "Heavy"] },
    { q: "Opposite of 'Happy' is...?", a: "Sad", w: ["Glad", "Funny", "Bright"] },
    { q: "What is 'Twenty-Five' in numbers?", a: "25", w: ["20", "52", "15"] },
    { q: "What is 'Thirty' in numbers?", a: "30", w: ["13", "300", "20"] },
    { q: "The sky is blue. What is 'Blue'?", a: "Biru", w: ["Merah", "Kuning", "Hijau"] },
    { q: "'I eat an apple'. What does 'eat' mean?", a: "Makan", w: ["Minum", "Tidur", "Lari"] },
    { q: "'The bird is flying'. What does 'fly' mean?", a: "Terbang", w: ["Berenang", "Jalan", "Melompat"] },
    { q: "What is 'Rainy season'?", a: "Musim hujan", w: ["Musim panas", "Musim dingin", "Musim gugur"] },
    { q: "What is 'Sun' in Indonesian?", a: "Matahari", w: ["Bulan", "Bintang", "Awan"] },
    { q: "What is 'Moon' in Indonesian?", a: "Bulan", w: ["Matahari", "Bintang", "Pelangi"] },
    { q: "What is 'Star' in Indonesian?", a: "Bintang", w: ["Awan", "Bulan", "Matahari"] },
    { q: "What is 'Breakfast' in Indonesian?", a: "Makan pagi / Sarapan", w: ["Makan malam", "Tidur", "Mandi"] },
    { q: "'Look at the green tree'. What is 'Green'?", a: "Hijau", w: ["Kuning", "Biru", "Merah"] },
    { q: "What is 'Doctor' in Indonesian?", a: "Dokter", w: ["Guru", "Polisi", "Pilot"] },
    { q: "What is 'Teacher' in Indonesian?", a: "Guru", w: ["Murid", "Koki", "Sopir"] },
    { q: "What is 'Butterflies fly'. What is 'Butterfly'?", a: "Kupu-kupu", w: ["Kelinci", "Burung", "Lebah"] },
    { q: "'Good morning' means...?", a: "Selamat pagi", w: ["Selamat malam", "Selamat siang", "Sampai jumpa"] }
  ];

  let idCounter = 1;
  for (const q of engAdv) {
    list.push({
      id: `ENG_TKB_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK B (Advanced)",
      category: "Bahasa Inggris",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// Generate Pengetahuan Umum TK A
function generateGeneralKnowledgeTKA(): Question[] {
  const list: Question[] = [];
  const genTKA = [
    { q: "Warna bendera negara Indonesia adalah...?", a: "Merah dan Putih", w: ["Biru dan Kuning", "Hijau dan Merah", "Hitam dan Putih"] },
    { q: "Lagu kebangsaan negara Indonesia adalah...?", a: "Indonesia Raya", w: ["Pelangi-Pelangi", "Balonku Ada Lima", "Bintang Kecil"] },
    { q: "Siapa yang mengobati orang sakit di rumah sakit?", a: "Dokter", w: ["Guru", "Polisi", "Koki"] },
    { q: "Siapa yang mengemudikan pesawat terbang?", a: "Pilot", w: ["Sopir", "Nakhoda", "Masinis"] },
    { q: "Siapa yang mengemudikan mobil bus atau angkot?", a: "Sopir", w: ["Pilot", "Masinis", "Nakhoda"] },
    { q: "Jika diberi sesuatu oleh orang lain, kita mengucapkan...?", a: "Terima kasih", w: ["Maaf", "Permisi", "Halo"] },
    { q: "Jika tidak sengaja berbuat salah, kita mengucapkan...?", a: "Maaf", w: ["Terima kasih", "Dada", "Selamat"] },
    { q: "Monumen Nasional (Monas) ada di kota...?", a: "Jakarta", w: ["Surabaya", "Bandung", "Bali"] },
    { q: "Nama ibu kota negara Indonesia yang baru adalah...?", a: "IKN / Nusantara", w: ["Jakarta", "Medan", "Semarang"] },
    { q: "Lambang negara Indonesia adalah burung...?", a: "Garuda", w: ["Elang", "Merpati", "Kakatua"] },
    { q: "Siapa yang mengajar murid-murid di sekolah?", a: "Guru", w: ["Dokter", "Polisi", "Petani"] },
    { q: "Siapa yang menjaga keamanan di jalan raya dan menangkap penjahat?", a: "Polisi", w: ["Koki", "Pilot", "Nelayan"] },
    { q: "Sebelum masuk ke rumah orang lain, kita harus...?", a: "Mengucapkan salam / Ketuk pintu", w: ["Langsung masuk", "Lari", "Berteriak"] },
    { q: "Benda langit yang terbit pagi hari memberi sinar hangat adalah...?", a: "Matahari", w: ["Bulan", "Bintang", "Awan"] },
    { q: "Mata uang yang dipakai belanja di Indonesia adalah...?", a: "Rupiah", w: ["Dollar", "Yen", "Euro"] },
    { q: "Siapa yang menanam padi di sawah?", a: "Petani", w: ["Nelayan", "Guru", "Dokter"] },
    { q: "Siapa yang mencari ikan di laut?", a: "Nelayan", w: ["Petani", "Sopir", "Polisi"] },
    { q: "Makan makanan sehat berguna agar tubuh kita...?", a: "Sehat dan kuat", w: ["Sakit", "Lemas", "Mengantuk"] },
    { q: "Buang sampah yang benar adalah di...?", a: "Tempat sampah", w: ["Sungai", "Jalan raya", "Lantai kelas"] },
    { q: "Salam selamat pagi diucapkan saat...?", a: "Pagi hari", w: ["Malam hari", "Tidur", "Makan malam"] }
  ];

  let idCounter = 1;
  for (const q of genTKA) {
    list.push({
      id: `GEN_TKA_${String(idCounter).padStart(3, "0")}`,
      level: "TK A",
      category: "Pengetahuan Umum",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// Generate Pengetahuan Umum TK A (Advanced)
function generateGeneralKnowledgeTKAAdvanced(): Question[] {
  const list: Question[] = [];
  const genTKAAdv = [
    { q: "Alat musik bambu tradisional dari Jawa Barat yang digoyangkan adalah...?", a: "Angklung", w: ["Gitar", "Drum", "Pianika"] },
    { q: "Hewan purba langka khas Indonesia di Nusa Tenggara adalah...?", a: "Komodo", w: ["Dinosaurus", "Gajah", "Jerapah"] },
    { q: "Lampu lalu lintas berwarna MERAH artinya...?", a: "Berhenti", w: ["Jalan cepat", "Hati-hati", "Putar balik"] },
    { q: "Lampu lalu lintas berwarna KUNING artinya...?", a: "Hati-hati / Pelan-pelan", w: ["Berhenti", "Jalan", "Lari"] },
    { q: "Lampu lalu lintas berwarna HIJAU artinya...?", a: "Jalan / Boleh lewat", w: ["Berhenti", "Mundur", "Tidur"] },
    { q: "Tempat ibadah untuk umat Islam dinamakan...?", a: "Masjid", w: ["Gereja", "Pura", "Vihara"] },
    { q: "Tempat ibadah untuk umat Kristen & Katolik dinamakan...?", a: "Gereja", w: ["Masjid", "Pura", "Vihara"] },
    { q: "Burung indah berketinggian dari Papua bulunya warna-warni adalah...?", a: "Cendrawasih", w: ["Merpati", "Ayam", "Bebek"] },
    { q: "Aturan menyeberang jalan yang aman lewat jalur garis putih disebut...?", a: "Zebra Cross", w: ["Trotoar", "Jembatan", "Taman"] },
    { q: "Pejalan kaki berjalan di tempat khusus dinamakan...?", a: "Trotoar", w: ["Zebra cross", "Tengah jalan", "Rel kereta"] },
    { q: "Presiden pertama Indonesia yang membacakan Proklamasi adalah...?", a: "Ir. Soekarno", w: ["B.J. Habibie", "SBY", "Jokowi"] },
    { q: "Hari Kemerdekaan Indonesia dirayakan setiap tanggal...?", a: "17 Agustus", w: "25 Desember", w2: "1 Januari", w3: "2 Mei" },
    { q: "Makanan tradisional dari Jawa Tengah terbuat dari nangka muda bernama...?", a: "Gudeg", w: ["Rendang", "Pempek", "Soto"] },
    { q: "Makanan enak dari Sumatra Barat berkuah santan kaya rempah bernama...?", a: "Rendang", w: ["Gudeg", "Bakso", "Gado-gado"] },
    { q: "Makanan khas Palembang berbahan dasar ikan dan sagu dinamakan...?", a: "Pempek", w: ["Rendang", "Nasi goreng", "Sate"] },
    { q: "Tari Bali yang terkenal dipentaskan dengan suara 'Cak-Cak' dinamakan...?", a: "Tari Kecak", w: ["Tari Jaipong", "Tari Piring", "Tari Saman"] },
    { q: "Tari khas dari Aceh yang mengandalkan tepukan tangan serempak dinamakan...?", a: "Tari Saman", w: ["Tari Kecak", "Tari Pendet", "Tari Reog"] },
    { q: "Buah kelapa menghasilkan air minum manis yang tumbuh di...?", a: "Pohon kelapa", w: ["Dalam tanah", "Semak-semak", "Akar rumput"] },
    { q: "Alat untuk mengukur berat badan kita dinamakan...?", a: "Timbangan", w: ["Penggaris", "Jam", "Termometer"] },
    { q: "Peralatan keselamatan saat naik sepeda motor adalah...?", a: "Helm", w: ["Topi", "Kacamata", "Payung"] }
  ];

  let idCounter = 1;
  for (const q of genTKAAdv) {
    list.push({
      id: `GEN_TKA_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK A (Advanced)",
      category: "Pengetahuan Umum",
      question: q.q,
      options: [q.a, q.w[0], q.w[1], q.w[2]],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// Generate Pengetahuan Umum TK B
function generateGeneralKnowledgeTKB(): Question[] {
  const list: Question[] = [];
  const genTKB = [
    { q: "Semboyan Indonesia 'Bhinneka Tunggal Ika' artinya...?", a: "Berbeda-beda tetapi tetap satu", w: ["Sama semua", "Bersatu kita teguh", "Pasti menang"] },
    { q: "Tempat mendarat dan lepas landas pesawat terbang adalah...?", a: "Bandara", w: ["Stasiun", "Pelabuhan", "Terminal"] },
    { q: "Tempat berhentinya kereta api untuk naik-turun penumpang adalah...?", a: "Stasiun", w: ["Bandara", "Pelabuhan", "Halte"] },
    { q: "Tempat berhentinya kapal laut di tepi pantai adalah...?", a: "Pelabuhan", w: ["Stasiun", "Bandara", "Terminal"] },
    { q: "Siapa yang mengemudikan kereta api?", a: "Masinis", w: ["Pilot", "Sopir", "Nakhoda"] },
    { q: "Siapa yang mengemudikan kapal laut?", a: "Nakhoda", w: ["Masinis", "Pilot", "Sopir"] },
    { q: "Matahari terbit dari arah...?", a: "Timur", w: ["Barat", "Utara", "Selatan"] },
    { q: "Matahari terbenam di arah...?", a: "Barat", w: ["Timur", "Utara", "Selatan"] },
    { q: "Ibu kota Provinsi Jawa Barat adalah...?", a: "Bandung", w: ["Surabaya", "Semarang", "Medan"] },
    { q: "Ibu kota Provinsi Jawa Timur adalah...?", a: "Surabaya", w: ["Bandung", "Malang", "Jogja"] },
    { q: "Ibu kota Provinsi Jawa Tengah adalah...?", a: "Semarang", w: ["Solo", "Magelang", "Bandung"] },
    { q: "Pulau Dewata yang terkenal dengan keindahan pantainya adalah...?", a: "Bali", w: ["Jawa", "Sumatra", "Papua"] },
    { q: "Komodo hidup alami di pulau...?", a: "Komodo (NTT)", w: ["Bali", "Jawa", "Madura"] },
    { q: "Lagu 'Indonesia Pusaka' diciptakan untuk mencintai...?", a: "Tanah air Indonesia", w: ["Mainan", "Sekolah", "Bunga"] },
    { q: "Kain khas Indonesia yang digambar dengan canting dan malam dinamakan...?", a: "Batik", w: ["Sutra", "Kain katun", "Handuk"] },
    { q: "Pancasila terdiri dari berapa sila?", a: "5 Sila", w: ["3 Sila", "4 Sila", "6 Sila"] },
    { q: "Sila pertama Pancasila dilambangkan dengan simbol...?", a: "Bintang", w: ["Rantai", "Pohon Beringin", "Banteng"] },
    { q: "Sila kelima Pancasila dilambangkan dengan simbol...?", a: "Padi dan Kapas", w: ["Bintang", "Rantai", "Banteng"] },
    { q: "Siapa Wakil Presiden pertama Indonesia mendampingi Bung Karno?", a: "Mohammad Hatta", w: ["BJ Habibie", "Jokowi", "Soeharto"] },
    { q: "Hewan khas Sumatra yang bergaris belang oranye-hitam dinamakan...?", a: "Harimau Sumatra", w: ["Singa", "Serigala", "Kucing"] }
  ];

  let idCounter = 1;
  for (const q of genTKB) {
    list.push({
      id: `GEN_TKB_${String(idCounter).padStart(3, "0")}`,
      level: "TK B",
      category: "Pengetahuan Umum",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// Generate Pengetahuan Umum TK B (Advanced)
function generateGeneralKnowledgeTKBAdvanced(): Question[] {
  const list: Question[] = [];
  const genTKBAdv = [
    { q: "Tokoh pahlawan Indonesia yang pintar merancang pesawat terbang adalah...?", a: "B.J. Habibie", w: ["Ir. Soekarno", "Ki Hajar Dewantara", "Diponegoro"] },
    { q: "Lautan yang sangat luas mengelilingi daratan di bumi dinamakan...?", a: "Samudra", w: ["Danau", "Sungai", "Kolam"] },
    { q: "Candi Buddha terbesar di dunia yang ada di Jawa Tengah bernama Candi...?", a: "Borobudur", w: ["Prambanan", "Mendut", "Muara Takus"] },
    { q: "Candi Hindu terkenal yang ada di Yogyakarta bernama Candi...?", a: "Prambanan", w: ["Borobudur", "Kalasan", "Cetho"] },
    { q: "Rumah adat khas Sumatra Barat dengan atap seperti tanduk kerbau bernama...?", a: "Rumah Gadang", w: ["Rumah Joglo", "Rumah Tongkonan", "Rumah Honai"] },
    { q: "Rumah adat khas Jawa berbentuk limas dinamakan...?", a: "Rumah Joglo", w: ["Rumah Gadang", "Rumah Honai", "Rumah Kebaya"] },
    { q: "Rumah adat tradisional Papua berbentuk jerami bulat dinamakan...?", a: "Rumah Honai", w: ["Rumah Joglo", "Rumah Gadang", "Rumah Panggung"] },
    { q: "Guncangan pada tanah akibat pergerakan kerak bumi dinamakan...?", a: "Gempa bumi", w: ["Banjir", "Angin topan", "Kebakaran"] },
    { q: "Alat penunjuk arah mata angin (Utara, Selatan, Timur, Barat) adalah...?", a: "Kompas", w: ["Termometer", "Penggaris", "Jam"] },
    { q: "Pahlawan wanita dari Jepara pelopor emansipasi wanita Indonesia adalah...?", a: "R.A. Kartini", w: ["Cut Nyak Dien", "Dewi Sartika", "Fatmawati"] },
    { q: "Bapak Pendidikan Nasional Indonesia yang lahir 2 Mei adalah...?", a: "Ki Hajar Dewantara", w: ["Ir. Soekarno", "Moh. Hatta", "Gadjah Mada"] },
    { q: "Pahlawan wanita berani dari Aceh yang melawan penjajah bernama...?", a: "Cut Nyak Dien", w: ["R.A. Kartini", "Puan Maharani", "Megawati"] },
    { q: "Sensus penduduk menghitung jumlah...?", a: "Manusia / Warga", w: ["Hewan", "Mobil", "Pohon"] },
    { q: "Danau vulkanik terbesar di Indonesia yang ada di Sumatra Utara adalah...?", a: "Danau Toba", w: ["Danau Singkarak", "Danau Maninjau", "Danau Sentani"] },
    { q: "Gunung tertinggi di pulau Jawa yang masih aktif adalah Gunung...?", a: "Semeru", w: ["Merapi", "Bromo", "Slamet"] },
    { q: "Alat musik petik khas dari Nusa Tenggara Timur dinamakan...?", a: "Sasando", w: ["Angklung", "Gamelan", "Kecapi"] },
    { q: "Hutan hujan tropis bermanfaat bagi bumi sebagai...?", a: "Paru-paru dunia", w: ["Pusat kota", "Lautan", "Gurun pasir"] },
    { q: "Peristiwa meluapnya air sungai menggenangi pemukiman dinamakan...?", a: "Banjir", w: ["Gempa", "Kemarau", "Longsor"] },
    { q: "Tanah longsor bisa dicegah dengan menanam banyak...?", a: "Pohon", w: ["Batu", "Rumah", "Jalan aspal"] },
    { q: "Negara tetangga Indonesia yang paling dekat di sebelah utara adalah...?", a: "Malaysia / Singapura", w: ["Amerika", "Jepang", "Inggris"] }
  ];

  let idCounter = 1;
  for (const q of genTKBAdv) {
    list.push({
      id: `GEN_TKB_ADV_${String(idCounter).padStart(3, "0")}`,
      level: "TK B (Advanced)",
      category: "Pengetahuan Umum",
      question: q.q,
      options: [q.a, ...q.w],
      answer: q.a
    });
    idCounter++;
  }
  return list;
}

// ==========================================
// BATCH 2 — MATEMATIKA: Preschool 1 & 2, SD Kelas 1-6
// Each level uses its own bounded complexity range so content never
// overlaps with the adjacent level (see curriculum table in project notes).
// ==========================================

// Generate Matematika Preschool 1 (2 tahun) — 100 questions
// Scope: counting 1-3, more/less, equal quantity, number sequence 1-3 only
function generateMathPreschool1(): Question[] {
  const list: Question[] = [];
  const items = [
    "apel", "bola", "boneka", "mobil mainan", "ikan mainan", "bebek karet",
    "kucing kecil", "anjing kecil", "balon", "bintang", "bunga", "kue",
    "topi", "sepatu", "payung", "ember", "sendok", "gelas", "piring",
    "buku", "pensil", "kelereng", "permen", "jeruk", "pisang", "mangga",
    "stroberi", "donat", "biskuit", "roti"
  ];

  // A. Counting objects 1-3 (51 questions)
  for (let i = 0; i < 51; i++) {
    const item = items[i % items.length];
    const count = (Math.floor(i / items.length) % 3) + 1;
    const wrongPool = [1, 2, 3, 4].filter((n) => n !== count);
    list.push({
      id: `MATH_PS1_${String(i + 1).padStart(3, "0")}`,
      level: "Preschool 1 (2 thn)",
      category: "Matematika",
      question: `Ibu punya ${count} ${item}. Berapa jumlah ${item} yang Ibu punya?`,
      options: [String(count), String(wrongPool[0]), String(wrongPool[1]), String(wrongPool[2])],
      answer: String(count)
    });
  }

  // B. Lebih banyak / lebih sedikit dalam 1-3 (30 questions)
  for (let i = 0; i < 30; i++) {
    const itemA = items[i % items.length];
    const itemB = items[(i + 7) % items.length];
    const a = (i % 3) + 1;
    let b = ((i + 1) % 3) + 1;
    if (a === b) b = (b % 3) + 1;
    const bigger = a > b ? `${a} ${itemA}` : `${b} ${itemB}`;
    const smaller = a > b ? `${b} ${itemB}` : `${a} ${itemA}`;
    list.push({
      id: `MATH_PS1_${String(51 + i + 1).padStart(3, "0")}`,
      level: "Preschool 1 (2 thn)",
      category: "Matematika",
      question: `Ada ${a} ${itemA} dan ${b} ${itemB}. Mana yang JUMLAHNYA lebih banyak?`,
      options: [bigger, smaller, "Sama banyak", `${Math.max(a, b) + 1} ${itemA}`],
      answer: bigger
    });
  }

  // C. Sama banyak (15 questions)
  for (let i = 0; i < 15; i++) {
    const itemA = items[i % items.length];
    const itemB = items[(i + 3) % items.length];
    const n = (i % 3) + 1;
    list.push({
      id: `MATH_PS1_${String(81 + i + 1).padStart(3, "0")}`,
      level: "Preschool 1 (2 thn)",
      category: "Matematika",
      question: `Ada ${n} ${itemA} dan ${n} ${itemB}. Apakah jumlahnya sama banyak?`,
      options: ["Ya, sama banyak", "Tidak sama banyak", `${itemA} lebih banyak`, `${itemB} lebih banyak`],
      answer: "Ya, sama banyak"
    });
  }

  // D. Urutan angka 1-3 (4 questions — this is the complete set of unique
  // before/after facts that exist within the 1-3 range; there is no room to
  // pad this further without duplicating or exceeding the level's scope).
  const sequenceFacts: { question: string; answer: string }[] = [
    { question: "Angka setelah 1 adalah...?", answer: "2" },
    { question: "Angka setelah 2 adalah...?", answer: "3" },
    { question: "Angka sebelum 2 adalah...?", answer: "1" },
    { question: "Angka sebelum 3 adalah...?", answer: "2" }
  ];
  sequenceFacts.forEach((fact, i) => {
    list.push({
      id: `MATH_PS1_${String(96 + i + 1).padStart(3, "0")}`,
      level: "Preschool 1 (2 thn)",
      category: "Matematika",
      question: fact.question,
      options: [fact.answer, String(Number(fact.answer) + 1), String(Number(fact.answer) === 1 ? 3 : 1), "4"],
      answer: fact.answer
    });
  });

  return list;
}

// Generate Matematika Preschool 2 (3 tahun) — 100 questions
// Scope: counting 1-5, simple addition within 5, more/less/equal up to 5, sequence 1-5
function generateMathPreschool2(): Question[] {
  const list: Question[] = [];
  const items = [
    "apel", "jeruk", "permen", "balon", "kelereng", "stroberi", "mangga",
    "boneka", "mobil mainan", "buku", "pensil", "biskuit", "kue donat",
    "pisang", "bunga", "topi", "bintang", "ikan mas", "kucing", "kelinci",
    "kupu-kupu", "burung", "telur", "cokelat", "es krim", "roti", "gundu",
    "krayon", "penghapus", "layang-layang"
  ];

  // A. Counting objects 1-5 (47 questions)
  for (let i = 0; i < 47; i++) {
    const item = items[i % items.length];
    const count = (Math.floor(i / items.length) % 5) + 1;
    const wrongPool = [1, 2, 3, 4, 5, 6].filter((n) => n !== count).slice(0, 3);
    list.push({
      id: `MATH_PS2_${String(i + 1).padStart(3, "0")}`,
      level: "Preschool 2 (3 thn)",
      category: "Matematika",
      question: `Ayah punya ${count} ${item}. Berapa jumlah ${item} yang Ayah punya?`,
      options: [String(count), ...wrongPool.map(String)],
      answer: String(count)
    });
  }

  // B. Penjumlahan sederhana dalam 5 (25 questions)
  for (let i = 0; i < 25; i++) {
    const item = items[i % items.length];
    const x = (i % 3) + 1;
    const y = (i % 2) + 1;
    const total = Math.min(x + y, 5);
    list.push({
      id: `MATH_PS2_${String(47 + i + 1).padStart(3, "0")}`,
      level: "Preschool 2 (3 thn)",
      category: "Matematika",
      question: `Kamu punya ${x} ${item}, lalu dapat ${y} ${item} lagi. Berapa jumlahnya sekarang?`,
      options: [String(total), String(total + 1), String(Math.max(total - 1, 1)), String(total + 2)],
      answer: String(total)
    });
  }

  // C. Lebih banyak / sedikit / sama sampai 5 (20 questions)
  for (let i = 0; i < 20; i++) {
    const itemA = items[i % items.length];
    const itemB = items[(i + 9) % items.length];
    const a = (i % 5) + 1;
    const b = ((i + 2) % 5) + 1;
    let question: string, answer: string, options: string[];
    if (a === b) {
      question = `Ada ${a} ${itemA} dan ${b} ${itemB}. Apakah jumlahnya sama banyak?`;
      answer = "Ya, sama banyak";
      options = ["Ya, sama banyak", "Tidak sama banyak", `${itemA} lebih banyak`, `${itemB} lebih banyak`];
    } else {
      const bigger = a > b ? `${a} ${itemA}` : `${b} ${itemB}`;
      const smaller = a > b ? `${b} ${itemB}` : `${a} ${itemA}`;
      question = `Ada ${a} ${itemA} dan ${b} ${itemB}. Mana yang lebih sedikit?`;
      answer = smaller;
      options = [smaller, bigger, "Sama banyak", `${Math.max(a, b) + 1} ${itemA}`];
    }
    list.push({
      id: `MATH_PS2_${String(72 + i + 1).padStart(3, "0")}`,
      level: "Preschool 2 (3 thn)",
      category: "Matematika",
      question,
      options,
      answer
    });
  }

  // D. Urutan angka 1-5, sebelum & sesudah (8 questions — this is the
  // complete set of unique facts within 1-5: after 1-4, before 2-5).
  const sequenceFacts: { question: string; answer: string; prompt: string }[] = [];
  for (let n = 1; n <= 4; n++) {
    sequenceFacts.push({ question: `Angka setelah ${n} adalah...?`, answer: String(n + 1), prompt: String(n) });
  }
  for (let n = 2; n <= 5; n++) {
    sequenceFacts.push({ question: `Angka sebelum ${n} adalah...?`, answer: String(n - 1), prompt: String(n) });
  }
  sequenceFacts.forEach((fact, i) => {
    list.push({
      id: `MATH_PS2_${String(92 + i + 1).padStart(3, "0")}`,
      level: "Preschool 2 (3 thn)",
      category: "Matematika",
      question: fact.question,
      options: [fact.answer, fact.prompt, String(Math.min(Number(fact.answer) + 1, 6)), "1"],
      answer: fact.answer
    });
  });

  return list;
}

// Generate Matematika SD Kelas 1 (7 tahun) — 100 questions
// Scope: numbers to 100, addition/subtraction without carrying, multiplication
// as repeated addition, simple coins (Rp). No formal multiplication algorithm,
// no fractions, no division.
function generateMathSD1(): Question[] {
  const list: Question[] = [];
  const items = [
    "kelereng", "buku tulis", "pensil warna", "permen", "stiker", "kartu",
    "balon", "kancing", "biskuit", "apel", "jeruk", "mainan mobil"
  ];

  // A. Bilangan sampai 100 (20 questions)
  for (let i = 0; i < 20; i++) {
    const askAfter = i % 2 === 0;
    const base = 5 + i * 4; // spread across range up to ~96
    const answerNum = askAfter ? base + 1 : base - 1;
    list.push({
      id: `MATH_SD1_${String(i + 1).padStart(3, "0")}`,
      level: "SD Kelas 1",
      category: "Matematika",
      question: askAfter ? `Angka setelah ${base} adalah...?` : `Angka sebelum ${base} adalah...?`,
      options: [String(answerNum), String(base), String(answerNum + 2), String(answerNum - 2 < 0 ? answerNum + 3 : answerNum - 2)],
      answer: String(answerNum)
    });
  }

  // B. Penjumlahan dua angka di bawah 100 (25 questions)
  for (let i = 0; i < 25; i++) {
    const item = items[i % items.length];
    const x = 10 + (i % 8) * 5; // 8 distinct values: 10..45
    const y = 3 + (Math.floor(i / 8) % 4) * 4; // 4 distinct values: 3,7,11,15
    const total = x + y;
    list.push({
      id: `MATH_SD1_${String(20 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 1",
      category: "Matematika",
      question: `${x} + ${y} = ...?  (Ada ${x} ${item}, ditambah ${y} ${item} lagi)`,
      options: [String(total), String(total + 1), String(total - 1), String(total + 10)],
      answer: String(total)
    });
  }

  // C. Pengurangan sampai 100 tanpa meminjam (25 questions)
  for (let i = 0; i < 25; i++) {
    const item = items[i % items.length];
    const x = 30 + (i % 10) * 6; // up to ~84
    const y = 2 + (i % 7) * 3; // small subtractor, digit-safe
    const total = x - y;
    list.push({
      id: `MATH_SD1_${String(45 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 1",
      category: "Matematika",
      question: `${x} - ${y} = ...?  (Ada ${x} ${item}, diambil ${y} ${item})`,
      options: [String(total), String(total + 1), String(total - 1), String(total + 10)],
      answer: String(total)
    });
  }

  // D. Perkalian sebagai penjumlahan berulang (15 questions)
  for (let i = 0; i < 15; i++) {
    const item = items[i % items.length];
    const groups = (i % 4) + 2; // 4 distinct: 2..5 groups
    const perGroup = (Math.floor(i / 4) % 4) + 2; // 4 distinct: 2..5 per group
    const total = groups * perGroup;
    list.push({
      id: `MATH_SD1_${String(70 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 1",
      category: "Matematika",
      question: `Ada ${groups} kelompok ${item}, masing-masing berisi ${perGroup} ${item}. Berapa jumlah ${item} semuanya?`,
      options: [String(total), String(total + perGroup), String(total - perGroup), String(groups + perGroup)],
      answer: String(total)
    });
  }

  // E. Uang receh sederhana (15 questions — all C(6,2)=15 unique coin pairs)
  const coinDenominations = [100, 200, 500, 1000, 2000, 5000];
  const coinPairs: [number, number][] = [];
  for (let a = 0; a < coinDenominations.length; a++) {
    for (let b = a + 1; b < coinDenominations.length; b++) {
      coinPairs.push([coinDenominations[a], coinDenominations[b]]);
    }
  }
  for (let i = 0; i < 15; i++) {
    const [coin1, coin2] = coinPairs[i];
    const total = coin1 + coin2;
    list.push({
      id: `MATH_SD1_${String(85 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 1",
      category: "Matematika",
      question: `Kamu punya uang koin Rp${coin1} dan Rp${coin2}. Berapa total uangmu?`,
      options: [`Rp${total}`, `Rp${total + 100}`, `Rp${total - 100}`, `Rp${coin1}`],
      answer: `Rp${total}`
    });
  }

  return list;
}

// Generate Matematika SD Kelas 2 (8 tahun) — 100 questions
// Scope: numbers to 1000, multiplication 1-5, simple division, whole/half clock,
// basic length measurement (cm/m). No division with remainders, no volume.
function generateMathSD2(): Question[] {
  const list: Question[] = [];

  // A. Bilangan sampai 1000 (15 questions)
  for (let i = 0; i < 15; i++) {
    const base = 100 + i * 63; // spread across range up to ~982
    const askAfter = i % 2 === 0;
    const answerNum = askAfter ? base + 1 : base - 1;
    list.push({
      id: `MATH_SD2_${String(i + 1).padStart(3, "0")}`,
      level: "SD Kelas 2",
      category: "Matematika",
      question: askAfter ? `Angka setelah ${base} adalah...?` : `Angka sebelum ${base} adalah...?`,
      options: [String(answerNum), String(base), String(answerNum + 10), String(answerNum - 10)],
      answer: String(answerNum)
    });
  }

  // B. Perkalian 1-5 (25 questions)
  for (let i = 0; i < 25; i++) {
    const a = (i % 5) + 1;
    const b = (i % 9) + 2;
    const total = a * b;
    list.push({
      id: `MATH_SD2_${String(15 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 2",
      category: "Matematika",
      question: `${a} x ${b} = ...?`,
      options: [String(total), String(total + a), String(total - a), String(a + b)],
      answer: String(total)
    });
  }

  // C. Pembagian sederhana, habis dibagi (20 questions)
  for (let i = 0; i < 20; i++) {
    const divisor = (i % 4) + 2; // 4 distinct: 2..5
    const quotient = (Math.floor(i / 4) % 5) + 2; // 5 distinct: 2..6
    const dividend = divisor * quotient;
    list.push({
      id: `MATH_SD2_${String(40 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 2",
      category: "Matematika",
      question: `${dividend} : ${divisor} = ...?`,
      options: [String(quotient), String(quotient + 1), String(quotient - 1), String(divisor)],
      answer: String(quotient)
    });
  }

  // D. Jam bulat & setengah (20 questions)
  for (let i = 0; i < 20; i++) {
    const hour = (i % 12) + 1; // 12 distinct
    const isHalf = Math.floor(i / 12) % 2 === 0; // block-based, not tied to hour's cycle
    const label = isHalf ? `${hour}.30` : `${hour}.00`;
    const wordLabel = isHalf ? `setengah lewat pukul ${hour}` : `pukul ${hour} tepat`;
    list.push({
      id: `MATH_SD2_${String(60 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 2",
      category: "Matematika",
      question: `Jarum jam menunjukkan ${wordLabel}. Ditulis dalam angka menjadi...?`,
      options: [label, `${hour}.15`, `${hour}.45`, `${(hour % 12) + 1}.00`],
      answer: label
    });
  }

  // E. Pengukuran panjang cm/m dasar (20 questions)
  for (let i = 0; i < 20; i++) {
    const meters = i + 1; // 1..20, strictly increasing, guaranteed unique
    const cm = meters * 100;
    list.push({
      id: `MATH_SD2_${String(80 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 2",
      category: "Matematika",
      question: `${meters} meter sama dengan berapa sentimeter?`,
      options: [String(cm), String(cm + 100), String(cm - 100), String(meters * 10)],
      answer: String(cm)
    });
  }

  return list;
}

// Generate Matematika SD Kelas 3 (9 tahun) — 100 questions
// Scope: multiplication 1-10, basic division, simple fractions (1/2, 1/3, 1/4),
// perimeter of basic shapes, clock with minutes. No decimals, no negative numbers.
function generateMathSD3(): Question[] {
  const list: Question[] = [];

  // A. Perkalian 1-10 lancar (25 questions)
  for (let i = 0; i < 25; i++) {
    const a = (i % 5) * 2 + 1; // 5 distinct odd values: 1,3,5,7,9
    const b = (Math.floor(i / 5) % 5) * 2 + 2; // 5 distinct even values: 2,4,6,8,10
    const total = a * b;
    list.push({
      id: `MATH_SD3_${String(i + 1).padStart(3, "0")}`,
      level: "SD Kelas 3",
      category: "Matematika",
      question: `${a} x ${b} = ...?`,
      options: [String(total), String(total + b), String(total - b), String(total + 10)],
      answer: String(total)
    });
  }

  // B. Pembagian dasar (20 questions)
  for (let i = 0; i < 20; i++) {
    const divisor = (i % 5) + 2; // 5 distinct: 2..6
    const quotient = (Math.floor(i / 5) % 4) + 2; // 4 distinct: 2..5
    const dividend = divisor * quotient;
    list.push({
      id: `MATH_SD3_${String(25 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 3",
      category: "Matematika",
      question: `${dividend} : ${divisor} = ...?`,
      options: [String(quotient), String(quotient + 2), String(quotient - 1), String(divisor + 1)],
      answer: String(quotient)
    });
  }

  // C. Pecahan sederhana 1/2, 1/3, 1/4 (25 questions)
  const fractionSets = [
    { frac: "1/2", of: 2 },
    { frac: "1/3", of: 3 },
    { frac: "1/4", of: 4 }
  ];
  const fracItems = ["kue", "apel", "semangka", "coklat batangan", "roti"];
  for (let i = 0; i < 25; i++) {
    const setIdx = i % 3;
    const j = Math.floor(i / 3);
    const itemIdx = j % fracItems.length;
    const wholeMultiplier = (Math.floor(j / fracItems.length) % 3) + 1;
    const set = fractionSets[setIdx];
    const item = fracItems[itemIdx];
    const total = set.of * wholeMultiplier;
    const part = wholeMultiplier;
    list.push({
      id: `MATH_SD3_${String(45 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 3",
      category: "Matematika",
      question: `Sebuah ${item} dibagi menjadi ${total} bagian sama besar. Berapa bagian yang menjadi ${set.frac} dari ${item} itu?`,
      options: [String(part), String(part + 1), String(part - 1 < 1 ? part + 2 : part - 1), String(total)],
      answer: String(part)
    });
  }

  // D. Keliling bangun datar: persegi (8 soal) lalu persegi panjang (7 soal),
  // masing-masing loop terpisah dengan index sendiri (bukan interleaved) agar tidak collision.
  for (let j = 0; j < 8; j++) {
    const side = 3 + j; // strictly increasing, guaranteed unique
    const perimeter = side * 4;
    list.push({
      id: `MATH_SD3_${String(70 + j + 1).padStart(3, "0")}`,
      level: "SD Kelas 3",
      category: "Matematika",
      question: `Sebuah persegi memiliki panjang sisi ${side} cm. Berapa kelilingnya?`,
      options: [`${perimeter} cm`, `${perimeter + 4} cm`, `${side * 2} cm`, `${side * side} cm`],
      answer: `${perimeter} cm`
    });
  }
  for (let j = 0; j < 7; j++) {
    const p = 4 + j; // strictly increasing
    const l = 2 + (j % 4);
    const perimeter = 2 * (p + l);
    list.push({
      id: `MATH_SD3_${String(78 + j + 1).padStart(3, "0")}`,
      level: "SD Kelas 3",
      category: "Matematika",
      question: `Sebuah persegi panjang memiliki panjang ${p} cm dan lebar ${l} cm. Berapa kelilingnya?`,
      options: [`${perimeter} cm`, `${p * l} cm`, `${perimeter + 2} cm`, `${p + l} cm`],
      answer: `${perimeter} cm`
    });
  }

  // E. Jam menit (15 questions)
  for (let i = 0; i < 15; i++) {
    const hour = (i % 5) + 1; // 5 distinct
    const minute = [15, 30, 45][Math.floor(i / 5) % 3]; // 3 distinct
    const label = `${hour}.${minute}`;
    list.push({
      id: `MATH_SD3_${String(85 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 3",
      category: "Matematika",
      question: `Jarum jam menunjukkan pukul ${hour} lewat ${minute} menit. Ditulis dalam angka menjadi...?`,
      options: [label, `${hour}.00`, `${(hour % 12) + 1}.${minute}`, `${hour}.${minute === 45 ? 15 : minute + 15}`],
      answer: label
    });
  }

  return list;
}

// Generate Matematika SD Kelas 4 (10 tahun) — 100 questions
// Scope: numbers to tens of thousands, equivalent fractions, basic decimals,
// area of square/rectangle, basic LCM/GCF. No algebra, no percentages.
function generateMathSD4(): Question[] {
  const list: Question[] = [];

  // A. Bilangan besar ribuan-puluhan ribu (15 questions)
  for (let i = 0; i < 15; i++) {
    const base = 1000 + i * 777;
    const askAfter = i % 2 === 0;
    const answerNum = askAfter ? base + 1 : base - 1;
    list.push({
      id: `MATH_SD4_${String(i + 1).padStart(3, "0")}`,
      level: "SD Kelas 4",
      category: "Matematika",
      question: askAfter ? `Angka setelah ${base} adalah...?` : `Angka sebelum ${base} adalah...?`,
      options: [String(answerNum), String(base), String(answerNum + 100), String(answerNum - 100)],
      answer: String(answerNum)
    });
  }

  // B. Pecahan senilai (20 questions)
  for (let i = 0; i < 20; i++) {
    const num = (i % 4) + 1; // 4 distinct
    const denOffset = (Math.floor(i / 4) % 5) + 2; // 5 distinct
    const den = num + denOffset;
    const multiplier = (i % 3) + 2;
    const equivNum = num * multiplier;
    const equivDen = den * multiplier;
    list.push({
      id: `MATH_SD4_${String(15 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 4",
      category: "Matematika",
      question: `Pecahan ${num}/${den} senilai dengan ${equivNum}/...? (isi bagian penyebutnya)`,
      options: [String(equivDen), String(equivDen + multiplier), String(equivDen - multiplier), String(den)],
      answer: String(equivDen)
    });
  }

  // C. Desimal dasar (20 questions)
  for (let i = 0; i < 20; i++) {
    const whole = i % 5;
    const tenths = (i % 9) + 1;
    const decimalValue = `${whole}.${tenths}`;
    const fractionForm = `${whole * 10 + tenths}/10`;
    list.push({
      id: `MATH_SD4_${String(35 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 4",
      category: "Matematika",
      question: `Pecahan ${fractionForm} jika ditulis dalam bentuk desimal menjadi...?`,
      options: [decimalValue, `${whole}.${(tenths % 9) + 1}`, `${whole + 1}.${tenths}`, `${whole}.0${tenths}`],
      answer: decimalValue
    });
  }

  // D. Luas persegi (10 soal) lalu persegi panjang (10 soal), loop terpisah
  // dengan index sendiri agar tidak collision.
  for (let j = 0; j < 10; j++) {
    const side = 3 + j; // strictly increasing
    const area = side * side;
    list.push({
      id: `MATH_SD4_${String(55 + j + 1).padStart(3, "0")}`,
      level: "SD Kelas 4",
      category: "Matematika",
      question: `Sebuah persegi memiliki sisi ${side} cm. Berapa luasnya?`,
      options: [`${area} cm²`, `${side * 4} cm²`, `${area + side} cm²`, `${area - side} cm²`],
      answer: `${area} cm²`
    });
  }
  for (let j = 0; j < 10; j++) {
    const p = 4 + j; // strictly increasing
    const l = 2 + (j % 5);
    const area = p * l;
    list.push({
      id: `MATH_SD4_${String(65 + j + 1).padStart(3, "0")}`,
      level: "SD Kelas 4",
      category: "Matematika",
      question: `Sebuah persegi panjang memiliki panjang ${p} cm dan lebar ${l} cm. Berapa luasnya?`,
      options: [`${area} cm²`, `${2 * (p + l)} cm²`, `${area + l} cm²`, `${area - l} cm²`],
      answer: `${area} cm²`
    });
  }

  // E. KPK / FPB dasar (25 questions)
  function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
  for (let i = 0; i < 25; i++) {
    const askKPK = i % 2 === 0;
    const a = (i % 6) + 2; // 6 distinct
    const b = (Math.floor(i / 6) % 6) + 2; // 6 distinct
    if (askKPK) {
      const g = gcd(a, b);
      const lcm = (a * b) / g;
      list.push({
        id: `MATH_SD4_${String(75 + i + 1).padStart(3, "0")}`,
        level: "SD Kelas 4",
        category: "Matematika",
        question: `KPK (Kelipatan Persekutuan Terkecil) dari ${a} dan ${b} adalah...?`,
        options: [String(lcm), String(lcm + a), String(a * b), String(lcm - a > 0 ? lcm - a : lcm + b)],
        answer: String(lcm)
      });
    } else {
      const g = gcd(a, b);
      list.push({
        id: `MATH_SD4_${String(75 + i + 1).padStart(3, "0")}`,
        level: "SD Kelas 4",
        category: "Matematika",
        question: `FPB (Faktor Persekutuan Terbesar) dari ${a} dan ${b} adalah...?`,
        options: [String(g), String(g + 1), String(a), String(b)],
        answer: String(g)
      });
    }
  }

  return list;
}

// Generate Matematika SD Kelas 5 (11 tahun) — 100 questions
// Scope: mixed fraction operations, decimal/percent conversion, simple volume
// (cube/cuboid), basic map scale. No algebraic variables.
function generateMathSD5(): Question[] {
  const list: Question[] = [];

  // A. Operasi pecahan berpenyebut sama (25 questions)
  for (let i = 0; i < 25; i++) {
    const denIdx = i % 6; // 6 distinct denominators: 4..9
    const den = denIdx + 4;
    const sub = Math.floor(i / 6); // up to 5 blocks within same denominator
    const numA = (sub % (den - 1)) + 1;
    const numB = ((sub + 1) % (den - 1)) + 1;
    const isAdd = sub % 2 === 0;
    const a = isAdd ? numA : Math.max(numA, numB);
    const b = isAdd ? numB : Math.min(numA, numB);
    const resultNum = isAdd ? a + b : a - b;
    list.push({
      id: `MATH_SD5_${String(i + 1).padStart(3, "0")}`,
      level: "SD Kelas 5",
      category: "Matematika",
      question: `${a}/${den} ${isAdd ? "+" : "-"} ${b}/${den} = ...?`,
      options: [`${resultNum}/${den}`, `${resultNum + 1}/${den}`, `${resultNum}/${den + 1}`, `${a}/${den}`],
      answer: `${resultNum}/${den}`
    });
  }

  // B. Desimal & persen konversi (25 questions)
  for (let i = 0; i < 25; i++) {
    const percent = 5 + i * 3; // strictly increasing, always unique: 5,8,11,...,77
    const decimal = (percent / 100).toString();
    list.push({
      id: `MATH_SD5_${String(25 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 5",
      category: "Matematika",
      question: `${percent}% jika diubah menjadi bentuk desimal adalah...?`,
      options: [decimal, (percent / 10).toString(), (percent * 10).toString(), (percent / 1000).toString()],
      answer: decimal
    });
  }

  // C. Volume bangun ruang sederhana: kubus (13 soal) lalu balok (12 soal),
  // masing-masing loop terpisah dengan index sendiri agar tidak collision.
  for (let j = 0; j < 13; j++) {
    const side = 2 + j; // strictly increasing
    const volume = side * side * side;
    list.push({
      id: `MATH_SD5_${String(50 + j + 1).padStart(3, "0")}`,
      level: "SD Kelas 5",
      category: "Matematika",
      question: `Sebuah kubus memiliki panjang sisi ${side} cm. Berapa volumenya?`,
      options: [`${volume} cm³`, `${side * side} cm³`, `${side * 6} cm³`, `${volume + side} cm³`],
      answer: `${volume} cm³`
    });
  }
  for (let j = 0; j < 12; j++) {
    const p = 2 + j; // strictly increasing
    const l = 2 + (j % 5);
    const t = 2 + (j % 3);
    const volume = p * l * t;
    list.push({
      id: `MATH_SD5_${String(63 + j + 1).padStart(3, "0")}`,
      level: "SD Kelas 5",
      category: "Matematika",
      question: `Sebuah balok memiliki panjang ${p} cm, lebar ${l} cm, dan tinggi ${t} cm. Berapa volumenya?`,
      options: [`${volume} cm³`, `${p * l} cm³`, `${volume + t} cm³`, `${p + l + t} cm³`],
      answer: `${volume} cm³`
    });
  }

  // D. Skala peta dasar (25 questions)
  const scaleDenominators = [100, 500, 1000, 10000];
  for (let i = 0; i < 25; i++) {
    const scaleIdx = i % scaleDenominators.length; // 4 distinct
    const scaleDenominator = scaleDenominators[scaleIdx];
    const mapDistanceCm = (Math.floor(i / scaleDenominators.length) % 8) + 2; // 8 distinct
    const realDistanceCm = mapDistanceCm * scaleDenominator;
    const realDistanceM = realDistanceCm / 100;
    list.push({
      id: `MATH_SD5_${String(75 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 5",
      category: "Matematika",
      question: `Sebuah peta memiliki skala 1:${scaleDenominator}. Jika jarak di peta ${mapDistanceCm} cm, berapa jarak sebenarnya dalam meter?`,
      options: [`${realDistanceM} m`, `${realDistanceM + 10} m`, `${realDistanceM / 10} m`, `${mapDistanceCm} m`],
      answer: `${realDistanceM} m`
    });
  }

  return list;
}

// Generate Matematika SD Kelas 6 (12 tahun) — 100 questions
// Scope: mixed fraction/decimal/percent operations, composite solid shapes,
// basic speed/distance/time, negative number introduction, ratio.
function generateMathSD6(): Question[] {
  const list: Question[] = [];

  // A. Operasi campuran pecahan/desimal/persen (25 questions)
  for (let i = 0; i < 25; i++) {
    const percent = [10, 20, 25, 50][i % 4]; // 4 distinct
    const base = ((Math.floor(i / 4) % 7) + 2) * 10; // 7 distinct: 20..80
    const partValue = Math.round((percent / 100) * base);
    list.push({
      id: `MATH_SD6_${String(i + 1).padStart(3, "0")}`,
      level: "SD Kelas 6",
      category: "Matematika",
      question: `${percent}% dari ${base} adalah...?`,
      options: [String(partValue), String(partValue + 5), String(partValue - 5), String(base - partValue)],
      answer: String(partValue)
    });
  }

  // B. Bangun ruang gabungan - luas permukaan kubus sederhana (20 questions)
  for (let i = 0; i < 20; i++) {
    const side = 2 + i; // strictly increasing, guaranteed unique
    const surfaceArea = 6 * side * side;
    list.push({
      id: `MATH_SD6_${String(25 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 6",
      category: "Matematika",
      question: `Sebuah kubus memiliki panjang sisi ${side} cm. Berapa luas permukaannya (jumlah luas 6 sisi)?`,
      options: [`${surfaceArea} cm²`, `${side * side} cm²`, `${surfaceArea + side} cm²`, `${4 * side * side} cm²`],
      answer: `${surfaceArea} cm²`
    });
  }

  // C. Kecepatan, jarak, waktu dasar (25 questions)
  for (let i = 0; i < 25; i++) {
    const speed = 20 + (i % 6) * 10; // 6 distinct: km/jam
    const time = (Math.floor(i / 6) % 5) + 1; // 5 distinct: jam
    const distance = speed * time;
    list.push({
      id: `MATH_SD6_${String(45 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 6",
      category: "Matematika",
      question: `Sebuah mobil melaju dengan kecepatan ${speed} km/jam selama ${time} jam. Berapa jarak yang ditempuh?`,
      options: [`${distance} km`, `${distance + speed} km`, `${speed} km`, `${distance - time} km`],
      answer: `${distance} km`
    });
  }

  // D. Pengenalan bilangan negatif (15 questions)
  for (let i = 0; i < 15; i++) {
    const start = (i % 8) + 2;
    const drop = start + (i % 5) + 1;
    const result = start - drop; // always negative
    list.push({
      id: `MATH_SD6_${String(70 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 6",
      category: "Matematika",
      question: `Suhu di suatu tempat ${start} derajat, lalu turun ${drop} derajat. Berapa suhu sekarang?`,
      options: [`${result} derajat`, `${Math.abs(result)} derajat`, `${result + 1} derajat`, `${result - 1} derajat`],
      answer: `${result} derajat`
    });
  }

  // E. Perbandingan / rasio dasar (15 questions)
  for (let i = 0; i < 15; i++) {
    const ratioA = (i % 4) + 1;
    const ratioB = ((i + 1) % 4) + 2;
    const multiplier = (i % 5) + 2;
    const totalA = ratioA * multiplier;
    list.push({
      id: `MATH_SD6_${String(85 + i + 1).padStart(3, "0")}`,
      level: "SD Kelas 6",
      category: "Matematika",
      question: `Perbandingan kelereng merah dan biru adalah ${ratioA}:${ratioB}. Jika kelereng merah ada ${totalA} buah, berapa jumlah kelereng biru?`,
      options: [String(ratioB * multiplier), String(ratioA * multiplier), String((ratioB * multiplier) + 1), String((ratioB * multiplier) - 1)],
      answer: String(ratioB * multiplier)
    });
  }

  return list;
}

// ==========================================
// BATCH 2 — SAINS: Preschool 1 & 2, SD Kelas 1-6
// Curated fact arrays (not parametrized templates) — each entry is
// hand-written and distinct, so there is no cross-question duplication risk.
// Scope is bounded per level to avoid overlapping facts already covered in
// TK A/B (animal sounds, five senses, basic life cycle, states of matter,
// magnetism, solar system intro).
// ==========================================

interface FactItem { q: string; a: string; w: string[]; }

function buildFromFacts(facts: FactItem[], idPrefix: string, level: Level, category: Category, startIndex: number): Question[] {
  return facts.map((f, i) => ({
    id: `${idPrefix}_${String(startIndex + i + 1).padStart(3, "0")}`,
    level,
    category,
    question: f.q,
    options: [f.a, ...f.w],
    answer: f.a
  }));
}

// Generate Sains Preschool 1 (2 tahun) — 100 questions
// Scope: simple animal traits (not sounds — TK A covers sounds), basic body
// parts (not the five senses — TK A Advanced covers that), colors in nature, day/night.
function generateSciencePreschool1(): Question[] {
  const animalTraits: FactItem[] = [
    { q: "Hewan apa yang punya belalai panjang?", a: "Gajah", w: ["Kucing", "Ayam", "Ikan"] },
    { q: "Hewan apa yang lehernya sangat panjang?", a: "Jerapah", w: ["Kelinci", "Bebek", "Kambing"] },
    { q: "Hewan apa yang punya banyak lengan dan hidup di air, tubuhnya lembek?", a: "Gurita", w: ["Kucing", "Burung", "Sapi"] },
    { q: "Hewan apa yang punya kantung di perutnya untuk bawa anaknya?", a: "Kanguru", w: ["Anjing", "Bebek", "Ular"] },
    { q: "Hewan apa yang bisa terbang dan sayapnya berwarna-warni?", a: "Kupu-kupu", w: ["Gajah", "Sapi", "Ikan"] },
    { q: "Hewan apa yang badannya besar, hidup di laut, dan menyemprotkan air dari lubang di punggungnya?", a: "Paus", w: ["Kucing", "Ayam", "Kelinci"] },
    { q: "Hewan apa yang jalannya sangat lambat dan punya rumah cangkang di punggungnya?", a: "Kura-kura", w: ["Kelinci", "Anjing", "Ayam"] },
    { q: "Hewan apa yang suka melompat-lompat dan telinganya panjang?", a: "Kelinci", w: ["Sapi", "Ikan", "Bebek"] },
    { q: "Hewan apa yang badannya bergaris hitam putih?", a: "Zebra", w: ["Sapi", "Kambing", "Ayam"] },
    { q: "Hewan apa yang suka berenang dan bernapas pakai insang?", a: "Ikan", w: ["Kucing", "Ayam", "Kelinci"] },
    { q: "Hewan apa yang bisa menjadi sahabat manusia dan suka menjaga rumah?", a: "Anjing", w: ["Kucing", "Bebek", "Sapi"] },
    { q: "Hewan apa yang suka bermain dengan bola benang?", a: "Kucing", w: ["Anjing", "Ayam", "Kambing"] },
    { q: "Hewan apa yang bertelur dan bisa terbang tinggi di langit?", a: "Burung", w: ["Sapi", "Kucing", "Ikan"] },
    { q: "Hewan apa yang badannya besar dan punya cula di hidung?", a: "Badak", w: ["Kelinci", "Ayam", "Bebek"] },
    { q: "Hewan apa yang warna bulunya hitam putih dan suka makan bambu?", a: "Panda", w: ["Singa", "Bebek", "Sapi"] },
    { q: "Hewan apa yang dijuluki raja hutan?", a: "Singa", w: ["Kelinci", "Bebek", "Ikan"] },
    { q: "Hewan apa yang badannya panjang dan tidak punya kaki?", a: "Ular", w: ["Kucing", "Ayam", "Sapi"] },
    { q: "Hewan apa yang suka melompat, warnanya hijau, dan hidup di dekat kolam?", a: "Katak", w: ["Anjing", "Sapi", "Ayam"] },
    { q: "Hewan apa yang punya delapan kaki dan membuat sarang dari jaring-jaring?", a: "Laba-laba", w: ["Kucing", "Bebek", "Sapi"] },
    { q: "Hewan apa yang berkokok setiap pagi?", a: "Ayam jago", w: ["Bebek", "Kucing", "Anjing"] },
    { q: "Hewan apa yang badannya ditutupi bulu wol tebal untuk dibuat baju hangat?", a: "Domba", w: ["Sapi", "Ayam", "Ikan"] },
    { q: "Hewan apa yang badannya besar, hidup di sungai, dan giginya tajam?", a: "Buaya", w: ["Kelinci", "Ayam", "Kucing"] },
    { q: "Hewan apa yang suka memanjat pohon dan makan pisang?", a: "Monyet", w: ["Sapi", "Bebek", "Ikan"] },
    { q: "Hewan apa yang badannya ditutupi duri-duri tajam?", a: "Landak", w: ["Kucing", "Ayam", "Bebek"] },
    { q: "Hewan apa yang bisa mengubah warna kulitnya?", a: "Bunglon", w: ["Kucing", "Sapi", "Ayam"] },
    { q: "Hewan apa yang tinggal di cangkang dan meninggalkan jejak lendir?", a: "Siput", w: ["Kelinci", "Anjing", "Ayam"] },
    { q: "Hewan apa yang badannya kecil, suka menggigit keju, dan ditakuti kucing?", a: "Tikus", w: ["Sapi", "Bebek", "Ayam"] },
    { q: "Hewan apa yang berbulu tebal, hidup di tempat sangat dingin, dan warnanya putih?", a: "Beruang kutub", w: ["Sapi", "Ayam", "Bebek"] },
    { q: "Hewan apa yang suka terbang di malam hari dan tidur dengan posisi terbalik?", a: "Kelelawar", w: ["Ayam", "Bebek", "Sapi"] },
    { q: "Hewan apa yang badannya ditutupi sisik keras dan bisa menggulung tubuhnya jika ketakutan?", a: "Trenggiling", w: ["Kucing", "Ayam", "Sapi"] }
  ];

  const bodyParts: FactItem[] = [
    { q: "Kita menggunakan tangan untuk...?", a: "Memegang benda", w: ["Mencium bau", "Mendengar suara", "Melihat warna"] },
    { q: "Kita menggunakan kaki untuk...?", a: "Berjalan", w: ["Mendengar", "Mencium", "Melihat"] },
    { q: "Kita menggunakan mulut untuk...?", a: "Makan dan berbicara", w: ["Berjalan", "Memegang", "Melompat"] },
    { q: "Rambut biasanya tumbuh di bagian...?", a: "Kepala", w: ["Kaki", "Tangan", "Perut"] },
    { q: "Gigi kita gunakan untuk...?", a: "Mengunyah makanan", w: ["Berjalan", "Melihat", "Mendengar"] },
    { q: "Jari-jari kita ada di bagian...?", a: "Tangan dan kaki", w: ["Kepala", "Perut", "Punggung"] },
    { q: "Jantung kita berada di dalam bagian...?", a: "Dada", w: ["Kepala", "Kaki", "Tangan"] },
    { q: "Perut kita gunakan untuk...?", a: "Mencerna makanan", w: ["Berjalan", "Melihat", "Mendengar"] },
    { q: "Kita bernapas menggunakan hidung dan...?", a: "Paru-paru", w: ["Jantung", "Perut", "Tangan"] },
    { q: "Bagian tubuh yang kita gunakan untuk menendang bola adalah...?", a: "Kaki", w: ["Tangan", "Kepala", "Perut"] },
    { q: "Bagian tubuh yang kita gunakan untuk melambai adalah...?", a: "Tangan", w: ["Kaki", "Kepala", "Perut"] },
    { q: "Bagian tubuh yang kita gunakan untuk tersenyum adalah...?", a: "Mulut", w: ["Kaki", "Tangan", "Perut"] },
    { q: "Kuku biasanya tumbuh di ujung...?", a: "Jari", w: ["Kepala", "Perut", "Punggung"] },
    { q: "Bagian tubuh yang paling atas adalah...?", a: "Kepala", w: ["Kaki", "Tangan", "Perut"] },
    { q: "Bagian tubuh yang paling bawah adalah...?", a: "Kaki", w: ["Kepala", "Tangan", "Perut"] },
    { q: "Alis dan bulu mata melindungi bagian...?", a: "Mata", w: ["Telinga", "Hidung", "Mulut"] },
    { q: "Bagian tubuh yang berdenyut dan memompa darah adalah...?", a: "Jantung", w: ["Perut", "Paru-paru", "Kepala"] },
    { q: "Otak kita berada di dalam bagian...?", a: "Kepala", w: ["Perut", "Dada", "Kaki"] },
    { q: "Kita menggunakan siku untuk menekuk...?", a: "Lengan", w: ["Kaki", "Kepala", "Perut"] },
    { q: "Kita menggunakan lutut untuk menekuk...?", a: "Kaki", w: ["Lengan", "Kepala", "Perut"] },
    { q: "Bahu adalah bagian tubuh yang letaknya dekat...?", a: "Leher", w: ["Kaki", "Perut", "Kepala"] },
    { q: "Punggung adalah bagian tubuh yang letaknya di...?", a: "Belakang tubuh", w: ["Depan tubuh", "Kepala", "Kaki"] },
    { q: "Telinga kita ada dua, letaknya di...?", a: "Kanan dan kiri kepala", w: ["Kaki", "Perut", "Tangan"] },
    { q: "Mata kita ada dua, gunanya untuk...?", a: "Melihat", w: ["Mendengar", "Mencium", "Merasakan"] },
    { q: "Bagian tubuh yang kita gunakan untuk mencubit dengan lembut adalah...?", a: "Jari", w: ["Kaki", "Kepala", "Punggung"] }
  ];

  const naturalColors: FactItem[] = [
    { q: "Warna langit yang cerah pada siang hari adalah...?", a: "Biru", w: ["Merah", "Hitam", "Ungu"] },
    { q: "Warna daun pada umumnya adalah...?", a: "Hijau", w: ["Merah", "Biru", "Hitam"] },
    { q: "Warna matahari yang kita lihat adalah...?", a: "Kuning", w: ["Hijau", "Biru", "Hitam"] },
    { q: "Warna awan pada umumnya adalah...?", a: "Putih", w: ["Merah", "Hitam", "Ungu"] },
    { q: "Warna rumput adalah...?", a: "Hijau", w: ["Kuning", "Biru", "Merah"] },
    { q: "Warna pisang yang sudah matang adalah...?", a: "Kuning", w: ["Hijau", "Merah", "Biru"] },
    { q: "Warna apel yang matang biasanya adalah...?", a: "Merah", w: ["Biru", "Hitam", "Ungu"] },
    { q: "Warna langit pada malam hari adalah...?", a: "Hitam / Gelap", w: ["Biru terang", "Kuning", "Putih"] },
    { q: "Warna salju adalah...?", a: "Putih", w: ["Hitam", "Merah", "Hijau"] },
    { q: "Warna tanah pada umumnya adalah...?", a: "Coklat", w: ["Biru", "Hijau muda", "Ungu"] },
    { q: "Warna air laut yang jernih biasanya terlihat...?", a: "Biru", w: ["Merah", "Kuning", "Hitam"] },
    { q: "Warna jeruk yang matang adalah...?", a: "Oranye", w: ["Biru", "Hitam", "Ungu"] },
    { q: "Warna bunga mawar yang paling umum adalah...?", a: "Merah", w: ["Biru", "Hitam", "Coklat"] },
    { q: "Warna arang atau batu bara adalah...?", a: "Hitam", w: ["Putih", "Kuning", "Merah"] },
    { q: "Warna susu adalah...?", a: "Putih", w: ["Coklat", "Hitam", "Biru"] },
    { q: "Warna stroberi yang matang adalah...?", a: "Merah", w: ["Hijau", "Kuning", "Biru"] },
    { q: "Warna terong pada umumnya adalah...?", a: "Ungu", w: ["Merah", "Kuning", "Putih"] },
    { q: "Warna wortel adalah...?", a: "Oranye", w: ["Hijau", "Biru", "Hitam"] },
    { q: "Warna daun bayam adalah...?", a: "Hijau", w: ["Merah", "Kuning", "Ungu"] },
    { q: "Warna pasir pantai pada umumnya adalah...?", a: "Kuning kecoklatan", w: ["Hitam pekat", "Biru", "Ungu"] }
  ];

  const dayNight: FactItem[] = [
    { q: "Saat matahari bersinar terang, itu tandanya sedang...?", a: "Siang hari", w: ["Malam hari", "Hujan", "Mendung"] },
    { q: "Saat langit gelap dan ada bulan, itu tandanya sedang...?", a: "Malam hari", w: ["Siang hari", "Pagi", "Sore"] },
    { q: "Bintang-bintang terlihat di langit pada waktu...?", a: "Malam hari", w: ["Siang hari", "Pagi hari", "Sore hari"] },
    { q: "Kita biasanya tidur pada waktu...?", a: "Malam hari", w: ["Siang hari", "Tengah hari", "Sore hari"] },
    { q: "Kita biasanya bermain di luar rumah saat...?", a: "Siang hari", w: ["Tengah malam", "Larut malam", "Dini hari"] },
    { q: "Matahari terbit di pagi hari dari arah...?", a: "Timur", w: ["Barat", "Utara", "Selatan"] },
    { q: "Matahari terbenam di sore hari ke arah...?", a: "Barat", w: ["Timur", "Utara", "Selatan"] },
    { q: "Saat siang hari, bayangan kita muncul karena ada...?", a: "Sinar matahari", w: ["Sinar bulan", "Hujan", "Angin"] },
    { q: "Bulan biasanya muncul di langit pada waktu...?", a: "Malam hari", w: ["Siang hari", "Tengah hari", "Pagi terik"] },
    { q: "Ayam berkokok menandakan datangnya waktu...?", a: "Pagi hari", w: ["Malam hari", "Tengah malam", "Sore gelap"] },
    { q: "Waktu setelah malam berakhir dan matahari mulai terbit disebut...?", a: "Pagi hari", w: ["Sore hari", "Tengah malam", "Siang terik"] },
    { q: "Waktu setelah siang menjelang matahari terbenam disebut...?", a: "Sore hari", w: ["Pagi hari", "Tengah malam", "Dini hari"] },
    { q: "Saat gelap dan kita perlu lampu untuk melihat, itu waktu...?", a: "Malam hari", w: ["Siang terik", "Pagi cerah", "Tengah hari"] },
    { q: "Anak-anak biasanya berangkat ke sekolah pada waktu...?", a: "Pagi hari", w: ["Tengah malam", "Larut malam", "Dini hari gelap"] },
    { q: "Saat udara terasa sangat panas dan matahari tinggi di atas kepala, itu waktu...?", a: "Tengah hari", w: ["Malam hari", "Dini hari", "Senja gelap"] },
    { q: "Kita biasanya makan malam pada waktu...?", a: "Malam hari", w: ["Pagi hari", "Tengah hari terik", "Dini hari"] },
    { q: "Kita biasanya sarapan pada waktu...?", a: "Pagi hari", w: ["Malam hari", "Tengah malam", "Sore gelap"] },
    { q: "Saat matahari sudah tidak terlihat dan langit menjadi gelap disebut...?", a: "Malam hari", w: ["Siang hari", "Pagi hari", "Tengah hari"] },
    { q: "Matahari memberi kita cahaya dan...?", a: "Kehangatan", w: ["Kegelapan", "Hujan", "Angin dingin"] },
    { q: "Saat cuaca cerah tanpa awan di siang hari, langit terlihat berwarna...?", a: "Biru cerah", w: ["Hitam gelap", "Merah", "Ungu"] },
    { q: "Kita menyalakan lampu di rumah biasanya saat...?", a: "Malam hari", w: ["Siang terik", "Pagi cerah", "Tengah hari"] },
    { q: "Setelah bangun tidur di pagi hari, langit biasanya mulai terlihat...?", a: "Terang", w: ["Gelap gulita", "Hitam pekat", "Sangat gelap"] },
    { q: "Bulan sabit adalah salah satu bentuk yang dimiliki...?", a: "Bulan", w: ["Matahari", "Bintang", "Awan"] },
    { q: "Burung-burung biasanya kembali ke sarangnya pada waktu...?", a: "Sore atau malam hari", w: ["Pagi hari", "Tengah hari terik", "Siang terik"] },
    { q: "Bintang jatuh biasanya terlihat pada waktu...?", a: "Malam hari", w: ["Siang hari", "Pagi hari", "Tengah hari"] }
  ];

  return [
    ...buildFromFacts(animalTraits, "SCI_PS1", "Preschool 1 (2 thn)", "Sains", 0),
    ...buildFromFacts(bodyParts, "SCI_PS1", "Preschool 1 (2 thn)", "Sains", 30),
    ...buildFromFacts(naturalColors, "SCI_PS1", "Preschool 1 (2 thn)", "Sains", 55),
    ...buildFromFacts(dayNight, "SCI_PS1", "Preschool 1 (2 thn)", "Sains", 75)
  ];
}

// Generate Sains Preschool 2 (3 tahun) — 100 questions
// Scope: animal habitats/babies, five senses in slightly more depth, simple
// weather, and basic plant part naming.
function generateSciencePreschool2(): Question[] {
  const animalFamily: FactItem[] = [
    { q: "Anak sapi disebut...?", a: "Pedet", w: ["Anak kucing", "Anak ayam", "Anak bebek"] },
    { q: "Anak kucing disebut...?", a: "Kitten / Anak kucing", w: ["Pedet", "Anak ayam", "Kecebong"] },
    { q: "Anak ayam disebut...?", a: "Anak ayam", w: ["Pedet", "Berudu", "Kitten"] },
    { q: "Anak anjing disebut...?", a: "Anak anjing", w: ["Pedet", "Anak ayam", "Berudu"] },
    { q: "Hewan yang tinggal di dalam air seperti sungai atau laut disebut hewan...?", a: "Air", w: ["Darat", "Udara", "Gurun"] },
    { q: "Hewan yang tinggal di daratan seperti sapi dan kambing disebut hewan...?", a: "Darat", w: ["Air", "Udara", "Laut dalam"] },
    { q: "Burung membuat rumah untuk telurnya yang disebut...?", a: "Sarang", w: ["Kandang", "Kolam", "Gua"] },
    { q: "Lebah tinggal bersama-sama di dalam...?", a: "Sarang lebah", w: ["Kandang sapi", "Kolam ikan", "Gua"] },
    { q: "Ikan hidup dan berenang di dalam...?", a: "Air", w: ["Udara", "Tanah kering", "Pasir"] },
    { q: "Cacing biasanya tinggal di dalam...?", a: "Tanah", w: ["Air laut", "Udara", "Pohon tinggi"] },
    { q: "Hewan peliharaan di rumah yang biasa dikandangkan bersama-sama disebut kumpulan...?", a: "Ternak", w: ["Ikan hias", "Burung liar", "Serangga"] },
    { q: "Semut biasanya tinggal berkelompok di dalam...?", a: "Sarang semut", w: ["Kolam", "Sangkar", "Kandang"] },
    { q: "Ular sering ditemukan tinggal di...?", a: "Semak-semak atau lubang tanah", w: ["Air laut dalam", "Sarang burung", "Kolam ikan"] },
    { q: "Hewan yang hidup di dua alam yaitu darat dan air disebut hewan...?", a: "Amfibi", w: ["Mamalia saja", "Unggas saja", "Serangga saja"] },
    { q: "Katak adalah contoh hewan...?", a: "Amfibi", w: ["Mamalia", "Unggas", "Ikan"] },
    { q: "Anak kambing disebut...?", a: "Cempe", w: ["Pedet", "Anak ayam", "Kecebong"] },
    { q: "Anak kuda disebut...?", a: "Anak kuda", w: ["Pedet", "Cempe", "Kecebong"] },
    { q: "Anak katak yang baru menetas dan hidup di air disebut...?", a: "Kecebong / Berudu", w: ["Pedet", "Cempe", "Anak ayam"] },
    { q: "Hewan yang bisa hidup di udara dengan cara terbang disebut hewan...?", a: "Udara", w: ["Darat", "Air", "Bawah tanah"] },
    { q: "Kelinci biasanya tinggal di dalam...?", a: "Lubang atau kandang", w: ["Sarang burung", "Air laut", "Sarang lebah"] },
    { q: "Kupu-kupu biasanya hinggap di atas...?", a: "Bunga", w: ["Batu besar", "Air laut", "Tanah kering"] },
    { q: "Ikan bernapas menggunakan...?", a: "Insang", w: ["Paru-paru", "Hidung", "Kulit"] },
    { q: "Burung terbang menggunakan...?", a: "Sayap", w: ["Sirip", "Insang", "Cangkang"] },
    { q: "Hewan yang berkembang biak dengan bertelur disebut hewan...?", a: "Ovipar", w: ["Vivipar", "Amfibi saja", "Mamalia saja"] },
    { q: "Sapi dan kambing berkembang biak dengan cara...?", a: "Melahirkan", w: ["Bertelur", "Membelah diri", "Bertunas"] },
    { q: "Kucing biasanya tidur paling banyak di waktu...?", a: "Siang dan malam hari", w: ["Hanya siang hari", "Hanya sore hari", "Tidak pernah tidur"] },
    { q: "Sarang burung biasanya dibuat dari...?", a: "Ranting dan daun kering", w: ["Batu besar", "Kaca", "Besi"] },
    { q: "Semut termasuk hewan yang hidup secara...?", a: "Berkelompok", w: ["Sendirian selalu", "Di dalam air", "Di udara"] },
    { q: "Kupu-kupu sebelumnya berbentuk ulat yang berubah di dalam...?", a: "Kepompong", w: ["Sarang burung", "Kolam ikan", "Sarang lebah"] },
    { q: "Bebek suka berenang karena kakinya memiliki...?", a: "Selaput", w: ["Sirip", "Cangkang", "Insang"] }
  ];

  const senses: FactItem[] = [
    { q: "Kita menggunakan mata untuk melihat warna dan bentuk...?", a: "Benda", w: ["Suara", "Bau", "Rasa"] },
    { q: "Kita menggunakan telinga untuk mendengar...?", a: "Suara", w: ["Warna", "Bau", "Rasa"] },
    { q: "Kita menggunakan hidung untuk mencium...?", a: "Bau", w: ["Suara", "Warna", "Rasa"] },
    { q: "Kita menggunakan lidah untuk merasakan...?", a: "Rasa makanan", w: ["Suara", "Warna", "Bau"] },
    { q: "Kita menggunakan kulit untuk meraba dan merasakan...?", a: "Tekstur benda", w: ["Warna benda", "Suara", "Bau"] },
    { q: "Panca indra kita berjumlah...?", a: "5", w: ["3", "4", "6"] },
    { q: "Saat mencicipi gula, lidah kita akan merasakan rasa...?", a: "Manis", w: ["Asin", "Pahit", "Asam"] },
    { q: "Saat mencicipi garam, lidah kita akan merasakan rasa...?", a: "Asin", w: ["Manis", "Pahit", "Asam"] },
    { q: "Saat mencicipi jeruk nipis, lidah kita akan merasakan rasa...?", a: "Asam", w: ["Manis", "Asin", "Pahit"] },
    { q: "Kulit kita dapat merasakan sesuatu itu terasa panas atau...?", a: "Dingin", w: ["Manis", "Berwarna", "Berbau"] },
    { q: "Saat mendengar musik, indra yang kita gunakan adalah...?", a: "Telinga", w: ["Mata", "Hidung", "Lidah"] },
    { q: "Saat mencium aroma bunga, indra yang kita gunakan adalah...?", a: "Hidung", w: ["Mata", "Telinga", "Lidah"] },
    { q: "Saat melihat pelangi yang berwarna-warni, indra yang kita gunakan adalah...?", a: "Mata", w: ["Telinga", "Hidung", "Lidah"] },
    { q: "Meraba permukaan yang kasar dan halus menggunakan indra...?", a: "Kulit", w: ["Mata", "Telinga", "Hidung"] },
    { q: "Mencicipi makanan pedas menggunakan indra...?", a: "Lidah", w: ["Mata", "Telinga", "Hidung"] },
    { q: "Kacamata kita pakai untuk membantu indra...?", a: "Penglihatan / Mata", w: ["Pendengaran", "Penciuman", "Perabaan"] },
    { q: "Saat mendengar suara petir yang keras, indra yang bekerja adalah...?", a: "Telinga", w: ["Mata", "Lidah", "Kulit"] },
    { q: "Saat kita memegang es batu, kulit kita akan merasakan...?", a: "Dingin", w: ["Panas", "Manis", "Berwarna"] },
    { q: "Saat kita memegang air panas, kulit kita akan merasakan...?", a: "Panas", w: ["Dingin", "Asam", "Berbau"] },
    { q: "Mencium bau harum masakan menggunakan indra...?", a: "Hidung", w: ["Mata", "Telinga", "Lidah"] },
    { q: "Melihat bentuk bulan di langit malam menggunakan indra...?", a: "Mata", w: ["Telinga", "Hidung", "Lidah"] },
    { q: "Mendengarkan lagu favorit menggunakan indra...?", a: "Telinga", w: ["Mata", "Hidung", "Lidah"] },
    { q: "Merasakan permukaan kain yang lembut menggunakan indra...?", a: "Kulit", w: ["Mata", "Telinga", "Lidah"] },
    { q: "Mencicipi rasa pahit obat menggunakan indra...?", a: "Lidah", w: ["Mata", "Telinga", "Hidung"] },
    { q: "Melihat teman melambaikan tangan dari jauh menggunakan indra...?", a: "Mata", w: ["Telinga", "Hidung", "Lidah"] }
  ];

  const weather: FactItem[] = [
    { q: "Saat titik-titik air jatuh dari langit, cuaca disebut...?", a: "Hujan", w: ["Cerah", "Berawan", "Berangin"] },
    { q: "Saat langit cerah dan matahari bersinar terang, cuaca disebut...?", a: "Cerah", w: ["Hujan", "Berawan", "Badai"] },
    { q: "Saat langit dipenuhi awan tebal berwarna abu-abu, cuaca disebut...?", a: "Mendung / Berawan", w: ["Cerah", "Panas terik", "Kemarau"] },
    { q: "Saat angin bertiup sangat kencang, cuaca disebut...?", a: "Berangin", w: ["Cerah tenang", "Hujan gerimis", "Berawan tipis"] },
    { q: "Saat cuaca sangat panas dan jarang hujan dalam waktu lama disebut musim...?", a: "Kemarau", w: ["Hujan", "Semi", "Salju"] },
    { q: "Saat sering turun hujan dalam waktu lama disebut musim...?", a: "Hujan", w: ["Kemarau", "Panas", "Kering"] },
    { q: "Setelah hujan reda dan matahari bersinar, kadang muncul lengkungan warna-warni yang disebut...?", a: "Pelangi", w: ["Petir", "Awan hitam", "Kabut"] },
    { q: "Suara menggelegar yang terdengar saat hujan deras disebut...?", a: "Petir / Guntur", w: ["Angin sepoi", "Pelangi", "Embun"] },
    { q: "Payung kita gunakan saat cuaca sedang...?", a: "Hujan", w: ["Cerah panas", "Berangin sejuk", "Malam terang"] },
    { q: "Topi dan kacamata hitam sering dipakai saat cuaca sedang...?", a: "Panas terik", w: ["Hujan deras", "Mendung gelap", "Badai"] },
    { q: "Titik-titik air kecil di rumput pada pagi hari disebut...?", a: "Embun", w: ["Hujan", "Salju", "Petir"] },
    { q: "Uap air tipis di udara yang membuat pandangan menjadi buram disebut...?", a: "Kabut", w: ["Pelangi", "Petir", "Angin"] },
    { q: "Cuaca yang membuat kita perlu memakai jaket tebal biasanya adalah cuaca...?", a: "Dingin", w: ["Panas terik", "Sangat gerah", "Sangat lembab"] },
    { q: "Saat hujan sangat deras disertai angin kencang disebut...?", a: "Badai", w: ["Cerah tenang", "Gerimis kecil", "Kemarau"] },
    { q: "Hujan yang turunnya sangat kecil dan pelan disebut...?", a: "Gerimis", w: ["Badai", "Kemarau", "Kabut tebal"] },
    { q: "Awan yang berwarna hitam pekat biasanya menandakan akan turun...?", a: "Hujan deras", w: ["Cuaca cerah", "Salju", "Kemarau panjang"] },
    { q: "Baju hangat dan sarung tangan kita pakai saat cuaca...?", a: "Dingin", w: ["Panas terik", "Sangat gerah", "Sangat lembab"] },
    { q: "Genangan air di jalan biasanya muncul setelah...?", a: "Hujan deras", w: ["Cuaca sangat panas", "Angin kencang saja", "Kemarau panjang"] },
    { q: "Sungai dan sawah membutuhkan air dari...?", a: "Hujan", w: ["Salju", "Angin", "Petir"] },
    { q: "Petani biasanya menanam padi saat musim...?", a: "Hujan", w: ["Kemarau kering", "Salju turun", "Badai pasir"] },
    { q: "Saat langit sangat cerah tanpa awan sedikit pun disebut cuaca...?", a: "Cerah sekali", w: ["Sangat mendung", "Hujan lebat", "Badai besar"] },
    { q: "Kipas angin membantu kita saat cuaca terasa...?", a: "Panas / Gerah", w: ["Sangat dingin", "Hujan deras", "Bersalju"] },
    { q: "Jas hujan kita pakai untuk melindungi tubuh dari...?", a: "Air hujan", w: ["Sinar matahari", "Angin sejuk", "Debu"] },
    { q: "Musim yang sangat kering dan jarang hujan membuat tanah menjadi...?", a: "Kering dan retak", w: ["Basah dan becek", "Bersalju", "Tergenang air"] },
    { q: "Anak-anak biasanya senang bermain hujan-hujanan saat cuaca...?", a: "Hujan ringan", w: ["Panas terik", "Badai besar", "Sangat dingin bersalju"] }
  ];

  const plantParts: FactItem[] = [
    { q: "Bagian tumbuhan yang ada di dalam tanah dan menyerap air disebut...?", a: "Akar", w: ["Daun", "Bunga", "Buah"] },
    { q: "Bagian tumbuhan yang tegak dan menopang daun disebut...?", a: "Batang", w: ["Akar", "Bunga", "Buah"] },
    { q: "Bagian tumbuhan yang berwarna hijau dan lebar untuk menangkap sinar matahari disebut...?", a: "Daun", w: ["Akar", "Batang", "Biji"] },
    { q: "Bagian tumbuhan yang berwarna-warni dan harum, sering dijadikan hiasan disebut...?", a: "Bunga", w: ["Akar", "Batang", "Daun"] },
    { q: "Bagian tumbuhan yang bisa kita makan seperti apel dan jeruk disebut...?", a: "Buah", w: ["Akar", "Batang", "Bunga"] },
    { q: "Bagian kecil di dalam buah yang bisa ditanam untuk tumbuh menjadi tanaman baru disebut...?", a: "Biji", w: ["Daun", "Bunga", "Batang"] },
    { q: "Tumbuhan membutuhkan air, tanah, dan sinar matahari untuk bisa...?", a: "Tumbuh", w: ["Berhenti hidup", "Membeku", "Menghilang"] },
    { q: "Kita menyiram tanaman menggunakan...?", a: "Air", w: ["Pasir", "Batu", "Minyak"] },
    { q: "Pohon yang sangat besar dan tinggi biasanya memiliki batang yang...?", a: "Keras dan kokoh", w: ["Lunak dan lembek", "Berair seperti bunga", "Transparan"] },
    { q: "Bunga sering dikunjungi oleh lebah karena bunga memiliki...?", a: "Madu / Nektar", w: ["Duri tajam", "Bau busuk", "Warna hitam"] },
    { q: "Tumbuhan yang tidak disiram air dalam waktu lama biasanya akan...?", a: "Layu", w: ["Tumbuh lebih cepat", "Berbunga lebih banyak", "Berubah warna jadi emas"] },
    { q: "Akar tumbuhan juga berfungsi untuk...?", a: "Menahan tumbuhan agar tidak roboh", w: ["Menangkap sinar matahari", "Membuat bunga", "Menghasilkan bau harum"] },
    { q: "Pohon kelapa termasuk tumbuhan yang tumbuh tinggi dengan batang yang...?", a: "Keras", w: ["Sangat lembek", "Transparan", "Berduri di seluruh batang"] },
    { q: "Tumbuhan kaktus dapat hidup di tempat yang sangat...?", a: "Kering", w: ["Basah selalu", "Bersalju", "Sangat dingin"] },
    { q: "Rumput termasuk tumbuhan yang biasanya tumbuh...?", a: "Pendek dan menutupi tanah", w: ["Sangat tinggi seperti pohon", "Di dalam air laut", "Tanpa akar"] },
    { q: "Daun yang berwarna hijau membantu tumbuhan membuat makanannya sendiri dengan bantuan...?", a: "Sinar matahari", w: ["Sinar bulan", "Angin malam", "Salju"] },
    { q: "Setelah bunga layu, pada tumbuhan tertentu akan muncul...?", a: "Buah", w: ["Akar baru", "Batang baru", "Daun kering saja"] },
    { q: "Tanaman yang kita tanam di dalam pot biasanya diletakkan agar mendapat cukup...?", a: "Sinar matahari", w: ["Kegelapan total", "Air laut", "Salju"] },
    { q: "Pohon besar di hutan membantu menghasilkan udara yang segar berupa...?", a: "Oksigen", w: ["Asap", "Karbon monoksida", "Debu"] },
    { q: "Tumbuhan yang mendapat cukup sinar matahari dan air akan tumbuh...?", a: "Subur", w: ["Layu dan kering", "Berubah warna hitam", "Berhenti tumbuh"] }
  ];

  return [
    ...buildFromFacts(animalFamily, "SCI_PS2", "Preschool 2 (3 thn)", "Sains", 0),
    ...buildFromFacts(senses, "SCI_PS2", "Preschool 2 (3 thn)", "Sains", 30),
    ...buildFromFacts(weather, "SCI_PS2", "Preschool 2 (3 thn)", "Sains", 55),
    ...buildFromFacts(plantParts, "SCI_PS2", "Preschool 2 (3 thn)", "Sains", 80)
  ];
}

// Generate Sains SD Kelas 1 (7 tahun) — 100 questions
// Scope: living vs non-living things, plant parts & function, simple animal
// diet classification, weather/seasons in Indonesia, healthy habits.
function generateScienceSD1(): Question[] {
  const livingNonLiving: FactItem[] = [
    { q: "Benda yang bisa tumbuh, bernapas, dan berkembang biak disebut makhluk...?", a: "Hidup", w: ["Mati", "Buatan", "Keras"] },
    { q: "Batu adalah contoh benda...?", a: "Mati / Tak hidup", w: ["Hidup", "Bernapas", "Tumbuh"] },
    { q: "Pohon mangga termasuk makhluk...?", a: "Hidup", w: ["Mati", "Buatan", "Tidak bernapas"] },
    { q: "Kursi kayu termasuk benda...?", a: "Mati / Tak hidup", w: ["Hidup", "Bernapas", "Berkembang biak"] },
    { q: "Ciri-ciri makhluk hidup salah satunya adalah dapat...?", a: "Bergerak dan bernapas", w: ["Diam selamanya", "Tidak butuh makanan", "Tidak pernah tumbuh"] },
    { q: "Manusia, hewan, dan tumbuhan termasuk golongan makhluk...?", a: "Hidup", w: ["Mati", "Buatan pabrik", "Tidak bernapas"] },
    { q: "Awan dan air termasuk benda...?", a: "Tak hidup", w: ["Hidup", "Bernapas", "Berkembang biak"] },
    { q: "Makhluk hidup membutuhkan makanan untuk...?", a: "Tumbuh dan bertenaga", w: ["Menjadi batu", "Berhenti bernapas", "Menjadi benda mati"] },
    { q: "Ciri makhluk hidup yang membedakannya dari benda mati adalah dapat...?", a: "Berkembang biak", w: ["Berbentuk kotak", "Berwarna cerah", "Bisa dipegang"] },
    { q: "Sepeda adalah contoh benda...?", a: "Buatan manusia dan tak hidup", w: ["Hidup", "Bernapas", "Bisa tumbuh"] },
    { q: "Semua makhluk hidup pasti membutuhkan...?", a: "Udara untuk bernapas", w: ["Listrik", "Cat warna", "Roda"] },
    { q: "Rumput yang tumbuh di halaman termasuk makhluk...?", a: "Hidup", w: ["Mati", "Buatan", "Tidak bernapas"] },
    { q: "Meja dan lemari termasuk benda...?", a: "Tak hidup", w: ["Hidup", "Bernapas", "Tumbuh"] },
    { q: "Semut yang berjalan di tanah termasuk makhluk...?", a: "Hidup", w: ["Mati", "Buatan", "Tidak bergerak"] },
    { q: "Salah satu ciri makhluk hidup adalah peka terhadap...?", a: "Rangsangan", w: ["Warna cat", "Bentuk kotak", "Berat benda"] },
    { q: "Boneka mainan meskipun berbentuk seperti hewan tetap termasuk benda...?", a: "Tak hidup", w: ["Hidup", "Bernapas", "Bisa makan"] },
    { q: "Ikan yang berenang di akuarium termasuk makhluk...?", a: "Hidup", w: ["Mati", "Buatan", "Tidak bernapas"] },
    { q: "Air sungai yang mengalir termasuk benda...?", a: "Tak hidup", w: ["Hidup", "Bernapas", "Berkembang biak"] },
    { q: "Bunga yang mekar di taman termasuk makhluk...?", a: "Hidup", w: ["Mati", "Buatan", "Tidak tumbuh"] },
    { q: "Ciri makhluk hidup yang membuatnya membutuhkan makanan disebut...?", a: "Nutrisi", w: ["Warna", "Berat", "Bentuk"] }
  ];

  const plantFunctions: FactItem[] = [
    { q: "Akar berfungsi untuk menyerap air dan zat hara dari dalam...?", a: "Tanah", w: ["Udara", "Batu", "Awan"] },
    { q: "Batang berfungsi untuk mengangkut air dari akar menuju...?", a: "Daun", w: ["Tanah", "Udara", "Akar lain"] },
    { q: "Daun berfungsi sebagai tempat tumbuhan membuat makanannya melalui proses...?", a: "Fotosintesis", w: ["Respirasi hewan", "Pencernaan", "Pembekuan"] },
    { q: "Bunga berfungsi sebagai alat...?", a: "Perkembangbiakan tumbuhan", w: ["Menyerap air", "Bernapas untuk hewan", "Menyimpan tanah"] },
    { q: "Buah berfungsi untuk melindungi...?", a: "Biji", w: ["Akar", "Batang", "Daun"] },
    { q: "Biji yang ditanam di tanah subur akan tumbuh menjadi...?", a: "Tumbuhan baru", w: ["Batu", "Air", "Pasir"] },
    { q: "Tumbuhan bernapas melalui lubang kecil di daun yang disebut...?", a: "Stomata", w: ["Akar rambut", "Kelopak", "Kulit batang"] },
    { q: "Akar yang menyebar ke segala arah dan tidak memiliki akar utama disebut akar...?", a: "Serabut", w: ["Tunggang", "Napas", "Gantung"] },
    { q: "Akar yang memiliki satu akar utama besar dengan cabang-cabang kecil disebut akar...?", a: "Tunggang", w: ["Serabut", "Napas", "Gantung"] },
    { q: "Batang pada pohon besar biasanya berfungsi juga untuk...?", a: "Menopang tubuh tumbuhan agar berdiri tegak", w: ["Menyerap sinar bulan", "Menghasilkan suara", "Menarik hewan buas"] },
    { q: "Tanaman yang kekurangan sinar matahari biasanya akan tumbuh...?", a: "Lemah dan pucat", w: ["Lebih subur", "Lebih besar", "Berbuah lebih manis"] },
    { q: "Kelopak bunga berfungsi untuk melindungi...?", a: "Bagian dalam bunga saat masih kuncup", w: ["Akar tumbuhan", "Batang pohon", "Biji yang sudah tua"] },
    { q: "Getah pada beberapa tumbuhan berguna untuk...?", a: "Melindungi tumbuhan dari luka atau hama", w: ["Membuat tumbuhan berwarna hitam", "Menghentikan pertumbuhan", "Menarik air hujan"] },
    { q: "Bagian tumbuhan yang tumbuh menembus tanah pertama kali saat biji berkecambah adalah...?", a: "Akar", w: ["Daun", "Bunga", "Buah"] },
    { q: "Tumbuhan memerlukan sinar matahari, air, dan udara untuk melakukan proses...?", a: "Fotosintesis", w: ["Perkaratan", "Pembusukan", "Pembekuan"] },
    { q: "Proses fotosintesis menghasilkan makanan dan gas...?", a: "Oksigen", w: ["Karbon monoksida", "Nitrogen murni", "Asap"] },
    { q: "Tumbuhan yang hidup di air seperti teratai memiliki daun yang...?", a: "Lebar dan mengapung", w: ["Berduri tajam", "Sangat kecil dan tebal", "Tanpa daun sama sekali"] },
    { q: "Cabang kecil yang tumbuh dari batang utama disebut...?", a: "Ranting", w: ["Akar", "Biji", "Kelopak"] },
    { q: "Tumbuhan paku berkembang biak menggunakan...?", a: "Spora", w: ["Biji", "Umbi", "Telur"] },
    { q: "Bagian tumbuhan yang biasa dijadikan bumbu dapur seperti jahe dan kunyit adalah bagian...?", a: "Akar / Rimpang", w: ["Bunga", "Kelopak", "Serbuk sari"] }
  ];

  const animalDiet: FactItem[] = [
    { q: "Hewan pemakan tumbuhan disebut...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Insektivora"] },
    { q: "Hewan pemakan daging disebut...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Frugivora"] },
    { q: "Hewan pemakan segala, baik tumbuhan maupun daging, disebut...?", a: "Omnivora", w: ["Herbivora", "Karnivora", "Insektivora"] },
    { q: "Sapi dan kambing termasuk golongan hewan...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Insektivora"] },
    { q: "Singa dan harimau termasuk golongan hewan...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Frugivora"] },
    { q: "Ayam termasuk golongan hewan...?", a: "Omnivora", w: ["Karnivora murni", "Herbivora murni", "Insektivora murni"] },
    { q: "Kelinci termasuk golongan hewan...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Insektivora"] },
    { q: "Buaya termasuk golongan hewan...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Frugivora"] },
    { q: "Beruang termasuk golongan hewan...?", a: "Omnivora", w: ["Karnivora murni", "Herbivora murni", "Insektivora murni"] },
    { q: "Gajah termasuk golongan hewan...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Insektivora"] },
    { q: "Serigala termasuk golongan hewan...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Frugivora"] },
    { q: "Hewan yang khusus memakan serangga disebut...?", a: "Insektivora", w: ["Herbivora", "Karnivora besar", "Frugivora"] },
    { q: "Trenggiling termasuk golongan hewan...?", a: "Insektivora", w: ["Herbivora", "Karnivora besar", "Frugivora"] },
    { q: "Rusa termasuk golongan hewan...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Insektivora"] },
    { q: "Elang termasuk golongan hewan...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Frugivora"] },
    { q: "Monyet termasuk golongan hewan...?", a: "Omnivora", w: ["Karnivora murni", "Herbivora murni", "Insektivora murni"] },
    { q: "Jerapah termasuk golongan hewan...?", a: "Herbivora", w: ["Karnivora", "Omnivora", "Insektivora"] },
    { q: "Hiu termasuk golongan hewan...?", a: "Karnivora", w: ["Herbivora", "Omnivora", "Frugivora"] },
    { q: "Panda termasuk golongan hewan...?", a: "Herbivora", w: ["Karnivora", "Insektivora", "Frugivora murni"] },
    { q: "Manusia pada umumnya termasuk golongan...?", a: "Omnivora", w: ["Karnivora murni", "Herbivora murni", "Insektivora murni"] }
  ];

  const weatherSeasons: FactItem[] = [
    { q: "Indonesia memiliki dua musim, yaitu musim hujan dan musim...?", a: "Kemarau", w: ["Salju", "Semi", "Gugur"] },
    { q: "Musim kemarau di Indonesia biasanya ditandai dengan cuaca yang...?", a: "Panas dan jarang hujan", w: ["Sangat dingin bersalju", "Sering badai salju", "Selalu mendung tanpa panas"] },
    { q: "Musim hujan di Indonesia biasanya ditandai dengan...?", a: "Sering turun hujan", w: ["Turun salju", "Udara sangat kering", "Tidak ada awan sama sekali"] },
    { q: "Negara yang memiliki empat musim biasanya mengalami musim salju yang disebut musim...?", a: "Dingin", w: ["Kemarau", "Hujan", "Panas saja"] },
    { q: "Petani di Indonesia biasanya menanam padi saat musim...?", a: "Hujan", w: ["Kemarau", "Dingin", "Salju"] },
    { q: "Saat musim kemarau panjang, sungai dan sawah bisa mengalami...?", a: "Kekeringan", w: ["Banjir besar", "Tertutup salju", "Membeku"] },
    { q: "Saat musim hujan dengan curah hujan sangat tinggi, daerah rendah bisa mengalami...?", a: "Banjir", w: ["Kekeringan", "Salju turun", "Kebakaran hutan"] }
  ];

  const healthyHabits: FactItem[] = [
    { q: "Kita perlu mencuci tangan sebelum makan agar terhindar dari...?", a: "Kuman dan penyakit", w: ["Rasa lapar", "Rasa kantuk", "Cuaca dingin"] },
    { q: "Menggosok gigi secara rutin membantu mencegah...?", a: "Gigi berlubang", w: ["Rambut rontok", "Kaki pegal", "Mata rabun"] },
    { q: "Tidur yang cukup penting agar tubuh kita menjadi...?", a: "Sehat dan bertenaga", w: ["Lemas dan lesu", "Mudah sakit", "Cepat lapar saja"] },
    { q: "Makan sayur dan buah setiap hari baik untuk kesehatan karena mengandung...?", a: "Vitamin", w: ["Racun", "Gula berlebih saja", "Minyak berlebih"] },
    { q: "Berolahraga secara rutin membuat tubuh kita menjadi...?", a: "Kuat dan sehat", w: ["Lemah", "Mudah sakit", "Cepat lelah selalu"] },
    { q: "Mandi setiap hari membantu menjaga kebersihan...?", a: "Tubuh dan kulit", w: ["Buku pelajaran", "Mainan saja", "Rumah saja"] },
    { q: "Kita sebaiknya menutup mulut saat batuk atau bersin agar tidak menyebarkan...?", a: "Kuman", w: ["Vitamin", "Udara segar", "Cahaya"] },
    { q: "Memotong kuku secara rutin membantu mencegah kuman bersarang di...?", a: "Bawah kuku", w: ["Rambut", "Gigi", "Mata"] },
    { q: "Istirahat yang cukup setelah bermain membantu tubuh untuk...?", a: "Memulihkan tenaga", w: ["Menjadi lebih lelah", "Menjadi sakit", "Kehilangan nafsu makan"] },
    { q: "Minum air putih yang cukup setiap hari penting untuk menjaga tubuh agar tidak...?", a: "Dehidrasi", w: ["Terlalu kenyang", "Terlalu kuat", "Terlalu tinggi"] }
  ];

  return [
    ...buildFromFacts(livingNonLiving, "SCI_SD1", "SD Kelas 1", "Sains", 0),
    ...buildFromFacts(plantFunctions, "SCI_SD1", "SD Kelas 1", "Sains", 20),
    ...buildFromFacts(animalDiet, "SCI_SD1", "SD Kelas 1", "Sains", 40),
    ...buildFromFacts(weatherSeasons, "SCI_SD1", "SD Kelas 1", "Sains", 60),
    ...buildFromFacts(healthyHabits, "SCI_SD1", "SD Kelas 1", "Sains", 67),
    ...buildFromFacts([
      { q: "Musim kemarau berkepanjangan dapat menyebabkan tumbuhan menjadi...?", a: "Layu dan kering", w: ["Lebih subur", "Berbunga lebat", "Tumbuh lebih cepat"] },
      { q: "Awan tebal berwarna gelap di langit biasanya menjadi tanda akan turun...?", a: "Hujan", w: ["Salju", "Angin panas", "Cuaca cerah sepanjang hari"] },
      { q: "Baju yang tebal dan hangat lebih cocok dipakai saat cuaca...?", a: "Dingin", w: ["Sangat panas", "Lembab hangat", "Berangin sejuk saja"] },
      { q: "Selama musim hujan, jalanan yang tidak beraspal dengan baik bisa menjadi...?", a: "Becek dan licin", w: ["Sangat kering", "Berdebu", "Bersalju"] },
      { q: "Cuaca yang sangat panas membuat tubuh kita lebih cepat...?", a: "Berkeringat", w: ["Menggigil kedinginan", "Mengantuk saja", "Kelaparan saja"] },
      { q: "Nelayan biasanya menghindari melaut saat cuaca sedang...?", a: "Badai", w: ["Cerah tenang", "Sedikit berawan", "Hangat sejuk"] },
      { q: "Tanaman padi membutuhkan banyak air, sehingga cocok ditanam saat musim...?", a: "Hujan", w: ["Kemarau", "Dingin bersalju", "Gugur daun"] },
      { q: "Sayur bayam banyak mengandung zat besi yang baik untuk...?", a: "Kesehatan tubuh", w: ["Merusak gigi", "Membuat mengantuk", "Menyebabkan sakit perut"] },
      { q: "Kita sebaiknya makan tiga kali sehari dengan porsi...?", a: "Seimbang dan cukup", w: ["Sangat banyak sekaligus", "Sangat sedikit", "Hanya sekali seminggu"] },
      { q: "Susu banyak mengandung kalsium yang baik untuk pertumbuhan...?", a: "Tulang dan gigi", w: ["Rambut saja", "Mata saja", "Kuku saja"] },
      { q: "Berjemur di pagi hari yang sebentar dapat membantu tubuh mendapatkan vitamin...?", a: "D", w: ["A", "B", "C"] },
      { q: "Buah jeruk banyak mengandung vitamin...?", a: "C", w: ["D", "K", "B12"] },
      { q: "Kebiasaan begadang terus-menerus dapat membuat tubuh menjadi...?", a: "Mudah sakit dan lelah", w: ["Lebih sehat", "Lebih kuat", "Lebih tinggi"] },
      { q: "Menjaga kebersihan lingkungan rumah membantu mencegah datangnya...?", a: "Penyakit dan hama", w: ["Udara segar", "Sinar matahari", "Tanaman subur"] },
      { q: "Sampah sebaiknya dibuang pada...?", a: "Tempat sampah", w: ["Sungai", "Halaman rumah", "Selokan"] },
      { q: "Menutup makanan dengan tudung saji berguna untuk mencegah hinggapnya...?", a: "Lalat dan serangga", w: ["Cahaya matahari", "Udara segar", "Suara bising"] },
      { q: "Bermain di luar rumah pada sore hari yang sejuk baik untuk kesehatan karena kita mendapat...?", a: "Udara segar dan olahraga", w: ["Debu berlebih", "Panas berlebih", "Kegelapan"] },
      { q: "Vaksinasi atau imunisasi berguna untuk melindungi tubuh dari...?", a: "Penyakit tertentu", w: ["Rasa lapar", "Rasa kantuk", "Cuaca dingin"] },
      { q: "Kebiasaan menggigit kuku sebaiknya dihindari karena dapat memasukkan...?", a: "Kuman ke dalam mulut", w: ["Vitamin ke dalam tubuh", "Udara segar", "Cahaya"] },
      { q: "Menggunakan masker saat sakit flu membantu mencegah penyebaran...?", a: "Kuman ke orang lain", w: ["Udara segar", "Sinar matahari", "Air bersih"] },
      { q: "Sarapan pagi penting agar tubuh memiliki cukup...?", a: "Tenaga untuk beraktivitas", w: ["Rasa kantuk", "Rasa pusing", "Rasa haus saja"] },
      { q: "Menjaga jarak dan mencuci tangan membantu mencegah penyebaran...?", a: "Penyakit menular", w: ["Udara segar", "Sinar matahari", "Air hujan"] },
      { q: "Anak-anak sebaiknya bermain di luar rumah pada waktu pagi atau sore agar terhindar dari...?", a: "Terik matahari yang berlebihan", w: ["Udara segar", "Olahraga", "Sinar matahari pagi"] }
    ], "SCI_SD1", "SD Kelas 1", "Sains", 77)
  ];
}

// Generate Sains SD Kelas 2 (8 tahun) — 100 questions
// Scope: complete vs incomplete metamorphosis, what plants need to grow,
// animal habitats, basic states of matter, five senses in more depth.
function generateScienceSD2(): Question[] {
  const metamorphosis: FactItem[] = [
    { q: "Urutan daur hidup kupu-kupu yang benar adalah telur - ulat - kepompong -...?", a: "Kupu-kupu", w: ["Telur lagi", "Ulat lagi", "Kecebong"] },
    { q: "Perubahan bentuk pada hewan seperti kupu-kupu dari telur hingga dewasa disebut...?", a: "Metamorfosis", w: ["Fotosintesis", "Respirasi", "Adaptasi"] },
    { q: "Metamorfosis kupu-kupu termasuk jenis metamorfosis...?", a: "Sempurna", w: ["Tidak sempurna", "Tanpa perubahan", "Setengah sempurna saja"] },
    { q: "Urutan daur hidup katak yang benar adalah telur - berudu -...?", a: "Katak dewasa", w: ["Ulat", "Kepompong", "Kupu-kupu"] },
    { q: "Metamorfosis pada belalang termasuk jenis metamorfosis...?", a: "Tidak sempurna", w: ["Sempurna", "Tanpa telur", "Tanpa perubahan sama sekali"] },
    { q: "Perbedaan utama metamorfosis sempurna dan tidak sempurna adalah ada atau tidaknya tahap...?", a: "Kepompong", w: ["Telur", "Dewasa", "Makan"] },
    { q: "Nyamuk mengalami metamorfosis sempurna dengan urutan telur - jentik -...?", a: "Kepompong - nyamuk dewasa", w: ["Ulat - kupu-kupu", "Berudu - katak", "Anak ayam - ayam dewasa"] },
    { q: "Hewan yang mengalami metamorfosis tidak sempurna biasanya sudah menyerupai bentuk...?", a: "Induknya sejak menetas", w: ["Kepompong sejak lahir", "Telur sepanjang hidupnya", "Tumbuhan"] },
    { q: "Capung termasuk hewan yang mengalami metamorfosis...?", a: "Tidak sempurna", w: ["Sempurna", "Tanpa telur", "Tanpa tahap muda"] },
    { q: "Ulat yang membungkus dirinya sebelum menjadi kupu-kupu disebut fase...?", a: "Kepompong / Pupa", w: ["Nimfa", "Larva air", "Berudu"] },
    { q: "Ayam tidak mengalami metamorfosis karena anak ayam yang menetas sudah menyerupai bentuk...?", a: "Induknya", w: ["Ulat", "Kepompong", "Berudu"] },
    { q: "Kecoa termasuk hewan yang mengalami metamorfosis...?", a: "Tidak sempurna", w: ["Sempurna", "Tanpa telur", "Tanpa fase muda"] },
    { q: "Tahap muda pada metamorfosis tidak sempurna disebut...?", a: "Nimfa", w: ["Larva", "Pupa", "Kepompong"] },
    { q: "Tahap muda pada metamorfosis sempurna sebelum menjadi kepompong disebut...?", a: "Larva", w: ["Nimfa", "Pupa dewasa", "Induk"] },
    { q: "Lalat mengalami jenis metamorfosis...?", a: "Sempurna", w: ["Tidak sempurna", "Tanpa telur", "Tanpa larva"] }
  ];

  const plantNeeds: FactItem[] = [
    { q: "Tumbuhan membutuhkan tiga hal utama untuk tumbuh subur, yaitu air, tanah, dan...?", a: "Sinar matahari", w: ["Sinar bulan", "Angin dingin", "Salju"] },
    { q: "Jika tumbuhan tidak disiram air dalam waktu lama, tumbuhan akan...?", a: "Layu dan mati", w: ["Tumbuh lebih subur", "Berbunga lebih lebat", "Berubah warna emas"] },
    { q: "Tanah yang subur biasanya kaya akan...?", a: "Zat hara / Nutrisi", w: ["Batu-batu besar", "Pasir kering saja", "Garam laut"] },
    { q: "Tumbuhan yang diletakkan di tempat gelap tanpa sinar matahari akan tumbuh...?", a: "Lemah, kurus, dan pucat", w: ["Subur dan hijau", "Cepat berbuah", "Lebih tinggi dan kuat"] },
    { q: "Pupuk diberikan pada tumbuhan untuk menambah...?", a: "Zat hara di dalam tanah", w: ["Air hujan", "Sinar matahari", "Suhu udara"] },
    { q: "Tumbuhan bernapas dengan menyerap gas...?", a: "Karbon dioksida", w: ["Oksigen murni saja", "Nitrogen murni", "Asap kendaraan"] },
    { q: "Akar tumbuhan menyerap air dan zat hara dari...?", a: "Tanah", w: ["Udara", "Batu", "Sinar matahari"] },
    { q: "Petani sering menggemburkan tanah sebelum menanam agar akar tumbuhan mudah...?", a: "Menyerap air dan zat hara", w: ["Terlihat oleh mata", "Berubah warna", "Menghasilkan bunga"] },
    { q: "Tumbuhan yang kekurangan air akan terlihat daunnya menjadi...?", a: "Layu", w: ["Lebih hijau", "Lebih lebar", "Lebih kuat"] },
    { q: "Selain air dan sinar matahari, tumbuhan juga membutuhkan ruang untuk...?", a: "Tumbuh dan berkembang", w: ["Bernapas seperti manusia", "Berbicara", "Berpindah tempat"] },
    { q: "Rumah kaca digunakan petani untuk mengatur suhu dan...?", a: "Kelembapan bagi tanaman", w: ["Warna daun", "Bentuk akar", "Rasa buah saja"] },
    { q: "Tanaman yang ditanam terlalu rapat akan bersaing mendapatkan...?", a: "Sinar matahari, air, dan zat hara", w: ["Warna daun", "Bentuk batang", "Aroma bunga"] },
    { q: "Media tanam selain tanah yang biasa digunakan adalah...?", a: "Sekam atau pasir khusus", w: ["Batu bata utuh", "Besi", "Kaca"] },
    { q: "Tanaman dalam pot perlu disiram secara rutin karena air di dalam pot lebih cepat...?", a: "Menguap dan berkurang", w: ["Bertambah sendiri", "Membeku", "Berubah menjadi tanah"] },
    { q: "Cahaya matahari membantu tumbuhan melakukan proses pembuatan makanan yang disebut...?", a: "Fotosintesis", w: ["Respirasi hewan", "Pencernaan", "Metamorfosis"] }
  ];

  const habitats: FactItem[] = [
    { q: "Tempat hidup alami suatu makhluk hidup disebut...?", a: "Habitat", w: ["Metamorfosis", "Populasi", "Ekosistem buatan"] },
    { q: "Ikan hidup di habitat...?", a: "Air", w: ["Padang pasir", "Gua gelap", "Pegunungan salju"] },
    { q: "Unta banyak ditemukan hidup di habitat...?", a: "Padang pasir / Gurun", w: ["Air laut dalam", "Hutan hujan", "Kutub es"] },
    { q: "Beruang kutub hidup di habitat...?", a: "Kutub yang dingin dan bersalju", w: ["Padang pasir panas", "Hutan hujan tropis", "Laut dalam"] },
    { q: "Monyet dan orangutan banyak hidup di habitat...?", a: "Hutan", w: ["Padang pasir", "Kutub es", "Laut dalam"] },
    { q: "Burung penguin banyak ditemukan hidup di habitat...?", a: "Kutub / Daerah dingin", w: ["Padang pasir panas", "Hutan hujan tropis", "Gunung berapi aktif"] },
    { q: "Hewan yang hidup di gua yang gelap harus beradaptasi dengan kondisi...?", a: "Minim cahaya", w: ["Sangat terang", "Sangat panas", "Bersalju tebal"] },
    { q: "Kuda nil banyak menghabiskan waktu di habitat...?", a: "Sungai atau rawa", w: ["Padang pasir kering", "Puncak gunung salju", "Hutan hujan lebat"] },
    { q: "Unta memiliki punuk yang menyimpan lemak untuk bertahan hidup di habitat yang...?", a: "Kering dan panas", w: ["Basah dan dingin", "Bersalju", "Sangat lembap"] },
    { q: "Ikan paus dan lumba-lumba hidup di habitat...?", a: "Laut", w: ["Gurun pasir", "Hutan hujan", "Pegunungan tinggi"] },
    { q: "Burung hantu berburu pada malam hari, sehingga habitatnya harus memiliki cukup...?", a: "Tempat berteduh di siang hari", w: ["Cahaya matahari terus-menerus", "Air laut", "Salju sepanjang tahun"] },
    { q: "Katak hidup di habitat yang dekat dengan...?", a: "Air seperti kolam atau sungai", w: ["Padang pasir kering", "Puncak gunung es", "Gurun tandus"] },
    { q: "Gajah Afrika banyak ditemukan hidup di habitat...?", a: "Savana / Padang rumput", w: ["Laut dalam", "Kutub es", "Gua bawah tanah"] },
    { q: "Ekosistem terumbu karang menjadi habitat penting bagi banyak jenis...?", a: "Ikan dan biota laut", w: ["Burung gurun", "Hewan kutub", "Serangga gurun"] },
    { q: "Cacing tanah biasanya hidup di dalam...?", a: "Tanah yang lembap", w: ["Air laut", "Udara terbuka", "Batu keras"] }
  ];

  const statesOfMatter: FactItem[] = [
    { q: "Benda yang bentuknya tetap dan tidak berubah mengikuti wadahnya disebut benda...?", a: "Padat", w: ["Cair", "Gas", "Plasma"] },
    { q: "Benda yang bentuknya berubah mengikuti wadahnya namun volumenya tetap disebut benda...?", a: "Cair", w: ["Padat", "Gas", "Plasma"] },
    { q: "Benda yang bentuk dan volumenya berubah mengikuti wadahnya disebut benda...?", a: "Gas", w: ["Padat", "Cair", "Plasma"] },
    { q: "Batu, kayu, dan besi termasuk contoh benda...?", a: "Padat", w: ["Cair", "Gas", "Plasma"] },
    { q: "Air, minyak, dan susu termasuk contoh benda...?", a: "Cair", w: ["Padat", "Gas", "Plasma"] },
    { q: "Udara yang kita hirup termasuk contoh benda...?", a: "Gas", w: ["Padat", "Cair", "Plasma"] },
    { q: "Es batu termasuk benda...?", a: "Padat", w: ["Cair", "Gas", "Plasma"] },
    { q: "Uap air yang naik dari air mendidih termasuk benda...?", a: "Gas", w: ["Padat", "Cair", "Plasma"] },
    { q: "Benda padat memiliki bentuk yang...?", a: "Tetap", w: ["Selalu berubah", "Mengikuti wadah selalu", "Tidak beraturan selalu"] },
    { q: "Sirup di dalam gelas akan berbentuk seperti...?", a: "Gelas yang menampungnya", w: ["Bentuknya sendiri yang tetap", "Kotak selalu", "Bola selalu"] }
  ];

  const senses2: FactItem[] = [
    { q: "Bagian mata yang berwarna hitam di tengah dan mengatur cahaya masuk disebut...?", a: "Pupil", w: ["Alis", "Bulu mata", "Kelopak mata"] },
    { q: "Bagian telinga yang bisa kita lihat dari luar disebut daun...?", a: "Telinga", w: ["Mata", "Hidung", "Lidah"] },
    { q: "Bagian lidah yang berbeda-beda area merasakan rasa manis, asin, asam, dan pahit disebut...?", a: "Papila / Kuncup pengecap", w: ["Pupil", "Retina", "Gendang telinga"] },
    { q: "Getaran suara ditangkap oleh bagian telinga yang disebut...?", a: "Gendang telinga", w: ["Pupil mata", "Papila lidah", "Rongga hidung"] },
    { q: "Bagian dalam hidung yang berfungsi mendeteksi bau disebut...?", a: "Reseptor pembau", w: ["Pupil", "Gendang telinga", "Papila lidah"] },
    { q: "Kulit adalah indra peraba yang tersebar di seluruh...?", a: "Tubuh", w: ["Kepala saja", "Tangan saja", "Kaki saja"] },
    { q: "Orang yang mengalami gangguan penglihatan biasanya dibantu dengan alat bantu berupa...?", a: "Kacamata", w: ["Alat bantu dengar", "Tongkat pemukul", "Sarung tangan"] },
    { q: "Orang yang mengalami gangguan pendengaran biasanya dibantu dengan alat yang disebut...?", a: "Alat bantu dengar", w: ["Kacamata", "Tongkat", "Sarung tangan"] },
    { q: "Kita perlu menjaga kesehatan mata dengan tidak membaca di tempat yang terlalu...?", a: "Gelap", w: ["Terang", "Sejuk", "Nyaman"] },
    { q: "Suara yang terlalu keras dalam waktu lama dapat merusak organ...?", a: "Telinga", w: ["Mata", "Hidung", "Lidah"] },
    { q: "Menjaga kebersihan hidung penting agar indra penciuman tetap dapat mencium bau dengan...?", a: "Baik", w: ["Buruk", "Lambat", "Tidak berfungsi"] },
    { q: "Bagian mata yang berwarna dan mengelilingi pupil disebut...?", a: "Iris", w: ["Retina", "Kornea", "Lensa"] },
    { q: "Lapisan bening di depan mata yang melindungi bagian dalam mata disebut...?", a: "Kornea", w: ["Iris", "Pupil", "Retina"] },
    { q: "Bagian belakang mata yang menangkap bayangan benda disebut...?", a: "Retina", w: ["Kornea", "Iris", "Pupil"] },
    { q: "Rambut halus di dalam hidung berfungsi untuk menyaring...?", a: "Debu dan kotoran dari udara", w: ["Cahaya", "Suara", "Rasa makanan"] }
  ];

  return [
    ...buildFromFacts(metamorphosis, "SCI_SD2", "SD Kelas 2", "Sains", 0),
    ...buildFromFacts(plantNeeds, "SCI_SD2", "SD Kelas 2", "Sains", 15),
    ...buildFromFacts(habitats, "SCI_SD2", "SD Kelas 2", "Sains", 35),
    ...buildFromFacts(statesOfMatter, "SCI_SD2", "SD Kelas 2", "Sains", 55),
    ...buildFromFacts(senses2, "SCI_SD2", "SD Kelas 2", "Sains", 65),
    ...buildFromFacts([
      { q: "Belalang termasuk hewan yang mengalami metamorfosis...?", a: "Tidak sempurna", w: ["Sempurna", "Tanpa telur", "Tanpa fase muda"] },
      { q: "Kupu-kupu betina biasanya meletakkan telurnya di atas...?", a: "Daun tumbuhan", w: ["Batu besar", "Air laut", "Pasir gurun"] },
      { q: "Tanaman dalam ruangan sebaiknya diletakkan dekat...?", a: "Jendela agar terkena sinar matahari", w: ["Lemari tertutup rapat", "Ruangan tanpa cahaya", "Freezer"] },
      { q: "Kelelawar hidup di habitat berupa...?", a: "Gua yang gelap", w: ["Padang pasir terbuka", "Laut dalam", "Puncak gunung salju"] },
      { q: "Ular gurun beradaptasi dengan cuaca yang sangat...?", a: "Panas dan kering", w: ["Dingin bersalju", "Basah selalu", "Berkabut tebal"] },
      { q: "Sabun cair termasuk contoh benda...?", a: "Cair", w: ["Padat", "Gas", "Plasma"] },
      { q: "Balon yang ditiup berisi benda berwujud...?", a: "Gas", w: ["Padat", "Cair", "Plasma"] },
      { q: "Bagian mata yang berfungsi memfokuskan cahaya agar bayangan jatuh tepat di retina disebut...?", a: "Lensa mata", w: ["Iris", "Pupil", "Kornea"] },
      { q: "Ulat yang baru menetas dari telur kupu-kupu akan mulai memakan...?", a: "Daun", w: ["Batu", "Air laut", "Pasir"] },
      { q: "Ikan hias di akuarium membutuhkan air yang cukup...?", a: "Bersih dan beroksigen", w: ["Kotor dan keruh", "Sangat panas", "Beku"] },
      { q: "Katak mengalami metamorfosis sempurna dengan tahap berudu yang hidup di...?", a: "Air", w: ["Udara terbuka", "Pasir gurun", "Es"] },
      { q: "Tanaman anggrek biasanya tumbuh menempel pada...?", a: "Batang pohon lain", w: ["Air laut", "Batu gunung es", "Salju"] },
      { q: "Ikan mas memerlukan air yang diganti secara rutin agar tetap...?", a: "Segar dan sehat", w: ["Kotor terus", "Beku", "Sangat asin"] },
      { q: "Cacing tanah membantu menyuburkan tanah dengan cara...?", a: "Menggemburkan tanah", w: ["Memakan akar tanaman", "Merusak daun", "Menghalangi sinar matahari"] },
      { q: "Unta dapat bertahan tanpa minum air dalam waktu lama karena menyimpan lemak di...?", a: "Punuknya", w: ["Kakinya", "Telinganya", "Ekornya"] },
      { q: "Air termasuk benda cair yang dapat berubah menjadi benda padat jika...?", a: "Didinginkan hingga membeku", w: ["Dipanaskan", "Diberi warna", "Dicampur pasir"] },
      { q: "Lilin yang meleleh saat dibakar berubah dari benda padat menjadi benda...?", a: "Cair", w: ["Gas", "Tetap padat", "Plasma"] },
      { q: "Minyak goreng termasuk contoh benda...?", a: "Cair", w: ["Padat", "Gas", "Plasma"] },
      { q: "Asap dari pembakaran termasuk contoh benda...?", a: "Gas", w: ["Padat", "Cair", "Plasma"] },
      { q: "Telinga bagian dalam membantu kita menjaga...?", a: "Keseimbangan tubuh", w: ["Penglihatan", "Penciuman", "Pengecapan"] },
      { q: "Mata yang lelah sebaiknya diistirahatkan dengan cara...?", a: "Mengalihkan pandangan sejenak", w: ["Terus menatap layar", "Membaca di tempat gelap", "Menggosok mata terus"] },
      { q: "Lidah dapat merasakan berbagai rasa berkat adanya...?", a: "Kuncup pengecap", w: ["Pupil", "Gendang telinga", "Retina"] },
      { q: "Kelenjar keringat pada kulit membantu tubuh untuk...?", a: "Mengeluarkan keringat dan mendinginkan tubuh", w: ["Menghasilkan suara", "Melihat warna", "Mencium bau"] },
      { q: "Rumah siput selalu ikut kemanapun ia pergi karena cangkangnya menyatu dengan...?", a: "Tubuhnya", w: ["Sarangnya di pohon", "Sarangnya di air", "Sarangnya di udara"] },
      { q: "Semut hidup berkelompok dalam sebuah koloni yang dipimpin oleh...?", a: "Ratu semut", w: ["Raja lebah", "Induk ayam", "Induk kucing"] },
      { q: "Lebah mengumpulkan nektar dari bunga untuk dijadikan...?", a: "Madu", w: ["Air", "Minyak", "Garam"] },
      { q: "Burung membangun sarangnya di atas pohon untuk melindungi...?", a: "Telur dan anaknya", w: ["Makanan cadangan saja", "Daun kering", "Batu-batuan"] },
      { q: "Tumbuhan yang hidup menempel dan menyerap makanan dari tumbuhan lain disebut tumbuhan...?", a: "Parasit", w: ["Herbivora", "Karnivora", "Omnivora"] },
      { q: "Kaktus menyimpan cadangan air di dalam...?", a: "Batangnya yang tebal", w: ["Daunnya yang lebar", "Bunganya", "Akarnya yang pendek"] },
      { q: "Kupu-kupu membantu penyerbukan bunga saat ia hinggap untuk mengisap...?", a: "Nektar", w: ["Air hujan", "Embun pagi", "Getah pohon"] }
    ], "SCI_SD2", "SD Kelas 2", "Sains", 80)
  ];
}

// Generate Sains SD Kelas 3 (9 tahun) — 100 questions
// Scope: photosynthesis in depth, food chains, all 5 states-of-matter changes,
// simple machines, Earth rotation & revolution.
function generateScienceSD3(): Question[] {
const photosynthesis: FactItem[] = [
  { q: "Proses tumbuhan membuat makanannya sendiri menggunakan sinar matahari disebut...?", a: "Fotosintesis", w: ["Respirasi", "Metamorfosis", "Adaptasi"] },
  { q: "Zat hijau daun yang berperan menangkap sinar matahari untuk fotosintesis disebut...?", a: "Klorofil", w: ["Nektar", "Serbuk sari", "Getah"] },
  { q: "Selain sinar matahari dan klorofil, fotosintesis juga membutuhkan air dan gas...?", a: "Karbon dioksida", w: ["Oksigen murni", "Nitrogen murni", "Asap"] },
  { q: "Hasil dari proses fotosintesis adalah makanan (glukosa) dan gas...?", a: "Oksigen", w: ["Karbon dioksida", "Nitrogen", "Metana"] },
  { q: "Fotosintesis paling banyak terjadi pada bagian tumbuhan yang disebut...?", a: "Daun", w: ["Akar", "Batang", "Bunga"] },
  { q: "Tumbuhan menyerap air untuk fotosintesis melalui...?", a: "Akar", w: ["Daun", "Bunga", "Buah"] },
  { q: "Tumbuhan menyerap gas karbon dioksida melalui lubang kecil di daun yang disebut...?", a: "Stomata", w: ["Klorofil", "Xilem", "Floem"] },
  { q: "Oksigen hasil fotosintesis sangat penting bagi manusia dan hewan untuk...?", a: "Bernapas", w: ["Berjalan", "Tidur", "Berbicara"] },
  { q: "Tumbuhan yang daunnya berwarna hijau menandakan banyak mengandung...?", a: "Klorofil", w: ["Nektar", "Getah", "Serbuk sari"] },
  { q: "Fotosintesis biasanya terjadi paling aktif pada waktu...?", a: "Siang hari saat sinar matahari terang", w: ["Malam hari", "Dini hari gelap", "Saat mendung tebal"] },
  { q: "Tumbuhan yang diletakkan di tempat gelap sama sekali tidak bisa melakukan...?", a: "Fotosintesis", w: ["Respirasi", "Pertumbuhan akar saja", "Penyerapan air"] },
  { q: "Pembuluh yang mengangkut air dari akar menuju daun disebut...?", a: "Xilem", w: ["Floem", "Stomata", "Klorofil"] },
  { q: "Pembuluh yang mengangkut hasil fotosintesis ke seluruh bagian tumbuhan disebut...?", a: "Floem", w: ["Xilem", "Stomata", "Akar rambut"] },
  { q: "Tanaman air seperti eceng gondok tetap dapat melakukan fotosintesis karena memiliki...?", a: "Klorofil pada daunnya", w: ["Akar yang sangat panjang", "Batang yang sangat keras", "Duri tajam"] },
  { q: "Tanpa fotosintesis, tumbuhan tidak dapat menghasilkan...?", a: "Makanan untuk dirinya sendiri", w: ["Air hujan", "Sinar matahari", "Udara"] },
  { q: "Fotosintesis merupakan sumber utama gas oksigen di...?", a: "Bumi", w: ["Bulan", "Matahari", "Bintang"] },
  { q: "Warna hijau pada daun disebabkan oleh pigmen yang disebut...?", a: "Klorofil", w: ["Karoten", "Antosianin", "Melanin"] },
  { q: "Tumbuhan yang berada di dalam ruangan tanpa cahaya dalam waktu lama akan mengalami...?", a: "Gangguan pertumbuhan karena kurang fotosintesis", w: ["Pertumbuhan lebih cepat", "Warna daun lebih hijau", "Buah lebih manis"] },
  { q: "Gas karbon dioksida yang diserap tumbuhan berasal dari...?", a: "Udara di sekitarnya", w: ["Air tanah", "Sinar matahari", "Tanah"] },
  { q: "Fotosintesis membantu menjaga keseimbangan gas oksigen dan karbon dioksida di...?", a: "Udara / Atmosfer bumi", w: ["Air laut saja", "Tanah saja", "Bulan"] }
];

const foodChain: FactItem[] = [
  { q: "Urutan makan dan dimakan antar makhluk hidup disebut...?", a: "Rantai makanan", w: ["Fotosintesis", "Metamorfosis", "Ekosistem tunggal"] },
  { q: "Tumbuhan hijau dalam rantai makanan berperan sebagai...?", a: "Produsen", w: ["Konsumen", "Pengurai", "Predator"] },
  { q: "Hewan yang memakan tumbuhan dalam rantai makanan berperan sebagai...?", a: "Konsumen tingkat pertama", w: ["Produsen", "Pengurai", "Konsumen puncak"] },
  { q: "Hewan yang memakan hewan lain dalam rantai makanan berperan sebagai...?", a: "Konsumen tingkat kedua atau lebih", w: ["Produsen", "Pengurai", "Fotosintesis"] },
  { q: "Makhluk hidup yang menguraikan sisa makhluk hidup yang telah mati disebut...?", a: "Pengurai / Dekomposer", w: ["Produsen", "Konsumen", "Predator"] },
  { q: "Jamur dan bakteri dalam rantai makanan berperan sebagai...?", a: "Pengurai", w: ["Produsen", "Konsumen tingkat satu", "Predator utama"] },
  { q: "Dalam rantai makanan padi - tikus - ular, padi berperan sebagai...?", a: "Produsen", w: ["Konsumen tingkat satu", "Konsumen tingkat dua", "Pengurai"] },
  { q: "Dalam rantai makanan padi - tikus - ular, tikus berperan sebagai...?", a: "Konsumen tingkat satu", w: ["Produsen", "Konsumen tingkat dua", "Pengurai"] },
  { q: "Dalam rantai makanan padi - tikus - ular, ular berperan sebagai...?", a: "Konsumen tingkat dua", w: ["Produsen", "Konsumen tingkat satu", "Pengurai"] },
  { q: "Sumber energi utama dalam semua rantai makanan berasal dari...?", a: "Matahari", w: ["Air", "Tanah", "Udara"] },
  { q: "Jika populasi produsen berkurang drastis, maka konsumen tingkat satu akan mengalami...?", a: "Kekurangan makanan", w: ["Kelebihan makanan", "Tidak terpengaruh sama sekali", "Semakin banyak"] },
  { q: "Gabungan dari beberapa rantai makanan yang saling berhubungan disebut...?", a: "Jaring-jaring makanan", w: ["Fotosintesis ganda", "Ekosistem tunggal", "Metamorfosis ganda"] },
  { q: "Elang yang berada di puncak rantai makanan disebut sebagai...?", a: "Konsumen puncak", w: ["Produsen", "Pengurai", "Konsumen tingkat satu"] },
  { q: "Belalang yang memakan rumput dalam rantai makanan berperan sebagai...?", a: "Konsumen tingkat satu", w: ["Produsen", "Pengurai", "Konsumen puncak"] },
  { q: "Katak yang memakan belalang dalam rantai makanan berperan sebagai...?", a: "Konsumen tingkat dua", w: ["Produsen", "Konsumen tingkat satu", "Pengurai"] },
  { q: "Rumput - belalang - katak - ular adalah contoh dari...?", a: "Rantai makanan", w: ["Metamorfosis", "Fotosintesis", "Adaptasi"] },
  { q: "Jika salah satu makhluk hidup dalam rantai makanan punah, maka rantai makanan tersebut akan...?", a: "Terganggu / Terputus", w: ["Semakin kuat", "Tidak terpengaruh", "Bertambah panjang"] },
  { q: "Cacing tanah termasuk contoh pengurai karena membantu menguraikan...?", a: "Sisa-sisa organisme di dalam tanah", w: ["Sinar matahari", "Air hujan", "Udara"] },
  { q: "Semua rantai makanan pasti diawali oleh...?", a: "Produsen (tumbuhan hijau)", w: ["Konsumen puncak", "Pengurai", "Predator besar"] },
  { q: "Manusia dalam rantai makanan biasanya berperan sebagai...?", a: "Konsumen", w: ["Produsen saja", "Pengurai saja", "Tidak berperan"] },
  { q: "Fitoplankton di laut berperan sebagai produsen bagi rantai makanan...?", a: "Ekosistem laut", w: ["Ekosistem gurun", "Ekosistem gunung salju", "Ekosistem gua"] },
  { q: "Ikan kecil yang memakan fitoplankton berperan sebagai...?", a: "Konsumen tingkat satu", w: ["Produsen", "Pengurai", "Konsumen puncak"] },
  { q: "Ikan besar yang memakan ikan kecil berperan sebagai...?", a: "Konsumen tingkat dua", w: ["Produsen", "Pengurai", "Konsumen tingkat satu"] },
  { q: "Rantai makanan menunjukkan aliran...?", a: "Energi dari satu makhluk hidup ke makhluk hidup lain", w: ["Warna dari tumbuhan ke hewan", "Suara antar hewan", "Udara dari tanah ke langit"] },
  { q: "Populasi konsumen puncak biasanya lebih sedikit dibandingkan produsen karena...?", a: "Energi berkurang di setiap tingkat rantai makanan", w: ["Konsumen puncak lebih cepat berkembang biak", "Produsen sangat sedikit jumlahnya", "Tidak ada hubungan jumlah sama sekali"] }
];

const stateChanges: FactItem[] = [
  { q: "Perubahan wujud benda dari cair menjadi padat disebut...?", a: "Membeku", w: ["Mencair", "Menguap", "Mengembun"] },
  { q: "Perubahan wujud benda dari padat menjadi cair disebut...?", a: "Mencair", w: ["Membeku", "Menguap", "Menyublim"] },
  { q: "Perubahan wujud benda dari cair menjadi gas disebut...?", a: "Menguap", w: ["Mengembun", "Membeku", "Menyublim"] },
  { q: "Perubahan wujud benda dari gas menjadi cair disebut...?", a: "Mengembun", w: ["Menguap", "Membeku", "Menyublim"] },
  { q: "Perubahan wujud benda dari padat langsung menjadi gas tanpa melalui wujud cair disebut...?", a: "Menyublim", w: ["Membeku", "Mengembun", "Mencair"] },
  { q: "Es batu yang dibiarkan di ruangan panas lama-lama akan mengalami peristiwa...?", a: "Mencair", w: ["Membeku", "Menguap total", "Menyublim"] },
  { q: "Air yang dimasukkan ke dalam freezer lama-lama akan mengalami peristiwa...?", a: "Membeku", w: ["Mencair", "Menguap", "Mengembun"] },
  { q: "Air yang direbus hingga mendidih lama-lama akan mengalami peristiwa...?", a: "Menguap", w: ["Membeku", "Mengembun", "Menyublim"] },
  { q: "Titik-titik air yang muncul di permukaan luar gelas berisi es disebut peristiwa...?", a: "Mengembun", w: ["Menguap", "Membeku", "Menyublim"] },
  { q: "Kapur barus yang lama-kelamaan mengecil dan habis tanpa mencair mengalami peristiwa...?", a: "Menyublim", w: ["Mencair", "Membeku", "Mengembun"] },
  { q: "Baju basah yang dijemur lama-lama menjadi kering karena air di dalamnya mengalami peristiwa...?", a: "Menguap", w: ["Membeku", "Mengembun", "Menyublim"] },
  { q: "Uap air di udara yang menyentuh kaca dingin akan membentuk embun melalui peristiwa...?", a: "Mengembun", w: ["Menguap", "Membeku", "Menyublim"] },
  { q: "Lilin yang dipanaskan akan meleleh mengalami peristiwa...?", a: "Mencair", w: ["Membeku", "Menguap", "Menyublim"] },
  { q: "Lilin cair yang didinginkan kembali akan mengalami peristiwa...?", a: "Membeku", w: ["Mencair", "Menguap", "Menyublim"] },
  { q: "Salju yang terkena sinar matahari akan mencair menjadi...?", a: "Air", w: ["Uap langsung", "Batu", "Pasir"] },
  { q: "Proses memasak air hingga menghasilkan uap menunjukkan perubahan wujud dari...?", a: "Cair menjadi gas", w: ["Padat menjadi cair", "Gas menjadi padat", "Padat menjadi gas"] },
  { q: "Embun pagi yang muncul di daun rumput terjadi karena uap air di udara mengalami...?", a: "Pengembunan", w: ["Penguapan", "Pembekuan", "Penyubliman"] },
  { q: "Adonan agar-agar yang dipanaskan kemudian didinginkan hingga mengeras mengalami peristiwa...?", a: "Membeku / Memadat", w: ["Mencair", "Menguap", "Menyublim"] },
  { q: "Es krim yang dibiarkan di luar lemari es akan meleleh karena mengalami peristiwa...?", a: "Mencair", w: ["Membeku", "Mengembun", "Menyublim"] },
  { q: "Air hujan yang jatuh ke bumi awalnya berasal dari uap air yang mengalami peristiwa...?", a: "Mengembun menjadi awan lalu turun sebagai hujan", w: ["Membeku menjadi es terus-menerus", "Menyublim di udara", "Tidak berubah sama sekali"] },
  { q: "Proses menguapnya air laut akibat panas matahari kemudian membentuk awan disebut siklus...?", a: "Air", w: ["Udara", "Tanah", "Cahaya"] },
  { q: "Gula pasir yang dilarutkan dalam air panas kemudian mengalami perubahan wujud berupa...?", a: "Melarut, bukan perubahan wujud zat itu sendiri", w: ["Membeku", "Menyublim", "Mengembun"] },
  { q: "Perubahan wujud benda yang melepaskan panas ke lingkungan sekitar contohnya adalah...?", a: "Membeku dan mengembun", w: ["Mencair dan menguap", "Menyublim saja", "Tidak ada yang melepaskan panas"] },
  { q: "Perubahan wujud benda yang menyerap panas dari lingkungan sekitar contohnya adalah...?", a: "Mencair dan menguap", w: ["Membeku dan mengembun", "Menyublim saja", "Tidak ada yang menyerap panas"] },
  { q: "Air yang membeku menjadi es batu, volume atau ukurannya cenderung...?", a: "Sedikit membesar", w: ["Mengecil drastis", "Hilang sepenuhnya", "Berubah warna"] }
];

const simpleMachines: FactItem[] = [
  { q: "Alat sederhana yang digunakan untuk mempermudah pekerjaan manusia disebut...?", a: "Pesawat sederhana", w: ["Pesawat terbang", "Mesin listrik", "Robot"] },
  { q: "Alat yang digunakan untuk mengangkat beban berat dengan menekan salah satu ujungnya disebut...?", a: "Tuas / Pengungkit", w: ["Katrol", "Bidang miring", "Roda berporos"] },
  { q: "Jungkat-jungkit adalah salah satu contoh penerapan prinsip...?", a: "Tuas / Pengungkit", w: ["Katrol", "Bidang miring", "Roda berporos"] },
  { q: "Alat yang menggunakan roda bercelah dan tali untuk menarik atau mengangkat beban disebut...?", a: "Katrol", w: ["Tuas", "Bidang miring", "Sekrup"] },
  { q: "Timba sumur tradisional yang menggunakan tali dan roda menerapkan prinsip...?", a: "Katrol", w: ["Tuas", "Bidang miring", "Sekrup"] },
  { q: "Papan datar yang dipasang miring untuk memindahkan benda berat ke tempat yang lebih tinggi disebut...?", a: "Bidang miring", w: ["Tuas", "Katrol", "Roda berporos"] },
  { q: "Tangga dan jalan menanjak di gunung adalah contoh penerapan...?", a: "Bidang miring", w: ["Tuas", "Katrol", "Sekrup"] },
  { q: "Roda pada sepeda dan mobil menerapkan prinsip pesawat sederhana yang disebut...?", a: "Roda berporos", w: ["Tuas", "Katrol", "Bidang miring"] },
  { q: "Gunting adalah alat yang menerapkan prinsip kerja...?", a: "Tuas / Pengungkit", w: ["Katrol", "Bidang miring", "Roda berporos"] },
  { q: "Sekrup yang dapat memasukkan atau mengeluarkan paku dengan cara diputar merupakan bentuk dari bidang miring yang...?", a: "Melilit", w: ["Datar lurus", "Bergerigi lurus", "Bulat penuh"] },
  { q: "Kapak untuk memotong kayu menerapkan prinsip...?", a: "Bidang miring (baji)", w: ["Tuas", "Katrol", "Roda berporos"] },
  { q: "Alat pengungkit yang paling sederhana biasanya memiliki titik tumpu, titik kuasa, dan titik...?", a: "Beban", w: ["Api", "Air", "Udara"] },
  { q: "Katrol tunggal tetap digunakan pada tiang bendera untuk...?", a: "Menaikkan dan menurunkan bendera dengan mudah", w: ["Memotong tali", "Membuat api", "Mengukur jarak"] },
  { q: "Semakin miring suatu bidang miring, gaya yang dibutuhkan untuk mendorong benda ke atas akan semakin...?", a: "Kecil", w: ["Besar", "Sama saja", "Tidak berubah"] },
  { q: "Pesawat sederhana pada dasarnya bertujuan untuk mempermudah pekerjaan dengan cara mengurangi...?", a: "Gaya yang dibutuhkan", w: ["Jumlah orang yang bekerja", "Waktu istirahat", "Berat benda itu sendiri"] }
];

const earthRotation: FactItem[] = [
  { q: "Perputaran Bumi pada porosnya sendiri disebut...?", a: "Rotasi", w: ["Revolusi", "Gravitasi", "Orbit"] },
  { q: "Perputaran Bumi mengelilingi Matahari disebut...?", a: "Revolusi", w: ["Rotasi", "Gravitasi", "Fotosintesis"] },
  { q: "Rotasi Bumi menyebabkan terjadinya peristiwa...?", a: "Siang dan malam", w: ["Pergantian musim", "Gerhana matahari", "Pasang surut air laut saja"] },
  { q: "Satu kali rotasi Bumi membutuhkan waktu sekitar...?", a: "24 jam", w: ["1 jam", "1 minggu", "1 bulan"] },
  { q: "Satu kali revolusi Bumi mengelilingi Matahari membutuhkan waktu sekitar...?", a: "365 hari (1 tahun)", w: ["24 jam", "1 bulan", "1 minggu"] },
  { q: "Revolusi Bumi menyebabkan terjadinya pergantian...?", a: "Musim", w: ["Siang dan malam saja", "Warna langit saja", "Suara alam"] },
  { q: "Bagian Bumi yang menghadap Matahari akan mengalami waktu...?", a: "Siang", w: ["Malam", "Senja terus", "Gerhana"] },
  { q: "Bagian Bumi yang membelakangi Matahari akan mengalami waktu...?", a: "Malam", w: ["Siang", "Pagi terus", "Gerhana"] },
  { q: "Bumi berputar pada porosnya dari arah barat ke...?", a: "Timur", w: ["Selatan", "Utara", "Tenggara"] },
  { q: "Karena rotasi Bumi, kita melihat Matahari seolah-olah terbit dari arah...?", a: "Timur", w: ["Barat", "Utara", "Selatan"] },
  { q: "Bulan mengelilingi Bumi dalam gerakan yang disebut...?", a: "Revolusi bulan", w: ["Rotasi matahari", "Gravitasi bumi saja", "Orbit matahari"] },
  { q: "Peristiwa terjadinya siang dan malam bergantian di berbagai belahan dunia disebabkan oleh...?", a: "Rotasi Bumi", w: ["Revolusi Bumi", "Gravitasi Bulan", "Letusan gunung berapi"] },
  { q: "Bumi memiliki kemiringan sumbu rotasi yang menyebabkan terjadinya perbedaan lamanya...?", a: "Musim di berbagai belahan bumi", w: ["Kecepatan rotasi harian", "Warna langit", "Suara alam"] },
  { q: "Zona waktu yang berbeda-beda di berbagai negara terjadi karena adanya peristiwa...?", a: "Rotasi Bumi", w: ["Revolusi Bumi", "Gravitasi Bulan", "Letusan gunung berapi"] },
  { q: "Planet-planet dalam tata surya bergerak mengelilingi Matahari dalam peristiwa yang disebut...?", a: "Revolusi", w: ["Rotasi", "Gravitasi", "Fotosintesis"] }
];

  return [
    ...buildFromFacts(photosynthesis, "SCI_SD3", "SD Kelas 3", "Sains", 0),
    ...buildFromFacts(foodChain, "SCI_SD3", "SD Kelas 3", "Sains", 20),
    ...buildFromFacts(stateChanges, "SCI_SD3", "SD Kelas 3", "Sains", 45),
    ...buildFromFacts(simpleMachines, "SCI_SD3", "SD Kelas 3", "Sains", 70),
    ...buildFromFacts(earthRotation, "SCI_SD3", "SD Kelas 3", "Sains", 85)
  ];
}

// Generate Sains SD Kelas 4 (10 tahun) — 100 questions
// Scope: ecosystem components, food webs, adaptation types, basic forces,
// skeletal & muscular system.
function generateScienceSD4(): Question[] {
const ecosystems: FactItem[] = [
  { q: "Hubungan timbal balik antara makhluk hidup dengan lingkungannya disebut...?", a: "Ekosistem", w: ["Metamorfosis", "Fotosintesis", "Adaptasi"] },
  { q: "Semua makhluk hidup dari satu jenis yang tinggal di suatu tempat disebut...?", a: "Populasi", w: ["Komunitas", "Ekosistem", "Habitat"] },
  { q: "Kumpulan berbagai populasi yang hidup bersama di suatu tempat disebut...?", a: "Komunitas", w: ["Populasi", "Individu", "Spesies"] },
  { q: "Komponen ekosistem yang terdiri dari makhluk hidup disebut komponen...?", a: "Biotik", w: ["Abiotik", "Non-hayati", "Buatan"] },
  { q: "Komponen ekosistem yang terdiri dari benda tak hidup seperti air, tanah, dan udara disebut komponen...?", a: "Abiotik", w: ["Biotik", "Hayati", "Populasi"] },
  { q: "Contoh komponen biotik dalam suatu ekosistem adalah...?", a: "Tumbuhan dan hewan", w: ["Batu dan pasir", "Air dan udara", "Cahaya matahari"] },
  { q: "Contoh komponen abiotik dalam suatu ekosistem adalah...?", a: "Air, tanah, dan udara", w: ["Tumbuhan", "Hewan", "Manusia"] },
  { q: "Ekosistem yang terbentuk secara alami tanpa campur tangan manusia disebut ekosistem...?", a: "Alami", w: ["Buatan", "Sementara", "Tiruan"] },
  { q: "Kolam ikan buatan dan sawah adalah contoh ekosistem...?", a: "Buatan", w: ["Alami sepenuhnya", "Liar", "Tanpa manusia"] },
  { q: "Hutan hujan tropis adalah contoh ekosistem...?", a: "Alami", w: ["Buatan", "Sementara", "Tiruan"] },
  { q: "Ekosistem sungai termasuk contoh ekosistem...?", a: "Air tawar", w: ["Air laut", "Darat kering", "Udara"] },
  { q: "Ekosistem terumbu karang termasuk contoh ekosistem...?", a: "Air laut", w: ["Air tawar", "Darat kering", "Udara"] },
  { q: "Ekosistem gurun memiliki ciri khas yaitu curah hujan yang sangat...?", a: "Rendah / Sedikit", w: ["Tinggi", "Sedang", "Selalu turun salju"] },
  { q: "Ekosistem padang rumput biasanya menjadi habitat bagi hewan-hewan seperti...?", a: "Zebra dan singa", w: ["Ikan paus", "Beruang kutub", "Penguin"] },
  { q: "Keseimbangan ekosistem dapat terganggu apabila salah satu komponennya...?", a: "Rusak atau punah", w: ["Bertambah subur", "Tetap stabil", "Semakin beragam"] },
  { q: "Penebangan hutan secara liar dapat menyebabkan rusaknya ekosistem...?", a: "Hutan", w: ["Laut", "Gurun", "Kutub"] },
  { q: "Pencemaran air dapat mengganggu keseimbangan ekosistem...?", a: "Sungai atau laut", w: ["Gurun pasir", "Padang rumput kering", "Gunung berapi"] },
  { q: "Setiap individu dalam ekosistem saling berinteraksi dan saling...?", a: "Membutuhkan", w: ["Menghancurkan tanpa alasan", "Mengabaikan sepenuhnya", "Berpindah tempat terus"] },
  { q: "Ekosistem sawah termasuk contoh ekosistem yang dikelola oleh...?", a: "Manusia", w: ["Alam sepenuhnya tanpa campur tangan", "Hewan liar", "Cuaca saja"] },
  { q: "Salah satu manfaat menjaga kelestarian ekosistem adalah menjaga keseimbangan...?", a: "Alam dan kehidupan makhluk hidup", w: ["Harga barang", "Jumlah penduduk", "Warna langit"] }
];

const foodWeb: FactItem[] = [
  { q: "Kumpulan beberapa rantai makanan yang saling berhubungan disebut...?", a: "Jaring-jaring makanan", w: ["Ekosistem tunggal", "Fotosintesis ganda", "Metamorfosis ganda"] },
  { q: "Jaring-jaring makanan menunjukkan bahwa satu jenis hewan dapat memakan...?", a: "Lebih dari satu jenis makanan", w: ["Hanya satu jenis makanan", "Tidak makan sama sekali", "Hanya tumbuhan tertentu"] },
  { q: "Jika salah satu rantai makanan dalam jaring-jaring makanan terganggu, rantai makanan lain biasanya...?", a: "Masih dapat membantu menyeimbangkan ekosistem", w: ["Ikut hancur total selalu", "Tidak berpengaruh sama sekali", "Berubah menjadi produsen"] },
  { q: "Produsen dalam jaring-jaring makanan biasanya berupa...?", a: "Tumbuhan hijau", w: ["Hewan karnivora", "Jamur pengurai", "Batu-batuan"] },
  { q: "Konsumen tingkat pertama dalam jaring-jaring makanan biasanya adalah hewan...?", a: "Herbivora", w: ["Karnivora puncak", "Pengurai", "Produsen"] },
  { q: "Konsumen puncak dalam jaring-jaring makanan biasanya adalah hewan...?", a: "Karnivora besar tanpa pemangsa alami", w: ["Herbivora kecil", "Produsen", "Pengurai"] },
  { q: "Energi dalam jaring-jaring makanan mengalir mulai dari...?", a: "Matahari ke produsen lalu ke konsumen", w: ["Konsumen ke matahari", "Pengurai ke matahari", "Tidak ada aliran energi"] },
  { q: "Jamur dan bakteri berperan penting dalam jaring-jaring makanan sebagai...?", a: "Pengurai", w: ["Produsen utama", "Konsumen puncak", "Predator utama"] },
  { q: "Pengurai membantu mengembalikan zat hara ke dalam...?", a: "Tanah", w: ["Udara saja", "Air laut saja", "Matahari"] },
  { q: "Dalam sebuah ekosistem sawah, ular dapat memakan tikus dan katak, hal ini menunjukkan bahwa ular memiliki...?", a: "Lebih dari satu sumber makanan", w: ["Hanya satu sumber makanan", "Tidak memiliki sumber makanan", "Hanya memakan tumbuhan"] },
  { q: "Jaring-jaring makanan yang beragam menunjukkan ekosistem yang lebih...?", a: "Stabil dan seimbang", w: ["Mudah rusak", "Tidak stabil selalu", "Sederhana"] },
  { q: "Punahnya salah satu spesies dalam jaring-jaring makanan dapat memengaruhi...?", a: "Banyak spesies lain yang terhubung dengannya", w: ["Tidak ada spesies lain sama sekali", "Hanya spesies itu sendiri", "Seluruh alam semesta"] },
  { q: "Burung elang dalam jaring-jaring makanan dapat memangsa ular, tikus, dan kelinci, hal ini menunjukkan elang berperan sebagai...?", a: "Konsumen puncak dengan banyak sumber makanan", w: ["Produsen", "Pengurai", "Konsumen tingkat satu saja"] },
  { q: "Keseimbangan jaring-jaring makanan sangat penting untuk menjaga kelangsungan...?", a: "Seluruh ekosistem", w: ["Satu jenis hewan saja", "Satu jenis tumbuhan saja", "Cuaca"] },
  { q: "Perburuan liar yang berlebihan terhadap satu jenis hewan dapat merusak keseimbangan...?", a: "Jaring-jaring makanan", w: ["Cuaca dunia", "Warna langit", "Suhu bumi secara langsung"] },
  { q: "Tikus sawah dapat dimakan oleh ular, burung hantu, dan kucing, hal ini menunjukkan tikus memiliki...?", a: "Banyak pemangsa", w: ["Tidak ada pemangsa", "Hanya satu pemangsa", "Menjadi produsen"] },
  { q: "Jaring-jaring makanan di hutan biasanya lebih kompleks dibandingkan di...?", a: "Ekosistem yang lebih sederhana seperti kolam kecil", w: ["Ekosistem lain yang sama kompleksnya selalu", "Tidak ada perbedaan sama sekali", "Ekosistem laut dalam selalu lebih sederhana"] },
  { q: "Fitoplankton di ekosistem laut menjadi dasar dari jaring-jaring makanan karena berperan sebagai...?", a: "Produsen utama", w: ["Konsumen puncak", "Pengurai utama", "Predator besar"] },
  { q: "Menjaga populasi predator alami penting untuk mengendalikan populasi...?", a: "Hewan herbivora atau hama", w: ["Tumbuhan produsen saja", "Pengurai saja", "Cuaca"] },
  { q: "Interaksi makan dan dimakan yang kompleks antar banyak spesies menggambarkan pentingnya...?", a: "Keanekaragaman hayati", w: ["Penurunan populasi produsen", "Pengurangan jumlah spesies", "Kepunahan massal"] }
];

const adaptation: FactItem[] = [
  { q: "Kemampuan makhluk hidup menyesuaikan diri dengan lingkungannya disebut...?", a: "Adaptasi", w: ["Metamorfosis", "Fotosintesis", "Populasi"] },
  { q: "Penyesuaian bentuk tubuh makhluk hidup terhadap lingkungannya disebut adaptasi...?", a: "Morfologi", w: ["Fisiologi", "Tingkah laku", "Sosial"] },
  { q: "Penyesuaian fungsi kerja organ tubuh makhluk hidup terhadap lingkungannya disebut adaptasi...?", a: "Fisiologi", w: ["Morfologi", "Tingkah laku", "Sosial"] },
  { q: "Penyesuaian tingkah laku makhluk hidup terhadap lingkungannya disebut adaptasi...?", a: "Tingkah laku", w: ["Morfologi", "Fisiologi", "Sosial"] },
  { q: "Bentuk paruh burung elang yang tajam dan melengkung merupakan contoh adaptasi...?", a: "Morfologi untuk mencabik mangsa", w: ["Fisiologi", "Tingkah laku", "Sosial"] },
  { q: "Unta menyimpan lemak di punuknya sebagai cadangan makanan dan air merupakan contoh adaptasi...?", a: "Fisiologi", w: ["Morfologi murni", "Tingkah laku murni", "Sosial"] },
  { q: "Bunglon yang mengubah warna kulitnya untuk berkamuflase merupakan contoh adaptasi...?", a: "Tingkah laku", w: ["Morfologi murni", "Fisiologi murni", "Sosial"] },
  { q: "Kaki bebek yang berselaput untuk memudahkan berenang merupakan contoh adaptasi...?", a: "Morfologi", w: ["Fisiologi", "Tingkah laku", "Sosial"] },
  { q: "Ikan yang hidup di laut dalam mengeluarkan sedikit urine untuk menyesuaikan kadar garam merupakan contoh adaptasi...?", a: "Fisiologi", w: ["Morfologi", "Tingkah laku", "Sosial"] },
  { q: "Cicak memutuskan ekornya saat terancam bahaya merupakan contoh adaptasi...?", a: "Tingkah laku", w: ["Morfologi murni", "Fisiologi murni", "Sosial"] },
  { q: "Beruang yang melakukan hibernasi (tidur panjang) saat musim dingin merupakan contoh adaptasi...?", a: "Tingkah laku", w: ["Morfologi murni", "Fisiologi murni", "Sosial"] },
  { q: "Tumbuhan kaktus memiliki daun berbentuk duri untuk mengurangi penguapan air, ini contoh adaptasi...?", a: "Morfologi", w: ["Fisiologi", "Tingkah laku", "Sosial"] },
  { q: "Teratai memiliki daun lebar dan tipis untuk mempercepat penguapan air, ini contoh adaptasi...?", a: "Morfologi", w: ["Fisiologi", "Tingkah laku", "Sosial"] },
  { q: "Burung yang bermigrasi ke daerah yang lebih hangat saat musim dingin merupakan contoh adaptasi...?", a: "Tingkah laku", w: ["Morfologi murni", "Fisiologi murni", "Sosial"] },
  { q: "Landak yang menggulung tubuhnya dan mengeluarkan duri saat terancam merupakan contoh adaptasi...?", a: "Tingkah laku dan morfologi", w: ["Fisiologi saja", "Sosial saja", "Tidak beradaptasi"] },
  { q: "Pohon jati yang menggugurkan daunnya saat musim kemarau untuk mengurangi penguapan merupakan contoh adaptasi...?", a: "Tingkah laku / Fisiologi tumbuhan", w: ["Morfologi permanen", "Sosial", "Tidak beradaptasi"] },
  { q: "Kelelawar menggunakan gelombang suara untuk menemukan arah dalam gelap, kemampuan ini disebut...?", a: "Ekolokasi", w: ["Fotosintesis", "Metamorfosis", "Respirasi"] },
  { q: "Ikan yang memiliki warna tubuh menyerupai lingkungan sekitarnya untuk menghindari pemangsa disebut...?", a: "Kamuflase", w: ["Metamorfosis", "Fotosintesis", "Hibernasi"] },
  { q: "Hewan yang beradaptasi dengan cara meniru bentuk atau warna makhluk lain yang berbahaya disebut...?", a: "Mimikri", w: ["Kamuflase total", "Hibernasi", "Ekolokasi"] },
  { q: "Adaptasi yang berhasil membantu makhluk hidup untuk...?", a: "Bertahan hidup di lingkungannya", w: ["Segera punah", "Berhenti berkembang biak", "Kehilangan makanan"] },
  { q: "Tumbuhan xerofit adalah tumbuhan yang beradaptasi untuk hidup di lingkungan yang...?", a: "Kering", w: ["Sangat basah", "Sangat dingin bersalju", "Di dalam air"] },
  { q: "Tumbuhan hidrofit adalah tumbuhan yang beradaptasi untuk hidup di lingkungan...?", a: "Berair", w: ["Sangat kering", "Gurun pasir", "Puncak gunung"] },
  { q: "Ikan paus yang harus naik ke permukaan air secara berkala untuk bernapas menunjukkan bahwa paus bernapas menggunakan...?", a: "Paru-paru", w: ["Insang", "Kulit", "Sirip"] },
  { q: "Kaktus memiliki akar yang panjang dan menyebar luas untuk...?", a: "Menyerap air sebanyak mungkin dari area yang luas", w: ["Mengurangi kebutuhan air", "Menghasilkan lebih banyak bunga", "Mempercepat pertumbuhan daun"] },
  { q: "Hewan yang berubah warna bulunya menjadi putih saat musim salju untuk berkamuflase adalah contoh hewan...?", a: "Kelinci kutub atau rubah kutub", w: ["Unta gurun", "Gajah hutan", "Ikan laut dalam"] }
];

const forcesBasic: FactItem[] = [
  { q: "Tarikan atau dorongan yang menyebabkan benda bergerak, berhenti, atau berubah bentuk disebut...?", a: "Gaya", w: ["Energi panas", "Fotosintesis", "Metamorfosis"] },
  { q: "Gaya yang dilakukan dengan cara mendorong benda menjauh disebut gaya...?", a: "Dorongan", w: ["Tarikan", "Gravitasi", "Gesekan"] },
  { q: "Gaya yang dilakukan dengan cara menarik benda mendekat disebut gaya...?", a: "Tarikan", w: ["Dorongan", "Gravitasi", "Gesekan"] },
  { q: "Gaya yang menyebabkan semua benda jatuh ke bawah menuju pusat Bumi disebut gaya...?", a: "Gravitasi", w: ["Gesekan", "Magnet", "Dorongan"] },
  { q: "Gaya yang muncul akibat gesekan dua permukaan benda disebut gaya...?", a: "Gesekan", w: ["Gravitasi", "Magnet", "Pegas"] },
  { q: "Gaya yang ditimbulkan oleh magnet untuk menarik benda logam tertentu disebut gaya...?", a: "Magnet", w: ["Gesekan", "Gravitasi", "Pegas"] },
  { q: "Gaya yang muncul akibat regangan atau tekanan pada pegas disebut gaya...?", a: "Pegas", w: ["Gravitasi", "Magnet", "Gesekan"] },
  { q: "Mendorong meja agar bergeser adalah contoh penerapan gaya...?", a: "Dorongan", w: ["Tarikan", "Gravitasi", "Magnet"] },
  { q: "Menarik gerobak agar bergerak maju adalah contoh penerapan gaya...?", a: "Tarikan", w: ["Dorongan", "Gravitasi", "Magnet"] },
  { q: "Buah yang jatuh dari pohon ke tanah menunjukkan adanya gaya...?", a: "Gravitasi", w: ["Gesekan", "Magnet", "Pegas"] },
  { q: "Ban sepeda yang terasa berat saat dikayuh di jalan berpasir menunjukkan adanya gaya...?", a: "Gesekan", w: ["Gravitasi", "Magnet", "Pegas"] },
  { q: "Ketapel yang ditarik lalu dilepaskan menunjukkan adanya gaya...?", a: "Pegas", w: ["Gravitasi", "Magnet", "Gesekan"] },
  { q: "Gaya dapat mengubah bentuk suatu benda, contohnya adalah saat kita...?", a: "Meremas tanah liat", w: ["Membiarkan benda diam", "Melihat benda dari jauh", "Mencium bau benda"] },
  { q: "Gaya dapat mengubah arah gerak suatu benda, contohnya adalah saat kita...?", a: "Menendang bola yang sedang menggelinding", w: ["Membiarkan bola diam", "Melihat bola dari jauh", "Menimbang bola"] },
  { q: "Gaya gesekan pada rem sepeda berfungsi untuk...?", a: "Memperlambat atau menghentikan laju sepeda", w: ["Mempercepat laju sepeda", "Mengubah warna sepeda", "Menambah berat sepeda"] },
  { q: "Semakin kasar permukaan suatu benda, gaya gesekannya akan semakin...?", a: "Besar", w: ["Kecil", "Tidak ada", "Sama saja selalu"] },
  { q: "Benda yang dilempar ke atas pada akhirnya akan jatuh kembali ke bawah karena adanya gaya...?", a: "Gravitasi", w: ["Gesekan saja", "Magnet", "Pegas"] },
  { q: "Alat ukur yang digunakan untuk mengukur besarnya suatu gaya disebut...?", a: "Neraca pegas / Dinamometer", w: ["Termometer", "Barometer", "Amperemeter"] },
  { q: "Ban kendaraan dibuat beralur agar memiliki gaya gesekan yang lebih besar dengan jalan sehingga...?", a: "Tidak mudah tergelincir", w: ["Lebih mudah tergelincir", "Menjadi lebih ringan", "Menjadi lebih berat"] },
  { q: "Satuan yang digunakan untuk mengukur besarnya gaya dalam ilmu sains adalah...?", a: "Newton", w: ["Kilogram", "Meter", "Detik"] }
];

const skeletonMuscles: FactItem[] = [
  { q: "Rangka tubuh manusia tersusun dari kumpulan...?", a: "Tulang", w: ["Otot saja", "Kulit saja", "Darah saja"] },
  { q: "Fungsi utama rangka tubuh manusia adalah untuk...?", a: "Menopang dan memberi bentuk tubuh", w: ["Menghasilkan suara", "Mencerna makanan", "Mengedarkan darah saja"] },
  { q: "Selain menopang tubuh, rangka juga berfungsi untuk melindungi organ...?", a: "Dalam tubuh yang penting seperti otak dan jantung", w: ["Kulit luar saja", "Rambut", "Kuku"] },
  { q: "Tulang tengkorak berfungsi untuk melindungi...?", a: "Otak", w: ["Jantung", "Paru-paru", "Lambung"] },
  { q: "Tulang rusuk berfungsi untuk melindungi organ...?", a: "Jantung dan paru-paru", w: ["Otak", "Ginjal", "Usus"] },
  { q: "Tulang belakang berfungsi untuk melindungi...?", a: "Sumsum tulang belakang", w: ["Mata", "Telinga", "Hidung"] },
  { q: "Bagian tubuh yang menggerakkan tulang disebut...?", a: "Otot", w: ["Kulit", "Darah", "Saraf saja"] },
  { q: "Otot yang bekerja tanpa kita sadari, seperti otot jantung, disebut otot...?", a: "Tak sadar / Involunter", w: ["Sadar / Volunter", "Lurik saja", "Rangka murni"] },
  { q: "Otot yang bekerja sesuai kehendak kita, seperti otot kaki saat berjalan, disebut otot...?", a: "Sadar / Volunter", w: ["Tak sadar / Involunter", "Otot jantung", "Otot polos saja"] },
  { q: "Sendi adalah bagian tubuh yang menghubungkan antara...?", a: "Tulang dengan tulang lainnya", w: ["Otot dengan kulit", "Kulit dengan rambut", "Darah dengan saraf"] },
  { q: "Sendi pada siku dan lutut yang memungkinkan gerakan satu arah disebut sendi...?", a: "Engsel", w: ["Peluru", "Pelana", "Putar"] },
  { q: "Sendi pada bahu dan pinggul yang memungkinkan gerakan ke segala arah disebut sendi...?", a: "Peluru", w: ["Engsel", "Pelana", "Mati"] },
  { q: "Sendi pada leher yang memungkinkan kepala menoleh ke kanan dan kiri disebut sendi...?", a: "Putar", w: ["Engsel", "Peluru", "Mati"] },
  { q: "Kelainan tulang belakang yang membengkok ke samping disebut...?", a: "Skoliosis", w: ["Osteoporosis", "Fraktur", "Rakitis"] },
  { q: "Kekurangan kalsium dalam waktu lama dapat menyebabkan tulang menjadi...?", a: "Rapuh", w: ["Semakin kuat", "Semakin panjang", "Semakin lentur"] }
];

  return [
    ...buildFromFacts(ecosystems, "SCI_SD4", "SD Kelas 4", "Sains", 0),
    ...buildFromFacts(foodWeb, "SCI_SD4", "SD Kelas 4", "Sains", 20),
    ...buildFromFacts(adaptation, "SCI_SD4", "SD Kelas 4", "Sains", 40),
    ...buildFromFacts(forcesBasic, "SCI_SD4", "SD Kelas 4", "Sains", 65),
    ...buildFromFacts(skeletonMuscles, "SCI_SD4", "SD Kelas 4", "Sains", 85)
  ];
}

// Generate Sains SD Kelas 5 (11 tahun) — 100 questions
// Scope: human digestive/respiratory/circulatory systems, plant reproduction
// (pollination, vegetative/generative), solar system planets in order.
function generateScienceSD5(): Question[] {
const digestion: FactItem[] = [
  { q: "Proses tubuh mengolah makanan menjadi zat yang dapat diserap disebut sistem...?", a: "Pencernaan", w: ["Pernapasan", "Peredaran darah", "Rangka"] },
  { q: "Pencernaan makanan pertama kali terjadi di dalam...?", a: "Mulut", w: ["Lambung", "Usus halus", "Usus besar"] },
  { q: "Di dalam mulut, makanan dikunyah oleh gigi dan dibantu oleh...?", a: "Air liur (enzim ptialin)", w: ["Asam lambung", "Empedu", "Cairan usus"] },
  { q: "Setelah dari mulut, makanan akan melewati saluran yang disebut...?", a: "Kerongkongan", w: ["Usus halus", "Usus besar", "Anus"] },
  { q: "Gerakan meremas dan mendorong makanan di kerongkongan disebut gerak...?", a: "Peristaltik", w: ["Refleks", "Otomatis biasa", "Statis"] },
  { q: "Makanan dari kerongkongan selanjutnya masuk ke dalam...?", a: "Lambung", w: ["Usus besar", "Anus", "Hati"] },
  { q: "Di dalam lambung, makanan dicerna dengan bantuan cairan...?", a: "Asam lambung dan enzim", w: ["Air liur saja", "Empedu saja", "Udara"] },
  { q: "Setelah dari lambung, makanan yang sudah menjadi bubur akan masuk ke...?", a: "Usus halus", w: ["Kerongkongan", "Mulut", "Paru-paru"] },
  { q: "Penyerapan sari-sari makanan sebagian besar terjadi di dalam...?", a: "Usus halus", w: ["Lambung", "Usus besar", "Mulut"] },
  { q: "Sisa makanan yang tidak diserap tubuh akan menuju...?", a: "Usus besar", w: ["Usus halus", "Lambung", "Kerongkongan"] },
  { q: "Di dalam usus besar, sisa makanan mengalami proses penyerapan...?", a: "Air", w: ["Vitamin utama", "Protein utama", "Lemak utama"] },
  { q: "Sisa makanan yang sudah menjadi kotoran akan dikeluarkan tubuh melalui...?", a: "Anus", w: ["Mulut", "Hidung", "Telinga"] },
  { q: "Organ yang menghasilkan empedu untuk membantu mencerna lemak adalah...?", a: "Hati", w: ["Lambung", "Usus halus", "Pankreas"] },
  { q: "Organ yang menghasilkan enzim untuk membantu pencernaan di usus halus adalah...?", a: "Pankreas", w: ["Hati", "Lambung", "Ginjal"] },
  { q: "Gangguan pencernaan yang ditandai dengan sulit buang air besar disebut...?", a: "Sembelit", w: ["Diare", "Maag", "Tifus"] },
  { q: "Gangguan pencernaan yang ditandai dengan buang air besar terlalu sering dan cair disebut...?", a: "Diare", w: ["Sembelit", "Maag", "Sariawan"] },
  { q: "Penyakit yang menyerang lambung akibat asam lambung berlebih disebut...?", a: "Maag", w: ["Diare", "Sembelit", "Anemia"] },
  { q: "Untuk menjaga kesehatan pencernaan, kita dianjurkan makan makanan yang mengandung banyak...?", a: "Serat", w: ["Gula berlebih", "Minyak berlebih", "Garam berlebih"] },
  { q: "Gigi yang berfungsi untuk memotong makanan disebut gigi...?", a: "Seri", w: ["Taring", "Geraham", "Bungsu"] },
  { q: "Gigi yang berfungsi untuk mengunyah dan menggiling makanan disebut gigi...?", a: "Geraham", w: ["Seri", "Taring", "Susu"] }
];

const respiration: FactItem[] = [
  { q: "Proses tubuh mengambil oksigen dan mengeluarkan karbon dioksida disebut sistem...?", a: "Pernapasan", w: ["Pencernaan", "Peredaran darah", "Rangka"] },
  { q: "Udara pertama kali masuk ke dalam tubuh melalui...?", a: "Hidung", w: ["Mulut saja selalu", "Telinga", "Kulit"] },
  { q: "Di dalam hidung, udara akan disaring oleh...?", a: "Rambut halus dan lendir", w: ["Gigi", "Air liur", "Otot"] },
  { q: "Setelah dari hidung, udara akan melewati saluran yang disebut...?", a: "Tenggorokan", w: ["Kerongkongan", "Usus", "Lambung"] },
  { q: "Udara dari tenggorokan kemudian menuju...?", a: "Paru-paru", w: ["Lambung", "Usus", "Hati"] },
  { q: "Paru-paru terletak di dalam rongga...?", a: "Dada", w: ["Perut", "Kepala", "Punggung"] },
  { q: "Di dalam paru-paru terdapat kantung-kantung kecil tempat pertukaran gas yang disebut...?", a: "Alveolus", w: ["Bronkus", "Trakea", "Faring"] },
  { q: "Pertukaran gas oksigen dan karbon dioksida terjadi di dalam...?", a: "Alveolus", w: ["Trakea", "Hidung", "Mulut"] },
  { q: "Otot yang membantu proses pernapasan dengan cara mengembang dan mengempis disebut otot...?", a: "Diafragma", w: ["Otot jantung", "Otot lengan", "Otot mata"] },
  { q: "Saat kita menarik napas (inspirasi), rongga dada akan...?", a: "Membesar", w: ["Mengecil", "Tetap sama", "Menghilang"] },
  { q: "Saat kita menghembuskan napas (ekspirasi), rongga dada akan...?", a: "Mengecil", w: ["Membesar", "Tetap sama", "Menghilang"] },
  { q: "Gas yang dihirup tubuh untuk menghasilkan energi adalah...?", a: "Oksigen", w: ["Karbon dioksida", "Nitrogen murni", "Metana"] },
  { q: "Gas sisa hasil pernapasan yang dikeluarkan tubuh adalah...?", a: "Karbon dioksida", w: ["Oksigen murni", "Nitrogen", "Hidrogen"] },
  { q: "Penyakit yang menyerang saluran pernapasan akibat peradangan disebut...?", a: "Radang tenggorokan / Bronkitis", w: ["Diare", "Maag", "Sembelit"] },
  { q: "Merokok dapat merusak organ...?", a: "Paru-paru", w: ["Lambung saja", "Usus saja", "Kulit saja"] },
  { q: "Penyakit asma ditandai dengan gejala...?", a: "Sesak napas", w: ["Sakit gigi", "Sakit perut", "Sakit mata"] },
  { q: "Udara yang bersih dan segar penting untuk menjaga kesehatan...?", a: "Sistem pernapasan", w: ["Sistem pencernaan saja", "Sistem rangka saja", "Sistem panca indra saja"] },
  { q: "Olahraga secara rutin dapat membantu memperkuat kerja...?", a: "Paru-paru dan jantung", w: ["Gigi saja", "Rambut saja", "Kuku saja"] },
  { q: "Debu dan polusi udara dapat menyebabkan gangguan pada sistem...?", a: "Pernapasan", w: ["Peredaran darah saja", "Pencernaan saja", "Rangka saja"] },
  { q: "Cabang-cabang saluran udara di dalam paru-paru yang menuju alveolus disebut...?", a: "Bronkiolus", w: ["Trakea", "Faring", "Laring"] }
];

const circulation: FactItem[] = [
  { q: "Sistem tubuh yang berfungsi mengedarkan darah ke seluruh tubuh disebut sistem...?", a: "Peredaran darah", w: ["Pencernaan", "Pernapasan", "Rangka"] },
  { q: "Organ utama yang memompa darah ke seluruh tubuh adalah...?", a: "Jantung", w: ["Paru-paru", "Lambung", "Ginjal"] },
  { q: "Jantung manusia terdiri dari berapa ruang...?", a: "4 ruang", w: ["2 ruang", "3 ruang", "5 ruang"] },
  { q: "Pembuluh darah yang membawa darah kaya oksigen dari jantung ke seluruh tubuh disebut...?", a: "Arteri / Pembuluh nadi", w: ["Vena / Pembuluh balik", "Kapiler saja", "Limfa"] },
  { q: "Pembuluh darah yang membawa darah kembali ke jantung disebut...?", a: "Vena / Pembuluh balik", w: ["Arteri / Pembuluh nadi", "Kapiler saja", "Limfa"] },
  { q: "Pembuluh darah yang sangat kecil dan menghubungkan arteri dengan vena disebut...?", a: "Kapiler", w: ["Aorta", "Vena besar", "Bilik jantung"] },
  { q: "Sel darah yang berfungsi mengangkut oksigen ke seluruh tubuh adalah...?", a: "Sel darah merah", w: ["Sel darah putih", "Keping darah", "Plasma darah saja"] },
  { q: "Sel darah yang berfungsi melawan kuman dan penyakit adalah...?", a: "Sel darah putih", w: ["Sel darah merah", "Keping darah", "Plasma darah saja"] },
  { q: "Bagian darah yang berfungsi membantu proses pembekuan darah adalah...?", a: "Keping darah / Trombosit", w: ["Sel darah merah", "Sel darah putih", "Plasma darah"] },
  { q: "Cairan berwarna kekuningan yang menjadi bagian terbesar dari darah disebut...?", a: "Plasma darah", w: ["Sel darah merah", "Sel darah putih", "Trombosit"] },
  { q: "Warna merah pada darah disebabkan oleh zat yang disebut...?", a: "Hemoglobin", w: ["Plasma", "Trombosit", "Leukosit"] },
  { q: "Denyut jantung dapat dirasakan pada bagian tubuh seperti pergelangan tangan yang disebut...?", a: "Nadi", w: ["Vena besar", "Kapiler kecil", "Aorta saja"] },
  { q: "Penyakit kekurangan sel darah merah yang menyebabkan tubuh lemas disebut...?", a: "Anemia", w: ["Diare", "Maag", "Asma"] },
  { q: "Tekanan darah tinggi disebut juga dengan istilah...?", a: "Hipertensi", w: ["Hipotensi", "Anemia", "Leukemia"] },
  { q: "Untuk menjaga kesehatan jantung, kita dianjurkan menghindari makanan yang mengandung terlalu banyak...?", a: "Lemak jenuh dan garam berlebih", w: ["Serat", "Vitamin", "Air putih"] },
  { q: "Olahraga rutin dapat membantu menjaga kesehatan...?", a: "Jantung dan pembuluh darah", w: ["Rambut saja", "Kuku saja", "Gigi saja"] },
  { q: "Golongan darah manusia yang umum dikenal adalah A, B, AB, dan...?", a: "O", w: ["C", "D", "E"] },
  { q: "Donor darah bermanfaat untuk membantu orang yang membutuhkan...?", a: "Transfusi darah", w: ["Operasi mata", "Perawatan gigi", "Perawatan kulit"] },
  { q: "Darah berfungsi mengangkut sari-sari makanan ke seluruh...?", a: "Tubuh", w: ["Otak saja", "Paru-paru saja", "Kulit saja"] },
  { q: "Peredaran darah yang melalui paru-paru untuk mengambil oksigen disebut peredaran darah...?", a: "Kecil", w: ["Besar", "Ganda tanpa arah", "Tunggal statis"] }
];

const plantReproduction: FactItem[] = [
  { q: "Proses jatuhnya serbuk sari ke kepala putik pada bunga disebut...?", a: "Penyerbukan", w: ["Pembuahan", "Perkecambahan", "Fotosintesis"] },
  { q: "Alat kelamin jantan pada bunga disebut...?", a: "Benang sari", w: ["Putik", "Kelopak", "Mahkota"] },
  { q: "Alat kelamin betina pada bunga disebut...?", a: "Putik", w: ["Benang sari", "Kelopak", "Mahkota"] },
  { q: "Penyerbukan yang dibantu oleh serangga disebut penyerbukan dengan perantara...?", a: "Serangga (entomogami)", w: ["Angin (anemogami)", "Air (hidrogami)", "Manusia (antropogami)"] },
  { q: "Penyerbukan yang dibantu oleh angin disebut penyerbukan dengan perantara...?", a: "Angin (anemogami)", w: ["Serangga (entomogami)", "Air (hidrogami)", "Burung (ornitogami)"] },
  { q: "Penyerbukan yang dibantu oleh manusia, misalnya pada tanaman vanili, disebut penyerbukan...?", a: "Buatan (antropogami)", w: ["Alami oleh angin", "Alami oleh air", "Tanpa bantuan apapun"] },
  { q: "Perkembangbiakan tumbuhan yang melibatkan proses penyerbukan dan pembuahan disebut perkembangbiakan secara...?", a: "Generatif", w: ["Vegetatif", "Metamorfosis", "Aseksual murni"] },
  { q: "Perkembangbiakan tumbuhan tanpa melalui penyerbukan, misalnya dengan umbi atau stek, disebut perkembangbiakan secara...?", a: "Vegetatif", w: ["Generatif", "Metamorfosis", "Seksual"] },
  { q: "Perkembangbiakan vegetatif yang terjadi secara alami tanpa bantuan manusia disebut vegetatif...?", a: "Alami", w: ["Buatan", "Generatif", "Manual"] },
  { q: "Perkembangbiakan vegetatif yang dilakukan dengan bantuan manusia, seperti stek dan cangkok, disebut vegetatif...?", a: "Buatan", w: ["Alami", "Generatif", "Otomatis"] },
  { q: "Tumbuhan pisang berkembang biak secara vegetatif alami menggunakan...?", a: "Tunas", w: ["Umbi batang", "Umbi akar", "Spora"] },
  { q: "Tumbuhan kentang berkembang biak secara vegetatif alami menggunakan...?", a: "Umbi batang", w: ["Tunas", "Spora", "Biji"] },
  { q: "Tumbuhan bawang merah berkembang biak secara vegetatif alami menggunakan...?", a: "Umbi lapis", w: ["Umbi batang", "Spora", "Biji"] },
  { q: "Tumbuhan paku dan jamur berkembang biak menggunakan...?", a: "Spora", w: ["Biji", "Umbi", "Tunas"] },
  { q: "Perkembangbiakan vegetatif buatan dengan cara mengupas kulit batang dan membungkusnya hingga tumbuh akar disebut...?", a: "Cangkok", w: ["Stek", "Okulasi", "Merunduk"] },
  { q: "Perkembangbiakan vegetatif buatan dengan cara menanam potongan batang tumbuhan disebut...?", a: "Stek", w: ["Cangkok", "Okulasi", "Merunduk"] },
  { q: "Perkembangbiakan vegetatif buatan dengan cara menempelkan mata tunas dari tumbuhan lain disebut...?", a: "Okulasi", w: ["Cangkok", "Stek", "Merunduk"] },
  { q: "Setelah penyerbukan berhasil, proses berikutnya adalah pembuahan yang menghasilkan...?", a: "Biji dan buah", w: ["Akar baru", "Batang baru", "Daun baru"] },
  { q: "Bagian bunga yang berwarna-warni dan berfungsi menarik serangga penyerbuk disebut...?", a: "Mahkota bunga", w: ["Kelopak bunga", "Benang sari", "Putik"] },
  { q: "Bagian bunga yang melindungi kuncup bunga sebelum mekar disebut...?", a: "Kelopak bunga", w: ["Mahkota bunga", "Benang sari", "Putik"] }
];

const solarSystem: FactItem[] = [
  { q: "Kumpulan benda langit yang terdiri dari Matahari, planet, dan benda langit lainnya disebut...?", a: "Tata surya", w: ["Galaksi", "Rasi bintang", "Nebula"] },
  { q: "Pusat tata surya kita adalah...?", a: "Matahari", w: ["Bumi", "Bulan", "Bintang lain"] },
  { q: "Planet yang paling dekat dengan Matahari adalah...?", a: "Merkurius", w: ["Venus", "Bumi", "Mars"] },
  { q: "Planet kedua dari Matahari adalah...?", a: "Venus", w: ["Merkurius", "Bumi", "Mars"] },
  { q: "Planet tempat kita tinggal adalah planet ketiga dari Matahari yaitu...?", a: "Bumi", w: ["Mars", "Venus", "Merkurius"] },
  { q: "Planet keempat dari Matahari, yang berwarna kemerahan, adalah...?", a: "Mars", w: ["Bumi", "Jupiter", "Venus"] },
  { q: "Planet terbesar dalam tata surya kita adalah...?", a: "Jupiter", w: ["Saturnus", "Bumi", "Neptunus"] },
  { q: "Planet yang terkenal dengan cincinnya yang indah adalah...?", a: "Saturnus", w: ["Jupiter", "Uranus", "Mars"] },
  { q: "Planet yang berputar hampir menyamping (miring) adalah...?", a: "Uranus", w: ["Neptunus", "Saturnus", "Jupiter"] },
  { q: "Planet yang letaknya paling jauh dari Matahari dalam tata surya kita adalah...?", a: "Neptunus", w: ["Uranus", "Saturnus", "Pluto"] },
  { q: "Urutan planet dari Matahari yang benar dimulai dari Merkurius, Venus, Bumi, Mars, lalu...?", a: "Jupiter, Saturnus, Uranus, Neptunus", w: ["Pluto, Bulan, Bintang", "Matahari lagi", "Bumi, Venus, Merkurius"] },
  { q: "Benda langit yang mengelilingi planet disebut...?", a: "Satelit", w: ["Bintang", "Komet", "Asteroid"] },
  { q: "Satelit alami yang mengelilingi Bumi adalah...?", a: "Bulan", w: ["Matahari", "Mars", "Venus"] },
  { q: "Benda langit yang memiliki ekor bercahaya dan mengorbit Matahari dalam lintasan sangat lonjong disebut...?", a: "Komet", w: ["Asteroid", "Satelit", "Meteor"] },
  { q: "Kumpulan batuan kecil yang mengorbit Matahari, terutama di antara Mars dan Jupiter, disebut...?", a: "Asteroid", w: ["Komet", "Satelit", "Nebula"] },
  { q: "Benda langit yang terbakar habis saat memasuki atmosfer Bumi disebut...?", a: "Meteor", w: ["Meteorit", "Asteroid", "Komet"] },
  { q: "Benda langit dari luar angkasa yang berhasil jatuh dan mencapai permukaan Bumi disebut...?", a: "Meteorit", w: ["Meteor", "Komet", "Satelit"] },
  { q: "Matahari termasuk jenis benda langit yang disebut...?", a: "Bintang", w: ["Planet", "Satelit", "Komet"] },
  { q: "Bintang menghasilkan cahayanya sendiri, sedangkan planet...?", a: "Memantulkan cahaya Matahari", w: ["Juga menghasilkan cahaya sendiri", "Tidak memancarkan cahaya sama sekali", "Menyerap semua cahaya"] },
  { q: "Galaksi tempat tata surya kita berada disebut galaksi...?", a: "Bima Sakti", w: ["Andromeda", "Triangulum", "Ursa Major"] }
];

  return [
    ...buildFromFacts(digestion, "SCI_SD5", "SD Kelas 5", "Sains", 0),
    ...buildFromFacts(respiration, "SCI_SD5", "SD Kelas 5", "Sains", 20),
    ...buildFromFacts(circulation, "SCI_SD5", "SD Kelas 5", "Sains", 40),
    ...buildFromFacts(plantReproduction, "SCI_SD5", "SD Kelas 5", "Sains", 60),
    ...buildFromFacts(solarSystem, "SCI_SD5", "SD Kelas 5", "Sains", 80)
  ];
}

// Generate Sains SD Kelas 6 (12 tahun) — 100 questions
// Scope: series/parallel circuits, energy sources & conversion, animal
// reproduction classification, gravity & space, environmental conservation.
function generateScienceSD6(): Question[] {
const electricCircuits: FactItem[] = [
  { q: "Aliran listrik yang mengalir melalui suatu penghantar disebut...?", a: "Arus listrik", w: ["Gaya gravitasi", "Gaya magnet", "Gaya gesek"] },
  { q: "Rangkaian listrik yang disusun secara berurutan dalam satu jalur disebut rangkaian...?", a: "Seri", w: ["Paralel", "Campuran", "Terbuka"] },
  { q: "Rangkaian listrik yang disusun dengan beberapa jalur bercabang disebut rangkaian...?", a: "Paralel", w: ["Seri", "Tertutup total", "Statis"] },
  { q: "Pada rangkaian seri, jika salah satu lampu mati, lampu lainnya akan...?", a: "Ikut mati", w: ["Tetap menyala", "Menyala lebih terang", "Tidak terpengaruh"] },
  { q: "Pada rangkaian paralel, jika salah satu lampu mati, lampu lainnya akan...?", a: "Tetap menyala", w: ["Ikut mati", "Menyala lebih redup", "Meledak"] },
  { q: "Alat yang menghasilkan energi listrik dalam suatu rangkaian sederhana adalah...?", a: "Baterai / Sumber listrik", w: ["Kabel", "Sakelar", "Lampu"] },
  { q: "Alat yang digunakan untuk memutus dan menyambung aliran listrik disebut...?", a: "Sakelar", w: ["Baterai", "Kabel", "Sekring"] },
  { q: "Bahan yang dapat menghantarkan listrik dengan baik disebut...?", a: "Konduktor", w: ["Isolator", "Semikonduktor", "Non-logam"] },
  { q: "Bahan yang tidak dapat menghantarkan listrik disebut...?", a: "Isolator", w: ["Konduktor", "Semikonduktor", "Penghantar"] },
  { q: "Contoh bahan konduktor listrik yang baik adalah...?", a: "Tembaga dan besi", w: ["Karet dan plastik", "Kayu dan kertas", "Kaca dan kain"] },
  { q: "Contoh bahan isolator listrik yang baik adalah...?", a: "Karet dan plastik", w: ["Tembaga", "Besi", "Aluminium"] },
  { q: "Rangkaian listrik yang tersambung sempurna sehingga arus listrik dapat mengalir disebut rangkaian...?", a: "Tertutup", w: ["Terbuka", "Rusak", "Kosong"] },
  { q: "Rangkaian listrik yang terputus sehingga arus listrik tidak dapat mengalir disebut rangkaian...?", a: "Terbuka", w: ["Tertutup", "Seri sempurna", "Paralel sempurna"] },
  { q: "Alat yang digunakan untuk melindungi rangkaian listrik dari arus yang berlebihan disebut...?", a: "Sekring", w: ["Sakelar", "Baterai", "Kabel"] },
  { q: "Satuan yang digunakan untuk mengukur kuat arus listrik adalah...?", a: "Ampere", w: ["Volt", "Watt", "Ohm"] },
  { q: "Satuan yang digunakan untuk mengukur tegangan listrik adalah...?", a: "Volt", w: ["Ampere", "Watt", "Ohm"] },
  { q: "Lampu rumah yang dipasang secara paralel memiliki keuntungan yaitu...?", a: "Setiap lampu dapat dinyalakan atau dimatikan secara mandiri", w: ["Semua lampu selalu menyala atau mati bersamaan", "Menggunakan kabel lebih sedikit selalu", "Tidak membutuhkan sakelar"] },
  { q: "Rangkaian lampu hias yang mati semua saat satu lampu putus biasanya disusun secara...?", a: "Seri", w: ["Paralel", "Campuran sempurna", "Terbuka"] },
  { q: "Kabel listrik biasanya dilapisi dengan bahan karet atau plastik karena bahan tersebut bersifat...?", a: "Isolator sehingga aman disentuh", w: ["Konduktor sehingga mudah menghantarkan listrik", "Mudah terbakar", "Menghasilkan listrik sendiri"] },
  { q: "Sirkuit listrik sederhana minimal terdiri dari sumber listrik, kabel penghubung, dan...?", a: "Alat yang menggunakan listrik seperti lampu", w: ["Air", "Udara", "Tanah"] }
];

const energySources: FactItem[] = [
  { q: "Sumber energi yang dapat diperbarui dan tidak akan habis disebut sumber energi...?", a: "Terbarukan", w: ["Tak terbarukan", "Fosil", "Nuklir saja"] },
  { q: "Sumber energi yang jumlahnya terbatas dan akan habis jika terus digunakan disebut sumber energi...?", a: "Tak terbarukan", w: ["Terbarukan", "Matahari", "Angin"] },
  { q: "Contoh sumber energi terbarukan adalah...?", a: "Matahari, angin, dan air", w: ["Minyak bumi", "Batu bara", "Gas alam"] },
  { q: "Contoh sumber energi tak terbarukan adalah...?", a: "Minyak bumi, batu bara, dan gas alam", w: ["Sinar matahari", "Angin", "Air terjun"] },
  { q: "Energi yang berasal dari sinar matahari disebut energi...?", a: "Surya", w: ["Angin", "Air", "Panas bumi"] },
  { q: "Panel surya berfungsi mengubah energi matahari menjadi energi...?", a: "Listrik", w: ["Panas saja", "Bunyi", "Kimia saja"] },
  { q: "Energi yang dihasilkan dari aliran air, misalnya di bendungan, disebut energi...?", a: "Air / Hidro", w: ["Angin", "Surya", "Panas bumi"] },
  { q: "Energi yang dihasilkan dari hembusan angin disebut energi...?", a: "Angin / Bayu", w: ["Air", "Surya", "Panas bumi"] },
  { q: "Kincir angin biasanya digunakan untuk mengubah energi angin menjadi energi...?", a: "Listrik", w: ["Panas", "Bunyi", "Kimia"] },
  { q: "Energi panas yang berasal dari dalam bumi disebut energi...?", a: "Panas bumi / Geotermal", w: ["Surya", "Angin", "Air"] },
  { q: "Perubahan energi listrik menjadi energi cahaya terjadi pada...?", a: "Lampu", w: ["Kipas angin", "Setrika", "Speaker"] },
  { q: "Perubahan energi listrik menjadi energi gerak terjadi pada...?", a: "Kipas angin", w: ["Lampu", "Setrika", "Radio"] },
  { q: "Perubahan energi listrik menjadi energi panas terjadi pada...?", a: "Setrika", w: ["Lampu", "Kipas angin", "Radio"] },
  { q: "Perubahan energi listrik menjadi energi bunyi terjadi pada...?", a: "Speaker / Radio", w: ["Lampu", "Kipas angin", "Setrika"] },
  { q: "Energi kimia yang tersimpan dalam makanan akan berubah menjadi energi gerak saat kita...?", a: "Berolahraga", w: ["Tidur saja", "Diam saja", "Melihat saja"] },
  { q: "Baterai menyimpan energi dalam bentuk energi...?", a: "Kimia", w: ["Cahaya", "Bunyi", "Panas langsung"] },
  { q: "Hukum kekekalan energi menyatakan bahwa energi tidak dapat diciptakan atau dimusnahkan, tetapi hanya dapat...?", a: "Berubah bentuk", w: ["Hilang begitu saja", "Bertambah tanpa batas", "Berkurang tanpa sebab"] },
  { q: "Penggunaan energi terbarukan lebih ramah lingkungan karena...?", a: "Tidak menghasilkan polusi sebanyak energi fosil", w: ["Selalu lebih murah", "Lebih cepat habis", "Tidak dapat digunakan ulang"] },
  { q: "Menghemat penggunaan listrik dapat dilakukan dengan cara...?", a: "Mematikan lampu saat tidak digunakan", w: ["Menyalakan semua lampu terus-menerus", "Menggunakan alat listrik sebanyak mungkin", "Membiarkan alat elektronik menyala semalaman"] },
  { q: "Biogas yang dihasilkan dari kotoran hewan termasuk sumber energi...?", a: "Terbarukan", w: ["Tak terbarukan", "Fosil", "Nuklir"] }
];

const animalReproduction: FactItem[] = [
  { q: "Hewan yang berkembang biak dengan cara bertelur disebut...?", a: "Ovipar", w: ["Vivipar", "Ovovivipar", "Vegetatif"] },
  { q: "Hewan yang berkembang biak dengan cara melahirkan disebut...?", a: "Vivipar", w: ["Ovipar", "Ovovivipar", "Generatif tumbuhan"] },
  { q: "Hewan yang berkembang biak dengan cara bertelur namun telurnya menetas di dalam tubuh induk disebut...?", a: "Ovovivipar", w: ["Ovipar", "Vivipar", "Vegetatif"] },
  { q: "Ayam dan bebek termasuk hewan yang berkembang biak secara...?", a: "Ovipar", w: ["Vivipar", "Ovovivipar", "Vegetatif"] },
  { q: "Sapi dan kambing termasuk hewan yang berkembang biak secara...?", a: "Vivipar", w: ["Ovipar", "Ovovivipar", "Generatif"] },
  { q: "Ikan hiu dan beberapa jenis ular termasuk hewan yang berkembang biak secara...?", a: "Ovovivipar", w: ["Ovipar murni", "Vivipar murni", "Vegetatif"] },
  { q: "Kucing dan anjing termasuk hewan yang berkembang biak secara...?", a: "Vivipar", w: ["Ovipar", "Ovovivipar", "Generatif"] },
  { q: "Burung dan reptil pada umumnya berkembang biak secara...?", a: "Ovipar", w: ["Vivipar", "Ovovivipar", "Vegetatif"] },
  { q: "Hewan mamalia pada umumnya berkembang biak secara...?", a: "Vivipar", w: ["Ovipar", "Ovovivipar", "Generatif"] },
  { q: "Ikan pada umumnya berkembang biak secara...?", a: "Ovipar", w: ["Vivipar", "Ovovivipar", "Vegetatif"] },
  { q: "Paus dan lumba-lumba meskipun hidup di air termasuk hewan yang berkembang biak secara...?", a: "Vivipar", w: ["Ovipar", "Ovovivipar", "Vegetatif"] },
  { q: "Salah satu ciri hewan vivipar adalah anaknya lahir dengan cara...?", a: "Dilahirkan langsung dari induknya", w: ["Menetas dari telur di luar tubuh induk", "Membelah diri", "Bertunas"] },
  { q: "Salah satu ciri hewan ovipar adalah induknya biasanya akan...?", a: "Mengerami telurnya hingga menetas", w: ["Melahirkan anak langsung", "Membelah diri", "Bertunas seperti tumbuhan"] },
  { q: "Platipus adalah salah satu contoh hewan mamalia yang unik karena berkembang biak secara...?", a: "Ovipar (bertelur)", w: ["Vivipar seperti mamalia lainnya", "Ovovivipar", "Vegetatif"] },
  { q: "Kadal termasuk salah satu reptil yang ada jenisnya berkembang biak secara...?", a: "Ovovivipar", w: ["Vivipar murni", "Ovipar murni saja", "Vegetatif"] },
  { q: "Katak termasuk hewan yang berkembang biak secara...?", a: "Ovipar", w: ["Vivipar", "Ovovivipar", "Vegetatif"] },
  { q: "Kelelawar, meskipun bisa terbang seperti burung, termasuk hewan mamalia yang berkembang biak secara...?", a: "Vivipar", w: ["Ovipar", "Ovovivipar", "Vegetatif"] },
  { q: "Buaya termasuk hewan yang berkembang biak secara...?", a: "Ovipar", w: ["Vivipar", "Ovovivipar", "Vegetatif"] },
  { q: "Salah satu keuntungan hewan vivipar adalah anaknya cenderung mendapat perlindungan lebih baik karena berkembang di dalam...?", a: "Tubuh induknya", w: ["Cangkang telur di luar tubuh induk", "Sarang tanpa induk", "Air tanpa perlindungan"] },
  { q: "Cara berkembang biak suatu hewan biasanya berkaitan erat dengan lingkungan tempat hewan itu...?", a: "Hidup dan beradaptasi", w: ["Tidur saja", "Bermain saja", "Diam saja"] }
];

const gravitySpace: FactItem[] = [
  { q: "Gaya tarik yang dimiliki Bumi untuk menarik benda ke arahnya disebut gaya...?", a: "Gravitasi", w: ["Gesekan", "Magnet", "Pegas"] },
  { q: "Karena adanya gaya gravitasi, benda yang dilempar ke atas pada akhirnya akan...?", a: "Jatuh kembali ke bawah", w: ["Melayang selamanya", "Terbang ke luar angkasa", "Menghilang"] },
  { q: "Semakin besar massa suatu benda langit, gaya gravitasinya akan semakin...?", a: "Besar", w: ["Kecil", "Tidak berpengaruh", "Hilang"] },
  { q: "Di ruang angkasa yang jauh dari Bumi, astronot akan mengalami kondisi...?", a: "Tanpa gravitasi / Melayang", w: ["Gravitasi lebih besar dari Bumi", "Gravitasi sama persis dengan Bumi", "Tidak dapat bergerak sama sekali"] },
  { q: "Gaya gravitasi Bulan lebih kecil dibandingkan gaya gravitasi Bumi, sehingga benda di Bulan terasa lebih...?", a: "Ringan", w: ["Berat", "Sama saja", "Tidak berbobot"] },
  { q: "Peristiwa pasang surut air laut sebagian besar dipengaruhi oleh gaya gravitasi...?", a: "Bulan", w: ["Bintang", "Awan", "Angin"] },
  { q: "Bumi tetap mengorbit Matahari karena adanya gaya gravitasi dari...?", a: "Matahari", w: ["Bulan saja", "Bumi itu sendiri", "Bintang lain"] },
  { q: "Peristiwa gerhana matahari terjadi ketika posisi Bulan berada di antara Matahari dan...?", a: "Bumi", w: ["Bintang lain", "Planet lain", "Galaksi lain"] },
  { q: "Peristiwa gerhana bulan terjadi ketika posisi Bumi berada di antara Matahari dan...?", a: "Bulan", w: ["Bintang lain", "Planet lain", "Galaksi lain"] },
  { q: "Cahaya yang kita lihat dari Bulan sebenarnya berasal dari...?", a: "Pantulan cahaya Matahari", w: ["Cahaya Bulan sendiri", "Cahaya bintang lain", "Cahaya Bumi"] },
  { q: "Rasi bintang adalah kumpulan bintang yang membentuk...?", a: "Pola tertentu di langit", w: ["Satu planet besar", "Satu galaksi tunggal", "Satu komet besar"] },
  { q: "Alat yang digunakan para ilmuwan untuk mengamati benda langit dari jauh disebut...?", a: "Teleskop", w: ["Mikroskop", "Termometer", "Barometer"] },
  { q: "Astronot memerlukan pakaian khusus di luar angkasa karena kondisi di sana tidak memiliki...?", a: "Udara untuk bernapas", w: ["Gravitasi berlebih", "Suhu yang stabil selalu", "Cahaya sama sekali"] },
  { q: "Roket digunakan untuk membawa manusia atau satelit ke luar angkasa dengan cara melawan gaya...?", a: "Gravitasi Bumi", w: ["Gesekan air", "Magnet bumi", "Angin"] },
  { q: "Satelit buatan yang mengorbit Bumi digunakan untuk berbagai keperluan seperti...?", a: "Komunikasi dan pengamatan cuaca", w: ["Menghasilkan makanan", "Menghasilkan air bersih", "Mengubah warna langit"] },
  { q: "Bintang yang paling dekat dengan Bumi setelah Matahari berjarak sangat...?", a: "Jauh, bertahun-tahun cahaya", w: ["Dekat, hanya beberapa kilometer", "Sama dengan jarak ke Bulan", "Sama dengan jarak ke Mars"] },
  { q: "Fase bulan yang terlihat bulat penuh disebut...?", a: "Bulan purnama", w: ["Bulan baru", "Bulan sabit", "Bulan separuh saja selalu"] },
  { q: "Fase ketika bulan tidak terlihat sama sekali dari Bumi disebut...?", a: "Bulan baru", w: ["Bulan purnama", "Bulan sabit", "Bulan cembung"] },
  { q: "Berat suatu benda dapat berubah tergantung besarnya gravitasi tempat benda itu berada, namun massanya akan...?", a: "Tetap sama", w: ["Ikut berubah selalu", "Menjadi nol", "Bertambah besar"] },
  { q: "Ilmuwan yang mempelajari tentang benda-benda langit disebut...?", a: "Astronom", w: ["Ahli geologi", "Ahli biologi", "Ahli kimia"] }
];

const conservationEvolution: FactItem[] = [
  { q: "Upaya menjaga dan melindungi lingkungan alam beserta makhluk hidup di dalamnya disebut...?", a: "Pelestarian lingkungan / Konservasi", w: ["Eksploitasi", "Perburuan liar", "Penggundulan hutan"] },
  { q: "Hutan yang dijadikan kawasan lindung untuk melestarikan flora dan fauna disebut...?", a: "Cagar alam / Taman nasional", w: ["Perkebunan sawit", "Kawasan industri", "Tempat pembuangan sampah"] },
  { q: "Salah satu dampak dari penebangan hutan secara liar adalah...?", a: "Hilangnya habitat satwa liar", w: ["Bertambahnya jumlah hewan langka", "Udara menjadi lebih bersih", "Tanah menjadi lebih subur"] },
  { q: "Hewan yang jumlahnya sangat sedikit dan terancam punah disebut hewan...?", a: "Langka", w: ["Umum", "Peliharaan", "Ternak"] },
  { q: "Salah satu cara melestarikan hewan langka adalah dengan mendirikan...?", a: "Suaka margasatwa", w: ["Pabrik", "Perumahan padat", "Tempat pembuangan sampah"] },
  { q: "Daur ulang sampah dapat membantu mengurangi...?", a: "Pencemaran lingkungan", w: ["Jumlah pepohonan", "Populasi hewan", "Sumber air bersih"] },
  { q: "Penggunaan kendaraan bermotor secara berlebihan dapat menyebabkan...?", a: "Polusi udara", w: ["Udara lebih bersih", "Air lebih jernih", "Tanah lebih subur"] },
  { q: "Perubahan bertahap pada makhluk hidup dalam jangka waktu yang sangat lama untuk menyesuaikan diri dengan lingkungan disebut...?", a: "Evolusi", w: ["Metamorfosis", "Fotosintesis", "Adaptasi instan"] },
  { q: "Makhluk hidup yang tidak mampu beradaptasi dengan perubahan lingkungan dalam jangka panjang berisiko mengalami...?", a: "Kepunahan", w: ["Perkembangan pesat", "Penambahan populasi", "Perubahan warna instan"] },
  { q: "Reboisasi adalah kegiatan menanam kembali pohon di lahan yang...?", a: "Gundul atau rusak", w: ["Sudah sangat subur", "Sudah menjadi kota", "Sudah menjadi laut"] },
  { q: "Salah satu manfaat menjaga hutan adalah sebagai penghasil...?", a: "Oksigen dan penyerap karbon dioksida", w: ["Polusi udara", "Sampah plastik", "Asap kendaraan"] },
  { q: "Pencemaran air dapat disebabkan oleh pembuangan limbah pabrik yang tidak diolah dengan...?", a: "Baik / Benar", w: ["Cepat", "Mahal", "Berlebihan sengaja"] },
  { q: "Global warming atau pemanasan global sebagian disebabkan oleh meningkatnya gas...?", a: "Rumah kaca seperti karbon dioksida", w: ["Oksigen murni", "Uap air murni", "Gas mulia"] },
  { q: "Salah satu cara sederhana menjaga lingkungan yang bisa dilakukan anak-anak adalah dengan...?", a: "Membuang sampah pada tempatnya", w: ["Membakar sampah sembarangan", "Menebang pohon sembarangan", "Membuang sampah ke sungai"] },
  { q: "Hewan purba yang telah punah dan hanya dikenal melalui fosil, seperti dinosaurus, menunjukkan bahwa kehidupan di Bumi terus mengalami...?", a: "Perubahan dalam waktu yang sangat panjang", w: ["Tidak pernah berubah sama sekali", "Berubah dalam hitungan hari", "Berubah karena sihir"] },
  { q: "Fosil adalah sisa-sisa makhluk hidup purba yang telah membatu dan menjadi bukti penting untuk mempelajari...?", a: "Sejarah kehidupan di Bumi", w: ["Cuaca hari ini", "Warna langit", "Suhu udara saat ini"] },
  { q: "Penangkaran hewan langka bertujuan untuk membantu meningkatkan...?", a: "Populasi hewan tersebut agar tidak punah", w: ["Perburuan liar", "Perdagangan ilegal", "Kerusakan habitat"] },
  { q: "Salah satu contoh hewan yang berhasil dilestarikan melalui upaya konservasi di Indonesia adalah...?", a: "Badak bercula satu dan komodo", w: ["Ayam kampung", "Kucing rumahan", "Ikan mas biasa"] },
  { q: "Menjaga keanekaragaman hayati penting karena setiap makhluk hidup memiliki peran dalam menjaga keseimbangan...?", a: "Ekosistem", w: ["Harga pasar", "Jumlah penduduk", "Cuaca harian"] },
  { q: "Salah satu bentuk kepedulian terhadap lingkungan yang bisa dilakukan sehari-hari adalah menghemat penggunaan...?", a: "Air dan listrik", w: ["Waktu bermain", "Buku pelajaran", "Alat tulis"] }
];

  return [
    ...buildFromFacts(electricCircuits, "SCI_SD6", "SD Kelas 6", "Sains", 0),
    ...buildFromFacts(energySources, "SCI_SD6", "SD Kelas 6", "Sains", 20),
    ...buildFromFacts(animalReproduction, "SCI_SD6", "SD Kelas 6", "Sains", 40),
    ...buildFromFacts(gravitySpace, "SCI_SD6", "SD Kelas 6", "Sains", 60),
    ...buildFromFacts(conservationEvolution, "SCI_SD6", "SD Kelas 6", "Sains", 80)
  ];
}

// ==========================================
// BATCH 2 — BAHASA INGGRIS: Preschool 1 & 2, SD Kelas 1-6
// ==========================================

// Generate Bahasa Inggris Preschool 1 (2 tahun) — 100 questions
// Scope: animal, family, and body-part vocabulary; basic greetings.
function generateEnglishPreschool1(): Question[] {
const animalWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Kucing'?", a: "Cat", w: ["Dog", "Bird", "Fish"] },
  { q: "Apakah bahasa Inggris dari 'Anjing'?", a: "Dog", w: ["Cat", "Bird", "Fish"] },
  { q: "Apakah bahasa Inggris dari 'Ikan'?", a: "Fish", w: ["Cat", "Dog", "Bird"] },
  { q: "Apakah bahasa Inggris dari 'Burung'?", a: "Bird", w: ["Cat", "Dog", "Fish"] },
  { q: "Apakah bahasa Inggris dari 'Sapi'?", a: "Cow", w: ["Goat", "Duck", "Pig"] },
  { q: "Apakah bahasa Inggris dari 'Kambing'?", a: "Goat", w: ["Cow", "Duck", "Pig"] },
  { q: "Apakah bahasa Inggris dari 'Bebek'?", a: "Duck", w: ["Cow", "Goat", "Pig"] },
  { q: "Apakah bahasa Inggris dari 'Babi'?", a: "Pig", w: ["Cow", "Goat", "Duck"] },
  { q: "Apakah bahasa Inggris dari 'Ayam'?", a: "Chicken", w: ["Duck", "Cow", "Goat"] },
  { q: "Apakah bahasa Inggris dari 'Kelinci'?", a: "Rabbit", w: ["Cat", "Dog", "Fish"] },
  { q: "Apakah bahasa Inggris dari 'Gajah'?", a: "Elephant", w: ["Lion", "Tiger", "Bear"] },
  { q: "Apakah bahasa Inggris dari 'Singa'?", a: "Lion", w: ["Elephant", "Tiger", "Bear"] },
  { q: "Apakah bahasa Inggris dari 'Harimau'?", a: "Tiger", w: ["Elephant", "Lion", "Bear"] },
  { q: "Apakah bahasa Inggris dari 'Beruang'?", a: "Bear", w: ["Elephant", "Lion", "Tiger"] },
  { q: "Apakah bahasa Inggris dari 'Kuda'?", a: "Horse", w: ["Cow", "Goat", "Pig"] },
  { q: "Apakah bahasa Inggris dari 'Monyet'?", a: "Monkey", w: ["Lion", "Bear", "Tiger"] },
  { q: "Apakah bahasa Inggris dari 'Ular'?", a: "Snake", w: ["Fish", "Bird", "Frog"] },
  { q: "Apakah bahasa Inggris dari 'Katak'?", a: "Frog", w: ["Snake", "Fish", "Bird"] },
  { q: "Apakah bahasa Inggris dari 'Kupu-kupu'?", a: "Butterfly", w: ["Bee", "Ant", "Spider"] },
  { q: "Apakah bahasa Inggris dari 'Lebah'?", a: "Bee", w: ["Butterfly", "Ant", "Spider"] },
  { q: "Apakah bahasa Inggris dari 'Semut'?", a: "Ant", w: ["Bee", "Butterfly", "Spider"] },
  { q: "Apakah bahasa Inggris dari 'Laba-laba'?", a: "Spider", w: ["Ant", "Bee", "Butterfly"] },
  { q: "Apakah bahasa Inggris dari 'Tikus'?", a: "Mouse", w: ["Cat", "Dog", "Rabbit"] },
  { q: "Apakah bahasa Inggris dari 'Domba'?", a: "Sheep", w: ["Goat", "Cow", "Pig"] },
  { q: "Apakah bahasa Inggris dari 'Kura-kura'?", a: "Turtle", w: ["Frog", "Snake", "Fish"] }
];

const familyWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Ibu'?", a: "Mother", w: ["Father", "Sister", "Brother"] },
  { q: "Apakah bahasa Inggris dari 'Ayah'?", a: "Father", w: ["Mother", "Sister", "Brother"] },
  { q: "Apakah bahasa Inggris dari 'Kakak Perempuan / Adik Perempuan'?", a: "Sister", w: ["Brother", "Mother", "Father"] },
  { q: "Apakah bahasa Inggris dari 'Kakak Laki-laki / Adik Laki-laki'?", a: "Brother", w: ["Sister", "Mother", "Father"] },
  { q: "Apakah bahasa Inggris dari 'Nenek'?", a: "Grandmother", w: ["Grandfather", "Aunt", "Uncle"] },
  { q: "Apakah bahasa Inggris dari 'Kakek'?", a: "Grandfather", w: ["Grandmother", "Aunt", "Uncle"] },
  { q: "Apakah bahasa Inggris dari 'Bibi / Tante'?", a: "Aunt", w: ["Uncle", "Grandmother", "Grandfather"] },
  { q: "Apakah bahasa Inggris dari 'Paman / Om'?", a: "Uncle", w: ["Aunt", "Grandmother", "Grandfather"] },
  { q: "Apakah bahasa Inggris dari 'Anak Perempuan'?", a: "Daughter", w: ["Son", "Sister", "Mother"] },
  { q: "Apakah bahasa Inggris dari 'Anak Laki-laki'?", a: "Son", w: ["Daughter", "Brother", "Father"] },
  { q: "Apakah bahasa Inggris dari 'Keluarga'?", a: "Family", w: ["Friend", "House", "School"] },
  { q: "Apakah bahasa Inggris dari 'Bayi'?", a: "Baby", w: ["Child", "Adult", "Teenager"] },
  { q: "Apakah bahasa Inggris dari 'Sepupu'?", a: "Cousin", w: ["Sister", "Brother", "Aunt"] },
  { q: "What is 'Mother' in Indonesian?", a: "Ibu", w: ["Ayah", "Kakak", "Nenek"] },
  { q: "What is 'Father' in Indonesian?", a: "Ayah", w: ["Ibu", "Kakak", "Kakek"] },
  { q: "What is 'Grandmother' in Indonesian?", a: "Nenek", w: ["Kakek", "Bibi", "Ibu"] },
  { q: "What is 'Grandfather' in Indonesian?", a: "Kakek", w: ["Nenek", "Paman", "Ayah"] },
  { q: "What is 'Sister' in Indonesian?", a: "Kakak/Adik Perempuan", w: ["Kakak/Adik Laki-laki", "Ibu", "Bibi"] },
  { q: "What is 'Brother' in Indonesian?", a: "Kakak/Adik Laki-laki", w: ["Kakak/Adik Perempuan", "Ayah", "Paman"] },
  { q: "What is 'Family' in Indonesian?", a: "Keluarga", w: ["Teman", "Rumah", "Sekolah"] },
  { q: "What is 'Baby' in Indonesian?", a: "Bayi", w: ["Anak", "Dewasa", "Remaja"] },
  { q: "What is 'Aunt' in Indonesian?", a: "Bibi / Tante", w: ["Paman", "Nenek", "Kakek"] },
  { q: "What is 'Uncle' in Indonesian?", a: "Paman / Om", w: ["Bibi", "Nenek", "Kakek"] },
  { q: "What is 'Son' in Indonesian?", a: "Anak Laki-laki", w: ["Anak Perempuan", "Kakak", "Ayah"] },
  { q: "What is 'Daughter' in Indonesian?", a: "Anak Perempuan", w: ["Anak Laki-laki", "Adik", "Ibu"] }
];

const bodyPartWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Kepala'?", a: "Head", w: ["Hand", "Foot", "Ear"] },
  { q: "Apakah bahasa Inggris dari 'Tangan'?", a: "Hand", w: ["Head", "Foot", "Ear"] },
  { q: "Apakah bahasa Inggris dari 'Kaki'?", a: "Foot", w: ["Hand", "Head", "Ear"] },
  { q: "Apakah bahasa Inggris dari 'Mata'?", a: "Eye", w: ["Ear", "Nose", "Mouth"] },
  { q: "Apakah bahasa Inggris dari 'Telinga'?", a: "Ear", w: ["Eye", "Nose", "Mouth"] },
  { q: "Apakah bahasa Inggris dari 'Hidung'?", a: "Nose", w: ["Ear", "Eye", "Mouth"] },
  { q: "Apakah bahasa Inggris dari 'Mulut'?", a: "Mouth", w: ["Ear", "Eye", "Nose"] },
  { q: "Apakah bahasa Inggris dari 'Rambut'?", a: "Hair", w: ["Head", "Hand", "Foot"] },
  { q: "Apakah bahasa Inggris dari 'Gigi'?", a: "Teeth", w: ["Mouth", "Ear", "Nose"] },
  { q: "Apakah bahasa Inggris dari 'Jari'?", a: "Finger", w: ["Hand", "Foot", "Arm"] },
  { q: "Apakah bahasa Inggris dari 'Lengan'?", a: "Arm", w: ["Leg", "Hand", "Foot"] },
  { q: "Apakah bahasa Inggris dari 'Kaki (tungkai)'?", a: "Leg", w: ["Arm", "Hand", "Foot"] },
  { q: "Apakah bahasa Inggris dari 'Perut'?", a: "Stomach / Belly", w: ["Chest", "Back", "Neck"] },
  { q: "Apakah bahasa Inggris dari 'Leher'?", a: "Neck", w: ["Stomach", "Chest", "Back"] },
  { q: "Apakah bahasa Inggris dari 'Punggung'?", a: "Back", w: ["Stomach", "Chest", "Neck"] },
  { q: "What is 'Head' in Indonesian?", a: "Kepala", w: ["Tangan", "Kaki", "Telinga"] },
  { q: "What is 'Hand' in Indonesian?", a: "Tangan", w: ["Kepala", "Kaki", "Telinga"] },
  { q: "What is 'Foot' in Indonesian?", a: "Kaki", w: ["Tangan", "Kepala", "Telinga"] },
  { q: "What is 'Eye' in Indonesian?", a: "Mata", w: ["Telinga", "Hidung", "Mulut"] },
  { q: "What is 'Ear' in Indonesian?", a: "Telinga", w: ["Mata", "Hidung", "Mulut"] },
  { q: "What is 'Nose' in Indonesian?", a: "Hidung", w: ["Telinga", "Mata", "Mulut"] },
  { q: "What is 'Mouth' in Indonesian?", a: "Mulut", w: ["Telinga", "Mata", "Hidung"] },
  { q: "What is 'Hair' in Indonesian?", a: "Rambut", w: ["Kepala", "Tangan", "Kaki"] },
  { q: "What is 'Finger' in Indonesian?", a: "Jari", w: ["Tangan", "Kaki", "Lengan"] },
  { q: "What is 'Arm' in Indonesian?", a: "Lengan", w: ["Kaki", "Tangan", "Jari"] }
];

const greetingWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Halo'?", a: "Hello", w: ["Bye", "Sorry", "Please"] },
  { q: "Apakah bahasa Inggris dari 'Selamat Tinggal / Sampai Jumpa'?", a: "Bye / Goodbye", w: ["Hello", "Thanks", "Sorry"] },
  { q: "Apakah bahasa Inggris dari 'Terima Kasih'?", a: "Thank you", w: ["Sorry", "Please", "Hello"] },
  { q: "Apakah bahasa Inggris dari 'Tolong'?", a: "Please", w: ["Thank you", "Sorry", "Hello"] },
  { q: "Apakah bahasa Inggris dari 'Maaf'?", a: "Sorry", w: ["Please", "Thank you", "Hello"] },
  { q: "Apakah bahasa Inggris dari 'Selamat Pagi'?", a: "Good morning", w: ["Good night", "Good afternoon", "Good evening"] },
  { q: "Apakah bahasa Inggris dari 'Selamat Malam'?", a: "Good night", w: ["Good morning", "Good afternoon", "Good evening"] },
  { q: "Apakah bahasa Inggris dari 'Selamat Siang'?", a: "Good afternoon", w: ["Good morning", "Good night", "Good evening"] },
  { q: "Apakah bahasa Inggris dari 'Ya'?", a: "Yes", w: ["No", "Maybe", "Please"] },
  { q: "Apakah bahasa Inggris dari 'Tidak'?", a: "No", w: ["Yes", "Maybe", "Please"] },
  { q: "Apakah bahasa Inggris dari 'Apa Kabar?'?", a: "How are you?", w: ["What is your name?", "Where are you?", "Who are you?"] },
  { q: "Apakah bahasa Inggris dari 'Siapa Namamu?'?", a: "What is your name?", w: ["How are you?", "Where are you?", "How old are you?"] },
  { q: "What is 'Hello' in Indonesian?", a: "Halo", w: ["Selamat Tinggal", "Maaf", "Tolong"] },
  { q: "What is 'Thank you' in Indonesian?", a: "Terima Kasih", w: ["Maaf", "Tolong", "Halo"] },
  { q: "What is 'Please' in Indonesian?", a: "Tolong", w: ["Terima Kasih", "Maaf", "Halo"] },
  { q: "What is 'Sorry' in Indonesian?", a: "Maaf", w: ["Tolong", "Terima Kasih", "Halo"] },
  { q: "What is 'Good morning' in Indonesian?", a: "Selamat Pagi", w: ["Selamat Malam", "Selamat Siang", "Selamat Sore"] },
  { q: "What is 'Good night' in Indonesian?", a: "Selamat Malam", w: ["Selamat Pagi", "Selamat Siang", "Selamat Sore"] },
  { q: "What is 'Yes' in Indonesian?", a: "Ya", w: ["Tidak", "Mungkin", "Tolong"] },
  { q: "What is 'No' in Indonesian?", a: "Tidak", w: ["Ya", "Mungkin", "Tolong"] },
  { q: "Kita mengucapkan 'Please' saat kita ingin...?", a: "Meminta sesuatu dengan sopan", w: ["Mengucapkan selamat tinggal", "Meminta maaf", "Menyapa"] },
  { q: "Kita mengucapkan 'Sorry' saat kita...?", a: "Meminta maaf", w: ["Menyapa", "Berterima kasih", "Mengucapkan selamat tinggal"] },
  { q: "Kita mengucapkan 'Thank you' saat...?", a: "Berterima kasih", w: ["Meminta maaf", "Menyapa", "Mengucapkan selamat tinggal"] },
  { q: "Apakah bahasa Inggris dari 'Selamat Sore'?", a: "Good evening", w: ["Good morning", "Good afternoon", "Good night"] },
  { q: "What is 'Good evening' in Indonesian?", a: "Selamat Sore/Malam", w: ["Selamat Pagi", "Selamat Siang", "Selamat Tidur"] }
];

  return [
    ...buildFromFacts(animalWords, "ENG_PS1", "Preschool 1 (2 thn)", "Bahasa Inggris", 0),
    ...buildFromFacts(familyWords, "ENG_PS1", "Preschool 1 (2 thn)", "Bahasa Inggris", 25),
    ...buildFromFacts(bodyPartWords, "ENG_PS1", "Preschool 1 (2 thn)", "Bahasa Inggris", 50),
    ...buildFromFacts(greetingWords, "ENG_PS1", "Preschool 1 (2 thn)", "Bahasa Inggris", 75)
  ];
}

// Generate Bahasa Inggris Preschool 2 (3 tahun) — 100 questions
// Scope: food/drink vocabulary, numbers 1-20, new action verbs (distinct
// from TK B verb set), and opposites beyond TK B Advanced coverage.
function generateEnglishPreschool2(): Question[] {
const foodDrinkWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Nasi'?", a: "Rice", w: ["Bread", "Egg", "Milk"] },
  { q: "Apakah bahasa Inggris dari 'Roti'?", a: "Bread", w: ["Rice", "Egg", "Milk"] },
  { q: "Apakah bahasa Inggris dari 'Telur'?", a: "Egg", w: ["Rice", "Bread", "Milk"] },
  { q: "Apakah bahasa Inggris dari 'Susu'?", a: "Milk", w: ["Water", "Juice", "Tea"] },
  { q: "Apakah bahasa Inggris dari 'Air'?", a: "Water", w: ["Milk", "Juice", "Tea"] },
  { q: "Apakah bahasa Inggris dari 'Jus'?", a: "Juice", w: ["Water", "Milk", "Tea"] },
  { q: "Apakah bahasa Inggris dari 'Apel'?", a: "Apple", w: ["Banana", "Orange", "Grape"] },
  { q: "Apakah bahasa Inggris dari 'Pisang'?", a: "Banana", w: ["Apple", "Orange", "Grape"] },
  { q: "Apakah bahasa Inggris dari 'Jeruk'?", a: "Orange", w: ["Apple", "Banana", "Grape"] },
  { q: "Apakah bahasa Inggris dari 'Anggur'?", a: "Grape", w: ["Apple", "Banana", "Orange"] },
  { q: "Apakah bahasa Inggris dari 'Ayam Goreng'?", a: "Fried Chicken", w: ["Fried Rice", "Fried Egg", "Fried Fish"] },
  { q: "Apakah bahasa Inggris dari 'Sayur'?", a: "Vegetable", w: ["Fruit", "Meat", "Bread"] },
  { q: "Apakah bahasa Inggris dari 'Daging'?", a: "Meat", w: ["Vegetable", "Fruit", "Rice"] },
  { q: "Apakah bahasa Inggris dari 'Ikan'?", a: "Fish", w: ["Meat", "Vegetable", "Fruit"] },
  { q: "Apakah bahasa Inggris dari 'Gula'?", a: "Sugar", w: ["Salt", "Rice", "Milk"] },
  { q: "Apakah bahasa Inggris dari 'Garam'?", a: "Salt", w: ["Sugar", "Rice", "Milk"] },
  { q: "Apakah bahasa Inggris dari 'Kue'?", a: "Cake", w: ["Bread", "Rice", "Egg"] },
  { q: "Apakah bahasa Inggris dari 'Es Krim'?", a: "Ice Cream", w: ["Cake", "Bread", "Juice"] },
  { q: "Apakah bahasa Inggris dari 'Cokelat'?", a: "Chocolate", w: ["Candy", "Cake", "Bread"] },
  { q: "Apakah bahasa Inggris dari 'Permen'?", a: "Candy", w: ["Chocolate", "Cake", "Bread"] },
  { q: "What is 'Rice' in Indonesian?", a: "Nasi", w: ["Roti", "Telur", "Susu"] },
  { q: "What is 'Water' in Indonesian?", a: "Air", w: ["Susu", "Jus", "Teh"] },
  { q: "What is 'Apple' in Indonesian?", a: "Apel", w: ["Pisang", "Jeruk", "Anggur"] },
  { q: "What is 'Vegetable' in Indonesian?", a: "Sayur", w: ["Buah", "Daging", "Roti"] },
  { q: "What is 'Meat' in Indonesian?", a: "Daging", w: ["Sayur", "Buah", "Nasi"] }
];

const numberWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari angka 1?", a: "One", w: ["Two", "Three", "Four"] },
  { q: "Apakah bahasa Inggris dari angka 2?", a: "Two", w: ["One", "Three", "Four"] },
  { q: "Apakah bahasa Inggris dari angka 3?", a: "Three", w: ["One", "Two", "Four"] },
  { q: "Apakah bahasa Inggris dari angka 4?", a: "Four", w: ["Two", "Three", "Five"] },
  { q: "Apakah bahasa Inggris dari angka 5?", a: "Five", w: ["Four", "Six", "Seven"] },
  { q: "Apakah bahasa Inggris dari angka 6?", a: "Six", w: ["Five", "Seven", "Eight"] },
  { q: "Apakah bahasa Inggris dari angka 7?", a: "Seven", w: ["Six", "Eight", "Nine"] },
  { q: "Apakah bahasa Inggris dari angka 8?", a: "Eight", w: ["Seven", "Nine", "Ten"] },
  { q: "Apakah bahasa Inggris dari angka 9?", a: "Nine", w: ["Eight", "Ten", "Seven"] },
  { q: "Apakah bahasa Inggris dari angka 10?", a: "Ten", w: ["Nine", "Eight", "Eleven"] },
  { q: "Apakah bahasa Inggris dari angka 11?", a: "Eleven", w: ["Ten", "Twelve", "Nine"] },
  { q: "Apakah bahasa Inggris dari angka 12?", a: "Twelve", w: ["Eleven", "Thirteen", "Ten"] },
  { q: "Apakah bahasa Inggris dari angka 13?", a: "Thirteen", w: ["Twelve", "Fourteen", "Eleven"] },
  { q: "Apakah bahasa Inggris dari angka 14?", a: "Fourteen", w: ["Thirteen", "Fifteen", "Twelve"] },
  { q: "Apakah bahasa Inggris dari angka 15?", a: "Fifteen", w: ["Fourteen", "Sixteen", "Thirteen"] },
  { q: "Apakah bahasa Inggris dari angka 16?", a: "Sixteen", w: ["Fifteen", "Seventeen", "Fourteen"] },
  { q: "Apakah bahasa Inggris dari angka 17?", a: "Seventeen", w: ["Sixteen", "Eighteen", "Fifteen"] },
  { q: "Apakah bahasa Inggris dari angka 18?", a: "Eighteen", w: ["Seventeen", "Nineteen", "Sixteen"] },
  { q: "Apakah bahasa Inggris dari angka 19?", a: "Nineteen", w: ["Eighteen", "Twenty", "Seventeen"] },
  { q: "Apakah bahasa Inggris dari angka 20?", a: "Twenty", w: ["Nineteen", "Eighteen", "Twenty-one"] },
  { q: "What number is 'Five' in Indonesian?", a: "Lima", w: ["Empat", "Enam", "Tujuh"] },
  { q: "What number is 'Ten' in Indonesian?", a: "Sepuluh", w: ["Sembilan", "Sebelas", "Delapan"] },
  { q: "What number is 'Three' in Indonesian?", a: "Tiga", w: ["Dua", "Empat", "Lima"] },
  { q: "What number is 'Seven' in Indonesian?", a: "Tujuh", w: ["Enam", "Delapan", "Sembilan"] },
  { q: "What number is 'Fifteen' in Indonesian?", a: "Lima belas", w: ["Empat belas", "Enam belas", "Tiga belas"] }
];

const actionWords: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Melompat'?", a: "Jump", w: ["Sit", "Stand", "Cry"] },
  { q: "Apakah bahasa Inggris dari 'Duduk'?", a: "Sit", w: ["Jump", "Stand", "Cry"] },
  { q: "Apakah bahasa Inggris dari 'Berdiri'?", a: "Stand", w: ["Sit", "Jump", "Cry"] },
  { q: "Apakah bahasa Inggris dari 'Menangis'?", a: "Cry", w: ["Laugh", "Sing", "Dance"] },
  { q: "Apakah bahasa Inggris dari 'Tertawa'?", a: "Laugh", w: ["Cry", "Sing", "Dance"] },
  { q: "Apakah bahasa Inggris dari 'Bernyanyi'?", a: "Sing", w: ["Laugh", "Cry", "Dance"] },
  { q: "Apakah bahasa Inggris dari 'Menari'?", a: "Dance", w: ["Sing", "Laugh", "Cry"] },
  { q: "Apakah bahasa Inggris dari 'Berenang'?", a: "Swim", w: ["Fly", "Climb", "Jump"] },
  { q: "Apakah bahasa Inggris dari 'Terbang'?", a: "Fly", w: ["Swim", "Climb", "Jump"] },
  { q: "Apakah bahasa Inggris dari 'Memanjat'?", a: "Climb", w: ["Fly", "Swim", "Jump"] },
  { q: "Apakah bahasa Inggris dari 'Bertepuk Tangan'?", a: "Clap", w: ["Wave", "Hug", "Kick"] },
  { q: "Apakah bahasa Inggris dari 'Melambai'?", a: "Wave", w: ["Clap", "Hug", "Kick"] },
  { q: "Apakah bahasa Inggris dari 'Memeluk'?", a: "Hug", w: ["Clap", "Wave", "Kick"] },
  { q: "Apakah bahasa Inggris dari 'Menendang'?", a: "Kick", w: ["Throw", "Catch", "Push"] },
  { q: "Apakah bahasa Inggris dari 'Melempar'?", a: "Throw", w: ["Kick", "Catch", "Push"] },
  { q: "Apakah bahasa Inggris dari 'Menangkap'?", a: "Catch", w: ["Throw", "Kick", "Push"] },
  { q: "Apakah bahasa Inggris dari 'Mendorong'?", a: "Push", w: ["Pull", "Open", "Close"] },
  { q: "Apakah bahasa Inggris dari 'Menarik'?", a: "Pull", w: ["Push", "Open", "Close"] },
  { q: "Apakah bahasa Inggris dari 'Membuka'?", a: "Open", w: ["Close", "Push", "Pull"] },
  { q: "Apakah bahasa Inggris dari 'Menutup'?", a: "Close", w: ["Open", "Push", "Pull"] },
  { q: "Apakah bahasa Inggris dari 'Menulis'?", a: "Write", w: ["Draw", "Read", "Sing"] },
  { q: "Apakah bahasa Inggris dari 'Menggambar'?", a: "Draw", w: ["Write", "Read", "Sing"] },
  { q: "Apakah bahasa Inggris dari 'Memasak'?", a: "Cook", w: ["Wash", "Brush", "Clean"] },
  { q: "Apakah bahasa Inggris dari 'Mencuci'?", a: "Wash", w: ["Cook", "Brush", "Clean"] },
  { q: "Apakah bahasa Inggris dari 'Menggosok (gigi)'?", a: "Brush", w: ["Wash", "Cook", "Clean"] }
];

const opposites: FactItem[] = [
  { q: "Lawan kata dari 'Up (Atas)' adalah...?", a: "Down (Bawah)", w: ["In (Dalam)", "Out (Luar)", "Open (Buka)"] },
  { q: "Lawan kata dari 'In (Dalam)' adalah...?", a: "Out (Luar)", w: ["Up (Atas)", "Down (Bawah)", "Closed (Tutup)"] },
  { q: "Lawan kata dari 'Open (Buka)' adalah...?", a: "Closed (Tutup)", w: ["Full (Penuh)", "Empty (Kosong)", "Clean (Bersih)"] },
  { q: "Lawan kata dari 'Full (Penuh)' adalah...?", a: "Empty (Kosong)", w: ["Open (Buka)", "Closed (Tutup)", "Clean (Bersih)"] },
  { q: "Lawan kata dari 'Clean (Bersih)' adalah...?", a: "Dirty (Kotor)", w: ["Full (Penuh)", "Empty (Kosong)", "Old (Tua)"] },
  { q: "Lawan kata dari 'Old (Tua/Lama)' adalah...?", a: "New (Baru)", w: ["Dirty (Kotor)", "Clean (Bersih)", "Long (Panjang)"] },
  { q: "Lawan kata dari 'Long (Panjang)' adalah...?", a: "Short (Pendek)", w: ["Heavy (Berat)", "Light (Ringan)", "Wet (Basah)"] },
  { q: "Lawan kata dari 'Heavy (Berat)' adalah...?", a: "Light (Ringan)", w: ["Long (Panjang)", "Short (Pendek)", "Wet (Basah)"] },
  { q: "Lawan kata dari 'Wet (Basah)' adalah...?", a: "Dry (Kering)", w: ["Near (Dekat)", "Far (Jauh)", "Heavy (Berat)"] },
  { q: "Lawan kata dari 'Near (Dekat)' adalah...?", a: "Far (Jauh)", w: ["Wet (Basah)", "Dry (Kering)", "Quiet (Sunyi)"] },
  { q: "Lawan kata dari 'Quiet (Sunyi)' adalah...?", a: "Loud (Berisik)", w: ["Near (Dekat)", "Far (Jauh)", "Easy (Mudah)"] },
  { q: "Lawan kata dari 'Easy (Mudah)' adalah...?", a: "Hard (Sulit)", w: ["Loud (Berisik)", "Quiet (Sunyi)", "Young (Muda)"] },
  { q: "Lawan kata dari 'Young (Muda)' adalah...?", a: "Old (Tua)", w: ["Easy (Mudah)", "Hard (Sulit)", "Strong (Kuat)"] },
  { q: "Lawan kata dari 'Strong (Kuat)' adalah...?", a: "Weak (Lemah)", w: ["Young (Muda)", "Old (Tua)", "Day (Siang)"] },
  { q: "Lawan kata dari 'Day (Siang)' adalah...?", a: "Night (Malam)", w: ["Strong (Kuat)", "Weak (Lemah)", "Left (Kiri)"] },
  { q: "Lawan kata dari 'Left (Kiri)' adalah...?", a: "Right (Kanan)", w: ["Day (Siang)", "Night (Malam)", "High (Tinggi)"] },
  { q: "Lawan kata dari 'High (Tinggi)' adalah...?", a: "Low (Rendah)", w: ["Left (Kiri)", "Right (Kanan)", "Front (Depan)"] },
  { q: "Lawan kata dari 'Front (Depan)' adalah...?", a: "Back (Belakang)", w: ["High (Tinggi)", "Low (Rendah)", "Inside (Dalam)"] },
  { q: "Lawan kata dari 'Inside (Dalam)' adalah...?", a: "Outside (Luar)", w: ["Front (Depan)", "Back (Belakang)", "Wide (Lebar)"] },
  { q: "Lawan kata dari 'Wide (Lebar)' adalah...?", a: "Narrow (Sempit)", w: ["Inside (Dalam)", "Outside (Luar)", "Thick (Tebal)"] },
  { q: "Lawan kata dari 'Thick (Tebal)' adalah...?", a: "Thin (Tipis)", w: ["Wide (Lebar)", "Narrow (Sempit)", "Soft (Lembut)"] },
  { q: "Lawan kata dari 'Soft (Lembut)' adalah...?", a: "Rough (Kasar)", w: ["Thick (Tebal)", "Thin (Tipis)", "Early (Awal)"] },
  { q: "Lawan kata dari 'Early (Awal)' adalah...?", a: "Late (Terlambat)", w: ["Soft (Lembut)", "Rough (Kasar)", "Tall (Tinggi)"] },
  { q: "Lawan kata dari 'Tall (Tinggi)' adalah...?", a: "Short (Pendek)", w: ["Early (Awal)", "Late (Terlambat)", "Rich (Kaya)"] },
  { q: "Lawan kata dari 'Rich (Kaya)' adalah...?", a: "Poor (Miskin)", w: ["Tall (Tinggi)", "Short (Pendek)", "Up (Atas)"] }
];

  return [
    ...buildFromFacts(foodDrinkWords, "ENG_PS2", "Preschool 2 (3 thn)", "Bahasa Inggris", 0),
    ...buildFromFacts(numberWords, "ENG_PS2", "Preschool 2 (3 thn)", "Bahasa Inggris", 25),
    ...buildFromFacts(actionWords, "ENG_PS2", "Preschool 2 (3 thn)", "Bahasa Inggris", 50),
    ...buildFromFacts(opposites, "ENG_PS2", "Preschool 2 (3 thn)", "Bahasa Inggris", 75)
  ];
}

// Generate Bahasa Inggris SD Kelas 1 (7 tahun) — 100 questions
// Scope: this/these & to-be sentence patterns, days & months, plural nouns,
// prepositions of place, simple present tense subject-verb agreement.
function generateEnglishSD1(): Question[] {
const simpleSentences: FactItem[] = [
  { q: "Complete: 'This ___ a book.'", a: "is", w: ["are", "am", "be"] },
  { q: "Complete: 'These ___ books.'", a: "are", w: ["is", "am", "be"] },
  { q: "Complete: '___ is my pen.' (Ini)", a: "This", w: ["These", "Those", "That"] },
  { q: "Complete: '___ are my pens.' (Ini, jamak)", a: "These", w: ["This", "That", "Those"] },
  { q: "'This is a cat' artinya...?", a: "Ini adalah kucing", w: ["Itu adalah kucing", "Ini adalah anjing", "Itu adalah anjing"] },
  { q: "'These are pencils' artinya...?", a: "Ini adalah pensil-pensil", w: ["Itu adalah pensil", "Ini adalah buku", "Itu adalah buku-buku"] },
  { q: "Bahasa Inggris dari 'Ini adalah mejaku' adalah...?", a: "This is my table", w: ["These are my tables", "That is my table", "Those are my tables"] },
  { q: "Bahasa Inggris dari 'Ini adalah bukuku' adalah...?", a: "This is my book", w: ["These are my books", "That is my book", "Those are my books"] },
  { q: "Complete: 'I ___ a student.' (Saya adalah)", a: "am", w: ["is", "are", "be"] },
  { q: "Complete: 'She ___ a teacher.' (Dia adalah)", a: "is", w: ["am", "are", "be"] },
  { q: "Complete: 'They ___ friends.' (Mereka adalah)", a: "are", w: ["is", "am", "be"] },
  { q: "Complete: 'We ___ happy.' (Kami adalah)", a: "are", w: ["is", "am", "be"] },
  { q: "Bahasa Inggris dari 'Saya seorang siswa' adalah...?", a: "I am a student", w: ["I is a student", "I are a student", "I be a student"] },
  { q: "Bahasa Inggris dari 'Dia adalah guru' (perempuan) adalah...?", a: "She is a teacher", w: ["She am a teacher", "She are a teacher", "He is a teacher"] },
  { q: "Bahasa Inggris dari 'Mereka adalah teman' adalah...?", a: "They are friends", w: ["They is friends", "They am friends", "They be friends"] },
  { q: "Complete: 'He ___ my brother.' (Dia adalah)", a: "is", w: ["am", "are", "be"] },
  { q: "Kata 'my' dalam bahasa Indonesia berarti...?", a: "Milikku / -ku", w: ["Milikmu", "Miliknya", "Milik kami"] },
  { q: "Kata 'your' dalam bahasa Indonesia berarti...?", a: "Milikmu", w: ["Milikku", "Miliknya", "Milik kami"] },
  { q: "Kata 'his' dalam bahasa Indonesia berarti...?", a: "Miliknya (laki-laki)", w: ["Miliknya (perempuan)", "Milikku", "Milikmu"] },
  { q: "Kata 'her' dalam bahasa Indonesia berarti...?", a: "Miliknya (perempuan)", w: ["Miliknya (laki-laki)", "Milikku", "Milikmu"] }
];

const daysMonths: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Senin'?", a: "Monday", w: ["Tuesday", "Sunday", "Friday"] },
  { q: "Apakah bahasa Inggris dari 'Selasa'?", a: "Tuesday", w: ["Monday", "Wednesday", "Sunday"] },
  { q: "Apakah bahasa Inggris dari 'Rabu'?", a: "Wednesday", w: ["Tuesday", "Thursday", "Monday"] },
  { q: "Apakah bahasa Inggris dari 'Kamis'?", a: "Thursday", w: ["Wednesday", "Friday", "Tuesday"] },
  { q: "Apakah bahasa Inggris dari 'Jumat'?", a: "Friday", w: ["Thursday", "Saturday", "Wednesday"] },
  { q: "Apakah bahasa Inggris dari 'Sabtu'?", a: "Saturday", w: ["Friday", "Sunday", "Thursday"] },
  { q: "Apakah bahasa Inggris dari 'Minggu'?", a: "Sunday", w: ["Saturday", "Monday", "Friday"] },
  { q: "Hari pertama dalam satu minggu menurut kalender internasional biasanya adalah...?", a: "Sunday", w: ["Monday", "Saturday", "Friday"] },
  { q: "Apakah bahasa Inggris dari bulan 'Januari'?", a: "January", w: ["February", "March", "April"] },
  { q: "Apakah bahasa Inggris dari bulan 'Februari'?", a: "February", w: ["January", "March", "April"] },
  { q: "Apakah bahasa Inggris dari bulan 'Maret'?", a: "March", w: ["February", "April", "May"] },
  { q: "Apakah bahasa Inggris dari bulan 'April'?", a: "April", w: ["March", "May", "June"] },
  { q: "Apakah bahasa Inggris dari bulan 'Mei'?", a: "May", w: ["April", "June", "July"] },
  { q: "Apakah bahasa Inggris dari bulan 'Juni'?", a: "June", w: ["May", "July", "August"] },
  { q: "Apakah bahasa Inggris dari bulan 'Juli'?", a: "July", w: ["June", "August", "September"] },
  { q: "Apakah bahasa Inggris dari bulan 'Agustus'?", a: "August", w: ["July", "September", "October"] },
  { q: "Apakah bahasa Inggris dari bulan 'September'?", a: "September", w: ["August", "October", "November"] },
  { q: "Apakah bahasa Inggris dari bulan 'Oktober'?", a: "October", w: ["September", "November", "December"] },
  { q: "Apakah bahasa Inggris dari bulan 'November'?", a: "November", w: ["October", "December", "January"] },
  { q: "Apakah bahasa Inggris dari bulan 'Desember'?", a: "December", w: ["November", "January", "October"] }
];

const pluralNouns: FactItem[] = [
  { q: "Bentuk jamak dari 'Book' adalah...?", a: "Books", w: ["Bookes", "Bookies", "Booken"] },
  { q: "Bentuk jamak dari 'Cat' adalah...?", a: "Cats", w: ["Cates", "Catves", "Caties"] },
  { q: "Bentuk jamak dari 'Dog' adalah...?", a: "Dogs", w: ["Doges", "Dogies", "Dogen"] },
  { q: "Bentuk jamak dari 'Pen' adalah...?", a: "Pens", w: ["Penes", "Pennies", "Penen"] },
  { q: "Bentuk jamak dari 'Box' adalah...?", a: "Boxes", w: ["Boxs", "Boxies", "Box"] },
  { q: "Bentuk jamak dari 'Bus' adalah...?", a: "Buses", w: ["Bus", "Buss", "Busies"] },
  { q: "Bentuk jamak dari 'Baby' adalah...?", a: "Babies", w: ["Babys", "Babyes", "Baby"] },
  { q: "Bentuk jamak dari 'Toy' adalah...?", a: "Toys", w: ["Toies", "Toyes", "Toy"] },
  { q: "Bentuk jamak dari 'Child' adalah...?", a: "Children", w: ["Childs", "Childes", "Childies"] },
  { q: "Bentuk jamak dari 'Man' adalah...?", a: "Men", w: ["Mans", "Manes", "Manies"] },
  { q: "Bentuk jamak dari 'Woman' adalah...?", a: "Women", w: ["Womans", "Womanes", "Womanies"] },
  { q: "Bentuk jamak dari 'Foot' adalah...?", a: "Feet", w: ["Foots", "Footes", "Footies"] },
  { q: "Bentuk jamak dari 'Tooth' adalah...?", a: "Teeth", w: ["Tooths", "Toothes", "Toothies"] },
  { q: "Bentuk jamak dari 'Mouse' adalah...?", a: "Mice", w: ["Mouses", "Mousies", "Mouse"] },
  { q: "Bentuk jamak dari 'Fish' biasanya adalah...?", a: "Fish", w: ["Fishes selalu", "Fishies", "Fishen"] },
  { q: "Kata benda yang menambahkan huruf 's' di akhir untuk bentuk jamak disebut kata benda...?", a: "Beraturan (regular)", w: ["Tidak beraturan (irregular)", "Tunggal saja", "Tanpa aturan"] },
  { q: "Kata benda yang perubahan bentuk jamaknya tidak mengikuti aturan biasa, seperti 'child' menjadi 'children', disebut kata benda...?", a: "Tidak beraturan (irregular)", w: ["Beraturan (regular)", "Tunggal saja", "Tanpa makna"] },
  { q: "Bentuk jamak dari 'House' adalah...?", a: "Houses", w: ["Housies", "Housen", "House"] },
  { q: "Bentuk jamak dari 'Chair' adalah...?", a: "Chairs", w: ["Chaires", "Chairies", "Chair"] },
  { q: "Bentuk jamak dari 'Leaf' adalah...?", a: "Leaves", w: ["Leafs", "Leafes", "Leafies"] }
];

const prepositions: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Di dalam'?", a: "In", w: ["On", "Under", "Behind"] },
  { q: "Apakah bahasa Inggris dari 'Di atas (menempel)'?", a: "On", w: ["In", "Under", "Behind"] },
  { q: "Apakah bahasa Inggris dari 'Di bawah'?", a: "Under", w: ["On", "In", "Behind"] },
  { q: "Apakah bahasa Inggris dari 'Di belakang'?", a: "Behind", w: ["In front of", "Next to", "Between"] },
  { q: "Apakah bahasa Inggris dari 'Di depan'?", a: "In front of", w: ["Behind", "Next to", "Between"] },
  { q: "Apakah bahasa Inggris dari 'Di sebelah'?", a: "Next to", w: ["Behind", "In front of", "Between"] },
  { q: "Apakah bahasa Inggris dari 'Di antara'?", a: "Between", w: ["Next to", "Behind", "Above"] },
  { q: "Apakah bahasa Inggris dari 'Di atas (tidak menempel)'?", a: "Above", w: ["Below", "On", "Under"] },
  { q: "Apakah bahasa Inggris dari 'Di bawah (tidak menempel)'?", a: "Below", w: ["Above", "On", "In"] },
  { q: "Apakah bahasa Inggris dari 'Dekat'?", a: "Near", w: ["Far", "Behind", "Between"] },
  { q: "'The cat is on the table' artinya kucing itu berada...?", a: "Di atas meja", w: ["Di bawah meja", "Di dalam meja", "Di belakang meja"] },
  { q: "'The book is in the bag' artinya buku itu berada...?", a: "Di dalam tas", w: ["Di atas tas", "Di bawah tas", "Di belakang tas"] },
  { q: "'The ball is under the chair' artinya bola itu berada...?", a: "Di bawah kursi", w: ["Di atas kursi", "Di dalam kursi", "Di depan kursi"] },
  { q: "'The dog is behind the tree' artinya anjing itu berada...?", a: "Di belakang pohon", w: ["Di depan pohon", "Di atas pohon", "Di dalam pohon"] },
  { q: "'She is between two friends' artinya dia berada...?", a: "Di antara dua teman", w: ["Di depan dua teman", "Di belakang dua teman", "Di dalam dua teman"] },
  { q: "Bahasa Inggris dari 'Buku itu di atas meja' adalah...?", a: "The book is on the table", w: ["The book is under the table", "The book is in the table", "The book is behind the table"] },
  { q: "Bahasa Inggris dari 'Kucing itu di bawah kursi' adalah...?", a: "The cat is under the chair", w: ["The cat is on the chair", "The cat is in the chair", "The cat is near the chair"] },
  { q: "Bahasa Inggris dari 'Tas itu di dalam lemari' adalah...?", a: "The bag is in the closet", w: ["The bag is on the closet", "The bag is under the closet", "The bag is behind the closet"] },
  { q: "Bahasa Inggris dari 'Bola itu di dekat pintu' adalah...?", a: "The ball is near the door", w: ["The ball is far from the door", "The ball is on the door", "The ball is under the door"] },
  { q: "Bahasa Inggris dari 'Anjing itu di depan rumah' adalah...?", a: "The dog is in front of the house", w: ["The dog is behind the house", "The dog is in the house", "The dog is under the house"] }
];

const presentTenseSentences: FactItem[] = [
  { q: "Complete: 'I ___ rice every day.' (makan)", a: "eat", w: ["eats", "eating", "ate"] },
  { q: "Complete: 'She ___ rice every day.' (makan)", a: "eats", w: ["eat", "eating", "ate"] },
  { q: "Complete: 'They ___ to school every morning.' (pergi)", a: "go", w: ["goes", "going", "went"] },
  { q: "Complete: 'He ___ to school every morning.' (pergi)", a: "goes", w: ["go", "going", "went"] },
  { q: "Complete: 'We ___ books at the library.' (membaca)", a: "read", w: ["reads", "reading", "readed"] },
  { q: "Complete: 'My mother ___ delicious food.' (memasak)", a: "cooks", w: ["cook", "cooking", "cooked"] },
  { q: "Complete: 'I ___ my teeth every morning.' (menggosok)", a: "brush", w: ["brushes", "brushing", "brushed"] },
  { q: "Complete: 'The sun ___ in the east.' (terbit)", a: "rises", w: ["rise", "rising", "rose"] },
  { q: "Complete: 'Birds ___ in the sky.' (terbang)", a: "fly", w: ["flies", "flying", "flew"] },
  { q: "Complete: 'The baby ___ a lot.' (menangis)", a: "cries", w: ["cry", "crying", "cried"] },
  { q: "Untuk subjek 'He/She/It', kata kerja biasanya ditambahkan huruf...?", a: "s atau es", w: ["ing", "ed", "ly"] },
  { q: "Untuk subjek 'I/You/We/They', kata kerja biasanya digunakan dalam bentuk...?", a: "Dasar (tanpa tambahan)", w: ["Ditambah s/es", "Ditambah ing", "Ditambah ed"] },
  { q: "Complete: 'My father ___ the newspaper every morning.' (membaca)", a: "reads", w: ["read", "reading", "readed"] },
  { q: "Complete: 'The cat ___ milk.' (minum)", a: "drinks", w: ["drink", "drinking", "drank"] },
  { q: "Complete: 'I ___ my homework after school.' (mengerjakan)", a: "do", w: ["does", "doing", "did"] },
  { q: "Complete: 'She ___ her homework after school.' (mengerjakan)", a: "does", w: ["do", "doing", "did"] },
  { q: "Complete: 'We ___ football every weekend.' (bermain)", a: "play", w: ["plays", "playing", "played"] },
  { q: "Complete: 'He ___ football every weekend.' (bermain)", a: "plays", w: ["play", "playing", "played"] },
  { q: "Complete: 'The children ___ happily in the park.' (bermain)", a: "play", w: ["plays", "playing", "played"] },
  { q: "Complete: 'My sister ___ the piano beautifully.' (bermain musik)", a: "plays", w: ["play", "playing", "played"] }
];

  return [
    ...buildFromFacts(simpleSentences, "ENG_SD1", "SD Kelas 1", "Bahasa Inggris", 0),
    ...buildFromFacts(daysMonths, "ENG_SD1", "SD Kelas 1", "Bahasa Inggris", 20),
    ...buildFromFacts(pluralNouns, "ENG_SD1", "SD Kelas 1", "Bahasa Inggris", 40),
    ...buildFromFacts(prepositions, "ENG_SD1", "SD Kelas 1", "Bahasa Inggris", 60),
    ...buildFromFacts(presentTenseSentences, "ENG_SD1", "SD Kelas 1", "Bahasa Inggris", 80)
  ];
}

// Generate Bahasa Inggris SD Kelas 2 (8 tahun) — 100 questions
// Scope: weather/seasons vocabulary, present simple fill-in-the-blank,
// question words in context, common adjectives, telling time.
function generateEnglishSD2(): Question[] {
const weatherSeasons: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Cerah'?", a: "Sunny", w: ["Rainy", "Cloudy", "Windy"] },
  { q: "Apakah bahasa Inggris dari 'Hujan'?", a: "Rainy", w: ["Sunny", "Cloudy", "Windy"] },
  { q: "Apakah bahasa Inggris dari 'Berawan'?", a: "Cloudy", w: ["Sunny", "Rainy", "Windy"] },
  { q: "Apakah bahasa Inggris dari 'Berangin'?", a: "Windy", w: ["Sunny", "Rainy", "Cloudy"] },
  { q: "Apakah bahasa Inggris dari 'Panas'?", a: "Hot", w: ["Cold", "Cool", "Warm"] },
  { q: "Apakah bahasa Inggris dari 'Dingin'?", a: "Cold", w: ["Hot", "Warm", "Sunny"] },
  { q: "Apakah bahasa Inggris dari 'Bersalju'?", a: "Snowy", w: ["Sunny", "Rainy", "Cloudy"] },
  { q: "Apakah bahasa Inggris dari 'Musim Panas'?", a: "Summer", w: ["Winter", "Spring", "Autumn"] },
  { q: "Apakah bahasa Inggris dari 'Musim Dingin'?", a: "Winter", w: ["Summer", "Spring", "Autumn"] },
  { q: "Apakah bahasa Inggris dari 'Musim Semi'?", a: "Spring", w: ["Summer", "Winter", "Autumn"] },
  { q: "Apakah bahasa Inggris dari 'Musim Gugur'?", a: "Autumn / Fall", w: ["Summer", "Winter", "Spring"] },
  { q: "Apakah bahasa Inggris dari 'Musim Kemarau'?", a: "Dry Season", w: ["Rainy Season", "Winter", "Spring"] },
  { q: "Apakah bahasa Inggris dari 'Musim Hujan'?", a: "Rainy Season", w: ["Dry Season", "Summer", "Winter"] },
  { q: "'It is raining today' artinya...?", a: "Hari ini hujan", w: ["Hari ini cerah", "Hari ini berangin", "Hari ini bersalju"] },
  { q: "'It is sunny today' artinya...?", a: "Hari ini cerah", w: ["Hari ini hujan", "Hari ini berawan", "Hari ini dingin"] },
  { q: "Bahasa Inggris dari 'Cuaca hari ini panas' adalah...?", a: "The weather is hot today", w: ["The weather is cold today", "The weather is rainy today", "The weather is windy today"] },
  { q: "Bahasa Inggris dari 'Payung digunakan saat hujan' adalah...?", a: "An umbrella is used when it rains", w: ["An umbrella is used when it is sunny", "An umbrella is used when it is cold", "An umbrella is used when it is windy"] },
  { q: "Apakah bahasa Inggris dari 'Pelangi'?", a: "Rainbow", w: ["Cloud", "Storm", "Fog"] },
  { q: "Apakah bahasa Inggris dari 'Petir'?", a: "Thunder / Lightning", w: ["Rainbow", "Fog", "Snow"] },
  { q: "Apakah bahasa Inggris dari 'Kabut'?", a: "Fog", w: ["Rainbow", "Thunder", "Snow"] }
];

const presentSimpleFillIn: FactItem[] = [
  { q: "Complete: 'My father ___ (work) at a hospital.'", a: "works", w: ["work", "working", "worked"] },
  { q: "Complete: 'The students ___ (study) English every day.'", a: "study", w: ["studies", "studying", "studied"] },
  { q: "Complete: 'She ___ (like) chocolate ice cream.'", a: "likes", w: ["like", "liking", "liked"] },
  { q: "Complete: 'We ___ (live) in Jakarta.'", a: "live", w: ["lives", "living", "lived"] },
  { q: "Complete: 'He ___ (watch) TV in the evening.'", a: "watches", w: ["watch", "watching", "watched"] },
  { q: "Complete: 'I ___ (have) two brothers.'", a: "have", w: ["has", "having", "had"] },
  { q: "Complete: 'She ___ (have) one sister.'", a: "has", w: ["have", "having", "had"] },
  { q: "Complete: 'The dog ___ (bark) at night.'", a: "barks", w: ["bark", "barking", "barked"] },
  { q: "Complete: 'My friends and I ___ (play) badminton on Sundays.'", a: "play", w: ["plays", "playing", "played"] },
  { q: "Complete: 'The teacher ___ (teach) mathematics.'", a: "teaches", w: ["teach", "teaching", "taught"] },
  { q: "Complete: 'They ___ (want) to go to the beach.'", a: "want", w: ["wants", "wanting", "wanted"] },
  { q: "Complete: 'My mother ___ (make) delicious cakes.'", a: "makes", w: ["make", "making", "made"] },
  { q: "Complete: 'The train ___ (arrive) at 7 o'clock.'", a: "arrives", w: ["arrive", "arriving", "arrived"] },
  { q: "Complete: 'I ___ (need) a new pencil.'", a: "need", w: ["needs", "needing", "needed"] },
  { q: "Complete: 'The flowers ___ (bloom) in spring.'", a: "bloom", w: ["blooms", "blooming", "bloomed"] },
  { q: "Complete: 'He always ___ (help) his mother at home.'", a: "helps", w: ["help", "helping", "helped"] },
  { q: "Complete: 'We ___ (love) our school.'", a: "love", w: ["loves", "loving", "loved"] },
  { q: "Complete: 'The sun ___ (shine) brightly today.'", a: "shines", w: ["shine", "shining", "shone"] },
  { q: "Complete: 'My grandmother ___ (tell) interesting stories.'", a: "tells", w: ["tell", "telling", "told"] },
  { q: "Complete: 'The birds ___ (sing) every morning.'", a: "sing", w: ["sings", "singing", "sang"] },
  { q: "Complete: 'I ___ (go) to bed at nine o'clock.'", a: "go", w: ["goes", "going", "went"] },
  { q: "Complete: 'She ___ (wash) the dishes after dinner.'", a: "washes", w: ["wash", "washing", "washed"] },
  { q: "Complete: 'My uncle ___ (drive) a taxi.'", a: "drives", w: ["drive", "driving", "drove"] },
  { q: "Complete: 'The children ___ (laugh) at the funny clown.'", a: "laugh", w: ["laughs", "laughing", "laughed"] },
  { q: "Complete: 'We ___ (clean) our classroom every Friday.'", a: "clean", w: ["cleans", "cleaning", "cleaned"] }
];

const questionWords: FactItem[] = [
  { q: "Kata tanya 'What' digunakan untuk menanyakan...?", a: "Apa", w: ["Siapa", "Kapan", "Di mana"] },
  { q: "Kata tanya 'Where' digunakan untuk menanyakan...?", a: "Di mana", w: ["Apa", "Siapa", "Kapan"] },
  { q: "Kata tanya 'When' digunakan untuk menanyakan...?", a: "Kapan", w: ["Apa", "Di mana", "Siapa"] },
  { q: "Kata tanya 'Who' digunakan untuk menanyakan...?", a: "Siapa", w: ["Apa", "Di mana", "Kapan"] },
  { q: "Kata tanya 'Why' digunakan untuk menanyakan...?", a: "Mengapa", w: ["Bagaimana", "Berapa", "Apa"] },
  { q: "Kata tanya 'How' digunakan untuk menanyakan...?", a: "Bagaimana", w: ["Mengapa", "Berapa", "Kapan"] },
  { q: "'What is your name?' artinya...?", a: "Siapa namamu?", w: ["Di mana rumahmu?", "Kapan ulang tahunmu?", "Bagaimana kabarmu?"] },
  { q: "'Where do you live?' artinya...?", a: "Di mana kamu tinggal?", w: ["Kapan kamu lahir?", "Siapa namamu?", "Mengapa kamu di sini?"] },
  { q: "'When is your birthday?' artinya...?", a: "Kapan ulang tahunmu?", w: ["Di mana kamu tinggal?", "Siapa namamu?", "Bagaimana kabarmu?"] },
  { q: "'Who is your teacher?' artinya...?", a: "Siapa gurumu?", w: ["Apa pelajaranmu?", "Di mana sekolahmu?", "Kapan sekolahmu?"] },
  { q: "'Why are you late?' artinya...?", a: "Mengapa kamu terlambat?", w: ["Bagaimana kamu terlambat?", "Kapan kamu terlambat?", "Di mana kamu terlambat?"] },
  { q: "'How old are you?' artinya...?", a: "Berapa umurmu?", w: ["Siapa namamu?", "Di mana rumahmu?", "Kapan ulang tahunmu?"] },
  { q: "Bahasa Inggris dari 'Apa ini?' adalah...?", a: "What is this?", w: ["Where is this?", "Who is this?", "When is this?"] },
  { q: "Bahasa Inggris dari 'Di mana kamarmu?' adalah...?", a: "Where is your room?", w: ["What is your room?", "Who is your room?", "How is your room?"] },
  { q: "Bahasa Inggris dari 'Siapa itu?' adalah...?", a: "Who is that?", w: ["What is that?", "Where is that?", "When is that?"] },
  { q: "'How many' digunakan untuk menanyakan...?", a: "Berapa banyak (jumlah benda)", w: ["Kapan", "Di mana", "Mengapa"] },
  { q: "'How much' digunakan untuk menanyakan...?", a: "Berapa banyak (jumlah/harga yang tidak dapat dihitung)", w: ["Kapan", "Di mana", "Siapa"] },
  { q: "'What time is it?' artinya...?", a: "Jam berapa sekarang?", w: ["Di mana sekarang?", "Siapa sekarang?", "Mengapa sekarang?"] },
  { q: "Bahasa Inggris dari 'Berapa umurmu?' adalah...?", a: "How old are you?", w: ["What is your name?", "Where do you live?", "Who are you?"] },
  { q: "Bahasa Inggris dari 'Mengapa kamu senang?' adalah...?", a: "Why are you happy?", w: ["How are you happy?", "What are you happy?", "When are you happy?"] }
];

const commonAdjectives: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Cantik/Indah'?", a: "Beautiful", w: ["Ugly", "Clean", "Dirty"] },
  { q: "Apakah bahasa Inggris dari 'Jelek'?", a: "Ugly", w: ["Beautiful", "Clean", "Dirty"] },
  { q: "Apakah bahasa Inggris dari 'Bersih'?", a: "Clean", w: ["Dirty", "Beautiful", "Ugly"] },
  { q: "Apakah bahasa Inggris dari 'Kotor'?", a: "Dirty", w: ["Clean", "Beautiful", "Ugly"] },
  { q: "Apakah bahasa Inggris dari 'Mahal'?", a: "Expensive", w: ["Cheap", "Difficult", "Easy"] },
  { q: "Apakah bahasa Inggris dari 'Murah'?", a: "Cheap", w: ["Expensive", "Difficult", "Easy"] },
  { q: "Apakah bahasa Inggris dari 'Sulit'?", a: "Difficult", w: ["Easy", "Expensive", "Cheap"] },
  { q: "Apakah bahasa Inggris dari 'Mudah'?", a: "Easy", w: ["Difficult", "Expensive", "Cheap"] },
  { q: "Apakah bahasa Inggris dari 'Berbahaya'?", a: "Dangerous", w: ["Safe", "Beautiful", "Ugly"] },
  { q: "Apakah bahasa Inggris dari 'Aman'?", a: "Safe", w: ["Dangerous", "Beautiful", "Ugly"] },
  { q: "Apakah bahasa Inggris dari 'Ramai'?", a: "Crowded", w: ["Quiet", "Clean", "Dirty"] },
  { q: "Apakah bahasa Inggris dari 'Sepi'?", a: "Quiet", w: ["Crowded", "Clean", "Dirty"] },
  { q: "Apakah bahasa Inggris dari 'Lezat'?", a: "Delicious", w: ["Disgusting", "Expensive", "Cheap"] },
  { q: "Apakah bahasa Inggris dari 'Menjijikkan'?", a: "Disgusting", w: ["Delicious", "Beautiful", "Clean"] },
  { q: "Apakah bahasa Inggris dari 'Ramah'?", a: "Friendly", w: ["Rude", "Shy", "Angry"] }
];

const timeTelling: FactItem[] = [
  { q: "'It is one o'clock' artinya...?", a: "Sekarang pukul satu tepat", w: ["Sekarang pukul satu lewat", "Sekarang setengah satu", "Sekarang pukul dua"] },
  { q: "Bahasa Inggris dari 'Sekarang pukul tujuh tepat' adalah...?", a: "It is seven o'clock", w: ["It is seven thirty", "It is half past seven", "It is eight o'clock"] },
  { q: "'Half past five' artinya pukul...?", a: "5.30", w: ["5.15", "5.45", "6.00"] },
  { q: "Bahasa Inggris dari pukul '3.30' adalah...?", a: "Half past three", w: ["Half past four", "Quarter past three", "Three o'clock"] },
  { q: "'Quarter past nine' artinya pukul...?", a: "9.15", w: ["9.30", "9.45", "9.00"] },
  { q: "Bahasa Inggris dari pukul '8.15' adalah...?", a: "Quarter past eight", w: ["Quarter to eight", "Half past eight", "Eight o'clock"] },
  { q: "'Quarter to ten' artinya pukul...?", a: "9.45", w: ["10.15", "9.15", "10.45"] },
  { q: "Bahasa Inggris dari pukul '6.45' adalah...?", a: "Quarter to seven", w: ["Quarter past seven", "Half past six", "Seven o'clock"] },
  { q: "'What time is it?' biasanya dijawab dengan awalan...?", a: "It is...", w: ["This is...", "They are...", "We are..."] },
  { q: "Bahasa Inggris dari pukul '12.00' siang adalah...?", a: "Twelve o'clock / Noon", w: ["Midnight", "Twelve thirty", "Quarter past twelve"] },
  { q: "Bahasa Inggris dari pukul '00.00' tengah malam adalah...?", a: "Midnight", w: ["Noon", "Twelve thirty", "Quarter to twelve"] },
  { q: "Bahasa Inggris dari pukul '4.00' adalah...?", a: "Four o'clock", w: ["Four thirty", "Quarter past four", "Five o'clock"] },
  { q: "Bahasa Inggris dari pukul '2.30' adalah...?", a: "Half past two", w: ["Quarter past two", "Two o'clock", "Half past three"] },
  { q: "Bahasa Inggris dari pukul '10.15' adalah...?", a: "Quarter past ten", w: ["Quarter to ten", "Half past ten", "Ten o'clock"] },
  { q: "Bahasa Inggris dari pukul '11.45' adalah...?", a: "Quarter to twelve", w: ["Quarter past twelve", "Half past eleven", "Eleven o'clock"] },
  { q: "Jarum panjang pada jam dalam bahasa Inggris disebut...?", a: "Minute hand", w: ["Hour hand", "Second hand", "Clock hand"] },
  { q: "Jarum pendek pada jam dalam bahasa Inggris disebut...?", a: "Hour hand", w: ["Minute hand", "Second hand", "Clock hand"] },
  { q: "Bahasa Inggris dari 'Jam berapa sekolah dimulai?' adalah...?", a: "What time does school start?", w: ["Where does school start?", "Why does school start?", "Who starts school?"] },
  { q: "Bahasa Inggris dari 'Sekolah dimulai pukul tujuh' adalah...?", a: "School starts at seven o'clock", w: ["School starts at seven days", "School starts on seven o'clock", "School starts in seven o'clock"] },
  { q: "Kata depan yang digunakan sebelum menyebutkan jam dalam bahasa Inggris adalah...?", a: "At", w: ["In", "On", "By"] }
];

  return [
    ...buildFromFacts(weatherSeasons, "ENG_SD2", "SD Kelas 2", "Bahasa Inggris", 0),
    ...buildFromFacts(presentSimpleFillIn, "ENG_SD2", "SD Kelas 2", "Bahasa Inggris", 20),
    ...buildFromFacts(questionWords, "ENG_SD2", "SD Kelas 2", "Bahasa Inggris", 45),
    ...buildFromFacts(commonAdjectives, "ENG_SD2", "SD Kelas 2", "Bahasa Inggris", 65),
    ...buildFromFacts(timeTelling, "ENG_SD2", "SD Kelas 2", "Bahasa Inggris", 80)
  ];
}

// Generate Bahasa Inggris SD Kelas 3 (9 tahun) — 100 questions
// Scope: past tense (regular -ed and common irregular verbs), comparative
// adjectives, extended family-tree vocabulary, simple reading comprehension.
function generateEnglishSD3(): Question[] {
const pastTenseRegular: FactItem[] = [
  { q: "Bentuk lampau (past tense) dari 'Play' adalah...?", a: "Played", w: ["Plaied", "Playd", "Playeded"] },
  { q: "Bentuk lampau dari 'Walk' adalah...?", a: "Walked", w: ["Walkd", "Walkeded", "Walkied"] },
  { q: "Bentuk lampau dari 'Cook' adalah...?", a: "Cooked", w: ["Cookd", "Cookeded", "Cookied"] },
  { q: "Bentuk lampau dari 'Wash' adalah...?", a: "Washed", w: ["Washd", "Washeded", "Washied"] },
  { q: "Bentuk lampau dari 'Clean' adalah...?", a: "Cleaned", w: ["Cleand", "Cleaneded", "Cleanied"] },
  { q: "Bentuk lampau dari 'Help' adalah...?", a: "Helped", w: ["Helpd", "Helpeded", "Helpied"] },
  { q: "Bentuk lampau dari 'Watch' adalah...?", a: "Watched", w: ["Watchd", "Watcheded", "Watchied"] },
  { q: "Bentuk lampau dari 'Study' adalah...?", a: "Studied", w: ["Studyed", "Studyied", "Studieded"] },
  { q: "Bentuk lampau dari 'Stop' adalah...?", a: "Stopped", w: ["Stoped", "Stopeded", "Stopied"] },
  { q: "Bentuk lampau dari 'Like' adalah...?", a: "Liked", w: ["Likeed", "Likded", "Likeded"] },
  { q: "Complete: 'Yesterday, I ___ (play) football.'", a: "played", w: ["play", "playing", "plays"] },
  { q: "Complete: 'Last night, she ___ (cook) dinner.'", a: "cooked", w: ["cook", "cooking", "cooks"] },
  { q: "Complete: 'Last week, we ___ (visit) our grandmother.'", a: "visited", w: ["visit", "visiting", "visits"] },
  { q: "Complete: 'Two days ago, they ___ (clean) the house.'", a: "cleaned", w: ["clean", "cleaning", "cleans"] },
  { q: "Complete: 'This morning, he ___ (wash) his bicycle.'", a: "washed", w: ["wash", "washing", "washes"] },
  { q: "Complete: 'Last month, I ___ (study) very hard.'", a: "studied", w: ["study", "studying", "studies"] },
  { q: "Kata kerja beraturan (regular verb) biasanya membentuk past tense dengan menambahkan akhiran...?", a: "-ed", w: ["-ing", "-s", "-er"] },
  { q: "Complete: 'Yesterday afternoon, the children ___ (walk) to the park.'", a: "walked", w: ["walk", "walking", "walks"] },
  { q: "Complete: 'Last year, my father ___ (work) in Surabaya.'", a: "worked", w: ["work", "working", "works"] },
  { q: "Complete: 'She ___ (smile) when she saw the puppy.'", a: "smiled", w: ["smile", "smiling", "smiles"] },
  { q: "Complete: 'We ___ (finish) our homework before dinner.'", a: "finished", w: ["finish", "finishing", "finishes"] },
  { q: "Complete: 'The teacher ___ (explain) the lesson yesterday.'", a: "explained", w: ["explain", "explaining", "explains"] },
  { q: "Complete: 'I ___ (wait) for the bus this morning.'", a: "waited", w: ["wait", "waiting", "waits"] },
  { q: "Complete: 'He ___ (call) his friend last night.'", a: "called", w: ["call", "calling", "calls"] },
  { q: "Complete: 'They ___ (enjoy) the party very much.'", a: "enjoyed", w: ["enjoy", "enjoying", "enjoys"] }
];

const pastTenseIrregular: FactItem[] = [
  { q: "Bentuk lampau dari 'Go' adalah...?", a: "Went", w: ["Goed", "Gone", "Going"] },
  { q: "Bentuk lampau dari 'Eat' adalah...?", a: "Ate", w: ["Eated", "Eaten", "Eating"] },
  { q: "Bentuk lampau dari 'See' adalah...?", a: "Saw", w: ["Seed", "Seen", "Seeing"] },
  { q: "Bentuk lampau dari 'Drink' adalah...?", a: "Drank", w: ["Drinked", "Drunk", "Drinking"] },
  { q: "Bentuk lampau dari 'Run' adalah...?", a: "Ran", w: ["Runned", "Run", "Running"] },
  { q: "Bentuk lampau dari 'Write' adalah...?", a: "Wrote", w: ["Writed", "Written", "Writing"] },
  { q: "Bentuk lampau dari 'Read' adalah...?", a: "Read", w: ["Readed", "Reads", "Reading"] },
  { q: "Bentuk lampau dari 'Buy' adalah...?", a: "Bought", w: ["Buyed", "Buied", "Buying"] },
  { q: "Bentuk lampau dari 'Come' adalah...?", a: "Came", w: ["Comed", "Come", "Coming"] },
  { q: "Bentuk lampau dari 'Take' adalah...?", a: "Took", w: ["Taked", "Taken", "Taking"] },
  { q: "Bentuk lampau dari 'Give' adalah...?", a: "Gave", w: ["Gived", "Given", "Giving"] },
  { q: "Bentuk lampau dari 'Make' adalah...?", a: "Made", w: ["Maked", "Making", "Makes"] },
  { q: "Bentuk lampau dari 'Have' adalah...?", a: "Had", w: ["Haved", "Having", "Haves"] },
  { q: "Bentuk lampau dari 'Sleep' adalah...?", a: "Slept", w: ["Sleeped", "Sleeping", "Sleeps"] },
  { q: "Bentuk lampau dari 'Sit' adalah...?", a: "Sat", w: ["Sitted", "Sitting", "Sits"] },
  { q: "Bentuk lampau dari 'Speak' adalah...?", a: "Spoke", w: ["Speaked", "Spoken", "Speaking"] },
  { q: "Bentuk lampau dari 'Swim' adalah...?", a: "Swam", w: ["Swimmed", "Swum", "Swimming"] },
  { q: "Bentuk lampau dari 'Fly' adalah...?", a: "Flew", w: ["Flied", "Flown", "Flying"] },
  { q: "Bentuk lampau dari 'Sing' adalah...?", a: "Sang", w: ["Singed", "Sung", "Singing"] },
  { q: "Bentuk lampau dari 'Bring' adalah...?", a: "Brought", w: ["Bringed", "Bringing", "Brings"] },
  { q: "Complete: 'Yesterday, I ___ (go) to the zoo.'", a: "went", w: ["go", "going", "goes"] },
  { q: "Complete: 'Last night, we ___ (eat) fried rice.'", a: "ate", w: ["eat", "eating", "eats"] },
  { q: "Complete: 'She ___ (see) a beautiful rainbow yesterday.'", a: "saw", w: ["see", "seeing", "sees"] },
  { q: "Complete: 'They ___ (buy) new shoes last week.'", a: "bought", w: ["buy", "buying", "buys"] },
  { q: "Complete: 'He ___ (write) a letter to his friend yesterday.'", a: "wrote", w: ["write", "writing", "writes"] }
];

const comparativeAdjectives: FactItem[] = [
  { q: "Bentuk perbandingan (comparative) dari 'Big' adalah...?", a: "Bigger", w: ["Biggest", "More big", "Bigly"] },
  { q: "Bentuk perbandingan dari 'Small' adalah...?", a: "Smaller", w: ["Smallest", "More small", "Smally"] },
  { q: "Bentuk perbandingan dari 'Tall' adalah...?", a: "Taller", w: ["Tallest", "More tall", "Tally"] },
  { q: "Bentuk perbandingan dari 'Short' adalah...?", a: "Shorter", w: ["Shortest", "More short", "Shortly"] },
  { q: "Bentuk perbandingan dari 'Fast' adalah...?", a: "Faster", w: ["Fastest", "More fast", "Fastly"] },
  { q: "Bentuk perbandingan dari 'Slow' adalah...?", a: "Slower", w: ["Slowest", "More slow", "Slowly only"] },
  { q: "Bentuk perbandingan dari 'Old' adalah...?", a: "Older", w: ["Oldest", "More old", "Oldly"] },
  { q: "Bentuk perbandingan dari 'Young' adalah...?", a: "Younger", w: ["Youngest", "More young", "Youngly"] },
  { q: "Bentuk perbandingan dari 'Happy' adalah...?", a: "Happier", w: ["Happiest", "More happy", "Happily only"] },
  { q: "Bentuk perbandingan dari 'Beautiful' adalah...?", a: "More beautiful", w: ["Beautifuller", "Beautifulest", "Beautifully"] },
  { q: "Kata sifat pendek (satu suku kata) biasanya membentuk comparative dengan menambahkan akhiran...?", a: "-er", w: ["-est", "more...", "-ly"] },
  { q: "Kata sifat panjang (tiga suku kata atau lebih) biasanya membentuk comparative dengan menambahkan kata...?", a: "more", w: ["-er", "-est", "-ly"] },
  { q: "Complete: 'An elephant is ___ than a mouse.' (bigger)", a: "bigger", w: ["biggest", "big", "more big"] },
  { q: "Complete: 'A cheetah is ___ than a turtle.' (faster)", a: "faster", w: ["fastest", "fast", "more fast"] },
  { q: "Complete: 'This book is ___ than that book.' (more interesting)", a: "more interesting", w: ["interestinger", "interestingest", "interesting"] },
  { q: "Bentuk perbandingan dari 'Good' adalah...?", a: "Better", w: ["Gooder", "Goodest", "More good"] },
  { q: "Bentuk perbandingan dari 'Bad' adalah...?", a: "Worse", w: ["Badder", "Baddest", "More bad"] },
  { q: "Bentuk perbandingan dari 'Far' adalah...?", a: "Farther / Further", w: ["Farer", "Farest", "More far"] },
  { q: "Complete: 'My house is ___ than your house.' (nearer)", a: "nearer", w: ["nearest", "near", "more near"] },
  { q: "Bentuk perbandingan dari 'Hot' adalah...?", a: "Hotter", w: ["Hottest", "More hot", "Hotly"] }
];

const familyTree: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Kakek dari pihak Ibu'?", a: "Maternal grandfather", w: ["Paternal grandfather", "Uncle", "Cousin"] },
  { q: "Apakah bahasa Inggris dari 'Nenek dari pihak Ayah'?", a: "Paternal grandmother", w: ["Maternal grandmother", "Aunt", "Cousin"] },
  { q: "Apakah bahasa Inggris dari 'Sepupu'?", a: "Cousin", w: ["Nephew", "Niece", "Sibling"] },
  { q: "Apakah bahasa Inggris dari 'Keponakan Laki-laki'?", a: "Nephew", w: ["Niece", "Cousin", "Son"] },
  { q: "Apakah bahasa Inggris dari 'Keponakan Perempuan'?", a: "Niece", w: ["Nephew", "Cousin", "Daughter"] },
  { q: "Apakah bahasa Inggris dari 'Menantu Perempuan'?", a: "Daughter-in-law", w: ["Son-in-law", "Sister-in-law", "Mother-in-law"] },
  { q: "Apakah bahasa Inggris dari 'Menantu Laki-laki'?", a: "Son-in-law", w: ["Daughter-in-law", "Brother-in-law", "Father-in-law"] },
  { q: "Apakah bahasa Inggris dari 'Ibu Mertua'?", a: "Mother-in-law", w: ["Father-in-law", "Sister-in-law", "Daughter-in-law"] },
  { q: "Apakah bahasa Inggris dari 'Ayah Mertua'?", a: "Father-in-law", w: ["Mother-in-law", "Brother-in-law", "Son-in-law"] },
  { q: "Apakah bahasa Inggris dari 'Saudara Kembar'?", a: "Twin", w: ["Cousin", "Sibling only", "Nephew"] },
  { q: "Apakah bahasa Inggris dari 'Anak Tunggal'?", a: "Only child", w: ["Twin", "Cousin", "Sibling"] },
  { q: "'Sibling' dalam bahasa Indonesia berarti...?", a: "Saudara kandung (kakak/adik)", w: ["Sepupu", "Keponakan", "Mertua"] },
  { q: "'Relative' dalam bahasa Indonesia berarti...?", a: "Kerabat / Saudara", w: ["Teman", "Guru", "Tetangga"] },
  { q: "'Parents' dalam bahasa Indonesia berarti...?", a: "Orang tua (Ayah dan Ibu)", w: ["Anak-anak", "Kakek dan Nenek", "Saudara"] },
  { q: "'Grandparents' dalam bahasa Indonesia berarti...?", a: "Kakek dan Nenek", w: ["Orang tua", "Cucu", "Sepupu"] }
];

const readingComprehension: FactItem[] = [
  { q: "Baca teks: 'Tom has a red bike. He rides it to school every day.' What color is Tom's bike?", a: "Red", w: ["Blue", "Green", "Yellow"] },
  { q: "Baca teks: 'Sarah likes cats. She has two cats at home.' How many cats does Sarah have?", a: "Two", w: ["One", "Three", "Four"] },
  { q: "Baca teks: 'My sister is a doctor. She works at a hospital.' Where does the sister work?", a: "At a hospital", w: ["At a school", "At a market", "At a bank"] },
  { q: "Baca teks: 'It is raining outside. I need my umbrella.' Why does the writer need an umbrella?", a: "Because it is raining", w: ["Because it is sunny", "Because it is windy", "Because it is cold"] },
  { q: "Baca teks: 'Dina wakes up at six o'clock every morning.' What time does Dina wake up?", a: "Six o'clock", w: ["Seven o'clock", "Five o'clock", "Eight o'clock"] },
  { q: "Baca teks: 'The boy is playing with his dog in the garden.' Where is the boy playing?", a: "In the garden", w: ["In the house", "In the school", "In the car"] },
  { q: "Baca teks: 'Rina and her friends are studying English together.' What are they studying?", a: "English", w: ["Mathematics", "Science", "Art"] },
  { q: "Baca teks: 'My father drives to work every day.' How does the father go to work?", a: "By driving", w: ["By walking", "By flying", "By swimming"] },
  { q: "Baca teks: 'The cat is sleeping on the sofa.' What is the cat doing?", a: "Sleeping", w: ["Eating", "Playing", "Running"] },
  { q: "Baca teks: 'We are going to the beach this weekend.' Where are they going?", a: "To the beach", w: ["To the mountain", "To the city", "To school"] },
  { q: "Baca teks: 'Andi is happy because he got a new toy.' Why is Andi happy?", a: "Because he got a new toy", w: ["Because he is sick", "Because it is raining", "Because he lost his toy"] },
  { q: "Baca teks: 'The library is next to the school.' Where is the library located?", a: "Next to the school", w: ["Far from the school", "Inside the school", "Behind the school"] },
  { q: "Baca teks: 'Grandmother is cooking soup in the kitchen.' What is grandmother doing?", a: "Cooking soup", w: ["Washing dishes", "Reading a book", "Sleeping"] },
  { q: "Baca teks: 'The children are excited about their holiday trip.' How do the children feel?", a: "Excited", w: ["Sad", "Angry", "Bored"] },
  { q: "Baca teks: 'Budi finished his homework before dinner.' When did Budi finish his homework?", a: "Before dinner", w: ["After dinner", "During dinner", "At midnight"] }
];

  return [
    ...buildFromFacts(pastTenseRegular, "ENG_SD3", "SD Kelas 3", "Bahasa Inggris", 0),
    ...buildFromFacts(pastTenseIrregular, "ENG_SD3", "SD Kelas 3", "Bahasa Inggris", 25),
    ...buildFromFacts(comparativeAdjectives, "ENG_SD3", "SD Kelas 3", "Bahasa Inggris", 50),
    ...buildFromFacts(familyTree, "ENG_SD3", "SD Kelas 3", "Bahasa Inggris", 70),
    ...buildFromFacts(readingComprehension, "ENG_SD3", "SD Kelas 3", "Bahasa Inggris", 85)
  ];
}

// Generate Bahasa Inggris SD Kelas 4 (10 tahun) — 100 questions
// Scope: this/that/these/those grammar, to-be (is/am/are) grammar,
// superlative adjectives, common phrases/expressions, reading comprehension.
function generateEnglishSD4(): Question[] {
const demonstratives: FactItem[] = [
  { q: "'This' digunakan untuk benda tunggal yang letaknya...?", a: "Dekat", w: ["Jauh", "Sangat jauh", "Tidak terlihat"] },
  { q: "'That' digunakan untuk benda tunggal yang letaknya...?", a: "Jauh", w: ["Dekat", "Sangat dekat", "Di tangan"] },
  { q: "'These' digunakan untuk benda jamak yang letaknya...?", a: "Dekat", w: ["Jauh", "Sangat jauh", "Tidak terlihat"] },
  { q: "'Those' digunakan untuk benda jamak yang letaknya...?", a: "Jauh", w: ["Dekat", "Sangat dekat", "Di tangan"] },
  { q: "Complete: '___ is my house.' (Itu, tunggal, jauh)", a: "That", w: ["This", "These", "Those"] },
  { q: "Complete: '___ are my shoes.' (Itu, jamak, jauh)", a: "Those", w: ["This", "That", "These"] },
  { q: "Complete: '___ is a beautiful flower.' (Ini, tunggal, dekat)", a: "This", w: ["That", "These", "Those"] },
  { q: "Complete: '___ are delicious apples.' (Ini, jamak, dekat)", a: "These", w: ["This", "That", "Those"] },
  { q: "Bahasa Inggris dari 'Itu adalah mobil ayah saya' (jauh) adalah...?", a: "That is my father's car", w: ["This is my father's car", "These are my father's cars", "Those are my father's cars"] },
  { q: "Bahasa Inggris dari 'Itu adalah bunga-bunga yang indah' (jamak, jauh) adalah...?", a: "Those are beautiful flowers", w: ["This is a beautiful flower", "That is a beautiful flower", "These are beautiful flowers"] },
  { q: "Complete: 'Look at ___ birds flying over there!' (Itu, jauh, jamak)", a: "those", w: ["this", "that", "these"] },
  { q: "Complete: 'Can you pass me ___ book on the table near you?' (Itu, dekat pendengar)", a: "that", w: ["this", "these", "those"] },
  { q: "Kata ganti penunjuk (demonstrative pronoun) dalam bahasa Inggris ada empat, yaitu this, that, these, dan...?", a: "Those", w: ["Them", "They", "There"] },
  { q: "Complete: '___ pencils on my desk are new.' (Ini, jamak)", a: "These", w: ["This", "That", "Those"] },
  { q: "Complete: 'I don't like ___ shoes; I prefer these ones.' (Itu, jamak)", a: "those", w: ["this", "that", "these"] },
  { q: "Complete: '___ is my classroom.' (Ini, tunggal, dekat)", a: "This", w: ["That", "These", "Those"] },
  { q: "Complete: 'Whose bag is ___ on the chair?' (Itu, tunggal, dekat pendengar)", a: "that", w: ["this", "these", "those"] },
  { q: "Bahasa Inggris dari 'Ini adalah pena-penaku' (jamak, dekat) adalah...?", a: "These are my pens", w: ["This is my pen", "That is my pen", "Those are my pens"] },
  { q: "Complete: 'Are ___ your keys on the table?' (Itu, jamak, dekat)", a: "these", w: ["this", "that", "those"] },
  { q: "Complete: 'I really like ___ painting on the wall over there.' (Itu, tunggal, jauh)", a: "that", w: ["this", "these", "those"] }
];

const toBeGrammar: FactItem[] = [
  { q: "Complete: 'I ___ ten years old.'", a: "am", w: ["is", "are", "be"] },
  { q: "Complete: 'You ___ my best friend.'", a: "are", w: ["is", "am", "be"] },
  { q: "Complete: 'He ___ a doctor.'", a: "is", w: ["am", "are", "be"] },
  { q: "Complete: 'She ___ very kind.'", a: "is", w: ["am", "are", "be"] },
  { q: "Complete: 'It ___ a small cat.'", a: "is", w: ["am", "are", "be"] },
  { q: "Complete: 'We ___ classmates.'", a: "are", w: ["is", "am", "be"] },
  { q: "Complete: 'They ___ from Bandung.'", a: "are", w: ["is", "am", "be"] },
  { q: "Complete: 'The books ___ on the shelf.'", a: "are", w: ["is", "am", "be"] },
  { q: "Complete: 'My mother ___ a teacher.'", a: "is", w: ["am", "are", "be"] },
  { q: "Complete: 'My parents ___ at home now.'", a: "are", w: ["is", "am", "be"] },
  { q: "Bentuk negatif dari 'I am' adalah...?", a: "I am not", w: ["I not am", "I no am", "I isn't"] },
  { q: "Bentuk negatif dari 'He is' adalah...?", a: "He is not / He isn't", w: ["He are not", "He not is", "He am not"] },
  { q: "Bentuk negatif dari 'They are' adalah...?", a: "They are not / They aren't", w: ["They is not", "They am not", "They not are"] },
  { q: "Bentuk tanya dari 'You are happy' adalah...?", a: "Are you happy?", w: ["You are happy?", "Is you happy?", "Am you happy?"] },
  { q: "Bentuk tanya dari 'She is tired' adalah...?", a: "Is she tired?", w: ["She is tired?", "Are she tired?", "Am she tired?"] },
  { q: "Complete: '___ you a student?' (Apakah kamu)", a: "Are", w: ["Is", "Am", "Be"] },
  { q: "Complete: '___ he your brother?' (Apakah dia)", a: "Is", w: ["Are", "Am", "Be"] },
  { q: "Complete: 'Yes, I ___.' (jawaban singkat untuk 'Are you a student?')", a: "am", w: ["is", "are", "be"] },
  { q: "Complete: 'No, she ___ not.' (jawaban singkat untuk 'Is she your sister?')", a: "is", w: ["am", "are", "be"] },
  { q: "Complete: 'Yes, they ___.' (jawaban singkat untuk 'Are they friends?')", a: "are", w: ["is", "am", "be"] }
];

const superlativeAdjectives: FactItem[] = [
  { q: "Bentuk superlatif dari 'Big' adalah...?", a: "The biggest", w: ["Bigger", "More big", "Biggest only"] },
  { q: "Bentuk superlatif dari 'Small' adalah...?", a: "The smallest", w: ["Smaller", "More small", "Smallest only"] },
  { q: "Bentuk superlatif dari 'Tall' adalah...?", a: "The tallest", w: ["Taller", "More tall", "Tallest only"] },
  { q: "Bentuk superlatif dari 'Fast' adalah...?", a: "The fastest", w: ["Faster", "More fast", "Fastest only"] },
  { q: "Bentuk superlatif dari 'Beautiful' adalah...?", a: "The most beautiful", w: ["Beautifuller", "Beautifullest", "More beautiful"] },
  { q: "Bentuk superlatif dari 'Good' adalah...?", a: "The best", w: ["Gooder", "Goodest", "Most good"] },
  { q: "Bentuk superlatif dari 'Bad' adalah...?", a: "The worst", w: ["Badder", "Baddest", "Most bad"] },
  { q: "Kata sifat pendek biasanya membentuk superlatif dengan menambahkan awalan 'the' dan akhiran...?", a: "-est", w: ["-er", "most", "-ly"] },
  { q: "Kata sifat panjang biasanya membentuk superlatif dengan menambahkan kata...?", a: "the most", w: ["-er", "-est", "-ly"] },
  { q: "Complete: 'Mount Everest is ___ mountain in the world.' (the highest)", a: "the highest", w: ["higher", "high", "more high"] },
  { q: "Complete: 'This is ___ interesting book I have ever read.' (the most)", a: "the most", w: ["more", "most", "the more"] },
  { q: "Complete: 'She is ___ student in the class.' (the smartest)", a: "the smartest", w: ["smarter", "smart", "more smart"] },
  { q: "Bentuk superlatif dari 'Happy' adalah...?", a: "The happiest", w: ["Happier", "More happy", "Happiest only"] },
  { q: "Bentuk superlatif dari 'Expensive' adalah...?", a: "The most expensive", w: ["Expensiver", "Expensivest", "More expensive"] },
  { q: "Complete: 'The cheetah is ___ animal on land.' (the fastest)", a: "the fastest", w: ["faster", "fast", "more fast"] },
  { q: "Bentuk superlatif dari 'Far' adalah...?", a: "The farthest / The furthest", w: ["Farer", "More far", "Farthest without the"] },
  { q: "Complete: 'This is ___ delicious food in this restaurant.' (the most)", a: "the most", w: ["more", "most only", "the more"] },
  { q: "Bentuk superlatif dari 'Old' adalah...?", a: "The oldest", w: ["Older", "More old", "Oldest only"] },
  { q: "Bentuk superlatif dari 'Young' adalah...?", a: "The youngest", w: ["Younger", "More young", "Youngest only"] },
  { q: "Complete: 'He is ___ boy in his family.' (the tallest)", a: "the tallest", w: ["taller", "tall", "more tall"] }
];

const commonExpressions: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Permisi'?", a: "Excuse me", w: ["I'm sorry", "Nice to meet you", "See you later"] },
  { q: "Apakah bahasa Inggris dari 'Senang bertemu denganmu'?", a: "Nice to meet you", w: ["Excuse me", "See you later", "How are you"] },
  { q: "Apakah bahasa Inggris dari 'Sampai jumpa lagi'?", a: "See you later", w: ["Excuse me", "Nice to meet you", "Congratulations"] },
  { q: "Apakah bahasa Inggris dari 'Selamat'?", a: "Congratulations", w: ["Excuse me", "I'm sorry", "See you later"] },
  { q: "Apakah bahasa Inggris dari 'Silakan'?", a: "Please / Go ahead", w: ["Excuse me", "Sorry", "Never mind"] },
  { q: "Apakah bahasa Inggris dari 'Tidak apa-apa'?", a: "Never mind / It's okay", w: ["Congratulations", "Nice to meet you", "See you later"] },
  { q: "Apakah bahasa Inggris dari 'Semoga beruntung'?", a: "Good luck", w: ["Congratulations", "Never mind", "Excuse me"] },
  { q: "Apakah bahasa Inggris dari 'Selamat ulang tahun'?", a: "Happy birthday", w: ["Good luck", "Congratulations", "Nice to meet you"] },
  { q: "Kita mengucapkan 'Excuse me' saat kita ingin...?", a: "Meminta izin atau menyela dengan sopan", w: ["Mengucapkan selamat", "Berpamitan", "Memuji seseorang"] },
  { q: "Kita mengucapkan 'Congratulations' saat...?", a: "Memberi selamat atas pencapaian seseorang", w: ["Meminta maaf", "Berpamitan", "Bertanya kabar"] },
  { q: "Kita mengucapkan 'Good luck' sebelum seseorang...?", a: "Melakukan sesuatu yang penting, misalnya ujian", w: ["Tidur", "Makan siang", "Pulang ke rumah"] },
  { q: "Apakah bahasa Inggris dari 'Bagaimana cuacanya hari ini?'?", a: "How is the weather today?", w: ["What is your name?", "Where do you live?", "Who are you?"] },
  { q: "Apakah bahasa Inggris dari 'Aku setuju'?", a: "I agree", w: ["I disagree", "I don't know", "I'm sorry"] },
  { q: "Apakah bahasa Inggris dari 'Aku tidak setuju'?", a: "I disagree", w: ["I agree", "I don't mind", "I'm sure"] },
  { q: "Apakah bahasa Inggris dari 'Aku tidak tahu'?", a: "I don't know", w: ["I agree", "I disagree", "I'm sure"] },
  { q: "Apakah bahasa Inggris dari 'Boleh saya bertanya?'?", a: "May I ask a question?", w: ["May I go home?", "May I eat now?", "May I sleep now?"] },
  { q: "Apakah bahasa Inggris dari 'Tentu saja'?", a: "Of course", w: ["Never mind", "I disagree", "Excuse me"] },
  { q: "Apakah bahasa Inggris dari 'Sampai besok'?", a: "See you tomorrow", w: ["See you later", "Goodbye forever", "Good morning"] },
  { q: "Apakah bahasa Inggris dari 'Selamat beristirahat'?", a: "Have a good rest", w: ["Good luck", "Congratulations", "Excuse me"] },
  { q: "Apakah bahasa Inggris dari 'Semoga harimu menyenangkan'?", a: "Have a nice day", w: ["Good luck", "Congratulations", "Never mind"] }
];

const readingComprehension2: FactItem[] = [
  { q: "Baca teks: 'Lisa is a good swimmer. She practices swimming every Saturday morning.' When does Lisa practice swimming?", a: "Every Saturday morning", w: ["Every Sunday evening", "Every Friday night", "Every Monday morning"] },
  { q: "Baca teks: 'The zoo has many animals, such as lions, elephants, and giraffes.' Which animals are mentioned in the text?", a: "Lions, elephants, and giraffes", w: ["Cats, dogs, and birds", "Fish and turtles", "Cows and goats"] },
  { q: "Baca teks: 'Rian usually goes to bed at nine and wakes up at six.' How many hours does Rian sleep?", a: "Nine hours", w: ["Six hours", "Ten hours", "Eight hours"] },
  { q: "Baca teks: 'The weather was cold, so Maya wore a thick jacket.' Why did Maya wear a thick jacket?", a: "Because the weather was cold", w: ["Because the weather was hot", "Because it was raining", "Because it was her birthday"] },
  { q: "Baca teks: 'My brother collects stamps from many different countries.' What does the brother collect?", a: "Stamps", w: ["Coins", "Toys", "Books"] },
  { q: "Baca teks: 'The farmer wakes up early to feed his chickens and cows.' What does the farmer do early in the morning?", a: "Feeds his chickens and cows", w: ["Sleeps all day", "Goes to school", "Watches TV"] },
  { q: "Baca teks: 'Dina forgot her umbrella, so she got wet in the rain.' What happened to Dina?", a: "She got wet in the rain", w: ["She stayed dry", "She lost her bag", "She fell asleep"] },
  { q: "Baca teks: 'The museum is open from nine in the morning until four in the afternoon.' What time does the museum close?", a: "Four in the afternoon", w: ["Nine in the morning", "Six in the evening", "Twelve at noon"] },
  { q: "Baca teks: 'After finishing his meal, Doni washed the dishes.' What did Doni do after eating?", a: "He washed the dishes", w: ["He went to sleep", "He watched TV", "He did his homework"] },
  { q: "Baca teks: 'The kite flew high in the sky because the wind was strong.' Why did the kite fly high?", a: "Because the wind was strong", w: ["Because it was raining", "Because it was heavy", "Because it was broken"] },
  { q: "Baca teks: 'Every Friday, the students clean their classroom together.' What do the students do every Friday?", a: "Clean their classroom together", w: ["Have a test", "Go on a field trip", "Have a holiday"] },
  { q: "Baca teks: 'The new restaurant serves delicious noodles and fried rice.' What food does the restaurant serve?", a: "Noodles and fried rice", w: ["Pizza and pasta", "Bread and cheese", "Salad and soup only"] },
  { q: "Baca teks: 'Because he studied hard, Andi passed his exam with a high score.' Why did Andi get a high score?", a: "Because he studied hard", w: ["Because the exam was easy", "Because he was lucky", "Because he copied his friend"] },
  { q: "Baca teks: 'The garden is full of colorful flowers in spring.' When is the garden full of colorful flowers?", a: "In spring", w: ["In winter", "In summer", "In autumn"] },
  { q: "Baca teks: 'The little boy cried because he lost his favorite toy.' Why did the little boy cry?", a: "Because he lost his favorite toy", w: ["Because he was hungry", "Because he was sleepy", "Because it was raining"] },
  { q: "Baca teks: 'Every morning, Fira drinks a glass of milk before school.' What does Fira drink every morning?", a: "A glass of milk", w: ["A cup of coffee", "A glass of juice", "A bottle of water"] },
  { q: "Baca teks: 'The old man walks slowly with his wooden cane.' How does the old man walk?", a: "Slowly with a wooden cane", w: ["Quickly without help", "By running", "By riding a bicycle"] },
  { q: "Baca teks: 'The bakery smells wonderful because they just baked fresh bread.' Why does the bakery smell wonderful?", a: "Because they just baked fresh bread", w: ["Because it is closed", "Because it is empty", "Because it rained"] },
  { q: "Baca teks: 'Nadia practices piano for one hour every afternoon.' How long does Nadia practice piano?", a: "One hour", w: ["Two hours", "Thirty minutes", "Three hours"] },
  { q: "Baca teks: 'The puppy chased its tail happily around the yard.' What was the puppy doing?", a: "Chasing its tail around the yard", w: ["Sleeping in its bed", "Eating its food", "Barking at strangers"] }
];

  return [
    ...buildFromFacts(demonstratives, "ENG_SD4", "SD Kelas 4", "Bahasa Inggris", 0),
    ...buildFromFacts(toBeGrammar, "ENG_SD4", "SD Kelas 4", "Bahasa Inggris", 20),
    ...buildFromFacts(superlativeAdjectives, "ENG_SD4", "SD Kelas 4", "Bahasa Inggris", 40),
    ...buildFromFacts(commonExpressions, "ENG_SD4", "SD Kelas 4", "Bahasa Inggris", 60),
    ...buildFromFacts(readingComprehension2, "ENG_SD4", "SD Kelas 4", "Bahasa Inggris", 80)
  ];
}

// Generate Bahasa Inggris SD Kelas 5 (11 tahun) — 100 questions
// Scope: present continuous tense, question words in context, professions
// and places vocabulary, reading comprehension.
function generateEnglishSD5(): Question[] {
const presentContinuous: FactItem[] = [
  { q: "Complete: 'I ___ (read) a book now.'", a: "am reading", w: ["is reading", "are reading", "read"] },
  { q: "Complete: 'She ___ (write) a letter right now.'", a: "is writing", w: ["am writing", "are writing", "writes"] },
  { q: "Complete: 'They ___ (play) football at the moment.'", a: "are playing", w: ["is playing", "am playing", "play"] },
  { q: "Complete: 'We ___ (watch) a movie now.'", a: "are watching", w: ["is watching", "am watching", "watch"] },
  { q: "Complete: 'He ___ (cook) dinner right now.'", a: "is cooking", w: ["am cooking", "are cooking", "cooks"] },
  { q: "Complete: 'The children ___ (sing) a song at the moment.'", a: "are singing", w: ["is singing", "am singing", "sing"] },
  { q: "Complete: 'I ___ (do) my homework now.'", a: "am doing", w: ["is doing", "are doing", "do"] },
  { q: "Complete: 'My father ___ (drive) to work right now.'", a: "is driving", w: ["am driving", "are driving", "drives"] },
  { q: "Present continuous tense digunakan untuk menyatakan kejadian yang sedang...?", a: "Berlangsung saat ini", w: ["Terjadi kemarin", "Akan terjadi besok", "Terjadi setiap hari"] },
  { q: "Rumus present continuous tense adalah subjek + to be + kata kerja + akhiran...?", a: "-ing", w: ["-ed", "-s", "-er"] },
  { q: "Complete: 'Look! The dog ___ (run) after the cat.'", a: "is running", w: ["am running", "are running", "runs"] },
  { q: "Complete: 'Listen! Someone ___ (knock) at the door.'", a: "is knocking", w: ["am knocking", "are knocking", "knocks"] },
  { q: "Complete: 'The students ___ (study) for their exam this week.'", a: "are studying", w: ["is studying", "am studying", "study"] },
  { q: "Bentuk negatif dari 'She is reading' adalah...?", a: "She is not reading", w: ["She not is reading", "She isn't reads", "She doesn't reading"] },
  { q: "Bentuk tanya dari 'They are playing' adalah...?", a: "Are they playing?", w: ["They are playing?", "Do they playing?", "Is they playing?"] },
  { q: "Complete: 'What ___ you (do) right now?'", a: "are...doing", w: ["is...doing", "am...doing", "do...doing"] },
  { q: "Complete: 'She ___ (not/sleep) at the moment; she is awake.'", a: "is not sleeping", w: ["are not sleeping", "am not sleeping", "does not sleeping"] },
  { q: "Complete: 'We ___ (wait) for the bus right now.'", a: "are waiting", w: ["is waiting", "am waiting", "wait"] },
  { q: "Complete: 'The baby ___ (cry) loudly at the moment.'", a: "is crying", w: ["am crying", "are crying", "cries"] },
  { q: "Complete: 'My friends and I ___ (plan) a trip this week.'", a: "are planning", w: ["is planning", "am planning", "plan"] },
  { q: "Complete: 'The sun ___ (set) right now; look how orange the sky is.'", a: "is setting", w: ["am setting", "are setting", "sets"] },
  { q: "Complete: 'I ___ (not/watch) TV now; I am studying.'", a: "am not watching", w: ["is not watching", "are not watching", "do not watching"] },
  { q: "Complete: 'The birds ___ (fly) south for the winter this month.'", a: "are flying", w: ["is flying", "am flying", "fly"] },
  { q: "Complete: 'He ___ (talk) on the phone right now.'", a: "is talking", w: ["am talking", "are talking", "talks"] },
  { q: "Complete: 'Why ___ you (laugh)?' (Mengapa kamu tertawa)", a: "are...laughing", w: ["is...laughing", "am...laughing", "do...laughing"] }
];

const questionWordsContext: FactItem[] = [
  { q: "'What are you doing?' biasanya digunakan untuk bertanya tentang...?", a: "Kegiatan yang sedang dilakukan", w: ["Tempat seseorang berada", "Waktu suatu kejadian", "Alasan seseorang melakukan sesuatu"] },
  { q: "'Where is the nearest hospital?' artinya...?", a: "Di mana rumah sakit terdekat?", w: ["Kapan rumah sakit buka?", "Siapa dokter di rumah sakit itu?", "Mengapa ada rumah sakit?"] },
  { q: "'When does the movie start?' artinya...?", a: "Kapan film itu dimulai?", w: ["Di mana film itu diputar?", "Siapa yang membintangi film itu?", "Mengapa film itu populer?"] },
  { q: "'Who is going to the party tonight?' artinya...?", a: "Siapa yang akan pergi ke pesta malam ini?", w: ["Di mana pesta diadakan?", "Kapan pesta dimulai?", "Mengapa ada pesta?"] },
  { q: "'Why is she crying?' artinya...?", a: "Mengapa dia menangis?", w: ["Bagaimana dia menangis?", "Kapan dia menangis?", "Di mana dia menangis?"] },
  { q: "'How do you go to school?' artinya...?", a: "Bagaimana caramu pergi ke sekolah?", w: ["Kapan kamu pergi ke sekolah?", "Di mana sekolahmu?", "Mengapa kamu pergi ke sekolah?"] },
  { q: "'Which one do you prefer?' digunakan untuk menanyakan...?", a: "Pilihan di antara beberapa hal", w: ["Waktu kejadian", "Alasan seseorang", "Lokasi suatu tempat"] },
  { q: "Bahasa Inggris dari 'Yang mana buku milikmu?' adalah...?", a: "Which one is your book?", w: ["What is your book?", "Where is your book?", "Who is your book?"] },
  { q: "'Whose bag is this?' artinya...?", a: "Ini tas siapa?", w: ["Apa ini?", "Di mana tas ini?", "Kapan tas ini dibeli?"] },
  { q: "Bahasa Inggris dari 'Tas siapa ini?' adalah...?", a: "Whose bag is this?", w: ["What bag is this?", "Where is this bag?", "Who has this bag?"] },
  { q: "'How far is the school from your house?' menanyakan tentang...?", a: "Jarak", w: ["Waktu", "Alasan", "Cara"] },
  { q: "'How long does it take?' menanyakan tentang...?", a: "Lamanya waktu", w: ["Jarak", "Alasan", "Jumlah"] },
  { q: "'How often do you exercise?' menanyakan tentang...?", a: "Seberapa sering", w: ["Jarak", "Alasan", "Lamanya waktu"] },
  { q: "Bahasa Inggris dari 'Seberapa sering kamu berolahraga?' adalah...?", a: "How often do you exercise?", w: ["How long do you exercise?", "How far do you exercise?", "How much do you exercise?"] },
  { q: "'What time do you usually wake up?' menanyakan tentang...?", a: "Jam berapa biasanya bangun", w: ["Di mana biasanya tidur", "Mengapa harus bangun", "Berapa lama tidur"] },
  { q: "Bahasa Inggris dari 'Kapan liburan sekolah dimulai?' adalah...?", a: "When does the school holiday start?", w: ["Where does the school holiday start?", "Who starts the school holiday?", "Why does the school holiday start?"] },
  { q: "Bahasa Inggris dari 'Mengapa kamu terlambat ke sekolah?' adalah...?", a: "Why are you late for school?", w: ["When are you late for school?", "Where are you late for school?", "How are you late for school?"] },
  { q: "Bahasa Inggris dari 'Bagaimana kabar keluargamu?' adalah...?", a: "How is your family?", w: ["What is your family?", "Where is your family?", "Who is your family?"] },
  { q: "Bahasa Inggris dari 'Siapa yang memasak makanan ini?' adalah...?", a: "Who cooked this food?", w: ["What cooked this food?", "Where cooked this food?", "When cooked this food?"] },
  { q: "Bahasa Inggris dari 'Di mana kamu meletakkan kunciku?' adalah...?", a: "Where did you put my key?", w: ["When did you put my key?", "Why did you put my key?", "Who did you put my key?"] }
];

const professionsVocab: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Dokter'?", a: "Doctor", w: ["Nurse", "Teacher", "Farmer"] },
  { q: "Apakah bahasa Inggris dari 'Perawat'?", a: "Nurse", w: ["Doctor", "Teacher", "Farmer"] },
  { q: "Apakah bahasa Inggris dari 'Guru'?", a: "Teacher", w: ["Doctor", "Nurse", "Farmer"] },
  { q: "Apakah bahasa Inggris dari 'Petani'?", a: "Farmer", w: ["Doctor", "Nurse", "Teacher"] },
  { q: "Apakah bahasa Inggris dari 'Polisi'?", a: "Police officer", w: ["Firefighter", "Pilot", "Chef"] },
  { q: "Apakah bahasa Inggris dari 'Pemadam Kebakaran'?", a: "Firefighter", w: ["Police officer", "Pilot", "Chef"] },
  { q: "Apakah bahasa Inggris dari 'Pilot'?", a: "Pilot", w: ["Police officer", "Firefighter", "Chef"] },
  { q: "Apakah bahasa Inggris dari 'Koki'?", a: "Chef / Cook", w: ["Police officer", "Firefighter", "Pilot"] },
  { q: "Apakah bahasa Inggris dari 'Nelayan'?", a: "Fisherman", w: ["Farmer", "Sailor", "Pilot"] },
  { q: "Apakah bahasa Inggris dari 'Pengacara'?", a: "Lawyer", w: ["Doctor", "Teacher", "Engineer"] },
  { q: "Apakah bahasa Inggris dari 'Insinyur'?", a: "Engineer", w: ["Lawyer", "Doctor", "Teacher"] },
  { q: "Apakah bahasa Inggris dari 'Penyanyi'?", a: "Singer", w: ["Dancer", "Painter", "Writer"] },
  { q: "Apakah bahasa Inggris dari 'Penari'?", a: "Dancer", w: ["Singer", "Painter", "Writer"] },
  { q: "Apakah bahasa Inggris dari 'Pelukis'?", a: "Painter", w: ["Singer", "Dancer", "Writer"] },
  { q: "Apakah bahasa Inggris dari 'Penulis'?", a: "Writer", w: ["Singer", "Dancer", "Painter"] },
  { q: "Apakah bahasa Inggris dari 'Sopir'?", a: "Driver", w: ["Pilot", "Sailor", "Farmer"] },
  { q: "Apakah bahasa Inggris dari 'Pedagang'?", a: "Merchant / Trader", w: ["Farmer", "Doctor", "Teacher"] },
  { q: "Apakah bahasa Inggris dari 'Tukang Kayu'?", a: "Carpenter", w: ["Farmer", "Fisherman", "Sailor"] },
  { q: "Apakah bahasa Inggris dari 'Tentara'?", a: "Soldier", w: ["Police officer", "Firefighter", "Sailor"] },
  { q: "Apakah bahasa Inggris dari 'Pramugari'?", a: "Flight attendant", w: ["Pilot", "Sailor", "Driver"] }
];

const placesVocab: FactItem[] = [
  { q: "Apakah bahasa Inggris dari 'Sekolah'?", a: "School", w: ["Hospital", "Market", "Bank"] },
  { q: "Apakah bahasa Inggris dari 'Rumah Sakit'?", a: "Hospital", w: ["School", "Market", "Bank"] },
  { q: "Apakah bahasa Inggris dari 'Pasar'?", a: "Market", w: ["School", "Hospital", "Bank"] },
  { q: "Apakah bahasa Inggris dari 'Bank'?", a: "Bank", w: ["School", "Hospital", "Market"] },
  { q: "Apakah bahasa Inggris dari 'Perpustakaan'?", a: "Library", w: ["Museum", "Park", "Zoo"] },
  { q: "Apakah bahasa Inggris dari 'Museum'?", a: "Museum", w: ["Library", "Park", "Zoo"] },
  { q: "Apakah bahasa Inggris dari 'Taman'?", a: "Park", w: ["Library", "Museum", "Zoo"] },
  { q: "Apakah bahasa Inggris dari 'Kebun Binatang'?", a: "Zoo", w: ["Library", "Museum", "Park"] },
  { q: "Apakah bahasa Inggris dari 'Bandara'?", a: "Airport", w: ["Train station", "Bus station", "Harbor"] },
  { q: "Apakah bahasa Inggris dari 'Stasiun Kereta'?", a: "Train station", w: ["Airport", "Bus station", "Harbor"] },
  { q: "Apakah bahasa Inggris dari 'Terminal Bus'?", a: "Bus station", w: ["Airport", "Train station", "Harbor"] },
  { q: "Apakah bahasa Inggris dari 'Pelabuhan'?", a: "Harbor", w: ["Airport", "Train station", "Bus station"] },
  { q: "Apakah bahasa Inggris dari 'Masjid'?", a: "Mosque", w: ["Church", "Temple", "Cathedral"] },
  { q: "Apakah bahasa Inggris dari 'Gereja'?", a: "Church", w: ["Mosque", "Temple", "Cathedral"] },
  { q: "Apakah bahasa Inggris dari 'Kantor Pos'?", a: "Post office", w: ["Police station", "Fire station", "Gas station"] },
  { q: "Apakah bahasa Inggris dari 'Kantor Polisi'?", a: "Police station", w: ["Post office", "Fire station", "Gas station"] },
  { q: "Apakah bahasa Inggris dari 'Pom Bensin'?", a: "Gas station", w: ["Post office", "Police station", "Fire station"] },
  { q: "Apakah bahasa Inggris dari 'Restoran'?", a: "Restaurant", w: ["Hotel", "Supermarket", "Cinema"] },
  { q: "Apakah bahasa Inggris dari 'Bioskop'?", a: "Cinema", w: ["Restaurant", "Hotel", "Supermarket"] },
  { q: "Apakah bahasa Inggris dari 'Hotel'?", a: "Hotel", w: ["Restaurant", "Cinema", "Supermarket"] }
];

const readingComprehension3: FactItem[] = [
  { q: "Baca teks: 'Every summer, my family goes camping in the mountains.' Where does the family go camping?", a: "In the mountains", w: ["At the beach", "In the city", "At the zoo"] },
  { q: "Baca teks: 'The chef prepared a delicious cake for the birthday party.' What did the chef prepare?", a: "A delicious cake", w: ["A pizza", "Fried noodles", "A sandwich"] },
  { q: "Baca teks: 'Because of the heavy traffic, Rani arrived late for the meeting.' Why did Rani arrive late?", a: "Because of heavy traffic", w: ["Because she overslept", "Because her car broke down", "Because she forgot the meeting"] },
  { q: "Baca teks: 'The scientist is studying how plants grow in different types of soil.' What is the scientist studying?", a: "How plants grow in different soil", w: ["How animals sleep", "How the weather changes", "How rivers flow"] },
  { q: "Baca teks: 'Although it was raining, the football match continued.' What happened despite the rain?", a: "The football match continued", w: ["The match was cancelled", "The players went home", "The stadium closed"] },
  { q: "Baca teks: 'The librarian helped Tono find a book about space.' What subject was Tono's book about?", a: "Space", w: ["Cooking", "History", "Music"] },
  { q: "Baca teks: 'After school, the students go straight to the library to study.' Where do the students go after school?", a: "To the library", w: ["To the cafeteria", "To the playground", "Home immediately"] },
  { q: "Baca teks: 'The fisherman went out early to catch fish before the storm arrived.' Why did the fisherman go out early?", a: "To catch fish before the storm arrived", w: ["To sell his boat", "To meet his friends", "To watch the sunrise"] },
  { q: "Baca teks: 'The new student felt nervous on her first day of school.' How did the new student feel?", a: "Nervous", w: ["Excited only", "Angry", "Bored"] },
  { q: "Baca teks: 'The engineer designed a bridge that could withstand strong earthquakes.' What did the engineer design?", a: "A bridge that could withstand earthquakes", w: ["A new type of car", "A tall building", "A small boat"] },
  { q: "Baca teks: 'Despite being tired, the athletes kept practicing for the competition.' What did the athletes do despite being tired?", a: "Kept practicing for the competition", w: ["Stopped training", "Went home to rest", "Skipped the competition"] },
  { q: "Baca teks: 'The gardener waters the plants every morning before sunrise.' When does the gardener water the plants?", a: "Every morning before sunrise", w: ["Every evening after sunset", "Once a week", "Only when it doesn't rain"] },
  { q: "Baca teks: 'The pilot announced that the flight would be delayed due to bad weather.' Why was the flight delayed?", a: "Due to bad weather", w: ["Due to a mechanical problem", "Due to too many passengers", "Due to a strike"] },
  { q: "Baca teks: 'The children were thrilled when they saw the fireworks at midnight.' How did the children feel?", a: "Thrilled", w: ["Sad", "Sleepy", "Angry"] },
  { q: "Baca teks: 'The teacher praised the students for their excellent teamwork on the project.' Why did the teacher praise the students?", a: "For their excellent teamwork", w: ["For being quiet", "For finishing early only", "For asking many questions"] }
];

  return [
    ...buildFromFacts(presentContinuous, "ENG_SD5", "SD Kelas 5", "Bahasa Inggris", 0),
    ...buildFromFacts(questionWordsContext, "ENG_SD5", "SD Kelas 5", "Bahasa Inggris", 25),
    ...buildFromFacts(professionsVocab, "ENG_SD5", "SD Kelas 5", "Bahasa Inggris", 45),
    ...buildFromFacts(placesVocab, "ENG_SD5", "SD Kelas 5", "Bahasa Inggris", 65),
    ...buildFromFacts(readingComprehension3, "ENG_SD5", "SD Kelas 5", "Bahasa Inggris", 85)
  ];
}

// Generate Bahasa Inggris SD Kelas 6 (12 tahun) — 100 questions
// Scope: mixed past tense (regular+irregular) sentence completion, synonyms,
// antonyms (new set), basic idioms/expressions, reading comprehension.
function generateEnglishSD6(): Question[] {
const mixedPastTense: FactItem[] = [
  { q: "Complete: 'Yesterday, I ___ (finish) my project.' (regular)", a: "finished", w: ["finish", "finishing", "finishes"] },
  { q: "Complete: 'Last week, she ___ (travel) to Bali.' (regular)", a: "traveled", w: ["travel", "traveling", "travels"] },
  { q: "Complete: 'He ___ (break) his leg last month.' (irregular)", a: "broke", w: ["breaked", "broken", "breaking"] },
  { q: "Complete: 'We ___ (choose) the blue one yesterday.' (irregular)", a: "chose", w: ["choosed", "chosen", "choosing"] },
  { q: "Complete: 'They ___ (arrive) at the airport two hours ago.' (regular)", a: "arrived", w: ["arrive", "arriving", "arrives"] },
  { q: "Complete: 'I ___ (forget) my umbrella at school yesterday.' (irregular)", a: "forgot", w: ["forgetted", "forgotten", "forgetting"] },
  { q: "Complete: 'The team ___ (win) the match last Saturday.' (irregular)", a: "won", w: ["winned", "wined", "winning"] },
  { q: "Complete: 'She ___ (decide) to become a doctor when she grows up.' (regular)", a: "decided", w: ["decide", "deciding", "decides"] },
  { q: "Complete: 'The workers ___ (build) the new bridge in six months.' (irregular)", a: "built", w: ["builded", "building", "builds"] },
  { q: "Complete: 'My grandfather ___ (tell) us a funny story last night.' (irregular)", a: "told", w: ["telled", "telling", "tells"] },
  { q: "Complete: 'We ___ (celebrate) my sister's birthday last Sunday.' (regular)", a: "celebrated", w: ["celebrate", "celebrating", "celebrates"] },
  { q: "Complete: 'The plane ___ (leave) the runway on time.' (irregular)", a: "left", w: ["leaved", "leaving", "leaves"] },
  { q: "Complete: 'I ___ (lose) my keys somewhere in the park.' (irregular)", a: "lost", w: ["losed", "losing", "loses"] },
  { q: "Complete: 'The magician ___ (surprise) everyone with his trick.' (regular)", a: "surprised", w: ["surprise", "surprising", "surprises"] },
  { q: "Complete: 'She ___ (feel) very happy after the good news.' (irregular)", a: "felt", w: ["feeled", "feeling", "feels"] },
  { q: "Complete: 'The company ___ (hire) ten new employees last month.' (regular)", a: "hired", w: ["hire", "hiring", "hires"] },
  { q: "Complete: 'He ___ (think) about the problem for a long time.' (irregular)", a: "thought", w: ["thinked", "thinking", "thinks"] },
  { q: "Complete: 'The audience ___ (clap) loudly after the performance.' (regular)", a: "clapped", w: ["clap", "clapping", "claps"] },
  { q: "Complete: 'They ___ (understand) the lesson very well yesterday.' (irregular)", a: "understood", w: ["understanded", "understanding", "understands"] },
  { q: "Complete: 'I ___ (try) to fix my bicycle by myself yesterday.' (regular)", a: "tried", w: ["try", "trying", "tries"] },
  { q: "Complete: 'The chef ___ (cut) the vegetables very quickly.' (irregular)", a: "cut", w: ["cutted", "cutting", "cuts"] },
  { q: "Complete: 'We ___ (learn) many new words last semester.' (regular)", a: "learned", w: ["learn", "learning", "learns"] },
  { q: "Complete: 'The dog ___ (hide) under the table during the storm.' (irregular)", a: "hid", w: ["hided", "hiding", "hides"] },
  { q: "Complete: 'She ___ (paint) a beautiful picture last weekend.' (regular)", a: "painted", w: ["paint", "painting", "paints"] },
  { q: "Complete: 'My father ___ (teach) me how to ride a bike when I was five.' (irregular)", a: "taught", w: ["teached", "teaching", "teaches"] }
];

const synonyms: FactItem[] = [
  { q: "Sinonim dari 'Happy' adalah...?", a: "Glad", w: ["Sad", "Angry", "Tired"] },
  { q: "Sinonim dari 'Big' adalah...?", a: "Large", w: ["Small", "Tiny", "Short"] },
  { q: "Sinonim dari 'Small' adalah...?", a: "Little", w: ["Big", "Huge", "Tall"] },
  { q: "Sinonim dari 'Beautiful' adalah...?", a: "Pretty", w: ["Ugly", "Plain", "Dull"] },
  { q: "Sinonim dari 'Smart' adalah...?", a: "Intelligent", w: ["Slow", "Lazy", "Weak"] },
  { q: "Sinonim dari 'Fast' adalah...?", a: "Quick", w: ["Slow", "Late", "Lazy"] },
  { q: "Sinonim dari 'Begin' adalah...?", a: "Start", w: ["End", "Stop", "Finish"] },
  { q: "Sinonim dari 'End' adalah...?", a: "Finish", w: ["Start", "Begin", "Open"] },
  { q: "Sinonim dari 'Look' adalah...?", a: "See / Watch", w: ["Hear", "Smell", "Taste"] },
  { q: "Sinonim dari 'Say' adalah...?", a: "Speak / Tell", w: ["Listen", "Write", "Read"] },
  { q: "Sinonim dari 'Angry' adalah...?", a: "Mad", w: ["Happy", "Calm", "Glad"] },
  { q: "Sinonim dari 'Afraid' adalah...?", a: "Scared", w: ["Brave", "Happy", "Calm"] },
  { q: "Sinonim dari 'Rich' adalah...?", a: "Wealthy", w: ["Poor", "Broke", "Cheap"] },
  { q: "Sinonim dari 'Sad' adalah...?", a: "Unhappy", w: ["Glad", "Cheerful", "Excited"] },
  { q: "Sinonim dari 'Difficult' adalah...?", a: "Hard", w: ["Easy", "Simple", "Light"] },
  { q: "Sinonim dari 'Simple' adalah...?", a: "Easy", w: ["Hard", "Complex", "Difficult"] },
  { q: "Sinonim dari 'Buy' adalah...?", a: "Purchase", w: ["Sell", "Give", "Return"] },
  { q: "Sinonim dari 'Help' adalah...?", a: "Assist", w: ["Ignore", "Refuse", "Stop"] },
  { q: "Sinonim dari 'Funny' adalah...?", a: "Hilarious", w: ["Boring", "Serious", "Sad"] },
  { q: "Sinonim dari 'Tired' adalah...?", a: "Exhausted", w: ["Energetic", "Fresh", "Active"] }
];

const antonymsNew: FactItem[] = [
  { q: "Lawan kata dari 'Difficult' adalah...?", a: "Easy", w: ["Hard", "Complex", "Tough"] },
  { q: "Lawan kata dari 'Ancient' adalah...?", a: "Modern", w: ["Old", "Historic", "Antique"] },
  { q: "Lawan kata dari 'Brave' adalah...?", a: "Cowardly", w: ["Strong", "Bold", "Fearless"] },
  { q: "Lawan kata dari 'Generous' adalah...?", a: "Stingy", w: ["Kind", "Giving", "Helpful"] },
  { q: "Lawan kata dari 'Polite' adalah...?", a: "Rude", w: ["Kind", "Respectful", "Gentle"] },
  { q: "Lawan kata dari 'Honest' adalah...?", a: "Dishonest", w: ["Truthful", "Sincere", "Fair"] },
  { q: "Lawan kata dari 'Wide' adalah...?", a: "Narrow", w: ["Broad", "Large", "Big"] },
  { q: "Lawan kata dari 'Deep' adalah...?", a: "Shallow", w: ["Wide", "Tall", "Long"] },
  { q: "Lawan kata dari 'Increase' adalah...?", a: "Decrease", w: ["Grow", "Expand", "Rise"] },
  { q: "Lawan kata dari 'Arrive' adalah...?", a: "Depart", w: ["Come", "Reach", "Enter"] },
  { q: "Lawan kata dari 'Remember' adalah...?", a: "Forget", w: ["Recall", "Know", "Learn"] },
  { q: "Lawan kata dari 'Accept' adalah...?", a: "Reject", w: ["Agree", "Approve", "Allow"] },
  { q: "Lawan kata dari 'Victory' adalah...?", a: "Defeat", w: ["Success", "Win", "Triumph"] },
  { q: "Lawan kata dari 'Include' adalah...?", a: "Exclude", w: ["Add", "Contain", "Involve"] },
  { q: "Lawan kata dari 'Complicated' adalah...?", a: "Simple", w: ["Difficult", "Confusing", "Complex"] },
  { q: "Lawan kata dari 'Interior' adalah...?", a: "Exterior", w: ["Inside", "Internal", "Indoor"] },
  { q: "Lawan kata dari 'Permanent' adalah...?", a: "Temporary", w: ["Fixed", "Lasting", "Stable"] },
  { q: "Lawan kata dari 'Success' adalah...?", a: "Failure", w: ["Victory", "Achievement", "Win"] },
  { q: "Lawan kata dari 'Guilty' adalah...?", a: "Innocent", w: ["Ashamed", "Nervous", "Confused"] },
  { q: "Lawan kata dari 'Genuine' adalah...?", a: "Fake", w: ["Real", "True", "Authentic"] }
];

const idiomsExpressions: FactItem[] = [
  { q: "Ungkapan 'Piece of cake' artinya sesuatu yang...?", a: "Sangat mudah", w: ["Sangat sulit", "Sangat lezat", "Sangat mahal"] },
  { q: "Ungkapan 'Break a leg' digunakan untuk...?", a: "Mengucapkan semoga sukses/beruntung", w: ["Menyuruh seseorang berhenti", "Mengucapkan selamat tinggal", "Menyampaikan berita buruk"] },
  { q: "Ungkapan 'It's raining cats and dogs' artinya...?", a: "Hujan sangat deras", w: ["Ada banyak hewan berjatuhan", "Cuaca sangat cerah", "Hujan sangat ringan"] },
  { q: "Ungkapan 'Once in a blue moon' artinya sesuatu yang...?", a: "Jarang terjadi", w: ["Sering terjadi", "Terjadi setiap hari", "Tidak pernah terjadi"] },
  { q: "Ungkapan 'Cost an arm and a leg' artinya sesuatu yang...?", a: "Sangat mahal", w: ["Sangat murah", "Sangat berbahaya", "Sangat lucu"] },
  { q: "Ungkapan 'Under the weather' artinya seseorang sedang...?", a: "Merasa tidak enak badan", w: ["Sangat bahagia", "Sangat kuat", "Sangat lapar"] },
  { q: "Ungkapan 'A blessing in disguise' artinya sesuatu yang awalnya terlihat buruk tetapi ternyata...?", a: "Membawa hal baik", w: ["Tetap buruk", "Membuat marah", "Membuat sedih"] },
  { q: "Ungkapan 'Hit the books' artinya...?", a: "Belajar dengan sungguh-sungguh", w: ["Membuang buku", "Membeli buku baru", "Meminjam buku"] },
  { q: "Ungkapan 'Feeling under pressure' artinya...?", a: "Merasa tertekan", w: ["Merasa sangat gembira", "Merasa sangat lapar", "Merasa sangat mengantuk"] },
  { q: "Ungkapan 'Better late than never' artinya...?", a: "Lebih baik terlambat daripada tidak sama sekali", w: ["Lebih baik tidak datang", "Selalu tepat waktu itu penting", "Terlambat selalu buruk"] },
  { q: "Ungkapan 'The ball is in your court' artinya...?", a: "Keputusan ada di tanganmu", w: ["Bola ada di lapangan", "Permainan sudah selesai", "Kamu harus menyerah"] },
  { q: "Ungkapan 'Speak of the devil' diucapkan saat...?", a: "Seseorang yang baru saja dibicarakan tiba-tiba muncul", w: ["Ada sesuatu yang menakutkan terjadi", "Seseorang berbohong", "Ada masalah besar terjadi"] },
  { q: "Ungkapan 'Time flies' artinya...?", a: "Waktu berjalan sangat cepat", w: ["Waktu berjalan sangat lambat", "Ada burung terbang", "Waktu berhenti"] },
  { q: "Ungkapan 'Actions speak louder than words' artinya...?", a: "Tindakan lebih penting daripada perkataan", w: ["Kata-kata lebih penting dari tindakan", "Diam lebih baik dari berbicara", "Berteriak lebih efektif"] },
  { q: "Ungkapan 'Don't judge a book by its cover' artinya...?", a: "Jangan menilai sesuatu hanya dari luarnya saja", w: ["Selalu percaya penampilan luar", "Buku itu penting untuk dinilai", "Sampul buku menentukan isinya"] },
  { q: "Ungkapan 'Practice makes perfect' artinya...?", a: "Latihan terus-menerus akan membuat kita mahir", w: ["Latihan itu tidak perlu", "Kesempurnaan tidak mungkin dicapai", "Latihan sekali sudah cukup"] },
  { q: "Ungkapan 'Two heads are better than one' artinya...?", a: "Bekerja sama lebih baik daripada sendirian", w: ["Bekerja sendiri lebih efektif", "Dua orang selalu berdebat", "Lebih baik diam saja"] },
  { q: "Ungkapan 'The early bird catches the worm' artinya...?", a: "Orang yang bertindak lebih awal akan mendapat keuntungan", w: ["Burung selalu bangun pagi", "Terlambat itu tidak masalah", "Cacing sulit ditangkap"] },
  { q: "Ungkapan 'When it rains, it pours' artinya...?", a: "Masalah sering datang bersamaan dalam jumlah banyak", w: ["Hujan selalu deras", "Masalah datang satu per satu", "Cuaca sulit diprediksi"] },
  { q: "Ungkapan 'Every cloud has a silver lining' artinya...?", a: "Selalu ada sisi baik di balik situasi buruk", w: ["Awan selalu berwarna perak", "Situasi buruk tidak ada solusinya", "Cuaca akan selalu mendung"] }
];

const readingComprehension4: FactItem[] = [
  { q: "Baca teks: 'Rina worked hard for years before finally opening her own bakery.' What did Rina achieve after years of hard work?", a: "She opened her own bakery", w: ["She became a teacher", "She traveled abroad", "She won a competition"] },
  { q: "Baca teks: 'The volcano had been dormant for decades before it suddenly erupted last year.' What happened to the volcano last year?", a: "It suddenly erupted", w: ["It disappeared", "It became a lake", "It stayed dormant"] },
  { q: "Baca teks: 'Even though the test was difficult, most students managed to pass it.' What happened despite the difficult test?", a: "Most students managed to pass", w: ["All students failed", "The test was cancelled", "No one finished the test"] },
  { q: "Baca teks: 'The company decided to plant a thousand trees to reduce their carbon footprint.' Why did the company plant trees?", a: "To reduce their carbon footprint", w: ["To build a new office", "To sell the wood", "To create a park for fun"] },
  { q: "Baca teks: 'The old bridge was replaced with a stronger, modern one after years of use.' What happened to the old bridge?", a: "It was replaced with a modern one", w: ["It was repaired only", "It was left as it was", "It was moved to another city"] },
  { q: "Baca teks: 'Despite the language barrier, the two friends managed to communicate using gestures.' How did the friends communicate?", a: "Using gestures", w: ["Using a translator", "By writing letters", "They could not communicate"] },
  { q: "Baca teks: 'The scientists discovered a new species of fish deep in the ocean.' What did the scientists discover?", a: "A new species of fish", w: ["A new type of plant", "An ancient shipwreck", "A new island"] },
  { q: "Baca teks: 'The charity collected donations to help families affected by the flood.' Who did the charity help?", a: "Families affected by the flood", w: ["Students preparing for exams", "Athletes in a competition", "Tourists visiting the city"] },
  { q: "Baca teks: 'Although he was nervous, the boy gave a confident speech in front of the whole school.' How did the boy feel before the speech?", a: "Nervous", w: ["Confident from the start", "Angry", "Bored"] },
  { q: "Baca teks: 'The farmers used a new irrigation system to grow crops during the dry season.' What helped the farmers grow crops in the dry season?", a: "A new irrigation system", w: ["More rainfall", "A new type of soil", "Extra sunlight"] },
  { q: "Baca teks: 'The museum added a new exhibit about ancient civilizations, attracting many visitors.' What attracted many visitors to the museum?", a: "A new exhibit about ancient civilizations", w: ["A free entrance day", "A new cafe", "A gift shop sale"] },
  { q: "Baca teks: 'The team celebrated their victory after months of hard training.' Why did the team celebrate?", a: "Because they won after months of hard training", w: ["Because the season ended", "Because they lost the game", "Because it was a holiday"] },
  { q: "Baca teks: 'The author spent five years researching before writing her historical novel.' How long did the author research?", a: "Five years", w: ["One year", "Ten years", "Six months"] },
  { q: "Baca teks: 'The city built a new park where children could play safely away from traffic.' Why did the city build the park?", a: "So children could play safely away from traffic", w: ["To reduce pollution only", "To attract tourists", "To sell the land later"] },
  { q: "Baca teks: 'The astronaut described the incredible view of Earth from space.' What did the astronaut describe?", a: "The view of Earth from space", w: ["A new planet", "The inside of the spaceship", "A meeting with aliens"] }
];

  return [
    ...buildFromFacts(mixedPastTense, "ENG_SD6", "SD Kelas 6", "Bahasa Inggris", 0),
    ...buildFromFacts(synonyms, "ENG_SD6", "SD Kelas 6", "Bahasa Inggris", 25),
    ...buildFromFacts(antonymsNew, "ENG_SD6", "SD Kelas 6", "Bahasa Inggris", 45),
    ...buildFromFacts(idiomsExpressions, "ENG_SD6", "SD Kelas 6", "Bahasa Inggris", 65),
    ...buildFromFacts(readingComprehension4, "ENG_SD6", "SD Kelas 6", "Bahasa Inggris", 85)
  ];
}

// ==========================================
// BATCH 2 — PENGETAHUAN UMUM: Preschool 1 & 2, SD Kelas 1-6
// ==========================================

// Generate Pengetahuan Umum Preschool 1 (2 tahun) — 100 questions
// Scope: transportation vehicles, community helper roles (beyond TK A set),
// basic safety rules, and manners/politeness.
function generateGeneralKnowledgePreschool1(): Question[] {
const transportVehicles: FactItem[] = [
  { q: "Kendaraan beroda dua yang dikayuh menggunakan kaki disebut...?", a: "Sepeda", w: ["Motor", "Mobil", "Bus"] },
  { q: "Kendaraan beroda dua yang menggunakan mesin disebut...?", a: "Sepeda Motor", w: ["Sepeda", "Mobil", "Kereta"] },
  { q: "Kendaraan beroda empat untuk keluarga disebut...?", a: "Mobil", w: ["Motor", "Sepeda", "Kapal"] },
  { q: "Kendaraan besar yang mengangkut banyak penumpang di jalan raya disebut...?", a: "Bus", w: ["Motor", "Sepeda", "Kapal"] },
  { q: "Kendaraan yang berjalan di atas rel disebut...?", a: "Kereta Api", w: ["Bus", "Mobil", "Sepeda"] },
  { q: "Kendaraan yang terbang di udara membawa penumpang disebut...?", a: "Pesawat Terbang", w: ["Kapal", "Kereta", "Bus"] },
  { q: "Kendaraan yang berlayar di atas air disebut...?", a: "Kapal", w: ["Pesawat", "Kereta", "Motor"] },
  { q: "Kendaraan roda tiga yang biasa mengangkut penumpang di kota disebut...?", a: "Bajaj / Becak", w: ["Bus", "Kereta", "Pesawat"] },
  { q: "Kendaraan pemadam kebakaran berwarna...?", a: "Merah", w: ["Biru", "Hijau", "Kuning"] },
  { q: "Kendaraan ambulans digunakan untuk mengangkut...?", a: "Orang sakit", w: ["Barang belanja", "Hewan peliharaan", "Sampah"] },
  { q: "Kendaraan yang mengangkut barang-barang besar disebut...?", a: "Truk", w: ["Sepeda", "Motor", "Becak"] },
  { q: "Kendaraan yang digunakan untuk membawa surat dan paket disebut...?", a: "Mobil Pos", w: ["Ambulans", "Pemadam Kebakaran", "Bus Sekolah"] },
  { q: "Kendaraan yang biasa dinaiki anak-anak untuk pergi ke sekolah bersama-sama disebut...?", a: "Bus Sekolah", w: ["Kapal", "Pesawat", "Truk"] },
  { q: "Tempat pesawat terbang mendarat dan lepas landas disebut...?", a: "Bandara", w: ["Stasiun", "Terminal", "Pelabuhan"] },
  { q: "Tempat kereta api berhenti untuk menaikkan dan menurunkan penumpang disebut...?", a: "Stasiun", w: ["Bandara", "Pelabuhan", "Terminal"] },
  { q: "Tempat kapal laut berlabuh disebut...?", a: "Pelabuhan", w: ["Bandara", "Stasiun", "Terminal"] },
  { q: "Tempat bus berhenti dan menunggu penumpang disebut...?", a: "Terminal / Halte", w: ["Bandara", "Stasiun", "Pelabuhan"] },
  { q: "Alat yang digunakan untuk melindungi kepala saat naik motor disebut...?", a: "Helm", w: ["Topi", "Payung", "Sarung Tangan"] },
  { q: "Sabuk yang digunakan untuk keamanan saat naik mobil disebut...?", a: "Sabuk Pengaman", w: ["Ikat Pinggang", "Tali", "Selendang"] },
  { q: "Kendaraan yang bergerak sangat cepat di atas rel khusus dan biasa digunakan untuk perjalanan jauh disebut...?", a: "Kereta Cepat", w: ["Sepeda", "Becak", "Bajaj"] },
  { q: "Alat yang mengarahkan lalu lintas dengan warna merah, kuning, dan hijau disebut...?", a: "Lampu Lalu Lintas", w: ["Rambu Jalan", "Papan Iklan", "Lampu Rumah"] },
  { q: "Tempat menyeberang jalan yang aman untuk pejalan kaki disebut...?", a: "Zebra Cross", w: ["Trotoar", "Halte", "Terminal"] },
  { q: "Bagian jalan khusus untuk pejalan kaki disebut...?", a: "Trotoar", w: ["Zebra Cross", "Halte", "Terminal"] },
  { q: "Kendaraan yang biasa digunakan untuk mengangkut hasil panen petani disebut...?", a: "Truk / Gerobak", w: ["Pesawat", "Kapal Pesiar", "Kereta Cepat"] },
  { q: "Kendaraan air kecil yang biasa dikayuh menggunakan dayung disebut...?", a: "Perahu", w: ["Kapal Pesiar", "Kapal Selam", "Kapal Tanker"] }
];

const communityHelpers: FactItem[] = [
  { q: "Orang yang bertugas menjaga keamanan dan ketertiban di jalan adalah...?", a: "Polisi", w: ["Dokter", "Guru", "Petani"] },
  { q: "Orang yang bertugas memadamkan kebakaran adalah...?", a: "Pemadam Kebakaran", w: ["Polisi", "Dokter", "Petani"] },
  { q: "Orang yang menanam padi dan sayuran di sawah atau ladang adalah...?", a: "Petani", w: ["Nelayan", "Pedagang", "Guru"] },
  { q: "Orang yang menangkap ikan di laut atau sungai adalah...?", a: "Nelayan", w: ["Petani", "Pedagang", "Guru"] },
  { q: "Orang yang mengajar di sekolah adalah...?", a: "Guru", w: ["Dokter", "Polisi", "Petani"] },
  { q: "Orang yang menjual barang di pasar atau toko adalah...?", a: "Pedagang", w: ["Petani", "Nelayan", "Guru"] },
  { q: "Orang yang mengantarkan surat dan paket ke rumah-rumah adalah...?", a: "Tukang Pos", w: ["Polisi", "Dokter", "Guru"] },
  { q: "Orang yang membangun rumah dan gedung adalah...?", a: "Tukang Bangunan", w: ["Petani", "Nelayan", "Guru"] },
  { q: "Orang yang memotong rambut adalah...?", a: "Tukang Cukur", w: ["Dokter", "Guru", "Polisi"] },
  { q: "Orang yang membuat dan memperbaiki sepatu adalah...?", a: "Tukang Sepatu", w: ["Petani", "Nelayan", "Guru"] },
  { q: "Orang yang mengangkut penumpang menggunakan becak atau ojek adalah...?", a: "Tukang Becak / Ojek", w: ["Dokter", "Guru", "Polisi"] },
  { q: "Orang yang menjaga dan merawat hewan yang sakit adalah...?", a: "Dokter Hewan", w: ["Dokter Gigi", "Dokter Mata", "Petani"] },
  { q: "Orang yang merawat gigi kita adalah...?", a: "Dokter Gigi", w: ["Dokter Hewan", "Dokter Mata", "Petani"] },
  { q: "Orang yang membantu ibu melahirkan bayi adalah...?", a: "Bidan", w: ["Guru", "Polisi", "Nelayan"] },
  { q: "Orang yang memasak makanan di restoran adalah...?", a: "Koki", w: ["Guru", "Polisi", "Nelayan"] },
  { q: "Orang yang menjaga kebersihan jalan dan lingkungan adalah...?", a: "Petugas Kebersihan", w: ["Polisi", "Dokter", "Guru"] },
  { q: "Orang yang mengemudikan kereta api adalah...?", a: "Masinis", w: ["Nakhoda", "Pilot", "Sopir"] },
  { q: "Orang yang mengemudikan kapal laut adalah...?", a: "Nakhoda", w: ["Masinis", "Pilot", "Sopir"] },
  { q: "Orang yang menjaga hutan dan hewan liar dari perburuan adalah...?", a: "Penjaga Hutan / Ranger", w: ["Petani", "Nelayan", "Pedagang"] },
  { q: "Orang yang bekerja menjaga keamanan di sebuah gedung atau kompleks disebut...?", a: "Satpam", w: ["Guru", "Dokter", "Nelayan"] },
  { q: "Orang yang mengantarkan penumpang menggunakan taksi atau angkot adalah...?", a: "Sopir", w: ["Masinis", "Nakhoda", "Pilot"] },
  { q: "Orang yang menyelamatkan orang tenggelam di pantai adalah...?", a: "Penjaga Pantai", w: ["Petani", "Guru", "Pedagang"] },
  { q: "Orang yang bekerja mengurus tanaman di taman kota adalah...?", a: "Tukang Kebun", w: ["Dokter", "Polisi", "Guru"] },
  { q: "Orang yang membuat roti dan kue di toko roti adalah...?", a: "Tukang Roti / Baker", w: ["Petani", "Nelayan", "Guru"] },
  { q: "Orang yang memperbaiki kendaraan yang rusak di bengkel adalah...?", a: "Montir", w: ["Guru", "Dokter", "Petani"] }
];

const safetyRules: FactItem[] = [
  { q: "Sebelum menyeberang jalan, kita harus melihat ke kanan dan ke...?", a: "Kiri", w: ["Atas", "Bawah", "Belakang saja"] },
  { q: "Saat naik motor, kita wajib memakai...?", a: "Helm", w: ["Topi", "Payung", "Kacamata hitam saja"] },
  { q: "Saat naik mobil, kita wajib memakai...?", a: "Sabuk Pengaman", w: ["Helm", "Payung", "Sarung Tangan"] },
  { q: "Kita menyeberang jalan sebaiknya di...?", a: "Zebra Cross", w: ["Tengah jalan sembarangan", "Belakang mobil", "Di manapun boleh"] },
  { q: "Jika ada kebakaran, kita harus segera...?", a: "Keluar rumah dan minta bantuan orang dewasa", w: ["Bersembunyi di kolong meja", "Mengambil mainan dulu", "Diam saja di tempat"] },
  { q: "Kita tidak boleh bermain di dekat...?", a: "Jalan raya yang ramai", w: ["Taman bermain", "Ruang keluarga", "Perpustakaan"] },
  { q: "Saat hujan disertai petir, sebaiknya kita berada di...?", a: "Dalam rumah", w: ["Lapangan terbuka", "Bawah pohon", "Tepi kolam"] },
  { q: "Kita tidak boleh menyentuh benda yang tajam seperti...?", a: "Pisau", w: ["Boneka", "Buku", "Bantal"] },
  { q: "Kita tidak boleh bermain dengan...?", a: "Api dan korek api", w: ["Bola", "Boneka", "Buku cerita"] },
  { q: "Jika tersesat di tempat ramai, kita sebaiknya mencari...?", a: "Petugas keamanan atau polisi", w: ["Orang asing sembarangan", "Tempat sepi", "Diam di tempat gelap"] },
  { q: "Nomor telepon darurat untuk memanggil polisi di Indonesia adalah...?", a: "110", w: ["119", "112 saja", "100"] },
  { q: "Nomor telepon darurat untuk memanggil ambulans di Indonesia adalah...?", a: "119", w: ["110", "113", "108"] },
  { q: "Sebelum makan, kita harus...?", a: "Mencuci tangan", w: ["Bermain dulu", "Menonton TV dulu", "Tidur dulu"] },
  { q: "Kita tidak boleh berbicara dengan...?", a: "Orang asing yang tidak dikenal tanpa didampingi orang tua", w: ["Guru di sekolah", "Anggota keluarga", "Teman sekelas"] },
  { q: "Saat naik sepeda, sebaiknya kita berada di jalur...?", a: "Khusus sepeda atau tepi jalan yang aman", w: ["Tengah jalan raya", "Jalur kereta api", "Jalur bus"] },
  { q: "Jika melihat orang tenggelam, kita sebaiknya...?", a: "Segera memanggil bantuan orang dewasa", w: ["Melompat ke air sendirian", "Diam saja dan pergi", "Tertawa"] },
  { q: "Kita tidak boleh bermain layang-layang di dekat...?", a: "Kabel listrik", w: ["Lapangan luas", "Taman kota", "Pantai"] },
  { q: "Saat gempa bumi, kita sebaiknya berlindung di bawah...?", a: "Meja yang kokoh", w: ["Lemari kaca", "Lampu gantung", "Jendela kaca"] },
  { q: "Kita harus meminta izin kepada orang tua sebelum...?", a: "Pergi bermain ke luar rumah", w: ["Tidur siang", "Makan malam", "Menonton TV di rumah"] },
  { q: "Alat yang digunakan untuk memadamkan api kecil di rumah disebut...?", a: "Alat Pemadam Api Ringan (APAR)", w: ["Selang taman", "Ember mainan", "Kipas angin"] },
  { q: "Kita sebaiknya tidak bermain di tepi kolam tanpa...?", a: "Pengawasan orang dewasa", w: ["Sepatu", "Topi", "Payung"] },
  { q: "Sebelum menyalakan kompor, sebaiknya kita meminta bantuan...?", a: "Orang dewasa", w: ["Teman sebaya", "Adik", "Hewan peliharaan"] },
  { q: "Jika ada asap di dalam rumah, sebaiknya kita...?", a: "Segera keluar dan memberi tahu orang dewasa", w: ["Bersembunyi di kamar", "Membuka semua jendela dulu", "Tidur kembali"] },
  { q: "Kita tidak boleh memasukkan benda kecil ke dalam...?", a: "Hidung atau telinga", w: ["Kotak mainan", "Tas sekolah", "Laci meja"] },
  { q: "Sebelum menyeberang di dekat sekolah, sebaiknya kita mengikuti arahan...?", a: "Petugas penyeberangan", w: ["Teman sebaya", "Kendaraan yang lewat", "Tidak ada yang perlu diikuti"] }
];

const politeness: FactItem[] = [
  { q: "Kita mengucapkan 'Permisi' saat...?", a: "Ingin lewat atau meminta izin dengan sopan", w: ["Marah kepada seseorang", "Ingin bermain", "Ingin tidur"] },
  { q: "Kita harus mengantre saat...?", a: "Menunggu giliran, misalnya membeli sesuatu", w: ["Bermain sendirian", "Tidur siang", "Membaca buku"] },
  { q: "Berbagi mainan dengan teman menunjukkan sikap...?", a: "Baik dan tidak egois", w: ["Egois", "Malas", "Sombong"] },
  { q: "Saat bertemu orang yang lebih tua, sebaiknya kita...?", a: "Menyapa dengan sopan", w: ["Mengabaikannya", "Berteriak", "Berlari menjauh"] },
  { q: "Jika ingin meminjam mainan teman, sebaiknya kita...?", a: "Meminta izin terlebih dahulu", w: ["Mengambilnya langsung", "Merebutnya", "Menyembunyikannya"] },
  { q: "Kita sebaiknya menutup mulut saat...?", a: "Batuk atau bersin", w: ["Berbicara pelan", "Tersenyum", "Mendengarkan"] },
  { q: "Sikap membantu orang lain yang kesulitan disebut sikap...?", a: "Peduli / Suka menolong", w: ["Egois", "Malas", "Cuek"] },
  { q: "Saat menerima hadiah dari orang lain, sebaiknya kita mengucapkan...?", a: "Terima kasih", w: ["Maaf", "Permisi", "Tolong"] },
  { q: "Sikap yang baik saat mendengarkan orang lain berbicara adalah...?", a: "Mendengarkan dengan tenang tanpa memotong", w: ["Berbicara sendiri", "Bermain gawai", "Berteriak"] },
  { q: "Jika tidak sengaja menabrak teman, sebaiknya kita mengucapkan...?", a: "Maaf", w: ["Terima kasih", "Permisi saja", "Tidak perlu apa-apa"] },
  { q: "Merapikan mainan setelah bermain menunjukkan sikap...?", a: "Bertanggung jawab", w: ["Malas", "Ceroboh", "Egois"] },
  { q: "Membuang sampah pada tempatnya menunjukkan sikap...?", a: "Peduli lingkungan", w: ["Malas", "Tidak peduli", "Egois"] },
  { q: "Sikap yang baik saat kalah dalam permainan adalah...?", a: "Menerima dengan lapang dada", w: ["Marah-marah", "Menangis berlebihan", "Menyalahkan teman"] },
  { q: "Berbicara dengan suara pelan dan sopan kepada orang tua menunjukkan sikap...?", a: "Hormat", w: ["Kasar", "Sombong", "Cuek"] },
  { q: "Sikap yang baik saat berjanji kepada teman adalah...?", a: "Menepati janji", w: ["Melupakannya", "Mengingkarinya", "Mengabaikannya"] },
  { q: "Jika melihat teman sedih, sebaiknya kita...?", a: "Menghibur atau menemaninya", w: ["Mengejeknya", "Meninggalkannya sendirian", "Menertawakannya"] },
  { q: "Sikap saling menghormati perbedaan agama dan suku disebut sikap...?", a: "Toleransi", w: ["Egois", "Sombong", "Diskriminasi"] },
  { q: "Sebelum tidur malam, sebaiknya kita mengucapkan...?", a: "Selamat malam kepada keluarga", w: ["Selamat pagi", "Selamat siang", "Tidak perlu apa-apa"] },
  { q: "Sikap rajin belajar dan mengerjakan tugas sekolah menunjukkan sikap...?", a: "Bertanggung jawab dan rajin", w: ["Malas", "Ceroboh", "Egois"] },
  { q: "Menghargai pendapat orang lain meskipun berbeda menunjukkan sikap...?", a: "Toleransi dan menghargai", w: ["Egois", "Sombong", "Memaksakan kehendak"] },
  { q: "Sikap yang baik saat menerima kritik adalah...?", a: "Mendengarkan dan memperbaiki diri", w: ["Marah-marah", "Mengabaikannya", "Membalas dengan kasar"] },
  { q: "Meminta izin sebelum menggunakan barang milik orang lain menunjukkan sikap...?", a: "Menghargai hak orang lain", w: ["Egois", "Tidak sopan", "Sombong"] },
  { q: "Sikap membantu adik atau kakak tanpa diminta menunjukkan sikap...?", a: "Peduli dan penyayang", w: ["Egois", "Malas", "Cuek"] },
  { q: "Berkata jujur meskipun sulit menunjukkan sikap...?", a: "Jujur dan berani", w: ["Pembohong", "Pengecut", "Malas"] },
  { q: "Mengucapkan selamat kepada teman yang berhasil menunjukkan sikap...?", a: "Suportif dan tulus", w: ["Iri hati", "Sombong", "Cuek"] }
];

  return [
    ...buildFromFacts(transportVehicles, "PU_PS1", "Preschool 1 (2 thn)", "Pengetahuan Umum", 0),
    ...buildFromFacts(communityHelpers, "PU_PS1", "Preschool 1 (2 thn)", "Pengetahuan Umum", 25),
    ...buildFromFacts(safetyRules, "PU_PS1", "Preschool 1 (2 thn)", "Pengetahuan Umum", 50),
    ...buildFromFacts(politeness, "PU_PS1", "Preschool 1 (2 thn)", "Pengetahuan Umum", 75)
  ];
}

// Generate Pengetahuan Umum Preschool 2 (3 tahun) — 100 questions
// Scope: public places, household items & their function, school/home
// rules and responsibility, basic time awareness.
function generateGeneralKnowledgePreschool2(): Question[] {
const publicPlaces: FactItem[] = [
  { q: "Tempat kita belajar bersama guru dan teman disebut...?", a: "Sekolah", w: ["Pasar", "Rumah Sakit", "Kantor Pos"] },
  { q: "Tempat kita membeli sayur, buah, dan daging disebut...?", a: "Pasar", w: ["Sekolah", "Perpustakaan", "Taman"] },
  { q: "Tempat kita berobat saat sakit disebut...?", a: "Rumah Sakit / Puskesmas", w: ["Sekolah", "Pasar", "Taman"] },
  { q: "Tempat kita bermain ayunan dan perosotan disebut...?", a: "Taman Bermain", w: ["Rumah Sakit", "Kantor Pos", "Perpustakaan"] },
  { q: "Tempat kita meminjam dan membaca buku disebut...?", a: "Perpustakaan", w: ["Pasar", "Taman", "Kantor Pos"] },
  { q: "Tempat kita mengirim surat dan paket disebut...?", a: "Kantor Pos", w: ["Sekolah", "Rumah Sakit", "Taman"] },
  { q: "Tempat kita beribadah bagi umat Islam disebut...?", a: "Masjid", w: ["Gereja", "Pasar", "Sekolah"] },
  { q: "Tempat kita menabung dan menyimpan uang disebut...?", a: "Bank", w: ["Pasar", "Sekolah", "Taman"] },
  { q: "Tempat kita menonton film bersama keluarga disebut...?", a: "Bioskop", w: ["Perpustakaan", "Kantor Pos", "Bank"] },
  { q: "Tempat hewan-hewan dipelihara agar bisa kita lihat disebut...?", a: "Kebun Binatang", w: ["Perpustakaan", "Bank", "Kantor Pos"] },
  { q: "Tempat kita berbelanja berbagai kebutuhan dalam satu gedung besar disebut...?", a: "Mall / Pusat Perbelanjaan", w: ["Perpustakaan", "Kantor Pos", "Taman"] },
  { q: "Tempat kita menginap saat berlibur di luar kota disebut...?", a: "Hotel", w: ["Sekolah", "Kantor Pos", "Bank"] },
  { q: "Tempat mobil dan motor diperbaiki disebut...?", a: "Bengkel", w: ["Sekolah", "Perpustakaan", "Bank"] },
  { q: "Tempat kita berenang bersama keluarga disebut...?", a: "Kolam Renang", w: ["Kantor Pos", "Bank", "Perpustakaan"] },
  { q: "Tempat kita membeli obat disebut...?", a: "Apotek", w: ["Pasar", "Taman", "Kantor Pos"] },
  { q: "Tempat kita mencukur rambut disebut...?", a: "Salon / Tukang Cukur", w: ["Bank", "Kantor Pos", "Perpustakaan"] },
  { q: "Tempat kita melihat karya seni dan sejarah disebut...?", a: "Museum", w: ["Bank", "Kantor Pos", "Bengkel"] },
  { q: "Tempat kita makan bersama keluarga di luar rumah disebut...?", a: "Restoran", w: ["Bank", "Kantor Pos", "Bengkel"] },
  { q: "Tempat polisi bertugas menjaga keamanan disebut...?", a: "Kantor Polisi", w: ["Kantor Pos", "Bank", "Sekolah"] },
  { q: "Tempat pemadam kebakaran menyimpan mobil dan alat pemadam disebut...?", a: "Pos Pemadam Kebakaran", w: ["Kantor Pos", "Bank", "Sekolah"] },
  { q: "Tempat kita menonton pertunjukan wayang atau tari tradisional disebut...?", a: "Gedung Kesenian", w: ["Bank", "Kantor Pos", "Bengkel"] },
  { q: "Tempat anak-anak balita dititipkan sambil belajar disebut...?", a: "Taman Kanak-kanak (TK)", w: ["Bank", "Kantor Pos", "Bengkel"] },
  { q: "Tempat kita mengisi bahan bakar kendaraan disebut...?", a: "Pom Bensin / SPBU", w: ["Perpustakaan", "Bank", "Kantor Pos"] },
  { q: "Tempat kita berolahraga bersama seperti sepak bola disebut...?", a: "Lapangan", w: ["Perpustakaan", "Bank", "Kantor Pos"] },
  { q: "Tempat kita menonton pertandingan olahraga besar disebut...?", a: "Stadion", w: ["Perpustakaan", "Bank", "Kantor Pos"] }
];

const householdItems: FactItem[] = [
  { q: "Alat yang digunakan untuk menyapu lantai disebut...?", a: "Sapu", w: ["Kain Pel", "Ember", "Sikat"] },
  { q: "Alat yang digunakan untuk mengepel lantai disebut...?", a: "Kain Pel", w: ["Sapu", "Ember", "Sikat"] },
  { q: "Alat yang digunakan untuk menyimpan air disebut...?", a: "Ember", w: ["Sapu", "Kain Pel", "Sikat"] },
  { q: "Alat yang digunakan untuk menggosok gigi disebut...?", a: "Sikat Gigi", w: ["Sapu", "Ember", "Kain Pel"] },
  { q: "Alat yang digunakan untuk memotong sayuran disebut...?", a: "Pisau", w: ["Sendok", "Garpu", "Piring"] },
  { q: "Alat yang digunakan untuk makan nasi disebut...?", a: "Sendok", w: ["Pisau", "Gelas", "Panci"] },
  { q: "Alat yang digunakan untuk minum air disebut...?", a: "Gelas", w: ["Piring", "Sendok", "Panci"] },
  { q: "Alat yang digunakan untuk memasak nasi disebut...?", a: "Rice Cooker / Penanak Nasi", w: ["Kulkas", "Kipas Angin", "Setrika"] },
  { q: "Alat yang digunakan untuk menyimpan makanan agar tetap dingin disebut...?", a: "Kulkas", w: ["Rice Cooker", "Setrika", "Kipas Angin"] },
  { q: "Alat yang digunakan untuk merapikan pakaian yang kusut disebut...?", a: "Setrika", w: ["Kulkas", "Kipas Angin", "Rice Cooker"] },
  { q: "Alat yang digunakan agar ruangan terasa sejuk disebut...?", a: "Kipas Angin", w: ["Setrika", "Kulkas", "Rice Cooker"] },
  { q: "Alat yang digunakan untuk mencuci pakaian disebut...?", a: "Mesin Cuci", w: ["Kulkas", "Kipas Angin", "Setrika"] },
  { q: "Alat yang digunakan untuk menyapu debu halus di karpet disebut...?", a: "Vacuum Cleaner", w: ["Sapu biasa", "Kain Pel", "Sikat Gigi"] },
  { q: "Alat penerangan yang menyala di malam hari disebut...?", a: "Lampu", w: ["Kipas Angin", "Kulkas", "Setrika"] },
  { q: "Alat yang digunakan untuk memasak sayur di atas kompor disebut...?", a: "Panci / Wajan", w: ["Piring", "Gelas", "Sendok"] },
  { q: "Alat yang digunakan untuk menyalakan api di dapur disebut...?", a: "Kompor", w: ["Kulkas", "Kipas Angin", "Setrika"] },
  { q: "Alat yang digunakan untuk mengukur waktu disebut...?", a: "Jam", w: ["Kalender", "Kompor", "Kulkas"] },
  { q: "Benda yang digunakan untuk menunjukkan tanggal dan bulan disebut...?", a: "Kalender", w: ["Jam", "Kompor", "Kulkas"] },
  { q: "Alat yang digunakan untuk menonton acara televisi disebut...?", a: "Televisi", w: ["Kulkas", "Setrika", "Kipas Angin"] },
  { q: "Alat yang digunakan untuk menelepon orang lain dari jarak jauh disebut...?", a: "Telepon / Handphone", w: ["Kalender", "Jam", "Kompor"] },
  { q: "Alat yang digunakan untuk mengeringkan rambut basah disebut...?", a: "Pengering Rambut / Hair Dryer", w: ["Sikat Gigi", "Sisir", "Sabun"] },
  { q: "Alat yang digunakan untuk merapikan rambut disebut...?", a: "Sisir", w: ["Sikat Gigi", "Sabun", "Handuk"] },
  { q: "Kain yang digunakan untuk mengeringkan badan setelah mandi disebut...?", a: "Handuk", w: ["Selimut", "Bantal", "Sprei"] },
  { q: "Kain yang digunakan untuk menghangatkan tubuh saat tidur disebut...?", a: "Selimut", w: ["Handuk", "Bantal", "Sprei"] },
  { q: "Benda empuk yang digunakan untuk menopang kepala saat tidur disebut...?", a: "Bantal", w: ["Selimut", "Handuk", "Sprei"] }
];

const schoolHomeRules: FactItem[] = [
  { q: "Sebelum berangkat sekolah, kita harus...?", a: "Sarapan dan berpamitan dengan orang tua", w: ["Bermain gawai dulu", "Tidur lagi", "Menonton TV dulu"] },
  { q: "Di dalam kelas, kita harus...?", a: "Duduk dengan tenang dan mendengarkan guru", w: ["Berlari-lari", "Berteriak", "Mengganggu teman"] },
  { q: "Saat guru menjelaskan pelajaran, kita sebaiknya...?", a: "Memperhatikan dengan baik", w: ["Bermain sendiri", "Mengobrol dengan teman", "Tidur di kelas"] },
  { q: "Setelah selesai bermain, kita harus...?", a: "Merapikan mainan kembali", w: ["Membiarkannya berantakan", "Menyembunyikannya", "Membuangnya"] },
  { q: "Di rumah, kita harus membantu orang tua dengan cara...?", a: "Merapikan kamar sendiri", w: ["Membiarkan kamar berantakan", "Meminta orang lain merapikan", "Mengabaikannya"] },
  { q: "Sebelum tidur malam, sebaiknya kita...?", a: "Menggosok gigi dan mencuci kaki", w: ["Makan permen sebanyak-banyaknya", "Bermain gawai semalaman", "Menonton TV terus"] },
  { q: "Saat istirahat sekolah, kita sebaiknya...?", a: "Makan bekal dan bermain dengan teman", w: ["Tetap duduk di kelas sendirian", "Mengganggu kelas lain", "Keluar dari sekolah"] },
  { q: "Jika ingin bertanya di kelas, sebaiknya kita...?", a: "Mengangkat tangan terlebih dahulu", w: ["Berteriak langsung", "Memotong pembicaraan guru", "Diam saja tanpa bertanya"] },
  { q: "Membawa buku dan alat tulis ke sekolah adalah tanggung jawab...?", a: "Siswa itu sendiri", w: ["Guru", "Kepala sekolah", "Penjaga sekolah"] },
  { q: "Saat bertemu teman di sekolah, sebaiknya kita...?", a: "Menyapa dengan ramah", w: ["Mengabaikannya", "Bersikap kasar", "Menghindarinya"] },
  { q: "Aturan tidak boleh berbicara saat orang lain sedang berbicara disebut sikap...?", a: "Menghargai / Sopan", w: ["Tidak sopan", "Egois", "Sombong"] },
  { q: "Di rumah, sebelum makan sebaiknya kita...?", a: "Mencuci tangan terlebih dahulu", w: ["Langsung makan tanpa cuci tangan", "Bermain dulu", "Menonton TV dulu"] },
  { q: "Jika melihat sampah berserakan di kelas, sebaiknya kita...?", a: "Membuangnya pada tempatnya", w: ["Membiarkannya", "Menendangnya", "Menyembunyikannya"] },
  { q: "Sikap disiplin di sekolah ditunjukkan dengan cara...?", a: "Datang tepat waktu dan mengikuti aturan", w: ["Sering terlambat", "Membolos", "Mengabaikan aturan"] },
  { q: "Jika ada teman yang sedang sakit di sekolah, sebaiknya kita...?", a: "Memberi tahu guru untuk membantunya", w: ["Mengabaikannya", "Menertawakannya", "Menjauhinya"] },
  { q: "Sebelum menggunakan barang milik sekolah, sebaiknya kita...?", a: "Menjaga dan merawatnya dengan baik", w: ["Merusaknya", "Mengambilnya pulang", "Membiarkannya kotor"] },
  { q: "Piket kelas adalah tugas untuk...?", a: "Membersihkan dan merapikan kelas secara bergiliran", w: ["Bermain di kelas", "Mengganggu teman", "Tidur di kelas"] },
  { q: "Saat upacara bendera di sekolah, kita harus bersikap...?", a: "Tertib dan hormat", w: ["Ramai dan bercanda", "Bermain sendiri", "Meninggalkan barisan"] },
  { q: "Jika ada barang teman yang tertinggal, sebaiknya kita...?", a: "Mengembalikannya kepada pemiliknya", w: ["Menyimpannya untuk diri sendiri", "Membuangnya", "Menyembunyikannya"] },
  { q: "Membantu orang tua membereskan meja makan setelah makan menunjukkan sikap...?", a: "Bertanggung jawab dan suka membantu", w: ["Malas", "Egois", "Cuek"] },
  { q: "Jika ingin keluar dari kelas, sebaiknya kita...?", a: "Meminta izin kepada guru", w: ["Langsung keluar tanpa izin", "Berteriak dulu", "Menunggu jam pulang saja"] },
  { q: "Menyelesaikan pekerjaan rumah (PR) sebelum bermain menunjukkan sikap...?", a: "Disiplin dan bertanggung jawab", w: ["Malas", "Ceroboh", "Tidak peduli"] },
  { q: "Merawat tanaman di rumah dengan menyiraminya menunjukkan sikap...?", a: "Peduli lingkungan", w: ["Malas", "Egois", "Cuek"] },
  { q: "Menghormati aturan yang dibuat orang tua di rumah menunjukkan sikap...?", a: "Patuh dan disiplin", w: ["Melawan", "Membangkang", "Mengabaikan"] },
  { q: "Menyimpan sepatu dan tas pada tempatnya setelah pulang sekolah menunjukkan sikap...?", a: "Rapi dan disiplin", w: ["Ceroboh", "Malas", "Sembarangan"] }
];

const timeAwareness: FactItem[] = [
  { q: "Dalam satu minggu terdapat berapa hari?", a: "7 hari", w: ["5 hari", "10 hari", "30 hari"] },
  { q: "Kegiatan yang biasa kita lakukan di pagi hari sebelum sekolah adalah...?", a: "Mandi dan sarapan", w: ["Tidur nyenyak", "Bermain sepanjang hari", "Makan malam"] },
  { q: "Kegiatan yang biasa kita lakukan di malam hari sebelum tidur adalah...?", a: "Menggosok gigi", w: ["Sarapan", "Berangkat sekolah", "Bermain di taman"] },
  { q: "Dalam satu hari terdapat berapa jam?", a: "24 jam", w: ["12 jam", "7 jam", "30 jam"] },
  { q: "Waktu untuk beristirahat setelah bermain seharian adalah...?", a: "Malam hari untuk tidur", w: ["Pagi hari terus-menerus", "Tidak perlu istirahat", "Siang hari saja tanpa henti"] },
  { q: "Sebelum berangkat sekolah, biasanya kita melihat...?", a: "Jam untuk memastikan tidak terlambat", w: ["Kalender saja", "Cermin saja", "Tidak perlu melihat apapun"] },
  { q: "Hari libur sekolah biasanya jatuh pada hari...?", a: "Sabtu dan Minggu", w: ["Senin dan Selasa", "Rabu dan Kamis", "Tidak pernah libur"] },
  { q: "Kalender digunakan untuk mengetahui...?", a: "Tanggal, bulan, dan hari", w: ["Suhu udara", "Berat badan", "Jarak tempuh"] },
  { q: "Dalam satu tahun terdapat berapa bulan?", a: "12 bulan", w: ["6 bulan", "24 bulan", "10 bulan"] },
  { q: "Ulang tahun kita dirayakan setiap...?", a: "Satu tahun sekali", w: ["Satu bulan sekali", "Satu minggu sekali", "Setiap hari"] },
  { q: "Waktu makan siang biasanya terjadi pada...?", a: "Tengah hari", w: ["Malam hari", "Dini hari", "Sebelum subuh"] },
  { q: "Musim di Indonesia yang bergantian sepanjang tahun ada dua, yaitu musim hujan dan musim...?", a: "Kemarau", w: ["Dingin", "Salju", "Gugur"] },
  { q: "Waktu untuk bermain sepulang sekolah biasanya adalah...?", a: "Sore hari", w: ["Tengah malam", "Dini hari", "Sebelum subuh"] },
  { q: "Kegiatan yang biasa dilakukan pada waktu sore hari adalah...?", a: "Bermain atau mandi sore", w: ["Sarapan pagi", "Tidur malam", "Berangkat sekolah"] },
  { q: "Satu tahun terdiri dari berapa musim di negara empat musim?", a: "4 musim", w: ["2 musim", "3 musim", "6 musim"] },
  { q: "Hari pertama dalam seminggu menurut kalender Indonesia biasanya adalah...?", a: "Senin", w: ["Minggu", "Sabtu", "Jumat"] },
  { q: "Hari terakhir dalam seminggu menurut kalender Indonesia biasanya adalah...?", a: "Minggu", w: ["Senin", "Sabtu", "Jumat"] },
  { q: "Waktu satu jam terdiri dari berapa menit?", a: "60 menit", w: ["30 menit", "100 menit", "24 menit"] },
  { q: "Waktu satu menit terdiri dari berapa detik?", a: "60 detik", w: ["30 detik", "100 detik", "24 detik"] },
  { q: "Perayaan tahun baru dirayakan setiap tanggal...?", a: "1 Januari", w: ["1 Februari", "31 Desember pagi", "17 Agustus"] },
  { q: "Waktu istirahat siang di sekolah biasanya digunakan untuk...?", a: "Makan dan bermain sebentar", w: ["Tidur seharian", "Pulang ke rumah", "Belajar terus"] },
  { q: "Kegiatan mandi biasanya dilakukan berapa kali dalam sehari?", a: "2 kali (pagi dan sore)", w: ["1 kali seminggu", "Tidak perlu setiap hari", "5 kali sehari"] },
  { q: "Alat yang menunjukkan waktu dengan jarum pendek dan jarum panjang disebut...?", a: "Jam Analog", w: ["Kalender", "Termometer", "Kompas"] },
  { q: "Musim kemarau di Indonesia biasanya ditandai dengan...?", a: "Cuaca panas dan jarang hujan", w: ["Turun salju", "Selalu mendung", "Sangat dingin"] },
  { q: "Kegiatan berdoa sebelum makan sebaiknya dilakukan...?", a: "Setiap kali sebelum makan", w: ["Hanya sekali seminggu", "Tidak perlu dilakukan", "Setelah makan selesai"] }
];

  return [
    ...buildFromFacts(publicPlaces, "PU_PS2", "Preschool 2 (3 thn)", "Pengetahuan Umum", 0),
    ...buildFromFacts(householdItems, "PU_PS2", "Preschool 2 (3 thn)", "Pengetahuan Umum", 25),
    ...buildFromFacts(schoolHomeRules, "PU_PS2", "Preschool 2 (3 thn)", "Pengetahuan Umum", 50),
    ...buildFromFacts(timeAwareness, "PU_PS2", "Preschool 2 (3 thn)", "Pengetahuan Umum", 75)
  ];
}

// Generate Pengetahuan Umum SD Kelas 1 (7 tahun) — 100 questions
// Scope: Indonesian provinces & capitals, national symbols, rupiah currency
// basics, national holidays, traffic signs (beyond TK-level colors).
function generateGeneralKnowledgeSD1(): Question[] {
const provincesCapitals: FactItem[] = [
  { q: "Ibu kota negara Indonesia adalah...?", a: "Jakarta", w: ["Bandung", "Surabaya", "Medan"] },
  { q: "Ibu kota provinsi Jawa Barat adalah...?", a: "Bandung", w: ["Semarang", "Surabaya", "Jakarta"] },
  { q: "Ibu kota provinsi Jawa Tengah adalah...?", a: "Semarang", w: ["Bandung", "Surabaya", "Yogyakarta"] },
  { q: "Ibu kota provinsi Jawa Timur adalah...?", a: "Surabaya", w: ["Semarang", "Bandung", "Malang"] },
  { q: "Ibu kota provinsi Sumatra Utara adalah...?", a: "Medan", w: ["Palembang", "Padang", "Pekanbaru"] },
  { q: "Ibu kota provinsi Sumatra Barat adalah...?", a: "Padang", w: ["Medan", "Palembang", "Pekanbaru"] },
  { q: "Ibu kota provinsi Sumatra Selatan adalah...?", a: "Palembang", w: ["Medan", "Padang", "Pekanbaru"] },
  { q: "Ibu kota provinsi Bali adalah...?", a: "Denpasar", w: ["Mataram", "Kupang", "Makassar"] },
  { q: "Ibu kota provinsi Sulawesi Selatan adalah...?", a: "Makassar", w: ["Denpasar", "Mataram", "Manado"] },
  { q: "Ibu kota provinsi Kalimantan Timur adalah...?", a: "Samarinda", w: ["Pontianak", "Banjarmasin", "Palangkaraya"] },
  { q: "Ibu kota provinsi Kalimantan Barat adalah...?", a: "Pontianak", w: ["Samarinda", "Banjarmasin", "Palangkaraya"] },
  { q: "Ibu kota provinsi Papua adalah...?", a: "Jayapura", w: ["Manokwari", "Sorong", "Merauke"] },
  { q: "Ibu kota provinsi Nusa Tenggara Barat adalah...?", a: "Mataram", w: ["Denpasar", "Kupang", "Makassar"] },
  { q: "Ibu kota provinsi Nusa Tenggara Timur adalah...?", a: "Kupang", w: ["Mataram", "Denpasar", "Makassar"] },
  { q: "Ibu kota provinsi Daerah Istimewa Yogyakarta adalah...?", a: "Yogyakarta", w: ["Semarang", "Surabaya", "Bandung"] },
  { q: "Ibu kota provinsi Riau adalah...?", a: "Pekanbaru", w: ["Medan", "Padang", "Palembang"] },
  { q: "Ibu kota provinsi Aceh adalah...?", a: "Banda Aceh", w: ["Medan", "Padang", "Pekanbaru"] },
  { q: "Ibu kota provinsi Lampung adalah...?", a: "Bandar Lampung", w: ["Palembang", "Jambi", "Bengkulu"] },
  { q: "Ibu kota provinsi Sulawesi Utara adalah...?", a: "Manado", w: ["Makassar", "Palu", "Kendari"] },
  { q: "Provinsi tempat Danau Toba berada adalah...?", a: "Sumatra Utara", w: ["Jawa Barat", "Bali", "Papua"] },
  { q: "Provinsi tempat Candi Borobudur berada adalah...?", a: "Jawa Tengah", w: ["Jawa Barat", "Bali", "Sumatra"] },
  { q: "Provinsi tempat Pulau Komodo berada adalah...?", a: "Nusa Tenggara Timur", w: ["Bali", "Jawa Timur", "Sulawesi"] },
  { q: "Pulau terbesar di Indonesia bagian barat adalah pulau...?", a: "Sumatra", w: ["Jawa", "Bali", "Papua"] },
  { q: "Pulau tempat ibu kota negara Indonesia berada adalah pulau...?", a: "Jawa", w: ["Sumatra", "Bali", "Kalimantan"] },
  { q: "Pulau paling timur di Indonesia adalah pulau...?", a: "Papua", w: ["Jawa", "Sumatra", "Bali"] }
];

const nationalSymbols: FactItem[] = [
  { q: "Lambang negara Indonesia adalah burung...?", a: "Garuda Pancasila", w: ["Merak", "Elang", "Cendrawasih"] },
  { q: "Dasar negara Indonesia disebut...?", a: "Pancasila", w: ["UUD 1945", "Bhinneka Tunggal Ika", "Sumpah Pemuda"] },
  { q: "Jumlah sila dalam Pancasila adalah...?", a: "5 sila", w: ["4 sila", "6 sila", "3 sila"] },
  { q: "Sila pertama Pancasila berbunyi...?", a: "Ketuhanan Yang Maha Esa", w: ["Kemanusiaan yang Adil dan Beradab", "Persatuan Indonesia", "Keadilan Sosial"] },
  { q: "Semboyan negara Indonesia adalah...?", a: "Bhinneka Tunggal Ika", w: ["Merdeka atau Mati", "Garuda Pancasila", "Sumpah Pemuda"] },
  { q: "Bendera negara Indonesia berwarna...?", a: "Merah dan Putih", w: ["Merah dan Kuning", "Putih dan Biru", "Hijau dan Putih"] },
  { q: "Lagu kebangsaan Indonesia berjudul...?", a: "Indonesia Raya", w: ["Garuda Pancasila", "Halo-Halo Bandung", "Bagimu Negeri"] },
  { q: "Presiden pertama Indonesia adalah...?", a: "Soekarno", w: ["Soeharto", "B.J. Habibie", "Joko Widodo"] },
  { q: "Wakil presiden pertama Indonesia adalah...?", a: "Mohammad Hatta", w: ["Soeharto", "B.J. Habibie", "Try Sutrisno"] },
  { q: "Indonesia merdeka pada tanggal...?", a: "17 Agustus 1945", w: ["1 Juni 1945", "28 Oktober 1928", "10 November 1945"] },
  { q: "Naskah proklamasi kemerdekaan Indonesia dibacakan oleh...?", a: "Soekarno", w: ["Mohammad Hatta", "Soeharto", "Soedirman"] },
  { q: "Bahasa resmi negara Indonesia adalah bahasa...?", a: "Indonesia", w: ["Inggris", "Jawa", "Melayu Malaysia"] },
  { q: "Mata uang resmi Indonesia adalah...?", a: "Rupiah", w: ["Ringgit", "Dollar", "Yen"] },
  { q: "Hewan yang menjadi lambang negara Indonesia adalah...?", a: "Garuda", w: ["Harimau", "Komodo", "Cendrawasih"] },
  { q: "Semboyan Bhinneka Tunggal Ika artinya...?", a: "Berbeda-beda tetapi tetap satu", w: ["Bersatu kita teguh", "Merdeka atau mati", "Satu nusa satu bangsa"] },
  { q: "Sumpah Pemuda diikrarkan pada tanggal...?", a: "28 Oktober 1928", w: ["17 Agustus 1945", "1 Juni 1945", "10 November 1945"] },
  { q: "Hari Pahlawan diperingati setiap tanggal...?", a: "10 November", w: ["17 Agustus", "28 Oktober", "1 Juni"] },
  { q: "Hari lahir Pancasila diperingati setiap tanggal...?", a: "1 Juni", w: ["17 Agustus", "28 Oktober", "10 November"] },
  { q: "Presiden Indonesia dipilih melalui...?", a: "Pemilihan Umum (Pemilu)", w: ["Warisan keluarga", "Undian", "Penunjukan raja"] },
  { q: "Ibu kota negara adalah pusat pemerintahan...?", a: "Negara", w: ["Satu keluarga saja", "Satu sekolah saja", "Satu desa saja"] }
];

const moneyRupiah: FactItem[] = [
  { q: "Uang kertas Indonesia dengan nilai terkecil yang umum digunakan adalah...?", a: "Rp1.000", w: ["Rp100.000", "Rp50.000", "Rp20.000"] },
  { q: "Uang kertas Indonesia dengan nilai terbesar yang umum beredar adalah...?", a: "Rp100.000", w: ["Rp1.000", "Rp5.000", "Rp10.000"] },
  { q: "Uang koin di Indonesia biasanya bernilai...?", a: "Rp100, Rp200, Rp500, dan Rp1.000", w: ["Hanya Rp1.000.000", "Hanya Rp50.000", "Hanya Rp10.000.000"] },
  { q: "Jika kita punya uang Rp5.000 dan membeli permen seharga Rp2.000, sisa uang kita adalah...?", a: "Rp3.000", w: ["Rp2.000", "Rp7.000", "Rp1.000"] },
  { q: "Jika kita punya dua lembar uang Rp10.000, total uang kita adalah...?", a: "Rp20.000", w: ["Rp10.000", "Rp30.000", "Rp15.000"] },
  { q: "Kegiatan menyimpan uang untuk digunakan di masa depan disebut...?", a: "Menabung", w: ["Menghambur-hamburkan", "Membuang", "Meminjam"] },
  { q: "Tempat kita bisa menabung dengan aman adalah...?", a: "Bank atau celengan", w: ["Di jalan", "Di tempat sampah", "Di bawah pohon"] },
  { q: "Kegiatan menukar barang atau uang untuk mendapatkan barang lain disebut...?", a: "Jual beli", w: ["Menabung", "Meminjam", "Menyewa"] },
  { q: "Orang yang menjual barang disebut...?", a: "Penjual", w: ["Pembeli", "Peminjam", "Penabung"] },
  { q: "Orang yang membeli barang disebut...?", a: "Pembeli", w: ["Penjual", "Peminjam", "Penabung"] },
  { q: "Jika harga sebuah buku Rp15.000 dan kita membayar dengan Rp20.000, kembaliannya adalah...?", a: "Rp5.000", w: ["Rp10.000", "Rp15.000", "Rp35.000"] },
  { q: "Uang yang digunakan di negara lain berbeda dengan uang Indonesia karena setiap negara memiliki...?", a: "Mata uang sendiri", w: ["Bendera yang sama", "Bahasa yang sama", "Lagu kebangsaan yang sama"] },
  { q: "Sebaiknya kita menggunakan uang jajan untuk...?", a: "Membeli kebutuhan dan menabung sebagian", w: ["Menghambur-hamburkan semuanya", "Membuangnya", "Memberikannya ke orang asing"] },
  { q: "Uang kertas Rp2.000 bergambar pahlawan dari daerah...?", a: "Sumatra Barat (Tuanku Imam Bonjol)", w: ["Jawa Barat", "Bali", "Papua"] },
  { q: "Kegiatan menghitung dan mencatat pemasukan serta pengeluaran uang disebut...?", a: "Mengelola keuangan", w: ["Menghambur-hamburkan uang", "Mengabaikan uang", "Membuang uang"] },
  { q: "Jika kita ingin membeli mainan seharga Rp50.000 tapi uang kita hanya Rp30.000, sebaiknya kita...?", a: "Menabung dulu hingga cukup", w: ["Memaksa membelinya", "Meminjam dari orang asing", "Mencurinya"] },
  { q: "Uang logam di Indonesia biasanya terbuat dari bahan...?", a: "Logam", w: ["Kertas", "Plastik", "Kayu"] },
  { q: "Uang kertas di Indonesia biasanya terbuat dari bahan...?", a: "Kertas khusus / Polimer", w: ["Logam", "Kayu", "Kaca"] },
  { q: "Memberi sedekah kepada orang yang membutuhkan menunjukkan sikap...?", a: "Peduli dan dermawan", w: ["Egois", "Pelit", "Sombong"] },
  { q: "Jika kita menemukan uang yang bukan milik kita, sebaiknya kita...?", a: "Mencari pemiliknya atau melaporkannya", w: ["Mengambilnya untuk diri sendiri", "Membuangnya", "Menyembunyikannya"] }
];

const nationalHolidays: FactItem[] = [
  { q: "Hari Kemerdekaan Indonesia diperingati setiap tanggal...?", a: "17 Agustus", w: ["1 Juni", "28 Oktober", "10 November"] },
  { q: "Hari Pendidikan Nasional diperingati setiap tanggal...?", a: "2 Mei", w: ["17 Agustus", "1 Juni", "10 November"] },
  { q: "Hari Kartini diperingati setiap tanggal...?", a: "21 April", w: ["2 Mei", "17 Agustus", "1 Juni"] },
  { q: "Hari Ibu di Indonesia diperingati setiap tanggal...?", a: "22 Desember", w: ["21 April", "2 Mei", "17 Agustus"] },
  { q: "Hari Anak Nasional diperingati setiap tanggal...?", a: "23 Juli", w: ["21 April", "2 Mei", "22 Desember"] },
  { q: "Hari Sumpah Pemuda diperingati setiap tanggal...?", a: "28 Oktober", w: ["17 Agustus", "1 Juni", "10 November"] },
  { q: "Perayaan Idul Fitri dirayakan oleh umat...?", a: "Islam", w: ["Kristen", "Hindu", "Buddha"] },
  { q: "Perayaan Natal dirayakan oleh umat...?", a: "Kristen dan Katolik", w: ["Islam", "Hindu", "Buddha"] },
  { q: "Perayaan Nyepi dirayakan oleh umat...?", a: "Hindu", w: ["Islam", "Kristen", "Buddha"] },
  { q: "Perayaan Waisak dirayakan oleh umat...?", a: "Buddha", w: ["Islam", "Kristen", "Hindu"] },
  { q: "Perayaan Imlek dirayakan oleh masyarakat...?", a: "Tionghoa", w: ["Jawa", "Sunda", "Bali"] },
  { q: "Kartini dikenal sebagai tokoh yang memperjuangkan...?", a: "Emansipasi wanita / Pendidikan wanita", w: ["Kemerdekaan Indonesia", "Perdagangan rempah", "Pembangunan jalan"] },
  { q: "Hari Kesaktian Pancasila diperingati setiap tanggal...?", a: "1 Oktober", w: ["1 Juni", "17 Agustus", "28 Oktober"] },
  { q: "Hari Guru Nasional diperingati setiap tanggal...?", a: "25 November", w: ["2 Mei", "23 Juli", "21 April"] },
  { q: "Perayaan hari besar keagamaan di Indonesia menunjukkan bahwa Indonesia adalah negara yang...?", a: "Menghargai keberagaman agama", w: ["Hanya memiliki satu agama", "Melarang perayaan agama", "Tidak mengenal agama"] },
  { q: "Hari Buruh Internasional diperingati setiap tanggal...?", a: "1 Mei", w: ["1 Juni", "17 Agustus", "28 Oktober"] },
  { q: "Tahun Baru Masehi dirayakan setiap tanggal...?", a: "1 Januari", w: ["1 Februari", "31 Desember pagi", "1 Maret"] },
  { q: "Hari Bumi diperingati setiap tanggal...?", a: "22 April", w: ["21 April", "2 Mei", "23 Juli"] },
  { q: "Hari Batik Nasional diperingati setiap tanggal...?", a: "2 Oktober", w: ["1 Oktober", "28 Oktober", "10 November"] },
  { q: "Hari Museum Nasional diperingati untuk mengenang pentingnya...?", a: "Sejarah dan budaya bangsa", w: ["Perdagangan modern", "Teknologi digital", "Olahraga internasional"] }
];

const trafficSignsAdvanced: FactItem[] = [
  { q: "Rambu berbentuk segitiga dengan tanda seru biasanya menandakan...?", a: "Peringatan bahaya", w: ["Dilarang parkir", "Boleh berhenti", "Jalan bebas hambatan"] },
  { q: "Rambu berbentuk bulat dengan garis merah menandakan...?", a: "Larangan", w: ["Anjuran", "Informasi", "Petunjuk arah"] },
  { q: "Rambu dengan gambar sepeda menandakan jalur khusus untuk...?", a: "Sepeda", w: ["Mobil", "Bus", "Motor"] },
  { q: "Rambu 'Dilarang Parkir' biasanya berwarna dasar...?", a: "Biru dengan garis merah", w: ["Hijau polos", "Kuning polos", "Hitam polos"] },
  { q: "Petugas yang mengatur lalu lintas secara manual di persimpangan adalah...?", a: "Polisi Lalu Lintas", w: ["Guru", "Dokter", "Petani"] },
  { q: "Jembatan penyeberangan digunakan oleh...?", a: "Pejalan kaki untuk menyeberang dengan aman", w: ["Mobil untuk lewat", "Sepeda motor untuk parkir", "Bus untuk berhenti"] },
  { q: "Marka jalan berupa garis putus-putus berarti kendaraan...?", a: "Boleh berpindah jalur dengan hati-hati", w: ["Dilarang keras berpindah jalur", "Harus berhenti", "Harus putar balik"] },
  { q: "Marka jalan berupa garis lurus tanpa putus berarti kendaraan...?", a: "Dilarang berpindah jalur", w: ["Boleh berpindah jalur bebas", "Harus berhenti total", "Harus putar balik"] },
  { q: "Bunyi sirine pada kendaraan darurat seperti ambulans menandakan kita harus...?", a: "Memberi jalan", w: ["Menghalangi jalan", "Mengabaikannya", "Mempercepat kendaraan kita"] },
  { q: "Kecepatan kendaraan sebaiknya dikurangi saat melewati...?", a: "Area sekolah atau zona ramai", w: ["Jalan tol kosong", "Jalan lurus sepi", "Area balap"] },
  { q: "Rambu dengan gambar 'P' dicoret menandakan...?", a: "Dilarang Parkir", w: ["Boleh Parkir Gratis", "Tempat Parkir Khusus", "Jalan Buntu"] },
  { q: "Menggunakan lampu sein sebelum berbelok bertujuan untuk...?", a: "Memberi tahu pengendara lain", w: ["Menghias kendaraan", "Menghemat bahan bakar", "Menambah kecepatan"] },
  { q: "Jalur khusus untuk kendaraan roda dua di jalan raya disebut...?", a: "Jalur Motor", w: ["Jalur Mobil", "Jalur Bus", "Jalur Kereta"] },
  { q: "Rambu dengan gambar orang menyeberang menandakan...?", a: "Tempat penyeberangan pejalan kaki", w: ["Dilarang menyeberang", "Tempat parkir", "Jalan buntu"] },
  { q: "Batas kecepatan yang tertulis pada rambu jalan bertujuan untuk...?", a: "Menjaga keselamatan pengendara", w: ["Membuat perjalanan lebih lama", "Menghias jalan", "Tidak ada tujuan khusus"] }
];

  return [
    ...buildFromFacts(provincesCapitals, "PU_SD1", "SD Kelas 1", "Pengetahuan Umum", 0),
    ...buildFromFacts(nationalSymbols, "PU_SD1", "SD Kelas 1", "Pengetahuan Umum", 25),
    ...buildFromFacts(moneyRupiah, "PU_SD1", "SD Kelas 1", "Pengetahuan Umum", 45),
    ...buildFromFacts(nationalHolidays, "PU_SD1", "SD Kelas 1", "Pengetahuan Umum", 65),
    ...buildFromFacts(trafficSignsAdvanced, "PU_SD1", "SD Kelas 1", "Pengetahuan Umum", 85)
  ];
}

// Generate Pengetahuan Umum SD Kelas 2 (8 tahun) — 100 questions
// Scope: national heroes, traditional houses/clothes/weapons, regional
// foods, traditional dances of Indonesia.
function generateGeneralKnowledgeSD2(): Question[] {
const nationalHeroes: FactItem[] = [
  { q: "Pahlawan wanita dari Aceh yang terkenal sebagai laksamana laut adalah...?", a: "Laksamana Malahayati", w: ["Cut Nyak Dhien", "R.A. Kartini", "Dewi Sartika"] },
  { q: "Pahlawan wanita dari Aceh yang memimpin perang melawan Belanda adalah...?", a: "Cut Nyak Dhien", w: ["Laksamana Malahayati", "R.A. Kartini", "Martha Christina Tiahahu"] },
  { q: "Pahlawan nasional yang memimpin Perang Diponegoro adalah...?", a: "Pangeran Diponegoro", w: ["Sultan Hasanuddin", "Sultan Agung", "Imam Bonjol"] },
  { q: "Pahlawan nasional dari Sulawesi Selatan yang dijuluki 'Ayam Jantan dari Timur' adalah...?", a: "Sultan Hasanuddin", w: ["Pangeran Diponegoro", "Imam Bonjol", "Teuku Umar"] },
  { q: "Pahlawan nasional dari Sumatra Barat yang memimpin Perang Padri adalah...?", a: "Tuanku Imam Bonjol", w: ["Sultan Hasanuddin", "Pangeran Diponegoro", "Teuku Umar"] },
  { q: "Pahlawan nasional yang menjadi Panglima Besar TNI pertama adalah...?", a: "Jenderal Soedirman", w: ["Soekarno", "Mohammad Hatta", "B.J. Habibie"] },
  { q: "Tokoh yang dikenal sebagai Bapak Proklamator Indonesia bersama Soekarno adalah...?", a: "Mohammad Hatta", w: ["Soeharto", "Jenderal Soedirman", "B.J. Habibie"] },
  { q: "Tokoh yang merancang pesawat terbang pertama buatan Indonesia adalah...?", a: "B.J. Habibie", w: ["Soekarno", "Soeharto", "Mohammad Hatta"] },
  { q: "R.A. Kartini terkenal sebagai pejuang emansipasi...?", a: "Wanita", w: ["Petani", "Nelayan", "Pedagang"] },
  { q: "Dewi Sartika dikenal sebagai tokoh pendidikan wanita dari daerah...?", a: "Jawa Barat", w: ["Jawa Tengah", "Sumatra", "Bali"] },
  { q: "Pahlawan nasional yang memimpin perlawanan di Aceh melawan penjajah Belanda adalah...?", a: "Teuku Umar", w: ["Sultan Hasanuddin", "Pangeran Diponegoro", "Imam Bonjol"] },
  { q: "Pahlawan yang dikenal sebagai Bapak Pandu Indonesia adalah...?", a: "Sri Sultan Hamengkubuwono IX", w: ["Soekarno", "Soeharto", "Jenderal Soedirman"] },
  { q: "Tokoh yang menciptakan lagu 'Indonesia Raya' adalah...?", a: "Wage Rudolf Supratman", w: ["Ismail Marzuki", "Cornel Simanjuntak", "Kusbini"] },
  { q: "Pahlawan nasional wanita dari Maluku yang berjuang melawan penjajah adalah...?", a: "Martha Christina Tiahahu", w: ["R.A. Kartini", "Cut Nyak Dhien", "Dewi Sartika"] },
  { q: "Presiden kedua Indonesia adalah...?", a: "Soeharto", w: ["Soekarno", "B.J. Habibie", "Joko Widodo"] },
  { q: "Presiden ketiga Indonesia adalah...?", a: "B.J. Habibie", w: ["Soeharto", "Soekarno", "Susilo Bambang Yudhoyono"] },
  { q: "Pahlawan yang gugur dalam pertempuran melawan Belanda di Surabaya dikenang dalam peristiwa...?", a: "Pertempuran 10 November", w: ["Sumpah Pemuda", "Proklamasi Kemerdekaan", "Konferensi Meja Bundar"] },
  { q: "Tokoh yang dikenal sebagai Bung Tomo memimpin perlawanan rakyat di kota...?", a: "Surabaya", w: ["Jakarta", "Bandung", "Medan"] },
  { q: "Pahlawan nasional yang berasal dari Kalimantan dan memimpin perlawanan di Banjarmasin adalah...?", a: "Pangeran Antasari", w: ["Sultan Hasanuddin", "Pangeran Diponegoro", "Teuku Umar"] },
  { q: "Tokoh yang menjahit bendera pusaka merah putih adalah...?", a: "Fatmawati", w: ["R.A. Kartini", "Cut Nyak Dhien", "Dewi Sartika"] },
  { q: "Pahlawan nasional yang terkenal karena semboyan 'Merdeka atau Mati' adalah...?", a: "Bung Tomo", w: ["Soekarno", "Soeharto", "B.J. Habibie"] },
  { q: "Tokoh proklamator kemerdekaan Indonesia berjumlah...?", a: "2 orang (Soekarno dan Hatta)", w: ["1 orang", "3 orang", "5 orang"] },
  { q: "Pahlawan revolusi adalah gelar bagi para pejuang yang gugur dalam peristiwa...?", a: "G30S/PKI", w: ["Sumpah Pemuda", "Kongres Pemuda", "Konferensi Meja Bundar"] },
  { q: "Tokoh yang dikenal sebagai pahlawan pendidikan dengan semboyan 'Tut Wuri Handayani' adalah...?", a: "Ki Hajar Dewantara", w: ["Soekarno", "Soeharto", "B.J. Habibie"] },
  { q: "Hari lahir Ki Hajar Dewantara diperingati sebagai Hari...?", a: "Pendidikan Nasional", w: ["Kemerdekaan", "Pahlawan", "Kesaktian Pancasila"] }
];

const traditionalHousesClothes: FactItem[] = [
  { q: "Rumah adat suku Batak dari Sumatra Utara disebut...?", a: "Rumah Bolon", w: ["Rumah Gadang", "Rumah Joglo", "Rumah Honai"] },
  { q: "Rumah adat suku Toraja dari Sulawesi disebut...?", a: "Tongkonan", w: ["Rumah Gadang", "Rumah Joglo", "Rumah Bolon"] },
  { q: "Rumah adat suku Betawi dari Jakarta disebut...?", a: "Rumah Kebaya", w: ["Rumah Gadang", "Rumah Joglo", "Rumah Bolon"] },
  { q: "Rumah adat suku Bali disebut...?", a: "Gapura Candi Bentar", w: ["Rumah Gadang", "Rumah Joglo", "Rumah Bolon"] },
  { q: "Rumah adat suku Dayak dari Kalimantan disebut...?", a: "Rumah Betang", w: ["Rumah Gadang", "Rumah Joglo", "Rumah Honai"] },
  { q: "Pakaian adat pengantin Jawa yang terkenal disebut...?", a: "Kebaya dan Beskap", w: ["Ulos", "Baju Bodo", "Baju Kurung"] },
  { q: "Pakaian adat suku Batak yang berupa kain tenun khas disebut...?", a: "Ulos", w: ["Songket", "Kebaya", "Baju Bodo"] },
  { q: "Pakaian adat suku Bugis-Makassar yang terkenal disebut...?", a: "Baju Bodo", w: ["Ulos", "Kebaya", "Songket"] },
  { q: "Kain tenun tradisional khas Sumatra yang sering dipakai untuk pakaian adat disebut...?", a: "Songket", w: ["Ulos", "Batik", "Tenun Ikat"] },
  { q: "Kain bermotif yang dibuat dengan teknik canting dan lilin panas khas Jawa disebut...?", a: "Batik", w: ["Songket", "Ulos", "Tenun Ikat"] },
  { q: "Pakaian adat Minangkabau untuk wanita disebut...?", a: "Baju Kurung dengan Tingkuluak", w: ["Kebaya Jawa", "Ulos", "Baju Bodo"] },
  { q: "Penutup kepala khas Minangkabau berbentuk seperti tanduk kerbau disebut...?", a: "Tingkuluak", w: ["Blangkon", "Udeng", "Songkok"] },
  { q: "Penutup kepala khas Jawa yang biasa dipakai pria disebut...?", a: "Blangkon", w: ["Tingkuluak", "Udeng", "Peci saja"] },
  { q: "Penutup kepala khas Bali yang biasa dipakai pria disebut...?", a: "Udeng", w: ["Blangkon", "Tingkuluak", "Songkok"] },
  { q: "Rumah adat Papua yang berbentuk bulat seperti jerami disebut...?", a: "Rumah Honai", w: ["Rumah Gadang", "Rumah Joglo", "Rumah Bolon"] },
  { q: "Rumah adat Sumatra Barat dengan atap seperti tanduk kerbau disebut...?", a: "Rumah Gadang", w: ["Rumah Honai", "Rumah Joglo", "Rumah Bolon"] },
  { q: "Rumah adat Jawa yang berbentuk limas disebut...?", a: "Rumah Joglo", w: ["Rumah Gadang", "Rumah Honai", "Rumah Bolon"] },
  { q: "Kain tenun ikat yang terkenal berasal dari daerah...?", a: "Nusa Tenggara Timur", w: ["Jawa Barat", "Bali", "Sumatra Utara"] },
  { q: "Pakaian adat Sunda dari Jawa Barat untuk pria disebut...?", a: "Baju Pangsi", w: ["Ulos", "Baju Bodo", "Kebaya"] },
  { q: "Keris adalah senjata tradisional yang berasal dari budaya...?", a: "Jawa", w: ["Papua", "Sumatra", "Kalimantan"] },
  { q: "Rencong adalah senjata tradisional khas daerah...?", a: "Aceh", w: ["Jawa", "Bali", "Papua"] },
  { q: "Mandau adalah senjata tradisional khas suku...?", a: "Dayak (Kalimantan)", w: ["Jawa", "Bali", "Sumatra"] },
  { q: "Kujang adalah senjata tradisional khas daerah...?", a: "Jawa Barat", w: ["Papua", "Sumatra", "Kalimantan"] },
  { q: "Celurit adalah senjata tradisional khas daerah...?", a: "Madura", w: ["Papua", "Bali", "Kalimantan"] },
  { q: "Koteka adalah pakaian tradisional khas suku di daerah...?", a: "Papua", w: ["Jawa", "Bali", "Sumatra"] }
];

const traditionalFood: FactItem[] = [
  { q: "Makanan khas Padang yang terkenal dengan kuah santan pedas adalah...?", a: "Rendang", w: ["Gudeg", "Pempek", "Rawon"] },
  { q: "Makanan khas Yogyakarta yang berbahan dasar nangka muda adalah...?", a: "Gudeg", w: ["Rendang", "Pempek", "Rawon"] },
  { q: "Makanan khas Palembang yang terbuat dari ikan dan sagu adalah...?", a: "Pempek", w: ["Rendang", "Gudeg", "Rawon"] },
  { q: "Makanan khas Jawa Timur berupa sup daging berkuah hitam adalah...?", a: "Rawon", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Makanan khas Betawi yang terbuat dari ketupat, sayur, dan kuah santan adalah...?", a: "Kerak Telor / Soto Betawi", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Sate yang terkenal berasal dari daerah...?", a: "Madura", w: ["Papua", "Kalimantan", "Sulawesi"] },
  { q: "Makanan khas Bali yang terbuat dari daging bebek atau ayam yang dibumbui rempah adalah...?", a: "Betutu", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Makanan khas Manado yang pedas dan berbahan dasar ikan atau ayam adalah...?", a: "Cakalang / RW", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Makanan khas Makassar berupa sup daging dengan kuah kacang adalah...?", a: "Coto Makassar", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Nasi goreng adalah makanan yang berasal dari negara...?", a: "Indonesia", w: ["Jepang", "Korea", "Thailand"] },
  { q: "Makanan khas Aceh yang berupa mi kuah pedas adalah...?", a: "Mi Aceh", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Makanan khas Solo yang berupa nasi dengan kuah gurih dan santan adalah...?", a: "Nasi Liwet", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Bakso adalah makanan berupa bola daging yang biasa disajikan dengan...?", a: "Kuah dan mi", w: ["Es krim", "Susu", "Roti"] },
  { q: "Makanan khas Sunda yang terbuat dari kedelai fermentasi adalah...?", a: "Tempe", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Makanan tradisional yang terbuat dari kacang kedelai dan sering dijadikan lauk adalah...?", a: "Tahu", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Makanan khas Betawi berupa nasi uduk biasa dimakan pada waktu...?", a: "Sarapan pagi", w: ["Tengah malam", "Dini hari", "Hanya saat pesta"] },
  { q: "Klepon adalah jajanan tradisional yang berisi...?", a: "Gula merah cair", w: ["Cokelat", "Keju", "Selai stroberi"] },
  { q: "Onde-onde adalah jajanan yang dilapisi biji...?", a: "Wijen", w: ["Kacang tanah", "Kacang hijau", "Kedelai"] },
  { q: "Gudeg biasanya disajikan dengan lauk pendamping berupa...?", a: "Ayam dan telur", w: ["Ikan bakar", "Sate kambing", "Bakso"] },
  { q: "Makanan khas Indonesia yang biasa dimakan saat perayaan Lebaran adalah...?", a: "Ketupat", w: ["Rendang saja", "Nasi Goreng saja", "Mi Instan"] },
  { q: "Makanan khas Lombok yang terkenal pedas dan berbahan dasar ayam adalah...?", a: "Ayam Taliwang", w: ["Rendang", "Gudeg", "Pempek"] },
  { q: "Es doger dan es cendol adalah contoh minuman tradisional khas...?", a: "Indonesia", w: ["Jepang", "Korea", "Eropa"] },
  { q: "Kerak Telor adalah makanan khas dari daerah...?", a: "Betawi (Jakarta)", w: ["Padang", "Bali", "Papua"] },
  { q: "Papeda adalah makanan pokok khas daerah...?", a: "Papua dan Maluku", w: ["Jawa", "Sumatra", "Bali"] },
  { q: "Soto adalah makanan berkuah yang memiliki banyak variasi khas di berbagai daerah...?", a: "Indonesia", w: ["Jepang", "Korea", "Thailand"] }
];

const traditionalDances: FactItem[] = [
  { q: "Tari Kecak berasal dari daerah...?", a: "Bali", w: ["Jawa", "Sumatra", "Papua"] },
  { q: "Tari Saman berasal dari daerah...?", a: "Aceh", w: ["Jawa", "Bali", "Sumatra Utara"] },
  { q: "Tari Piring berasal dari daerah...?", a: "Sumatra Barat", w: ["Jawa", "Bali", "Papua"] },
  { q: "Tari Jaipong berasal dari daerah...?", a: "Jawa Barat", w: ["Jawa Timur", "Bali", "Sumatra"] },
  { q: "Tari Serimpi berasal dari daerah...?", a: "Yogyakarta / Jawa Tengah", w: ["Jawa Barat", "Bali", "Sumatra"] },
  { q: "Tari Pendet berasal dari daerah...?", a: "Bali", w: ["Jawa", "Sumatra", "Papua"] },
  { q: "Tari Reog berasal dari daerah...?", a: "Ponorogo, Jawa Timur", w: ["Jawa Barat", "Bali", "Sumatra"] },
  { q: "Tari Tor-Tor berasal dari daerah...?", a: "Sumatra Utara", w: ["Jawa", "Bali", "Papua"] },
  { q: "Tari Legong berasal dari daerah...?", a: "Bali", w: ["Jawa", "Sumatra", "Kalimantan"] },
  { q: "Tari Gambyong berasal dari daerah...?", a: "Jawa Tengah", w: ["Jawa Barat", "Bali", "Sumatra"] },
  { q: "Tari Cakalele berasal dari daerah...?", a: "Maluku", w: ["Jawa", "Bali", "Sumatra"] },
  { q: "Tari Yospan berasal dari daerah...?", a: "Papua", w: ["Jawa", "Bali", "Sumatra"] },
  { q: "Tari Kipas Pakarena berasal dari daerah...?", a: "Sulawesi Selatan", w: ["Jawa", "Bali", "Sumatra"] },
  { q: "Tari Baris berasal dari daerah...?", a: "Bali", w: ["Jawa", "Sumatra", "Kalimantan"] },
  { q: "Tari Zapin berasal dari budaya...?", a: "Melayu", w: ["Jawa", "Bali", "Papua"] },
  { q: "Tari Bedhaya adalah tarian klasik dari keraton...?", a: "Yogyakarta dan Surakarta", w: ["Keraton Bali", "Keraton Sumatra", "Keraton Papua"] },
  { q: "Tari Ronggeng berasal dari daerah...?", a: "Jawa Barat dan Banten", w: ["Bali", "Papua", "Sulawesi"] },
  { q: "Tari Enggang berasal dari suku...?", a: "Dayak, Kalimantan", w: ["Jawa", "Bali", "Sumatra"] },
  { q: "Tarian yang biasa ditampilkan untuk menyambut tamu kehormatan disebut tari...?", a: "Penyambutan", w: ["Perang", "Duka", "Sedih"] },
  { q: "Tari tradisional Indonesia biasanya diiringi oleh musik...?", a: "Gamelan atau alat musik tradisional daerah", w: ["Musik elektronik modern saja", "Tanpa musik sama sekali", "Musik rock"] },
  { q: "Tari Merak adalah tarian yang terinspirasi dari gerakan burung merak, berasal dari daerah...?", a: "Jawa Barat", w: ["Bali", "Papua", "Sumatra"] },
  { q: "Tari Topeng adalah tarian yang menggunakan properti berupa...?", a: "Topeng wajah", w: ["Kipas", "Piring", "Payung"] },
  { q: "Tari Payung berasal dari daerah...?", a: "Sumatra Barat", w: ["Jawa", "Bali", "Papua"] },
  { q: "Tari Cendrawasih terinspirasi dari burung khas daerah...?", a: "Papua", w: ["Jawa", "Bali", "Sumatra"] },
  { q: "Tari Kuda Lumping menggunakan properti berupa anyaman berbentuk...?", a: "Kuda", w: ["Perahu", "Burung", "Kereta"] }
];

  return [
    ...buildFromFacts(nationalHeroes, "PU_SD2", "SD Kelas 2", "Pengetahuan Umum", 0),
    ...buildFromFacts(traditionalHousesClothes, "PU_SD2", "SD Kelas 2", "Pengetahuan Umum", 25),
    ...buildFromFacts(traditionalFood, "PU_SD2", "SD Kelas 2", "Pengetahuan Umum", 50),
    ...buildFromFacts(traditionalDances, "PU_SD2", "SD Kelas 2", "Pengetahuan Umum", 75)
  ];
}

// Generate Pengetahuan Umum SD Kelas 3 (9 tahun) — 100 questions
// Scope: continents & oceans, ASEAN countries, inventors/inventions,
// traditional musical instruments, Indonesian ethnic groups.
function generateGeneralKnowledgeSD3(): Question[] {
const continentsOceans: FactItem[] = [
  { q: "Benua terbesar di dunia adalah...?", a: "Asia", w: ["Afrika", "Eropa", "Australia"] },
  { q: "Benua terkecil di dunia adalah...?", a: "Australia", w: ["Asia", "Afrika", "Eropa"] },
  { q: "Indonesia terletak di benua...?", a: "Asia", w: ["Afrika", "Eropa", "Amerika"] },
  { q: "Benua yang terkenal dengan gurun Sahara adalah...?", a: "Afrika", w: ["Asia", "Eropa", "Australia"] },
  { q: "Benua yang terletak paling dingin dan tertutup es adalah...?", a: "Antartika", w: ["Asia", "Afrika", "Eropa"] },
  { q: "Samudra terluas di dunia adalah...?", a: "Samudra Pasifik", w: ["Samudra Atlantik", "Samudra Hindia", "Samudra Arktik"] },
  { q: "Samudra yang terletak di antara Benua Amerika dan Eropa/Afrika adalah...?", a: "Samudra Atlantik", w: ["Samudra Pasifik", "Samudra Hindia", "Samudra Arktik"] },
  { q: "Samudra yang berbatasan langsung dengan Indonesia bagian barat adalah...?", a: "Samudra Hindia", w: ["Samudra Atlantik", "Samudra Arktik", "Samudra Pasifik saja"] },
  { q: "Benua tempat negara Amerika Serikat berada adalah...?", a: "Amerika Utara", w: ["Amerika Selatan", "Eropa", "Asia"] },
  { q: "Benua tempat negara Brazil berada adalah...?", a: "Amerika Selatan", w: ["Amerika Utara", "Eropa", "Asia"] },
  { q: "Jumlah benua di dunia ada...?", a: "7 benua", w: ["5 benua", "6 benua", "8 benua"] },
  { q: "Benua yang terkenal dengan Menara Eiffel adalah...?", a: "Eropa", w: ["Asia", "Afrika", "Amerika"] },
  { q: "Gunung tertinggi di dunia, Gunung Everest, terletak di benua...?", a: "Asia", w: ["Eropa", "Afrika", "Amerika"] },
  { q: "Sungai terpanjang di dunia, Sungai Nil, terletak di benua...?", a: "Afrika", w: ["Asia", "Eropa", "Amerika"] },
  { q: "Negara yang merupakan benua sekaligus negara adalah...?", a: "Australia", w: ["Indonesia", "Jepang", "Brazil"] },
  { q: "Laut yang berada di antara Pulau Jawa dan Pulau Kalimantan disebut...?", a: "Laut Jawa", w: ["Laut Merah", "Laut Hitam", "Laut Kaspia"] },
  { q: "Selat yang memisahkan Pulau Sumatra dan Pulau Jawa disebut...?", a: "Selat Sunda", w: ["Selat Malaka", "Selat Bali", "Selat Karimata"] },
  { q: "Selat yang memisahkan Pulau Sumatra dan negara Malaysia disebut...?", a: "Selat Malaka", w: ["Selat Sunda", "Selat Bali", "Selat Lombok"] },
  { q: "Samudra Arktik terletak di sekitar wilayah...?", a: "Kutub Utara", w: ["Kutub Selatan", "Garis Khatulistiwa", "Asia Tenggara"] },
  { q: "Benua yang wilayahnya terbagi menjadi banyak negara kecil di Eropa Barat adalah bagian dari benua...?", a: "Eropa", w: ["Asia", "Afrika", "Amerika"] }
];

const aseanCountries: FactItem[] = [
  { q: "ASEAN adalah organisasi kerja sama negara-negara di kawasan...?", a: "Asia Tenggara", w: ["Asia Timur", "Eropa", "Afrika"] },
  { q: "Ibu kota negara Malaysia adalah...?", a: "Kuala Lumpur", w: ["Bangkok", "Manila", "Hanoi"] },
  { q: "Ibu kota negara Thailand adalah...?", a: "Bangkok", w: ["Kuala Lumpur", "Manila", "Hanoi"] },
  { q: "Ibu kota negara Filipina adalah...?", a: "Manila", w: ["Bangkok", "Kuala Lumpur", "Hanoi"] },
  { q: "Ibu kota negara Vietnam adalah...?", a: "Hanoi", w: ["Bangkok", "Manila", "Kuala Lumpur"] },
  { q: "Ibu kota negara Singapura adalah...?", a: "Singapura", w: ["Kuala Lumpur", "Bangkok", "Manila"] },
  { q: "Ibu kota negara Brunei Darussalam adalah...?", a: "Bandar Seri Begawan", w: ["Kuala Lumpur", "Bangkok", "Manila"] },
  { q: "Ibu kota negara Myanmar adalah...?", a: "Naypyidaw", w: ["Yangon", "Bangkok", "Hanoi"] },
  { q: "Ibu kota negara Kamboja adalah...?", a: "Phnom Penh", w: ["Vientiane", "Bangkok", "Hanoi"] },
  { q: "Ibu kota negara Laos adalah...?", a: "Vientiane", w: ["Phnom Penh", "Bangkok", "Hanoi"] },
  { q: "Ibu kota negara Timor Leste adalah...?", a: "Dili", w: ["Manila", "Bangkok", "Hanoi"] },
  { q: "Jumlah negara anggota ASEAN saat ini berjumlah...?", a: "11 negara", w: ["5 negara", "8 negara", "15 negara"] },
  { q: "Negara ASEAN yang berbentuk kepulauan terbesar selain Indonesia adalah...?", a: "Filipina", w: ["Thailand", "Vietnam", "Laos"] },
  { q: "Negara ASEAN yang tidak memiliki wilayah laut (terkurung daratan) adalah...?", a: "Laos", w: ["Filipina", "Indonesia", "Singapura"] },
  { q: "Mata uang negara Malaysia adalah...?", a: "Ringgit", w: ["Baht", "Peso", "Dong"] },
  { q: "Mata uang negara Thailand adalah...?", a: "Baht", w: ["Ringgit", "Peso", "Dong"] },
  { q: "Mata uang negara Filipina adalah...?", a: "Peso", w: ["Ringgit", "Baht", "Dong"] },
  { q: "Mata uang negara Vietnam adalah...?", a: "Dong", w: ["Ringgit", "Baht", "Peso"] },
  { q: "Bendera negara Malaysia memiliki warna dasar...?", a: "Merah, putih, biru, dan kuning", w: ["Hitam dan putih saja", "Hijau dan kuning saja", "Ungu dan emas"] },
  { q: "ASEAN didirikan pada tanggal...?", a: "8 Agustus 1967", w: ["17 Agustus 1945", "1 Januari 1950", "10 November 1960"] }
];

const inventorsInventions: FactItem[] = [
  { q: "Penemu bola lampu adalah...?", a: "Thomas Alva Edison", w: ["Alexander Graham Bell", "Isaac Newton", "Albert Einstein"] },
  { q: "Penemu telepon adalah...?", a: "Alexander Graham Bell", w: ["Thomas Alva Edison", "Isaac Newton", "Albert Einstein"] },
  { q: "Ilmuwan yang menemukan teori gravitasi adalah...?", a: "Isaac Newton", w: ["Albert Einstein", "Thomas Alva Edison", "Alexander Graham Bell"] },
  { q: "Ilmuwan yang terkenal dengan teori relativitas adalah...?", a: "Albert Einstein", w: ["Isaac Newton", "Thomas Alva Edison", "Alexander Graham Bell"] },
  { q: "Penemu pesawat terbang pertama adalah...?", a: "Wright Bersaudara", w: ["Thomas Alva Edison", "Isaac Newton", "Alexander Graham Bell"] },
  { q: "Penemu mesin uap yang mendorong revolusi industri adalah...?", a: "James Watt", w: ["Thomas Alva Edison", "Isaac Newton", "Alexander Graham Bell"] },
  { q: "Penemu radio adalah...?", a: "Guglielmo Marconi", w: ["Thomas Alva Edison", "Isaac Newton", "James Watt"] },
  { q: "Penemu vaksin untuk penyakit rabies adalah...?", a: "Louis Pasteur", w: ["Thomas Alva Edison", "Isaac Newton", "James Watt"] },
  { q: "Ilmuwan yang menemukan hukum gerak dan cahaya, dan juga mempelajari gravitasi dari buah apel adalah...?", a: "Isaac Newton", w: ["Albert Einstein", "Thomas Alva Edison", "Louis Pasteur"] },
  { q: "Penemu komputer pertama sering dikaitkan dengan tokoh bernama...?", a: "Charles Babbage", w: ["Thomas Alva Edison", "Isaac Newton", "Alexander Graham Bell"] },
  { q: "B.J. Habibie, tokoh Indonesia, terkenal karena keahliannya di bidang...?", a: "Teknologi pesawat terbang", w: ["Kedokteran", "Musik", "Olahraga"] },
  { q: "Penemu mesin cetak modern adalah...?", a: "Johannes Gutenberg", w: ["Thomas Alva Edison", "Isaac Newton", "James Watt"] },
  { q: "Ilmuwan yang menemukan unsur radioaktif dan meraih dua Hadiah Nobel adalah...?", a: "Marie Curie", w: ["Isaac Newton", "Albert Einstein", "Thomas Alva Edison"] },
  { q: "Penemu World Wide Web (WWW) yang mendasari internet modern adalah...?", a: "Tim Berners-Lee", w: ["Thomas Alva Edison", "Isaac Newton", "Alexander Graham Bell"] },
  { q: "Penemu telegraf yang digunakan untuk mengirim pesan jarak jauh adalah...?", a: "Samuel Morse", w: ["Thomas Alva Edison", "Isaac Newton", "James Watt"] },
  { q: "Ilmuwan yang menemukan hukum tentang tekanan zat cair adalah...?", a: "Blaise Pascal", w: ["Isaac Newton", "Albert Einstein", "Thomas Alva Edison"] },
  { q: "Penemu mikroskop yang membantu ilmu biologi berkembang adalah...?", a: "Antonie van Leeuwenhoek", w: ["Thomas Alva Edison", "Isaac Newton", "James Watt"] },
  { q: "Penemu sinar-X yang digunakan dalam dunia kedokteran adalah...?", a: "Wilhelm Rontgen", w: ["Thomas Alva Edison", "Isaac Newton", "Alexander Graham Bell"] },
  { q: "Ilmuwan yang mengembangkan teori evolusi makhluk hidup adalah...?", a: "Charles Darwin", w: ["Isaac Newton", "Albert Einstein", "Thomas Alva Edison"] },
  { q: "Penemu baterai listrik pertama adalah...?", a: "Alessandro Volta", w: ["Thomas Alva Edison", "Isaac Newton", "James Watt"] }
];

const traditionalMusicalInstruments: FactItem[] = [
  { q: "Alat musik bambu khas Jawa Barat yang dimainkan dengan cara digoyangkan adalah...?", a: "Angklung", w: ["Gamelan", "Kolintang", "Sasando"] },
  { q: "Alat musik tradisional Jawa yang terdiri dari berbagai jenis gong dan kendang adalah...?", a: "Gamelan", w: ["Angklung", "Kolintang", "Sasando"] },
  { q: "Alat musik tradisional dari Sulawesi Utara yang terbuat dari kayu dan dipukul adalah...?", a: "Kolintang", w: ["Angklung", "Gamelan", "Sasando"] },
  { q: "Alat musik petik tradisional dari Nusa Tenggara Timur adalah...?", a: "Sasando", w: ["Angklung", "Gamelan", "Kolintang"] },
  { q: "Alat musik tradisional Sunda yang berbentuk mirip alat musik petik kecil adalah...?", a: "Kecapi", w: ["Angklung", "Gamelan", "Kolintang"] },
  { q: "Alat musik tiup tradisional dari Sunda yang terbuat dari bambu adalah...?", a: "Suling", w: ["Kecapi", "Gamelan", "Sasando"] },
  { q: "Alat musik tradisional Batak yang berupa kumpulan gendang disebut...?", a: "Gondang", w: ["Angklung", "Gamelan", "Kolintang"] },
  { q: "Alat musik tradisional dari Papua berbentuk seperti gendang panjang adalah...?", a: "Tifa", w: ["Angklung", "Gamelan", "Kolintang"] },
  { q: "Alat musik tradisional Betawi berupa kumpulan alat musik gesek dan tiup adalah...?", a: "Gambang Kromong", w: ["Angklung", "Gamelan", "Sasando"] },
  { q: "Alat musik tradisional Minangkabau yang dimainkan dengan cara dipukul dan diayunkan adalah...?", a: "Talempong", w: ["Angklung", "Gamelan", "Kolintang"] },
  { q: "Rebab adalah alat musik gesek tradisional yang biasa digunakan dalam pertunjukan...?", a: "Wayang", w: ["Sepak bola", "Balap sepeda", "Renang"] },
  { q: "Alat musik tradisional dari Aceh berbentuk seperti biola adalah...?", a: "Rapai", w: ["Kecapi", "Gamelan", "Sasando"] },
  { q: "Gendang adalah alat musik yang dimainkan dengan cara...?", a: "Dipukul", w: ["Digesek", "Ditiup", "Dipetik"] },
  { q: "Seruling adalah alat musik yang dimainkan dengan cara...?", a: "Ditiup", w: ["Dipukul", "Digesek", "Dipetik"] },
  { q: "Kecapi adalah alat musik yang dimainkan dengan cara...?", a: "Dipetik", w: ["Dipukul", "Ditiup", "Digesek"] },
  { q: "Alat musik tradisional dari Kalimantan yang terbuat dari batang pohon berongga adalah...?", a: "Sampe", w: ["Angklung", "Gamelan", "Kolintang"] },
  { q: "Musik gamelan biasa mengiringi pertunjukan tradisional seperti...?", a: "Wayang dan tari Jawa", w: ["Balap mobil", "Pertandingan sepak bola", "Lomba lari"] },
  { q: "Alat musik tradisional dari Bali yang mirip gamelan namun bertempo lebih cepat disebut...?", a: "Gamelan Bali", w: ["Angklung", "Sasando", "Kolintang"] },
  { q: "Bonang adalah salah satu instrumen dalam ansambel...?", a: "Gamelan", w: ["Angklung saja", "Kolintang saja", "Sasando saja"] },
  { q: "Alat musik tradisional yang biasa mengiringi tari Saman dari Aceh adalah...?", a: "Vokal dan tepuk tangan penari itu sendiri", w: ["Gamelan lengkap", "Angklung", "Sasando"] }
];

const ethnicGroups: FactItem[] = [
  { q: "Suku bangsa terbesar di Indonesia adalah suku...?", a: "Jawa", w: ["Sunda", "Batak", "Bugis"] },
  { q: "Suku Sunda banyak mendiami wilayah...?", a: "Jawa Barat", w: ["Jawa Timur", "Sumatra", "Kalimantan"] },
  { q: "Suku Batak banyak mendiami wilayah...?", a: "Sumatra Utara", w: ["Jawa Barat", "Bali", "Kalimantan"] },
  { q: "Suku Minangkabau banyak mendiami wilayah...?", a: "Sumatra Barat", w: ["Jawa", "Bali", "Papua"] },
  { q: "Suku Bugis banyak mendiami wilayah...?", a: "Sulawesi Selatan", w: ["Jawa", "Sumatra", "Papua"] },
  { q: "Suku Dayak banyak mendiami wilayah...?", a: "Kalimantan", w: ["Jawa", "Sumatra", "Sulawesi"] },
  { q: "Suku Asmat banyak mendiami wilayah...?", a: "Papua", w: ["Jawa", "Sumatra", "Kalimantan"] },
  { q: "Suku Betawi banyak mendiami wilayah...?", a: "Jakarta", w: ["Bandung", "Surabaya", "Medan"] },
  { q: "Suku Bali sebagian besar memeluk agama...?", a: "Hindu", w: ["Islam", "Kristen", "Buddha"] },
  { q: "Suku Toraja banyak mendiami wilayah...?", a: "Sulawesi Selatan", w: ["Jawa", "Sumatra", "Papua"] },
  { q: "Suku Aceh banyak mendiami wilayah...?", a: "Aceh, Sumatra", w: ["Jawa", "Bali", "Papua"] },
  { q: "Semboyan Bhinneka Tunggal Ika mengajarkan kita untuk...?", a: "Menghargai keberagaman suku bangsa", w: ["Membeda-bedakan suku", "Hanya mengenal satu suku", "Menghindari suku lain"] },
  { q: "Indonesia memiliki lebih dari...?", a: "300 suku bangsa", w: ["10 suku bangsa", "50 suku bangsa", "1000 suku bangsa"] },
  { q: "Suku Madura banyak mendiami wilayah...?", a: "Pulau Madura, Jawa Timur", w: ["Sumatra", "Bali", "Papua"] },
  { q: "Suku Sasak banyak mendiami wilayah...?", a: "Lombok, Nusa Tenggara Barat", w: ["Jawa", "Sumatra", "Kalimantan"] },
  { q: "Suku Melayu banyak mendiami wilayah...?", a: "Riau dan sekitarnya", w: ["Jawa", "Bali", "Papua"] },
  { q: "Suku Nias banyak mendiami wilayah...?", a: "Pulau Nias, Sumatra Utara", w: ["Jawa", "Bali", "Papua"] },
  { q: "Suku Banjar banyak mendiami wilayah...?", a: "Kalimantan Selatan", w: ["Jawa", "Bali", "Papua"] },
  { q: "Keberagaman suku bangsa di Indonesia sebaiknya kita sikapi dengan...?", a: "Rasa persatuan dan toleransi", w: ["Perpecahan", "Diskriminasi", "Permusuhan"] },
  { q: "Suku Minahasa banyak mendiami wilayah...?", a: "Sulawesi Utara", w: ["Jawa", "Sumatra", "Papua"] }
];

  return [
    ...buildFromFacts(continentsOceans, "PU_SD3", "SD Kelas 3", "Pengetahuan Umum", 0),
    ...buildFromFacts(aseanCountries, "PU_SD3", "SD Kelas 3", "Pengetahuan Umum", 20),
    ...buildFromFacts(inventorsInventions, "PU_SD3", "SD Kelas 3", "Pengetahuan Umum", 40),
    ...buildFromFacts(traditionalMusicalInstruments, "PU_SD3", "SD Kelas 3", "Pengetahuan Umum", 60),
    ...buildFromFacts(ethnicGroups, "PU_SD3", "SD Kelas 3", "Pengetahuan Umum", 80)
  ];
}

// Generate Pengetahuan Umum SD Kelas 4 (10 tahun) — 100 questions
// Scope: Indonesian government basics, state institutions, sports/athletes,
// measurement units, independence history.
function generateGeneralKnowledgeSD4(): Question[] {
const governmentBasics: FactItem[] = [
  { q: "Kepala negara sekaligus kepala pemerintahan Indonesia adalah...?", a: "Presiden", w: ["Gubernur", "Bupati", "Walikota"] },
  { q: "Kepala pemerintahan tingkat provinsi disebut...?", a: "Gubernur", w: ["Presiden", "Bupati", "Camat"] },
  { q: "Kepala pemerintahan tingkat kabupaten disebut...?", a: "Bupati", w: ["Gubernur", "Walikota", "Presiden"] },
  { q: "Kepala pemerintahan tingkat kota disebut...?", a: "Walikota", w: ["Bupati", "Gubernur", "Presiden"] },
  { q: "Kepala pemerintahan tingkat kecamatan disebut...?", a: "Camat", w: ["Bupati", "Walikota", "Gubernur"] },
  { q: "Kepala pemerintahan tingkat desa disebut...?", a: "Kepala Desa / Lurah", w: ["Camat", "Bupati", "Gubernur"] },
  { q: "Lembaga yang bertugas membuat undang-undang bersama presiden adalah...?", a: "DPR (Dewan Perwakilan Rakyat)", w: ["Mahkamah Agung", "Kepolisian", "TNI"] },
  { q: "Anggota DPR dipilih melalui...?", a: "Pemilihan Umum (Pemilu)", w: ["Penunjukan langsung", "Warisan keluarga", "Undian"] },
  { q: "Lembaga yang bertugas mengadili pelanggaran hukum tertinggi adalah...?", a: "Mahkamah Agung", w: ["DPR", "TNI", "Kepolisian"] },
  { q: "Presiden Indonesia menjabat selama...?", a: "5 tahun per periode", w: ["1 tahun", "10 tahun", "Seumur hidup"] },
  { q: "Presiden Indonesia dapat menjabat maksimal berapa periode berturut-turut?", a: "2 periode", w: ["1 periode", "3 periode", "Tidak terbatas"] },
  { q: "Wakil presiden bertugas membantu...?", a: "Presiden", w: ["Gubernur saja", "DPR saja", "TNI saja"] },
  { q: "Lembaga yang menjaga keamanan dan pertahanan negara dari ancaman luar adalah...?", a: "TNI (Tentara Nasional Indonesia)", w: ["DPR", "Mahkamah Agung", "Bank Indonesia"] },
  { q: "Lembaga yang menjaga keamanan dan ketertiban masyarakat adalah...?", a: "Polri (Kepolisian Republik Indonesia)", w: ["DPR", "Mahkamah Agung", "Bank Indonesia"] },
  { q: "Ibu kota negara adalah pusat kegiatan...?", a: "Pemerintahan", w: ["Pertanian saja", "Perikanan saja", "Perkebunan saja"] },
  { q: "Setiap warga negara Indonesia yang sudah cukup umur memiliki hak untuk...?", a: "Memilih dalam pemilu", w: ["Menjadi presiden tanpa pemilu", "Mengabaikan hukum", "Tidak membayar pajak"] },
  { q: "Konstitusi atau hukum dasar tertulis negara Indonesia disebut...?", a: "UUD 1945", w: ["Pancasila saja", "Bhinneka Tunggal Ika", "Sumpah Pemuda"] },
  { q: "Sistem pemerintahan Indonesia berbentuk...?", a: "Republik", w: ["Kerajaan", "Kekaisaran", "Kesultanan"] },
  { q: "Pemilihan umum di Indonesia diadakan setiap...?", a: "5 tahun sekali", w: ["1 tahun sekali", "10 tahun sekali", "Setiap bulan"] },
  { q: "Lembaga yang mengelola keuangan dan mata uang negara adalah...?", a: "Bank Indonesia", w: ["DPR", "TNI", "Mahkamah Agung"] }
];

const stateInstitutions: FactItem[] = [
  { q: "Lembaga tertinggi yang mengawasi penggunaan keuangan negara adalah...?", a: "BPK (Badan Pemeriksa Keuangan)", w: ["DPR", "TNI", "Kepolisian"] },
  { q: "Lembaga yang menguji apakah suatu undang-undang bertentangan dengan konstitusi adalah...?", a: "Mahkamah Konstitusi", w: ["DPR", "TNI", "Bank Indonesia"] },
  { q: "Lembaga yang mewakili daerah-daerah di tingkat pusat adalah...?", a: "DPD (Dewan Perwakilan Daerah)", w: ["TNI", "Kepolisian", "Bank Indonesia"] },
  { q: "Lembaga yang menyelenggarakan pemilihan umum di Indonesia adalah...?", a: "KPU (Komisi Pemilihan Umum)", w: ["TNI", "Kepolisian", "Bank Indonesia"] },
  { q: "Lembaga yang mengawasi jalannya pemilu agar berjalan jujur dan adil adalah...?", a: "Bawaslu (Badan Pengawas Pemilu)", w: ["TNI", "Kepolisian", "Bank Indonesia"] },
  { q: "Lembaga yang memberantas tindak pidana korupsi di Indonesia adalah...?", a: "KPK (Komisi Pemberantasan Korupsi)", w: ["TNI", "DPD", "Bank Indonesia"] },
  { q: "Presiden dan wakil presiden dipilih langsung oleh...?", a: "Rakyat melalui pemilu", w: ["DPR saja", "TNI saja", "Gubernur saja"] },
  { q: "Lembaga negara yang berperan sebagai penasihat presiden dalam bidang tertentu disebut...?", a: "Dewan Pertimbangan Presiden", w: ["TNI", "Kepolisian", "Bank Indonesia"] },
  { q: "Kejaksaan bertugas untuk...?", a: "Menuntut pelanggar hukum di pengadilan", w: ["Membuat undang-undang", "Mencetak uang", "Mengatur lalu lintas"] },
  { q: "Lembaga yang bertugas menyusun anggaran pendapatan dan belanja negara bersama pemerintah adalah...?", a: "DPR", w: ["TNI", "Kepolisian", "KPK"] },
  { q: "Sila keempat Pancasila berkaitan dengan sistem...?", a: "Musyawarah dan demokrasi", w: ["Ekonomi saja", "Pertanian saja", "Militer saja"] },
  { q: "Trias politika membagi kekuasaan negara menjadi tiga, yaitu legislatif, eksekutif, dan...?", a: "Yudikatif", w: ["Militer", "Ekonomi", "Sosial"] },
  { q: "Kekuasaan legislatif berkaitan dengan tugas...?", a: "Membuat undang-undang", w: ["Menjalankan pemerintahan sehari-hari", "Mengadili pelanggar hukum", "Mencetak uang"] },
  { q: "Kekuasaan eksekutif berkaitan dengan tugas...?", a: "Menjalankan pemerintahan", w: ["Membuat undang-undang", "Mengadili pelanggar hukum", "Mencetak uang"] },
  { q: "Kekuasaan yudikatif berkaitan dengan tugas...?", a: "Mengadili pelanggaran hukum", w: ["Membuat undang-undang", "Menjalankan pemerintahan", "Mencetak uang"] },
  { q: "Setiap warga negara memiliki kewajiban untuk...?", a: "Mematuhi hukum dan membayar pajak", w: ["Mengabaikan hukum", "Menghindari kewajiban", "Melanggar aturan"] },
  { q: "Pajak yang dibayarkan warga negara digunakan untuk...?", a: "Pembangunan negara dan fasilitas umum", w: ["Kepentingan pribadi pejabat", "Dibuang begitu saja", "Disimpan tanpa digunakan"] },
  { q: "Lembaga yang bertugas menjaga kedaulatan wilayah laut Indonesia adalah bagian dari...?", a: "TNI Angkatan Laut", w: ["DPR", "KPK", "Bank Indonesia"] },
  { q: "Lembaga yang bertugas menjaga wilayah udara Indonesia adalah bagian dari...?", a: "TNI Angkatan Udara", w: ["DPR", "KPK", "Bank Indonesia"] },
  { q: "Setiap warga negara berhak mendapatkan pendidikan dan kesehatan sebagai bagian dari...?", a: "Hak asasi manusia", w: ["Hadiah dari pemerintah", "Hal yang tidak penting", "Kewajiban semata"] }
];

const sportsAthletes: FactItem[] = [
  { q: "Olahraga yang menggunakan raket dan shuttlecock disebut...?", a: "Bulu Tangkis / Badminton", w: ["Tenis Meja", "Sepak Bola", "Voli"] },
  { q: "Susi Susanti adalah atlet Indonesia yang terkenal dalam cabang olahraga...?", a: "Bulu Tangkis", w: ["Sepak Bola", "Renang", "Angkat Besi"] },
  { q: "Olahraga yang dimainkan dengan menendang bola ke gawang lawan disebut...?", a: "Sepak Bola", w: ["Bulu Tangkis", "Basket", "Voli"] },
  { q: "Olahraga yang dimainkan dengan memasukkan bola ke keranjang disebut...?", a: "Bola Basket", w: ["Sepak Bola", "Bulu Tangkis", "Voli"] },
  { q: "Olahraga yang dimainkan dengan memukul bola melewati net menggunakan tangan disebut...?", a: "Bola Voli", w: ["Sepak Bola", "Basket", "Bulu Tangkis"] },
  { q: "Olahraga renang dilakukan di dalam...?", a: "Air / Kolam Renang", w: ["Lapangan rumput", "Lintasan lari", "Ring tinju"] },
  { q: "Cabang olahraga bela diri asli Indonesia adalah...?", a: "Pencak Silat", w: ["Karate", "Judo", "Taekwondo"] },
  { q: "Ajang olahraga terbesar di dunia yang diadakan setiap 4 tahun sekali adalah...?", a: "Olimpiade", w: ["Piala Dunia saja", "SEA Games saja", "Asian Games saja"] },
  { q: "Ajang sepak bola terbesar di dunia yang diadakan setiap 4 tahun sekali adalah...?", a: "Piala Dunia (World Cup)", w: ["Olimpiade", "SEA Games", "Liga Champions"] },
  { q: "Ajang olahraga negara-negara Asia Tenggara disebut...?", a: "SEA Games", w: ["Olimpiade", "Piala Dunia", "Asian Games"] },
  { q: "Ajang olahraga negara-negara Asia disebut...?", a: "Asian Games", w: ["Olimpiade", "Piala Dunia", "SEA Games"] },
  { q: "Rudy Hartono adalah legenda atlet Indonesia dalam cabang olahraga...?", a: "Bulu Tangkis", w: ["Sepak Bola", "Renang", "Angkat Besi"] },
  { q: "Olahraga tinju dilakukan dengan menggunakan...?", a: "Sarung tinju dan pukulan", w: ["Raket", "Bola", "Anak panah"] },
  { q: "Olahraga yang menggunakan anak panah dan busur disebut...?", a: "Panahan", w: ["Tinju", "Renang", "Bulu Tangkis"] },
  { q: "Olahraga lari, lompat, dan lempar termasuk dalam cabang olahraga...?", a: "Atletik", w: ["Renang", "Bulu Tangkis", "Sepak Bola"] },
  { q: "Cabang olahraga yang dimainkan di atas meja dengan bet kecil disebut...?", a: "Tenis Meja", w: ["Bulu Tangkis", "Sepak Bola", "Basket"] },
  { q: "Klub sepak bola nasional Indonesia bermain di kompetisi bernama...?", a: "Liga 1 Indonesia", w: ["Premier League", "La Liga", "Serie A"] },
  { q: "Cabang olahraga yang menggunakan sepeda untuk berlomba disebut...?", a: "Balap Sepeda", w: ["Balap Lari", "Balap Renang", "Balap Panahan"] },
  { q: "Wilfred Yakob dan Anthony Ginting adalah atlet Indonesia dalam cabang olahraga...?", a: "Bulu Tangkis", w: ["Sepak Bola", "Renang", "Panahan"] },
  { q: "Olahraga catur dimainkan di atas papan dengan jumlah bidak sebanyak...?", a: "32 bidak (16 untuk masing-masing pemain)", w: ["16 bidak total", "64 bidak total", "10 bidak total"] }
];

const measurementUnits: FactItem[] = [
  { q: "Satuan untuk mengukur panjang dalam sistem metrik adalah...?", a: "Meter", w: ["Kilogram", "Liter", "Detik"] },
  { q: "Satuan untuk mengukur berat dalam sistem metrik adalah...?", a: "Kilogram", w: ["Meter", "Liter", "Detik"] },
  { q: "Satuan untuk mengukur volume cairan dalam sistem metrik adalah...?", a: "Liter", w: ["Meter", "Kilogram", "Detik"] },
  { q: "Satuan untuk mengukur waktu yang paling kecil adalah...?", a: "Detik", w: ["Menit", "Jam", "Hari"] },
  { q: "1 kilometer sama dengan berapa meter?", a: "1000 meter", w: ["100 meter", "10 meter", "10000 meter"] },
  { q: "1 kilogram sama dengan berapa gram?", a: "1000 gram", w: ["100 gram", "10 gram", "10000 gram"] },
  { q: "1 liter sama dengan berapa mililiter?", a: "1000 mililiter", w: ["100 mililiter", "10 mililiter", "10000 mililiter"] },
  { q: "Alat yang digunakan untuk mengukur panjang suatu benda disebut...?", a: "Penggaris / Meteran", w: ["Timbangan", "Termometer", "Jam"] },
  { q: "Alat yang digunakan untuk mengukur berat suatu benda disebut...?", a: "Timbangan", w: ["Penggaris", "Termometer", "Jam"] },
  { q: "Alat yang digunakan untuk mengukur suhu tubuh disebut...?", a: "Termometer", w: ["Timbangan", "Penggaris", "Jam"] },
  { q: "Satuan yang digunakan untuk mengukur suhu adalah...?", a: "Derajat Celsius", w: ["Meter", "Kilogram", "Liter"] },
  { q: "Satuan luas yang biasa digunakan untuk mengukur tanah adalah...?", a: "Meter persegi", w: ["Meter kubik", "Kilogram", "Liter"] },
  { q: "Satuan volume yang biasa digunakan untuk mengukur ruangan adalah...?", a: "Meter kubik", w: ["Meter persegi", "Kilogram", "Liter"] },
  { q: "Timbangan badan biasa digunakan untuk mengukur...?", a: "Berat badan", w: ["Tinggi badan", "Suhu badan", "Detak jantung"] },
  { q: "Alat yang digunakan untuk mengukur tinggi badan disebut...?", a: "Meteran / Stadiometer", w: ["Timbangan", "Termometer", "Jam"] },
  { q: "Satuan untuk mengukur kecepatan kendaraan biasanya adalah...?", a: "Kilometer per jam", w: ["Kilogram per detik", "Liter per meter", "Meter per kilogram"] },
  { q: "1 jam sama dengan berapa menit?", a: "60 menit", w: ["30 menit", "100 menit", "24 menit"] },
  { q: "Untuk mengukur jarak antar kota, satuan yang paling sesuai digunakan adalah...?", a: "Kilometer", w: ["Sentimeter", "Milimeter", "Gram"] },
  { q: "Untuk mengukur panjang pensil, satuan yang paling sesuai digunakan adalah...?", a: "Sentimeter", w: ["Kilometer", "Kilogram", "Liter"] },
  { q: "Satuan waktu yang digunakan untuk menyatakan usia seseorang biasanya adalah...?", a: "Tahun", w: ["Detik", "Menit", "Jam"] }
];

const independenceHistory: FactItem[] = [
  { q: "Indonesia dijajah oleh Belanda selama sekitar...?", a: "3,5 abad", w: ["10 tahun", "1 abad", "1000 tahun"] },
  { q: "Indonesia sempat dijajah oleh Jepang selama sekitar...?", a: "3,5 tahun", w: ["10 tahun", "1 abad", "100 tahun"] },
  { q: "Naskah proklamasi kemerdekaan Indonesia disusun di rumah...?", a: "Laksamana Maeda", w: ["Soekarno", "Soeharto", "B.J. Habibie"] },
  { q: "Peristiwa penculikan Soekarno-Hatta ke Rengasdengklok bertujuan untuk...?", a: "Mendesak segera memproklamasikan kemerdekaan", w: ["Menangkap penjajah", "Merayakan kemenangan", "Mengadakan pemilu"] },
  { q: "Bendera pusaka merah putih pertama kali dikibarkan pada tanggal...?", a: "17 Agustus 1945", w: ["28 Oktober 1928", "1 Juni 1945", "10 November 1945"] },
  { q: "Organisasi pemuda yang mengikrarkan Sumpah Pemuda pada tahun 1928 bertujuan untuk...?", a: "Mempersatukan pemuda Indonesia", w: ["Memecah belah bangsa", "Menjajah negara lain", "Membuat undang-undang"] },
  { q: "Sumpah Pemuda berisi tiga ikrar, salah satunya adalah satu nusa, satu bangsa, dan satu...?", a: "Bahasa", w: ["Presiden", "Bendera saja", "Provinsi"] },
  { q: "VOC adalah organisasi dagang milik negara...?", a: "Belanda", w: ["Inggris", "Portugis", "Jepang"] },
  { q: "Konferensi yang mengakui kedaulatan Indonesia secara resmi oleh Belanda disebut...?", a: "Konferensi Meja Bundar", w: ["Konferensi Asia Afrika", "Sumpah Pemuda", "Kongres Pemuda"] },
  { q: "Konferensi Asia Afrika diadakan di kota...?", a: "Bandung", w: ["Jakarta", "Surabaya", "Yogyakarta"] },
  { q: "Perjuangan kemerdekaan Indonesia melibatkan perjuangan fisik dan perjuangan melalui...?", a: "Diplomasi / Perundingan", w: ["Perdagangan saja", "Olahraga saja", "Kesenian saja"] },
  { q: "Hari kemerdekaan Indonesia dirayakan setiap tahun dengan berbagai...?", a: "Upacara bendera dan perlombaan", w: ["Hari libur tanpa kegiatan", "Hanya diam di rumah", "Tidak dirayakan"] },
  { q: "Pemimpin yang memproklamasikan kemerdekaan Indonesia atas nama bangsa Indonesia adalah...?", a: "Soekarno dan Hatta", w: ["Soeharto sendirian", "B.J. Habibie sendirian", "Jenderal Soedirman sendirian"] },
  { q: "Perlawanan rakyat Surabaya melawan tentara sekutu terjadi pada tanggal...?", a: "10 November 1945", w: ["17 Agustus 1945", "28 Oktober 1928", "1 Juni 1945"] },
  { q: "Peristiwa 10 November di Surabaya diperingati sebagai Hari...?", a: "Pahlawan", w: ["Kemerdekaan", "Pendidikan", "Kesaktian Pancasila"] },
  { q: "Tokoh yang menjadi Panglima Besar dalam perang gerilya melawan Belanda adalah...?", a: "Jenderal Soedirman", w: ["Soekarno", "B.J. Habibie", "Mohammad Hatta"] },
  { q: "Belanda kembali datang menjajah Indonesia setelah kemerdekaan melalui aksi militer yang disebut...?", a: "Agresi Militer Belanda", w: ["Konferensi Meja Bundar", "Sumpah Pemuda", "Kongres Pemuda"] },
  { q: "Ibu kota negara sempat dipindahkan sementara ke Yogyakarta pada masa perjuangan mempertahankan kemerdekaan karena...?", a: "Jakarta diduduki Belanda", w: ["Jakarta terkena bencana alam", "Jakarta terlalu ramai", "Yogyakarta lebih besar"] },
  { q: "Bung Karno adalah julukan akrab untuk tokoh proklamator...?", a: "Soekarno", w: ["Mohammad Hatta", "Soeharto", "B.J. Habibie"] },
  { q: "Bung Hatta adalah julukan akrab untuk tokoh proklamator...?", a: "Mohammad Hatta", w: ["Soekarno", "Soeharto", "B.J. Habibie"] }
];

  return [
    ...buildFromFacts(governmentBasics, "PU_SD4", "SD Kelas 4", "Pengetahuan Umum", 0),
    ...buildFromFacts(stateInstitutions, "PU_SD4", "SD Kelas 4", "Pengetahuan Umum", 20),
    ...buildFromFacts(sportsAthletes, "PU_SD4", "SD Kelas 4", "Pengetahuan Umum", 40),
    ...buildFromFacts(measurementUnits, "PU_SD4", "SD Kelas 4", "Pengetahuan Umum", 60),
    ...buildFromFacts(independenceHistory, "PU_SD4", "SD Kelas 4", "Pengetahuan Umum", 80)
  ];
}

// Generate Pengetahuan Umum SD Kelas 5 (11 tahun) — 100 questions
// Scope: world capitals, international organizations, world wonders/landmarks,
// world currencies, modern technology.
function generateGeneralKnowledgeSD5(): Question[] {
const worldCapitals: FactItem[] = [
  { q: "Ibu kota negara Jepang adalah...?", a: "Tokyo", w: ["Beijing", "Seoul", "Bangkok"] },
  { q: "Ibu kota negara Tiongkok adalah...?", a: "Beijing", w: ["Tokyo", "Seoul", "Bangkok"] },
  { q: "Ibu kota negara Korea Selatan adalah...?", a: "Seoul", w: ["Tokyo", "Beijing", "Bangkok"] },
  { q: "Ibu kota negara India adalah...?", a: "New Delhi", w: ["Mumbai", "Beijing", "Tokyo"] },
  { q: "Ibu kota negara Inggris adalah...?", a: "London", w: ["Paris", "Berlin", "Roma"] },
  { q: "Ibu kota negara Prancis adalah...?", a: "Paris", w: ["London", "Berlin", "Roma"] },
  { q: "Ibu kota negara Jerman adalah...?", a: "Berlin", w: ["Paris", "London", "Roma"] },
  { q: "Ibu kota negara Italia adalah...?", a: "Roma", w: ["Paris", "London", "Berlin"] },
  { q: "Ibu kota negara Spanyol adalah...?", a: "Madrid", w: ["Lisbon", "Paris", "Roma"] },
  { q: "Ibu kota negara Amerika Serikat adalah...?", a: "Washington, D.C.", w: ["New York", "Los Angeles", "Chicago"] },
  { q: "Ibu kota negara Kanada adalah...?", a: "Ottawa", w: ["Toronto", "Vancouver", "Montreal"] },
  { q: "Ibu kota negara Brazil adalah...?", a: "Brasilia", w: ["Rio de Janeiro", "Sao Paulo", "Buenos Aires"] },
  { q: "Ibu kota negara Mesir adalah...?", a: "Kairo", w: ["Cape Town", "Lagos", "Nairobi"] },
  { q: "Ibu kota negara Afrika Selatan adalah...?", a: "Pretoria / Cape Town", w: ["Kairo", "Lagos", "Nairobi"] },
  { q: "Ibu kota negara Australia adalah...?", a: "Canberra", w: ["Sydney", "Melbourne", "Perth"] },
  { q: "Ibu kota negara Rusia adalah...?", a: "Moskow", w: ["Kiev", "Warsawa", "Praha"] },
  { q: "Ibu kota negara Belanda adalah...?", a: "Amsterdam", w: ["Brussels", "Berlin", "Paris"] },
  { q: "Ibu kota negara Turki adalah...?", a: "Ankara", w: ["Istanbul", "Kairo", "Athena"] },
  { q: "Ibu kota negara Arab Saudi adalah...?", a: "Riyadh", w: ["Mekkah", "Madinah", "Jeddah"] },
  { q: "Ibu kota negara Yunani adalah...?", a: "Athena", w: ["Roma", "Madrid", "Ankara"] },
  { q: "Ibu kota negara Meksiko adalah...?", a: "Mexico City", w: ["Bogota", "Lima", "Santiago"] },
  { q: "Ibu kota negara Argentina adalah...?", a: "Buenos Aires", w: ["Brasilia", "Santiago", "Lima"] },
  { q: "Ibu kota negara Selandia Baru adalah...?", a: "Wellington", w: ["Canberra", "Sydney", "Auckland"] },
  { q: "Ibu kota negara Swiss adalah...?", a: "Bern", w: ["Zurich", "Geneva", "Basel"] },
  { q: "Ibu kota negara Portugal adalah...?", a: "Lisbon", w: ["Madrid", "Paris", "Roma"] }
];

const internationalOrganizations: FactItem[] = [
  { q: "Organisasi internasional yang beranggotakan hampir semua negara di dunia dan bertujuan menjaga perdamaian adalah...?", a: "PBB (Perserikatan Bangsa-Bangsa)", w: ["ASEAN", "WHO", "FIFA"] },
  { q: "Organisasi kesehatan dunia yang menangani isu kesehatan global disebut...?", a: "WHO (World Health Organization)", w: ["PBB", "ASEAN", "FIFA"] },
  { q: "Organisasi yang mengatur kompetisi sepak bola dunia adalah...?", a: "FIFA", w: ["PBB", "WHO", "ASEAN"] },
  { q: "Organisasi yang menangani pendidikan, ilmu pengetahuan, dan kebudayaan dunia disebut...?", a: "UNESCO", w: ["WHO", "FIFA", "IMF"] },
  { q: "Organisasi yang membantu anak-anak di seluruh dunia disebut...?", a: "UNICEF", w: ["WHO", "FIFA", "IMF"] },
  { q: "Markas besar PBB terletak di kota...?", a: "New York, Amerika Serikat", w: ["London, Inggris", "Paris, Prancis", "Tokyo, Jepang"] },
  { q: "Organisasi kerja sama ekonomi negara-negara di dunia yang berkaitan dengan keuangan global disebut...?", a: "IMF (International Monetary Fund)", w: ["WHO", "FIFA", "UNESCO"] },
  { q: "Indonesia menjadi salah satu negara pendiri organisasi...?", a: "ASEAN", w: ["Uni Eropa", "NATO", "G7"] },
  { q: "Organisasi olahraga dunia yang menyelenggarakan Olimpiade disebut...?", a: "IOC (International Olympic Committee)", w: ["FIFA", "WHO", "UNESCO"] },
  { q: "Palang Merah Internasional bertugas membantu korban...?", a: "Bencana dan perang", w: ["Kompetisi olahraga", "Perdagangan internasional", "Pendidikan formal"] },
  { q: "Organisasi negara-negara pengekspor minyak disebut...?", a: "OPEC", w: ["ASEAN", "WHO", "UNESCO"] },
  { q: "Uni Eropa adalah organisasi kerja sama negara-negara di benua...?", a: "Eropa", w: ["Asia", "Afrika", "Amerika"] },
  { q: "PBB memiliki lambang berupa...?", a: "Peta dunia dikelilingi ranting zaitun", w: ["Bendera merah putih", "Bintang lima", "Garuda"] },
  { q: "Hari PBB diperingati setiap tanggal...?", a: "24 Oktober", w: ["17 Agustus", "1 Januari", "10 Desember"] },
  { q: "Organisasi yang mengurus perdagangan bebas antar negara di dunia disebut...?", a: "WTO (World Trade Organization)", w: ["WHO", "FIFA", "UNESCO"] },
  { q: "Organisasi pertahanan negara-negara Barat yang beranggotakan Amerika Serikat dan negara Eropa disebut...?", a: "NATO", w: ["ASEAN", "PBB", "WHO"] },
  { q: "Kelompok negara dengan ekonomi maju yang sering mengadakan pertemuan tahunan disebut...?", a: "G7 atau G20", w: ["ASEAN", "NATO", "WHO"] },
  { q: "Organisasi yang menangani isu pengungsi dan pencari suaka di seluruh dunia disebut...?", a: "UNHCR", w: ["WHO", "FIFA", "IMF"] },
  { q: "Dewan Keamanan PBB memiliki tugas utama menjaga...?", a: "Perdamaian dan keamanan dunia", w: ["Kompetisi olahraga dunia", "Perdagangan saja", "Pendidikan saja"] },
  { q: "Sekretaris Jenderal PBB adalah jabatan pemimpin tertinggi di organisasi...?", a: "PBB", w: ["ASEAN", "FIFA", "WHO"] }
];

const worldWonders: FactItem[] = [
  { q: "Menara terkenal yang menjadi ikon negara Prancis adalah...?", a: "Menara Eiffel", w: ["Menara Pisa", "Big Ben", "Menara Petronas"] },
  { q: "Bangunan bersejarah di India yang terbuat dari marmer putih adalah...?", a: "Taj Mahal", w: ["Piramida", "Colosseum", "Tembok Besar"] },
  { q: "Tembok yang sangat panjang di Tiongkok dan terlihat dari luar angkasa adalah...?", a: "Tembok Besar Tiongkok (Great Wall)", w: ["Taj Mahal", "Piramida", "Colosseum"] },
  { q: "Bangunan piramida yang terkenal di dunia terletak di negara...?", a: "Mesir", w: ["India", "Tiongkok", "Italia"] },
  { q: "Arena pertunjukan gladiator zaman Romawi kuno yang terkenal adalah...?", a: "Colosseum", w: ["Piramida", "Taj Mahal", "Menara Eiffel"] },
  { q: "Patung Liberty yang terkenal terletak di negara...?", a: "Amerika Serikat", w: ["Inggris", "Prancis", "Jerman"] },
  { q: "Menara jam terkenal di London, Inggris disebut...?", a: "Big Ben", w: ["Menara Eiffel", "Menara Pisa", "Menara Petronas"] },
  { q: "Menara yang terkenal karena kemiringannya terletak di negara...?", a: "Italia (Menara Pisa)", w: ["Prancis", "Inggris", "Jerman"] },
  { q: "Reruntuhan kota kuno suku Inca yang terkenal terletak di negara...?", a: "Peru (Machu Picchu)", w: ["Mesir", "India", "Tiongkok"] },
  { q: "Patung Kristus Penebus (Christ the Redeemer) yang terkenal terletak di negara...?", a: "Brazil", w: ["Argentina", "Meksiko", "Chile"] },
  { q: "Candi Buddha terbesar di dunia yang terletak di Indonesia adalah...?", a: "Candi Borobudur", w: ["Candi Prambanan", "Taj Mahal", "Angkor Wat"] },
  { q: "Kompleks candi Hindu terbesar di dunia yang terletak di Kamboja adalah...?", a: "Angkor Wat", w: ["Candi Borobudur", "Taj Mahal", "Piramida"] },
  { q: "Menara kembar tertinggi yang menjadi ikon negara Malaysia adalah...?", a: "Menara Petronas", w: ["Menara Eiffel", "Big Ben", "Menara Pisa"] },
  { q: "Air terjun yang sangat besar dan menjadi perbatasan antara Amerika Serikat dan Kanada adalah...?", a: "Air Terjun Niagara", w: ["Air Terjun Victoria", "Air Terjun Angel", "Air Terjun Iguazu"] },
  { q: "Gunung tertinggi di dunia yang terletak di perbatasan Nepal dan Tiongkok adalah...?", a: "Gunung Everest", w: ["Gunung Fuji", "Gunung Kilimanjaro", "Gunung Rinjani"] },
  { q: "Gunung berapi yang menjadi ikon negara Jepang adalah...?", a: "Gunung Fuji", w: ["Gunung Everest", "Gunung Kilimanjaro", "Gunung Rinjani"] },
  { q: "Bangunan bersejarah berbentuk stadion besar di Roma yang digunakan untuk pertarungan gladiator disebut...?", a: "Colosseum", w: ["Piramida", "Taj Mahal", "Menara Eiffel"] },
  { q: "Kota terapung yang terkenal dengan kanal-kanalnya di Italia adalah...?", a: "Venesia", w: ["Roma", "Milan", "Florence"] },
  { q: "Gurun pasir terbesar di dunia yang terletak di Afrika adalah...?", a: "Gurun Sahara", w: ["Gurun Gobi", "Gurun Kalahari", "Gurun Arab"] }
];

const worldCurrencies: FactItem[] = [
  { q: "Mata uang negara Amerika Serikat adalah...?", a: "Dollar", w: ["Euro", "Yen", "Pound"] },
  { q: "Mata uang negara-negara Uni Eropa umumnya adalah...?", a: "Euro", w: ["Dollar", "Yen", "Pound"] },
  { q: "Mata uang negara Jepang adalah...?", a: "Yen", w: ["Dollar", "Euro", "Won"] },
  { q: "Mata uang negara Inggris adalah...?", a: "Pound Sterling", w: ["Dollar", "Euro", "Yen"] },
  { q: "Mata uang negara Korea Selatan adalah...?", a: "Won", w: ["Yen", "Dollar", "Euro"] },
  { q: "Mata uang negara Tiongkok adalah...?", a: "Yuan / Renminbi", w: ["Yen", "Won", "Dollar"] },
  { q: "Mata uang negara India adalah...?", a: "Rupee", w: ["Rupiah", "Ringgit", "Baht"] },
  { q: "Mata uang negara Arab Saudi adalah...?", a: "Riyal", w: ["Dinar", "Dirham", "Rupee"] },
  { q: "Mata uang negara Australia adalah...?", a: "Dollar Australia", w: ["Pound", "Euro", "Yen"] },
  { q: "Mata uang negara Rusia adalah...?", a: "Rubel", w: ["Dollar", "Euro", "Yen"] },
  { q: "Mata uang negara Swiss adalah...?", a: "Franc Swiss", w: ["Euro", "Dollar", "Pound"] },
  { q: "Mata uang negara Brazil adalah...?", a: "Real", w: ["Peso", "Dollar", "Euro"] },
  { q: "Mata uang negara Mesir adalah...?", a: "Pound Mesir", w: ["Dinar", "Riyal", "Dirham"] },
  { q: "Mata uang yang digunakan di banyak negara sebagai standar perdagangan internasional adalah...?", a: "Dollar Amerika Serikat", w: ["Rupiah", "Ringgit", "Baht"] },
  { q: "Nilai tukar mata uang antar negara dapat berubah setiap hari, hal ini disebut...?", a: "Kurs", w: ["Bunga bank", "Pajak", "Investasi"] },
  { q: "Uang yang digunakan untuk berbelanja saat berlibur ke negara lain biasanya perlu ditukar melalui...?", a: "Money changer atau bank", w: ["Toko kelontong", "Sekolah", "Kantor pos"] },
  { q: "Mata uang negara Uni Emirat Arab adalah...?", a: "Dirham", w: ["Riyal", "Dinar", "Rupee"] },
  { q: "Mata uang negara Kuwait adalah...?", a: "Dinar Kuwait", w: ["Riyal", "Dirham", "Rupee"] },
  { q: "Simbol mata uang Dollar Amerika Serikat adalah...?", a: "$", w: ["€", "¥", "£"] },
  { q: "Simbol mata uang Euro adalah...?", a: "€", w: ["$", "¥", "£"] }
];

const modernTechnology: FactItem[] = [
  { q: "Alat elektronik yang digunakan untuk mengakses internet dan menyimpan data disebut...?", a: "Komputer", w: ["Kompor", "Kulkas", "Setrika"] },
  { q: "Jaringan global yang menghubungkan komputer di seluruh dunia disebut...?", a: "Internet", w: ["Telepon rumah", "Radio", "Televisi"] },
  { q: "Alat komunikasi genggam yang bisa digunakan untuk menelepon dan mengakses internet disebut...?", a: "Smartphone / Handphone", w: ["Radio", "Televisi", "Kalkulator"] },
  { q: "Perangkat lunak yang digunakan untuk menjalankan tugas tertentu di komputer disebut...?", a: "Aplikasi / Software", w: ["Hardware saja", "Kabel", "Baterai"] },
  { q: "Robot adalah mesin yang dapat diprogram untuk melakukan tugas secara...?", a: "Otomatis", w: ["Manual selalu", "Acak tanpa aturan", "Tidak bisa bekerja sama sekali"] },
  { q: "Kecerdasan buatan yang meniru cara berpikir manusia disebut...?", a: "AI (Artificial Intelligence)", w: ["Internet", "Software biasa", "Hardware"] },
  { q: "Alat yang digunakan untuk mencetak dokumen dari komputer disebut...?", a: "Printer", w: ["Scanner", "Speaker", "Mouse"] },
  { q: "Alat yang digunakan untuk memindai dokumen fisik menjadi file digital disebut...?", a: "Scanner", w: ["Printer", "Speaker", "Mouse"] },
  { q: "Media sosial digunakan untuk...?", a: "Berkomunikasi dan berbagi informasi secara online", w: ["Memasak makanan", "Membersihkan rumah", "Mengukur suhu"] },
  { q: "Email adalah singkatan dari...?", a: "Electronic Mail", w: ["Electric Machine", "Easy Mail", "Emergency Mail"] },
  { q: "Kendaraan listrik menggunakan sumber energi berupa...?", a: "Baterai listrik", w: ["Bensin", "Solar", "Uap air"] },
  { q: "Panel surya mengubah energi matahari menjadi energi...?", a: "Listrik", w: ["Panas saja", "Bunyi", "Kimia"] },
  { q: "Satelit digunakan untuk membantu teknologi seperti GPS dan...?", a: "Komunikasi jarak jauh", w: ["Memasak makanan", "Mencuci pakaian", "Mengepel lantai"] },
  { q: "GPS adalah teknologi yang digunakan untuk...?", a: "Menentukan lokasi", w: ["Memasak makanan", "Mendengarkan musik", "Mencuci baju"] },
  { q: "Data pribadi di internet sebaiknya dijaga kerahasiaannya untuk mencegah...?", a: "Penyalahgunaan data", w: ["Internet menjadi lambat", "Baterai cepat habis", "Layar menjadi pecah"] },
  { q: "Sebelum membagikan informasi di internet, sebaiknya kita memastikan informasi tersebut...?", a: "Benar dan dapat dipercaya", w: ["Menarik saja tanpa dicek", "Viral saja", "Singkat saja"] }
];

  return [
    ...buildFromFacts(worldCapitals, "PU_SD5", "SD Kelas 5", "Pengetahuan Umum", 0),
    ...buildFromFacts(internationalOrganizations, "PU_SD5", "SD Kelas 5", "Pengetahuan Umum", 25),
    ...buildFromFacts(worldWonders, "PU_SD5", "SD Kelas 5", "Pengetahuan Umum", 45),
    ...buildFromFacts(worldCurrencies, "PU_SD5", "SD Kelas 5", "Pengetahuan Umum", 64),
    ...buildFromFacts(modernTechnology, "PU_SD5", "SD Kelas 5", "Pengetahuan Umum", 84)
  ];
}

// Generate Pengetahuan Umum SD Kelas 6 (12 tahun) — 100 questions
// Scope: world history basics, climate/environment, human rights & democracy,
// basic economics, digital literacy.
function generateGeneralKnowledgeSD6(): Question[] {
const worldHistoryBasics: FactItem[] = [
  { q: "Perang besar yang melibatkan banyak negara di dunia pada awal abad ke-20 disebut...?", a: "Perang Dunia I", w: ["Perang Dunia II", "Perang Dingin", "Perang Salib"] },
  { q: "Perang besar kedua yang melibatkan banyak negara pada pertengahan abad ke-20 disebut...?", a: "Perang Dunia II", w: ["Perang Dunia I", "Perang Dingin", "Perang Saudara"] },
  { q: "Perang Dunia II berakhir pada tahun...?", a: "1945", w: ["1918", "1939", "1950"] },
  { q: "Periode ketegangan politik antara Amerika Serikat dan Uni Soviet setelah Perang Dunia II disebut...?", a: "Perang Dingin", w: ["Perang Dunia I", "Perang Dunia II", "Perang Salib"] },
  { q: "Tembok yang memisahkan Berlin Timur dan Barat selama Perang Dingin disebut...?", a: "Tembok Berlin", w: ["Tembok Besar Tiongkok", "Tembok Yerusalem", "Tembok Meksiko"] },
  { q: "Peristiwa runtuhnya Tembok Berlin terjadi pada tahun...?", a: "1989", w: ["1945", "1969", "2000"] },
  { q: "Revolusi Industri yang mengubah cara kerja manusia dengan mesin dimulai di negara...?", a: "Inggris", w: ["Amerika Serikat", "Prancis", "Jerman"] },
  { q: "Peradaban kuno yang terkenal dengan piramida dan sungai Nil berada di negara...?", a: "Mesir", w: ["India", "Tiongkok", "Yunani"] },
  { q: "Peradaban kuno Yunani terkenal dengan pemikiran filsafat dan...?", a: "Demokrasi", w: ["Kerajaan absolut", "Perbudakan total", "Anarki"] },
  { q: "Kekaisaran besar yang pernah menguasai sebagian besar Eropa dan berpusat di Italia disebut...?", a: "Kekaisaran Romawi", w: ["Kekaisaran Yunani", "Kekaisaran Mesir", "Kekaisaran Persia"] },
  { q: "Jalur perdagangan kuno yang menghubungkan Tiongkok dengan Eropa disebut...?", a: "Jalur Sutra", w: ["Jalur Rempah", "Jalur Emas", "Jalur Garam"] },
  { q: "Penjelajah yang dikenal menemukan benua Amerika pada tahun 1492 adalah...?", a: "Christopher Columbus", w: ["Vasco da Gama", "Ferdinand Magellan", "James Cook"] },
  { q: "Penjelajah yang pertama kali berhasil mengelilingi dunia melalui pelayaran adalah ekspedisi...?", a: "Ferdinand Magellan", w: ["Christopher Columbus", "Vasco da Gama", "James Cook"] },
  { q: "Revolusi Prancis yang menumbangkan sistem kerajaan absolut terjadi pada tahun...?", a: "1789", w: ["1689", "1889", "1945"] },
  { q: "Organisasi PBB dibentuk setelah berakhirnya...?", a: "Perang Dunia II", w: ["Perang Dunia I", "Perang Dingin", "Perang Salib"] },
  { q: "Peradaban kuno Mesopotamia berkembang di sekitar sungai...?", a: "Eufrat dan Tigris", w: ["Nil", "Amazon", "Gangga"] },
  { q: "Peradaban kuno di India berkembang di sekitar sungai...?", a: "Sungai Gangga dan Indus", w: ["Sungai Nil", "Sungai Amazon", "Sungai Eufrat"] },
  { q: "Jalur rempah kuno menjadi salah satu alasan bangsa Eropa datang ke wilayah...?", a: "Nusantara (Indonesia)", w: ["Amerika Utara", "Australia", "Antartika"] },
  { q: "Zaman ketika manusia mulai membuat alat dari batu disebut zaman...?", a: "Batu", w: ["Logam", "Modern", "Digital"] },
  { q: "Piagam PBB ditandatangani pertama kali pada tahun...?", a: "1945", w: ["1918", "1939", "1967"] }
];

const climateEnvironment: FactItem[] = [
  { q: "Peningkatan suhu rata-rata bumi akibat gas rumah kaca disebut...?", a: "Pemanasan Global (Global Warming)", w: ["Pendinginan Global", "Gerhana Matahari", "Gempa Bumi"] },
  { q: "Gas yang menjadi penyebab utama efek rumah kaca adalah...?", a: "Karbon Dioksida (CO2)", w: ["Oksigen", "Nitrogen", "Hidrogen"] },
  { q: "Efek rumah kaca terjadi karena gas tertentu menahan panas matahari di dalam...?", a: "Atmosfer bumi", w: ["Inti bumi", "Lautan saja", "Kutub saja"] },
  { q: "Mencairnya es di kutub akibat pemanasan global dapat menyebabkan...?", a: "Naiknya permukaan air laut", w: ["Turunnya permukaan air laut", "Bertambahnya lahan daratan", "Cuaca menjadi lebih dingin"] },
  { q: "Salah satu cara mengurangi pemanasan global adalah dengan...?", a: "Menanam pohon dan mengurangi emisi karbon", w: ["Menebang hutan", "Membakar sampah sembarangan", "Menggunakan kendaraan bermotor sebanyak-banyaknya"] },
  { q: "Perubahan iklim dapat menyebabkan cuaca ekstrem seperti...?", a: "Banjir dan kekeringan yang lebih sering", w: ["Cuaca selalu stabil", "Tidak ada perubahan sama sekali", "Suhu selalu sejuk"] },
  { q: "Energi terbarukan seperti tenaga surya dan angin membantu mengurangi penggunaan...?", a: "Bahan bakar fosil", w: ["Air bersih", "Sinar matahari", "Udara"] },
  { q: "Deforestasi atau penggundulan hutan dapat menyebabkan...?", a: "Berkurangnya penyerapan karbon dioksida", w: ["Bertambahnya oksigen secara drastis", "Cuaca menjadi lebih sejuk", "Tidak ada dampak sama sekali"] },
  { q: "Sampah plastik yang dibuang ke laut dapat membahayakan...?", a: "Kehidupan biota laut", w: ["Tidak ada dampak", "Membuat laut lebih bersih", "Menambah jumlah ikan"] },
  { q: "Kegiatan daur ulang sampah bertujuan untuk...?", a: "Mengurangi jumlah sampah dan menjaga lingkungan", w: ["Menambah polusi", "Merusak lingkungan", "Menghabiskan sumber daya"] },
  { q: "Polusi udara di kota besar sebagian besar disebabkan oleh...?", a: "Asap kendaraan bermotor dan pabrik", w: ["Sinar matahari", "Angin sepoi-sepoi", "Hujan"] },
  { q: "Konservasi hutan penting untuk menjaga keberlangsungan hidup...?", a: "Flora dan fauna", w: ["Bangunan kota", "Kendaraan bermotor", "Pabrik industri"] },
  { q: "Hari Bumi diperingati untuk mengingatkan pentingnya...?", a: "Menjaga kelestarian lingkungan", w: ["Merayakan teknologi baru", "Memperingati perang", "Merayakan olahraga"] },
  { q: "Salah satu dampak buruk dari sampah plastik adalah membutuhkan waktu sangat lama untuk...?", a: "Terurai secara alami", w: ["Menghasilkan energi", "Menjadi pupuk", "Menjadi air bersih"] },
  { q: "Gerakan mengurangi penggunaan plastik sekali pakai bertujuan untuk...?", a: "Mengurangi sampah plastik di lingkungan", w: ["Menambah produksi plastik", "Mempercepat pemanasan global", "Merusak hutan"] },
  { q: "Prinsip 3R dalam menjaga lingkungan adalah Reduce, Reuse, dan...?", a: "Recycle", w: ["Remove", "Repeat", "Replace"] },
  { q: "Reduce dalam prinsip 3R berarti...?", a: "Mengurangi penggunaan barang", w: ["Menggunakan kembali barang", "Mendaur ulang barang", "Membuang barang"] },
  { q: "Reuse dalam prinsip 3R berarti...?", a: "Menggunakan kembali barang", w: ["Mengurangi penggunaan", "Mendaur ulang", "Membuang barang"] },
  { q: "Recycle dalam prinsip 3R berarti...?", a: "Mendaur ulang barang menjadi sesuatu yang baru", w: ["Mengurangi penggunaan", "Menggunakan kembali", "Membuang barang"] },
  { q: "Menanam pohon di lingkungan sekitar rumah membantu menyerap gas...?", a: "Karbon dioksida", w: ["Oksigen murni", "Nitrogen", "Hidrogen"] }
];

const humanRightsDemocracy: FactItem[] = [
  { q: "Hak yang dimiliki setiap manusia sejak lahir dan tidak bisa diambil oleh siapapun disebut...?", a: "Hak Asasi Manusia (HAM)", w: ["Hak istimewa", "Hak warisan", "Hak sementara"] },
  { q: "Contoh hak asasi manusia adalah hak untuk...?", a: "Hidup, mendapat pendidikan, dan bebas berpendapat", w: ["Melanggar hukum", "Mengambil hak orang lain", "Merusak lingkungan"] },
  { q: "Sistem pemerintahan yang melibatkan rakyat dalam pengambilan keputusan melalui pemilu disebut...?", a: "Demokrasi", w: ["Monarki absolut", "Diktator", "Anarki"] },
  { q: "Dalam demokrasi, keputusan penting sebaiknya diambil melalui...?", a: "Musyawarah atau pemungutan suara", w: ["Paksaan satu orang", "Kekerasan", "Undian tanpa diskusi"] },
  { q: "Setiap warga negara memiliki hak yang sama di depan...?", a: "Hukum", w: ["Hanya sebagian orang", "Pejabat saja", "Orang kaya saja"] },
  { q: "Diskriminasi berdasarkan suku, agama, ras, dan golongan bertentangan dengan prinsip...?", a: "Hak asasi manusia dan persatuan", w: ["Kemajuan teknologi", "Perdagangan bebas", "Olahraga"] },
  { q: "Kebebasan berpendapat harus tetap disertai dengan sikap...?", a: "Bertanggung jawab dan menghormati orang lain", w: ["Tanpa batas sama sekali", "Menghina orang lain", "Menyebarkan kebohongan"] },
  { q: "Hak untuk mendapatkan pendidikan yang layak adalah bagian dari...?", a: "Hak asasi manusia", w: ["Hak istimewa golongan tertentu", "Hadiah dari pemerintah", "Hal yang tidak penting"] },
  { q: "Pemilu yang jujur dan adil merupakan ciri penting dari sistem...?", a: "Demokrasi", w: ["Monarki absolut", "Diktator", "Kolonialisme"] },
  { q: "Setiap orang berhak mendapatkan perlakuan yang sama tanpa memandang...?", a: "Jenis kelamin, suku, atau agama", w: ["Kekayaan semata", "Jabatan semata", "Popularitas semata"] },
  { q: "Lembaga yang membela hak-hak anak di Indonesia disebut...?", a: "KPAI (Komisi Perlindungan Anak Indonesia)", w: ["DPR", "TNI", "Bank Indonesia"] },
  { q: "Perbudakan dan kerja paksa merupakan pelanggaran terhadap...?", a: "Hak asasi manusia", w: ["Peraturan lalu lintas", "Aturan sekolah semata", "Tidak melanggar apapun"] },
  { q: "Kesetaraan gender berarti memberikan kesempatan yang sama bagi...?", a: "Laki-laki dan perempuan", w: ["Hanya laki-laki", "Hanya perempuan", "Hanya orang dewasa"] },
  { q: "Hak untuk mengeluarkan pendapat di muka umum dijamin oleh...?", a: "Undang-undang", w: ["Tidak ada aturan sama sekali", "Hanya untuk pejabat", "Hanya untuk orang kaya"] },
  { q: "Musyawarah untuk mufakat adalah nilai penting dalam sila keberapa Pancasila?", a: "Sila keempat", w: ["Sila pertama", "Sila kedua", "Sila kelima"] },
  { q: "Hak untuk memeluk agama dan beribadah sesuai keyakinan dijamin oleh sila...?", a: "Sila pertama Pancasila", w: ["Sila kedua", "Sila ketiga", "Sila keempat"] },
  { q: "Keadilan sosial bagi seluruh rakyat Indonesia terdapat dalam sila...?", a: "Sila kelima Pancasila", w: ["Sila pertama", "Sila kedua", "Sila ketiga"] },
  { q: "Persatuan Indonesia terdapat dalam sila...?", a: "Sila ketiga Pancasila", w: ["Sila pertama", "Sila kedua", "Sila kelima"] },
  { q: "Menghormati hak orang lain untuk berpendapat berbeda menunjukkan sikap...?", a: "Demokratis dan toleran", w: ["Otoriter", "Diskriminatif", "Egois"] },
  { q: "Setiap anak berhak mendapatkan perlindungan dari kekerasan dan eksploitasi sesuai dengan...?", a: "Hak asasi anak", w: ["Aturan sekolah semata", "Kebijakan orang tua semata", "Tidak ada perlindungan khusus"] }
];

const basicEconomics: FactItem[] = [
  { q: "Kebutuhan yang harus dipenuhi agar manusia bisa bertahan hidup, seperti makanan dan tempat tinggal, disebut kebutuhan...?", a: "Primer", w: ["Sekunder", "Tersier", "Mewah"] },
  { q: "Kebutuhan tambahan yang meningkatkan kenyamanan hidup, seperti sepeda motor, disebut kebutuhan...?", a: "Sekunder", w: ["Primer", "Tersier", "Pokok"] },
  { q: "Kebutuhan akan barang mewah seperti perhiasan atau mobil mewah disebut kebutuhan...?", a: "Tersier", w: ["Primer", "Sekunder", "Pokok"] },
  { q: "Kegiatan menghasilkan barang atau jasa disebut kegiatan...?", a: "Produksi", w: ["Konsumsi", "Distribusi", "Tabungan"] },
  { q: "Kegiatan menyalurkan barang dari produsen ke konsumen disebut kegiatan...?", a: "Distribusi", w: ["Produksi", "Konsumsi", "Investasi"] },
  { q: "Kegiatan menggunakan atau menghabiskan barang dan jasa disebut kegiatan...?", a: "Konsumsi", w: ["Produksi", "Distribusi", "Tabungan"] },
  { q: "Tempat bertemunya penjual dan pembeli untuk melakukan transaksi disebut...?", a: "Pasar", w: ["Sekolah", "Kantor Pos", "Rumah Sakit"] },
  { q: "Harga suatu barang biasanya ditentukan oleh keseimbangan antara permintaan dan...?", a: "Penawaran", w: ["Produksi saja", "Distribusi saja", "Konsumsi saja"] },
  { q: "Uang berfungsi sebagai alat...?", a: "Tukar dalam kegiatan jual beli", w: ["Hiasan rumah", "Mainan anak", "Bahan bakar"] },
  { q: "Kegiatan menabung penting untuk mempersiapkan kebutuhan di masa...?", a: "Depan", w: ["Lalu", "Sekarang saja", "Tidak penting"] },
  { q: "Perusahaan yang memproduksi barang untuk dijual disebut...?", a: "Produsen", w: ["Konsumen", "Distributor saja", "Pengangguran"] },
  { q: "Orang yang membeli dan menggunakan barang atau jasa disebut...?", a: "Konsumen", w: ["Produsen", "Distributor", "Kreditor"] },
  { q: "Kegiatan ekonomi yang melibatkan pertukaran barang dengan negara lain disebut...?", a: "Perdagangan Internasional / Ekspor-Impor", w: ["Konsumsi lokal", "Produksi rumahan", "Tabungan pribadi"] },
  { q: "Kegiatan menjual barang ke luar negeri disebut...?", a: "Ekspor", w: ["Impor", "Konsumsi", "Distribusi"] },
  { q: "Kegiatan membeli barang dari luar negeri disebut...?", a: "Impor", w: ["Ekspor", "Konsumsi", "Distribusi"] },
  { q: "Modal usaha yang dibutuhkan untuk memulai bisnis bisa berasal dari tabungan atau...?", a: "Pinjaman", w: ["Hadiah tanpa syarat", "Undian", "Warisan semata"] },
  { q: "Kewirausahaan adalah kegiatan menciptakan dan mengelola usaha untuk mendapatkan...?", a: "Keuntungan", w: ["Kerugian", "Hutang", "Pajak"] },
  { q: "Bank berfungsi membantu masyarakat dalam kegiatan menabung dan...?", a: "Meminjam uang", w: ["Membeli baju", "Bermain", "Belajar"] },
  { q: "Inflasi adalah keadaan ketika harga barang secara umum mengalami...?", a: "Kenaikan terus-menerus", w: ["Penurunan terus-menerus", "Tidak berubah sama sekali", "Menjadi gratis"] },
  { q: "Anggaran adalah rencana keuangan yang membantu kita mengatur...?", a: "Pemasukan dan pengeluaran", w: ["Warna baju", "Jadwal tidur", "Menu makanan saja"] }
];

const digitalLiteracy: FactItem[] = [
  { q: "Kemampuan menggunakan teknologi digital secara bijak dan bertanggung jawab disebut...?", a: "Literasi Digital", w: ["Literasi Baca", "Literasi Angka", "Literasi Seni"] },
  { q: "Berita atau informasi palsu yang disebarkan di internet disebut...?", a: "Hoaks", w: ["Fakta", "Berita resmi", "Data valid"] },
  { q: "Sebelum mempercayai sebuah berita di internet, sebaiknya kita...?", a: "Memeriksa kebenarannya dari sumber terpercaya", w: ["Langsung mempercayainya", "Langsung membagikannya", "Mengabaikan sumbernya"] },
  { q: "Perundungan yang dilakukan melalui media sosial atau internet disebut...?", a: "Cyberbullying", w: ["Cyber Security", "Digital Marketing", "Online Learning"] },
  { q: "Jika mengalami perundungan di internet, sebaiknya kita...?", a: "Melapor kepada orang dewasa yang dipercaya", w: ["Membalas dengan kata kasar", "Diam dan menyimpannya sendiri", "Menyebarkannya lebih luas"] },
  { q: "Kata sandi (password) sebaiknya dijaga kerahasiaannya agar akun kita tidak...?", a: "Diretas atau disalahgunakan", w: ["Menjadi lebih cepat", "Menjadi lebih aman otomatis", "Terhapus otomatis"] },
  { q: "Membagikan alamat rumah atau nomor telepon secara sembarangan di internet dapat membahayakan...?", a: "Privasi dan keamanan diri", w: ["Kecepatan internet", "Baterai gawai", "Warna layar"] },
  { q: "Etika berkomunikasi yang baik di dunia maya disebut...?", a: "Netiket / Netiquette", w: ["Hoaks", "Phishing", "Spam"] },
  { q: "Penipuan online yang mencoba mencuri data pribadi melalui tautan palsu disebut...?", a: "Phishing", w: ["Netiket", "Hoaks saja", "Backup"] },
  { q: "Menyalin karya orang lain tanpa izin dan mengakuinya sebagai karya sendiri disebut...?", a: "Plagiarisme", w: ["Kolaborasi", "Referensi", "Kutipan resmi"] },
  { q: "Sebelum mengunggah foto atau video pribadi ke internet, sebaiknya kita...?", a: "Memikirkan dampaknya terlebih dahulu", w: ["Langsung mengunggahnya tanpa berpikir", "Membagikannya ke semua orang asing", "Tidak perlu berhati-hati"] },
  { q: "Waktu penggunaan gawai yang terlalu lama dapat berdampak buruk bagi...?", a: "Kesehatan mata dan pola tidur", w: ["Kecepatan internet", "Warna gawai", "Umur gawai saja"] },
  { q: "Aplikasi pembelajaran daring membantu siswa untuk...?", a: "Belajar secara fleksibel melalui internet", w: ["Bermain game saja", "Menonton film saja", "Berbelanja saja"] },
  { q: "Mencadangkan data penting secara berkala disebut...?", a: "Backup", w: ["Hoaks", "Phishing", "Plagiarisme"] },
  { q: "Menggunakan internet secara sehat berarti membagi waktu antara belajar, bermain, dan...?", a: "Istirahat yang cukup", w: ["Bermain gawai sepanjang hari", "Mengabaikan sekolah", "Tidak perlu istirahat"] },
  { q: "Perangkat lunak jahat yang dapat merusak komputer disebut...?", a: "Virus / Malware", w: ["Aplikasi biasa", "Browser", "Sistem operasi"] },
  { q: "Sebelum mengklik tautan (link) yang mencurigakan, sebaiknya kita...?", a: "Memastikan keamanannya terlebih dahulu", w: ["Langsung mengkliknya", "Membagikannya ke teman", "Mengabaikan risikonya"] },
  { q: "Jejak digital adalah rekaman aktivitas kita di internet yang...?", a: "Dapat bertahan lama dan sulit dihapus sepenuhnya", w: ["Selalu hilang otomatis", "Tidak berpengaruh apapun", "Tidak pernah tercatat"] },
  { q: "Berkomunikasi dengan sopan dan menghargai orang lain saat menggunakan internet menunjukkan sikap...?", a: "Netiket yang baik", w: ["Cyberbullying", "Plagiarisme", "Phishing"] },
  { q: "Mengecek ulang sumber sebuah artikel sebelum mempercayainya adalah bagian dari sikap...?", a: "Berpikir kritis terhadap informasi digital", w: ["Mudah percaya tanpa berpikir", "Mengabaikan semua informasi", "Menyebarkan tanpa verifikasi"] }
];

  return [
    ...buildFromFacts(worldHistoryBasics, "PU_SD6", "SD Kelas 6", "Pengetahuan Umum", 0),
    ...buildFromFacts(climateEnvironment, "PU_SD6", "SD Kelas 6", "Pengetahuan Umum", 20),
    ...buildFromFacts(humanRightsDemocracy, "PU_SD6", "SD Kelas 6", "Pengetahuan Umum", 40),
    ...buildFromFacts(basicEconomics, "PU_SD6", "SD Kelas 6", "Pengetahuan Umum", 60),
    ...buildFromFacts(digitalLiteracy, "PU_SD6", "SD Kelas 6", "Pengetahuan Umum", 80)
  ];
}

// Global master database generator
let cachedDatabase: Question[] | null = null;

export function getFullDatabase(): Question[] {
  if (cachedDatabase) return cachedDatabase;
  
  const all: Question[] = [];
  all.push(...generateMathTKA());
  all.push(...generateMathTKB());
  all.push(...generateScienceTKA());
  all.push(...generateScienceTKB());
  all.push(...generateEnglishTKA());
  all.push(...generateEnglishTKB());
  all.push(...generateMathTKAAdvanced());
  all.push(...generateScienceTKAAdvanced());
  all.push(...generateEnglishTKAAdvanced());

  // TK B Advanced for Math, Science, English
  all.push(...generateMathTKBAdvanced());
  all.push(...generateScienceTKBAdvanced());
  all.push(...generateEnglishTKBAdvanced());

  // Pengetahuan Umum across all levels
  all.push(...generateGeneralKnowledgeTKA());
  all.push(...generateGeneralKnowledgeTKAAdvanced());
  all.push(...generateGeneralKnowledgeTKB());
  all.push(...generateGeneralKnowledgeTKBAdvanced());

  // BATCH 2 — Matematika for Preschool 1&2 and SD Kelas 1-6
  all.push(...generateMathPreschool1());
  all.push(...generateMathPreschool2());
  all.push(...generateMathSD1());
  all.push(...generateMathSD2());
  all.push(...generateMathSD3());
  all.push(...generateMathSD4());
  all.push(...generateMathSD5());
  all.push(...generateMathSD6());

  // BATCH 2 — Sains for Preschool 1&2 (SD Kelas 1-6 to follow)
  all.push(...generateSciencePreschool1());
  all.push(...generateSciencePreschool2());
  all.push(...generateScienceSD1());
  all.push(...generateScienceSD2());
  all.push(...generateScienceSD3());
  all.push(...generateScienceSD4());
  all.push(...generateScienceSD5());
  all.push(...generateScienceSD6());
  all.push(...generateEnglishPreschool1());
  all.push(...generateEnglishPreschool2());
  all.push(...generateEnglishSD1());
  all.push(...generateEnglishSD2());
  all.push(...generateEnglishSD3());
  all.push(...generateEnglishSD4());
  all.push(...generateEnglishSD5());
  all.push(...generateEnglishSD6());
  all.push(...generateGeneralKnowledgePreschool1());
  all.push(...generateGeneralKnowledgePreschool2());
  all.push(...generateGeneralKnowledgeSD1());
  all.push(...generateGeneralKnowledgeSD2());
  all.push(...generateGeneralKnowledgeSD3());
  all.push(...generateGeneralKnowledgeSD4());
  all.push(...generateGeneralKnowledgeSD5());
  all.push(...generateGeneralKnowledgeSD6());

  cachedDatabase = all;
  return all;
}

// Result of a session question request. No cross-level or cross-category
// fallback is ever performed: either enough matching questions exist and
// `ok` is true, or it is false and the caller must handle it explicitly.
export interface SessionQuestionsSuccess {
  ok: true;
  questions: Question[];
}

export interface SessionQuestionsFailure {
  ok: false;
  reason: "insufficient_questions";
  level: Level;
  category: Category;
  requested: number;
  available: number;
}

export type SessionQuestionsResult = SessionQuestionsSuccess | SessionQuestionsFailure;

// Number of real questions available for a given level+category, with no padding.
export function getAvailableQuestionCount(level: Level, category: Category): number {
  const db = getFullDatabase();
  return db.filter(q => q.level === level && q.category === category).length;
}

// Levels that actually have at least one question in the database (any category).
// Derived from real data, not a hardcoded list, so it stays correct as content is added.
export function getLevelsWithQuestions(): Level[] {
  const db = getFullDatabase();
  return Array.from(new Set(db.map(q => q.level)));
}

// Get randomized questions for a given level, category, and count.
// STRICT: only returns questions matching the exact requested level and category.
// Never falls back to another level or category. If there are not enough
// matching questions, returns a structured failure instead of a partial
// or contaminated session.
export function getRandomSessionQuestions(level: Level, category: Category, count: number = 20): SessionQuestionsResult {
  const db = getFullDatabase();
  const filtered = db.filter(q => q.level === level && q.category === category);

  if (filtered.length < count) {
    return {
      ok: false,
      reason: "insufficient_questions",
      level,
      category,
      requested: count,
      available: filtered.length,
    };
  }

  // Shuffle the filtered list of questions
  const shuffledQuestions = shuffleArray(filtered);

  // Take requested count of questions (source pool has no duplicate IDs, so
  // slicing a shuffled array can never produce duplicate questions within a session)
  const selected = shuffledQuestions.slice(0, count);

  // Ensure we shuffle options for each selected question
  const questions = selected.map(q => {
    // Deduplicate options just in case, then shuffle them
    const uniqueOptions = Array.from(new Set(q.options));

    // If we have fewer than 4 unique options (should not happen, but safeguard), fill it
    while (uniqueOptions.length < 4) {
      uniqueOptions.push("Pilihan Lain " + uniqueOptions.length);
    }

    // We must ensure the correct answer is in the options
    if (!uniqueOptions.includes(q.answer)) {
      uniqueOptions[0] = q.answer;
    }

    return {
      ...q,
      options: shuffleArray(uniqueOptions)
    };
  });

  return { ok: true, questions };
}
