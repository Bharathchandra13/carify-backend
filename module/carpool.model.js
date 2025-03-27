const mongoose = require("mongoose");

const CarpoolSchema = new mongoose.Schema({
    driver: { type: String, required: true },
    route: {
        from: { type: String, required: true },
        to: { type: String, required: true }
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    seatsAvailable: { type: Number, required: true }
});

module.exports = mongoose.model("Carpool", CarpoolSchema);
