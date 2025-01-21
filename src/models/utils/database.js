
const mongoose = require("mongoose");

async function connectDB() {
    let databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    try {
        await mongoose.connect(databaseUrl);
        console.log("Connected to the DB!");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}

module.exports = { connectDB };