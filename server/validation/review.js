const Joi = require('@hapi/joi');

function addValidation(data) {
  const schema = Joi.object({
    restaurantId: Joi.string().min(4).max(64).required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(1).max(4096),
  });

  return schema.validate(data);
}

function editValidation(data) {
  const schema = Joi.object({
    restaurantId: Joi.string().min(4).max(64).required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(1).max(4096),
  });

  return schema.validate(data);
}

function addReplyValidation(data) {
  const schema = Joi.object({
    reply: Joi.string().min(1).max(4096),
  });

  return schema.validate(data);
}

module.exports = { addValidation, editValidation, addReplyValidation };
