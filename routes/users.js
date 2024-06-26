// routes/users.js
const router = require('express').Router();
const userController = require('../controllers/userController');

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/logout", userController.logout);

module.exports = router;
