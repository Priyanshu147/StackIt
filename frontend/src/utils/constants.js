export const APP_NAME = "Exalix Tech";
export const DASHBOARD_HEADING = "Welcome back,";
export const DASHBOARD_SUB_HEADING =
  "You're in the Admin Dashboard - manage everything with ease.";

export const SYSTEM_ROLES = {
  SUPER_ADMIN: 1,
  ADMIN: 0,
};

export const SORTING_STATUS = {
  ASCENDING: "ASC",
  DESCENDING: "DESC",
};

export const HOME_BASEURL = "/";

export const DASHBOARD_BASEURL = "/dashboard";

export const AUTH_BASEURL = "/auth";
export const FORGET_PASSWORD_BASEURL = "/auth/forgotPassword";
export const RESET_PASSWORD_BASEURL = "/auth/resetPassword";

export const USER_MASTER_BASEURL = "/users";
export const USER_MASTER_FORM_BASEURL = "userForm";
export const USER_RESET_DEVICE_BASEURL = "resetDevice";

export const ORGANIZATION_MASTER_BASEURL = "/organizations";
export const ORGANIZATION_MASTER_FORM_BASEURL = "organizationForm";

export const FILE_MASTER_BASEURL = "/files";
export const FILE_MASTER_FORM_BASEURL = "fileForm";

export const CHAT_DELETE_MASTER_BASEURL = "/chatDeletes";
export const CHAT_DELETE_MASTER_FORM_BASEURL = "chatDeleteForm";

export const ADMIN_MASTER_BASEURL = "/admins";
export const ADMIN_MASTER_FORM_BASEURL = "adminForm";

export const GROUP_MASTER_BASEURL = "/groups";
export const GROUP_MASTER_FORM_BASEURL = "groupForm";

export const BROADCAST_BASEURL = "/broadcast";

export const CALL_LOG_MASTER_BASEURL = "/callLogs";

export const HTTP_METHOD_OPTIONS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const SNACKBAR_SEVERITY = {
  DEFAULT: "default",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const SNACKBAR_DETAILS = {
  ON_SIGNED_UP: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Welcome To Exalix Tech",
  },
  ON_LOGGED_IN: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Succesfully Logged In",
  },
  ON_LOGGED_OUT: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Succesfully Logged Out",
  },
  ON_ERROR: {
    status: true,
    severity: SNACKBAR_SEVERITY.ERROR,
    message: "Somthing Went Wrong",
  },
  ON_UNAUTHORIZED: {
    status: true,
    severity: SNACKBAR_SEVERITY.WARNING,
    message: "You need to login to your account",
  },
  ON_FORBIDDEN: {
    status: true,
    severity: SNACKBAR_SEVERITY.WARNING,
    message: "Access Forbidden",
  },
  ON_DUPLICATE_CREDENTIALS: {
    status: true,
    severity: SNACKBAR_SEVERITY.WARNING,
    message: "Email already in use. Try another or log in",
  },
  ON_RESET_PASSWORD_EMAIL_SENT: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message:
      "We've sent you an email with instructions to reset your password.",
  },
  ON_RESET_PASSWORD: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message:
      "Your password has been successfully reset. You can now log in with your new password.",
  },
  

  
};

export const CONFIRM_BOX_MESSAGES = {
  DEFAULT_CONFIRMATION: "Are you sure you want to proceed this?",
  DELETE_CONFIRMATION: "Are you sure you want to delete this?",
  SAVE_CHANGES_CONFIRMATION: "Do you want to save all the changes?",
  SUBMIT_CONFIRMATION: "Do you want to submit this.",
  LOGOUT_CONFIRMATION: "Are you sure you want to log out?",
};

export const ACTIONS = {
  DEFAULT: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export const NO_WINDOW_SIZE = 0;
export const DEFAULT_WINDOW_SIZE = 10;
export const WINDOW_SIZES = [10, 50, 100];

export const SIDEBAR_STRUCTURE = [
  {
    title: null,
    isOpen: true, // Default open
    items: [
      {
        label: "Dashboard",
        icon: "fa-solid fa-house",
        link: DASHBOARD_BASEURL,
      },
      {
        label: "Broadcast",
        icon: "fa-solid fa-bullhorn",
        link: BROADCAST_BASEURL,
      },
    ],
  },
  {
    title: "Administrator",
    isOpen: false, // Default close
    items: [
      {
        label: "Organizations",
        icon: "fa-solid fa-sitemap",
        link: ORGANIZATION_MASTER_BASEURL,
      },
      {
        label: "Admins",
        icon: "fa-solid fa-users",
        link: ADMIN_MASTER_BASEURL,
        access: [SYSTEM_ROLES.SUPER_ADMIN],
      },
      {
        label: "Groups",
        icon: "fa-solid fa-users",
        link: GROUP_MASTER_BASEURL,
      },
      {
        label: "Users",
        icon: "fa-solid fa-user",
        link: USER_MASTER_BASEURL,
      },
      {
        label: "Call Logs",
        icon: "fa-solid fa-phone",
        link: CALL_LOG_MASTER_BASEURL,
      },
    ],
  },
  {
    title: "App Setting",
    isOpen: false, // Default close
    items: [
      /* {
        label: "Allowed File Extension ",
        icon: "fa-solid fa-file-signature",
        link: FILE_MASTER_BASEURL,
      }, */
      {
        label: "Chat Deletes",
        icon: "fa-solid fa-comment-slash",
        link: CHAT_DELETE_MASTER_BASEURL,
      },
    ],
  },
];

export const TABLE_IDS = {
  USER: "UserId",
  ORGANIZATION: "OrganizationID",
  FILE: "FileID",
  CHAT_DELETE: "ChatDeleteID",
  ADMIN: "AdminID",
  GROUP: "GroupID",
  CALL_LOG: "UserId",
};

////////////
// -------------- USER-STATE--------------
export const USER_MASTER_COLUMNS = [
  {
    _id: 0,
    title: "Username",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "Name",
    isSortingAllowed: true,
  },
  {
    _id: 1,
    title: "Organization",
    icon: <i className="fa-solid fa-envelope"></i>,
    align: "left",
    for: "OrganizationName",
    isSortingAllowed: true,
  },
  /*  {
     _id: 3,
     title: "Phone No",
     icon: <i className="fa-solid fa-envelope"></i>,
     align: "left",
     for: "PhoneNo",
     isSortingAllowed: true,
   }, */
  {
    _id: 4,
    title: "Active",
    icon: <i className="fa-solid fa-envelope"></i>,
    align: "center",
    for: "IsActive",
    isAppVisibility: true,
  },
  {
    _id: 6,
    title: "Created At",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "center",
    for: "CreatedAt",
    isDate: true,
    isSortingAllowed: true,
  },
  {
    _id: 7,
    title: "Action",
    icon: <i className="fa-solid fa-user-pen"></i>,
    align: "center",
    isResetDevice: true,
  },
];
export const USER_MASTER_COLUMNS_SORTINGS = {
  UserName: SORTING_STATUS.ASCENDING,
  Organization: SORTING_STATUS.ASCENDING,
  Email: SORTING_STATUS.ASCENDING,
  PhoneNo: SORTING_STATUS.ASCENDING,
  CreatedAt: SORTING_STATUS.DESCENDING,
};

// this will contain all userTable Information used in whole code
export const USER_DETAILS = {
  NAME: "User",
  ID_NAME: TABLE_IDS.USER,
  MAIN_LINK: USER_MASTER_BASEURL,
  FORM_LINK: USER_MASTER_FORM_BASEURL,
  RESET_DEVICE_LINK: USER_RESET_DEVICE_BASEURL,
  HEADER: {
    TITLE: "User Master",
    DESCRIPTION: "Overview of all users.",
  },
  TABLE_TITLE: "User Master",
  COLUMNS: USER_MASTER_COLUMNS,
  COLUMN_SORTINGS: USER_MASTER_COLUMNS_SORTINGS,
};

////////////
// -------------- ORGANIZATION-STATE--------------
export const ORGANIZATION_MASTER_COLUMNS = [
  {
    _id: 0,
    title: "Name",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "Name",
    isSortingAllowed: true,
  },
  {
    _id: 2,
    title: "Created At",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "center",
    for: "CreatedAt",
    isDate: true,
    isSortingAllowed: true,
  },
  {
    _id: 3,
    title: "Action",
    icon: <i className="fa-solid fa-user-pen"></i>,
    align: "center",
    access: [SYSTEM_ROLES.SUPER_ADMIN],
  },
];
export const ORGANIZATION_MASTER_COLUMNS_SORTINGS = {
  Name: SORTING_STATUS.ASCENDING,
  CreatedAt: SORTING_STATUS.DESCENDING,
};

// this will contain all userTable Information used in whole code
export const ORGANIZATION_DETAILS = {
  NAME: "Organization",
  ID_NAME: TABLE_IDS.ORGANIZATION,
  MAIN_LINK: ORGANIZATION_MASTER_BASEURL,
  FORM_LINK: ORGANIZATION_MASTER_FORM_BASEURL,
  HEADER: {
    TITLE: "Organization Master",
    DESCRIPTION: "Overview of all organizations.",
  },
  TABLE_TITLE: "Organization Master",
  COLUMNS: ORGANIZATION_MASTER_COLUMNS,
  COLUMN_SORTINGS: ORGANIZATION_MASTER_COLUMNS_SORTINGS,
  ADD_ACCESS: [SYSTEM_ROLES.SUPER_ADMIN],
};
////////////
// -------------- File-STATE--------------
export const FILE_MASTER_COLUMNS = [
  {
    _id: 0,
    title: "File Name",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "FileName",
    isSortingAllowed: true,
  },
  {
    _id: 2,
    title: "Created At",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "center",
    for: "CreatedAt",
    isDate: true,
    isSortingAllowed: true,
  },
  {
    _id: 3,
    title: "Action",
    icon: <i className="fa-solid fa-user-pen"></i>,
    align: "center",
    access: [SYSTEM_ROLES.SUPER_ADMIN],
  },
];
export const FILE_MASTER_COLUMNS_SORTINGS = {
  FileName: SORTING_STATUS.ASCENDING,
  CreatedAt: SORTING_STATUS.DESCENDING,
};

// this will contain all userTable Information used in whole code
export const FILE_DETAILS = {
  NAME: " File Extension",
  ID_NAME: TABLE_IDS.FILE,
  MAIN_LINK: FILE_MASTER_BASEURL,
  FORM_LINK: FILE_MASTER_FORM_BASEURL,
  HEADER: {
    TITLE: "Allowed File Extension",
    DESCRIPTION: "Overview of all File Extension ",
  },
  TABLE_TITLE: "Allowed File Extension",
  COLUMNS: FILE_MASTER_COLUMNS,
  COLUMN_SORTINGS: FILE_MASTER_COLUMNS_SORTINGS,
  ADD_ACCESS: [SYSTEM_ROLES.SUPER_ADMIN],
};

////////////
// -------------- Chat-Delete-STATE--------------
export const CHAT_DELETE_MASTER_COLUMNS = [
  {
    _id: 1,
    title: "Organization Name",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "OrganizationName",
    isSortingAllowed: false,
  },
  {
    _id: 3,
    title: "Auto Delete Day",
    icon: <i className="fa-solid fa-user" />,
    align: "center",
    for: "Days",
    isSortingAllowed: false,
  },
  {
    _id: 5,
    title: "Created At",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "center",
    for: "CreatedAt",
    isDate: true,
    isSortingAllowed: true,
  },
  {
    _id: 8,
    title: "Action",
    icon: <i className="fa-solid fa-user-pen"></i>,
    align: "center",
  },
];
export const CHAT_DELETE_MASTER_COLUMNS_SORTINGS = {
  CreatedAt: SORTING_STATUS.DESCENDING,
};

// this will contain all userTable Information used in whole code
export const CHAT_DELETE_DETAILS = {
  NAME: "Delete Chat",
  ID_NAME: TABLE_IDS.CHAT_DELETE,
  MAIN_LINK: CHAT_DELETE_MASTER_BASEURL,
  FORM_LINK: CHAT_DELETE_MASTER_FORM_BASEURL,
  HEADER: {
    TITLE: "Chat Deletion",
    DESCRIPTION: "Overview of all Chat Delete Schedules",
  },
  TABLE_TITLE: "Scheduled Chat Deletes",
  COLUMNS: CHAT_DELETE_MASTER_COLUMNS,
  COLUMN_SORTINGS: CHAT_DELETE_MASTER_COLUMNS_SORTINGS,
};

////////////
// -------------- ADMIN-STATE--------------
export const ADMIN_MASTER_COLUMNS = [
  {
    _id: 0,
    title: "Username",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "UserName",
    isSortingAllowed: true,
  },
  {
    _id: 2,
    title: "SuperAdmin",
    icon: <i className="fa-solid fa-envelope"></i>,
    align: "center",
    for: "IsSuperAdmin",
    isAppVisibility: true,
  },
  {
    _id: 3,
    title: "Created At",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "center",
    for: "CreatedAt",
    isDate: true,
    isSortingAllowed: true,
  },
  {
    _id: 4,
    title: "Action",
    icon: <i className="fa-solid fa-user-pen"></i>,
    align: "center",
  },
];
export const ADMIN_MASTER_COLUMNS_SORTINGS = {
  UserName: SORTING_STATUS.ASCENDING,
  CreatedAt: SORTING_STATUS.DESCENDING,
};

// this will contain all userTable Information used in whole code
export const ADMIN_DETAILS = {
  NAME: "Admin",
  ID_NAME: TABLE_IDS.ADMIN,
  MAIN_LINK: ADMIN_MASTER_BASEURL,
  FORM_LINK: ADMIN_MASTER_FORM_BASEURL,
  HEADER: {
    TITLE: "Admin Master",
    DESCRIPTION: "Overview of all admins.",
  },
  TABLE_TITLE: "Admin Master",
  COLUMNS: ADMIN_MASTER_COLUMNS,
  COLUMN_SORTINGS: ADMIN_MASTER_COLUMNS_SORTINGS,
};

////////////
// -------------- GROUP-STATE--------------
export const GROUP_MASTER_COLUMNS = [
  {
    _id: 0,
    title: "Group Name",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "GroupName",
    isSortingAllowed: true,
  },
  {
    _id: 1,
    title: "Organization Name",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "OrganizationName",
    isSortingAllowed: true,
  },
  {
    _id: 2,
    title: "Created At",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "center",
    for: "CreatedAt",
    isDate: true,
    isSortingAllowed: true,
  },
  {
    _id: 3,
    title: "Action",
    icon: <i className="fa-solid fa-user-pen"></i>,
    align: "center",
  },
];

export const GROUP_MASTER_COLUMNS_SORTINGS = {
  GroupName: SORTING_STATUS.ASCENDING,
  OrganizationName: SORTING_STATUS.ASCENDING,
  CreatedAt: SORTING_STATUS.DESCENDING,
};

// this will contain all userTable Information used in whole code
export const GROUP_DETAILS = {
  NAME: "Group",
  ID_NAME: TABLE_IDS.GROUP,
  MAIN_LINK: GROUP_MASTER_BASEURL,
  FORM_LINK: GROUP_MASTER_FORM_BASEURL,
  HEADER: {
    TITLE: "Group Master",
    DESCRIPTION: "Overview of all groups.",
  },
  TABLE_TITLE: "Group Master",
  COLUMNS: GROUP_MASTER_COLUMNS,
  COLUMN_SORTINGS: GROUP_MASTER_COLUMNS_SORTINGS,
};

////////////
// -------------- Call Log-STATE--------------
export const CALL_LOG_MASTER_COLUMNS = [
  {
    _id: 0,
    title: "User",
    icon: <i className="fa-solid fa-user" />,
    align: "left",
    for: "Name",
    isSortingAllowed: true,
  },
  {
    _id: 2,
    title: "Organization Name",
    icon: <i className="fa-solid fa-clock"></i>,
    align: "left",
    for: "OrganizationName",
    isSortingAllowed: true,
  },
  {
    _id: 3,
    title: "Current Month Incoming Duration",
    icon: <i className="fa-solid fa-user" />,
    align: "center",
    for: "CurrentMonthIncomingDuration",
  },
  {
    _id: 4,
    title: "Current Month Outgoing Duration",
    icon: <i className="fa-solid fa-user" />,
    align: "center",
    for: "CurrentMonthOutgoingDuration",
  },
  {
    _id: 5,
    title: "Full Time Incoming Duration",
    icon: <i className="fa-solid fa-user" />,
    align: "center",
    for: "FullTimeIncomingDuration",
  },
  {
    _id: 6,
    title: "Full Time Outgoing Duration",
    icon: <i className="fa-solid fa-user" />,
    align: "center",
    for: "FullTimeOutgoingDuration",
  },
];
export const CALL_LOG_MASTER_COLUMNS_SORTINGS = {
  User: SORTING_STATUS.ASCENDING,
  OrganizationName: SORTING_STATUS.ASCENDING,
};

// this will contain all userTable Information used in whole code
export const CALL_LOG_DETAILS = {
  NAME: "Call Log",
  ID_NAME: TABLE_IDS.CALL_LOG,
  MAIN_LINK: CALL_LOG_MASTER_BASEURL,
  HEADER: {
    TITLE: "Call Logs Master",
    DESCRIPTION: "Overview of all Call Logs.",
  },
  TABLE_TITLE: "Call Log",
  COLUMNS: CALL_LOG_MASTER_COLUMNS,
  COLUMN_SORTINGS: CALL_LOG_MASTER_COLUMNS_SORTINGS,
  ADD_ACCESS: [SYSTEM_ROLES.SUPER_ADMIN],
};

////////////
// -------------- ALL-MASTER-DETAILS--------------
export const ALL_MASTER_DETAILS = {
  USER: USER_DETAILS,
  ORGANIZATION: ORGANIZATION_DETAILS,
  FILE: FILE_DETAILS,
  CHAT_DELETE: CHAT_DELETE_DETAILS,
  ADMIN: ADMIN_DETAILS,
  GROUP: GROUP_DETAILS,
  CALL_LOG: CALL_LOG_DETAILS,
};

export const ALL_MASTER_NAMES = {
  USER: "USER",
  ORGANIZATION: "ORGANIZATION",
  FILE: "FILE",
  CHAT_DELETE: "CHAT_DELETE",
  ADMIN: "ADMIN",
  GROUP: "GROUP",
  CALL_LOG: "CALL_LOG",
};

export const HEADING_PATH = {
  [DASHBOARD_BASEURL]: ["Dashboard"],
  [BROADCAST_BASEURL]: ["Broadcast"],
  [USER_MASTER_BASEURL]: ["Administrator", "Users"],
  [ORGANIZATION_MASTER_BASEURL]: ["Administrator", "Organizations"],
  [ADMIN_MASTER_BASEURL]: ["Administrator", "Admins"],
  [FILE_MASTER_BASEURL]: ["App Setting", "Allowed File Extension"],
  [CHAT_DELETE_MASTER_BASEURL]: ["App Setting", "Chat Deletes"],
  [GROUP_MASTER_BASEURL]: ["Administrator", "Groups"],
  [CALL_LOG_MASTER_BASEURL]: ["Administrator", "Call Logs"],
};

export const RECORD_STATUS = {
  ACTIVE: "Active",
  IN_ACTIVE: "Deleted",
};

export const DEFAULTS = {
  IS_FETCH_ACTIVE: true,
  IS_SIDEBAR_OPEN: false,
};

export const VISIBLE_PAGES = 3;

export const GENERAL_YES_NO = [
  {
    ID: 1,
    Text: "Yes",
  },
  {
    ID: 0,
    Text: "No",
  },
];

export const INPUT_FIELDS_CONFIGS = {
  NAME: {
    label: "Username",
    name: "name",
    type: "text",
    validation: {
      required: "Please enter your name",
      maxLength: {
        value: 100,
        message: "Name cannot exceed 100 characters",
      },
    },
  },
  ORGANIZATION_NAME: {
    label: "Organization Name",
    name: "name",
    type: "text",
    validation: {
      required: "Please enter organization name",
      maxLength: {
        value: 100,
        message: "Organization name cannot exceed 100 characters",
      },
    },
  },
  EMAIL: {
    label: "Email",
    name: "email",
    type: "email",
    validation: {
      required: "Please enter your email address",
    },
  },
  USERNAME: {
    label: "Username",
    name: "userName",
    type: "text",
    validation: {
      required: "Please enter your UserName",
      maxLength: {
        value: 100,
        message: "UserName cannot exceed 100 characters",
      },
    },
  },
  FILENAME: {
    label: "File Extension Name",
    name: "fileName",
    type: "text",
    validation: {
      required: "Please enter File Extension",
      maxLength: {
        value: 100,
        message: "File Name cannot exceed 100 characters",
      },
    },
  },

  PASSWORD: {
    label: "Password",
    type: "password",
    name: "password",
    validation: {
      required: "Please enter your password",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
      maxLength: {
        value: 10,
        message: "Password cannot exceed 10 characters",
      },
    },
  },

  CONFIRM_PASSWORD: {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    validation: {
      required: "Please confirm your password",
      minLength: {
        value: 6,
        message: "Confirm Password must be at least 6 characters long",
      },
      maxLength: {
        value: 10,
        message: "Confirm Password cannot exceed 10 characters",
      },
    },
  },

  PHONE_NO: {
    label: "Phone Number",
    type: "tel",
    name: "phoneNo",
    validation: {
      required: "Please enter your phone number",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Phone number must be exactly 10 digits",
      },
    },
  },
  ORGANIZATION: {
    label: "Organization",
    type: "text",
    name: "organization",
    idKey: "OrganizationID",
    value: "Name",
    validation: {
      required: "Please select organization",
    },
  },
  VIEW_ORGANIZATION: {
    label: "Organization Name",
    type: "text",
    name: "OrganizationName",
    value: "Name",
  },
  IS_ACTIVE: {
    label: "Is Active",
    type: "radio",
    name: "IsActive",
    value: "IsActive",
    options: [
      { label: "Yes", value: "1" }, // Must match backend: 1
      { label: "No", value: "0" },
    ],
    validation: {
      required: "Please select status",
    },
  },
  IS_SUPERADMIN: {
    label: "Is SuperAdmin",
    type: "radio",
    name: "IsSuperAdmin",
    value: "IsSuperAdmin",
    options: [
      { label: "Yes", value: "1" }, // Must match backend: 1
      { label: "No", value: "0" },
    ],
    validation: {
      required: "Please select admin status",
    },
  },
  MESSAGE: {
    label: "Message",
    name: "message",
    type: "textarea",
    placeholder: "Type message here",
  },
  USER: {
    label: "User",
    type: "text",
    name: "user",
    idKey: "UserID",
    value: "Name",
    validation: {
      required: "Please select user",
    },
  },
  UPLOAD_IMAGE: {
    label: "Image",
    type: "file",
    name: "Image", // Important: backend multer should expect this key
    validation: {
      required: "Please upload a profile image",
    },
  },
  DAYS: {
    label: "Days",
    type: "number",
    name: "Days",
    validation: {
      max: {
        value: 365,
        message: "Days cannot exceed 365",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter a valid number",
      },
    },
  },
  GROUP_DROPDOWN: {
    label: "Group",
    type: "text",
    name: "group",
    idKey: "GroupID",
    value: "Name",
    validation: {
      required: "Please select group",
    },
  },
  GROUP_NAME: {
    label: "Group Name",
    type: "text",
    name: "groupName",
    idKey: "GroupID",
    value: "Name",
    validation: {
      required: "Please enter group name",
    },
  }
};

export const REQUEST_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const LOG_FORMAT = {
  Pending:
    "<strong>_SENDER_</strong> has sent a connection request to <strong>_RECEIVER_</strong>. Awaiting response.",
  Accepted:
    "<strong>_SENDER_</strong> accepted connection request from <strong>_RECEIVER_</strong>.",
  Rejected:
    "<strong>_SENDER_</strong> rejected connection request from <strong>_RECEIVER_</strong>.",
};
