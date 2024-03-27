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

const getAllPatients = async (req, res) => {
  const { user } = req;

  const query = buildPatientQuery(user._id, user.role, user.organization);

  const patients = await Patient.find(query).lean();

  return res.status(200).json({ patients });
};

const buildPatientQuery = (userId, role, organization) => {
  return role === ROLES.Admin
    ? {
        organization,
      }
    : role === ROLES.User
      ? {
          organization,
          admittedBy: userId,
        }
      : {}; //superadmin
};

module.exports.PatientController = { createPatient, getAllPatients };
