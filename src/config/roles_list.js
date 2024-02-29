const ROLES_LIST = ['SuperAdmin', 'Admin', 'User', 'Patient'];

// roles as in db
const ROLES = [
  {
    name: 'SuperAdmin',
    manages: ['SuperAdmin', 'Admin', 'User', 'Patient'],
  },
  {
    name: 'Admin',
    manages: ['User', 'Patient'],
  },
  {
    name: 'User',
    manages: ['User', 'Patient'],
  },
  {
    name: 'Patient',
    manages: [''],
  },
];

module.exports = ROLES_LIST;
