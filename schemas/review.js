const Joi = require('joi');

const reveiwSchema = Joi.object({
  rating: Joi.number().max(5).min(0).integer().required(),
  comment: Joi.string(),
});

const updateRewSchema = Joi.object({
  rating: Joi.number().max(5).min(0).integer(),
  comment: Joi.string(),
}).min(1);
module.exports = {
  reveiwSchema,
  updateRewSchema,
};
