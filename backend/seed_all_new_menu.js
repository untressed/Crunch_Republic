const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Category = require('./models/Category');
const Dish = require('./models/Dish');
const Restaurant = require('./models/Restaurant');
const User = require('./models/User');

const categoriesToEnsure = [
  { name: 'Rice', displayOrder: 1 },
  { name: 'Noodles', displayOrder: 2 },
  { name: 'Snacks (Chinese)', displayOrder: 3 },
  { name: 'Dumplings', displayOrder: 4 },
  { name: 'Tandoor', displayOrder: 5 },
  { name: 'Rolls', displayOrder: 6 },
  { name: 'Kebabs', displayOrder: 7 },
  { name: 'Soups', displayOrder: 8 },
  { name: 'Bowl-O-Mania', displayOrder: 9 },
  { name: 'Tea & Coffee', displayOrder: 10 },
  { name: 'Quick Bites', displayOrder: 11 },
  { name: 'Fries', displayOrder: 12 },
  { name: 'Corn Dogs', displayOrder: 13 },
  { name: 'Burgers', displayOrder: 14 },
  { name: 'Wraps', displayOrder: 15 },
  { name: 'Sandwiches', displayOrder: 16 },
  { name: 'Pasta', displayOrder: 17 },
  { name: 'Maggie', displayOrder: 18 },
  { name: 'BYOB Chips', displayOrder: 19 },
  { name: 'Mocktails', displayOrder: 20 },
  { name: 'Specialty Coffee', displayOrder: 21 },
  { name: 'Thick Shakes', displayOrder: 22 },
];

const newDishesData = [
  // 1. RICE
  { name: 'Schezwan Rice (Veg)', category: 'Rice', price: 129, isVeg: true, image: '/assets/dishes/rice_schezwan.webp', description: 'Wok-tossed fragrant basmati with fiery Schezwan chili sauce, crisp spring onions & garden vegetables.' },
  { name: 'Schezwan Rice (Egg)', category: 'Rice', price: 149, isVeg: false, image: '/assets/dishes/rice_schezwan.webp', description: 'Fiery wok-tossed Schezwan rice loaded with scrambled farm eggs and aromatic spices.' },
  { name: 'Schezwan Rice (Non-Veg)', category: 'Rice', price: 179, isVeg: false, image: '/assets/dishes/rice_schezwan.webp', description: 'Spicy Schezwan fried rice with tender chicken chunks, egg, and fresh scallions.' },
  { name: 'Street Style Fried Rice (Veg)', category: 'Rice', price: 99, isVeg: true, image: '/assets/dishes/rice_fried.webp', description: 'Classic Indo-Chinese wok-tossed fried rice with crunchy carrots, cabbage, and light soy seasoning.' },
  { name: 'Street Style Fried Rice (Egg)', category: 'Rice', price: 119, isVeg: false, image: '/assets/dishes/rice_fried.webp', description: 'Golden wok-fried street style rice tossed with scrambled eggs and fresh garlic.' },
  { name: 'Street Style Fried Rice (Non-Veg)', category: 'Rice', price: 149, isVeg: false, image: '/assets/dishes/rice_fried.webp', description: 'Savory street-style fried rice infused with diced tender chicken and egg ribbons.' },
  { name: 'Burnt Garlic Rice (Veg)', category: 'Rice', price: 119, isVeg: true, image: '/assets/dishes/rice_burnt_garlic.webp', description: 'Fragrant long-grain rice wok-tossed with golden crispy roasted garlic and mild herbs.' },
  { name: 'Burnt Garlic Rice (Egg)', category: 'Rice', price: 139, isVeg: false, image: '/assets/dishes/rice_burnt_garlic.webp', description: 'Slow-browned garlic infused rice tossed with scrambled egg and spring greens.' },
  { name: 'Burnt Garlic Rice (Non-Veg)', category: 'Rice', price: 189, isVeg: false, image: '/assets/dishes/rice_burnt_garlic.webp', description: 'Signature burnt garlic rice packed with juicy chicken bites, egg, and Asian aromatics.' },

  // 2. NOODLES
  { name: 'Street Style Noodles (Veg)', category: 'Noodles', price: 99, isVeg: true, image: '/assets/dishes/noodles_street.webp', description: 'Desi wok-tossed street noodles with shredded vegetables and spiced tangy sauce.' },
  { name: 'Street Style Noodles (Egg)', category: 'Noodles', price: 119, isVeg: false, image: '/assets/dishes/noodles_street.webp', description: 'Street-style chowmein noodles tossed with farm eggs, crunchy capsicum, and cabbage.' },
  { name: 'Street Style Noodles (Non-Veg)', category: 'Noodles', price: 179, isVeg: false, image: '/assets/dishes/noodles_street.webp', description: 'Loaded street style chowmein with shredded tender chicken and scrambled egg.' },
  { name: 'Chilli Garlic Noodles (Veg)', category: 'Noodles', price: 129, isVeg: true, image: '/assets/dishes/noodles_chilli_garlic.webp', description: 'Fiery chili and pungent roasted garlic wok-tossed noodles with garden greens.' },
  { name: 'Chilli Garlic Noodles (Egg)', category: 'Noodles', price: 149, isVeg: false, image: '/assets/dishes/noodles_chilli_garlic.webp', description: 'Spicy chili garlic noodles tossed with golden eggs and scallions.' },
  { name: 'Chilli Garlic Noodles (Non-Veg)', category: 'Noodles', price: 189, isVeg: false, image: '/assets/dishes/noodles_chilli_garlic.webp', description: 'Zesty chili garlic noodles packed with spiced chicken fillets and scrambled egg.' },
  { name: 'Singapuri Noodles (Veg)', category: 'Noodles', price: 139, isVeg: true, image: '/assets/dishes/noodles_singapuri.webp', description: 'Aromatic curry-spiced thin noodles with julienned vegetables and sesame seeds.' },
  { name: 'Singapuri Noodles (Egg)', category: 'Noodles', price: 159, isVeg: false, image: '/assets/dishes/noodles_singapuri.webp', description: 'Golden Singaporean curry-infused noodles with fluffy egg ribbons.' },
  { name: 'Singapuri Noodles (Non-Veg)', category: 'Noodles', price: 199, isVeg: false, image: '/assets/dishes/noodles_singapuri.webp', description: 'Vibrant curry flavored Singapuri noodles tossed with chicken and egg.' },
  { name: 'Hakka Noodles (Veg)', category: 'Noodles', price: 109, isVeg: true, image: '/assets/dishes/noodles_hakka.webp', description: 'Authentic Chinese hakka noodles stir-fried with crisp bell peppers, onions, and cabbage.' },
  { name: 'Hakka Noodles (Egg)', category: 'Noodles', price: 129, isVeg: false, image: '/assets/dishes/noodles_hakka.webp', description: 'Classic stir-fried Hakka noodles packed with fresh eggs and crunchy greens.' },
  { name: 'Hakka Noodles (Non-Veg)', category: 'Noodles', price: 149, isVeg: false, image: '/assets/dishes/noodles_hakka.webp', description: 'Traditional Hakka noodles tossed with juicy chicken strips and savory soy sauce.' },
  { name: 'Schezwan Noodles (Veg)', category: 'Noodles', price: 129, isVeg: true, image: '/assets/dishes/noodles_schezwan.webp', description: 'Spicy Sichuan red pepper noodles wok-fried with crisp garden vegetables.' },
  { name: 'Schezwan Noodles (Egg)', category: 'Noodles', price: 149, isVeg: false, image: '/assets/dishes/noodles_schezwan.webp', description: 'Sichuan spiced noodles tossed with fluffy egg and scallions.' },
  { name: 'Schezwan Noodles (Non-Veg)', category: 'Noodles', price: 179, isVeg: false, image: '/assets/dishes/noodles_schezwan.webp', description: 'Fiery Schezwan noodles loaded with spiced chicken chunks and egg.' },

  // 3. SNACKS (CHINESE) - VEG
  { name: 'Chilli Paneer (Dry/Gravy)', category: 'Snacks (Chinese)', price: 149, isVeg: true, image: '/assets/dishes/chilli_paneer.webp', description: 'Crisp fried cottage cheese cubes tossed with bell peppers, onions, and spicy soy-chilli glaze.' },
  { name: 'Veg Manchurian (Dry/Gravy)', category: 'Snacks (Chinese)', price: 169, isVeg: true, image: '/assets/dishes/manchurian_veg.webp', description: 'Golden minced vegetable dumplings tossed in an authentic garlic, ginger, and coriander Indo-Chinese sauce.' },
  { name: 'Chilli Mushroom', category: 'Snacks (Chinese)', price: 219, isVeg: true, image: '/assets/dishes/chilli_mushroom.webp', description: 'Tender button mushrooms batter-fried crisp and tossed in chili-garlic soy reduction.' },
  { name: 'Stuffed Mushroom', category: 'Snacks (Chinese)', price: 279, isVeg: true, image: '/assets/dishes/stuffed_mushroom.webp', description: 'Juicy mushroom caps stuffed with seasoned cheese and herbs, flash-fried to golden perfection.' },
  { name: 'Chilli Garlic Soya Chaap', category: 'Snacks (Chinese)', price: 149, isVeg: true, image: '/assets/dishes/chilli_garlic_chaap.webp', description: 'Tender soya chaap chunks wok-tossed in sharp chili-garlic and dark soy sauce.' },
  { name: 'Crispy Corn', category: 'Snacks (Chinese)', price: 109, isVeg: true, image: '/assets/dishes/crispy_corn.webp', description: 'Crispy fried sweet American corn kernels dusted with tangy chaat spices and spring onions.' },
  { name: 'Veg Stir Fry', category: 'Snacks (Chinese)', price: 179, isVeg: true, image: '/assets/dishes/veg_stir_fry.webp', description: 'Medley of fresh exotic vegetables flash-seared in light Asian sesame sauce.' },
  { name: 'Chilli Potato', category: 'Snacks (Chinese)', price: 129, isVeg: true, image: '/assets/dishes/chilli_potato.webp', description: 'Crispy finger potatoes tossed in zesty garlic chili sauce with toasted sesame.' },
  { name: 'Honey Chilli Potato', category: 'Snacks (Chinese)', price: 149, isVeg: true, image: '/assets/dishes/honey_chilli_potato.webp', description: 'All-time favorite crisp fried potatoes glazed with sweet organic honey, chili paste, and sesame.' },

  // 4. SNACKS (CHINESE) - NON-VEG
  { name: 'Hunan Chilli Chicken (Dry/Gravy)', category: 'Snacks (Chinese)', price: 259, isVeg: false, image: '/assets/dishes/hunan_chilli_chicken.webp', description: 'Fiery Hunan style chicken wok-seared with fresh red chilies, fermented soy, and garlic.' },
  { name: 'Chicken Manchurian (Dry/Gravy)', category: 'Snacks (Chinese)', price: 249, isVeg: false, image: '/assets/dishes/chicken_manchurian.webp', description: 'Succulent chicken meatballs braised in a dark ginger-garlic and coriander sauce.' },
  { name: 'Garlic Chicken (Dry/Gravy)', category: 'Snacks (Chinese)', price: 209, isVeg: false, image: '/assets/dishes/garlic_chicken.webp', description: 'Tender chicken tossed with roasted garlic cloves, mild chilies, and savory dark soy sauce.' },
  { name: 'Kung Pao Chicken', category: 'Snacks (Chinese)', price: 279, isVeg: false, image: '/assets/dishes/kung_pao_chicken.webp', description: 'Sichuan stir-fry with diced chicken, roasted crunchy peanuts, and dried red chili pods.' },
  { name: 'Dynamite Chicken', category: 'Snacks (Chinese)', price: 249, isVeg: false, image: '/assets/dishes/dynamite_chicken.webp', description: 'Crispy fried chicken bites drizzled with creamy, spicy, and explosive sriracha dynamite sauce.' },
  { name: 'Korean BBQ Chicken', category: 'Snacks (Chinese)', price: 289, isVeg: false, image: '/assets/dishes/korean_bbq_chicken.webp', description: 'Crispy chicken bites glazed in smoky, sweet, and sticky Korean gochujang BBQ sauce.' },
  { name: 'Fried Chicken Tenders', category: 'Snacks (Chinese)', price: 199, isVeg: false, image: '/assets/dishes/chicken_tenders.webp', description: 'Golden crumb-coated chicken breast strips served with house dip.' },
  { name: 'Thai Chicken Popcorn', category: 'Snacks (Chinese)', price: 149, isVeg: false, image: '/assets/dishes/thai_chicken_popcorn.webp', description: 'Crunchy bite-sized chicken popcorn tossed in aromatic Thai lemongrass and sweet-spicy dust.' },

  // 5. DUMPLINGS
  { name: 'Veg Dumplings (Momos)', category: 'Dumplings', price: 99, isVeg: true, image: '/assets/dishes/veg_dumplings.webp', description: 'Steamed thin-skin dumplings stuffed with finely minced vegetables, served with red chili chutney.' },
  { name: 'Non-Veg Dumplings (Chicken Momos)', category: 'Dumplings', price: 129, isVeg: false, image: '/assets/dishes/nonveg_dumplings.webp', description: 'Steamed authentic dumplings filled with juicy spiced minced chicken and aromatics.' },
  { name: 'Mutton Wontons', category: 'Dumplings', price: 299, isVeg: false, image: '/assets/dishes/mutton_wontons.webp', description: 'Delicate wonton pockets packed with seasoned slow-cooked minced mutton, steamed or fried.' },

  // 6. TANDOOR
  { name: 'Malai Chaap', category: 'Tandoor', price: 139, isVeg: true, image: '/assets/dishes/malai_chaap.webp', description: 'Creamy marinated soya chaap grilled over charcoal with cashew paste, cardamom, and fresh cream.' },
  { name: 'Tandoori Chaap', category: 'Tandoor', price: 139, isVeg: true, image: '/assets/dishes/tandoori_chaap.webp', description: 'Spicy mustard-yogurt marinated soya chaap charred to perfection in clay tandoor.' },
  { name: 'Paneer Tikka', category: 'Tandoor', price: 159, isVeg: true, image: '/assets/dishes/paneer_tikka.webp', description: 'Chunky cubes of fresh cottage cheese, peppers & onions marinated in Kashmiri spices and grilled.' },
  { name: 'Tandoori Mushroom', category: 'Tandoor', price: 249, isVeg: true, image: '/assets/dishes/tandoori_mushroom.webp', description: 'Juicy whole button mushrooms coated in robust tandoori marinade and smoky roasted.' },
  { name: 'Achari Chaap', category: 'Tandoor', price: 139, isVeg: true, image: '/assets/dishes/achari_chaap.webp', description: 'Tangy pickled-spice marinated soya chaap roasted over hot charcoal coals.' },
  { name: 'Lemon Mint Chaap', category: 'Tandoor', price: 149, isVeg: true, image: '/assets/dishes/lemon_mint_chaap.webp', description: 'Zesty refreshing marinade of fresh garden mint, lemon zest, and spices grilled over flame.' },

  // 7. ROLLS
  { name: 'Chaap / Paneer Tandoori Roll', category: 'Rolls', price: 139, isVeg: true, image: '/assets/dishes/chaap_paneer_roll.webp', description: 'Smoky tandoori chaap or paneer wrapped in a layered paratha with mint chutney and pickled onions.' },
  { name: 'Cheese Cigar Roll', category: 'Rolls', price: 159, isVeg: true, image: '/assets/dishes/cheese_cigar_roll.webp', description: 'Golden crispy wonton rolls oozing with melted cheese and herbs, served with sweet chili dip.' },
  { name: 'Spring Roll', category: 'Rolls', price: 109, isVeg: true, image: '/assets/dishes/spring_roll.webp', description: 'Crispy fried rolls packed with savory shredded vegetables, served with authentic garlic dip.' },

  // 8. KEBABS
  { name: 'Chicken Seekh Kebab', category: 'Kebabs', price: 199, isVeg: false, image: '/assets/dishes/chicken_seekh_kebab.webp', description: 'Minced chicken blended with fresh herbs and Indian royal spices, skewered and tandoor-grilled.' },
  { name: 'Mutton Seekh Kebab', category: 'Kebabs', price: 399, isVeg: false, image: '/assets/dishes/mutton_seekh_kebab.webp', description: 'Finely minced tender mutton kneaded with aromatic spices, smoked on skewers to juicy perfection.' },

  // 9. SOUPS
  { name: 'Sweet Corn Soup', category: 'Soups', price: 99, isVeg: true, image: '/assets/dishes/sweet_corn_soup.webp', description: 'Creamy golden sweet corn soup with tender corn kernels and gentle seasonings.' },
  { name: 'Mushroom Soup', category: 'Soups', price: 109, isVeg: true, image: '/assets/dishes/mushroom_soup.webp', description: 'Velvety rich puree of roasted button mushrooms infused with black pepper and cream.' },
  { name: 'Chicken Soup', category: 'Soups', price: 149, isVeg: false, image: '/assets/dishes/chicken_soup.webp', description: 'Slow-simmered chicken broth enriched with shredded chicken and fragrant herbs.' },
  { name: 'Hot & Sour Soup', category: 'Soups', price: 99, isVeg: true, image: '/assets/dishes/hot_sour_soup.webp', description: 'Traditional spicy and tangy Asian soup loaded with mushrooms, tofu, and bamboo shoots.' },
  { name: 'Mutton Kharodey Soup', category: 'Soups', price: 169, isVeg: false, image: '/assets/dishes/mutton_kharodey_soup.webp', description: 'Nutritious, authentic slow-braised bone marrow and trotters broth simmered with desi spices.' },

  // 10. BOWL-O-MANIA
  { name: 'Chole Rice Bowl', category: 'Bowl-O-Mania', price: 49, isVeg: true, image: '/assets/dishes/chole_rice_bowl.webp', description: 'Hearty Punjabi spiced chickpeas served over steaming basmati rice with pickle and onions.' },
  { name: 'Kadi Rice Bowl', category: 'Bowl-O-Mania', price: 49, isVeg: true, image: '/assets/dishes/kadi_rice_bowl.webp', description: 'Tangy yogurt curry with soft gram flour pakoras over hot aromatic basmati rice.' },
  { name: 'Palak Paneer Rice Bowl', category: 'Bowl-O-Mania', price: 79, isVeg: true, image: '/assets/dishes/palak_paneer_rice_bowl.webp', description: 'Silky spinach gravy with soft cottage cheese cubes over fluffy basmati rice.' },
  { name: 'Shahi Paneer Rice Bowl', category: 'Bowl-O-Mania', price: 79, isVeg: true, image: '/assets/dishes/shahi_paneer_rice_bowl.webp', description: 'Royal creamy tomato-cashew gravy with paneer cubes served over seasoned rice.' },
  { name: 'Mexican Rice Bowl', category: 'Bowl-O-Mania', price: 139, isVeg: true, image: '/assets/dishes/mexican_rice_bowl.webp', description: 'Zesty spiced Mexican rice layered with sweet corn, beans, salsa, and cheese sauce.' },
  { name: 'Butter Chicken Rice Bowl', category: 'Bowl-O-Mania', price: 179, isVeg: false, image: '/assets/dishes/butter_chicken_rice_bowl.webp', description: 'Rich velvet butter chicken gravy with tender chicken over hot basmati rice.' },
  { name: 'Chole Bhature (2 Pcs)', category: 'Bowl-O-Mania', price: 60, isVeg: true, image: '/assets/dishes/chole_bhature.webp', description: 'Puffed golden deep-fried bhaturas served with spicy Amritsari chole, pickled chili & onions.' },
  { name: 'Paneer Chole Bhature (2 Pcs)', category: 'Bowl-O-Mania', price: 80, isVeg: true, image: '/assets/dishes/paneer_chole_bhature.webp', description: 'Paneer-stuffed fluffy bhaturas paired with rich spiced chole and condiments.' },
  { name: 'Poori Sabzi (4 Pcs)', category: 'Bowl-O-Mania', price: 50, isVeg: true, image: '/assets/dishes/poori_sabzi.webp', description: 'Golden crispy whole-wheat pooris served with savory spiced potato curry (Aloo sabzi).' },

  // 11. ADDITIONAL WESTERN BURGERS, SANDWICHES & QUICK BITES
  { name: 'Paneer Burger (with American Coleslaw)', category: 'Burgers', price: 149, isVeg: true, image: '/assets/dishes/burger_paneer.webp', description: 'Crispy paneer patty topped with crunchy American coleslaw, cheddar, and house sauce.' },
  { name: 'Paneer Bahubali Sandwich', category: 'Sandwiches', price: 159, isVeg: true, image: '/assets/dishes/sandwich_bahubali.webp', description: 'Colossal triple-decker toasted sandwich overflowing with spiced paneer, veggies, and cheese.' },
  { name: 'Paneer Stuffed Kulcha', category: 'Sandwiches', price: 59, isVeg: true, image: '/assets/dishes/kulcha_stuffed.webp', description: 'Toasted Amritsari kulcha stuffed with spiced cottage cheese and roasted herbs.' },
  { name: 'Desi Macaroni', category: 'Pasta', price: 59, isVeg: true, image: '/assets/dishes/desi_macaroni.webp', description: 'Nostalgic street-style elbow macaroni stir-fried with tomatoes, onions, chilies, and garam masala.' },
  { name: 'Nachos Corn Chaat', category: 'Quick Bites', price: 99, isVeg: true, image: '/assets/dishes/nachos_corn_chaat.webp', description: 'Crispy corn tortilla nachos loaded with sweet corn, tangy salsa, jalapeños, and cheese sauce.' },
  { name: 'Bhelpuri', category: 'Quick Bites', price: 69, isVeg: true, image: '/assets/dishes/bhelpuri.webp', description: 'Classic Mumbai street bhel of puffed rice, sev, potatoes, onions, and sweet-spicy chutneys.' },
  { name: 'Rabri Jalebi', category: 'Quick Bites', price: 60, isVeg: true, image: '/assets/dishes/rabri_jalebi.webp', description: 'Hot crispy saffron jalebis served with rich slow-cooked malai rabri.' },
  { name: 'Rabri Imarti', category: 'Quick Bites', price: 50, isVeg: true, image: '/assets/dishes/rabri_imarti.webp', description: 'Traditional urad dal imarti soaked in cardamom sugar syrup, topped with thick creamy rabri.' },
  { name: 'Crunch Republic Special Cappuccino', category: 'Tea & Coffee', price: 60, isVeg: true, image: '/assets/dishes/cappuccino_special.webp', description: 'Artisanal double shot espresso with thick micro-foamed milk and cocoa dusting.' },
  { name: 'Blue Ocean Mocktail', category: 'Mocktails', price: 89, isVeg: true, image: '/assets/dishes/mocktail_blue_ocean.webp', description: 'Vibrant blue curaçao citrus blend with sparkling soda and crushed mint.' },
];

async function seedAllNewDishes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to seed all dishes...');

    const restaurant = await Restaurant.findOne({});
    if (!restaurant) {
      console.error('No restaurant found');
      process.exit(1);
    }

    const admin = await User.findOne({ role: 'owner' }) || await User.findOne({});
    const ownerId = admin ? admin._id : restaurant.owner;

    // 1. Ensure all categories exist
    const categoryMap = new Map();
    for (const catData of categoriesToEnsure) {
      let category = await Category.findOne({ name: catData.name });
      if (!category) {
        category = await Category.create({
          owner: ownerId,
          name: catData.name,
          displayOrder: catData.displayOrder,
        });
        console.log(`Created Category: ${category.name}`);
      }
      categoryMap.set(catData.name, category._id);
    }

    // 2. Insert or update dishes
    let addedCount = 0;
    let updatedCount = 0;

    for (const d of newDishesData) {
      const catId = categoryMap.get(d.category);
      if (!catId) {
        console.warn(`Category not found for: ${d.name}`);
        continue;
      }

      const existing = await Dish.findOne({ name: d.name });
      if (existing) {
        existing.price = d.price;
        existing.isVeg = d.isVeg;
        existing.image = d.image;
        existing.description = d.description;
        existing.category = catId;
        existing.owner = ownerId;
        await existing.save();
        updatedCount++;
      } else {
        await Dish.create({
          owner: ownerId,
          category: catId,
          name: d.name,
          price: d.price,
          isVeg: d.isVeg,
          image: d.image,
          description: d.description,
          isAvailable: true,
        });
        addedCount++;
      }
    }

    const totalDishes = await Dish.countDocuments();
    console.log(`\n✅ Menu Update Complete!`);
    console.log(`- New Dishes Added: ${addedCount}`);
    console.log(`- Existing Dishes Updated: ${updatedCount}`);
    console.log(`- Total Dishes in Catalog: ${totalDishes}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding dishes:', err);
    process.exit(1);
  }
}

seedAllNewDishes();
