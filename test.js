const News = require("./src/database/schemas/news")
const mongoose = require("mongoose");
require("./src/database/connect.cjs")
const news = new News({
    _id: new mongoose.Types.ObjectId,
    title: "req.body.title",
    description: "req.body.description",
    author: "req.body.author",
    location: "req.body.location",
    // timeofUpload: new Date().toLocaleString(),
    imageUrl: "mhgfds"
  })
news.save();