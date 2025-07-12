import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  TOKEN_NAMES,
} from "./constants.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TO GET BOTH ACCESS TOKENS AND REFRESH TOKENS WHEN USER GETS LOGIN OR SIGNUP
export const getAuthToken = (userID) => {
  const accessToken = jwt.sign(
    { _id: userID.toString() },
    process.env.USER_ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
  const refreshToken = jwt.sign(
    { _id: userID.toString() },
    process.env.USER_REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
  return { accessToken, refreshToken };
};

// TO REGENERATE ACCESSTOKEN IN CASE IT GOT EXPIRED
export const getAccessToken = (userID) => {
  const accessToken = jwt.sign(
    { _id: userID.toString() },
    process.env.USER_ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
  return accessToken;
};

// WILL SET ACCESS TOKEN IN RESPONSE HEADER
export function setAccessTokenCookie(res, accessToken) {
  const accessTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 5),
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  };
  res.cookie(TOKEN_NAMES.ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
}

// WILL SET REFRESH TOKEN IN RESPONSE HEADER
export function setRefreshTokenCookie(res, refreshToken) {
  const refreshTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  };
  res.cookie(
    TOKEN_NAMES.REFRESH_TOKEN,
    refreshToken,
    refreshTokenCookieOptions
  );
}

// WILL CLEAR COKKIE FROM RESPONSE HEADER
export function clearCookies(res) {
  res.clearCookie(TOKEN_NAMES.REFRESH_TOKEN);
  res.clearCookie(TOKEN_NAMES.ACCESS_TOKEN);
}

// return hashed password
export const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 8);

  return hashedPassword;
};

// compare hashed password (return true/false)
export const compareHashedPassword = async (password, PasswordHash) => {
  const compare = await bcrypt.compare(password, PasswordHash);
  return compare;
};

export const getFilterParams = (params) => {
  const status = params?.status || null;
  const searchText = params.searchText == "null" ? "" : params.searchText;
  const page = +params.page;
  const window = +params?.window;
  return { status, searchText, page, window };
};

export const createDelay = async (seconds) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getUploadsPath = (imagePath) => {
  return path.join(__dirname, "../", imagePath);
};

export const readImageFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const image = fs.readFileSync(filePath);
    return image.toString("base64");
  }
  return null;
};

export const getRandomOtp = (digits = 6, expiry = 30000) => {
  const otp = Array.from({ length: digits }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  const currentTime = new Date();
  const otpExpiry = new Date(currentTime.getTime() + expiry).toISOString();

  return { otp, expiryTime };
};

export const generateOrderByClause = (
  sortingOrder,
  validSortFields,
  defaultSort = ""
) => {
  const orderByClauses = Object.entries(sortingOrder)
    .filter(
      ([key, value]) =>
        validSortFields[key] && (value === "ASC" || value === "DESC")
    )
    .map(([key, value]) => `${validSortFields[key]} ${value}`);

  return orderByClauses.length
    ? ` ORDER BY ` + orderByClauses.join(", ")
    : ` ORDER BY ${defaultSort}`;
};
