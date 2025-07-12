import Joi from "joi";
import { ALLOWED_PHONE_NO_DIGITS, NO_WINDOW_SIZE } from "../utils/constants.js";

const UserValidationSchemas = {
  addUserSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    phoneNo: Joi.string()
      .optional()
      .pattern(new RegExp(`^\\d{${ALLOWED_PHONE_NO_DIGITS}}$`))
      .messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number is required",
        "string.pattern.base": `Invalid phone number format. It must contain exactly ${ALLOWED_PHONE_NO_DIGITS} digits.`,
      }),
    organizationId: Joi.number().required().messages({
      "number.base": "Invalid Organization Id",
    }),
    isActive: Joi.bool().default(true).optional(),
    groupId: Joi.number().required().messages({
      "number.base": "Invalid Group ",
    }),
  }),

  getUsersSchema: Joi.object({
    status: Joi.bool().default(false),
    searchText: Joi.string().default(""),
    page: Joi.number().default(1),
    window: Joi.number().default(NO_WINDOW_SIZE),
  }),

  getUserByIdSchema: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Invalid User Id",
    }),
  }),

  loginUserSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  }),

  forgotPasswordSchema: Joi.object({
    email: Joi.string().email().required(),
  }),

  resetPasswordParamsSchema: Joi.object({
    resetToken: Joi.string().required(),
  }),

  resetPasswordSchema: Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  }),

  updateUserSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).allow(""),
    phoneNo: Joi.string()
      .optional()
      .pattern(new RegExp(`^\\d{${ALLOWED_PHONE_NO_DIGITS}}$`))
      .messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number is required",
        "string.pattern.base": `Invalid phone number format. It must contain exactly ${ALLOWED_PHONE_NO_DIGITS} digits.`,
      }),
    organizationId: Joi.number().required().messages({
      "number.base": "Invalid Organization Id",
    }),
    isActive: Joi.bool().default(true).optional(),
    groupId: Joi.number().required().messages({
      "number.base": "Invalid Group ",
    }),
  }),

  deleteUsersSchema: Joi.object({
    ids: Joi.array().items(Joi.number()).required(),
  }),
  getUserByNameForAppSchema: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
    }),
    organizationId: Joi.number().required().messages({
      "number.base": "Invalid Organization Id",
    }),
  }),
  getUserByIdForAppSchema: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Invalid User Id",
    }),
  }),
  getUsersByOrganizationIdSchema: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Invalid Organization Id",
    }),
  }),
  getUsersForOrganizationsSchema: Joi.object({
    ids: Joi.array().items(Joi.number()).min(0).required().messages({
      "array.base": "IDs must be in an array",
      "array.min": "At least one Organization ID is required",
      "any.required": "Organization IDs are required",
    }),
  }),
  updateUserSchemaForApp: Joi.object({
    userID: Joi.number().required().messages({
      "number.base": "Invalid User Id",
    }),
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).allow("", null).optional(),
    phoneNo: Joi.string()
      .optional()
      .pattern(new RegExp(`^\\d{${ALLOWED_PHONE_NO_DIGITS}}$`))
      .messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number is required",
        "string.pattern.base": `Invalid phone number format. It must contain exactly ${ALLOWED_PHONE_NO_DIGITS} digits.`,
      }),
    image: Joi.string().allow("", null).optional(),
  }),
  resetDeviceSchema: Joi.object({
    password: Joi.string().min(6).required({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
    }),
    userID: Joi.number().required().messages({
      "number.base": "Invalid User Id",
    }),
  }),
  userLogoutSchema: Joi.object({
    userID: Joi.number().required().messages({
      "number.base": "Invalid User Id",
    }),
  }),
  getuserByGroupIdsSchema: Joi.object({
    ids: Joi.array().items(Joi.number()).required().messages({
      "array.base": "IDs must be in an array",
      "array.min": "At least one Group ID is required",
      "any.required": "Group IDs are required",
    }),
  }),
  userDeviceTokenSchema: Joi.object({
    userID: Joi.number().required().messages({
      "number.base": "Invalid User Id",
    }),
    deviceToken: Joi.string().required().messages({
      "string.base": "Device token must be a string",
      "string.empty": "Device token is required",
    }),
  }),
};

export default UserValidationSchemas;
