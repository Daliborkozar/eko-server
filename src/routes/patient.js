const express = require('express');
const Patient = require('../controllers/patient');

const router = express.Router();

router.post('/', Patient.handleNewUser);

module.exports = router;
