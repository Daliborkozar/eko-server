//* allowedRoles is an array of roles
const verifyRoles = allowedRolesList => {
  return (req, res, next) => {
    if (!req?.user) return res.sendStatus(401);

    if (!req.user.role) return res.sendStatus(401);

    if (!allowedRolesList.includes(req.user.role)) return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
