const mongoose = require('mongoose')

const newsSchema =  new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    location: { type: String, required: true },
    _upload_date: Date,
    imageUrl: { type: String, required: true },
    
  },{timestamps:true})

module.exports = mongoose.model('News',newsSchema);