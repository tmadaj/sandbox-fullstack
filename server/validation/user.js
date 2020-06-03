const Joi = require('@hapi/joi');

function registerValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(63).required(),
    role: ['regular', 'owner'],
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1023).required(),
  });

  return schema.validate(data);
}

function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1023).required(),
  });

  return schema.validate(data);
}

function editValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(63).required(),
    role: ['regular', 'owner', 'admin'],
    email: Joi.string().min(6).max(255).required().email(),
  });

  return schema.validate(data);
}

module.exports = { registerValidation, loginValidation, editValidation };
