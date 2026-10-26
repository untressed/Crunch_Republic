const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

const srcPath = path.join(__dirname, 'frontend', 'src', 'assets', 'wordmark-original.png');
const outSvgPath = path.join(__dirname, 'frontend', 'src', 'assets', 'wordmark.svg');
const outPublicSvg = path.join(__dirname, 'frontend', 'public', 'assets', 'wordmark.svg');
const outWhiteSvg = path.join(__dirname, 'frontend', 'src', 'assets', 'wordmark-white.svg');
const outWhitePublicSvg = path.join(__dirname, 'frontend', 'public', 'assets', 'wordmark-white.svg');

if (!fs.existsSync(srcPath)) {
  console.error('Source image not found:', srcPath);
  process.exit(1);
}

// Ensure public assets directory exists
const publicDir = path.dirname(outPublicSvg);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Trace the wordmark using potrace parameters optimized for smooth typography
const params = {
  optTolerance: 0.4,
  threshold: 180,
  blackOnWhite: true,
  color: '#B91C1C', // Brand Red
  background: 'transparent',
};

potrace.trace(srcPath, params, (err, svg) => {
  if (err) {
    console.error('Potrace error:', err);
    process.exit(1);
  }

  // Save the pure vector SVG
  fs.writeFileSync(outSvgPath, svg, 'utf8');
  fs.writeFileSync(outPublicSvg, svg, 'utf8');
  console.log('✅ Generated wordmark.svg');

  // Also create a white/dark-mode compatible version (#FFFFFF)
  const whiteSvg = svg.replace(/fill="#B91C1C"/g, 'fill="#FFFFFF"');
  fs.writeFileSync(outWhiteSvg, whiteSvg, 'utf8');
  fs.writeFileSync(outWhitePublicSvg, whiteSvg, 'utf8');
  console.log('✅ Generated wordmark-white.svg');
});
