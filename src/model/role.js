const { Schema, model } = require('mongoose');
const { ROLES_LIST } = require('../config/roles_list');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: [30, 'Maximum 30 characters'],
    },

    manages: [
      {
        _id: false,
        type: String,
        trim: true,
        enum: ROLES_LIST,
      },
    ],
  },
  { timestamps: true }
);

schema.index({ name: 1 });

const Role = model('Role', schema);
module.exports = Role;
