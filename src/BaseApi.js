const express = require("express");
const app = express();
const config = require("./config.json");
const auth = require("./middleware/authMiddleWare.js");
const ratelimit = require("./middleware/ratelimitMiddleWare.js");
const mongoose = require("mongoose");
const News = require("./database/schemas/news");
const cors = require("cors")

require("./database/connect.js");


app.listen(config.port,
  () => console.log(`api listening at http://localhost:${config.port}/`),

);
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.set("trust proxy", 1);
app.use(ratelimit);
app.use(express.json());
app.use(auth);


app.get("/", async (req, res) => {
  res.status(200).json({ status: "Working" });
});

app.get("/v1", async (req, res) => {
  res.status(200).json({ status: "Working", version: "v1" });
});


app.get("/v1/news/get", async (req, res) => {
  const data = await News.find({});
  res.status(200).json(data);
  console.log("Recived a GET request");
});


app.post("/v1/news/post", async (req, res) => {
  console.log("Recived a POST request");
  const news = new News({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title ? req.body.title : "undifined",
    description: req.body.description ? req.body.description : "undifined",
    author: req.body.author ? req.body.author : "undifined",
    location: req.body.location ? req.body.location : "undifined",
    uploadDate: new Date,
    imageUrl: req.body.imageUrl ? req.body.imageUrl : "https://assets.babycenter.com/ims/2020/11/img_noimageavailable.svg"
  });
  await news.save()
    .then(r => {
      res.status(200).json({ result: r });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


app.delete("/v1/news/delete/:id", async (req, res) => {
  console.log("Recived a Delete request");
  await News.deleteOne({ _id: escape(req.params.id) })
    .then(r => {
      console.log(`Successfully deleted ${escape(req.params.id)}`);
      console.log(r);
      res.status(200).send(`success fully deleted ${escape(req.params.id)}`);
    })
    .catch(err => {
      res.status(500).send(`${err}`);
    });

});


app.get("/v1/news/get/international", async (req, res) => {
  const data = await News.find({
    location : "international"
  })
  res.status(200).json(data);
  console.log("Recived a GET request");
});

app.get("/v1/news/get/latest", async (req, res) => {
  await News.findOne({})
    .sort({ updatedAt: -1 })
    .exec((err, latestUpload) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(latestUpload);
      }
    });

  console.log("Recived a GET request");
});


app.get("/v1/news/get/today", async (req, res) => {
  const targetDate = new Date(); // Use the current date as the target date
  targetDate.setHours(0, 0, 0, 0); // Set time to the start of the day

  const nextDay = new Date(targetDate);
  nextDay.setDate(targetDate.getDate() + 1);

  try {
    const dayDocuments = await News.find({
      createdAt: {
        $gte: targetDate,
        $lt: nextDay
      }
    });

    res.status(200).json(dayDocuments);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }

  console.log("Recived a GET request");
});


app.get("/v1/news/get/thisWeek", async (req, res) => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week (Sunday)

  const endOfWeek = new Date(currentDate);
  endOfWeek.setHours(23, 59, 59, 999);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Saturday)

  News.find({
    createdAt: {
      $gte: startOfWeek,
      $lte: endOfWeek
    }
  })
    .exec((err, weekUploads) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ "err": err });
      } else {
        res.status(200).json(weekUploads);
      }
    });
  console.log("Recived a GET request");
});


app.get("/v1/news/get/:id", async (req, res) => {
  await News.findOne({ _id: escape(req.params.id) })
    .then(r => {
      res.status(200).send(r);
    })
    .catch(err => {
      console.log("something went wrong");
      res.status(500).json({ "err": err });
    });
});