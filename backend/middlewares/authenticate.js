import { BYPASS_HEADER } from "../utils/constants.js";
import { auth } from "./genral.js";

function authBypass() {
  return (req, res, next) => {
    const isCustomerApp =
      req.headers["x-app-request"] === BYPASS_HEADER.CUSTOMER;

    if (isCustomerApp) {
      return next();
    } else {
      auth(req, res, next).catch((error) => {
        next(error);
      });
    }
  };
}

export default authBypass;
