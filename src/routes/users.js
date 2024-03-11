const express = require('express');
const router = express.Router();

const verifyRoles = require('../middleware/verifyRoles');
const { UserController } = require('../controllers/user');
const verifyJWT = require('../middleware/verifyJWT');
const ROLES = require('../config/roles_list');

// router.route('/').get(Admin.getAllOrgUsers);
//.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
//.delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);
router
  .route('/')
  .get(
    verifyJWT,
    verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.User]),
    UserController.getAllUsers
  );

module.exports = router;
