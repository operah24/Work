const Joi = require("joi");

const registerBodySchema = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(user);
};

const loginBodySchema = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(user);
};
module.exports = { registerBodySchema, loginBodySchema };
