const ROLES_LIST = require('../config/roles_list');

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];

    if (!ROLES_LIST.includes(req.role) || !rolesArray.includes(req.role))
      return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
