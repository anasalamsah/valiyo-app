import type { Category } from "@/types/learnAcademy";

/**
 * Kid-friendly educational image mapper for Olimpiade TK.
 * Maps keywords in questions to high-quality, colorful, high-contrast Unsplash image URLs.
 */

interface ImageMapping {
  keywords: string[];
  url: string;
}

const IMAGE_MAPPINGS: ImageMapping[] = [
  // --- CODING / ROBOTICS / TECHNOLOGY ---
  {
    keywords: ["robot", "kucing robot", "robot Kucing", "mobil robot"],
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80" // Cute Robot
  },
  {
    keywords: ["laptop", "komputer", "layar komputer", "screen", "monitor"],
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" // Laptop / Code
  },
  {
    keywords: ["keyboard", "mengetik", "tombol"],
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80" // Keyboard
  },
  {
    keywords: ["mouse", "panah di layar"],
    url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80" // Computer Mouse
  },
  {
    keywords: ["baterai", "listrik"],
    url: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80" // Battery
  },
  {
    keywords: ["biner", "kode biner", "1, 0, 1", "0, 1"],
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80" // Binary Matrix
  },
  {
    keywords: ["lampu lalu lintas", "lampu merah", "lampu hijau"],
    url: "https://images.unsplash.com/photo-1508873696983-2df515122519?w=600&auto=format&fit=crop&q=80" // Traffic Light
  },
  {
    keywords: ["bug", "debugging", "kesalahan"],
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80" // Code bug / screen
  },
  {
    keywords: ["flowchart", "belah ketupat", "oval"],
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80" // Diagram / Design
  },
  {
    keywords: ["scratch", "block coding", "kode", "program", "programmer"],
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80" // Code Editor
  },
  {
    keywords: ["kamera", "sensor suara", "sensor"],
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80" // Camera Lens
  },
  {
    keywords: ["printer", "speaker"],
    url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80" // Technology output
  },
  {
    keywords: ["internet", "cloud", "awan"],
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" // Internet Cloud
  },
  {
    keywords: ["cpu", "processor", "memori"],
    url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80" // CPU Microchip
  },

  // --- SPECIAL / COMPOUND KEYWORDS (Matched first to prevent wrong generic overrides) ---
  {
    keywords: ["kupu-kupu", "butterfly", "kepompong", "ulat sutra"],
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80" // Butterfly
  },
  {
    keywords: ["berudu", "kecebong", "katak", "kodok", "frog"],
    url: "https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?w=600&auto=format&fit=crop&q=80" // Frog
  },
  {
    keywords: ["pohon kelapa", "coconut tree"],
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" // Coconut/Beach
  },
  {
    keywords: ["pohon pisang", "banana tree"],
    url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80" // Banana
  },
  {
    keywords: ["burung hantu", "owl"],
    url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80" // Owl
  },
  {
    keywords: ["es krim", "ice cream"],
    url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=80" // Ice cream
  },
  {
    keywords: ["papan tulis", "whiteboard", "blackboard"],
    url: "https://images.unsplash.com/photo-1571844307560-f55a3c6f782c?w=600&auto=format&fit=crop&q=80" // Whiteboard
  },
  {
    keywords: ["kue donat", "donat", "donut", "donuts"],
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80" // Donut
  },
  {
    keywords: ["es batu", "air dingin", "dingin", "cold", "ice"],
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80" // Ice/Cold
  },
  {
    keywords: ["truk tronton", "truk", "truck"],
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80" // Truck
  },
  {
    keywords: ["kereta api", "kereta", "train"],
    url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80" // Train
  },
  {
    keywords: ["mobil mainan", "mobil", "car", "sedan"],
    url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80" // Car
  },
  {
    keywords: ["sepeda roda tiga", "roda sepeda", "sepeda", "bicycle", "bike"],
    url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80" // Bike
  },
  {
    keywords: ["lumba-lumba", "paus", "dolphin", "whale"],
    url: "https://images.unsplash.com/photo-1570481662006-a3a13746fe9e?w=600&auto=format&fit=crop&q=80" // Dolphin/Whale
  },
  {
    keywords: ["susu sapi", "susu", "milk"],
    url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80" // Milk
  },
  {
    keywords: ["buku tulis", "buku gambar", "buku", "book", "books"],
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80" // Books
  },
  {
    keywords: ["krayon", "pensil warna", "pensil", "pencil", "pencils"],
    url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80" // Pencil
  },
  {
    keywords: ["sikat gigi", "toothbrush"],
    url: "https://images.unsplash.com/photo-1559591937-e620a2103d8d?w=600&auto=format&fit=crop&q=80" // Toothbrush
  },
  {
    keywords: ["sabun mandi", "sabun", "soap"],
    url: "https://images.unsplash.com/photo-1607006342411-1014f8db40e6?w=600&auto=format&fit=crop&q=80" // Soap
  },
  {
    keywords: ["cacing tanah", "cacing", "worm"],
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80" // Worm
  },
  {
    keywords: ["bintang malam", "bintang jatuh", "bintang", "star", "stars"],
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80" // Stars
  },
  {
    keywords: ["air putih", "air minum", "air laut", "water"],
    url: "https://images.unsplash.com/photo-1548839140-29a88045502c?w=600&auto=format&fit=crop&q=80" // Water
  },

  // --- COLORS (Indonesian / English) ---
  {
    keywords: ["merah", "red"],
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80" // Red splash
  },
  {
    keywords: ["kuning", "yellow"],
    url: "https://images.unsplash.com/photo-1589802829985-817e51161b92?w=600&auto=format&fit=crop&q=80" // Yellow bright splash
  },
  {
    keywords: ["biru", "blue"],
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" // Blue ocean
  },
  {
    keywords: ["hijau", "green"],
    url: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=600&auto=format&fit=crop&q=80" // Green grass
  },
  {
    keywords: ["merah muda", "pink"],
    url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=80" // Pink flowers
  },
  {
    keywords: ["ungu", "purple"],
    url: "https://images.unsplash.com/photo-1518133681498-f2b7d2bf17bf?w=600&auto=format&fit=crop&q=80" // Purple splash
  },
  {
    keywords: ["putih", "white"],
    url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80" // White clouds/paper
  },
  {
    keywords: ["hitam", "black"],
    url: "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=600&auto=format&fit=crop&q=80" // Black kitten
  },
  {
    keywords: ["cokelat", "brown"],
    url: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80" // Brown chocolate
  },
  {
    keywords: ["jingga", "oranye", "orange", "oranges"],
    url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80" // Oranges
  },
  {
    keywords: ["abu-abu", "grey", "gray"],
    url: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=600&auto=format&fit=crop&q=80" // Grey cloud sky
  },

  // --- ANIMALS ---
  {
    keywords: ["kucing", "cat", "kitten"],
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80" // Cat
  },
  {
    keywords: ["anjing", "dog", "puppy"],
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80" // Dog
  },
  {
    keywords: ["kelinci", "rabbit", "bunny"],
    url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80" // Rabbit
  },
  {
    keywords: ["gajah", "elephant"],
    url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80" // Elephant
  },
  {
    keywords: ["jerapah", "giraffe"],
    url: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&auto=format&fit=crop&q=80" // Giraffe
  },
  {
    keywords: ["sapi", "cow"],
    url: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=80" // Cow
  },
  {
    keywords: ["kambing", "goat"],
    url: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=600&auto=format&fit=crop&q=80" // Goat
  },
  {
    keywords: ["bebek", "duck"],
    url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80" // Duck
  },
  {
    keywords: ["ayam", "chicken", "rooster", "hen"],
    url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&fit=crop&q=80" // Chicken
  },
  {
    keywords: ["singa", "lion"],
    url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80" // Lion
  },
  {
    keywords: ["harimau", "tiger"],
    url: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=600&auto=format&fit=crop&q=80" // Tiger
  },
  {
    keywords: ["burung", "bird"],
    url: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&auto=format&fit=crop&q=80" // Bird
  },
  {
    keywords: ["lebah", "bee", "madu"],
    url: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=600&auto=format&fit=crop&q=80" // Bee
  },
  {
    keywords: ["semut", "ant"],
    url: "https://images.unsplash.com/photo-1558543411-c58448805522?w=600&auto=format&fit=crop&q=80" // Ant
  },
  {
    keywords: ["ikan mas", "ikan", "fish"],
    url: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80" // Fish
  },
  {
    keywords: ["monyet", "monkey", "kera"],
    url: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&auto=format&fit=crop&q=80" // Monkey
  },
  {
    keywords: ["siput", "snail", "bekicot"],
    url: "https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=600&auto=format&fit=crop&q=80" // Snail
  },
  {
    keywords: ["ular", "snake"],
    url: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=600&auto=format&fit=crop&q=80" // Snake
  },
  {
    keywords: ["kuda", "horse"],
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80" // Horse
  },
  {
    keywords: ["laba-laba", "spider"],
    url: "https://images.unsplash.com/photo-1524147043132-75ca0607ba9a?w=600&auto=format&fit=crop&q=80" // Spider
  },
  {
    keywords: ["beruang kutub", "bear"],
    url: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&auto=format&fit=crop&q=80" // Polar bear
  },
  {
    keywords: ["unta", "camel"],
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80" // Camel
  },
  {
    keywords: ["kelelawar", "bat"],
    url: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=600&auto=format&fit=crop&q=80" // Bat
  },
  {
    keywords: ["kura-kura", "turtle"],
    url: "https://images.unsplash.com/photo-1518467166-367ae630df2b?w=600&auto=format&fit=crop&q=80" // Turtle
  },
  {
    keywords: ["cicak", "gecko"],
    url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&auto=format&fit=crop&q=80" // Lizard/Gecko
  },
  {
    keywords: ["gurita", "cumi-cumi", "octopus", "squid"],
    url: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=600&auto=format&fit=crop&q=80" // Octopus
  },

  // --- FRUITS & VEGETABLES ---
  {
    keywords: ["pisang", "banana"],
    url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80" // Banana
  },
  {
    keywords: ["apel", "apple"],
    url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80" // Apple
  },
  {
    keywords: ["jeruk", "orange", "lemon"],
    url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80" // Orange
  },
  {
    keywords: ["wortel", "carrot"],
    url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80" // Carrot
  },
  {
    keywords: ["semangka", "watermelon"],
    url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80" // Watermelon
  },
  {
    keywords: ["stroberi", "strawberry"],
    url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80" // Strawberry
  },
  {
    keywords: ["mangga", "mango"],
    url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80" // Mango
  },
  {
    keywords: ["anggur", "grape"],
    url: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80" // Grape
  },
  {
    keywords: ["durian"],
    url: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600&auto=format&fit=crop&q=80" // Durian
  },

  // --- NATURE, WEATHER, SPACE ---
  {
    keywords: ["pelangi", "rainbow"],
    url: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=600&auto=format&fit=crop&q=80" // Rainbow
  },
  {
    keywords: ["bumi", "earth", "planet"],
    url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&auto=format&fit=crop&q=80" // Earth
  },
  {
    keywords: ["matahari", "sun"],
    url: "https://images.unsplash.com/photo-1529430704443-25a775987641?w=600&auto=format&fit=crop&q=80" // Sun
  },
  {
    keywords: ["bulan", "moon"],
    url: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=600&auto=format&fit=crop&q=80" // Moon
  },
  {
    keywords: ["hujan", "rain", "payung", "jas hujan"],
    url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=80" // Rain
  },
  {
    keywords: ["awan", "cloud"],
    url: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=600&auto=format&fit=crop&q=80" // Cloud
  },
  {
    keywords: ["petir", "kilat", "lightning"],
    url: "https://images.unsplash.com/photo-1472120435166-58cf4c23d37e?w=600&auto=format&fit=crop&q=80" // Lightning
  },
  {
    keywords: ["pohon", "hutan", "forest", "tree", "trees"],
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80" // Forest
  },
  {
    keywords: ["rumput", "grass"],
    url: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=600&auto=format&fit=crop&q=80" // Grass
  },
  {
    keywords: ["bunga", "mawar", "melati", "flower", "flowers", "rose"],
    url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=80" // Flowers
  },
  {
    keywords: ["samudra", "laut", "ocean", "sea"],
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&auto=format&fit=crop&q=80" // Ocean
  },
  {
    keywords: ["sungai", "river"],
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80" // River
  },

  // --- KIDS OBJECTS, SWEETS, FOOD ---
  {
    keywords: ["permen", "lollipop", "candy"],
    url: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&auto=format&fit=crop&q=80" // Candy
  },
  {
    keywords: ["cokelat", "chocolate"],
    url: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80" // Chocolate
  },
  {
    keywords: ["balon", "balloon", "balloons"],
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80" // Balloon
  },
  {
    keywords: ["koin", "coin", "uang"],
    url: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&auto=format&fit=crop&q=80" // Coin
  },
  {
    keywords: ["dadu", "dice"],
    url: "https://images.unsplash.com/photo-1563804447971-6e113ab80713?w=600&auto=format&fit=crop&q=80" // Dice
  },
  {
    keywords: ["kue", "biskuit", "roti", "pastry", "bread", "cake", "rice", "nasi", "telur", "egg"],
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80" // Cake/Bread
  },
  {
    keywords: ["tas sekolah", "tas", "bag"],
    url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80" // Bag
  },
  {
    keywords: ["meja", "table"],
    url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80" // Table
  },
  {
    keywords: ["kursi", "chair"],
    url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=80" // Chair
  },
  {
    keywords: ["pintu", "door"],
    url: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=600&auto=format&fit=crop&q=80" // Door
  },
  {
    keywords: ["jendela", "window"],
    url: "https://images.unsplash.com/photo-1503708928676-1cb796a0891a?w=600&auto=format&fit=crop&q=80" // Window
  },
  {
    keywords: ["rumah", "house"],
    url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=80" // House
  },
  {
    keywords: ["sekolah", "school"],
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80" // School
  },
  {
    keywords: ["cermin", "kaca", "mirror", "glass"],
    url: "https://images.unsplash.com/photo-1544605518-e37fae0176b6?w=600&auto=format&fit=crop&q=80" // Mirror/Glass
  },
  {
    keywords: ["lonceng", "bell"],
    url: "https://images.unsplash.com/photo-1520697945084-5f1295b9d5ec?w=600&auto=format&fit=crop&q=80" // Bell
  },
  {
    keywords: ["boneka", "doll"],
    url: "https://images.unsplash.com/photo-1559251606-c623743a6d76?w=600&auto=format&fit=crop&q=80" // Doll
  },
  {
    keywords: ["magnet"],
    url: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=600&auto=format&fit=crop&q=80" // Magnet
  },
  {
    keywords: ["kompas"],
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80" // Compass
  },
  {
    keywords: ["kincir angin", "kincir", "windmill"],
    url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop&q=80" // Windmill
  },
  {
    keywords: ["tempat sampah", "sampah", "trash"],
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80" // Trash/Recycle
  },

  // --- HUMAN BODY, SENSES, HEALTH & PEOPLE ---
  {
    keywords: ["gigi", "tooth", "teeth"],
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80" // Teeth
  },
  {
    keywords: ["mata", "eye", "eyes", "melihat"],
    url: "https://images.unsplash.com/photo-1544605518-e37fae0176b6?w=600&auto=format&fit=crop&q=80" // Eyes
  },
  {
    keywords: ["telinga", "ear", "ears", "mendengarkan"],
    url: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=600&auto=format&fit=crop&q=80" // Ears
  },
  {
    keywords: ["hidung", "nose", "menghirup"],
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80" // Nose
  },
  {
    keywords: ["mulut", "mouth", "lidah", "tongue", "merasakan"],
    url: "https://images.unsplash.com/photo-1504703395950-b89145a54344?w=600&auto=format&fit=crop&q=80" // Mouth
  },
  {
    keywords: ["tangan", "hand", "hands", "menulis", "memegang"],
    url: "https://images.unsplash.com/photo-1532622068841-248d26b13655?w=600&auto=format&fit=crop&q=80" // Hands
  },
  {
    keywords: ["kaki", "foot", "feet", "melompat", "sepatu"],
    url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80" // Feet
  },
  {
    keywords: ["kepala", "head", "rambut", "hair"],
    url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80" // Head
  },
  {
    keywords: ["jantung", "heart"],
    url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop&q=80" // Heart
  },
  {
    keywords: ["otak", "brain"],
    url: "https://images.unsplash.com/photo-1559757175-5700def83bad?w=600&auto=format&fit=crop&q=80" // Brain
  },
  {
    keywords: ["paru-paru", "lungs"],
    url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=80" // Lungs
  },
  {
    keywords: ["lambung", "perut", "stomach", "lapar"],
    url: "https://images.unsplash.com/photo-1559757175-01e17d77b83b?w=600&auto=format&fit=crop&q=80" // Stomach
  },
  {
    keywords: ["ayah", "father"],
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80" // Father
  },
  {
    keywords: ["ibu", "mother"],
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80" // Mother
  },
  {
    keywords: ["kakek", "grandfather"],
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80" // Grandfather
  },
  {
    keywords: ["nenek", "grandmother"],
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80" // Grandmother
  },
  {
    keywords: ["bayi", "baby"],
    url: "https://images.unsplash.com/photo-1504480684699-01c7400add82?w=600&auto=format&fit=crop&q=80" // Baby
  },
  {
    keywords: ["keluarga", "family"],
    url: "https://images.unsplash.com/photo-1542037104857-ffbe085109e0?w=600&auto=format&fit=crop&q=80" // Family
  },
  {
    keywords: ["guru", "teacher"],
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80" // Teacher
  },
  {
    keywords: ["murid", "student", "belajar"],
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80" // Student
  },

  // --- GEOMETRY / SHAPES ---
  {
    keywords: ["segitiga", "triangle"],
    url: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80" // Triangle
  },
  {
    keywords: ["persegi panjang", "persegi", "kotak persegi", "kotak", "square", "rectangle"],
    url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80" // Box/Square
  },
  {
    keywords: ["lingkaran", "bulat", "circle", "round"],
    url: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&auto=format&fit=crop&q=80" // Circle
  },

  // --- ACTIONS / VERBS ---
  {
    keywords: ["lari", "berlari", "run"],
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80" // Run
  },
  {
    keywords: ["jalan", "berjalan", "walk"],
    url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80" // Walk
  },
  {
    keywords: ["tidur", "sleep"],
    url: "https://images.unsplash.com/photo-1520206183501-d88610aa3e43?w=600&auto=format&fit=crop&q=80" // Sleep
  },
  {
    keywords: ["makan", "eat"],
    url: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop&q=80" // Eat
  },
  {
    keywords: ["minum", "drink"],
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80" // Drink
  },
  {
    keywords: ["membaca", "read"],
    url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80" // Read
  },
  {
    keywords: ["menulis", "write"],
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80" // Write
  },
  {
    keywords: ["bernyanyi", "sing"],
    url: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&auto=format&fit=crop&q=80" // Sing
  },
  {
    keywords: ["duduk", "sit"],
    url: "https://images.unsplash.com/photo-1463693396721-8ca0cfa7b0b0?w=600&auto=format&fit=crop&q=80" // Sit
  },
  {
    keywords: ["berdiri", "stand"],
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80" // Stand
  },
  {
    keywords: ["berenang", "swim"],
    url: "https://images.unsplash.com/photo-1519666336592-e225a99dcd2f?w=600&auto=format&fit=crop&q=80" // Swim
  }
];

/**
 * Searches the question text for registered keywords and returns the corresponding Unsplash image URL.
 * It prioritizes exact matching or specific compounds first, then moves down to more general keywords.
 * Only returns an image URL if a concrete keyword matches; returns null for abstract/general questions.
 * 
 * @param questionText The text of the question
 * @param category The question category
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept in the signature (matches the ported original API) for future category-aware matching; unused for now since keyword matching alone is sufficient.
export function getQuestionImage(questionText: string, category: Category): string | null {
  const textNormalized = questionText.toLowerCase();

  // Search through all our categorized mapping tags
  for (const mapping of IMAGE_MAPPINGS) {
    for (const keyword of mapping.keywords) {
      // Use exact word boundaries to avoid wrong matches like 'kera' in 'sekarang' or 'lebah' in 'sebelah' or 'tas' in 'kertas'
      // Also matches optional Indonesian possessive "-nya"
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedKeyword}(?:nya)?\\b`, "i");

      if (regex.test(textNormalized)) {
        return mapping.url;
      }
    }
  }

  // To avoid showing irrelevant generic images for abstract/mathematical formulas
  // or questions that do not need illustrations, we return null so no image is displayed.
  return null;
}
