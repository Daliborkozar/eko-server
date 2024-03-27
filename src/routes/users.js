const express = require('express');
const router = express.Router();

const verifyRoles = require('../middleware/verifyRoles');
const { UserController } = require('../controllers/user');
const verifyJWT = require('../middleware/verifyJWT');
const ROLES = require('../config/roles_list');

router
  .route('/')
  .get(
    verifyJWT,
    verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.User]),
    UserController.getAllUsers
  )
  .post(verifyJWT, verifyRoles([ROLES.SuperAdmin, ROLES.Admin]), UserController.create);

module.exports = router;
