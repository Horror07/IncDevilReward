const User = require("../models/User");

// नया User बनाना
const createUser = async (req, res) => {
    try {
        const {
            telegramId,
            username,
            firstName
        } = req.body;

        let user = await User.findOne({ telegramId });

        if (!user) {
            user = await User.create({
                telegramId,
                username,
                firstName,
                referralCode: Math.random().toString(36).substring(2, 8)
            });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createUser
};