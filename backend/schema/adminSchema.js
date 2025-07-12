import Joi from "joi";
import { NO_WINDOW_SIZE } from "../utils/constants.js";

const AdminValidationSchemas = {
  loginUserSchema: Joi.object({
    userName: Joi.string().required().max(100),
    password: Joi.string().min(6).required(),
  }),

  forgotPasswordSchema: Joi.object({
    userName: Joi.string().required(),
  }),

  resetPasswordParamsSchema: Joi.object({
    resetToken: Joi.string().required(),
  }),

  resetPasswordSchema: Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  }),

  addAdminSchema: Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    isSuperAdmin: Joi.boolean().default(false),
    organizationId: Joi.number().optional(),
  }),

  getAdminsSchema: Joi.object({
    status: Joi.bool().default(false),
    searchText: Joi.string().default(""),
    page: Joi.number().default(1),
    window: Joi.number().default(NO_WINDOW_SIZE),
  }),

  getAdminByIdSchema: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Invalid Admin Id",
    }),
  }),

  updateAdminSchema: Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    isSuperAdmin: Joi.boolean().default(false),
  }),

  deleteAdminsSchema: Joi.object({
    ids: Joi.array().items(Joi.number()).required(),
  }),
};

export default AdminValidationSchemas;
