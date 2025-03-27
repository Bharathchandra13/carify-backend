const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    leavingFrom: { type: String, required: true },
    goingTo: { type: String, required: true },
    selectedDate: { type: Date, required: true },
    vehicleType: { type: String, required: true },
}, { timestamps: true });

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
