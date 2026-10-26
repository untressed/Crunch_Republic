// convert_images_to_svg.js
/**
 * Scans frontend/src/assets/dishes for raster images (jpg/jpeg/png) and creates SVG versions
 * using imagetracerjs. Run with: node convert_images_to_svg.js
 */
const fs = require('fs');
const path = require('path');
const ImageTracer = require('imagetracerjs');

// ---------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------
const INPUT_DIR = path.join(__dirname, 'frontend', 'src', 'assets', 'dishes');
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png'];

// Adjust tracing options if needed – see imagetracerjs docs
const TRACE_OPTIONS = {
  numberOfColors: 8,   // lower = smoother, higher = more detail
  colorsampling: true, // speed vs. accuracy
  scale: 1,
  pathOmitFill: false,
};

// ---------------------------------------------------------------
// Helper – raster file -> SVG string
// ---------------------------------------------------------------
function rasterToSvg(filePath, cb) {
  const ext = path.extname(filePath).toLowerCase().slice(1); // e.g., 'jpg'
  const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  const base64 = fs.readFileSync(filePath).toString('base64');
  const dataUrl = `data:${mime};base64,${base64}`;

  ImageTracer.imageToSVG(
    dataUrl,
    TRACE_OPTIONS,
    (svgString) => cb(null, svgString),
    (err) => cb(err)
  );
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
    const images = files.filter((f) => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()));
    if (images.length === 0) {
      console.log('✅ No supported images found – nothing to convert.');
      return;
    }
    console.log(`🖼️  Found ${images.length} image(s) to convert.`);
    let done = 0;
    images.forEach((filename) => {
      const srcPath = path.join(INPUT_DIR, filename);
      const svgName = `${path.parse(filename).name}.svg`;
      const destPath = path.join(INPUT_DIR, svgName);
      rasterToSvg(srcPath, (err, svg) => {
        if (err) {
          console.error(`❌ Failed to convert ${filename}:`, err);
        } else {
          fs.writeFileSync(destPath, svg, 'utf8');
          console.log(`✅ ${filename} → ${svgName}`);
        }
        done++;
        if (done === images.length) {
          console.log('🎉 All conversions completed.');
        }
      });
    });
  });
}

convertFolder();
