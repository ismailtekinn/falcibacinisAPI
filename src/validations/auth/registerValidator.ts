import joi from "joi";

export const registerSchema = joi.object({
  Name: joi.string().required(),
  Username: joi.string().required(),
  Surname: joi.string().required(),
  Email: joi.string().required(),
  Password: joi.string().required(),
  Phone: joi.string().optional(),
  RoleID: joi.number().optional(),
});
