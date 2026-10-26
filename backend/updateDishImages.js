const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const Dish = require('./models/Dish');

const dishExactPhotoMap = {
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

function getPhotoByName(name) {
  const lower = (name || '').toLowerCase().trim();
  if (dishExactPhotoMap[lower]) return dishExactPhotoMap[lower];

  if (lower.includes('tea')) return '/assets/dishes/tea.webp';
  if (lower.includes('coffee') && lower.includes('hazelnut') && lower.includes('hot')) return '/assets/dishes/coffee_hazelnut_hot.webp';
  if (lower.includes('coffee') && lower.includes('cold')) return '/assets/dishes/mocktail_cold_coffee.webp';
  if (lower.includes('coffee')) return '/assets/dishes/coffee.webp';
  if (lower.includes('samosa')) return '/assets/dishes/samosa.webp';
  if (lower.includes('bread pakoda') || lower.includes('pakoda')) return '/assets/dishes/bread_pakoda.webp';
  if (lower.includes('jalebi')) return '/assets/dishes/jalebi.webp';
  if (lower.includes('imarti')) return '/assets/dishes/imarti.webp';
  if (lower.includes('aloo patties')) return '/assets/dishes/aloo_patties.webp';
  if (lower.includes('paneer patties') || lower.includes('patties')) return '/assets/dishes/paneer_patties.webp';
  if (lower.includes('salted fries')) return '/assets/dishes/fries_salted.webp';
  if (lower.includes('peri peri')) return '/assets/dishes/fries_periperi.webp';
  if (lower.includes('cheesy fries')) return '/assets/dishes/fries_cheesy.webp';
  if (lower.includes('butter chicken fries')) return '/assets/dishes/fries_butter_chicken.webp';
  if (lower.includes('animal fries')) return '/assets/dishes/fries_animal.webp';
  if (lower.includes('fry') || lower.includes('fries')) return '/assets/dishes/fries_salted.webp';
  if (lower.includes('classic corn dog')) return '/assets/dishes/corndog_classic.webp';
  if (lower.includes('potato corn dog') || lower.includes('fry guy')) return '/assets/dishes/corndog_potato.webp';
  if (lower.includes('chick pick') || (lower.includes('corn dog') && lower.includes('chicken'))) return '/assets/dishes/corndog_chicken.webp';
  if (lower.includes('wai wai') || lower.includes('ramen corn dog')) return '/assets/dishes/corndog_ramen.webp';
  if (lower.includes('corn dog') || lower.includes('corndog')) return '/assets/dishes/corndog_classic.webp';
  if (lower.includes('burger') && (lower.includes('non-veg') || lower.includes('chicken'))) return '/assets/dishes/burger_chicken.webp';
  if (lower.includes('burger')) return '/assets/dishes/burger_veg.webp';
  if (lower.includes('wrap') && (lower.includes('non-veg') || lower.includes('chicken'))) return '/assets/dishes/wrap_chicken.webp';
  if (lower.includes('wrap')) return '/assets/dishes/wrap_veg.webp';
  if (lower.includes('sandwich') && (lower.includes('non-veg') || lower.includes('chicken'))) return '/assets/dishes/sandwich_chicken.webp';
  if (lower.includes('sandwich')) return '/assets/dishes/sandwich_veg.webp';
  if (lower.includes('alfredo') && (lower.includes('non-veg') || lower.includes('chicken'))) return '/assets/dishes/pasta_alfredo_chicken.webp';
  if (lower.includes('alfredo')) return '/assets/dishes/pasta_alfredo_veg.webp';
  if (lower.includes('makhani') && lower.includes('pasta') && (lower.includes('non-veg') || lower.includes('chicken'))) return '/assets/dishes/pasta_makhani_chicken.webp';
  if (lower.includes('makhani') && lower.includes('pasta')) return '/assets/dishes/pasta_makhani_veg.webp';
  if (lower.includes('red sauce') && (lower.includes('non-veg') || lower.includes('chicken'))) return '/assets/dishes/pasta_red_chicken.webp';
  if (lower.includes('red sauce') || lower.includes('pasta')) return '/assets/dishes/pasta_red_veg.webp';
  if (lower.includes('egg maggie')) return '/assets/dishes/maggie_egg.webp';
  if (lower.includes('cheesy maggie')) return '/assets/dishes/maggie_cheesy.webp';
  if (lower.includes('korean maggie')) return '/assets/dishes/maggie_korean.webp';
  if (lower.includes('makhani maggie')) return '/assets/dishes/maggie_makhani.webp';
  if (lower.includes('maggie') || lower.includes('maggi')) return '/assets/dishes/maggie_veg.webp';
  if (lower.includes('masala chaska')) return '/assets/dishes/byob_masala.webp';
  if (lower.includes('cheesy masala') || lower.includes('cheesy chips')) return '/assets/dishes/byob_cheesy.webp';
  if (lower.includes('meaty heaven') || lower.includes('meat chips')) return '/assets/dishes/byob_meat.webp';
  if (lower.includes('republic special')) return '/assets/dishes/byob_special.webp';
  if (lower.includes('byob') || lower.includes('chips')) return '/assets/dishes/byob_custom.webp';
  if (lower.includes('strawberry')) return '/assets/dishes/mocktail_strawberry.webp';
  if (lower.includes('mango')) return '/assets/dishes/mocktail_mango.webp';
  if (lower.includes('watermelon')) return '/assets/dishes/mocktail_watermelon.webp';
  if (lower.includes('pina colada') || lower.includes('piña')) return '/assets/dishes/mocktail_pinacolada.webp';
  if (lower.includes('jaljeera')) return '/assets/dishes/mocktail_jaljeera.webp';
  if (lower.includes('mojito') || lower.includes('mocktail')) return '/assets/dishes/mocktail_mojito.webp';
  if (lower.includes('chocolate')) return '/assets/dishes/shake_chocolate.webp';
  if (lower.includes('oreo')) return '/assets/dishes/shake_oreo.webp';
  if (lower.includes('peanut butter')) return '/assets/dishes/shake_peanut_butter.webp';
  if (lower.includes('matcha')) return '/assets/dishes/shake_matcha.webp';
  if (lower.includes('shake')) return '/assets/dishes/shake_chocolate.webp';

  return '/assets/dishes/burger_veg.webp';
}

async function updateAllDishPhotos(isInline = false) {
  try {
    if (!isInline) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB Atlas.');
    }

    const dishes = await Dish.find({});
    let updatedCount = 0;

    for (const dish of dishes) {
      const targetPhoto = getPhotoByName(dish.name);
      if (dish.image !== targetPhoto) {
        dish.image = targetPhoto;
        await dish.save();
        updatedCount++;
      }
    }

    console.log(`Successfully updated ${updatedCount} / ${dishes.length} dishes to high-res .webp food photographs!`);
    if (!isInline) {
      process.exit(0);
    }
    return updatedCount;
  } catch (err) {
    console.error('Error updating dish photos:', err);
    if (!isInline) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  updateAllDishPhotos();
}

module.exports = { updateAllDishPhotos, getPhotoByName };
