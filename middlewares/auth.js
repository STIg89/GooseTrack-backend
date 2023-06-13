const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, accessToken] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'un autorise'));
  }
  try {
    const paload = jwt.verify(accessToken, SECRET_KEY);

    const user = await User.findById(paload.id);
    if (!user || !user.accessToken || user.accessToken !== accessToken) {
      next(HttpError(401, 'un autorise'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, 'un autorise'));
  }
};

module.exports = auth;
