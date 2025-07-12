import express from "express";
import catchAsync from "../middlewares/catchAsync.js";
import UserController from "../controller/userController.js";
import { USER_ROUTES, USER_UPLOAD_CONFIG } from "../utils/constants.js";
import validateSchema from "../middlewares/validateSchema.js";
import UserValidationSchemas from "../schema/userSchema.js";
import {
  auth,
  fetchUserProfile,
  verifyRefreshToken,
} from "../middlewares/genral.js";
const router = express.Router();
import createMulterInstance from "../config/multerConfig.js";
const upload = createMulterInstance(USER_UPLOAD_CONFIG);

// Public Routes
router.post(
  USER_ROUTES.SIGNUP,
 
  catchAsync(validateSchema(UserValidationSchemas.signupSchema)),
  catchAsync(UserController.signupUserHandler)
);
router.post(
  USER_ROUTES.SIGNIN,
  catchAsync(validateSchema(UserValidationSchemas.loginUserSchema)),
  catchAsync(UserController.loginUserHandler)
);
router.post(
  USER_ROUTES.FORGOT_PASSWORD,
  catchAsync(validateSchema(UserValidationSchemas.forgotPasswordSchema)),
  catchAsync(UserController.forgotPasswordHandler)
);
router.post(
  USER_ROUTES.RESET_PASSWORD,
  catchAsync(
    validateSchema(UserValidationSchemas.resetPasswordParamsSchema, true)
  ),
  catchAsync(validateSchema(UserValidationSchemas.resetPasswordSchema)),
  catchAsync(UserController.resetPasswordHandler)
);

router.get(
  USER_ROUTES.GET_ACCESS_TOKEN,
  catchAsync(auth),
  catchAsync(verifyRefreshToken),
  catchAsync(UserController.getAccessTokenHandler)
);
router.post(
  USER_ROUTES.LOGOUT,
  catchAsync(auth),
  catchAsync(UserController.logOutUserHandler)
);


router.get(
  USER_ROUTES.GET_USER,
  catchAsync(auth),
  catchAsync(validateSchema(UserValidationSchemas.getUserByIdSchema, true)),
  catchAsync(UserController.getUserHandler)
);

router.patch(
  USER_ROUTES.UPDATE_USER,
  catchAsync(auth),
  catchAsync(upload.single("image")),
  catchAsync(validateSchema(UserValidationSchemas.updateUserSchema)),
  catchAsync(UserController.updateUserHandler)
);
router.delete(
  USER_ROUTES.DELETE_USER,
  catchAsync(auth),
  catchAsync(validateSchema(UserValidationSchemas.getUserByIdSchema, true)),
  catchAsync(UserController.deleteUserHandler)
);
router.delete(
  USER_ROUTES.DELETE_USERS,
  catchAsync(auth),
  catchAsync(validateSchema(UserValidationSchemas.deleteUsersSchema)),
  catchAsync(UserController.deleteUsersHandler)
);



export default router;
