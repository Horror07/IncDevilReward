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

    // ==========================
    // CHECK IF MINING ALREADY RUNNING
    // ==========================
    const mining =
      coin === "INC"
        ? user.incMining
        : user.dvlcMining;

    if (mining.active && new Date() < mining.endTime) {
      return res.json({
        success: false,
        message: "Mining Already Running",
      });
    }

    // ==========================
    // MINING TIME
    // ==========================
    const duration =
      coin === "INC"
        ? 10800 // 3 घंटे
        : 7200; // 2 घंटे

    // ==========================
    // REWARD
    // ==========================
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
