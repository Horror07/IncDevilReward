require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const miningRoutes = require("./routes/miningRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());

// ==================== Routes ====================
app.get("/", (req, res) => {
  res.send("🚀 IncDevilReward Backend Running...");
});

app.use("/api/users", userRoutes);
app.use("/api/mining", miningRoutes);

// ==================== MongoDB ====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Telegram Bot
    require("./bot");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed");
    console.log(err);
  });