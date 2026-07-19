const express = require("express");
const router = express.Router();

const {
  startMining,
  claimReward,
  getMiningStatus,
} = require("../controllers/miningController");

// Start Mining
router.post("/start", startMining);

// Claim Reward
router.post("/claim", claimReward);

// Get Mining Status
router.get("/status/:userId", getMiningStatus);

module.exports = router;