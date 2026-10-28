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
  'crunch republic special cappuccino': '/assets/dishes/cappuccino_special.webp',

  // Quick Bites & Chaat
  'samosa': '/assets/dishes/samosa.webp',
  'bread pakoda': '/assets/dishes/bread_pakoda.webp',
  'jalebi (portion / 250g)': '/assets/dishes/jalebi.webp',
  'jalebi': '/assets/dishes/jalebi.webp',
  'rabri jalebi': '/assets/dishes/rabri_jalebi.webp',
  'imarti (per pc)': '/assets/dishes/imarti.webp',
  'imarti': '/assets/dishes/imarti.webp',
  'rabri imarti': '/assets/dishes/rabri_imarti.webp',
  'aloo patties': '/assets/dishes/aloo_patties.webp',
  'paneer patties': '/assets/dishes/paneer_patties.webp',
  'nachos corn chaat': '/assets/dishes/nachos_corn_chaat.webp',
  'bhelpuri': '/assets/dishes/bhelpuri.webp',

  // Fries
  'classic salted fries': '/assets/dishes/fries_salted.webp',
  'peri peri fries': '/assets/dishes/fries_periperi.webp',
  'cheesy fries': '/assets/dishes/fries_cheesy.webp',
  'butter chicken fries': '/assets/dishes/fries_butter_chicken.webp',
  'the crunch republic special (animal fries)': '/assets/dishes/fries_animal.webp',
  'animal style fries': '/assets/dishes/fries_animal.webp',

  // Corn Dogs
  'classic corn dog': '/assets/dishes/corndog_classic.webp',
  'fry guy corn dog': '/assets/dishes/corndog_potato.webp',
  'chick pick corn dog': '/assets/dishes/corndog_chicken.webp',
  'wai wai corn dog': '/assets/dishes/corndog_ramen.webp',

  // Burgers
  'crunch republic special burger (veg)': '/assets/dishes/burger_veg.webp',
  'crunch republic special burger (non-veg)': '/assets/dishes/burger_chicken.webp',
  'paneer burger (with american coleslaw)': '/assets/dishes/burger_paneer.webp',

  // Wraps
  'crunch republic special wrap (veg)': '/assets/dishes/wrap_veg.webp',
  'crunch republic special wrap (non-veg)': '/assets/dishes/wrap_chicken.webp',

  // Sandwiches
  'crunch republic special sandwich (veg)': '/assets/dishes/sandwich_veg.webp',
  'crunch republic special sandwich (non-veg)': '/assets/dishes/sandwich_chicken.webp',
  'paneer bahubali sandwich': '/assets/dishes/sandwich_bahubali.webp',
  'paneer stuffed kulcha': '/assets/dishes/kulcha_stuffed.webp',

  // Pasta
  'makhani sauce pasta (veg)': '/assets/dishes/pasta_makhani_veg.webp',
  'makhani sauce pasta (non-veg)': '/assets/dishes/pasta_makhani_chicken.webp',
  'alfredo pasta (veg)': '/assets/dishes/pasta_alfredo_veg.webp',
  'alfredo pasta (non-veg)': '/assets/dishes/pasta_alfredo_chicken.webp',
  'red sauce pasta (veg)': '/assets/dishes/pasta_red_veg.webp',
  'red sauce pasta (non-veg)': '/assets/dishes/pasta_red_chicken.webp',
  'desi macaroni': '/assets/dishes/desi_macaroni.webp',

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
  'blue ocean mocktail': '/assets/dishes/mocktail_blue_ocean.webp',

  // Thick Shakes
  'chocolate heaven thick shake': '/assets/dishes/shake_chocolate.webp',
  'oreo cookies & cream shake': '/assets/dishes/shake_oreo.webp',
  'creamy peanut butter cup shake': '/assets/dishes/shake_peanut_butter.webp',
  'matcha bliss shake': '/assets/dishes/shake_matcha.webp',

  // 1. RICE (Indo-Chinese)
  'schezwan rice (veg)': '/assets/dishes/rice_schezwan_veg.webp',
  'schezwan rice (egg)': '/assets/dishes/rice_schezwan_egg.webp',
  'schezwan rice (non-veg)': '/assets/dishes/rice_schezwan_chicken.webp',
  'street style fried rice (veg)': '/assets/dishes/rice_fried_veg.webp',
  'street style fried rice (egg)': '/assets/dishes/rice_fried_egg.webp',
  'street style fried rice (non-veg)': '/assets/dishes/rice_fried_chicken.webp',
  'burnt garlic rice (veg)': '/assets/dishes/rice_burnt_garlic_veg.webp',
  'burnt garlic rice (egg)': '/assets/dishes/rice_burnt_garlic_egg.webp',
  'burnt garlic rice (non-veg)': '/assets/dishes/rice_burnt_garlic_chicken.webp',

  // 2. NOODLES (Indo-Chinese)
  'street style noodles (veg)': '/assets/dishes/noodles_street_veg.webp',
  'street style noodles (egg)': '/assets/dishes/noodles_street_egg.webp',
  'street style noodles (non-veg)': '/assets/dishes/noodles_street_chicken.webp',
  'chilli garlic noodles (veg)': '/assets/dishes/noodles_chilli_garlic_veg.webp',
  'chilli garlic noodles (egg)': '/assets/dishes/noodles_chilli_garlic_egg.webp',
  'chilli garlic noodles (non-veg)': '/assets/dishes/noodles_chilli_garlic_chicken.webp',
  'singapuri noodles (veg)': '/assets/dishes/noodles_singapuri_veg.webp',
  'singapuri noodles (egg)': '/assets/dishes/noodles_singapuri_egg.webp',
  'singapuri noodles (non-veg)': '/assets/dishes/noodles_singapuri_chicken.webp',
  'hakka noodles (veg)': '/assets/dishes/noodles_hakka_veg.webp',
  'hakka noodles (egg)': '/assets/dishes/noodles_hakka_egg.webp',
  'hakka noodles (non-veg)': '/assets/dishes/noodles_hakka_chicken.webp',
  'schezwan noodles (veg)': '/assets/dishes/noodles_schezwan_veg.webp',
  'schezwan noodles (egg)': '/assets/dishes/noodles_schezwan_egg.webp',
  'schezwan noodles (non-veg)': '/assets/dishes/noodles_schezwan_chicken.webp',

  // 3. SNACKS (CHINESE) - VEG
  'chilli paneer (dry/gravy)': '/assets/dishes/chilli_paneer.webp',
  'veg manchurian (dry/gravy)': '/assets/dishes/manchurian_veg.webp',
  'chilli mushroom': '/assets/dishes/chilli_mushroom.webp',
  'stuffed mushroom': '/assets/dishes/stuffed_mushroom.webp',
  'chilli garlic soya chaap': '/assets/dishes/chilli_garlic_chaap.webp',
  'crispy corn': '/assets/dishes/crispy_corn.webp',
  'veg stir fry': '/assets/dishes/veg_stir_fry.webp',
  'chilli potato': '/assets/dishes/chilli_potato.webp',
  'honey chilli potato': '/assets/dishes/honey_chilli_potato.webp',

  // 4. SNACKS (CHINESE) - NON-VEG
  'hunan chilli chicken (dry/gravy)': '/assets/dishes/hunan_chilli_chicken.webp',
  'chicken manchurian (dry/gravy)': '/assets/dishes/chicken_manchurian.webp',
  'garlic chicken (dry/gravy)': '/assets/dishes/garlic_chicken.webp',
  'kung pao chicken': '/assets/dishes/kung_pao_chicken.webp',
  'dynamite chicken': '/assets/dishes/dynamite_chicken.webp',
  'korean bbq chicken': '/assets/dishes/korean_bbq_chicken.webp',
  'fried chicken tenders': '/assets/dishes/chicken_tenders.webp',
  'thai chicken popcorn': '/assets/dishes/thai_chicken_popcorn.webp',

  // 5. DUMPLINGS
  'veg dumplings (momos)': '/assets/dishes/veg_dumplings.webp',
  'non-veg dumplings (chicken momos)': '/assets/dishes/nonveg_dumplings.webp',
  'mutton wontons': '/assets/dishes/mutton_wontons.webp',

  // 6. TANDOOR
  'malai chaap': '/assets/dishes/malai_chaap.webp',
  'tandoori chaap': '/assets/dishes/tandoori_chaap.webp',
  'paneer tikka': '/assets/dishes/paneer_tikka.webp',
  'tandoori mushroom': '/assets/dishes/tandoori_mushroom.webp',
  'achari chaap': '/assets/dishes/achari_chaap.webp',
  'lemon mint chaap': '/assets/dishes/lemon_mint_chaap.webp',

  // 7. ROLLS
  'chaap / paneer tandoori roll': '/assets/dishes/chaap_paneer_roll.webp',
  'cheese cigar roll': '/assets/dishes/cheese_cigar_roll.webp',
  'spring roll': '/assets/dishes/spring_roll.webp',

  // 8. KEBABS
  'chicken seekh kebab': '/assets/dishes/chicken_seekh_kebab.webp',
  'mutton seekh kebab': '/assets/dishes/mutton_seekh_kebab.webp',

  // 9. SOUPS
  'sweet corn soup': '/assets/dishes/sweet_corn_soup.webp',
  'mushroom soup': '/assets/dishes/mushroom_soup.webp',
  'chicken soup': '/assets/dishes/chicken_soup.webp',
  'hot & sour soup': '/assets/dishes/hot_sour_soup.webp',
  'mutton kharodey soup': '/assets/dishes/mutton_kharodey_soup.webp',

  // 10. BOWL-O-MANIA
  'chole rice bowl': '/assets/dishes/chole_rice_bowl.webp',
  'kadi rice bowl': '/assets/dishes/kadi_rice_bowl.webp',
  'palak paneer rice bowl': '/assets/dishes/palak_paneer_rice_bowl.webp',
  'shahi paneer rice bowl': '/assets/dishes/shahi_paneer_rice_bowl.webp',
  'mexican rice bowl': '/assets/dishes/mexican_rice_bowl.webp',
  'butter chicken rice bowl': '/assets/dishes/butter_chicken_rice_bowl.webp',
  'chole bhature (2 pcs)': '/assets/dishes/chole_bhature.webp',
  'paneer chole bhature (2 pcs)': '/assets/dishes/paneer_chole_bhature.webp',
  'poori sabzi (4 pcs)': '/assets/dishes/poori_sabzi.webp',

  // Combos
  'crunch supreme value combo': '/assets/dishes/combo_feast.webp',
};

function getPhotoByName(dishName) {
  const lower = dishName.toLowerCase().trim();
  if (dishExactPhotoMap[lower]) {
    return dishExactPhotoMap[lower];
  }

  // 1. Specific Bowl-O-Mania detection
  if (lower.includes('palak paneer') && lower.includes('bowl')) return '/assets/dishes/palak_paneer_rice_bowl.webp';
  if (lower.includes('shahi paneer') && lower.includes('bowl')) return '/assets/dishes/shahi_paneer_rice_bowl.webp';
  if (lower.includes('kadi') && lower.includes('bowl')) return '/assets/dishes/kadi_rice_bowl.webp';
  if (lower.includes('chole') && lower.includes('bowl')) return '/assets/dishes/chole_rice_bowl.webp';
  if (lower.includes('mexican') && lower.includes('bowl')) return '/assets/dishes/mexican_rice_bowl.webp';
  if (lower.includes('butter chicken') && lower.includes('bowl')) return '/assets/dishes/butter_chicken_rice_bowl.webp';
  if (lower.includes('chole bhature')) return lower.includes('paneer') ? '/assets/dishes/paneer_chole_bhature.webp' : '/assets/dishes/chole_bhature.webp';
  if (lower.includes('poori sabzi')) return '/assets/dishes/poori_sabzi.webp';

  // 2. Rice & Noodles
  const isEgg = lower.includes('egg');
  const isNonVeg = lower.includes('non-veg') || lower.includes('non veg') || lower.includes('chicken');

  if (lower.includes('schezwan rice')) return isNonVeg ? '/assets/dishes/rice_schezwan_chicken.webp' : (isEgg ? '/assets/dishes/rice_schezwan_egg.webp' : '/assets/dishes/rice_schezwan_veg.webp');
  if (lower.includes('burnt garlic rice')) return isNonVeg ? '/assets/dishes/rice_burnt_garlic_chicken.webp' : (isEgg ? '/assets/dishes/rice_burnt_garlic_egg.webp' : '/assets/dishes/rice_burnt_garlic_veg.webp');
  if (lower.includes('fried rice')) return isNonVeg ? '/assets/dishes/rice_fried_chicken.webp' : (isEgg ? '/assets/dishes/rice_fried_egg.webp' : '/assets/dishes/rice_fried_veg.webp');

  if (lower.includes('chilli garlic') && lower.includes('noodle')) return isNonVeg ? '/assets/dishes/noodles_chilli_garlic_chicken.webp' : (isEgg ? '/assets/dishes/noodles_chilli_garlic_egg.webp' : '/assets/dishes/noodles_chilli_garlic_veg.webp');
  if (lower.includes('singapuri') && lower.includes('noodle')) return isNonVeg ? '/assets/dishes/noodles_singapuri_chicken.webp' : (isEgg ? '/assets/dishes/noodles_singapuri_egg.webp' : '/assets/dishes/noodles_singapuri_veg.webp');
  if (lower.includes('hakka') && lower.includes('noodle')) return isNonVeg ? '/assets/dishes/noodles_hakka_chicken.webp' : (isEgg ? '/assets/dishes/noodles_hakka_egg.webp' : '/assets/dishes/noodles_hakka_veg.webp');
  if (lower.includes('schezwan') && lower.includes('noodle')) return isNonVeg ? '/assets/dishes/noodles_schezwan_chicken.webp' : (isEgg ? '/assets/dishes/noodles_schezwan_egg.webp' : '/assets/dishes/noodles_schezwan_veg.webp');
  if (lower.includes('noodle') || lower.includes('chowmein')) return isNonVeg ? '/assets/dishes/noodles_street_chicken.webp' : (isEgg ? '/assets/dishes/noodles_street_egg.webp' : '/assets/dishes/noodles_street_veg.webp');

  // 3. Chinese Snacks
  if (lower.includes('chilli paneer')) return '/assets/dishes/chilli_paneer.webp';
  if (lower.includes('manchurian')) return lower.includes('chicken') ? '/assets/dishes/chicken_manchurian.webp' : '/assets/dishes/manchurian_veg.webp';
  if (lower.includes('chilli potato') && lower.includes('honey')) return '/assets/dishes/honey_chilli_potato.webp';
  if (lower.includes('chilli potato')) return '/assets/dishes/chilli_potato.webp';
  if (lower.includes('crispy corn')) return '/assets/dishes/crispy_corn.webp';
  if (lower.includes('dynamite chicken')) return '/assets/dishes/dynamite_chicken.webp';
  if (lower.includes('korean bbq')) return '/assets/dishes/korean_bbq_chicken.webp';
  if (lower.includes('thai chicken') || lower.includes('chicken popcorn')) return '/assets/dishes/thai_chicken_popcorn.webp';
  if (lower.includes('chicken tender')) return '/assets/dishes/chicken_tenders.webp';

  // 4. Dumplings, Tandoor, Kebabs, Rolls, Soups
  if (lower.includes('dumpling') || lower.includes('momo')) return lower.includes('non') || lower.includes('chicken') ? '/assets/dishes/nonveg_dumplings.webp' : '/assets/dishes/veg_dumplings.webp';
  if (lower.includes('wonton')) return '/assets/dishes/mutton_wontons.webp';
  if (lower.includes('malai chaap')) return '/assets/dishes/malai_chaap.webp';
  if (lower.includes('paneer tikka')) return '/assets/dishes/paneer_tikka.webp';
  if (lower.includes('tandoori chaap')) return '/assets/dishes/tandoori_chaap.webp';
  if (lower.includes('seekh kebab')) return lower.includes('mutton') ? '/assets/dishes/mutton_seekh_kebab.webp' : '/assets/dishes/chicken_seekh_kebab.webp';
  if (lower.includes('spring roll')) return '/assets/dishes/spring_roll.webp';
  if (lower.includes('cigar roll')) return '/assets/dishes/cheese_cigar_roll.webp';

  if (lower.includes('sweet corn soup')) return '/assets/dishes/sweet_corn_soup.webp';
  if (lower.includes('mushroom soup')) return '/assets/dishes/mushroom_soup.webp';
  if (lower.includes('hot & sour') || lower.includes('hot and sour')) return '/assets/dishes/hot_sour_soup.webp';
  if (lower.includes('kharodey')) return '/assets/dishes/mutton_kharodey_soup.webp';
  if (lower.includes('soup')) return '/assets/dishes/chicken_soup.webp';

  // 5. Classic Cafe & Quick Bites
  if (lower.includes('tea')) return '/assets/dishes/tea.webp';
  if (lower.includes('cappuccino')) return '/assets/dishes/cappuccino_special.webp';
  if (lower.includes('coffee') && lower.includes('hazelnut') && lower.includes('hot')) return '/assets/dishes/coffee_hazelnut_hot.webp';
  if (lower.includes('coffee') && lower.includes('cold')) return '/assets/dishes/mocktail_cold_coffee.webp';
  if (lower.includes('coffee')) return '/assets/dishes/coffee.webp';
  if (lower.includes('samosa')) return '/assets/dishes/samosa.webp';
  if (lower.includes('bread pakoda') || lower.includes('pakoda')) return '/assets/dishes/bread_pakoda.webp';
  if (lower.includes('jalebi')) return lower.includes('rabri') ? '/assets/dishes/rabri_jalebi.webp' : '/assets/dishes/jalebi.webp';
  if (lower.includes('imarti')) return lower.includes('rabri') ? '/assets/dishes/rabri_imarti.webp' : '/assets/dishes/imarti.webp';
  if (lower.includes('aloo patties')) return '/assets/dishes/aloo_patties.webp';
  if (lower.includes('paneer patties') || lower.includes('patties')) return '/assets/dishes/paneer_patties.webp';

  if (lower.includes('animal')) return '/assets/dishes/fries_animal.webp';
  if (lower.includes('butter chicken fries')) return '/assets/dishes/fries_butter_chicken.webp';
  if (lower.includes('cheesy fries')) return '/assets/dishes/fries_cheesy.webp';
  if (lower.includes('peri peri') && lower.includes('fries')) return '/assets/dishes/fries_periperi.webp';
  if (lower.includes('fries')) return '/assets/dishes/fries_salted.webp';

  if (lower.includes('corn dog') || lower.includes('corndog')) {
    if (lower.includes('ramen') || lower.includes('wai wai')) return '/assets/dishes/corndog_ramen.webp';
    if (lower.includes('potato') || lower.includes('fry guy')) return '/assets/dishes/corndog_potato.webp';
    if (lower.includes('chicken') || lower.includes('chick pick')) return '/assets/dishes/corndog_chicken.webp';
    return '/assets/dishes/corndog_classic.webp';
  }

  if (lower.includes('burger')) {
    if (lower.includes('paneer')) return '/assets/dishes/burger_paneer.webp';
    if (lower.includes('chicken') || lower.includes('non-veg')) return '/assets/dishes/burger_chicken.webp';
    return '/assets/dishes/burger_veg.webp';
  }

  if (lower.includes('wrap')) {
    if (lower.includes('chicken') || lower.includes('non-veg')) return '/assets/dishes/wrap_chicken.webp';
    return '/assets/dishes/wrap_veg.webp';
  }

  if (lower.includes('sandwich') || lower.includes('kulcha')) {
    if (lower.includes('bahubali')) return '/assets/dishes/sandwich_bahubali.webp';
    if (lower.includes('kulcha')) return '/assets/dishes/kulcha_stuffed.webp';
    if (lower.includes('chicken') || lower.includes('non-veg')) return '/assets/dishes/sandwich_chicken.webp';
    return '/assets/dishes/sandwich_veg.webp';
  }

  if (lower.includes('macaroni')) return '/assets/dishes/desi_macaroni.webp';
  if (lower.includes('pasta')) {
    if (lower.includes('alfredo')) {
      return lower.includes('non-veg') || lower.includes('chicken') ? '/assets/dishes/pasta_alfredo_chicken.webp' : '/assets/dishes/pasta_alfredo_veg.webp';
    }
    if (lower.includes('red sauce')) {
      return lower.includes('non-veg') || lower.includes('chicken') ? '/assets/dishes/pasta_red_chicken.webp' : '/assets/dishes/pasta_red_veg.webp';
    }
    return lower.includes('non-veg') || lower.includes('chicken') ? '/assets/dishes/pasta_makhani_chicken.webp' : '/assets/dishes/pasta_makhani_veg.webp';
  }

  if (lower.includes('maggie')) {
    if (lower.includes('cheesy')) return '/assets/dishes/maggie_cheesy.webp';
    if (lower.includes('korean')) return '/assets/dishes/maggie_korean.webp';
    if (lower.includes('makhani')) return '/assets/dishes/maggie_makhani.webp';
    if (lower.includes('egg')) return '/assets/dishes/maggie_egg.webp';
    return '/assets/dishes/maggie_veg.webp';
  }

  if (lower.includes('byob') || lower.includes('chips')) {
    if (lower.includes('masala')) return '/assets/dishes/byob_masala.webp';
    if (lower.includes('cheesy')) return '/assets/dishes/byob_cheesy.webp';
    if (lower.includes('meaty') || lower.includes('meat')) return '/assets/dishes/byob_meat.webp';
    if (lower.includes('special')) return '/assets/dishes/byob_special.webp';
    return '/assets/dishes/byob_custom.webp';
  }

  if (lower.includes('mojito') || lower.includes('mocktail')) {
    if (lower.includes('blue ocean')) return '/assets/dishes/mocktail_blue_ocean.webp';
    if (lower.includes('strawberry')) return '/assets/dishes/mocktail_strawberry.webp';
    if (lower.includes('watermelon')) return '/assets/dishes/mocktail_watermelon.webp';
    if (lower.includes('mango')) return '/assets/dishes/mocktail_mango.webp';
    if (lower.includes('pina colada') || lower.includes('piña')) return '/assets/dishes/mocktail_pinacolada.webp';
    if (lower.includes('jaljeera')) return '/assets/dishes/mocktail_jaljeera.webp';
    return '/assets/dishes/mocktail_mojito.webp';
  }

  if (lower.includes('shake')) {
    if (lower.includes('oreo')) return '/assets/dishes/shake_oreo.webp';
    if (lower.includes('peanut butter')) return '/assets/dishes/shake_peanut_butter.webp';
    if (lower.includes('matcha')) return '/assets/dishes/shake_matcha.webp';
    return '/assets/dishes/shake_chocolate.webp';
  }

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
