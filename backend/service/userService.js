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

    const query = `INSERT INTO ${TABLES.USER} (Name, Email, Password, PhoneNo) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [
      userData.name,
      userData.email,
      passwordHash,
      userData.phoneNo,
    ]);

    const { accessToken, refreshToken } = getAuthToken(result.insertId);
    return { accessToken, refreshToken };
  },

  async loginUserHandler(name, password) {
    const query = `SELECT U.UserID, U.Name,  U.Password, U.DeviceToken, O.OrganizationID, O.Name AS OrganizationName
    FROM ${TABLES.USER}  U
    LEFT JOIN ${TABLES.ORGANIZATION} O ON U.OrganizationID = O.OrganizationID
    WHERE U.Name = ? AND U.IsDeleted = false AND U.IsActive = true`;

    const [result] = await db.query(query, [name]);
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
    //remove password from the result
    const query2 = `UPDATE ${TABLES.USER} SET IsLogin = TRUE WHERE Name = ?`;
    await db.query(query2, [name]);
    result[0].IsLogin = "true";
    return {
      success: true,
      message: "Login Successful",
      status: httpStatus.OK,
      data: result[0],
    };
  },
  async forgotPasswordHandler(email) {
    const query = `SELECT * FROM ${TABLES.USER} WHERE Email = ? AND isDeleted = false`;
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
    const query = `SELECT * FROM ${TABLES.USER} WHERE Email = ? AND ResetToken = ? AND isDeleted = false`;
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

  async addUserHandler(imagePath = "", userData) {
    const isActive = userData.isActive === "true" ? true : false;
    const passwordHash = await getHashedPassword(userData.password);
    const query = `INSERT INTO ${TABLES.USER} (Name,  Password, PhoneNo, OrganizationId, IsActive, 	GroupID ) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [
      userData.name,
      passwordHash,
      userData.phoneNo,
      userData.organizationId,
      isActive,
      userData.groupId,
    ]);

    return { result };
  },

  async updateUserHandler(userID, userData, adminData) {
    const isActive = userData.isActive === "true" ? true : false;
    let query = `
    UPDATE ${TABLES.USER} 
    SET Name = ?,  PhoneNo = ?, OrganizationId = ?, IsActive = ?, GroupID = ?
  `;

    const params = [
      userData.name,
      userData.phoneNo,
      userData.organizationId,
      isActive,
      userData.groupId,
    ];

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
    params.push(userID);

    if (!adminData.IsSuperAdmin) {
      query += ` AND OrganizationId IN (
      SELECT O.OrganizationID
      FROM ${TABLES.ORGANIZATION} O
      WHERE O.AdminID = ?
    )`;
      params.push(adminData.AdminID); // Make sure AdminID is available in adminData
    }

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }

    return result;
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

    if (!adminData.IsSuperAdmin) {
      conditions.push(`O.AdminId = ?`);
      params.push(adminData.AdminID);
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

  async getUserHandler(userID, adminData) {
    let query = `SELECT U.UserId, U.Name,  U.PhoneNo, U.IsActive, U.GroupID, O.Name AS OrganizationName, O.OrganizationID
    FROM ${TABLES.USER} U JOIN ${TABLES.ORGANIZATION} O ON U.OrganizationID = O.OrganizationID
    WHERE UserID = ? AND U.IsDeleted = false`;
    const params = [userID];
    if (!adminData.IsSuperAdmin) {
      query += ` AND O.AdminID = ?`;
      params.push(adminData.AdminID);
    }

    const [result] = await db.query(query, params);
    // Check if the user exists
    if (result.length === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }

    return result[0];
  },

  async getAccessTokenHandler(user) {
    const accessToken = getAccessToken(user.AdminID);
    return accessToken;
  },

  async deleteUserHandler(userID) {
    // Delete all chat data for the user from Firebase

   

    // Check if the user deleted

    return { success: true };
  },
  async deleteUsersHandler(userIDs) {
    // Delete all chat data for the user from Firebase
    for (const userID of userIDs.ids) {
      await this.deleteUserHandler(userID.toString());
    }

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
  async getUserByNameForAppHandler(data) {
    const query = `SELECT U.UserID, U.Name, U.Password, U.Image, O.Name AS OrganizationName, O.OrganizationID
    FROM ${TABLES.USER} U JOIN ${TABLES.ORGANIZATION} O ON U.OrganizationID = O.OrganizationID 
    WHERE U.Name = ? AND U.OrganizationID= ? AND U.IsDeleted = false`;
    const [result] = await db.query(query, [data.name, data.organizationId]);

    // Check if the user exists
    if (result.length === 0) {
      return {
        success: false,
        message: "User Not Found",
        status: httpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "User Found",
      status: 200,
      data: result[0],
    };
  },
  async getUserByIdForAppHandler(userID) {
    const query = `SELECT 
      U.UserID, 
      U.Name, 
      U.Password, 
      U.DeviceToken,
      O.Name AS OrganizationName, 
      O.OrganizationID, 
     IF(G.GroupID IS NOT NULL, G.GroupID, '') AS GroupID,
      IF(G.GroupName IS NOT NULL, G.GroupName, '') AS GroupName,
      IF(U.IsLogin = 1, TRUE, FALSE) AS IsLogin
    FROM UserMaster U 
    JOIN OrganizationMaster O ON U.OrganizationID = O.OrganizationID 
    LEFT JOIN ${TABLES.GROUP} G ON U.GroupID = G.GroupID
    WHERE U.UserID = ? AND U.IsDeleted = FALSE;
    `;

    const [result] = await db.query(query, [userID]);

    if (result.length === 0) {
      throw new APIError("User Not Found", httpStatus.NOT_FOUND);
    }

    // Convert IsLogin to actual boolean
    result[0].IsLogin = String(Boolean(result[0].IsLogin));

    return {
      success: true,
      message: "User Found",
      status: 200,
      data: result[0],
    };
  },

  async getUsersByOrganizationIdHandler(organizationID) {
    const query = `SELECT UserID,OrganizationID, Name, Email, PhoneNo FROM ${TABLES.USER} WHERE OrganizationID = ? AND IsDeleted = false AND UserID != 0`;
    const [result] = await db.query(query, [organizationID]);
    // if (result.length === 0) {
    //   throw new APIError(
    //     ERROR_MESSAGES.RESOURCE_NOT_FOUND,
    //     httpStatus.NOT_FOUND
    //   );
    // }
    return {
      success: true,
      // message: "Users Found",
      status: 200,
      data: result,
    };
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
  async getUsersOfAllOrganizationsHandler(adminData) {
    let query = "";
    let params = [];

    if (adminData.IsSuperAdmin) {
      query = `
      SELECT UserID, Name, OrganizationID 
      FROM ${TABLES.USER} 
      WHERE IsDeleted = false AND UserID != 0
    `;
    } else {
      query = `
      SELECT U.UserID, U.Name, U.OrganizationID 
      FROM ${TABLES.USER} U 
      INNER JOIN ${TABLES.ORGANIZATION} O 
        ON U.OrganizationID = O.OrganizationID
      WHERE U.IsDeleted = false 
        AND U.UserID != 0 
        AND O.AdminID = ?
    `;
      params.push(adminData.AdminID);
    }

    const [result] = await db.query(query, params);
    return result;
  },
  async getUsersForOrganizationsHandler(organizationIDs) {
    if (organizationIDs.ids.length == 0) {
      const result = await this.getUsersOfAllOrganizationsHandler();
      return {
        success: true,
        status: 200,
        data: result,
      };
    } else {
      return await this.getUsersByMultipleOrganizationIdsHandler(
        organizationIDs
      );
    }
  },

  async getuserByGroupIdsHandler(groupIDs) {
    console.log("groupIDs ", groupIDs);
    const query = `SELECT UserID, Name FROM ${TABLES.USER} WHERE GroupID IN (?) AND IsDeleted = false AND UserID != 0`;
    const [result] = await db.query(query, [groupIDs.ids]);
    return result;
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

  async updateUserHandlerForApp(userData) {
    let query = `
    UPDATE ${TABLES.USER} 
    SET Name = ? 
  `;

    const params = [userData.name];
    if (imagePath) {
      params.push(imagePath);
    }

    if (
      userData.password !== "" &&
      userData.password !== null &&
      userData.password != "undefined" &&
      userData.password !== undefined
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
    const data = await this.getUserByIdForAppHandler(userData.userID);

    return {
      success: true,
      message: "User Updated Successfully",
      status: 200,
      data: data.data,
    };
  },




  async userLogoutHandler(userID) {
    const query = `UPDATE ${TABLES.USER} SET IsLogin = FALSE WHERE UserID = ?`;
    const [result] = await db.query(query, [userID]);
    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }
    const deletAllData = await this.resetDeviceHandler({ userID: userID });
    const data = await this.getUserByIdForAppHandler(userID);

    return {
      success: true,
      message: "Logout Successful",
      status: httpStatus.OK,
      user: data.data,
    };
  },
  async userDeviceTokenHandler(userID, deviceToken) {
    const query = `UPDATE ${TABLES.USER} SET deviceToken = ? WHERE UserID = ?`;
    const [result] = await db.query(query, [deviceToken, userID]);
    if (result.affectedRows === 0) {
      throw new APIError(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        httpStatus.NOT_FOUND
      );
    }

    const userData = await this.getUserByIdForAppHandler(userID);

    return {
      success: true,
      message: "Device Token Updated Successfully",
      status: httpStatus.OK,
      user: userData.data,
    };
  },
};
export default UserService;
