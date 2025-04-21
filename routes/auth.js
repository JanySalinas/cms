const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/user');  // Sequelize‑modellen for brukere

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Sjekk om e‑post finnes fra før
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ message: 'E‑post er allerede registrert' });
    }
    // Hash passordet og lagre ny bruker
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, passwordHash });
    res.status(201).json({ message: 'Bruker registrert', userId: newUser.id });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Serverfeil ved registrering' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Finn bruker
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Ugyldige innloggingsdetaljer' });
    }
    // Sjekk passord
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Ugyldige innloggingsdetaljer' });
    }
    // Generer JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Serverfeil ved innlogging' });
  }
});

module.exports = router;