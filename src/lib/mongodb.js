// lib/mongodb.js
const mongoose = require("mongoose");

// MongoDB URI and database name
const uri =
  "mongodb+srv://admin:admin@omnimart.sp67o5m.mongodb.net/?retryWrites=true&w=majority&appName=OmniMart";

// Enable Mongoose debugging mode for detailed logs
mongoose.set("debug", true);

async function connectToDatabase() {
  console.log("Attempting to connect to MongoDB...");

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // 60 seconds
      connectTimeoutMS: 60000,
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to the database");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from the database");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to application termination");
    process.exit(0);
  });
}

module.exports = connectToDatabase;
