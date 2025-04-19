const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all customers');
});

router.get('/:id', (req, res) => {
    const customerId = req.params.id;
    res.send(`Get customer with ID: ${customerId}`);
});

router.post('/', (req, res) => {
    const newCustomer = req.body;
    res.send(`Create a new customer: ${JSON.stringify(newCustomer)}`);
});

router.put('/:id', (req, res) => {
    const customerId = req.params.id;
    const updatedCustomer = req.body;
    res.send(`Update customer with ID: ${customerId} to ${JSON.stringify(updatedCustomer)}`);
});

router.delete('/:id', (req, res) => {
    const customerId = req.params.id;
    res.send(`Delete customer with ID: ${customerId}`);
});

const today = new Date();

/*const inactiveCustomers = customers.filter(customer => {
    const lastContatctDate = new Date(customer.lastContactDate);
    const diffInDays = Math.floor((today - lastContatctDate) / (1000 * 60 * 60 * 24));
    return diffInDays > 30;
    
    res.json(inactiveCustomers);
});*/

module.exports = router;