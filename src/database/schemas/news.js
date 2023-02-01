const mongoose = require('mongoose')

const newsSchema =  new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    author: String,
    location: String,
    timestamp: Number,
    imageUrl:String
  })

module.exports = mongoose.model('News',newsSchema);