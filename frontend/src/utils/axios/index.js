import axios from "axios";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_URL_DEV;
// const BACKEND_DOMAIN =
// process.env.REACT_APP_BACKEND_URL_PROD ;

export default axios.create({
  baseURL: BACKEND_DOMAIN,
});
