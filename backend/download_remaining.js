const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../frontend/public/assets/dishes');

const remaining = [
  { name: 'imarti.jpg', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80' },
  { name: 'fries_animal.jpg', url: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&auto=format&fit=crop&q=80' },
  { name: 'pasta_red_veg.jpg', url: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&auto=format&fit=crop&q=80' },
  { name: 'byob_meat.jpg', url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Failed: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  for (const item of remaining) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`[✓] Downloaded ${item.name} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`[X] Error downloading ${item.name}: ${err.message}`);
    }
  }
}

run();
