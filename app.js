// const express = require('express');
// const app = express();
// const cors = require('cors');
// require('dotenv').config();

// const sequelize = require('./config/database');
// const userRoutes = require('./routes/user');
// const customerRoutes = require('./routes/customer');
// const activityRoutes = require('./routes/activity');

// app.use(cors());
// app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/customers', customerRoutes);
// app.use('/api/activities', activityRoutes);

// sequelize.sync({ force: false }) // use force: true to drop & recreate tables
//   .then(() => console.log('Database connected.'))
//   .catch(err => console.log(err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));