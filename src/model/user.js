const { Schema, model } = require('mongoose');
const { ROLES_LIST } = require('../config/roles_list');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, 'Maximum 50 characters'],
    },
    role: {
      type: String,
      trim: true,
      required: true,
      enum: ROLES_LIST,
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

userSchema.index({ isActive: 1, isActive: 1 });

const User = model('User', userSchema);
module.exports = User;
