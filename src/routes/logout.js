const express = require('express');
const AuthController = require('../controllers/auth');
const router = express.Router();

router.get('/', AuthController.handleLogout);

module.exports = router;
