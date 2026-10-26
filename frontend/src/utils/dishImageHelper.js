// High-Resolution WebP Food Photography Catalog Mapping for Crunch Republic
export const dishPhotoMap = {
  // Tea & Coffee
  'tea': '/assets/dishes/tea.webp',
  'hot coffee': '/assets/dishes/coffee.webp',
  'hazelnut coffee (hot specialty)': '/assets/dishes/coffee_hazelnut_hot.webp',
  'hazelnut cold coffee': '/assets/dishes/mocktail_cold_coffee.webp',

  // Quick Bites
  'samosa': '/assets/dishes/samosa.webp',
  'bread pakoda': '/assets/dishes/bread_pakoda.webp',
  'jalebi (portion / 250g)': '/assets/dishes/jalebi.webp',
  'jalebi': '/assets/dishes/jalebi.webp',
  'imarti (per pc)': '/assets/dishes/imarti.webp',
  'imarti': '/assets/dishes/imarti.webp',
  'aloo patties': '/assets/dishes/aloo_patties.webp',
  'paneer patties': '/assets/dishes/paneer_patties.webp',

  // Fries
  'classic salted fries': '/assets/dishes/fries_salted.webp',
  'peri peri fries': '/assets/dishes/fries_periperi.webp',
  'cheesy fries': '/assets/dishes/fries_cheesy.webp',
  'butter chicken fries': '/assets/dishes/fries_butter_chicken.webp',
  'the crunch republic special (animal fries)': '/assets/dishes/fries_animal.webp',

  // Corn Dogs
  'classic corn dog': '/assets/dishes/corndog_classic.webp',
  'fry guy corn dog': '/assets/dishes/corndog_potato.webp',
  'chick pick corn dog': '/assets/dishes/corndog_chicken.webp',
  'wai wai corn dog': '/assets/dishes/corndog_ramen.webp',

  // Burgers
  'crunch republic special burger (veg)': '/assets/dishes/burger_veg.webp',
  'crunch republic special burger (non-veg)': '/assets/dishes/burger_chicken.webp',

  // Wraps
  'crunch republic special wrap (veg)': '/assets/dishes/wrap_veg.webp',
  'crunch republic special wrap (non-veg)': '/assets/dishes/wrap_chicken.webp',

  // Sandwiches
  'crunch republic special sandwich (veg)': '/assets/dishes/sandwich_veg.webp',
  'crunch republic special sandwich (non-veg)': '/assets/dishes/sandwich_chicken.webp',

  // Pasta
  'makhani sauce pasta (veg)': '/assets/dishes/pasta_makhani_veg.webp',
  'makhani sauce pasta (non-veg)': '/assets/dishes/pasta_makhani_chicken.webp',
  'alfredo pasta (veg)': '/assets/dishes/pasta_alfredo_veg.webp',
  'alfredo pasta (non-veg)': '/assets/dishes/pasta_alfredo_chicken.webp',
  'red sauce pasta (veg)': '/assets/dishes/pasta_red_veg.webp',
  'red sauce pasta (non-veg)': '/assets/dishes/pasta_red_chicken.webp',

  // Maggie
  'veg maggie': '/assets/dishes/maggie_veg.webp',
  'cheesy maggie': '/assets/dishes/maggie_cheesy.webp',
  'korean maggie': '/assets/dishes/maggie_korean.webp',
  'makhani maggie': '/assets/dishes/maggie_makhani.webp',
  'egg maggie': '/assets/dishes/maggie_egg.webp',

  // BYOB Chips
  'byob - masala chaska': '/assets/dishes/byob_masala.webp',
  'byob - cheesy masala': '/assets/dishes/byob_cheesy.webp',
  'build your own bag (byob custom)': '/assets/dishes/byob_custom.webp',
  'byob - the crunch republic special': '/assets/dishes/byob_special.webp',
  'byob - meaty heaven': '/assets/dishes/byob_meat.webp',

  // Mocktails
  'virgin mojito': '/assets/dishes/mocktail_mojito.webp',
  'strawberry mojito': '/assets/dishes/mocktail_strawberry.webp',
  'mango punch': '/assets/dishes/mocktail_mango.webp',
  'watermelon mojito': '/assets/dishes/mocktail_watermelon.webp',
  'virgin piña colada': '/assets/dishes/mocktail_pinacolada.webp',
  'jaljeera': '/assets/dishes/mocktail_jaljeera.webp',

  // Thick Shakes
  'chocolate heaven thick shake': '/assets/dishes/shake_chocolate.webp',
  'oreo cookies & cream shake': '/assets/dishes/shake_oreo.webp',
  'creamy peanut butter cup shake': '/assets/dishes/shake_peanut_butter.webp',
  'matcha bliss shake': '/assets/dishes/shake_matcha.webp',

  // Combos
  'crunch supreme value combo': '/assets/dishes/burger_veg.webp',
};

const defaultDishPhoto = '/assets/dishes/burger_veg.webp';

/**
 * Returns the authentic high-resolution food photograph for any dish:
 * 1. Checks if dish.image exists and fixes outdated .svg or .jpg references to .webp.
 * 2. Uses exact dish name matching to find the high-res food photo.
 * 3. Falls back to smart keyword detection.
 */
export function getDishImage(dish) {
  if (!dish) return defaultDishPhoto;

  const rawImage = typeof dish === 'string' ? dish : dish?.image;
  const name = (typeof dish === 'string' ? '' : dish?.name || '').toLowerCase().trim();
  const categoryName = (typeof dish === 'string' ? '' : dish?.categoryName || (dish?.category && dish?.category.name) || '').toLowerCase().trim();

  // If dish has a valid uploaded or external image that is NOT a cartoon SVG
  if (rawImage && typeof rawImage === 'string' && rawImage.trim() !== '') {
    const trimmed = rawImage.trim();

    // If it's a cartoon SVG, override with actual real photo
    if (!trimmed.endsWith('.svg')) {
      // Auto-correct .jpg/.png to .webp for local assets
      if (trimmed.startsWith('/assets/dishes/') && (trimmed.endsWith('.jpg') || trimmed.endsWith('.png'))) {
        return trimmed.replace(/\.(jpg|png)$/, '.webp');
      }
      return trimmed;
    }
  }

  // 1. Exact Name Match
  if (name && dishPhotoMap[name]) {
    return dishPhotoMap[name];
  }

  // 2. Keyword-based matching
  const target = `${name} ${categoryName}`;

  if (target.includes('tea')) return '/assets/dishes/tea.webp';
  if (target.includes('coffee') && target.includes('hazelnut') && target.includes('hot')) return '/assets/dishes/coffee_hazelnut_hot.webp';
  if (target.includes('coffee') && target.includes('cold')) return '/assets/dishes/mocktail_cold_coffee.webp';
  if (target.includes('coffee')) return '/assets/dishes/coffee.webp';

  if (target.includes('samosa')) return '/assets/dishes/samosa.webp';
  if (target.includes('bread pakoda') || target.includes('pakoda')) return '/assets/dishes/bread_pakoda.webp';
  if (target.includes('jalebi')) return '/assets/dishes/jalebi.webp';
  if (target.includes('imarti')) return '/assets/dishes/imarti.webp';
  if (target.includes('aloo patties')) return '/assets/dishes/aloo_patties.webp';
  if (target.includes('paneer patties') || target.includes('patties')) return '/assets/dishes/paneer_patties.webp';

  if (target.includes('salted fries')) return '/assets/dishes/fries_salted.webp';
  if (target.includes('peri peri')) return '/assets/dishes/fries_periperi.webp';
  if (target.includes('cheesy fries')) return '/assets/dishes/fries_cheesy.webp';
  if (target.includes('butter chicken fries')) return '/assets/dishes/fries_butter_chicken.webp';
  if (target.includes('animal fries')) return '/assets/dishes/fries_animal.webp';
  if (target.includes('fries') || target.includes('fry')) return '/assets/dishes/fries_salted.webp';

  if (target.includes('classic corn dog')) return '/assets/dishes/corndog_classic.webp';
  if (target.includes('potato corn dog') || target.includes('fry guy')) return '/assets/dishes/corndog_potato.webp';
  if (target.includes('chick pick') || (target.includes('corn dog') && target.includes('chicken'))) return '/assets/dishes/corndog_chicken.webp';
  if (target.includes('wai wai') || target.includes('ramen corn dog')) return '/assets/dishes/corndog_ramen.webp';
  if (target.includes('corn dog') || target.includes('corndog')) return '/assets/dishes/corndog_classic.webp';

  if (target.includes('burger') && (target.includes('non-veg') || target.includes('chicken'))) return '/assets/dishes/burger_chicken.webp';
  if (target.includes('burger')) return '/assets/dishes/burger_veg.webp';

  if (target.includes('wrap') && (target.includes('non-veg') || target.includes('chicken'))) return '/assets/dishes/wrap_chicken.webp';
  if (target.includes('wrap')) return '/assets/dishes/wrap_veg.webp';

  if (target.includes('sandwich') && (target.includes('non-veg') || target.includes('chicken'))) return '/assets/dishes/sandwich_chicken.webp';
  if (target.includes('sandwich')) return '/assets/dishes/sandwich_veg.webp';

  if (target.includes('alfredo') && (target.includes('non-veg') || target.includes('chicken'))) return '/assets/dishes/pasta_alfredo_chicken.webp';
  if (target.includes('alfredo')) return '/assets/dishes/pasta_alfredo_veg.webp';
  if (target.includes('makhani') && target.includes('pasta') && (target.includes('non-veg') || target.includes('chicken'))) return '/assets/dishes/pasta_makhani_chicken.webp';
  if (target.includes('makhani') && target.includes('pasta')) return '/assets/dishes/pasta_makhani_veg.webp';
  if (target.includes('red sauce') && (target.includes('non-veg') || target.includes('chicken'))) return '/assets/dishes/pasta_red_chicken.webp';
  if (target.includes('red sauce') || target.includes('pasta')) return '/assets/dishes/pasta_red_veg.webp';

  if (target.includes('egg maggie')) return '/assets/dishes/maggie_egg.webp';
  if (target.includes('cheesy maggie')) return '/assets/dishes/maggie_cheesy.webp';
  if (target.includes('korean maggie')) return '/assets/dishes/maggie_korean.webp';
  if (target.includes('makhani maggie')) return '/assets/dishes/maggie_makhani.webp';
  if (target.includes('maggie') || target.includes('maggi')) return '/assets/dishes/maggie_veg.webp';

  if (target.includes('masala chaska')) return '/assets/dishes/byob_masala.webp';
  if (target.includes('cheesy masala') || target.includes('cheesy chips')) return '/assets/dishes/byob_cheesy.webp';
  if (target.includes('meaty heaven') || target.includes('meat chips')) return '/assets/dishes/byob_meat.webp';
  if (target.includes('republic special')) return '/assets/dishes/byob_special.webp';
  if (target.includes('byob') || target.includes('chips')) return '/assets/dishes/byob_custom.webp';

  if (target.includes('strawberry')) return '/assets/dishes/mocktail_strawberry.webp';
  if (target.includes('mango')) return '/assets/dishes/mocktail_mango.webp';
  if (target.includes('watermelon')) return '/assets/dishes/mocktail_watermelon.webp';
  if (target.includes('pina colada') || target.includes('piña')) return '/assets/dishes/mocktail_pinacolada.webp';
  if (target.includes('jaljeera')) return '/assets/dishes/mocktail_jaljeera.webp';
  if (target.includes('mojito') || target.includes('mocktail')) return '/assets/dishes/mocktail_mojito.webp';

  if (target.includes('chocolate')) return '/assets/dishes/shake_chocolate.webp';
  if (target.includes('oreo')) return '/assets/dishes/shake_oreo.webp';
  if (target.includes('peanut butter')) return '/assets/dishes/shake_peanut_butter.webp';
  if (target.includes('matcha')) return '/assets/dishes/shake_matcha.webp';
  if (target.includes('shake')) return '/assets/dishes/shake_chocolate.webp';

  return defaultDishPhoto;
}

export default getDishImage;
