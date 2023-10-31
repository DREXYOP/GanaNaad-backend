/* eslint-disable */

// require("./src/database/connect.js");
// const mongoose = require("mongoose");
// const News = require("./src/database/schemas/News.js");
// const currentDate = new Date();
// const startOfWeek = new Date(currentDate);
// startOfWeek.setHours(0, 0, 0, 0);
// startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week (Sunday)

// const endOfWeek = new Date(currentDate);
// endOfWeek.setHours(23, 59, 59, 999);
// endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Saturday)

// News.find({
//     createdAt: {
//         $gte: startOfWeek,
//         $lte: endOfWeek,
//     },
// }).exec((err, weekUploads) => {
//     if (err) {
//         console.error("Error:", err);
//     } else {
//         console.log("This Week's Uploads:", weekUploads);
//     }
// });

console.log("hello world");