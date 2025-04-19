const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all users');
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Get user with ID: ${userId}`);
});

router.post('/', (req, res) => {
    const newUser = req.body;
    res.send(`Create a new user: ${JSON.stringify(newUser)}`);
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`Update user with ID: ${userId} to ${JSON.stringify(updatedUser)}`);
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Delete user with ID: ${userId}`);
});

module.exports = router;