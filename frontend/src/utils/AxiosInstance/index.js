import axios from "../axios";
import "../AxiosInterceptors";

const BACKEND_API_KEY = process.env.REACT_APP_BACKEND_API_KEY;
const AxiosInstance = async (config) => {
  try {
    const response = await axios({
      method: config.method || "GET",
      url: config.url,
      data: config.data || null,
      withCredentials: config?.withCredentials || true,
      headers: {
        "x-api-key": BACKEND_API_KEY, // Attach API key
        ...config.headers, // Merge additional headers if provided
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export default AxiosInstance;
