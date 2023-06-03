const express = require('express');
const userCtrl = require('../../controllers/auth/user');
const { validateBody, authenticate, uploder } = require('../../middlewares');
const {
  registrationSchema,
  loginSchema,
  emailSchema,
} = require('../../schemas');

//console.log(userCtrl);

const router = express.Router();
router.post(
  '/registration',
  validateBody(registrationSchema),
  userCtrl.registration
);

router.post('/login', validateBody(loginSchema), userCtrl.login);

router.get('/verify/:verificationToken', userCtrl.verifyEmail);

router.post('/verify', validateBody(emailSchema));

router.get('/current', authenticate, userCtrl.getCurrent);

router.post('/logout', authenticate, userCtrl.logout);

router.patch(
  '/avatar',
  authenticate,
  uploder.single('avatar'),
  userCtrl.updateAvatar
);

module.exports = router;
