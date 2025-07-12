import { getAccessToken } from "../utils/api";
import { ACTIONS, ALL_MASTER_DETAILS } from "./constants";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_URL_DEV;

export function cookieParser() {
  const data = {};
  document.cookie.split(";").map((ele) => {
    return (data[ele.trim().split("=")[0]] = ele.split("=")[1]);
  });
  return data;
}

export const genrateAccessToken = async () => {
  try {
    const response = await getAccessToken();
    return response;
  } catch (err) {
    return;
  }
};

export const formateData = (value, formateWith, validLength) => {
  let data = value.replace(/\s/g, "").replace(/\D/g, "");

  let formattedData = "";

  for (let i = 0; i < data.length; i++) {
    formattedData += data[i];
    if ((i + 1) % 4 === 0 && i !== data.length - 1) {
      formattedData += formateWith;
    }
  }

  if (data.length > validLength) {
    data = data.slice(0, validLength - 1);
    formattedData = formattedData.slice(0, validLength + 2);
  }
  return formattedData;
};
export const formateDate = (value) => {
  let extractedDate = value.replace(/\s/g, "").replace(/\D/g, "");

  let tempDate = "";

  for (let i = 0; i < extractedDate.length; i++) {
    tempDate += extractedDate[i];
    if (tempDate.length === 2) {
      tempDate += "/";
    }
  }
  if (tempDate.length > 5) {
    tempDate = tempDate.slice(0, 5);
  }
  let newDate = tempDate.split("/");
  let isValid = newDate[0] !== "00" && +newDate[0] <= 12 && +newDate[1] > 23; // letter we will change to currunt time
  return { tempDate, isValid };
};

export const findCountryValueHandler = (countryList, countryName) => {
  let countryId, countryValue;
  for (let i = 0; i < countryList.length; i++) {
    if (countryList[i].name === countryName) {
      countryId = countryList[i].id;
      countryValue = +countryList[i].id.slice(-1);
      break;
    }
  }
  return { countryId, countryValue };
};
export const findStateValueHandler = (stateList, stateName, countryId) => {
  let stateId, stateValue;
  for (let i = 0; i < stateList.length; i++) {
    if (
      stateList[i].name === stateName &&
      stateList[i].id.includes(countryId)
    ) {
      stateId = stateList[i].id;
      stateValue = +stateList[i].id.slice(-1);
      break;
    }
  }
  return { stateId, stateValue };
};
export const findCityValueHandler = (cityList, cityName, stateId) => {
  let cityValue;
  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].name === cityName && cityList[i].id.includes(stateId)) {
      cityValue = +cityList[i].id.slice(-1);
      break;
    }
  }
  return cityValue;
};
export const getScoreColor = (score) => {
  return {
    backgroundColor:
      score <= 4
        ? "rgba(255, 0, 0, 0.2)"
        : score <= 6
        ? "rgba(255, 166, 0, 0.2)"
        : "rgba(0, 128, 0, 0.2)",
    color:
      score <= 4
        ? "rgba(255, 0, 0, 0.4)"
        : score <= 6
        ? "rgba(255, 166, 0, 0.4)"
        : "rgba(0, 128, 0, 0.4)",
  };
};

export const downloadBase64PdfHandler = (base64String, fileName) => {
  // Create a Blob from the base64 string
  const base64Response = atob(base64String);
  const binaryLength = base64Response.length;
  const bytes = new Uint8Array(binaryLength);
  for (let i = 0; i < binaryLength; i++) {
    bytes[i] = base64Response.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);

  // Create an anchor element and programmatically click it to trigger the download
  const link = document.createElement("a");
  link.href = blobUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboardHandler = async (text) => {
  const data = await navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch((err) => false);
  return data;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const wrapApiRequestHandler = async ({
  apiCall,
  onSuccess,
  onError,
  setLocalLoading,
  setGlobalLoading,
  finallyCallback,
}) => {
  if (setLocalLoading) setLocalLoading({ status: true });
  if (setGlobalLoading) setGlobalLoading({ status: true, isGlobal: true });
  try {
    const result = await apiCall(); // Execute the API call
    if (onSuccess) onSuccess(result); // Call onSuccess callback
  } catch (error) {
    console.error("API Request Error:", error);
    if (onError) onError(error); // Call onError callback
    else return;
  } finally {
    if (setLocalLoading) setLocalLoading({ status: false });
    if (setGlobalLoading) setGlobalLoading({ status: false, isGlobal: true });
    if (finallyCallback) finallyCallback(); // Optional cleanup
  }
};

export function getTableHeader(masterName) {
  const title = ALL_MASTER_DETAILS[masterName].HEADER.TITLE;
  const description = ALL_MASTER_DETAILS[masterName].HEADER.DESCRIPTION;
  const buttonLabel = `Add ${ALL_MASTER_DETAILS[masterName].NAME}`;

  return { title, description, buttonLabel };
}

export const formatToLocalDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getImagePreview = (image) => {
  const defaultImage = "/no-image.png";
  if (!image) return defaultImage;
  if (typeof image === "string") {
    return `${BACKEND_DOMAIN}/${image}`;
  }

  if (image instanceof File) {
    // If it's a File object from an input field, create a preview URL
    return URL.createObjectURL(image);
  }

  return defaultImage;
};

export const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "input-completed";
    case "cancelled":
      return "input-cancelled";
    case "ongoing":
      return "input-ongoing";
    case "pending":
      return "input-pending";
    default:
      return "input-unknown";
  }
};

export const getConditionalValidation = (baseValidation, action) => {
  if (action === ACTIONS.UPDATE) {
    return {
      ...baseValidation,
      required: false,
    };
  }

  return baseValidation;
};
