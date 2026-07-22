const User = require("../models/User");

// ==========================
// START MINING
// ==========================

exports.startMining = async (req, res) => {
  try {
    const { telegramId, coin, doublePower } = req.body;

    const user = await User.findOne({ telegramId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const duration =
  coin === "INC"
    ? 10800 // 3 घंटे
    : 7200; // 2 घंटे

const reward =
  coin === "INC"
    ? (doublePower ? 60 : 30)
    : (doublePower ? 40 : 20);
    const startTime = new Date();

    const endTime = new Date(
      startTime.getTime() + duration * 1000
    );

    const miningData = {
      active: true,
      startTime,
      endTime,
      reward,
      claimReady: false,
      doublePower,
    };

    if (coin === "INC") {
      user.incMining = miningData;
    } else {
      user.dvlcMining = miningData;
    }

    await user.save();

    res.json({
      success: true,
      mining: miningData,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// GET MINING STATUS
// ==========================

exports.getMiningStatus = async (req, res) => {

  try {

    const { telegramId } = req.params;

    const user = await User.findOne({
      telegramId,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
      });

    }

    res.json({

      success: true,

      incMining: user.incMining,

      dvlcMining: user.dvlcMining,

      incBalance: user.incBalance,

      dvlcBalance: user.dvlcBalance,

    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ==========================
// CLAIM REWARD
// ==========================

exports.claimReward = async (req, res) => {

  try {

    const { telegramId, coin } = req.body;

    const user = await User.findOne({
      telegramId,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
      });

    }

    const mining =
      coin === "INC"
        ? user.incMining
        : user.dvlcMining;

    if (!mining.active) {

      return res.json({

        success: false,

        message: "Mining Not Active",

      });

    }

    if (new Date() < mining.endTime) {

      return res.json({

        success: false,

        message: "Mining Not Finished",

      });

    }

    if (coin === "INC") {

      user.incBalance += mining.reward;

      user.incMining = {

        active: false,

        reward: 0,

        claimReady: false,

      };

    } else {

      user.dvlcBalance += mining.reward;

      user.dvlcMining = {

        active: false,

        reward: 0,

        claimReady: false,

      };

    }

    await user.save();

    res.json({

      success: true,

      incBalance: user.incBalance,

      dvlcBalance: user.dvlcBalance,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};
