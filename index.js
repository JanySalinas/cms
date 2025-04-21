require('dotenv').config();
const path    = require('path');
const express = require('express');
const cors    = require('cors');

// 1) Initialize Sequelize & load all models + associations
const sequelize = require('./config/database');
require('./models');  

// 2) Import routes & auth middleware
const authRoutes     = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const activityRoutes = require('./routes/activity');
const userRoutes     = require('./routes/user');
const { authenticate } = require('./middleware/authMiddleware');

const app = express();

// 3) Global middleware
app.use(cors());
app.use(express.json());

// 4) Public endpoints
app.use('/api/auth', authRoutes);

// 5) Protected endpoints
app.use('/api/customer', authenticate, customerRoutes);
app.use('/api/activity', authenticate, activityRoutes);
app.use('/api/user',     authenticate, userRoutes);

// 6) Serve frontend static files
app.use(express.static(path.join(__dirname, 'crm-frontend')));

// 7) SPA catch‑all
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'crm-frontend', 'index.html'));
});

// 8) Start server & sync database
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
});