const express = require("express");
const app = express();
const config = require("./config.js");
const auth = require("./middleware/authMiddleWare.js");
const ratelimit = require("./middleware/ratelimitMiddleWare.js");

const mongoose = require("mongoose");
const News = require("./database/schemas/News");
const Ticket = require("./database/schemas/Tickets");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("./database/connect.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploades/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log(file);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.listen(config.port, () =>
    console.log(`api listening at http://localhost:${config.port}/`)
);

// eslint-disable-next-line no-undef
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.set("trust proxy", 1);
app.use(ratelimit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);

/** Routes */

app.get("/", async (req, res) => {
    res.status(200).json({ status: "Working" });
});

app.get("/v1", async (req, res) => {
    res.status(200).json({ status: "Working", version: "v1" });
});

app.get("/v1/news/get", async (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    const data = await News.find({});
    res.status(200).json(data);
    console.log("Recived a GET request");
});

app.post("/v1/news/post", upload.single("file"), async (req, res) => {
    console.log("Recived a POST request");

    const news = new News({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title ? req.body.title : "undifined",
        description: req.body.description ? req.body.description : "undifined",
        longDescription: req.body.longDescription
            ? req.body.longDescription
            : "undifined",
        author: req.body.author ? req.body.author : "undifined",
        location: req.body.location ? req.body.location : "undifined",
        uploadDate: new Date(),
        imageUrl: req.file.path
            ? `${req.file.path}`
            : "https://assets.babycenter.com/ims/2020/11/img_noimageavailable.svg",
    });
    await news
        .save()
        .then((r) => {
            res.status(200).json({ result: r });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

app.delete("/v1/news/delete/:id", async (req, res) => {
    console.log("Recived a Delete request");
    await News.deleteOne({ _id: escape(req.params.id) })
        .then((r) => {
            console.log(`Successfully deleted ${escape(req.params.id)}`);
            console.log(r);
            res.status(200).send(
                `success fully deleted ${escape(req.params.id)}`
            );
        })
        .catch((err) => {
            res.status(500).send(`${err}`);
        });
});

app.get("/v1/news/get/international", async (req, res) => {
    const data = await News.find({
        location: "international",
    });
    res.status(200).json(data);
    console.log("Recived a GET request");
});

app.get("/v1/news/get/tripura", async (req, res) => {
    const data = await News.find({
        location: "tripura",
    });
    res.status(200).json(data);
    console.log("Recived a GET request");
});

app.get("/v1/news/get/india", async (req, res) => {
    const data = await News.find({
        location: "india",
    });
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
                $lt: nextDay,
            },
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
            $lte: endOfWeek,
        },
    }).exec((err, weekUploads) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ err: err });
        } else {
            res.status(200).json(weekUploads);
        }
    });
    console.log("Recived a GET request");
});

app.get("/v1/news/get/:id", async (req, res) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    const dumyObject = {
        _id: "none",
        title: "No Article Available For The Provided Id.",
        description: "undifined",
        longDescription: "undifined",
        author: "undifined",
        location: "undifined",
        uploadDate: "undifined",
        imageUrl:
            "https://assets.babycenter.com/ims/2020/11/img_noimageavailable.svg",
    };
    if (isValid) {
        await News.findOne({ _id: escape(req.params.id) })
            .then((r) => {
                res.status(200).send(r);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.status(200).send(dumyObject);
    }
});

app.post("/v1/supportticket", async (req, res) => {
    console.log("Recived a POST request");

    const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        _email: req.body.email,
        message: req.body.message,
    });
    await ticket
        .save()
        .then((r) => {
            res.status(200).json({ result: r });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
