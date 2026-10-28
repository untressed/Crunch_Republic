const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'frontend/public/assets/dishes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high-res Unsplash food photography matching each new dish precisely
const newImages = [
  // Rice
  { key: 'rice_schezwan', url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80' },
  { key: 'rice_fried', url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80' },
  { key: 'rice_burnt_garlic', url: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&auto=format&fit=crop&q=80' },

  // Noodles
  { key: 'noodles_street', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80' },
  { key: 'noodles_chilli_garlic', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80' },
  { key: 'noodles_singapuri', url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80' },
  { key: 'noodles_hakka', url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&auto=format&fit=crop&q=80' },
  { key: 'noodles_schezwan', url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80' },

  // Chinese Snacks - Veg
  { key: 'chilli_paneer', url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80' },
  { key: 'manchurian_veg', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80' },
  { key: 'chilli_mushroom', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80' },
  { key: 'stuffed_mushroom', url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop&q=80' },
  { key: 'chilli_garlic_chaap', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'crispy_corn', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=80' },
  { key: 'veg_stir_fry', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80' },
  { key: 'chilli_potato', url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80' },
  { key: 'honey_chilli_potato', url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80' },

  // Chinese Snacks - Non-Veg
  { key: 'hunan_chilli_chicken', url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80' },
  { key: 'chicken_manchurian', url: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&auto=format&fit=crop&q=80' },
  { key: 'garlic_chicken', url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80' },
  { key: 'kung_pao_chicken', url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80' },
  { key: 'dynamite_chicken', url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80' },
  { key: 'korean_bbq_chicken', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80' },
  { key: 'chicken_tenders', url: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800&auto=format&fit=crop&q=80' },
  { key: 'thai_chicken_popcorn', url: 'https://images.unsplash.com/photo-1585325701165-351af916e581?w=800&auto=format&fit=crop&q=80' },

  // Dumplings
  { key: 'veg_dumplings', url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=80' },
  { key: 'nonveg_dumplings', url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80' },
  { key: 'mutton_wontons', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80' },

  // Tandoor
  { key: 'malai_chaap', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'tandoori_chaap', url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80' },
  { key: 'paneer_tikka', url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80' },
  { key: 'tandoori_mushroom', url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop&q=80' },
  { key: 'achari_chaap', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'lemon_mint_chaap', url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80' },

  // Rolls
  { key: 'chaap_paneer_roll', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'cheese_cigar_roll', url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80' },
  { key: 'spring_roll', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80' },

  // Kebabs
  { key: 'chicken_seekh_kebab', url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80' },
  { key: 'mutton_seekh_kebab', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80' },

  // Soups
  { key: 'sweet_corn_soup', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80' },
  { key: 'mushroom_soup', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80' },
  { key: 'chicken_soup', url: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&auto=format&fit=crop&q=80' },
  { key: 'hot_sour_soup', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80' },
  { key: 'mutton_kharodey_soup', url: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&auto=format&fit=crop&q=80' },

  // Hearty Bowl-O-Mania
  { key: 'chole_rice_bowl', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80' },
  { key: 'kadi_rice_bowl', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80' },
  { key: 'palak_paneer_rice_bowl', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80' },
  { key: 'shahi_paneer_rice_bowl', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80' },
  { key: 'mexican_rice_bowl', url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop&q=80' },
  { key: 'butter_chicken_rice_bowl', url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80' },
  { key: 'chole_bhature', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'paneer_chole_bhature', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'poori_sabzi', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80' },

  // Extra Burgers, Wraps & Sandwiches from Menu 2
  { key: 'burger_paneer', url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80' },
  { key: 'sandwich_bahubali', url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
  { key: 'kulcha_stuffed', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { key: 'desi_macaroni', url: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=80' },
  { key: 'nachos_corn_chaat', url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&auto=format&fit=crop&q=80' },
  { key: 'bhelpuri', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80' },
  { key: 'cappuccino_special', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop&q=80' },
  { key: 'rabri_jalebi', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80' },
  { key: 'rabri_imarti', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80' },
  { key: 'mocktail_blue_ocean', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80' },
];

function downloadAndConvertToWebp(url, destWebp) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadAndConvertToWebp(response.headers.location, destWebp).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed with HTTP ${response.statusCode}`));
      }

      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          await sharp(buffer)
            .resize(800, 600, { fit: 'cover' })
            .webp({ quality: 80 })
            .toFile(destWebp);
          const stats = fs.statSync(destWebp);
          console.log(`[✓] Saved ${path.basename(destWebp)} (${Math.round(stats.size / 1024)} KB)`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`--- Downloading and Converting ${newImages.length} High-Res Food Photos to .webp ---`);
  let successCount = 0;
  for (const item of newImages) {
    const dest = path.join(targetDir, `${item.key}.webp`);
    try {
      await downloadAndConvertToWebp(item.url, dest);
      successCount++;
    } catch (e) {
      console.error(`[X] Error on ${item.key}:`, e.message);
    }
  }
  console.log(`\n✅ Completed! Successfully generated ${successCount}/${newImages.length} .webp photos.`);
}

run();
