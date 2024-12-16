const express = require('express');
const router = express.Router();
const FuelSensorData = require('../models/fuelSensorData');

// POST: Save sensor data
router.post('/', async (req, res) => {

    console.log('Fuel Sensor Request : ', req.body);
    const { sensorId, fuelLevel, temprature, humidity } = req.body;

    if (!sensorId || fuelLevel === undefined) {
        return res.status(400).json({ message: 'Sensor ID and fuel level are required' });
    }

    const newData = new FuelSensorData({ sensorId, fuelLevel, temprature, humidity });
    try {

        const savedData = await newData.save();
        console.log('Saved fuel sensor data:', savedData);
        res.status(201).json(savedData);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ message: 'Validation errors Fuel Sensor Data:', errors });
        } else {
            console.error('Error saving data:', err);
            return res.status(500).json({ message: 'Internal server error Fuel Sensor Data Save' });
        }
    }
});

// GET: Fetch all sensor data
router.get('/', async (req, res) => {
    try {
        const data = await FuelSensorData.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error in Get Fuel Sensor Data' });
    }
});

module.exports = router;