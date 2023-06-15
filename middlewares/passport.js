const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../helpers');

const { User } = require('../models/user');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(profile);
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user); //(user) ==== req.user
    }
    const pass = nanoid(15);
    const password = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      email,
      password,
      name: displayName,
      verify: true,
    });

    const letter = `<h1>Welcome to Goose-Track</h1>
    <p>Hello, thanks for signing up for our service. Here is your account password: <b>${pass}</b></p>
    <p>You can always change it in your account settings</p>
    <p>Thanks,</p>
    <p>Your S&M CODERS Team</p>`;

    await sendEmail(email, 'Welcome to Goose-Track', letter);
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);
module.exports = passport;
