const Joi = require('joi');
const { TIME_REGEXP } = require('./constants')
const timeFormat = 'HH:mm';
const createTaskValidation = Joi.object({
    title: Joi.string().max(250).required(),
    start: Joi.string().pattern(TIME_REGEXP).required().error(new Error(`Invalid time format for "start". Expected format: ${timeFormat}`)).required(),
    end: Joi.string().pattern(TIME_REGEXP).required().error(new Error(`Invalid time format for "end". Expected format: ${timeFormat}`)).required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    date: Joi.date().iso().required(),
    category: Joi.string().valid('to-do', 'in-progress', 'done').required()
})
const updateTaskValidation = Joi.object({
    title: Joi.string().max(250),
    start: Joi.string().pattern(TIME_REGEXP).error(new Error(`Invalid time format for "start". Expected format: ${timeFormat}`)),
    end: Joi.string().pattern(TIME_REGEXP).error(new Error(`Invalid time format for "end". Expected format: ${timeFormat}`)),
    priority: Joi.string().valid('low', 'medium', 'high'),
    date: Joi.date().iso(),
    category: Joi.string().valid('to-do', 'in-progress', 'done')
})
module.exports = { createTaskValidation, updateTaskValidation }