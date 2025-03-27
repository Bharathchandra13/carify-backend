// Define Schema & Model

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const feedback = mongoose.model("feedback", feedbackSchema);
