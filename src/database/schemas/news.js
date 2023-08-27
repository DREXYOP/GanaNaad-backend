const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },

  title: { type: String, required: true },

  description: { type: String, required: true },

  author: { type: String, required: true },

  location: { type: String, required: true },

  imageUrl: { type: String, required: true },

  uploadDate: { type: Date, required: true }

}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);