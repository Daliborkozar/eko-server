const ROLES = require('../config/roles_list');
const User = require('../model/user');
const { Utils } = require('../utils/utilts');

const getAllUsers = async (req, res) => {
  const { user } = req;

  const uQuery = buildUserQuery(user._id, user.role, user.organization);

  const users = await User.find(uQuery).lean();

  return res.status(200).send({ users });
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'User ID required' });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'User ID required' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const create = async (req, res) => {
  const { pwd, role, organization, displayName, email } = req.body;

  if (!pwd || !role || !organization || !displayName || !email) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  const exists = await User.findOne({ email }); //unique

  if (exists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPwd = await Utils.hashPassword(pwd);

  // create and store the new user
  await User.create({
    password: hashedPwd,
    role,
    displayName,
    organization,
    email,
  });

  return res.status(201).json({ message: `New user created!` });
};

const buildUserQuery = (userId, role, organization) => {
  const baseQuery = { _id: { $ne: userId } };

  return role === ROLES.Admin
    ? {
        ...baseQuery,
        role: ROLES.User,
        organization,
      }
    : baseQuery; // superadmin
};

module.exports.UserController = {
  getAllUsers,
  deleteUser,
  getUser,
  create,
};
