import express from "express";
import catchAsync from "../middlewares/catchAsync.js";
import AdminController from "../controller/adminController.js";
import { ADMIN_ROUTES } from "../utils/constants.js";
import validateSchema from "../middlewares/validateSchema.js";
import AdminValidationSchemas from "../schema/adminSchema.js";
import {
  auth,
  fetchUserProfile,
  verifyRefreshToken,
} from "../middlewares/genral.js";

const router = express.Router();

// Public Routes

router.post(
  ADMIN_ROUTES.SIGNIN,
  catchAsync(validateSchema(AdminValidationSchemas.loginUserSchema)),
  catchAsync(AdminController.loginUserHandler)
);
router.post(
  ADMIN_ROUTES.FORGOT_PASSWORD,
  catchAsync(validateSchema(AdminValidationSchemas.forgotPasswordSchema)),
  catchAsync(AdminController.forgotPasswordHandler)
);
router.post(
  ADMIN_ROUTES.RESET_PASSWORD,
  catchAsync(
    validateSchema(AdminValidationSchemas.resetPasswordParamsSchema, true)
  ),
  catchAsync(validateSchema(AdminValidationSchemas.resetPasswordSchema)),
  catchAsync(AdminController.resetPasswordHandler)
);

router.post(
  ADMIN_ROUTES.LOGOUT,
  catchAsync(auth),
  catchAsync(AdminController.logOutUserHandler)
);

router.get(
  ADMIN_ROUTES.GET_ADMIN_PROFILE,
  catchAsync(auth),
  catchAsync(fetchUserProfile),
  catchAsync(AdminController.getAdminProfileHandler)
);
router.post(
  ADMIN_ROUTES.GET_ADMINS,
  catchAsync(auth),
  catchAsync(validateSchema(AdminValidationSchemas.getAdminsSchema, true)),
  catchAsync(AdminController.getAllAdminsHandler)
);
router.get(
  ADMIN_ROUTES.GET_ADMIN,
  catchAsync(auth),
  catchAsync(validateSchema(AdminValidationSchemas.getAdminByIdSchema, true)),
  catchAsync(AdminController.getAdminHandler)
);
router.post(
  ADMIN_ROUTES.ADD_ADMIN,
  catchAsync(auth),
  catchAsync(validateSchema(AdminValidationSchemas.addAdminSchema)),
  catchAsync(AdminController.addAdminHandler)
);
router.patch(
  ADMIN_ROUTES.UPDATE_ADMIN,
  catchAsync(auth),
  catchAsync(validateSchema(AdminValidationSchemas.getAdminByIdSchema, true)),
  catchAsync(validateSchema(AdminValidationSchemas.updateAdminSchema)),
  catchAsync(AdminController.updateAdminHandler)
);
router.delete(
  ADMIN_ROUTES.DELETE_ADMIN,
  catchAsync(auth),
  catchAsync(validateSchema(AdminValidationSchemas.getAdminByIdSchema, true)),
  catchAsync(AdminController.deleteAdminHandler)
);
router.delete(
  ADMIN_ROUTES.DELETE_ADMINS,
  catchAsync(auth),
  catchAsync(validateSchema(AdminValidationSchemas.deleteAdminsSchema)),
  catchAsync(AdminController.deleteAdminsHandler)
);

export default router;
