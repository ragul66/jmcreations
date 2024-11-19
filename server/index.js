const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//routes path
const admin = require("./src/routes/adminroute");
const product = require("./src/routes/productroute");
const category = require("./src/routes/categoryroute");

//Load environment variable
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION;

if (!CONNECTION) {
  console.log("CONNECTION string is not provided.");
  process.exit(1);
}

//Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

//routes
app.use("/admin", admin);
app.use("/product", product);
app.use("/category", category);

app.get("/", (req, res) => {
  res.send("Welcome to jkcreations API Routes");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION, {
      dbName: "jmcreations",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during connection", error);
    process.exit(1);
  }

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("MongoDB disconnected through app termination");
      process.exit(0);
    });
  });
};

start();
