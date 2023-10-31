const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        message: { type: String, required: true },
        _email: { type: String, require: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tickets", ticketSchema);
