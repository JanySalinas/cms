const { Customer } = require('../models');

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const newCustomer = await Customer.create({ name, email, phone, company });
    res.status(201).json({ message: 'Customer created.', customer: newCustomer });
  } catch (err) {
    res.status(500).json({ message: 'Error creating customer.', error: err.message });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customers.', error: err.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found.' });

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customer.', error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) return res.status(404).json({ message: 'Customer not found.' });

    await customer.update({ name, email, phone, company });
    res.status(200).json({ message: 'Customer updated.', customer });
  } catch (err) {
    res.status(500).json({ message: 'Error updating customer.', error: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found.' });

    await customer.destroy();
    res.status(200).json({ message: 'Customer deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting customer.', error: err.message });
  }
};
