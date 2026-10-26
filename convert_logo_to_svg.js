const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

const srcPath = path.join(__dirname, 'frontend', 'src', 'assets', 'logo-original.png');
const outSvg = path.join(__dirname, 'frontend', 'src', 'assets', 'logo.svg');
const outPublicSvg = path.join(__dirname, 'frontend', 'public', 'assets', 'logo.svg');
const outWhiteSvg = path.join(__dirname, 'frontend', 'src', 'assets', 'logo-white.svg');
const outPublicWhiteSvg = path.join(__dirname, 'frontend', 'public', 'assets', 'logo-white.svg');

if (!fs.existsSync(srcPath)) {
  console.error('File not found:', srcPath);
  process.exit(1);
}

const params = {
  optTolerance: 0.2,      // High precision curve fitting
  threshold: 160,         // Clean threshold separating red logo from cream background
  blackOnWhite: true,
  color: '#B91C1C',       // Authentic Crimson Brand Red
  background: 'transparent',
};

potrace.trace(srcPath, params, (err, svg) => {
  if (err) {
    console.error('Error tracing logo:', err);
    process.exit(1);
  }

  // Save brand red SVG
  fs.writeFileSync(outSvg, svg, 'utf8');
  fs.writeFileSync(outPublicSvg, svg, 'utf8');
  console.log('✅ Generated logo.svg');

  // Save white monochrome version for dark backgrounds
  const whiteSvg = svg.replace(/fill="#B91C1C"/g, 'fill="#FFFFFF"');
  fs.writeFileSync(outWhiteSvg, whiteSvg, 'utf8');
  fs.writeFileSync(outPublicWhiteSvg, whiteSvg, 'utf8');
  console.log('✅ Generated logo-white.svg');
});
