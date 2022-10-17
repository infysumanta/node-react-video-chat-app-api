const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

/* Importing the authRoutes.js file from the routes folder. */
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

/* Telling the server to use the authRoutes.js file for any request that starts with /api/auth. */
app.use("/api/auth", authRoutes);

/* Creating a server. */
const server = http.createServer(app);

/* Connecting to the database. */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed. Server is not Started");
    console.error(err);
  });
