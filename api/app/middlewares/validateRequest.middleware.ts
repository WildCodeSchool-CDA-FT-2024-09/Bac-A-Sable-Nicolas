import Joi from "joi";
import { RequestValidationError } from "../errors/RequestValidationError.error";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (sourceProperty: keyof Request, schema: Joi.ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req[sourceProperty], { abortEarly: false });
    next();
  } catch (err: any) {
      next(new RequestValidationError(err.details));
  }
};