const { HttpError } = require('../helpers');

const validateQuery = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.query);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};

module.exports = { validateQuery };
