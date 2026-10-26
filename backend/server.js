const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const path = require('path');

// Load env variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to Database (Atlas / Cloud)
connectDB().then(() => {
  // Auto-seed initial cafe profile, dishes & offers if database is empty
  setTimeout(async () => {
    try {
      const Restaurant = require('./models/Restaurant');
      const restCount = await Restaurant.countDocuments();
      if (restCount === 0) {
        console.log('Empty database detected. Auto-seeding Crunch Republic menu & admin profile...');
        const seedData = require('./seed');
        await seedData(true);
      }

      // Ensure all dishes in MongoDB use high-res .webp food photographs (eliminate cartoon SVGs) - synced
      const { updateAllDishPhotos } = require('./updateDishImages');
      await updateAllDishPhotos(true);

      const Offer = require('./models/Offer');
      const User = require('./models/User');
      const count = await Offer.countDocuments();
      if (count === 0) {
        const admin = await User.findOne({ email: 'admin@crunchrepublic.com' });
        if (admin) {
          await Offer.create([
            {
              restaurant: admin._id,
              title: 'Welcome Cruncher: 20% OFF',
              code: 'CRUNCH20',
              description: 'Get 20% discount on your full order value. Valid across all menu items!',
              discountType: 'percentage',
              discountValue: 20,
              minOrderValue: 199,
              maxDiscount: 100,
              applicableFor: 'all',
              badgeText: 'MOST POPULAR',
              bannerColor: 'rose',
              isActive: true,
              usageCount: 14,
            },
            {
              restaurant: admin._id,
              title: 'Corporate Desk Special: Flat ₹50 OFF',
              code: 'OFFICE50',
              description: 'Exclusive perk for corporate partner employees. Fast delivery straight to your floor!',
              discountType: 'flat',
              discountValue: 50,
              minOrderValue: 249,
              maxDiscount: null,
              applicableFor: 'company_delivery',
              badgeText: 'OFFICE EXCLUSIVE',
              bannerColor: 'indigo',
              isActive: true,
              usageCount: 29,
            },
            {
              restaurant: admin._id,
              title: 'Happy Hours Feast: 15% OFF',
              code: 'HAPPY15',
              description: 'Special afternoon and evening treat for cafe dine-in tables.',
              discountType: 'percentage',
              discountValue: 15,
              minOrderValue: 149,
              maxDiscount: 75,
              applicableFor: 'dine_in',
              badgeText: 'DINE-IN SPECIAL',
              bannerColor: 'amber',
              isActive: true,
              usageCount: 8,
            },
          ]);
          console.log('Auto-seeded default Crunch Republic offers.');
        }
      }
    } catch (err) {
      console.error('Error auto-seeding offers:', err.message);
    }
  }, 1000);
}).catch(err => console.error('DB connect error:', err));


const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = socketio(server, {
  cors: {
    origin: '*', // Allow all origins for testing purposes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Attach socketio instance to application so it is accessible in controllers
app.set('socketio', io);

// Middleware
app.use(cors());
// Set larger body limits to support base64 image uploads smoothly
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Socket.IO Room Joining and Handshakes
io.on('connection', (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  // Owner joins their custom room based on their User ID
  socket.on('join', (ownerId) => {
    if (ownerId) {
      socket.join(ownerId);
      console.log(`Socket ${socket.id} joined room: ${ownerId}`);
    }
  });

  // Customer table joins their specific room for live order & bill status
  socket.on('join_table', (data) => {
    if (data && data.tableNumber && data.restaurantId) {
      const tableRoom = `table_${data.tableNumber}_${data.restaurantId}`;
      socket.join(tableRoom);
      console.log(`Socket ${socket.id} joined table room: ${tableRoom}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dishRoutes = require('./routes/dishRoutes');
const orderRoutes = require('./routes/orderRoutes');
const offerRoutes = require('./routes/offerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/payment', paymentRoutes);


// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Restaurant QR Menu SaaS API is healthy' });
});

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Start Server
const PORT = process.env.PORT || 15000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT} (0.0.0.0)`);
});
