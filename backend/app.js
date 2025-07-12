import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer";
import { catchError } from "./middlewares/catchError.js";

import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";


import { BASE_ROUTE } from "./utils/constants.js";
import { apiAuth } from "./middlewares/genral.js";
import catchAsync from "./middlewares/catchAsync.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  // Skip multer for routes that handle file uploads
  if (
    req.path.startsWith("/user/addUser") ||
    req.path.startsWith("/user/updateUser") ||
    req.path.startsWith("/broadcast/")
  ) {
    return next();
  }

  if (contentType.startsWith("multipart/form-data")) {
    multer().none()(req, res, next);
  } else {
    next();
  }
});

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  BASE_ROUTE.UPLOADS,
  express.static(path.join(process.cwd(), "uploads"))
);

// Protect APIS (All Below routes)
app.use(catchAsync(apiAuth));
app.use(BASE_ROUTE.USER, userRouter);
app.use(BASE_ROUTE.ADMIN, adminRouter);

// global error catch middleware
app.use(catchError);

export default app;
