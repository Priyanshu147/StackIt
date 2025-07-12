import AdminService from "../service/adminService.js";
import {
  clearCookies,
  getFilterParams,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../utils/helper.js";

const AdminController = {
  async loginUserHandler(req, res) {
    const { accessToken, refreshToken } = await AdminService.loginUserHandler(
      req.body.userName,
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
    const data = await AdminService.forgotPasswordHandler(req.body.userName);
    res.json(data);
  },
  async resetPasswordHandler(req, res) {
    const data = await AdminService.resetPasswordHandler(
      req.params.resetToken,
      req.body.password,
      req.body.ConfirmPassword
    );
    res.json(data);
  },
  async addAdminHandler(req, res) {
    const data = await AdminService.addAdminHandler(req.body);
    res.json(data);
  },
  async getAdminProfileHandler(req, res) {
    const user = req.user || null;
    res.json(user);
  },
  async getAllAdminsHandler(req, res) {
    const { status, searchText, page, window } = getFilterParams(req.params);
    const sortingOrder = req.body;

    const data = await AdminService.getAllAdminsHandler(
      status,
      searchText,
      page,
      window,
      sortingOrder
    );

    res.json(data);
  },

  async getAdminHandler(req, res) {
    const adminID = req.params.id;
    const data = await AdminService.getAdminHandler(adminID);
    res.json(data);
  },

  async updateAdminHandler(req, res) {
    const adminID = req.params.id;
    const data = await AdminService.updateAdminHandler(adminID, req.body);
    res.json(data);
  },

  async deleteAdminHandler(req, res) {
    const adminID = req.params.id;
    const data = await AdminService.deleteAdminHandler(adminID);
    res.json(data);
  },

  async deleteAdminsHandler(req, res) {
    const data = await AdminService.deleteAdminsHandler(req.body);
    res.json(data);
  },
};

export default AdminController;
