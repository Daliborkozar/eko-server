const express = require('express');
const Patient = require('../controllers/patient');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');

const router = express.Router();

router.post('/', verifyJWT, verifyRoles, Patient.createPatient);

module.exports = router;
