const mongoose = require('mongoose')

const newsSchema =  new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    author: String,
    location: String,
    timeofUpload: Number,
    imageUrl:String,
    
  },{timestamps:true})

module.exports = mongoose.model('News',newsSchema);