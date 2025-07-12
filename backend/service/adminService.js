import httpStatus from "http-status";
import db from "../config/index.js";
import {
  compareHashedPassword,
  generateOrderByClause,
  getAccessToken,
  getAuthToken,
  getHashedPassword,
} from "../utils/helper.js";
import {
  ERROR_MESSAGES,
  RESET_TOKEN_EXPIRE,
  TABLES,
} from "../utils/constants.js";
import APIError from "../error/index.js";

const AdminService = {
  async loginUserHandler(userName, password) {
    const query = `SELECT  AdminID,Password 
        FROM ${TABLES.ADMIN}  
        WHERE UserName = ? `;

    const [result] = await db.query(query, [userName]);
    // Check if the user exists
    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.INVALID_DETAILS,
        httpStatus.UNAUTHORIZED
      );
    }
    const admin = result[0];
    // Compare provided password with the stored hashed password
    const compare = await compareHashedPassword(password, admin.Password);
    if (!compare) {
      throw new APIError(
        ERROR_MESSAGES.INVALID_PASSWORD,
        httpStatus.UNAUTHORIZED
      );
    }

    const { accessToken, refreshToken } = getAuthToken(admin.AdminID);
    return { accessToken, refreshToken };
  },
  async forgotPasswordHandler(userName) {
    const query = `SELECT * FROM ${TABLES.ADMIN} WHERE UserName = ? AND isDeleted = false`;
    const [result] = await db.query(query, [userName]);

    // Check if the user exists
    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.INVALID_DETAILS,
        httpStatus.UNAUTHORIZED
      );
    }
    // Will Send Email From Here to user having resetPassword token;
    return { resetToken: "--token--" };
  },
  async resetPasswordHandler(resetToken, password, confirmPassword) {
    const query = `SELECT * FROM ${TABLES.ADMIN} WHERE UserName = ? AND ResetToken = ? AND isDeleted = false`;
    const [result] = await db.query(query, [userName, resetToken]);

    if (password !== confirmPassword) {
      throw new APIError(
        ERROR_MESSAGES.ON_PASSWORD_CONFLICT,
        httpStatus.BAD_REQUEST
      );
    }

    await updateUserPasswordHandler(result[0].UserName, password);
    // Check if the user exists
    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.INVALID_DETAILS,
        httpStatus.UNAUTHORIZED
      );
    }
    // Will Send Email From Here to user having resetPassword token;
    return { success: true };
  },

  async createResetTokenHandler(resetToken, userName) {
    let query = `UPDATE ${TABLES.USER} SET ResetToken = ? AND ResetTokenExpiry = ? Where UserName = ?`;
    const currentTime = new Date();
    const expiryTime = new Date(
      currentTime.getTime() + RESET_TOKEN_EXPIRE
    ).toISOString();

    const [result] = await db.query(query, [resetToken, expiryTime, userName]);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    return result;
  },
  async getAdminHandlerForFetchProfile(adminId) {
    const query = `SELECT * FROM ${TABLES.ADMIN}  WHERE AdminID = ?`;
    const [result] = await db.query(query, [adminId]);

    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    return result[0];
  },
  async getAdminHandler(adminId) {
    const query = `SELECT A.*, O.* FROM ${TABLES.ADMIN} A
    WHERE A.AdminID = ? AND A.IsDeleted = false `;
    const [result] = await db.query(query, [adminId]);

    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    return result[0];
  },
  async getAccessTokenHandler(admin) {
    const accessToken = getAccessToken(admin.AdminID);
    return accessToken;
  },
  async addAdminHandler(adminData) {
    const passwordHash = await getHashedPassword(adminData.password);
    const isSuperAdmin = adminData.isSuperAdmin == "true";

    const query = `
    INSERT INTO ${TABLES.ADMIN} (UserName, Password, IsSuperAdmin)
    VALUES (?, ?, ?)
  `;
    const [result] = await db.query(query, [
      adminData.userName,
      passwordHash,
      isSuperAdmin,
    ]);

    

   

    await adminRef.set({
      AdminID: adminId,
      AdminName: adminData.userName,
    });


    return { result };
  },
  async getTotalRecordsCount(fetchActiveAdmins = null, searchText = "") {
    let baseQuery = `
      FROM ${TABLES.ADMIN} 
    `;
    const params = [];
    const conditions = [];

    conditions.push(`AdminID !=0`);

    if (fetchActiveAdmins === "true") {
      conditions.push(`IsDeleted = false`);
    }

    if (searchText.trim()) {
      const searchPattern = `${searchText}%`;
      conditions.push(`(UserName LIKE ?)`);
      params.push(searchPattern);
    }

    const whereClause = conditions.length
      ? ` WHERE ` + conditions.join(" AND ")
      : "";
    const countQuery = `SELECT COUNT(*) AS totalRecords ${baseQuery} ${whereClause}`;
    const [[countResult]] = await db.query(countQuery, params);

    return countResult.totalRecords;
  },

  async buildAdminFilters(fetchActiveAdmins, searchText) {
    const conditions = [];
    const params = [];

    conditions.push(`AdminID !=0`);


    if (fetchActiveAdmins === "true") {
      conditions.push(`IsDeleted = false`);
    }

    if (searchText.trim()) {
      const searchPattern = `${searchText}%`;
      conditions.push(`(UserName LIKE ?)`);
      params.push(searchPattern);
    }

    const whereClause = conditions.length
      ? ` WHERE ` + conditions.join(" AND ")
      : "";

    return { whereClause, params };
  },

  async getAllAdminsHandler(
    fetchActiveAdmins = null,
    searchText = "",
    page,
    window,
    sortingOrder
  ) {
    const baseQuery = `
    FROM ${TABLES.ADMIN} 
  `;

    const { whereClause, params } = await this.buildAdminFilters(
      fetchActiveAdmins,
      searchText
    );

    const totalRecords = await this.getTotalRecordsCount(
      fetchActiveAdmins,
      searchText
    );

    const validSortFields = {
      Name: "UserName",
      CreatedAt: "CreatedAt",
    };

    const defaultSort = "CreatedAt DESC";
    const orderByClause = generateOrderByClause(
      sortingOrder,
      validSortFields,
      defaultSort
    );

    let query = `
    SELECT *
    ${baseQuery} ${whereClause} ${orderByClause}
  `;

    if (window > 0) {
      const offset = (page - 1) * window;
      query += ` LIMIT ? OFFSET ?`;
      params.push(window + 1, offset);
    }

    const [result] = await db.query(query, params);

    if (window > 0) {
      const hasNextPage = result.length > window;
      return {
        data: hasNextPage ? result.slice(0, -1) : result,
        isNextPage: hasNextPage,
        totalRecords,
      };
    }

    return result;
  },
  async updateAdminHandler(adminID, adminData) {
    let query = `
    UPDATE ${TABLES.ADMIN} 
    SET UserName = ?, IsSuperAdmin = ? WHERE AdminID = ?
  `;
    const isSuperAdmin = adminData.isSuperAdmin == "true" ? true : false;
    const [result] = await db.query(query, [
      adminData.userName,
      isSuperAdmin,
      adminID,
    ]);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    return result;
  },

  async deleteAdminHandler(adminID) {


    const query = `DELETE FROM ${TABLES.ADMIN} WHERE AdminID = ? AND AdminID != 0`;

    const [result] = await db.query(query, [adminID]);
    
    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }

    return {
      success: true,
      message: "Admin deleted successfully",
      status: 200,
    };
  },

  async deleteAdminsHandler(adminIDs) {


    const query = `DELETE FROM ${TABLES.ADMIN} WHERE AdminID IN (?) AND AdminID != 0`;

    const [result] = await db.query(query, [adminIDs.ids]);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
   
    return {
      success: true,
      message: "Admins deleted successfully",
      status: 200,
      deletedCount: result.affectedRows,
    };
  },
};

export default AdminService;
