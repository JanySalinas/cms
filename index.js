require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const customerRoutes = require('./routes/customer');
const activityRoutes = require('./routes/activity');
const userRoutes = require('./routes/user');
const { authenticate, authorize } = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Autentiserte ruter
app.use('/api/customer', authenticate, customerRoutes);
app.use('/api/activity', authenticate, activityRoutes);
app.use('/api/user', authenticate, userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Failed to synchronize database:', error);
    }
});