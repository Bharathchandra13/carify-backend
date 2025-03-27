const express = require('express');
const router = express.Router();
const Carpooler = require('../models/Carpooler');

// Register a new carpooler
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, carDetails, seatsAvailable, startLocation, endLocation, departureTime } = req.body;
        const carpooler = new Carpooler({
            name, email, phone, carDetails, seatsAvailable, startLocation, endLocation, departureTime
        });
        await carpooler.save();
        res.status(201).json({ message: 'Carpooler registered successfully', carpooler });
    } catch (error) {
        res.status(500).json({ error: 'Error registering carpooler' });
    }
});

// Get all available carpoolers
router.get('/', async (req, res) => {
    try {
        const carpoolers = await Carpooler.find();
        res.json(carpoolers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching carpoolers' });
    }
});

module.exports = router;
