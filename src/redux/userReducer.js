import { USER } from "./types";

const initialState = {
  loading: false,
  user: null,
  users: [],
  errors: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER.GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USER.GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case USER.SET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USER.ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
        loading: false
      };
    case USER.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== payload.id),
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};
