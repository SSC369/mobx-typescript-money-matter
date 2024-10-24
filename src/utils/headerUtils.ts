import { X_HASURA_ADMIN_SECRET, X_HASURA_ROLE } from "../constants";

export const TRANSACTION_HEADERS = (userId) => {
  return {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET,
    "x-hasura-role": X_HASURA_ROLE,
    "x-hasura-user-id": userId,
  };
};
