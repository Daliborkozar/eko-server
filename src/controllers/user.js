const ROLES = require('../config/roles_list');
const Patient = require('../model/patient');
const User = require('../model/user');

const getAllUsers = async (req, res) => {
  const { user } = req;

  const query = { role: { $in: user.role.manages, organization: user.organization } };

  const [users, patients] = await Promise.all([User.find(query).lean(), Patient.find({}).lean()]);

  return res.status(200).send({ users, patients });
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

const handleNewUser = async (req, res) => {
  const { user, pwd, roles, organization, isActive, displayName, email } = req.body;

  try {
    // Check if the user making the request is a super admin
    const requestingUser = req.user; // Assuming you have middleware to extract the user from the request
    //if (requestingUser && requestingUser.roles && requestingUser.roles.SuperAdmin) {
    // The user making the request is a super admin

    // check for duplicate usernames in the db
    const duplicateUser = await User.findOne({ username: user }).exec();
    const duplicateEmail = await User.findOne({ email: email }).exec();
    // if (duplicate) return res.sendStatus(409); // Conflict
    if (duplicateUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    if (duplicateEmail) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
      roles: roles,
      displayName: displayName,
      organization: organization,
      isActive: isActive,
      email: email,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
    //} else {
    // The user making the request is not a super admin
    //console.log('Registration failed. Insufficient privileges.');
    //res.status(403).json({ error: 'Insufficient privileges' });
    // }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const buildQueryBasedOnRole = (role) => {

//   return role === ROLES.Admin.name ? {
//     role: { $in: user.role.manages, organization: user.organization }

//   } : role === ROLES.User.name ? {
//     role: { $in: user.role.manages, organization: user.organization }
//   }
// }

module.exports.UserController = {
  getAllUsers,
  deleteUser,
  getUser,
};
