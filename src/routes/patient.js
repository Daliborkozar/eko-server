const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES = require('../config/roles_list');
const { PatientController } = require('../controllers/patient');

const router = express.Router();

router.post(
  '/',
  verifyJWT,
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.User]),
  PatientController.createPatient
);

module.exports = router;
