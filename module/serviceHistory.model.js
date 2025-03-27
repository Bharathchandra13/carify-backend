const mongoose = require("mongoose");

const serviceHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "CarService", required: true },
    date: { type: String, required: true }, // Store as YYYY-MM-DD
    time: { type: String, required: true },
    status: { type: String, enum: ["upcoming", "completed"], required: true } // Define status
});

module.exports = mongoose.model("ServiceHistory", serviceHistorySchema);
