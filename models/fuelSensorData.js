const mongoose = require('mongoose');

const FuelSensorDataSchema = new mongoose.Schema({
    sensorId: { type: String, required: false },
    fuelLevel: { type: String, required: false },
    humidity: { type: String, required: false },
    temprature: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FuelSensorData', FuelSensorDataSchema);
