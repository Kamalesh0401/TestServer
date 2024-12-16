require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://TestUser:Test0401@cluster0.eqlho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database connection lost");
});
// Routes
app.use('/api/fuel', require('./routes/fuelSensorRoutes'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


