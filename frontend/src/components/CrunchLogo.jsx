import React from 'react';

/**
 * CrunchLogo - Official Crunch Republic Brand Component
 * 
 * Supporting authentic brand typography matching the official restaurant menu poster:
 * - Mark: Monogram 'CR' vector symbol
 * - Wordmark: 'CRUNCH' + '— ★ REPUBLIC ★ —' + 'BUILD YOUR OWN. TOP IT. LOVE IT.'
 * - Full: Horizontal lockup (Mark + Wordmark)
 * - Crest: Vertical centered lockup (Mark on top + Wordmark below)
 * - Badge: Luxury cafe crest badge
 * 
 * @param {'mark' | 'wordmark' | 'full' | 'crest' | 'vertical' | 'badge'} variant
 * @param {string} className - Optional Tailwind container classes
 * @param {string} color - Mark fill color (defaults to brand crimson #B91C1C)
 * @param {boolean} isDark - Invert typography for dark surfaces (white text, gold stars, red accents)
 * @param {boolean} showTagline - Whether to include 'BUILD YOUR OWN. TOP IT. LOVE IT.'
 * @param {'sm' | 'md' | 'lg' | 'xl'} size - Scale preset for wordmark typography
 * @param {'start' | 'center' | 'end'} align - Alignment of wordmark lines
 */
const CrunchLogo = ({
  variant = 'mark',
  className = '',
  color = '#B91C1C',
  isDark = false,
  showTagline = true,
  size = 'md',
  align = 'start',
  markClassName = '',
}) => {
  // 1. Pure Monogram Symbol Mark (Background-Free Official CR Emblem from logo-original.png)
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 222 218"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className || 'w-8 h-8'}
      >
        <path
          d="M 103.500 11.646 C 92.445 12.775, 76.831 17.625, 68.011 22.671 C 52.092 31.775, 36.742 48.278, 28.891 64.728 C 19.662 84.065, 17.339 107.418, 22.532 128.651 C 24.676 137.416, 31.711 152.440, 37.413 160.430 C 55.739 186.111, 90.616 201.921, 120.428 198.061 C 130.390 196.771, 135.016 195.361, 134.971 193.629 C 134.941 192.469, 119.271 170.166, 115.257 165.569 C 113.377 163.416, 112.155 163, 107.717 163 C 95.088 163, 79.962 156.256, 70.147 146.249 C 59.539 135.435, 54 121.219, 54 104.809 C 54 88.294, 59.779 74.289, 71.500 62.399 C 85.368 48.331, 104.726 42.233, 123.201 46.113 C 132.470 48.059, 142.521 53.374, 149.371 59.952 C 152.835 63.278, 156.092 66, 156.607 66 C 157.462 66, 169.414 54.111, 176.424 46.287 L 179.302 43.075 175.678 38.652 C 171.665 33.755, 161.494 25.920, 152.925 21.126 C 147.351 18.007, 139.475 15.161, 131 13.202 C 125.744 11.988, 109.277 11.056, 103.500 11.646 M 88.151 87.318 C 87.287 88.359, 87.042 97.021, 87.235 119.620 L 87.500 150.500 102.170 151 C 110.239 151.275, 117.200 151.860, 117.638 152.301 C 118.541 153.208, 133.191 173.761, 147.488 194.180 C 152.757 201.705, 158.358 209.242, 159.935 210.930 L 162.802 214 179.151 213.985 C 188.143 213.976, 196.104 213.586, 196.843 213.118 C 197.871 212.467, 196.583 209.986, 191.343 202.525 C 187.579 197.167, 181.011 187.787, 176.747 181.679 L 168.994 170.575 173.383 166.037 C 183.020 156.075, 187.259 145.720, 187.337 131.946 C 187.381 124.170, 186.953 121.285, 185.033 116.446 C 179.669 102.920, 169.132 92.469, 156.649 88.296 C 149.483 85.900, 90.032 85.052, 88.151 87.318 M 118.469 118.220 C 118.179 118.975, 118.068 126.096, 118.221 134.046 L 118.500 148.500 131 148.789 C 145.473 149.124, 146.776 148.901, 150.960 145.381 C 159.322 138.344, 158.700 126.352, 149.619 119.562 C 147.202 117.755, 145.138 117.460, 132.928 117.174 C 121.820 116.915, 118.889 117.127, 118.469 118.220"
          fill={isDark ? '#FFFFFF' : (color || '#B91C1C')}
          fillRule="evenodd"
        />
      </svg>
    );
  }

  // 2. Official Wordmark (CRUNCH + — ★ REPUBLIC ★ —)
  if (variant === 'wordmark') {
    const scaleClasses = {
      xs: 'h-6',
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-14',
      xl: 'h-18',
    };
    const h = scaleClasses[size] || 'h-10';

    return (
      <div className={`inline-flex flex-col select-none ${className}`}>
        <svg
          viewBox="0 0 520 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${h} w-auto`}
        >
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Montserrat:wght@900&display=swap');
              .crunch-svg-text {
                font-family: 'Alfa Slab One', 'Impact', 'Arial Black', sans-serif;
                font-size: 82px;
                letter-spacing: 0.05em;
                font-weight: 900;
                text-anchor: middle;
              }
              .republic-svg-text {
                font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 21px;
                letter-spacing: 0.34em;
                font-weight: 900;
                text-anchor: middle;
              }
            `}
          </style>

          {/* Line 1: CRUNCH */}
          <text
            x="260"
            y="76"
            fill={isDark ? '#EF4444' : color || '#B91C1C'}
            className="crunch-svg-text"
          >
            CRUNCH
          </text>

          {/* Line 2: — ★  REPUBLIC  ★ — */}
          <g transform="translate(0, 114)">
            {/* Left Dash */}
            <line
              x1="34"
              y1="-7"
              x2="64"
              y2="-7"
              stroke={isDark ? '#EF4444' : color || '#B91C1C'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Left Red Star */}
            <polygon
              points="78,-16 81,-8 90,-8 83,-3 85,6 78,1 71,6 73,-3 66,-8 75,-8"
              fill={isDark ? '#EF4444' : color || '#B91C1C'}
            />
            {/* Center: REPUBLIC */}
            <text
              x="270"
              y="0"
              fill={isDark ? '#FFFFFF' : '#0F172A'}
              className="republic-svg-text"
            >
              REPUBLIC
            </text>
            {/* Right Red Star */}
            <polygon
              points="442,-16 445,-8 454,-8 447,-3 449,6 442,1 435,6 437,-3 430,-8 439,-8"
              fill={isDark ? '#EF4444' : color || '#B91C1C'}
            />
            {/* Right Dash */}
            <line
              x1="456"
              y1="-7"
              x2="486"
              y2="-7"
              stroke={isDark ? '#EF4444' : color || '#B91C1C'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {showTagline && (
          <p
            className={`font-black uppercase tracking-widest text-[9px] mt-1 ${
              align === 'center' ? 'text-center' : align === 'end' ? 'text-right' : 'text-left'
            } ${isDark ? 'text-stone-300' : 'text-brand-600'}`}
          >
            BUILD YOUR OWN. TOP IT. LOVE IT.
          </p>
        )}
      </div>
    );
  }

  // 3. Full Horizontal Brand Lockup (Logo Mark + Authentic Wordmark)
  if (variant === 'full' || variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <CrunchLogo 
          variant="mark" 
          color={color} 
          className={markClassName || 'w-10 h-10 shrink-0 drop-shadow-sm'} 
        />
        <CrunchLogo 
          variant="wordmark" 
          isDark={isDark} 
          showTagline={showTagline} 
          size={size} 
          align="start" 
        />
      </div>
    );
  }

  // 4. Vertical Centered Brand Emblem (Logo Mark Above Wordmark)
  if (variant === 'crest' || variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 select-none ${className}`}>
        <CrunchLogo 
          variant="mark" 
          color={color} 
          className={markClassName || 'w-14 h-14 shrink-0 drop-shadow-sm'} 
        />
        <CrunchLogo 
          variant="wordmark" 
          isDark={isDark} 
          showTagline={showTagline} 
          size={size} 
          align="center" 
        />
      </div>
    );
  }

  // 5. Luxury Cafe Crest Badge (Squircle + Gold rim)
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-rose-600 to-brand-800 p-0.5 shadow-md shadow-brand-900/30 ${className}`}>
      <div className="w-full h-full bg-stone-950/20 rounded-[14px] backdrop-blur-xs flex items-center justify-center p-1.5 border border-amber-400/30">
        <CrunchLogo variant="mark" color="#FFFFFF" className="w-full h-full" />
      </div>
    </div>
  );
};

export default CrunchLogo;
