const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/user.controller');

// GET    /api/user         → list all users
router.get('/',    ctrl.getAllUsers);

// GET    /api/user/:id     → get one user
router.get('/:id', ctrl.getUserById);

// POST   /api/user         → create a new user
router.post('/',   ctrl.createUser);

// PUT    /api/user/:id     → update an existing user
router.put('/:id', ctrl.updateUser);

// DELETE /api/user/:id     → remove a user
router.delete('/:id', ctrl.deleteUser);

module.exports = router;