const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src', 'assets', 'dishes');
const pubDir = path.join(__dirname, 'frontend', 'public', 'assets', 'dishes');

[srcDir, pubDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const dishes = {};

// 1. BURGER
dishes['burger.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bunTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="40%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="bunBottom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <linearGradient id="patty" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="50%" stop-color="#542509"/>
      <stop offset="100%" stop-color="#3B1804"/>
    </linearGradient>
    <linearGradient id="cheese" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="tomato" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#B91C1C"/>
    </linearGradient>
    <linearGradient id="lettuce" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#bgGlow)"/>

  <!-- Shadow Base -->
  <ellipse cx="250" cy="425" rx="160" ry="24" fill="#78350F" opacity="0.2"/>

  <g filter="url(#shadow)">
    <!-- Bottom Bun -->
    <path d="M 120 370 Q 250 385 380 370 C 385 410 330 420 250 420 C 170 420 115 410 120 370 Z" fill="url(#bunBottom)"/>

    <!-- Grilled Patty -->
    <rect x="95" y="325" width="310" height="48" rx="24" fill="url(#patty)"/>
    <!-- Patty grill marks -->
    <line x1="140" y1="332" x2="165" y2="365" stroke="#3B1804" stroke-width="4" stroke-linecap="round"/>
    <line x1="190" y1="332" x2="215" y2="365" stroke="#3B1804" stroke-width="4" stroke-linecap="round"/>
    <line x1="240" y1="332" x2="265" y2="365" stroke="#3B1804" stroke-width="4" stroke-linecap="round"/>
    <line x1="290" y1="332" x2="315" y2="365" stroke="#3B1804" stroke-width="4" stroke-linecap="round"/>
    <line x1="340" y1="332" x2="365" y2="365" stroke="#3B1804" stroke-width="4" stroke-linecap="round"/>

    <!-- Melted Cheese Layer (Corners Drooping) -->
    <polygon points="100,325 390,320 405,335 340,365 310,340 230,375 190,335 125,355 95,335" fill="url(#cheese)"/>

    <!-- Tomatoes (Two Slices) -->
    <path d="M 110 305 Q 185 295 260 305 L 255 325 Q 180 318 115 325 Z" fill="url(#tomato)"/>
    <path d="M 240 305 Q 315 295 390 305 L 385 325 Q 310 318 245 325 Z" fill="url(#tomato)"/>
    <circle cx="160" cy="312" r="3" fill="#FCA5A5"/>
    <circle cx="210" cy="312" r="3" fill="#FCA5A5"/>
    <circle cx="290" cy="312" r="3" fill="#FCA5A5"/>
    <circle cx="340" cy="312" r="3" fill="#FCA5A5"/>

    <!-- Wavy Crisp Lettuce -->
    <path d="M 90 285 C 110 305 130 280 155 295 C 180 310 205 285 235 300 C 265 315 290 285 320 305 C 345 285 375 310 405 285 C 415 275 395 265 370 268 C 340 270 310 260 250 262 C 190 260 160 270 120 268 C 95 265 80 275 90 285 Z" fill="url(#lettuce)"/>

    <!-- Top Brioche Bun -->
    <path d="M 100 265 C 100 135 400 135 400 265 C 400 272 385 278 250 278 C 115 278 100 272 100 265 Z" fill="url(#bunTop)"/>
    <!-- Bun Glaze Highlight -->
    <path d="M 140 200 C 170 160 330 160 360 200 C 310 175 190 175 140 200 Z" fill="#FFFFFF" opacity="0.35"/>

    <!-- White Sesame Seeds -->
    <g fill="#FEF3C7">
      <ellipse cx="170" cy="180" rx="4" ry="7" transform="rotate(-25 170 180)"/>
      <ellipse cx="220" cy="165" rx="4" ry="7" transform="rotate(15 220 165)"/>
      <ellipse cx="270" cy="160" rx="4" ry="7" transform="rotate(-10 270 160)"/>
      <ellipse cx="320" cy="175" rx="4" ry="7" transform="rotate(30 320 175)"/>
      <ellipse cx="140" cy="225" rx="4" ry="7" transform="rotate(-40 140 225)"/>
      <ellipse cx="190" cy="215" rx="4" ry="7" transform="rotate(5 190 215)"/>
      <ellipse cx="250" cy="205" rx="4" ry="7" transform="rotate(-15 250 205)"/>
      <ellipse cx="305" cy="215" rx="4" ry="7" transform="rotate(20 305 215)"/>
      <ellipse cx="360" cy="225" rx="4" ry="7" transform="rotate(45 360 225)"/>
      <ellipse cx="230" cy="245" rx="4" ry="7" transform="rotate(35 230 245)"/>
      <ellipse cx="280" cy="240" rx="4" ry="7" transform="rotate(-30 280 240)"/>
    </g>
  </g>
</svg>`;

// 2. FRIES
dishes['fries.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="friesGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fryGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="50%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="fryCrisp" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="boxFront" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <linearGradient id="boxBack" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#991B1B"/>
      <stop offset="100%" stop-color="#7F1D1D"/>
    </linearGradient>
    <filter id="fShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#friesGlow)"/>
  <ellipse cx="250" cy="430" rx="140" ry="20" fill="#78350F" opacity="0.2"/>

  <g filter="url(#fShadow)">
    <!-- Box Back Lip -->
    <path d="M 135 250 L 365 250 L 340 410 L 160 410 Z" fill="url(#boxBack)"/>

    <!-- Golden Crispy Fries -->
    <!-- Back row -->
    <rect x="175" y="110" width="22" height="180" rx="6" transform="rotate(-18 186 200)" fill="url(#fryCrisp)"/>
    <rect x="210" y="90" width="22" height="200" rx="6" transform="rotate(-8 221 190)" fill="url(#fryGold)"/>
    <rect x="255" y="80" width="22" height="210" rx="6" transform="rotate(6 266 185)" fill="url(#fryGold)"/>
    <rect x="295" y="100" width="22" height="190" rx="6" transform="rotate(18 306 195)" fill="url(#fryCrisp)"/>
    <rect x="330" y="130" width="22" height="160" rx="6" transform="rotate(28 341 210)" fill="url(#fryGold)"/>
    <rect x="145" y="135" width="22" height="150" rx="6" transform="rotate(-26 156 210)" fill="url(#fryGold)"/>

    <!-- Front row -->
    <rect x="165" y="145" width="24" height="160" rx="6" transform="rotate(-12 177 225)" fill="url(#fryGold)"/>
    <rect x="200" y="125" width="24" height="175" rx="6" transform="rotate(-2 212 212)" fill="url(#fryCrisp)"/>
    <rect x="240" y="120" width="24" height="180" rx="6" transform="rotate(4 252 210)" fill="url(#fryGold)"/>
    <rect x="280" y="135" width="24" height="170" rx="6" transform="rotate(14 292 220)" fill="url(#fryGold)"/>
    <rect x="315" y="155" width="24" height="150" rx="6" transform="rotate(22 327 230)" fill="url(#fryCrisp)"/>

    <!-- Peri-Peri Seasoning Flakes -->
    <circle cx="215" cy="140" r="2.5" fill="#DC2626"/>
    <circle cx="250" cy="130" r="2.5" fill="#DC2626"/>
    <circle cx="285" cy="150" r="2.5" fill="#DC2626"/>
    <circle cx="180" cy="165" r="2.5" fill="#DC2626"/>
    <circle cx="245" cy="175" r="2.5" fill="#DC2626"/>

    <!-- Box Front (Red Carton with curved scoop) -->
    <path d="M 130 250 C 180 280 320 280 370 250 L 340 420 C 340 425 330 430 250 430 C 170 430 160 425 160 420 Z" fill="url(#boxFront)"/>

    <!-- Golden Brand Crest on Box -->
    <circle cx="250" cy="345" r="32" fill="#F59E0B" stroke="#FEF08A" stroke-width="2"/>
    <path d="M 235 335 Q 250 320 265 335 L 260 345 Q 250 335 240 345 Z" fill="#78350F"/>
    <text x="250" y="358" font-family="sans-serif" font-weight="900" font-size="12" fill="#78350F" text-anchor="middle">CR</text>
  </g>
</svg>`;

// 3. COFFEE
dishes['coffee.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="coffeeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEDD5" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FFEDD5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <linearGradient id="coffeeBrew" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="60%" stop-color="#451A03"/>
      <stop offset="100%" stop-color="#270F02"/>
    </linearGradient>
    <filter id="cShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#451A03" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#coffeeGlow)"/>
  <ellipse cx="250" cy="430" rx="170" ry="25" fill="#451A03" opacity="0.2"/>

  <!-- Steam Wafts -->
  <path d="M 210 160 C 200 120 230 100 215 60" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.6"/>
  <path d="M 250 150 C 240 105 270 85 255 45" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8"/>
  <path d="M 290 160 C 280 120 310 100 295 60" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.6"/>

  <g filter="url(#cShadow)">
    <!-- Saucer Plate -->
    <ellipse cx="250" cy="385" rx="180" ry="40" fill="url(#cupGrad)"/>
    <ellipse cx="250" cy="385" rx="130" ry="25" fill="#E2E8F0"/>

    <!-- Cup Handle -->
    <path d="M 340 230 C 420 230 420 330 335 330" fill="none" stroke="url(#cupGrad)" stroke-width="26" stroke-linecap="round"/>

    <!-- Ceramic Cup Body -->
    <path d="M 130 200 L 155 350 C 160 380 340 380 345 350 L 370 200 Z" fill="url(#cupGrad)"/>

    <!-- Brand Crimson Stripe on Cup -->
    <path d="M 142 270 L 148 300 Q 250 330 352 300 L 358 270 Q 250 300 142 270 Z" fill="#B91C1C"/>

    <!-- Coffee Rim Ellipse -->
    <ellipse cx="250" cy="200" rx="120" ry="32" fill="#E2E8F0"/>
    <ellipse cx="250" cy="200" rx="110" ry="26" fill="url(#coffeeBrew)"/>

    <!-- Latte Art: Cream Heart / Rosette -->
    <path d="M 250 212 C 235 190 205 190 205 205 C 205 218 235 225 250 232 C 265 225 295 218 295 205 C 295 190 265 190 250 212 Z" fill="#FEF3C7"/>
    <circle cx="250" cy="192" r="5" fill="#FEF3C7"/>
    <circle cx="250" cy="182" r="3.5" fill="#FEF3C7"/>

    <!-- Roasted Coffee Beans near base -->
    <g transform="translate(110, 395) rotate(-20)">
      <ellipse cx="0" cy="0" rx="12" ry="18" fill="#451A03"/>
      <path d="M 0 -14 Q 5 0 0 14" stroke="#78350F" stroke-width="2.5" fill="none"/>
    </g>
    <g transform="translate(380, 395) rotate(25)">
      <ellipse cx="0" cy="0" rx="11" ry="16" fill="#542509"/>
      <path d="M 0 -12 Q -4 0 0 12" stroke="#78350F" stroke-width="2.5" fill="none"/>
    </g>
  </g>
</svg>`;

// 4. CORNDOG
dishes['corndog.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="cdGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cdBatter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="40%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <linearGradient id="stick" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E5D0BA"/>
      <stop offset="100%" stop-color="#B8977E"/>
    </linearGradient>
    <filter id="cdShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#cdGlow)"/>
  <ellipse cx="260" cy="435" rx="150" ry="20" fill="#78350F" opacity="0.2"/>

  <g filter="url(#cdShadow)" transform="rotate(-30 250 250)">
    <!-- Wooden Stick -->
    <rect x="238" y="320" width="24" height="150" rx="6" fill="url(#stick)"/>

    <!-- Golden Battered Corn Dog Body -->
    <rect x="195" y="80" width="110" height="280" rx="55" fill="url(#cdBatter)"/>

    <!-- Crunchy Panko Texture Dots -->
    <g fill="#FEF08A" opacity="0.6">
      <circle cx="220" cy="120" r="4"/><circle cx="270" cy="140" r="3"/><circle cx="240" cy="170" r="4"/>
      <circle cx="280" cy="200" r="3.5"/><circle cx="215" cy="230" r="4"/><circle cx="260" cy="260" r="4"/>
      <circle cx="230" cy="290" r="3.5"/><circle cx="275" cy="320" r="4"/>
    </g>

    <!-- Mustard Yellow Zig-Zag Swirl -->
    <path d="M 210 110 Q 285 130 220 160 Q 290 190 215 220 Q 290 250 215 280 Q 290 310 230 330" 
          fill="none" stroke="#FACC15" stroke-width="12" stroke-linecap="round"/>

    <!-- Ketchup Red Zig-Zag Swirl -->
    <path d="M 270 120 Q 200 145 270 175 Q 205 205 275 235 Q 205 265 275 295 Q 215 320 260 340" 
          fill="none" stroke="#DC2626" stroke-width="10" stroke-linecap="round"/>
  </g>
</svg>`;

// 5. MAGGIE
dishes['maggie.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="mGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="brothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <filter id="mShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.25"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#mGlow)"/>
  <ellipse cx="250" cy="435" rx="170" ry="24" fill="#0F172A" opacity="0.2"/>

  <!-- Hot Steam -->
  <path d="M 200 130 Q 180 90 210 60" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.6"/>
  <path d="M 250 120 Q 230 75 260 40" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8"/>
  <path d="M 300 130 Q 280 90 310 60" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.6"/>

  <g filter="url(#mShadow)">
    <!-- Bowl Base -->
    <ellipse cx="250" cy="390" rx="90" ry="18" fill="#1E293B"/>

    <!-- Bowl Outer -->
    <path d="M 70 220 C 70 370 430 370 430 220 Z" fill="url(#bowlGrad)"/>
    <ellipse cx="250" cy="220" rx="180" ry="45" fill="#475569"/>
    <ellipse cx="250" cy="220" rx="168" ry="40" fill="url(#brothGrad)"/>

    <!-- Wavy Masala Noodles -->
    <g fill="none" stroke="#FDE047" stroke-width="7" stroke-linecap="round">
      <path d="M 120 220 Q 150 190 180 225 Q 210 255 240 210 Q 270 180 300 220 Q 330 250 360 210"/>
      <path d="M 140 235 Q 170 265 200 220 Q 230 190 260 230 Q 290 260 320 215 Q 350 195 375 225"/>
      <path d="M 130 205 Q 165 240 200 200 Q 235 170 270 215 Q 305 245 340 195"/>
      <path d="M 160 225 Q 200 255 240 225 Q 280 195 320 235"/>
    </g>

    <!-- Peas & Diced Carrots -->
    <circle cx="160" cy="215" r="7" fill="#22C55E"/>
    <circle cx="210" cy="235" r="7" fill="#22C55E"/>
    <circle cx="280" cy="210" r="7" fill="#22C55E"/>
    <circle cx="330" cy="230" r="7" fill="#22C55E"/>

    <rect x="180" y="200" width="12" height="12" rx="3" fill="#F97316"/>
    <rect x="240" y="240" width="12" height="12" rx="3" fill="#F97316"/>
    <rect x="300" y="215" width="12" height="12" rx="3" fill="#F97316"/>

    <!-- Red Chili Garnish Slice -->
    <path d="M 235 190 Q 255 185 265 200" stroke="#DC2626" stroke-width="6" stroke-linecap="round" fill="none"/>

    <!-- Chopsticks -->
    <line x1="120" y1="120" x2="350" y2="240" stroke="#B45309" stroke-width="9" stroke-linecap="round"/>
    <line x1="120" y1="100" x2="360" y2="230" stroke="#92400E" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>`;

// 6. PASTA
dishes['pasta.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="pGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEDD5" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FFEDD5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <linearGradient id="sauceRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EA580C"/>
      <stop offset="60%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <linearGradient id="penneGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="60%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <filter id="pShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#451A03" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#pGlow)"/>
  <ellipse cx="250" cy="430" rx="180" ry="25" fill="#451A03" opacity="0.2"/>

  <g filter="url(#pShadow)">
    <!-- Wide Ceramic Pasta Plate -->
    <ellipse cx="250" cy="290" rx="200" ry="110" fill="url(#plateGrad)"/>
    <ellipse cx="250" cy="290" rx="150" ry="80" fill="#E2E8F0"/>

    <!-- Rich Makhani/Red Sauce Bed -->
    <ellipse cx="250" cy="285" rx="130" ry="65" fill="url(#sauceRed)"/>

    <!-- Penne Pasta Quills -->
    <g stroke="#92400E" stroke-width="1.5">
      <!-- Pasta 1 -->
      <polygon points="180,240 220,250 215,265 175,255" fill="url(#penneGold)"/>
      <ellipse cx="177" cy="247" rx="4" ry="7" fill="#78350F"/>
      <!-- Pasta 2 -->
      <polygon points="250,230 295,240 290,255 245,245" fill="url(#penneGold)"/>
      <ellipse cx="247" cy="237" rx="4" ry="7" fill="#78350F"/>
      <!-- Pasta 3 -->
      <polygon points="210,270 255,285 248,300 203,285" fill="url(#penneGold)"/>
      <ellipse cx="206" cy="277" rx="4" ry="7" fill="#78350F"/>
      <!-- Pasta 4 -->
      <polygon points="275,265 320,275 315,290 270,280" fill="url(#penneGold)"/>
      <ellipse cx="272" cy="272" rx="4" ry="7" fill="#78350F"/>
      <!-- Pasta 5 -->
      <polygon points="160,285 200,305 192,318 152,298" fill="url(#penneGold)"/>
      <!-- Pasta 6 -->
      <polygon points="240,305 285,310 280,325 235,320" fill="url(#penneGold)"/>
    </g>

    <!-- Melted Mozzarella Streaks -->
    <path d="M 180 260 Q 250 280 320 260" stroke="#FEF9C3" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8"/>
    <path d="M 200 290 Q 250 310 290 285" stroke="#FEF9C3" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8"/>

    <!-- Fresh Basil Leaves -->
    <path d="M 250 240 C 230 220 220 250 250 265 C 280 250 270 220 250 240 Z" fill="#16A34A"/>
    <path d="M 250 242 L 250 263" stroke="#15803D" stroke-width="1.5"/>

    <path d="M 285 250 C 275 235 265 255 285 268 C 305 255 295 235 285 250 Z" fill="#22C55E"/>

    <!-- Cherry Tomato Halves -->
    <circle cx="215" cy="255" r="10" fill="#EF4444"/>
    <circle cx="280" cy="295" r="9" fill="#EF4444"/>
  </g>
</svg>`;

// 7. MOCKTAIL
dishes['mocktail.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="mockGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FECDD3" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FECDD3" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="drinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="45%" stop-color="#FB923C"/>
      <stop offset="100%" stop-color="#FACC15"/>
    </linearGradient>
    <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.4"/>
    </linearGradient>
    <filter id="mktShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#881337" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#mockGlow)"/>
  <ellipse cx="250" cy="445" rx="110" ry="18" fill="#881337" opacity="0.2"/>

  <!-- Striped Straw -->
  <g transform="rotate(16 280 80)">
    <line x1="280" y1="40" x2="280" y2="350" stroke="#DC2626" stroke-width="14" stroke-linecap="round"/>
    <line x1="280" y1="40" x2="280" y2="350" stroke="#FFFFFF" stroke-width="14" stroke-dasharray="14 14" stroke-linecap="round"/>
  </g>

  <g filter="url(#mktShadow)">
    <!-- Glass Base -->
    <ellipse cx="250" cy="425" rx="75" ry="16" fill="url(#glassBody)"/>
    <!-- Glass Stem -->
    <path d="M 242 360 L 242 425 L 258 425 L 258 360 Z" fill="#E2E8F0" opacity="0.8"/>

    <!-- Hurricane / Highball Glass Body -->
    <path d="M 175 140 C 185 240 160 310 200 360 C 220 375 280 375 300 360 C 340 310 315 240 325 140 Z" fill="url(#drinkGrad)"/>
    <!-- Glass Shading & Reflection -->
    <path d="M 175 140 C 185 240 160 310 200 360 C 220 375 280 375 300 360 C 340 310 315 240 325 140 Z" fill="url(#glassBody)" stroke="#FFFFFF" stroke-width="2"/>

    <!-- Ice Cubes inside drink -->
    <rect x="210" y="220" width="35" height="35" rx="6" fill="#FFFFFF" opacity="0.45" transform="rotate(15 227 237)"/>
    <rect x="250" y="270" width="35" height="35" rx="6" fill="#FFFFFF" opacity="0.45" transform="rotate(-12 267 287)"/>

    <!-- Bubbles -->
    <circle cx="225" cy="310" r="3" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="270" cy="330" r="4" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="240" cy="270" r="2.5" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="280" cy="220" r="3.5" fill="#FFFFFF" opacity="0.7"/>

    <!-- Fresh Lime Wheel on Rim -->
    <g transform="translate(170, 140)">
      <circle cx="0" cy="0" r="38" fill="#84CC16" stroke="#4D7C0F" stroke-width="3"/>
      <circle cx="0" cy="0" r="30" fill="#ECFCCB"/>
      <!-- Lime Segments -->
      <polygon points="0,0 -8,-24 8,-24" fill="#84CC16"/>
      <polygon points="0,0 24,-8 24,8" fill="#84CC16"/>
      <polygon points="0,0 -8,24 8,24" fill="#84CC16"/>
      <polygon points="0,0 -24,-8 -24,8" fill="#84CC16"/>
    </g>

    <!-- Fresh Mint Leaves on Rim -->
    <path d="M 315 130 C 340 105 365 125 345 145 C 325 145 315 130 315 130 Z" fill="#10B981"/>
    <path d="M 320 120 C 315 90 340 95 340 115 Z" fill="#059669"/>
  </g>
</svg>`;

// 8. BYOB CHIPS
dishes['byob_chips.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="byobGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tortilla" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="60%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="basketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <filter id="byobShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#byobGlow)"/>
  <ellipse cx="250" cy="430" rx="160" ry="22" fill="#78350F" opacity="0.2"/>

  <g filter="url(#byobShadow)">
    <!-- Back Chips -->
    <polygon points="190,140 130,220 220,230" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>
    <polygon points="260,110 200,190 300,180" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>
    <polygon points="310,130 270,220 370,190" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>

    <!-- Mid Chips (Crunch Layer) -->
    <polygon points="140,190 190,260 110,270" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>
    <polygon points="230,170 280,240 180,250" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>
    <polygon points="290,180 360,250 260,260" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>
    <polygon points="340,200 400,270 310,280" fill="url(#tortilla)" stroke="#B45309" stroke-width="2"/>

    <!-- Seasoning Specks -->
    <circle cx="230" cy="190" r="2" fill="#DC2626"/>
    <circle cx="270" cy="170" r="2.5" fill="#DC2626"/>
    <circle cx="170" cy="230" r="2" fill="#DC2626"/>
    <circle cx="310" cy="210" r="2.5" fill="#DC2626"/>

    <!-- Melted Cheddar Drizzle on Chips -->
    <path d="M 160 210 Q 250 240 340 210 Q 300 260 210 240 Z" fill="#FACC15" opacity="0.9"/>

    <!-- Crunch Republic Signature Basket / Bowl -->
    <path d="M 90 260 L 130 400 C 140 420 360 420 370 400 L 410 260 Z" fill="url(#basketGrad)"/>
    <ellipse cx="250" cy="260" rx="160" ry="30" fill="#EF4444"/>

    <!-- Checkerboard Paper Liner edge -->
    <path d="M 110 265 L 130 250 L 150 268 L 170 252 L 190 270 L 210 252 L 230 270 L 250 252 L 270 270 L 290 252 L 310 270 L 330 252 L 350 270 L 370 252 L 390 265 Z" fill="#FFFFFF"/>

    <!-- Golden Brand Label on Bag -->
    <rect x="180" y="315" width="140" height="50" rx="10" fill="#FEF08A"/>
    <text x="250" y="338" font-family="sans-serif" font-weight="900" font-size="16" fill="#B91C1C" text-anchor="middle">BYOB</text>
    <text x="250" y="354" font-family="sans-serif" font-weight="900" font-size="9" fill="#78350F" letter-spacing="2" text-anchor="middle">CHIPS</text>
  </g>
</svg>`;

// 9. QUICK BITES (Samosa & Pakoda)
dishes['quick_bites.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="qbGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="samosaPastry" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="40%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="samosaDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <filter id="qbShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#qbGlow)"/>
  <ellipse cx="250" cy="430" rx="170" ry="24" fill="#78350F" opacity="0.2"/>

  <g filter="url(#qbShadow)">
    <!-- Serving Platter -->
    <ellipse cx="250" cy="340" rx="190" ry="85" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="4"/>

    <!-- Green Mint Chutney Bowl -->
    <ellipse cx="140" cy="310" rx="35" ry="20" fill="#E2E8F0"/>
    <ellipse cx="140" cy="308" rx="30" ry="16" fill="#16A34A"/>

    <!-- Sweet Tamarind Chutney Bowl -->
    <ellipse cx="360" cy="310" rx="35" ry="20" fill="#E2E8F0"/>
    <ellipse cx="360" cy="308" rx="30" ry="16" fill="#78350F"/>

    <!-- Samosa 1 (Left Hero) -->
    <path d="M 220 180 C 235 270 230 330 260 340 C 200 350 150 330 140 310 C 130 280 180 220 220 180 Z" 
          fill="url(#samosaDark)"/>
    <path d="M 220 180 C 240 240 280 290 300 330 C 260 340 220 330 220 180 Z" 
          fill="url(#samosaPastry)"/>
    <!-- Crispy Seam Fold -->
    <path d="M 220 180 Q 240 260 260 340" stroke="#92400E" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Samosa 2 (Tucked Behind Right) -->
    <path d="M 300 200 C 340 260 350 300 360 330 C 310 340 270 330 250 310 C 270 260 285 220 300 200 Z" 
          fill="url(#samosaPastry)"/>

    <!-- Crispy Golden Fried Green Chili Garnish -->
    <path d="M 220 350 Q 250 330 280 355" stroke="#15803D" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M 280 355 L 290 360" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`;

// 10. SANDWICH
dishes['sandwich.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="swGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="toastBread" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="40%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="crust" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <filter id="swShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#swGlow)"/>
  <ellipse cx="250" cy="430" rx="160" ry="22" fill="#78350F" opacity="0.2"/>

  <g filter="url(#swShadow)">
    <!-- Bottom Bread Slice Crust -->
    <path d="M 100 330 L 260 400 L 400 310 L 250 250 Z" fill="url(#crust)"/>
    <path d="M 105 325 L 260 395 L 395 305 L 250 245 Z" fill="url(#toastBread)"/>

    <!-- Fillings Layer: Lettuce, Tomato, Cucumber, Cheese -->
    <!-- Lettuce (Green Wavy) -->
    <path d="M 95 320 C 130 340 180 330 260 385 C 320 350 370 330 405 300" stroke="#22C55E" stroke-width="12" stroke-linecap="round" fill="none"/>

    <!-- Tomatoes (Red Slices) -->
    <rect x="140" y="315" width="45" height="12" rx="4" fill="#EF4444" transform="rotate(15 162 321)"/>
    <rect x="230" y="340" width="45" height="12" rx="4" fill="#EF4444" transform="rotate(15 252 346)"/>
    <rect x="310" y="310" width="45" height="12" rx="4" fill="#EF4444" transform="rotate(-15 332 316)"/>

    <!-- Melted Cheddar Cheese Drip -->
    <polygon points="120,305 180,310 160,335 220,325 250,350 280,330 330,345 350,315 380,305 350,295 120,295" fill="#FACC15"/>

    <!-- Top Toast Slice -->
    <path d="M 100 270 L 260 340 L 400 250 L 250 190 Z" fill="url(#crust)"/>
    <path d="M 105 265 L 260 335 L 395 245 L 250 185 Z" fill="url(#toastBread)"/>

    <!-- Diagonal Grill Marks on Toast -->
    <line x1="160" y1="230" x2="220" y2="310" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
    <line x1="210" y1="210" x2="270" y2="290" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
    <line x1="260" y1="200" x2="320" y2="270" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
    <line x1="310" y1="200" x2="360" y2="250" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>

    <!-- Bamboo Pick with Olive -->
    <line x1="250" y1="120" x2="250" y2="250" stroke="#D4A373" stroke-width="5" stroke-linecap="round"/>
    <circle cx="250" cy="140" r="14" fill="#65A30D"/>
    <circle cx="250" cy="140" r="4" fill="#DC2626"/>
  </g>
</svg>`;

// 11. SHAKE
dishes['shake.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="shkGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FCE7F3" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FCE7F3" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="chocShake" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9A3412"/>
      <stop offset="40%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
    <linearGradient id="shakeGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.4"/>
    </linearGradient>
    <filter id="shkShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#451A03" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#shkGlow)"/>
  <ellipse cx="250" cy="445" rx="100" ry="16" fill="#451A03" opacity="0.2"/>

  <!-- Striped Straw & Wafer Stick -->
  <line x1="280" y1="40" x2="230" y2="300" stroke="#EC4899" stroke-width="12" stroke-linecap="round"/>
  <line x1="280" y1="40" x2="230" y2="300" stroke="#FFFFFF" stroke-width="12" stroke-dasharray="12 12" stroke-linecap="round"/>
  <!-- Wafer Stick -->
  <line x1="200" y1="50" x2="240" y2="200" stroke="#D97706" stroke-width="14" stroke-linecap="round"/>
  <line x1="200" y1="50" x2="240" y2="200" stroke="#78350F" stroke-width="14" stroke-dasharray="8 8" stroke-linecap="round"/>

  <g filter="url(#shkShadow)">
    <!-- Retro Sundae Glass Base -->
    <ellipse cx="250" cy="425" rx="70" ry="16" fill="#CBD5E1"/>
    <!-- Glass Stem -->
    <path d="M 235 365 L 235 425 L 265 425 L 265 365 Z" fill="#94A3B8"/>

    <!-- Thick Shake inside Glass -->
    <path d="M 160 170 C 180 280 170 330 215 370 C 235 380 265 380 285 370 C 330 330 320 280 340 170 Z" fill="url(#chocShake)"/>

    <!-- Glass Fluting & Highlights -->
    <path d="M 160 170 C 180 280 170 330 215 370 C 235 380 265 380 285 370 C 330 330 320 280 340 170 Z" fill="url(#shakeGlass)" stroke="#FFFFFF" stroke-width="2"/>

    <!-- Swirled Whipped Cream Mountain Top -->
    <path d="M 160 170 C 145 130 190 110 210 130 C 220 95 270 95 285 125 C 310 110 345 135 340 170 Z" fill="#FFFFFF"/>
    <path d="M 210 130 C 230 75 270 75 290 120 Z" fill="#F8FAFC"/>
    <path d="M 235 90 C 245 60 260 60 265 85 Z" fill="#FFFFFF"/>

    <!-- Chocolate Drizzle Lines on Cream -->
    <path d="M 190 135 Q 230 160 250 140 Q 280 160 310 140" fill="none" stroke="#451A03" stroke-width="5" stroke-linecap="round"/>

    <!-- Bright Red Cherry on Top -->
    <circle cx="250" cy="65" r="14" fill="#DC2626"/>
    <path d="M 252 52 C 265 30 285 35 290 40" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="246" cy="61" r="3" fill="#FECDD3"/>
  </g>
</svg>`;

// 12. WRAP
dishes['wrap.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="wrpGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tortillaSkin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="50%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="chickenTikka" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
    <filter id="wrpShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <circle cx="250" cy="250" r="220" fill="url(#wrpGlow)"/>
  <ellipse cx="250" cy="430" rx="160" ry="22" fill="#78350F" opacity="0.2"/>

  <g filter="url(#wrpShadow)" transform="rotate(-15 250 250)">
    <!-- Main Rolled Burrito / Wrap Body -->
    <path d="M 120 180 L 320 180 L 320 360 L 120 360 Z" fill="url(#tortillaSkin)" rx="40"/>
    <!-- Folded closed bottom -->
    <path d="M 120 320 C 120 380 320 380 320 320 Z" fill="#D97706"/>

    <!-- Charred Grill Stripes on Tortilla -->
    <line x1="130" y1="220" x2="310" y2="220" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>
    <line x1="130" y1="265" x2="310" y2="265" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>
    <line x1="130" y1="310" x2="310" y2="310" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>

    <!-- Diagonal Cut Cross-Section at Top -->
    <ellipse cx="220" cy="180" rx="100" ry="45" fill="#FEF08A"/>
    <ellipse cx="220" cy="180" rx="90" ry="38" fill="#15803D"/>

    <!-- Fillings: Chicken Tikka Chunks, Crisp Lettuce, Red Cabbage, Mayo -->
    <!-- Lettuce Base -->
    <circle cx="190" cy="180" r="24" fill="#22C55E"/>
    <circle cx="250" cy="180" r="26" fill="#4ADE80"/>

    <!-- Tikka Chunks -->
    <rect x="175" y="165" width="30" height="25" rx="6" fill="url(#chickenTikka)"/>
    <rect x="220" y="155" width="35" height="28" rx="8" fill="url(#chickenTikka)"/>
    <rect x="210" y="180" width="32" height="24" rx="6" fill="url(#chickenTikka)"/>

    <!-- Red Cabbage & Onion Rings -->
    <path d="M 155 175 Q 170 160 185 180" stroke="#A855F7" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M 255 165 Q 275 160 280 185" stroke="#A855F7" stroke-width="5" fill="none" stroke-linecap="round"/>

    <!-- Chipotle Mayo Cream Drizzle -->
    <path d="M 180 185 Q 220 170 260 185" stroke="#FEF9C3" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;

// Write all dishes
let count = 0;
for (const [filename, content] of Object.entries(dishes)) {
  fs.writeFileSync(path.join(srcDir, filename), content.trim(), 'utf8');
  fs.writeFileSync(path.join(pubDir, filename), content.trim(), 'utf8');
  console.log('✅ Generated colorful ' + filename);
  count++;
}

console.log('🎉 All ' + count + ' colorful dish SVGs successfully created in src and public assets!');
