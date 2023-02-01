const app = require("express")();
const port = 4090;
require("./database/connect.cjs")
const mongoose = require("mongoose");
const News = require("./database/schemas/news");
app.listen(port,
    () => console.log(`api listening at http://localhost:${port}/`),
   
    )

app.get("/v1", async (req,res)=>{
  
    res.status(200).json({status:"ok"})
})


app.get("/v1/news/get",async (req , res)=>{
  const data = await News.find({})
  res.status(200).json({data});
  console.log("Recived a GET request")
})


app.post("/v1/news/post" ,  async (req,res)=>{
  const news = new News({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    location: req.body.location,
    timestamp: new Date().toLocaleString(),
    imageUrl: req.body.imageUrl
  })
  news.save().then(r => {
    console.log(r);
    res.status(200).json({result:r})
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({error: err})
  })
  console.log("Recived a POST request")
})

app.post("/v1/news/delete" ,  async (req,res)=>{
  
  News.deleteOne({_id:req.body.newsId})
  .then(r => {
    console.log
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({error: err})
  })
  console.log("Recived a Delete request")
})



