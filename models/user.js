const { Schema, model } = require('mongoose');
const {
  EMAIL_REGEXP,
  PHONE_REGEXP,
  PASSWORD_REGEXP,
} = require('../schemas/constants');
/*
"валідація форми:

аватар: тип файл
юзерНейм: макс. 16символів | обов'язково
емейл: емейл | обов'язково
день народження: дата - YYYY-MM-DD
телефон: +380971234567
скайп: макс. 16 символів"
*/
const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [2, 'must be min 2 sybols'],
      maxLength: [16, 'maximum 16 symbols'],
      required: [true, 'What`s your name?'],
    },
    password: {
      type: String,
      match: PASSWORD_REGEXP,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: EMAIL_REGEXP,
      required: [true, 'Email is required'],
      unique: true,
    },
    birthday: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: String,
      match: PHONE_REGEXP,
      default: null,
    },
    skype: {
      maxLength: [16, 'maximum 16 symbols'],
      type: String,
      default: null,
    },
    token: { type: String, default: '' },
    avatarURL: {
      type: String,
      default: '',
    },
    avatarID: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      // required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
//----------------------------------------------------------------------

const User = model('user', userSchema);

module.exports = { User };
