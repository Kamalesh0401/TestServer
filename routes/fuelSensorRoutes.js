const express = require('express');
const router = express.Router();
const FuelSensorData = require('../models/fuelSensorData');

// POST: Save sensor data
router.post('/', async (req, res) => {
    try {

        console.log('Fuel Sensor Request : ', req.body);
        const { sensorId, fuelLevel, temprature, humidity } = req.body;

        if (!sensorId || fuelLevel === undefined) {
            return res.status(400).json({ message: 'Sensor ID and fuel level are required' });
        }

        const newData = new FuelSensorData({ sensorId, fuelLevel, temprature, humidity });
        const savedData = await newData.save();

        res.status(201).json(savedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error in Save Fuel Sensor Data' });
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