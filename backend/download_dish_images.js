const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../frontend/public/assets/dishes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToDownload = [
  // Tea & Coffee
  { name: 'tea.jpg', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80' },
  { name: 'coffee.jpg', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80' },

  // Quick Bites
  { name: 'samosa.jpg', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80' },
  { name: 'bread_pakoda.jpg', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { name: 'jalebi.jpg', url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80' },
  { name: 'imarti.jpg', url: 'https://images.unsplash.com/photo-1605197148564-8848d70a169b?w=800&auto=format&fit=crop&q=80' },
  { name: 'aloo_patties.jpg', url: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?w=800&auto=format&fit=crop&q=80' },
  { name: 'paneer_patties.jpg', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80' },

  // Fries
  { name: 'fries_salted.jpg', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80' },
  { name: 'fries_periperi.jpg', url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&auto=format&fit=crop&q=80' },
  { name: 'fries_cheesy.jpg', url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80' },
  { name: 'fries_butter_chicken.jpg', url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80' },
  { name: 'fries_animal.jpg', url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80' },

  // Corn Dogs
  { name: 'corndog_classic.jpg', url: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&auto=format&fit=crop&q=80' },
  { name: 'corndog_potato.jpg', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80' },
  { name: 'corndog_chicken.jpg', url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80' },
  { name: 'corndog_ramen.jpg', url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80' },

  // Burgers
  { name: 'burger_veg.jpg', url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80' },
  { name: 'burger_chicken.jpg', url: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80' },

  // Wraps
  { name: 'wrap_veg.jpg', url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80' },
  { name: 'wrap_chicken.jpg', url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=80' },

  // Sandwiches
  { name: 'sandwich_veg.jpg', url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
  { name: 'sandwich_chicken.jpg', url: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80' },

  // Pasta
  { name: 'pasta_makhani_veg.jpg', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80' },
  { name: 'pasta_makhani_chicken.jpg', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80' },
  { name: 'pasta_alfredo_veg.jpg', url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&auto=format&fit=crop&q=80' },
  { name: 'pasta_alfredo_chicken.jpg', url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop&q=80' },
  { name: 'pasta_red_veg.jpg', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169c?w=800&auto=format&fit=crop&q=80' },
  { name: 'pasta_red_chicken.jpg', url: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&auto=format&fit=crop&q=80' },

  // Maggie
  { name: 'maggie_veg.jpg', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80' },
  { name: 'maggie_cheesy.jpg', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80' },
  { name: 'maggie_korean.jpg', url: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800&auto=format&fit=crop&q=80' },
  { name: 'maggie_makhani.jpg', url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80' },
  { name: 'maggie_egg.jpg', url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80' },

  // BYOB Chips
  { name: 'byob_masala.jpg', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80' },
  { name: 'byob_cheesy.jpg', url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&auto=format&fit=crop&q=80' },
  { name: 'byob_custom.jpg', url: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=800&auto=format&fit=crop&q=80' },
  { name: 'byob_special.jpg', url: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=800&auto=format&fit=crop&q=80' },
  { name: 'byob_meat.jpg', url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80' },

  // Mocktails
  { name: 'mocktail_mojito.jpg', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80' },
  { name: 'mocktail_strawberry.jpg', url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=80' },
  { name: 'mocktail_mango.jpg', url: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop&q=80' },
  { name: 'mocktail_watermelon.jpg', url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&auto=format&fit=crop&q=80' },
  { name: 'mocktail_pinacolada.jpg', url: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&auto=format&fit=crop&q=80' },
  { name: 'mocktail_jaljeera.jpg', url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop&q=80' },
  { name: 'mocktail_cold_coffee.jpg', url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80' },

  // Specialty Coffee
  { name: 'coffee_hazelnut_hot.jpg', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop&q=80' },

  // Thick Shakes
  { name: 'shake_chocolate.jpg', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80' },
  { name: 'shake_oreo.jpg', url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80' },
  { name: 'shake_peanut_butter.jpg', url: 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=800&auto=format&fit=crop&q=80' },
  { name: 'shake_matcha.jpg', url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Failed to download: status ${response.statusCode}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });

    request.setTimeout(15000, () => {
      request.abort();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  console.log(`Starting download of ${imagesToDownload.length} dish images...`);
  let successCount = 0;
  for (const item of imagesToDownload) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`[✓] Downloaded ${item.name} (${Math.round(stats.size / 1024)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`[X] Error downloading ${item.name}: ${err.message}`);
    }
  }
  console.log(`Completed: ${successCount}/${imagesToDownload.length} images downloaded successfully.`);
}

run();
