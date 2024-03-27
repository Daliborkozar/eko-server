const { Schema, model } = require('mongoose');
const ROLES = require('../config/roles_list');

const userSchema = new Schema(
  {
    role: {
      type: String,
      trim: true,
      required: true,
      enum: [ROLES.SuperAdmin, ROLES.Admin, ROLES.User],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    organization: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayName: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ role: 1, organization: 1 });
userSchema.index({ isActive: 1, role: 1 });
userSchema.index({ isActive: 1, organization: 1 });

const User = model('User', userSchema);
module.exports = User;
