const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userController");

// नया User बनाओ
router.post("/create", createUser);

module.exports = router;