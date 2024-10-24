export const LOGIN_ROUTE = "/login";
export const ADMIN_LOGIN_ROUTE = "/admin/login";
export const HOME_ROUTE = "/";
export const TRANSACTION_ROUTE = "/transactions";
export const DASHBOARD_ROUTE = "/dashboard";
export const X_HASURA_ROLE = "user";
export const X_HASURA_ADMIN_SECRET =
  "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF";

export const BASE_URL = "https://bursting-gelding-24.hasura.app/api/rest";

export const API_GET_USER_ID = BASE_URL + "/get-user-id";
export const API_PROFILE_URL = BASE_URL + "/profile";
export const API_ALL_TRANSACTIONS = BASE_URL + "/all-transactions";
export const API_TOTAL_DEBIT_CREDIT_TRANSACTIONS =
  BASE_URL + "/credit-debit-totals";
export const API_ADD_TRANSACTION = BASE_URL + "/add-transaction";
export const API_DELETE_TRANSACTION = BASE_URL + "/delete-transaction?id=";
export const API_UPDATE_TRANSACTION = BASE_URL + "/update-transaction";

export const SIDEBAR_OPTIONS = {
  dashboard: "dashboard",
  transactions: "transactions",
};

export const NUMBER_OF_TRANSACTIONS = 3;
export const LOCALSTORAGE_KEY = "userData";
export const INITIAL_ACTIVE_TAB = "transactions";
export const TAB_OPTIONS = {
  transactions: "transactions",
  credit: "credit",
  debit: "debit",
};

export const LOGIN_HEADERS = {
  "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET,
};

export const CATEGORY_OPTIONS = [
  { value: "", name: "Select Category" },
  { value: "food", name: "Food" },
  { value: "shopping", name: "Shopping" },
  { value: "entertainment", name: "Entertainment" },
];

export const TRANSACTION_TYPES = [
  { value: "", name: "Select Transaction Type" },
  { value: "credit", name: "Credit" },
  { value: "debit", name: "Debit" },
];

export const TRANSACTION_TYPES_OBJECT = {
  credit: "credit",
  debit: "debit",
};

export const ACTION_TYPES = {
  delete: "delete",
  logout: "logout",
  edit: "edit",
  add: "add",
};

export const DATE_FORMAT = "DD MMM YY, hh:mm A";
export const INPUT_DATE_FORMAT = "YYYY-MM-DDThh:mm";
export const SUCCESS_OK = 200;
export const SUCCESS_CREATED = 201;
export const TRANSACTIONS_LIMIT = 100;
export const TRANSACTIONS_OFFSET = 0;
export const THEME_KEY = "theme";
export const LIGHT_MODE_KEY = "light";
export const DARK_MODE_KEY = "dark";
