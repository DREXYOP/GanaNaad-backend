const mongoose = require("mongoose");
const config = require("../config.json");

connect();
async function connect() {
    mongoose.connect(config.mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set("strictQuery", true);
    mongoose.connection.once("open", () => {
        console.log("[DATABASE] Successfuly Connected To DataBase");
       
    });
    return;
}

module.exports = connect;