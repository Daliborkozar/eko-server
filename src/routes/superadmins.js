const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const SuperAdminController = require('../controllers/superAdmin');

router.route('/').get(verifyRoles(ROLES_LIST.SuperAdmin));

//.delete(verifyRoles(ROLES_LIST.Admin), Admin.deleteAdminUser);
router.route('/users').get(verifyRoles(ROLES_LIST.SuperAdmin), SuperAdminController.getAllUsers);

module.exports = router;
