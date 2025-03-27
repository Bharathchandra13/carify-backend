const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "CarService", required: true },
    date: { type: String, required: true }, // Format: "YYYY-MM-DD"
    time: { type: String, required: true }  // Example: "10:00 AM"
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
