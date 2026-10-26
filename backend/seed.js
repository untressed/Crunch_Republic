const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Category = require('./models/Category');
const Dish = require('./models/Dish');

const seedData = async (isInline = false) => {
  try {
    if (!isInline) {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in backend/.env');
      }

      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB for Crunch Republic seeding...');
    }

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Category.deleteMany({});
    await Dish.deleteMany({});
    console.log('Cleared existing collections.');

    // 1. Create Default Master Cafe Admin
    const adminUser = await User.create({
      name: 'Crunch Republic Admin',
      email: 'admin@crunchrepublic.com',
      password: 'crunchrepublic123',
      role: 'owner',
    });
    console.log(`Created Admin User: ${adminUser.email}`);

    // 2. Create Crunch Republic Cafe Profile
    const restaurant = await Restaurant.create({
      owner: adminUser._id,
      name: 'Crunch Republic',
      logo: '/assets/logo.png',
      address: 'Main Cafe Street, Near City Center, Crunch Republic HQ',
      contactNumber: '+91 98765 43210',
      openingHours: '10:00 AM - 11:00 PM',
      tables: [
        'Table 1',
        'Table 2',
        'Table 3',
        'Table 4',
        'Table 5',
        'Table 6',
        'Table 7',
        'Table 8',
        'Table 9',
        'Table 10',
        'Takeaway / Counter',
      ],
      upiId: 'crunchrepublic@okaxis',
      companies: [
        {
          name: 'Amazon',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00001',
        },
        {
          name: 'Savista',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00002',
        },
        {
          name: 'LTM',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00003',
        },
        {
          name: 'Artck',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00004',
        },
        {
          name: 'ION',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00005',
        },
        {
          name: 'Pinelabs',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00006',
        },
        {
          name: 'Barclays',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00007',
        },
        {
          name: 'UKG',
          address: 'Corporate Delivery Desk / Floor Pantry',
          contactPerson: 'Help Desk / Reception',
          phone: '+91 98000 00008',
        },
        {
          name: 'TCS - Cyber Park',
          address: 'Tower B, 4th Floor, Cyber Park SEZ',
          contactPerson: 'Rahul Sharma (Admin)',
          phone: '+91 98111 22233',
        },
        {
          name: 'Infosys Campus',
          address: 'Building 7, Food Court Desk',
          contactPerson: 'Priya Verma',
          phone: '+91 98222 33344',
        },
        {
          name: 'HDFC Bank Hub',
          address: '2nd Floor, Corporate Branch',
          contactPerson: 'Amit Patel',
          phone: '+91 98333 44455',
        },
      ],
    });
    console.log(`Created Restaurant Profile: ${restaurant.name} (ID: ${restaurant._id})`);

    // 3. Define 13 Categories matching the menu card
    const categoriesData = [
      { name: 'Tea & Coffee', displayOrder: 1 },
      { name: 'Quick Bites', displayOrder: 2 },
      { name: 'Fries', displayOrder: 3 },
      { name: 'Corn Dogs', displayOrder: 4 },
      { name: 'Burgers', displayOrder: 5 },
      { name: 'Wraps', displayOrder: 6 },
      { name: 'Sandwiches', displayOrder: 7 },
      { name: 'Pasta', displayOrder: 8 },
      { name: 'Maggie', displayOrder: 9 },
      { name: 'BYOB Chips', displayOrder: 10 },
      { name: 'Mocktails', displayOrder: 11 },
      { name: 'Specialty Coffee', displayOrder: 12 },
      { name: 'Thick Shakes', displayOrder: 13 },
    ];

    const categoryMap = {};
    for (const cat of categoriesData) {
      const createdCat = await Category.create({
        owner: adminUser._id,
        name: cat.name,
        displayOrder: cat.displayOrder,
      });
      categoryMap[cat.name] = createdCat._id;
    }
    console.log(`Created ${Object.keys(categoryMap).length} Menu Categories.`);

    // 4. Define All Dishes from the Menu Card
    const dishesData = [
      // Tea & Coffee
      {
        category: 'Tea & Coffee',
        name: 'Tea',
        price: 20,
        isVeg: true,
        description: 'Classic hot brewed aromatic Indian masala chai.',
      },
      {
        category: 'Tea & Coffee',
        name: 'Hot Coffee',
        price: 40,
        isVeg: true,
        description: 'Freshly brewed rich and comforting hot milk coffee.',
      },

      // Quick Bites
      {
        category: 'Quick Bites',
        name: 'Samosa',
        price: 20,
        isVeg: true,
        description: 'Crispy golden triangular pastry stuffed with spiced potato & peas.',
      },
      {
        category: 'Quick Bites',
        name: 'Bread Pakoda',
        price: 30,
        isVeg: true,
        description: 'Crispy gram flour batter-fried bread stuffed with seasoned potato.',
      },
      {
        category: 'Quick Bites',
        name: 'Jalebi (Portion / 250g)',
        price: 150,
        isVeg: true,
        description: 'Crisp and juicy spiral sweet dipped in warm saffron sugar syrup (Rate: ₹600/kg).',
      },
      {
        category: 'Quick Bites',
        name: 'Imarti (per pc)',
        price: 30,
        isVeg: true,
        description: 'Traditional flower-shaped urad dal sweet delicacy soaked in fragrant sugar syrup.',
      },
      {
        category: 'Quick Bites',
        name: 'Aloo Patties',
        price: 30,
        isVeg: true,
        description: 'Flaky multi-layered baked puff pastry with savory spiced potato filling.',
      },
      {
        category: 'Quick Bites',
        name: 'Paneer Patties',
        price: 40,
        isVeg: true,
        description: 'Crispy flaky baked puff pastry stuffed with seasoned cottage cheese.',
      },

      // Fries
      {
        category: 'Fries',
        name: 'Classic Salted Fries',
        price: 69,
        isVeg: true,
        description: 'Golden crispy potato french fries lightly tossed with fine sea salt.',
      },
      {
        category: 'Fries',
        name: 'Peri Peri Fries',
        price: 79,
        isVeg: true,
        description: 'Crispy fries generously dusted with spicy, tangy African bird’s eye peri-peri spice.',
      },
      {
        category: 'Fries',
        name: 'Cheesy Fries',
        price: 99,
        isVeg: true,
        description: 'Crispy fries lavishly drizzled with molten cheddar cheese sauce.',
      },
      {
        category: 'Fries',
        name: 'Butter Chicken Fries',
        price: 149,
        isVeg: false,
        description: 'Indo-fusion loaded fries topped with creamy butter chicken gravy and cheese melt.',
      },
      {
        category: 'Fries',
        name: 'The Crunch Republic Special (Animal Fries)',
        price: 129,
        isVeg: true,
        description: 'Our iconic house animal fries topped with caramelized onions, secret sauce and melted cheese.',
      },

      // Corn Dogs
      {
        category: 'Corn Dogs',
        name: 'Classic Corn Dog',
        price: 109,
        isVeg: true,
        description: 'Traditional golden cornmeal battered deep-fried crispy corn dog on a stick with mustard drizzle.',
      },
      {
        category: 'Corn Dogs',
        name: 'Fry Guy Corn Dog',
        price: 129,
        isVeg: true,
        description: 'Crunchy potato cube-crusted corn dog fried to golden perfection with spicy mayo.',
      },
      {
        category: 'Corn Dogs',
        name: 'Chick Pick Corn Dog',
        price: 179,
        isVeg: false,
        description: 'Juicy chicken sausage corn dog fried with golden crust and cheese drizzle.',
      },
      {
        category: 'Corn Dogs',
        name: 'Wai Wai Corn Dog',
        price: 139,
        isVeg: true,
        description: 'Crunchy crushed Wai-Wai noodle crust corn dog with tangy seasoning.',
      },

      // Burgers (Crunch Republic Special)
      {
        category: 'Burgers',
        name: 'Crunch Republic Special Burger (Veg)',
        price: 119,
        isVeg: true,
        description: 'Signature crispy vegetable patty, molten cheese slice, crisp lettuce, tomato and house crunch sauce.',
      },
      {
        category: 'Burgers',
        name: 'Crunch Republic Special Burger (Non-Veg)',
        price: 149,
        isVeg: false,
        description: 'Crispy golden fried chicken breast patty, melted cheese, crunchy lettuce and smoky house dressing.',
      },

      // Wraps (Crunch Republic Special Wrap)
      {
        category: 'Wraps',
        name: 'Crunch Republic Special Wrap (Veg)',
        price: 109,
        isVeg: true,
        description: 'Soft toasted tortilla stuffed with spiced paneer & veggie crunch, mint mayo and fresh onions.',
      },
      {
        category: 'Wraps',
        name: 'Crunch Republic Special Wrap (Non-Veg)',
        price: 159,
        isVeg: false,
        description: 'Toasted tortilla packed with grilled shredded chicken tikka, peppers, garlic mayo and herbs.',
      },

      // Sandwiches (Crunch Republic Special Sandwich)
      {
        category: 'Sandwiches',
        name: 'Crunch Republic Special Sandwich (Veg)',
        price: 129,
        isVeg: true,
        description: 'Grilled multi-layered jumbo sandwich packed with cucumber, tomato, cheese and spicy mint spread.',
      },
      {
        category: 'Sandwiches',
        name: 'Crunch Republic Special Sandwich (Non-Veg)',
        price: 159,
        isVeg: false,
        description: 'Grilled sandwich loaded with juicy chicken chunks, melted cheese and barbecue cream.',
      },

      // Pasta
      {
        category: 'Pasta',
        name: 'Makhani Sauce Pasta (Veg)',
        price: 159,
        isVeg: true,
        description: 'Al dente pasta tossed in rich, buttery tomato makhani sauce finished with kasuri methi & cream.',
      },
      {
        category: 'Pasta',
        name: 'Makhani Sauce Pasta (Non-Veg)',
        price: 229,
        isVeg: false,
        description: 'Pasta tossed in decadent makhani gravy with succulent grilled chicken chunks and fresh cream.',
      },
      {
        category: 'Pasta',
        name: 'Alfredo Pasta (Veg)',
        price: 169,
        isVeg: true,
        description: 'Classic velvety white sauce pasta prepared with garlic butter, parmesan, mushrooms and broccoli.',
      },
      {
        category: 'Pasta',
        name: 'Alfredo Pasta (Non-Veg)',
        price: 259,
        isVeg: false,
        description: 'Silky parmesan white sauce pasta loaded with tender pan-seared chicken and Italian herbs.',
      },
      {
        category: 'Pasta',
        name: 'Red Sauce Pasta (Veg)',
        price: 149,
        isVeg: true,
        description: 'Penne in fiery arrabbiata tomato sauce with basil, bell peppers, olives and chili flakes.',
      },
      {
        category: 'Pasta',
        name: 'Red Sauce Pasta (Non-Veg)',
        price: 209,
        isVeg: false,
        description: 'Penne in spicy garlic tomato sauce tossed with juicy spiced chicken morsels.',
      },

      // Maggie
      {
        category: 'Maggie',
        name: 'Veg Maggie',
        price: 49,
        isVeg: true,
        description: 'Street-style Indian masala Maggie cooked with onions, capsicum, peas and butter.',
      },
      {
        category: 'Maggie',
        name: 'Cheesy Maggie',
        price: 69,
        isVeg: true,
        description: 'Steaming hot masala Maggie blanketed with gooey melted processed cheddar cheese.',
      },
      {
        category: 'Maggie',
        name: 'Korean Maggie',
        price: 79,
        isVeg: true,
        description: 'Fiery sweet and spicy Korean-style ramen noodles topped with spring onions and toasted sesame.',
      },
      {
        category: 'Maggie',
        name: 'Makhani Maggie',
        price: 79,
        isVeg: true,
        description: 'Comforting noodles simmered in rich creamy butter tomato makhani sauce.',
      },
      {
        category: 'Maggie',
        name: 'Egg Maggie',
        price: 69,
        isVeg: false,
        description: 'Spiced masala Maggie cooked with scrambled farm-fresh eggs and cracked pepper.',
      },

      // BYOB Chips (Build Your Own Bag)
      {
        category: 'BYOB Chips',
        name: 'BYOB - Masala Chaska',
        price: 129,
        isVeg: true,
        description: 'Crunchy golden chips tossed in our signature tang-packed street chaat masala blend.',
      },
      {
        category: 'BYOB Chips',
        name: 'BYOB - Cheesy Masala',
        price: 159,
        isVeg: true,
        description: 'Hot spiced chips covered in rich molten cheese fondue with chili dust.',
      },
      {
        category: 'BYOB Chips',
        name: 'Build Your Own Bag (BYOB Custom)',
        price: 159,
        isVeg: true,
        description: 'Your bag, your rules! Choose chips base, seasoning shake, and 2 premium dipping sauces.',
      },
      {
        category: 'BYOB Chips',
        name: 'BYOB - The Crunch Republic Special',
        price: 159,
        isVeg: true,
        description: 'Chef signature loaded chips bag with sour cream, jalapenos, cheese and pico salsa.',
      },
      {
        category: 'BYOB Chips',
        name: 'BYOB - Meaty Heaven',
        price: 199,
        isVeg: false,
        description: 'Ultimate chips bag loaded with crispy chicken bacon bits, barbecue sauce and molten cheese.',
      },

      // Mocktails
      {
        category: 'Mocktails',
        name: 'Virgin Mojito',
        price: 89,
        isVeg: true,
        description: 'Zesty refreshing cooler with crushed mint leaves, fresh lime juice and chilled club soda.',
      },
      {
        category: 'Mocktails',
        name: 'Strawberry Mojito',
        price: 99,
        isVeg: true,
        description: 'Sweet luscious strawberry puree muddled with mint, lemon slices and sparkling fizz.',
      },
      {
        category: 'Mocktails',
        name: 'Mango Punch',
        price: 99,
        isVeg: true,
        description: 'Vibrant tropical Alphonso mango cooler with a dash of citrus and ice.',
      },
      {
        category: 'Mocktails',
        name: 'Watermelon Mojito',
        price: 99,
        isVeg: true,
        description: 'Hydrating fresh watermelon juice shaken with lime, garden mint and fizz.',
      },
      {
        category: 'Mocktails',
        name: 'Virgin Piña Colada',
        price: 99,
        isVeg: true,
        description: 'Creamy tropical coconut cream and pineapple juice blended smooth with crushed ice.',
      },
      {
        category: 'Mocktails',
        name: 'Jaljeera',
        price: 69,
        isVeg: true,
        description: 'Traditional cooling Indian refresher with roasted cumin, rock salt, mint and boondi.',
      },
      {
        category: 'Mocktails',
        name: 'Hazelnut Cold Coffee',
        price: 129,
        isVeg: true,
        description: 'Chilled rich espresso blended with thick milk, roasted hazelnut and chocolate drizzle.',
      },

      // Specialty Coffee
      {
        category: 'Specialty Coffee',
        name: 'Hazelnut Coffee (Hot Specialty)',
        price: 129,
        isVeg: true,
        description: 'Espresso crafted with steamed velvety milk and premium roasted hazelnut essence.',
      },

      // Thick Shakes
      {
        category: 'Thick Shakes',
        name: 'Chocolate Heaven Thick Shake',
        price: 179,
        isVeg: true,
        description: 'Sinfully thick Belgian chocolate shake crowned with chocolate chips and fudge drizzle.',
      },
      {
        category: 'Thick Shakes',
        name: 'Oreo Cookies & Cream Shake',
        price: 189,
        isVeg: true,
        description: 'Thick creamy vanilla shake blended with chunky chocolate Oreo cookies and cream.',
      },
      {
        category: 'Thick Shakes',
        name: 'Creamy Peanut Butter Cup Shake',
        price: 159,
        isVeg: true,
        description: 'Decadent roasted peanut butter and dairy cream shake with a nutty chocolate finish.',
      },
      {
        category: 'Thick Shakes',
        name: 'Matcha Bliss Shake',
        price: 159,
        isVeg: true,
        description: 'Authentic Japanese green tea matcha blended into a creamy, antioxidant-rich frosty shake.',
      },
    ];

    const dishImageMap = {
      // Tea & Coffee
      'Tea': '/assets/dishes/tea.webp',
      'Hot Coffee': '/assets/dishes/coffee.webp',

      // Quick Bites
      'Samosa': '/assets/dishes/samosa.webp',
      'Bread Pakoda': '/assets/dishes/bread_pakoda.webp',
      'Jalebi (Portion / 250g)': '/assets/dishes/jalebi.webp',
      'Imarti (per pc)': '/assets/dishes/imarti.webp',
      'Aloo Patties': '/assets/dishes/aloo_patties.webp',
      'Paneer Patties': '/assets/dishes/paneer_patties.webp',

      // Fries
      'Classic Salted Fries': '/assets/dishes/fries_salted.webp',
      'Peri Peri Fries': '/assets/dishes/fries_periperi.webp',
      'Cheesy Fries': '/assets/dishes/fries_cheesy.webp',
      'Butter Chicken Fries': '/assets/dishes/fries_butter_chicken.webp',
      'The Crunch Republic Special (Animal Fries)': '/assets/dishes/fries_animal.webp',

      // Corn Dogs
      'Classic Corn Dog': '/assets/dishes/corndog_classic.webp',
      'Fry Guy Corn Dog': '/assets/dishes/corndog_potato.webp',
      'Chick Pick Corn Dog': '/assets/dishes/corndog_chicken.webp',
      'Wai Wai Corn Dog': '/assets/dishes/corndog_ramen.webp',

      // Burgers
      'Crunch Republic Special Burger (Veg)': '/assets/dishes/burger_veg.webp',
      'Crunch Republic Special Burger (Non-Veg)': '/assets/dishes/burger_chicken.webp',

      // Wraps
      'Crunch Republic Special Wrap (Veg)': '/assets/dishes/wrap_veg.webp',
      'Crunch Republic Special Wrap (Non-Veg)': '/assets/dishes/wrap_chicken.webp',

      // Sandwiches
      'Crunch Republic Special Sandwich (Veg)': '/assets/dishes/sandwich_veg.webp',
      'Crunch Republic Special Sandwich (Non-Veg)': '/assets/dishes/sandwich_chicken.webp',

      // Pasta
      'Makhani Sauce Pasta (Veg)': '/assets/dishes/pasta_makhani_veg.webp',
      'Makhani Sauce Pasta (Non-Veg)': '/assets/dishes/pasta_makhani_chicken.webp',
      'Alfredo Pasta (Veg)': '/assets/dishes/pasta_alfredo_veg.webp',
      'Alfredo Pasta (Non-Veg)': '/assets/dishes/pasta_alfredo_chicken.webp',
      'Red Sauce Pasta (Veg)': '/assets/dishes/pasta_red_veg.webp',
      'Red Sauce Pasta (Non-Veg)': '/assets/dishes/pasta_red_chicken.webp',

      // Maggie
      'Veg Maggie': '/assets/dishes/maggie_veg.webp',
      'Cheesy Maggie': '/assets/dishes/maggie_cheesy.webp',
      'Korean Maggie': '/assets/dishes/maggie_korean.webp',
      'Makhani Maggie': '/assets/dishes/maggie_makhani.webp',
      'Egg Maggie': '/assets/dishes/maggie_egg.webp',

      // BYOB Chips
      'BYOB - Masala Chaska': '/assets/dishes/byob_masala.webp',
      'BYOB - Cheesy Masala': '/assets/dishes/byob_cheesy.webp',
      'Build Your Own Bag (BYOB Custom)': '/assets/dishes/byob_custom.webp',
      'BYOB - The Crunch Republic Special': '/assets/dishes/byob_special.webp',
      'BYOB - Meaty Heaven': '/assets/dishes/byob_meat.webp',

      // Mocktails
      'Virgin Mojito': '/assets/dishes/mocktail_mojito.webp',
      'Strawberry Mojito': '/assets/dishes/mocktail_strawberry.webp',
      'Mango Punch': '/assets/dishes/mocktail_mango.webp',
      'Watermelon Mojito': '/assets/dishes/mocktail_watermelon.webp',
      'Virgin Piña Colada': '/assets/dishes/mocktail_pinacolada.webp',
      'Jaljeera': '/assets/dishes/mocktail_jaljeera.webp',
      'Hazelnut Cold Coffee': '/assets/dishes/mocktail_cold_coffee.webp',

      // Specialty Coffee
      'Hazelnut Coffee (Hot Specialty)': '/assets/dishes/coffee_hazelnut_hot.webp',

      // Thick Shakes
      'Chocolate Heaven Thick Shake': '/assets/dishes/shake_chocolate.webp',
      'Oreo Cookies & Cream Shake': '/assets/dishes/shake_oreo.webp',
      'Creamy Peanut Butter Cup Shake': '/assets/dishes/shake_peanut_butter.webp',
      'Matcha Bliss Shake': '/assets/dishes/shake_matcha.webp',
    };

    const categoryImageMap = {
      'Tea & Coffee': '/assets/dishes/coffee.webp',
      'Quick Bites': '/assets/dishes/samosa.webp',
      'Fries': '/assets/dishes/fries_salted.webp',
      'Corn Dogs': '/assets/dishes/corndog_classic.webp',
      'Burgers': '/assets/dishes/burger_veg.webp',
      'Wraps': '/assets/dishes/wrap_veg.webp',
      'Sandwiches': '/assets/dishes/sandwich_veg.webp',
      'Pasta': '/assets/dishes/pasta_makhani_veg.webp',
      'Maggie': '/assets/dishes/maggie_veg.webp',
      'BYOB Chips': '/assets/dishes/byob_masala.webp',
      'Mocktails': '/assets/dishes/mocktail_mojito.webp',
      'Specialty Coffee': '/assets/dishes/coffee.webp',
      'Thick Shakes': '/assets/dishes/shake_chocolate.webp',
    };

    const createdDishesMap = {};
    for (const item of dishesData) {
      const dishImage = dishImageMap[item.name] || item.image || categoryImageMap[item.category] || '';
      const createdDish = await Dish.create({
        owner: adminUser._id,
        category: categoryMap[item.category],
        name: item.name,
        price: item.price,
        isVeg: item.isVeg,
        description: item.description,
        isAvailable: true,
        image: dishImage,
      });
      createdDishesMap[item.name] = createdDish;
    }

    // Seed Signature Value Combos
    const burgerDish = createdDishesMap['Crunch Republic Special Burger (Veg)'];
    const friesDish = createdDishesMap['Peri Peri Fries'];
    const mojitoDish = createdDishesMap['Virgin Mojito'];

    if (burgerDish && friesDish && mojitoDish) {
      await Dish.create({
        owner: adminUser._id,
        category: categoryMap['Burgers'],
        name: 'Crunch Supreme Value Combo',
        price: 249,
        isVeg: true,
        description: 'Value Meal: Veg Crunch Burger + Peri Peri Fries + Refreshing Virgin Mojito Cooler.',
        isAvailable: true,
        image: '/assets/dishes/burger_veg.jpg',
        isCombo: true,
        originalPrice: 119 + 79 + 89, // 287
        comboItems: [
          { dish: burgerDish._id, name: burgerDish.name, quantity: 1, price: burgerDish.price },
          { dish: friesDish._id, name: friesDish.name, quantity: 1, price: friesDish.price },
          { dish: mojitoDish._id, name: mojitoDish.name, quantity: 1, price: mojitoDish.price },
        ],
      });
      console.log('Seeded Combo Meal: Crunch Supreme Value Combo');
    }

    console.log(`Successfully seeded ${dishesData.length + 1} Crunch Republic Dishes & Combos!`);
    console.log('Seeding completed successfully!');
    if (!isInline) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Error during seeding:', error);
    if (!isInline) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
