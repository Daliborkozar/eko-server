const express = require('express');
const Patient = require('../controllers/patient');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES = require('../config/roles_list');

const router = express.Router();

router.post(
  '/',
  verifyJWT,
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.User]),
  Patient.createPatient
);

module.exports = router;
