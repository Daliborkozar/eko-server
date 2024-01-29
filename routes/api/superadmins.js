const express = require("express");
const router = express.Router();
const adminUsersController = require("../../controllers/superAdminsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").get(verifyRoles(ROLES_LIST.SuperAdmin), adminUsersController.getAllAdminUsers);
//.delete(verifyRoles(ROLES_LIST.Admin), adminUsersController.deleteAdminUser);
router
  .route("/users")
  .get(verifyRoles(ROLES_LIST.SuperAdmin), adminUsersController.getAllUsers);

module.exports = router;
