const mongoose = require("mongoose");

const CarpoolBookingSchema = new mongoose.Schema({
    carpoolId: { type: mongoose.Schema.Types.ObjectId, ref: "Carpool", required: true },
    route: {
        from: { type: String, required: true },
        to: { type: String, required: true }
    },
    date: { type: Date, required: true },
    travelers: { type: Number, required: true },
    passengerName: { type: String, required: true },
    contact: { type: String, required: true }
});

const bookingcp = mongoose.model("bookingcp", CarpoolBookingSchema);
module.exports = bookingcp;
