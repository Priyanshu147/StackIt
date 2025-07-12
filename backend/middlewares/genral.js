import APIError from "../error/index.js";
import UserService from "../service/userService.js";
import AdminService from "../service/adminService.js";
import { ERROR_MESSAGES, TOKEN_NAMES } from "../utils/constants.js";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { setAccessTokenCookie } from "../utils/helper.js";

const decodeTokens = async (accessToken, refreshToken, strictMode = true) => {
  if (!refreshToken) {
    if (strictMode) {
      throw new APIError(ERROR_MESSAGES.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
    }
    return null;
  }

  const refreshTokenDecoded = jwt.verify(
    refreshToken,
    process.env.USER_REFRESH_TOKEN_SECRET
  );

  let accessTokenDecoded;
  if (accessToken) {
    try {
      accessTokenDecoded = jwt.verify(
        accessToken,
        process.env.USER_ACCESS_TOKEN_SECRET
      );
    } catch (_) {
      // accessToken is expired or invalid — we’ll handle this later
    }
  }

  const userId = refreshTokenDecoded?._id;

  // If accessToken is valid and matches refreshToken -> return user
  if (accessTokenDecoded && accessTokenDecoded._id === userId) {
    return await UserService.getUserHandler(userId);
  }

  // Otherwise, issue new access token using refreshToken
  const data = await UserService.getUserHandler(userId);
  console.log("User Data:", data);
  data.newAccessToken = await UserService.getAccessTokenHandler(data.data.UserID);

  return data;
};

const getUserData = async (cookies) => {
  const accessToken = cookies[TOKEN_NAMES.ACCESS_TOKEN];
  const refreshToken = cookies[TOKEN_NAMES.REFRESH_TOKEN];
  const data = await decodeTokens(accessToken, refreshToken, false);

  return data;
};

export const auth = async (req, res, next) => {
  const data = await getUserData(req.cookies);
  if (!data) {
    throw new APIError(ERROR_MESSAGES.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
  }
  if (data.newAccessToken) {
    setAccessTokenCookie(res, data.newAccessToken);
  }
  req.user = data;
  next();
};

export const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies[TOKEN_NAMES.REFRESH_TOKEN];
  let data;
  if (refreshToken) {
    const refreshTokenDecoded = jwt.verify(
      refreshToken,
      process.env.USER_REFRESH_TOKEN_SECRET
    );
    if (refreshTokenDecoded) {
      data = await UserService.getUserHandler(refreshTokenDecoded._id);
      req.user = data;
    }
  } else {
    throw new APIError(ERROR_MESSAGES.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
  }
  next();
};

export const fetchUserProfile = async (req, res, next) => {
  const data = await getUserData(req.cookies);
  req.user = data;
  next();
};

export const apiAuth = async (req, res, next) => {
  const apiToken = req.headers["x-api-key"];
  if (!apiToken) {
    throw new APIError(
      ERROR_MESSAGES.API_KEY_REQUIRED,
      httpStatus.UNAUTHORIZED,
      "BACKEND_API_KEY"
    );
  }
  if (apiToken == process.env.BACKEND_API_KEY) {
    next();
  } else {
    throw new APIError(
      ERROR_MESSAGES.API_KEY_REQUIRED,
      httpStatus.FORBIDDEN,
      "BACKEND_API_KEY"
    );
  }
};
