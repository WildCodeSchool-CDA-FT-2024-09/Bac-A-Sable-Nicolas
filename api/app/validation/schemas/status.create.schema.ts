import Joi from "joi";

export default Joi.object({
  "id": Joi.forbidden(),
  "name": Joi.string().max(20).required().messages({
    "string.base": "Name must be of type string",
    "string.max": "Name must be 20 characters or less",
    "any.required": "Name field is required"
  })
})