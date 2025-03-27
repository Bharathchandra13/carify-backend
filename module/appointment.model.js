const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "CarService", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

