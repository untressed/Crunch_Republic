// convert_images_to_svg_node.js
/**
 * Batch convert raster dish images (jpg/jpeg/png) to SVG using the 'potrace' npm package.
 * This works in a pure Node.js environment (no browser Image object needed).
 *
 * Usage:
 *   npm install potrace   # install the dependency (once)
 *   node convert_images_to_svg_node.js
 */

const fs = require('fs');
const path = require('path');
const potrace = require('potrace'); // npm package that wraps the potrace binary

// ---------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------
const INPUT_DIR = path.join(__dirname, 'frontend', 'src', 'assets', 'dishes');
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png'];

// ---------------------------------------------------------------
// Helper: convert one file to SVG
// ---------------------------------------------------------------
function convertFile(srcPath, destPath) {
  potrace.trace(srcPath, (err, svg) => {
    if (err) {
      console.error(`❌ Failed ${path.basename(srcPath)} → ${err.message}`);
    } else {
      fs.writeFileSync(destPath, svg, 'utf8');
      console.log(`✅ ${path.basename(srcPath)} → ${path.basename(destPath)}`);
    }
  });
}

// ---------------------------------------------------------------
// Main conversion loop
// ---------------------------------------------------------------
function convertFolder() {
  console.log(`🔎 Scanning folder: ${INPUT_DIR}`);
  fs.readdir(INPUT_DIR, (err, files) => {
    if (err) {
      console.error('❌ Unable to read directory:', err);
      return;
    }
    const images = files.filter(f => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()));
    if (images.length === 0) {
      console.log('✅ No supported images found – nothing to convert.');
      return;
    }
    console.log(`🖼️  Found ${images.length} image(s) to convert.`);
    images.forEach(file => {
      const src = path.join(INPUT_DIR, file);
      const svgName = `${path.parse(file).name}.svg`;
      const dest = path.join(INPUT_DIR, svgName);
      convertFile(src, dest);
    });
  });
}

convertFolder();
