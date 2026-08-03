/**
 * Ported directly (structure and content unchanged) from the (now-retired)
 * external Learn app's questionBank.ts — ~700+ multiple-choice questions
 * across Matematika, Sains, Bahasa Inggris, and Pengetahuan Umum, for
 * levels TK A / TK A (Advanced) / TK B / TK B (Advanced). Only import
 * paths were adjusted to match this project's module layout.
 *
 * Note: only TK A/B levels have generated content so far — SD Kelas 1-6
 * questions don't exist yet in this bank (see getRandomSessionQuestions'
 * fallback, which widens to any level in the same category rather than
 * returning too few questions).
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

  cachedDatabase = all;
  return all;
}

// Get randomized questions for a given level, category, and count
export function getRandomSessionQuestions(level: Level, category: Category, count: number = 20): Question[] {
  const db = getFullDatabase();
  let filtered = db.filter(q => q.level === level && q.category === category);
  
  // Fallback safeguard if there are fewer than count matching questions
  if (filtered.length < count) {
    const fallbackCategoryQuestions = db.filter(q => q.category === category);
    filtered = [...filtered, ...fallbackCategoryQuestions.filter(q => !filtered.includes(q))];
  }
  
  // Shuffle the filtered list of questions
  const shuffledQuestions = shuffleArray(filtered);
  
  // Take requested count of questions
  const selected = shuffledQuestions.slice(0, count);
  
  // Ensure we shuffle options for each selected question
  return selected.map(q => {
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
}
