require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

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

// ==================== Start Server ====================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Telegram Bot Start
  require("./bot");
});
