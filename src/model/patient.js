const { Schema, model } = require('mongoose');

const therapySchema = new Schema({
  _id: false,
  escSize: { type: String, required: true, trim: true, maxLength: [255, 'Max of 255 characters'] },
  sport: { type: Boolean, required: true },
  iy: { type: Number, required: true },
  oy: { type: Number, required: true },
  ai: { type: Number, required: true },
  checkdate1: { type: Date, required: true },
  checkdate2: { type: Date, required: true },
  checkdate3: { type: Date, required: true },
});

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    identityId: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    email: { type: String, required: true, trim: true, maxLength: [255, 'Max of 255 characters'] },
    phoneNumber1: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    phoneNumber2: { type: String, trim: true, maxLength: [255, 'Max of 255 characters'] },
    height: { type: String, required: true, trim: true, maxLength: [255, 'Max of 255 characters'] },
    weight: { type: String, required: true, trim: true, maxLength: [255, 'Max of 255 characters'] },
    shoeSize: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    gender: { type: String, required: true, trim: true, maxLength: [255, 'Max of 255 characters'] },
    birthdate: { type: Date, required: true },
    examinationdate: { type: Date, required: true },
    footLengthLeft: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    footWidthLeft: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    mlaDepthLeft: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    tendonPositionLeft: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    legAlignmentLeft: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    footLengthRight: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    footWidthRight: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    mlaDepthRight: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    tendonPositionRight: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    legAlignmentRight: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    legLengthDifference: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    selectedLeg: {
      type: String,
      required: true,
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    leftFootprintSplit: { type: Boolean, required: true },
    rightFootprintSplit: { type: Boolean, required: true },
    therapy: { type: therapySchema, required: true },
    serialNumber: {
      type: String,
      required: false, // vidi
      trim: true,
      maxLength: [255, 'Max of 255 characters'],
    },
    serialNumberDate: { type: Date, required: false }, //vidi
  },
  { timestamps: true, versionKey: false }
);

const Patient = model('Patient', patientSchema);

module.exports = Patient;
