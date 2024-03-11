const ROLES_LIST = ['SuperAdmin', 'Admin', 'User', 'Patient'];

const ROLES = {
  SuperAdmin: {
    name: 'SuperAdmin',
    manages: ['SuperAdmin', 'Admin', 'User', 'Patient'],
  },
  Admin: {
    name: 'Admin',
    manages: ['User', 'Patient'],
  },
  User: {
    name: 'User',
    manages: ['User', 'Patient'],
  },
  Patient: {
    name: 'Patient',
    manages: [''],
  },
};

module.exports = { ROLES_LIST, ROLES };
