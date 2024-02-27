const User = require('../model/user');

const getAllOrgUsers = async (req, res) => {
  try {
    console.log(req.query, 'req from org users');

    // Check if the user making the request has the "Admin" role for the organization
    if (!req.roles.includes('Admin')) {
      return res
        .status(403)
        .json({ message: 'Access forbidden. You need to be an org Admin to perform this action.' });
    }

    // Retrieve all users with the role "User" in the specified organization (from query parameter)
    const orgUsers = await User.find({
      organization: req.query.org,
      'roles.User': { $exists: true },
    }).sort({ createdAt: -1 });

    res.json(orgUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteOrgUser = async (req, res) => {
  // Implement the logic for deleting a user (you can use a similar approach for other controllers)
};

module.exports = {
  getAllOrgUsers,
  deleteOrgUser,
};
