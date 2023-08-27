const mongoose = require("mongoose");
const config = require("../config");

connect();
async function connect() {
    mongoose.connect(config.mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set("strictQuery", true);
    const db = mongoose.connection;
    db.once("open", async () => {
        console.log("[DATABASE] Successfuly Connected To DataBase");

    });
    db.on("error", async (error) => {
        console.error("[DATABASE] Error connecting to the database:", error);
    });

    db.on("disconnected", async () => {
        console.log("[DATABASE] Disconnected from the database");
        mongoose.connect(config.mongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    db.on("reconnected", async () => {
        console.log("[DATABASE] Reconnected to the database");
    });

    db.on("close", async () => {
        console.log("[DATABASE] Connection to the database closed");
        await mongoose.connect(config.mongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    return;
}

module.exports = connect;