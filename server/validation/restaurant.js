const Joi = require('@hapi/joi');

function addValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(127).required(),
  });

  return schema.validate(data);
}

function editValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(127),
  });

  return schema.validate(data);
}

module.exports = { addValidation, editValidation };
