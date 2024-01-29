const express = require('express');
const router = express.Router();
const orgAdminController = require('../../controllers/orgAdminController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(orgAdminController.getAllOrgUsers)
    //.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    //.delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
