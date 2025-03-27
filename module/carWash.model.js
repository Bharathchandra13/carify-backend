const mongoose = require("mongoose");

const carWashSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    contact: { type: String, required: true },
    rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("CarWash", carWashSchema);
