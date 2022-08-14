import { USER } from "./types";

export const AddUser = (user) => {
  return {
    type: USER.ADD_USER,
    payload: user
  };
};
export const RemoveUser = (user) => {
  return {
    type: USER.REMOVE_USER,
    payload: user
  };
};
