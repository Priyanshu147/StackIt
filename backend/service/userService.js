import httpStatus from "http-status";
import db from "../config/index.js";
import {
  compareHashedPassword,
  getAccessToken,
  getAuthToken,
  getHashedPassword,
  generateOrderByClause,
} from "../utils/helper.js";
import {
  ERROR_MESSAGES,
  RESET_TOKEN_EXPIRE,
  TABLES,
  FIREBASE_COLLECTIONS,
} from "../utils/constants.js";
import APIError from "../error/index.js";

const UserService = {
  async signupUserHandler(userData) {
    const passwordHash = await getHashedPassword(userData.password);

    const query = `INSERT INTO ${TABLES.USER} (Name, Email, Password) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [
      userData.name,
      userData.email,
      passwordHash,

    ]);

    const { accessToken, refreshToken } = getAuthToken(result.insertId);
    return { accessToken, refreshToken };
  },

  async loginUserHandler(email, password) {
    const query = `SELECT  *
        FROM ${TABLES.USER}  
        WHERE Email = ? `;
    const [result] = await db.query(query, [email]);
    // Check if the user exists
    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.INVALID_DETAILS,
        httpStatus.UNAUTHORIZED
      );
    }
    const user = result[0];
    // Compare provided password with the stored hashed password
    const compare = await compareHashedPassword(password, user.Password);
    if (!compare) {
      throw new APIError(
        ERROR_MESSAGES.INVALID_PASSWORD,
        httpStatus.UNAUTHORIZED
      );
    }

    const { accessToken, refreshToken } = getAuthToken(user.UserID);
    return { accessToken, refreshToken };
  },
  async forgotPasswordHandler(email) {
    const query = `SELECT * FROM ${TABLES.USER} WHERE Email = ? `;
    const [result] = await db.query(query, [email]);

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
    const query = `SELECT * FROM ${TABLES.USER} WHERE Email = ? AND ResetToken = ?`;
    const [result] = await db.query(query, [email, resetToken]);

    if (password !== confirmPassword) {
      throw new APIError(
        ERROR_MESSAGES.ON_PASSWORD_CONFLICT,
        httpStatus.BAD_REQUEST
      );
    }

    await updateUserPasswordHandler(result[0].email, password);
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

  async createResetTokenHandler(resetToken, email) {
    let query = `UPDATE ${TABLES.USER} SET ResetToken = ? AND ResetTokenExpiry = ? Where Email = ?`;
    const currentTime = new Date();
    const expiryTime = new Date(
      currentTime.getTime() + RESET_TOKEN_EXPIRE
    ).toISOString();

    const [result] = await db.query(query, [resetToken, expiryTime, email]);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    return result;
  },



  async updateUserHandler(userData, image = null) {
    let query = `UPDATE ${TABLES.USER} SET UpdatedAt = NOW() `;
    let params = [];

    if (userData.name) {
      query += ` ,Name = ?`;
      params.push(userData.name);
    }

    if (image) {
      query += `, Image = ?`;
      params.push(image);
    }
    if (userData.about) {
      query += `, About = ?`;
      params.push(userData.about);
    }

    if (
      userData.password &&
      userData.password !== "" &&
      userData.password !== "undefined"
    ) {
      const hashedPassword = await getHashedPassword(userData.password);
      query += `, Password = ?`;
      params.push(hashedPassword);
    }

    query += ` WHERE UserID = ?`;
    params.push(userData.userID);

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }

    return {
      success: true,
      message: "User Updated Successfully",
      status: 200,
      data: result,
    };
  },
  async getTotalRecordsCount(
    fetchActiveUsers = null,
    searchText = "",
    adminData
  ) {
    const baseQuery = `
      FROM ${TABLES.USER} T 
      LEFT JOIN ${TABLES.ORGANIZATION} O ON T.OrganizationID = O.OrganizationID
    `;

    const params = [];
    const conditions = [];

    conditions.push(`T.UserID != 0`);

    if (fetchActiveUsers === "true") {
      conditions.push(`T.IsDeleted = false`);
    }

    if (searchText.trim()) {
      const searchPattern = `${searchText}%`;
      conditions.push(
        `(T.Name LIKE ? OR T.Email LIKE ? OR T.PhoneNo LIKE ? OR O.Name LIKE ?)`
      );
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

   
    const whereClause = conditions.length
      ? ` WHERE ` + conditions.join(" AND ")
      : "";
    const countQuery = `SELECT COUNT(*) AS totalRecords ${baseQuery} ${whereClause}`;
    const [[countResult]] = await db.query(countQuery, params);

    return countResult.totalRecords;
  },

  async buildUserFilters(fetchActiveUsers, searchText, adminData) {
    const conditions = [];
    const params = [];

    conditions.push(`T.UserID != 0`);
    if (fetchActiveUsers === "true") {
      conditions.push(`T.IsDeleted = false`);
    }

    if (searchText.trim()) {
      const searchPattern = `${searchText}%`;
      conditions.push(
        `(T.Name LIKE ? OR T.Email LIKE ? OR T.PhoneNo LIKE ? OR O.Name LIKE ?)`
      );
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    if (!adminData.IsSuperAdmin) {
      conditions.push(`O.AdminId = ?`);
      params.push(adminData.AdminID);
    }

    const whereClause = conditions.length
      ? ` WHERE ` + conditions.join(" AND ")
      : "";

    return { whereClause, params };
  },

  async getAllUsersHandler(
    fetchActiveUsers = null,
    searchText = "",
    page,
    window,
    sortingOrder,
    adminData
  ) {
    const baseQuery = `
    FROM ${TABLES.USER} T 
    LEFT JOIN ${TABLES.ORGANIZATION} O ON T.OrganizationID = O.OrganizationID
  `;

    const { whereClause, params } = await this.buildUserFilters(
      fetchActiveUsers,
      searchText,
      adminData
    );

    const totalRecords = await this.getTotalRecordsCount(
      fetchActiveUsers,
      searchText,
      adminData
    );

    const validSortFields = {
      Name: "T.Name",
      PhoneNo: "T.PhoneNo",
      CreatedAt: "T.CreatedAt",
      OrganizationName: "O.Name",
    };

    const defaultSort = "T.CreatedAt DESC";
    const orderByClause = generateOrderByClause(
      sortingOrder,
      validSortFields,
      defaultSort
    );

    let query = `
    SELECT 
      T.UserId, T.Name, T.PhoneNo, T.IsDeleted, T.CreatedAt, T.IsActive, O.Name AS OrganizationName
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

  async getUserHandler(userID) {
    let query = `SELECT * FROM ${TABLES.USER} WHERE UserID = ?  `;
    const params = [userID];


    const [result] = await db.query(query, params);
    // Check if the user exists
    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }

    return {
      success: true,
      status: httpStatus.OK,
      message: "User Found",
      data: result[0],
    };
  },

  async getAccessTokenHandler(user) {
    const accessToken = getAccessToken(user);
    return accessToken;
  },

  async deleteUserHandler(userID) {
    // Delete all chat data for the user from Firebase



    // Check if the user deleted

    return { success: true };
  },
  async deleteUsersHandler(userIDs) {
    // Delete all chat data for the user from Firebase


    return {
      success: true,
      deletedCount: userIDs.ids.length,
    };
  },

  async updateUserPasswordHandler(email, password) {
    let query = `UPDATE ${TABLES.USER} SET Password = ? Where Email = ?`;

    const hashedPassword = await getHashedPassword(password);

    const [result] = await db.query(query, [hashedPassword, email]);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    return result;
  },



  async getUsersByMultipleOrganizationIdsHandler(organizationIDs) {
    const query = `SELECT UserID, Name FROM ${TABLES.USER} WHERE OrganizationID IN (?) AND IsDeleted = false AND UserID != 0`;
    const [result] = await db.query(query, [organizationIDs.ids]);
    return {
      success: true,
      status: 200,
      data: result,
    };
  },

  async getTotalUserCount(adminData) {
    if (!adminData.IsSuperAdmin) {

      const query = `SELECT COUNT(U.UserID) AS count FROM ${TABLES.USER} U LEFT JOIN ${TABLES.ORGANIZATION} O ON U.OrganizationID = O.OrganizationID WHERE U.IsDeleted = false AND UserID != 0 AND O.AdminID = ?`;
      const [result] = await db.query(query, [adminData.AdminID]);
      return result[0].count;
    }
    else {
      const query = `SELECT COUNT(*) AS count FROM ${TABLES.USER} where IsDeleted = false AND UserID != 0`;
      const [result] = await db.query(query);
      return result[0].count;
    }
  },







};
export default UserService;
