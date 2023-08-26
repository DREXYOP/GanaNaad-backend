const app = require("express")();
const port = 40990;
const auth = require("./authMiddleWare.js")
require("./database/connect.js")
const mongoose = require("mongoose");
const News = require("./database/schemas/news");
app.listen(port,
  () => console.log(`api listening at http://localhost:${port}/`),

)

app.use(auth);

app.get("/", async (req, res) => {

  res.status(200).json({ status: "nvm" })
})

app.get("/v1", async (req, res) => {

  res.status(200).json({ status: "ok" })
})


app.get("/v1/news/get", async (req, res) => {
  const data = await News.find({})
  res.status(200).json({ data });
  console.log("Recived a GET request")
})



app.post("/v1/news/post", async (req, res) => {
  const news = new News({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    location: req.body.location,
    // timeofUpload: new Date().toLocaleString(),
    imageUrl: req.body.imageUrl ? req.body.imageUrl : "https://assets.babycenter.com/ims/2020/11/img_noimageavailable.svg"
  })
  await news.save()
    .then(r => {
      console.log(r);
      res.status(200).json({ result: r })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })

  res.send("this is post")
  console.log("Recived a POST request")
})

app.post("/v1/news/delete", async (req, res) => {
  console.log("Recived a Delete request");
  await News.deleteOne({ _id: req.body.newsId })
    .then(r => {
      console.log(`Successfully deleted ${req.body.newsId}`)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })

})

app.get("/v1/news/get/latest", async (req, res) => {
  await News.findOne({})
    .sort({ updatedAt: -1 })
    .exec((err, latestUpload) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json({ latestUpload });
      }
    })

  console.log("Recived a GET request")
})

app.get("/v1/news/get/today", async (req, res) => {
  await News.findOne({})
    .sort({ updatedAt: -1 })
    .exec((err, latestUpload) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json({ latestUpload });
      }
    })

  console.log("Recived a GET request")
})

app.get("/v1/news/get/thisWeek", async (req, res) => {
  await News.findOne({})
    .sort({ updatedAt: -1 })
    .exec((err, latestUpload) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json({ latestUpload });
      }
    })

  console.log("Recived a GET request")
})

app.get('/v1/news/get/:id', async (req, res) => {
  await News.findOne({ _id: req.params.id })
    .then(r => {
      res.send(r)
    })
    .catch(err => {
      console.log("something went wrong")
      res.status(500).json({ "err": err })
    })

})

