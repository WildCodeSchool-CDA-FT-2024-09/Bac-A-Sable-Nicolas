import Joi from "joi";

export default Joi.object({
  id: Joi.forbidden(),
  name: Joi.string().max(100).required().messages({
    "string.base": "Name must be of type string",
    "string.max": "Name must be 100 characters or less",
    "any.required": "Name field is required"
  }),
  url: Joi.forbidden(),
  isPrivate: Joi.number().required().min(1).max(2).messages({
    "number.base": "isPrivate must be of type number",
    "any.required": "isPrivate field is required",
    "number.min": "The repo status should either be 1 or 2",
    "number.max": "The repo status should either be 1 or 2"
  })
});