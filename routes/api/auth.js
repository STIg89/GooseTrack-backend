const express = require('express');
const userCtrl = require('../../controllers/auth/user');
const {
  validateBody,
  authenticate,
  uploder,
  uploadCloud,
} = require('../../middlewares');
const {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
} = require('../../schemas');

//console.log(userCtrl);

const router = express.Router();
router.post(
  '/registration',
  validateBody(registrationSchema),
  userCtrl.registration
);

router.post('/login', validateBody(loginSchema), userCtrl.login); //логінимось

router.get('/verify/:verificationToken', userCtrl.verifyEmail); //верефікація пошти

router.post('/verify', validateBody(emailSchema), userCtrl.resendVerifyEmail);

router.get('/current', authenticate, userCtrl.getCurrent);

router.post('/logout', authenticate, userCtrl.logout);

router.patch(
  '/user',
  authenticate,
  uploder.single('avatar'),
  validateBody(updateUserSchema),
  userCtrl.updateUserCloud
);

router.put(
  '/user',
  authenticate,
  uploadCloud.single('avatar'),
  validateBody(updateUserSchema),
  userCtrl.updateUserCloud
);

module.exports = router;
