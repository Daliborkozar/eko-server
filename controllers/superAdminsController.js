const User = require('../model/user');

const getAllAdminUsers = async (req, res) => {
  try {
    console.log(req.roles);
    //Check if the user making the request has the "Admin" role
    if (!req.roles.includes('SuperAdmin')) {
      return res
        .status(403)
        .json({ message: 'Access forbidden. You need to be an admin to perform this action.' });
    }

    // Retrieve all users with the role "Admin"
    const adminUsers = await User.find({ 'roles.Admin': { $exists: true } }).sort({
      createdAt: -1,
    });

    res.json(adminUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  // Implement the logic for deleting a user (you can use a similar approach for other controllers)
};

const getAllUsers = async (req, res) => {
  try {
    console.log(req.roles);
    //Check if the user making the request has the "Admin" role
    if (!req.roles.includes('SuperAdmin')) {
      return res
        .status(403)
        .json({ message: 'Access forbidden. You need to be an admin to perform this action.' });
    }

    // Retrieve all users with the role "Admin"
    const allUsers = await User.find({ 'roles.User': { $exists: true } }).sort({ createdAt: -1 });

    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllAdminUsers,
  deleteUser,
  getAllUsers,
};
