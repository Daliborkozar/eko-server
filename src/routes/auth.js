const express = require('express');

const { AuthController } = require('../controllers/auth');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES = require('../config/roles_list');

const router = express.Router();

router.get(
  '/me',
  verifyJWT,
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.User]),
  AuthController.me
);
router.post('/login', AuthController.handleLogin);
router.post('/refresh', AuthController.handleRefreshToken);

module.exports = router;
