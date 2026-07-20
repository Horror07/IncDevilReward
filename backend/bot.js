require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/User");

// Remove old webhook if any
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

bot
  .deleteWebHook({ drop_pending_updates: true })
  .then(() => {
    console.log("✅ Old Webhook Removed");
  })
  .catch((err) => {
    console.log("Webhook Error:", err.message);
  });

bot.onText(/\/start/, async (msg) => {
  try {
    const telegramId = msg.from.id.toString();
    const username = msg.from.username || "";
    const firstName = msg.from.first_name || "";
    const lastName = msg.from.last_name || "";

    let user = await User.findOne({ telegramId });

    if (!user) {
      user = await User.create({
        telegramId,
        username,
        firstName,
        lastName,
        referralCode: Math.random().toString(36).substring(2, 8),
      });

      console.log("✅ New User Created:", telegramId);
    }

    await bot.sendMessage(
      msg.chat.id,
      `🎉 Welcome ${firstName}!\n\n🚀 Inc Devil Reward में आपका स्वागत है।`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Open Inc Devil Reward",
                web_app: {
                  url: "https://incdevilreward-1.onrender.com",
                },
              },
            ],
          ],
        },
      }
    );
  } catch (err) {
    console.error("BOT ERROR:", err);

    await bot.sendMessage(msg.chat.id, "❌ कुछ गलती हो गई।");
  }
});

console.log("🤖 Telegram Bot Started...");
