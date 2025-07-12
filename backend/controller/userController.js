import UserServices from "../service/userService.js";
import {
  clearCookies,
  getFilterParams,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../utils/helper.js";

const UserController = {
  async signupUserHandler(req, res) {
    const { accessToken, refreshToken } = await UserServices.signupUserHandler(
      req.body
    );
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    res.json({ success: true });
  },
  async loginUserHandler(req, res) {
    const { accessToken, refreshToken } = await UserServices.loginUserHandler(
      req.body.email,
      req.body.password
    );

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    res.json({
      success: true,
    });
  },
  async logOutUserHandler(req, res) {
    clearCookies(res);
    res.status(200).send({ success: true });
  },
  async forgotPasswordHandler(req, res) {
    const data = await UserServices.forgotPasswordHandler(req.body.email);
    res.json(data);
  },
  async resetPasswordHandler(req, res) {
    const data = await UserServices.resetPasswordHandler(
      req.params.resetToken,
      req.body.password,
      req.body.ConfirmPassword
    );
    res.json(data);
  },

  async getUserHandler(req, res) {
    const userID = req.params.id;

    const data = await UserServices.getUserHandler(userID);
    res.json(data);
  },
  async getAccessTokenHandler(req, res) {
    const accessToken = await UserServices.getAccessTokenHandler(req.user);
    setAccessTokenCookie(res, accessToken);
    res.json({
      success: true,
    });
  },
  async deleteUserHandler(req, res) {
    const userID = req.params.id;
    const data = await UserServices.deleteUserHandler(userID);
    res.json(data);
  },
  async deleteUsersHandler(req, res) {
    const data = await UserServices.deleteUsersHandler(req.body);
    res.json(data);
  },
  async updateUserHandler(req, res) {
    const imagePath = req.file ? req.file.path : null;
    const data = await UserServices.updateUserHandler(
      req.body,
      imagePath
    );
    res.json(data);
  },
};

export default UserController;
