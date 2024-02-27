const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, 'Maximum 50 characters'],
    },
    roles: {
      User: String,
      Admin: String,
      SuperAdmin: String,
    },
    password: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayName: {
      type: String,
    },
    // createdAt: { type: Date, default: Date.now },
    // refreshToken: [String] //ne treba
  },
  { timestamps: true }
);

const User = model('User', userSchema);
module.exports = User;
