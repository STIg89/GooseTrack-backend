const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const { cloudinary } = require('../../middlewares');

const EmailVerifycation = { status: true, title: 'verifycation' };
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
const { BASE_URL, FRONT_BASE_URL} = process.env;

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');

//-----------------------------registration-------------------------------------------------------
const registration = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw HttpError(409, 'such email is already exist');
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  //const avatarURL = gravatar.url(req.body.email);
  const verifycationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
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

  const { SECRET_KEY } = process.env;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.redirect(`${FRONT_BASE_URL}/login/${token}`);
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
    token: token,
  });
};

const loginWithToken = async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({ token: token });
  if (!user) {
    throw HttpError(401, 'Token is invalid');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    token: token,
  });
};
//------------------------------current-----------------------------------------------------
const current = async (req, res) => {
  const {
    name,
    email,
    avatarURL,
    birthday,
    phone,
    skype,
    createdAt,
    updatedAt,
  } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      name: name,
      email: email,
      avatarURL: avatarURL,
      birthday: birthday,
      phone: phone,
      skype: skype,
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  });
};
//------------------------------logout-----------------------------------------------------
const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json();
};
//----------------------------------update-------------------------------------------
const updateUser = async (req, res) => {
  console.log('update');
  const { _id } = req.user;
  let updatedUser = {};

  if (req.body) {
    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      updatedUser = { ...req.body, password: hashPassword };
    } else {
      updatedUser = { ...req.body };
    }
  }

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
    updatedUser = { ...updatedUser, avatarURL };
    await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });
  }
  console.log('body');
  console.log(req.body);
  console.log('');

  console.log('updatedUser');
  console.log(updatedUser);

  await User.findByIdAndUpdate(_id, { ...updatedUser });
  if (req.body.password) {
    updatedUser = { ...updatedUser, password: req.body.password };
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { updatedUser },
  });
};
//================================NEW=UPDATE======================================================
const updateUserTwo = async (req, res) => {
  console.log('update');
  const { _id } = req.user;
  let updatedUser = {};

  if (req.body) {
    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      updatedUser = { ...req.body, password: hashPassword };
    } else {
      updatedUser = { ...req.body };
    }
  }

  if (req.file) {
    console.log(req.file);
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;

    const avatarURL = req.file.path;
    const avatarID = req.file.filename;
    if (req.user.avatarID) {
      await cloudinary.uploader.destroy(req.user.avatarID);
    }
    console.log(avatarURL);
    updatedUser = { ...updatedUser, avatarURL, avatarID };
    await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });
  }
  console.log('body');
  console.log(req.body);
  console.log('');

  console.log('updatedUser');
  console.log(updatedUser);

  await User.findByIdAndUpdate(_id, { ...updatedUser });
  if (req.body.password) {
    updatedUser = { ...updatedUser, password: req.body.password };
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { updatedUser },
  });
};

//=======================================================================================

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  loginWithToken: ctrlWrapper(loginWithToken),
  getCurrent: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  updateUserCloud: ctrlWrapper(updateUserTwo),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
