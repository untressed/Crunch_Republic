const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mongoose = require(path.join(__dirname, 'backend/node_modules/mongoose'));

const dishesDir = path.join(__dirname, 'frontend/public/assets/dishes');

async function convertImages() {
  console.log('--- Step 1: Converting JPGs to WebP in public/assets/dishes ---');
  const files = fs.readdirSync(dishesDir);
  const jpgFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));

  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let convertedCount = 0;

  for (const file of jpgFiles) {
    const inputPath = path.join(dishesDir, file);
    const baseName = file.replace(/\.(jpg|jpeg)$/i, '');
    const outputPath = path.join(dishesDir, `${baseName}.webp`);

    const originalStats = fs.statSync(inputPath);
    totalOriginalSize += originalStats.size;

    await sharp(inputPath)
      .resize(600, 450, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 4 })
      .toFile(outputPath);

    const webpStats = fs.statSync(outputPath);
    totalWebpSize += webpStats.size;
    convertedCount++;

    const savedPct = Math.round((1 - webpStats.size / originalStats.size) * 100);
    console.log(`[✓] ${file} (${Math.round(originalStats.size / 1024)} KB) -> ${baseName}.webp (${Math.round(webpStats.size / 1024)} KB) [-${savedPct}%]`);

    // Remove original JPG to save memory/storage
    fs.unlinkSync(inputPath);
  }

  const overallSavedPct = Math.round((1 - totalWebpSize / totalOriginalSize) * 100);
  console.log(`\nConversion complete!`);
  console.log(`Converted: ${convertedCount} images`);
  console.log(`Total original size: ${Math.round(totalOriginalSize / 1024)} KB`);
  console.log(`Total WebP size: ${Math.round(totalWebpSize / 1024)} KB`);
  console.log(`Storage/Memory Saved: ${overallSavedPct}%\n`);

  // Step 2: Update MongoDB records
  console.log('--- Step 2: Updating MongoDB dish records to .webp ---');
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/crunch-republic');
    const Dish = mongoose.model(
      'Dish',
      new mongoose.Schema({
        name: String,
        image: String,
      }, { strict: false })
    );

    const dishes = await Dish.find({ image: { $regex: /\.(jpg|jpeg)$/i } });
    console.log(`Found ${dishes.length} dishes in database to update...`);

    let updatedCount = 0;
    for (const dish of dishes) {
      dish.image = dish.image.replace(/\.(jpg|jpeg)$/i, '.webp');
      await dish.save();
      updatedCount++;
    }

    console.log(`Updated ${updatedCount} dish records in MongoDB to .webp.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('MongoDB update error:', err.message);
  }

  console.log('\n--- Done! All dish images are now high-performance WebP ---');
}

convertImages().catch(err => {
  console.error('Fatal error during conversion:', err);
  process.exit(1);
});
