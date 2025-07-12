import AxiosInstance from "./AxiosInstance";
import { HTTP_METHOD_OPTIONS, NO_WINDOW_SIZE } from "./constants";

// TOKEN APIS
export const getAccessToken = async () => {
  const config = { url: "/user/accessToken" };
  const response = await AxiosInstance(config);
  return response;
};

/////////////////////////////////////////
//////////// USER APIS
export const signinUser = async (userData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/signin`,
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export async function logoutUser() {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/logout`,
  };
  const response = await AxiosInstance(config);
  return response;
}

export const forgotPassword = async (userData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/forgotPassword`,
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const resetPassword = async (userData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/resetPassword`,
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const fetchUser = async (id) => {
  const config = {
    url: `/user/user/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export async function fetchAllUsers(filter) {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/users/${filter?.status || false}/${filter?.searchText || null
      }/${filter?.pageNo || 1}/${filter?.windowSize || NO_WINDOW_SIZE}`,
    data: filter?.columnSortings || {},
  };
  const response = await AxiosInstance(config);
  return response;
}

export const addUser = async (userData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: "/user/addUser",
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const updateUser = async ({ id, data }) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.PATCH,
    url: `/user/updateUser/${id}`,
    data,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteUser = async (id) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.DELETE,
    url: `/user/user/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteMultipleUsers = async (ids) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.DELETE,
    url: `/user/users`,
    data: { ids },
  };
  const response = await AxiosInstance(config);
  return response;
};

export const resetDevice = async (data) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/resetDevice`,
    data: data,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const fetchUsersForGroups = async (groupIds) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/user/userByGroupIds`,
    data: groupIds,
  };
  const response = await AxiosInstance(config);
  return response;
};



///////////// ADMIN_API ///////////////////

export async function fetchAdminProfile() {
  const config = {
    url: "/admin/profile",
  };
  const response = await AxiosInstance(config);
  return response;
}

export const signinAdmin = async (adminData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/admin/signin`,
    data: adminData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export async function logoutAdmin() {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/admin/logout`,
  };
  const response = await AxiosInstance(config);
  return response;
}

export const forgotPasswordAdmin = async (adminData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/admin/forgotPassword`,
    data: adminData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const resetPasswordAdmin = async (adminData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/admin/resetPassword`,
    data: adminData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const fetchAdmin = async (id) => {
  const config = {
    url: `/admin/admin/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export async function fetchAllAdmins(filter) {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: `/admin/admins/${filter?.status || false}/${filter?.searchText || null
      }/${filter?.pageNo || 1}/${filter?.windowSize || NO_WINDOW_SIZE}`,
    data: filter?.columnSortings || {},
  };
  const response = await AxiosInstance(config);
  return response;
}

export const addAdmin = async (adminData) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.POST,
    url: "/admin/addAdmin",
    data: adminData,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const updateAdmin = async ({ id, data }) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.PATCH,
    url: `/admin/admin/${id}`,
    data,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteAdmin = async (id) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.DELETE,
    url: `/admin/admin/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteMultipleAdmins = async (ids) => {
  const config = {
    method: HTTP_METHOD_OPTIONS.DELETE,
    url: `/admin/admins`,
    data: { ids },
  };
  const response = await AxiosInstance(config);
  return response;
};



