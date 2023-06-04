const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const EmailVerifycation = { status: true, title: 'verifycation' };
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
const { BASE_URL, PORT } = process.env;

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');

//-----------------------------registration-------------------------------------------------------
const registration = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw HttpError(409, 'such email is already exist');
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const avatarURL = gravatar.url(req.body.email);
  const verifycationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken: verifycationCode,
  });
  if (EmailVerifycation.status == true) {
    await sendEmail(
      req.body.email,
      EmailVerifycation.title,
      `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${verifycationCode}"> verify your email - click here <a/>`
    );
  }

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { name: newUser.name, email: newUser.email },
  });
};
//-----------------------------verify-email------------------------------------------------
const verifyEmail = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw HttpError(404, 'not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { message: 'Email verify success' },
  });
};
//----------------------------re-verify-email----------------------------------------------
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendEmail(
    email,
    EmailVerifycation.title,
    `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${user.verificationToken}"> verify your email - click here <a/>`
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { message: 'Verification email sent' },
  });
};
//-----------------------------login-------------------------------------------------------
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw HttpError(401, 'Email or password ivalid');
  }
  const passwordCompare = bcrypt.compare(req.body.password, user.password);

  if (!user.verify && EmailVerifycation.status == true) {
    throw HttpError(401, 'Email not verifyed');
  }

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password ivalid');
  }

  const { SECRET_KEY } = process.env;
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: token,
  });
};
//------------------------------current-----------------------------------------------------
const current = async (req, res) => {
  const { name, email, avatarURL } = req.user;
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      name: name,
      email: email,
      avatarURL: avatarURL,
    },
  });
};
//------------------------------logout-----------------------------------------------------
const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json();
};
//----------------------------------update-avatar------------------------------------------
const updateAvatar = async (req, res) => {
  console.log('update');
  const { _id } = req.user;
  const updatedUser = req.user;
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, fileName);

    Jimp.read(tempUpload)
      .then(avatar => {
        return avatar
          .resize(250, 250) // resize
          .write(resultUpload); // save
      })
      .catch(err => {
        console.error(err);
      });

    await fs.unlink(tempUpload);
    // console.log(fileName);
    const avatarURL = path.join('avatars', fileName);
    console.log(avatarURL);

    updatedUser.avatarURL = avatarURL;
  }
  console.log('body');
  console.log(req.body);
  console.log('');
  //await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });
  if (req.body) {
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { avatarURL: `${avatarURL}` },
  });
};
//=======================================================================================

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
