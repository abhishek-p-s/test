import {
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
} from "../constants/Constant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return { user: action.payload };

    case LOGIN_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
