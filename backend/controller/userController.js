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
  /* async loginUserHandler(req, res) {
    const { accessToken, refreshToken } = await UserServices.loginUserHandler(
      req.body.email,
      req.body.password
    );
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    res.json({
      success: true,
    });
  }, */
  async loginUserHandler(req, res) {
    const data = await UserServices.loginUserHandler(
      req.body.name,
      req.body.password
    );

    res.json(data);
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
  async addUserHandler(req, res) {
    const imagePath = req.file ? req.file.path : null;
    const data = await UserServices.addUserHandler(imagePath, req.body);
    res.json(data);
  },
  async getAllUsersHandler(req, res) {
    const { status, searchText, page, window } = getFilterParams(req.params);
    const sortingOrder = req.body;
    const data = await UserServices.getAllUsersHandler(
      status,
      searchText,
      page,
      window,
      sortingOrder,
      req.user
    );
    res.json(data);
  },
  async getUserHandler(req, res) {
    const userID = req.params.id;

    const data = await UserServices.getUserHandler(userID, req.user);
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
    const userID = req.params.id;
    // const imagePath = req.file ? req.file.path : null;
    const data = await UserServices.updateUserHandler(
      userID,
      req.body,
      req.user
    );
    res.json(data);
  },
  async getUserByNameForAppHandler(req, res) {
    const data = await UserServices.getUserByNameForAppHandler(req.body);
    res.json(data);
  },
  async getUserByIdForAppHandler(req, res) {
    const userID = req.params.id;
    const data = await UserServices.getUserByIdForAppHandler(userID);
    res.json(data);
  },
  async getUsersByOrganizationIdHandler(req, res) {
    const organizationID = req.params.id;
    const data = await UserServices.getUsersByOrganizationIdHandler(
      organizationID
    );

    res.json(data);
  },
  // async getUsersByMultipleOrganizationIdsHandler(req, res) {
  //   const organizationIDs = req.body;
  //   const data = await UserServices.getUsersByMultipleOrganizationIdsHandler(
  //     organizationIDs
  //   );
  //   res.json(data);
  // },
  async getUsersForOrganizationsHandler(req, res) {
    const organizationIDs = req.body;
    const data = await UserServices.getUsersForOrganizationsHandler(
      organizationIDs
    );

    res.json(data);
  },

  async getuserByGroupIdsHandler(req, res) {
    const groupIDs = req.body;
    const data = await UserServices.getuserByGroupIdsHandler(groupIDs);
    res.json(data);
  },

  async updateUserHandlerForApp(req, res) {
    const data = await UserServices.updateUserHandlerForApp(req.body);
    res.json(data);
  },
  async resetDeviceHandler(req, res) {
    const data = await UserServices.resetDeviceHandler(req.body);
    res.json(data);
  },
  async userLogoutHandler(req, res) {
    const data = await UserServices.userLogoutHandler(req.body.userID);
    res.json(data);
  },
  async userDeviceTokenHandler(req, res) {
    const userID = req.body.userID;
    const deviceToken = req.body.deviceToken;
    const data = await UserServices.userDeviceTokenHandler(userID, deviceToken);
    res.json(data);
  },
};

export default UserController;
