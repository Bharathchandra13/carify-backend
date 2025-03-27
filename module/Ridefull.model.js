const mongoose = require("mongoose");

const RideFullSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    route: {
        from: { type: String, required: true },
        to: { type: String, required: true }
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carType: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
    fullCapacity: { type: Boolean, default: true }
});

const RideFull = mongoose.model("RideFull", RideFullSchema);
module.exports = RideFull; // Ensure it's exported
