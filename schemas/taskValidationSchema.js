const Joi = require('joi');

const createTaskValidation = Joi.object({
    title: Joi.string().max(250).required(),
    start: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    end: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).custom((value, helpers) => {
        if (value <= helpers.parent.start) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    date: Joi.date().iso().required(),
    category: Joi.string().valid('to-do', 'in-progress', 'done').required(),
});

module.exports = { createTaskValidation }