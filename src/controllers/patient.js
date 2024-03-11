const ROLES = require('../config/roles_list');
const Patient = require('../model/patient');

const createPatient = async (req, res) => {
  const { user } = req;

  const patientData = {
    ...req.body,
    admittedBy: user._id,
    organization: user.organization,
    role: ROLES.Patient,
  };

  const patient = (await Patient.create(patientData)).toObject();

  if (!patient) res.status(500).send({ message: 'Unable to create a patient' });

  return res.status(201).send(patient);
};

module.exports = PatientController = { createPatient };
