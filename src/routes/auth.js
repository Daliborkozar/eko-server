const express = require('express');
const { AuthController } = require('../controllers/auth');

const router = express.Router();

router.post('/login', AuthController.handleLogin);
router.post('/logout', AuthController.handleLogout);
router.post('/refresh', AuthController.handleRefreshToken);

module.exports = router;
