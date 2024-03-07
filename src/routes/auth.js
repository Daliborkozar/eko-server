const express = require('express');

const { AuthController } = require('../controllers/auth');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');

const router = express.Router();

router.get('/me', verifyJWT, verifyRoles, AuthController.me);
router.post('/login', AuthController.handleLogin);
router.post('/logout', AuthController.handleLogout);
router.post('/refresh', AuthController.handleRefreshToken);

module.exports = router;
