const mongoose = require("mongoose");

const miningSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },

  startTime: {
    type: Date,
    default: null,
  },

  endTime: {
    type: Date,
    default: null,
  },

  reward: {
    type: Number,
    default: 0,
  },

  claimReady: {
    type: Boolean,
    default: false,
  },

  doublePower: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      default: "",
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    incBalance: {
      type: Number,
      default: 0,
    },

    dvlcBalance: {
      type: Number,
      default: 0,
    },

    incMining: {
      type: miningSchema,
      default: () => ({}),
    },

    dvlcMining: {
      type: miningSchema,
      default: () => ({}),
    },

    referralCode: {
  type: String,
  required: true,
  unique: true,
},

    referredBy: {
      type: String,
      default: "",
    },

    totalReferrals: {
      type: Number,
      default: 0,
    },

    dailyRewardDay: {
      type: Number,
      default: 0,
    },

    lastDailyReward: {
      type: Date,
      default: null,
    },

    luckySpinCount: {
      type: Number,
      default: 0,
    },

    walletAddress: {
      type: String,
      default: "",
    },

    notifications: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
