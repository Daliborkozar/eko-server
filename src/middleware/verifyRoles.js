const Role = require('../model/role');

const verifyRoles = async (req, res, next) => {
  if (!req?.user) return res.sendStatus(401);

  if (!req.user.role) return res.sendStatus(401);

  const role = await Role.findOne({ name: req.user.role }).lean();

  if (!role) return res.sendStatus(401);

  req.user.manages = role.manages;

  next();
};

module.exports = verifyRoles;
