import { config } from "dotenv";
config();

// DATABASE CONFIG
export const DB_CONFIG = {
  host: process.env.MYSQL_HOST, // Your MySQL hostname
  user: process.env.MYSQL_USER, // Your MySQL username
  password: process.env.MYSQL_PASSWORD, // Your MySQL password
  database: process.env.MYSQL_DATABASE, // Your MySQL database
  // connectTimeout: 60000,
};

export const ALLOWED_ORIGINES = [
  "http://Exalix.com:3000",
  "https://Exalix.com:3000",
  "http://localhost:3000",
];
export const BYPASS_HEADER = {
  CUSTOMER: "CustomerApp",
};

export const TOKEN_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

// TOKEN's EXPIRATION TIME
export const ACCESS_TOKEN_EXPIRY = "5m"; // 5 minutes
export const REFRESH_TOKEN_EXPIRY = "60d"; // 60 days (~2 months)

export const RESET_TOKEN_EXPIRE = 30 * 1000;

export const BASE_ROUTE = {
  UPLOADS: "/uploads",
  USER: "/user",
  ORGANIZATION: "/organization",
  ADMIN: "/admin",
  FILE: "/file",
  REQUEST_LOG: "/requestLog",
  CHAT_DELETE: "/chatDelete",
  BROADCAST: "/broadcast",
  GROUP: "/group",
  NOTIFICATION: "/notification",
  CALL_LOG: "/callLog",
};

//TABLE NAMES
export const TABLES = {
  USER: "UserMaster",
  QUESTIONMASTER: "QuestionMaster",
  ANSWERMASTER: "AnswerMaster",
  TAGMASTER: "TagMaster",
  TAGQUESTION: "TagQuestionMapping",
  ADMIN: "AdminMaster",
 
};

//FIREBASE COLLECTION NAMES
export const FIREBASE_COLLECTIONS = {
  CHAT: "chat",
  MESSAGE: "message",
  USERS: "users",
  CHAT_REQUESTS: "chat_requests",
  CALLS: "calls",
};

/////////////////////////////////////// ROUTES MAPING ///////////////////////////////////////
export const USER_ROUTES = {
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  LOGOUT: "/logout",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword/:resetToken",
  ADD_USER: "/addUser",
  GET_USERS: "/users/:status?/:searchText?/:page?/:window?",
  GET_USER: "/user/:id",
  GET_ACCESS_TOKEN: "/accessToken",
  DELETE_USER: "/user/:id",
  DELETE_USERS: "/users",
  UPDATE_USER: "/updateUser",
  GET_USER_BY_NAME_FOR_APP: "/userByNameForApp",
  GET_USER_BY_ID_FOR_APP: "/userByIdForApp/:id",
  GET_USER_BY_ORGANIZATION_ID: "/userByOrganizationId/:id",
  GET_USERS_BY_MULTIPLE_ORGANIZATION_IDS: "/usersByMultipleOrganizationIds",
  GET_USERS_FOR_ORGANIZATIONS: "/usersForOrganizations",
  UPDATE_USER_FOR_APP: "/updateUserForApp",
  RESET_DEVICE: "/resetDevice",
  USER_LOGOUT: "/userLogout",
  GET_USER_BY_GROUP_IDS: "/userByGroupIds",
  USER_DEVICE_TOKEN: "/userDeviceToken",
};

export const ORGANIZATION_ROUTES = {
  ADD_ORGANIZATION: "/addOrganization",
  GET_ORGANIZATIONS: "/organizations/:status?/:searchText?/:page?/:window?",
  GET_ORGANIZATION: "/organization/:id",
  GET_ORGANIZATION_PROFILE: "/profile",
  GET_ACCESS_TOKEN: "/accessToken",
  DELETE_ORGANIZATION: "/organization/:id",
  DELETE_ORGANIZATIONS: "/organizations",
  UPDATE_ORGANIZATION: "/organization/:id",
  GET_ALL_ORGANIZATIONS_FOR_CHAT: "/organizationsForChat",
  GET_USERS_AND_ORGANIZATIONS_FOR_CHAT: "/usersAndOrganizationsForChat",
};

export const ADMIN_ROUTES = {
  SIGNIN: "/signin",
  LOGOUT: "/logout",
  GET_ADMIN_PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword/:resetToken",
  ADD_ADMIN: "/addAdmin",
  GET_ADMINS: "/admins/:status?/:searchText?/:page?/:window?",
  GET_ADMIN: "/admin/:id",
  DELETE_ADMIN: "/admin/:id",
  DELETE_ADMINS: "/admins",
  UPDATE_ADMIN: "/admin/:id",
};

export const FILE_ROUTES = {
  ADD_FILE: "/addFile",
  GET_FILES: "/files/:status?/:searchText?/:page?/:window?",
  GET_FILE: "/file/:id",
  DELETE_FILE: "/file/:id",
  DELETE_FILES: "/files",
  UPDATE_FILE: "/file/:id",
  GET_ALL_FILES_FOR_APP: "/filesForApp",
};

export const REQUEST_LOG_ROUTES = {
  ADD_REQUEST_LOG: "/addRequestLog",
  GET_REQUEST_LOGS: "/requestLogs",
};

export const CHAT_DELETE_ROUTES = {
  ADD_CHAT_DELETE: "/addChatDelete",
  INSTANT_CHAT_DELETE: "/instantChatDelete",
  GET_CHAT_DELETES: "/chatDeletes/:status?/:searchText?/:page?/:window?",
  GET_CHAT_DELETE: "/chatDelete/:id",
  DELETE_CHAT_DELETE: "/chatDelete/:id",
  DELETE_CHAT_DELETES: "/chatDeletes",
  UPDATE_CHAT_DELETE: "/chatDelete/:id",
};

export const BROADCAST_ROUTES = {
  ADD_BROADCAST: "/addBroadcast",
  GET_BROADCASTS: "/broadcasts",
  ADD_FILE_TO_CHAT: "/addFileToChat",
};

export const GROUP_ROUTES = {
  ADD_GROUP: "/addGroup",
  GET_GROUPS: "/groups/:status?/:searchText?/:page?/:window?",
  GET_GROUP: "/group/:id",
  UPDATE_GROUP: "/group/:id",
  DELETE_GROUP: "/group/:id",
  DELETE_GROUPS: "/groups",
  GET_GROUPS_BY_ORGANIZATION_IDS: "/groupsByOrganizationIds",
};

export const NOTIFICATION_ROUTES = {
  CHAT_NOTIFICATION: "/chatNotification",
  CALL_NOTIFICATION: "/callNotification",
  REQUEST_NOTIFICATION: "/requestNotification",
};


export const CALL_LOG_ROUTES = {
  ADD_CALL_LOG: "/addCallLog",
  GET_USER_WISE_CALL_LOGS: "/userWiseCallLogs/:status?/:searchText?/:page?/:window?",
  GET_CALL_LOGS: "/callLogs",
  GET_CURRENT_MONTH_TOTAL_USAGE: "/currentMonthTotalUsage",
};

/////////////////////////////////////////////////////////////////////////////////////////////

// GENERAL ERROR MESSAGES
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized Access",
  FORBIDDEN: "Access Forbidden",
  API_KEY_REQUIRED: "Unauthorized: Api key Required",
  INVALID_API_KEY: "Access Forbidden: Invalid Api key",
  NOT_FOUND: "Resource Not Found",
  CONNECTION_ERROR: "Connection Error: Unable to connect to the database",
  AUTHENTICATION_FAILED: "Authentication Failed: Invalid credentials",
  SERVER_ERROR: "Server Error: An unexpected error occurred on the server",
  DATABASE_ERROR:
    "Database Error: An error occurred with the database operation",
  INSUFFICIENT_PRIVILEGES:
    "Insufficient Privileges: You do not have the necessary permissions",
  RESOURCE_NOT_FOUND:
    "Resource Not Found: The requested resource does not exist or may have been deleted.",
  OPERATION_FAILED:
    "Operation Failed: The requested operation could not be completed",
  BAD_REQUEST:
    "Bad Request: The request could not be understood or was missing required parameters",
  INTERNAL_SERVER_ERROR:
    "Internal Server Error: An unexpected error occurred on the server",
  DUPLICATE_RECORD: "Record already exists for {key}",
  INVALID_DETAILS: "Invalid login details Or User is not active",
  INVALID_PASSWORD: "Invalid password",
  TOKEN_EXPIRED: "Token Expired",
  LINKEDIN_USER_NOT_FOUND: "Error fetching LinkedIn user info {profile}",
  LINKEDIN_POST_FAILD: "Faild to post Description on LinkedIn",
  RESET_TOKEN_EXPIRE: "Token has been expired please try again.",
  ON_PASSWORD_CONFLICT: "Password is not matching with confirm password.",
};

export const RESPONSE_MESSAGES = {
  ON_ADD_VEHICAL: "Vehicle added successfully.",
  ON_DELETE_VEHICAL: "Vehicle deleted successfully.",
  ON_VEHICAL_LIMIT_REACHED:
    "Vehicle limit reached. You can only add up to __count__ vehicles.",
  ON_OTP_SENT: "Otp has been sent on your registered phoneNo.",
  ON_COUPON_NOT_FOUND: "Coupon is either invalid, expired, or not active",
  ON_COUPON_USED: "Coupon already used",
};

export const DEFAULT_WINDOW_SIZE = 10;
export const NO_WINDOW_SIZE = null;

// Mapping of database column names to user-friendly labels
export const COLUMN_LABELS = {
  //CustomersMaster
  Phone: "Phone No",
  // GenuinePartsMaster & DuplicatePartmaster
  UniqueCode: "Unique Code",
  PartCategory: "Part Category",
  PartName: "Part Name",
  PartDescription: "Part Description",
  PartQuantity: "Part Quantity",
  PartPrice: "Part Price",
  PartWarranty: "Part Warranty",
};

export const ALLOWED_PHONE_NO_DIGITS = 10;

export const REQUEST_STATUS = ["accepted", "declined", "pending"];

export const USER_UPLOAD_CONFIG = {
  uploadPath: "uploads/user/",
  fileSizeLimit: 100 * 1024 * 1024,
  allowedTypes: /jpeg|jpg|png/,
  invalidTypeMessage: "Only images (jpeg, jpg, png) are allowed",
};

export const FILE_UPLOAD_CONFIG = {
  uploadPath: "uploads/chatsFile/",
  fileSizeLimit: 5 * 1024 * 1024,
  invalidTypeMessage:
    "Only images (jpeg, jpg, png) and documents (pdf, docx, xlsx) and videos (mp4, avi, mkv) are allowed",
};

export const BACKEND_URL = `https://exalix.tech:8001`;
