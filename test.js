require("./src/database/connect.js")
const mongoose = require("mongoose");
const News = require("./src/database/schemas/news");
const news = new News({
    _id: new mongoose.Types.ObjectId,
    title: "test4",
    description: "test4 xyz",
    author: "test4",
    location: "India",
    imageUrl: "https://assets.babycenter.com/ims/2020/11/img_noimageavailable.svg"
  });
news.save();
