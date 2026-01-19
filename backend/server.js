const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware, routes, etc.

if (process.env.NODE_ENV !== "test") {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("MongoDB URI not set");
  } else {
    mongoose
      .connect(mongoUri)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
