import axios from "axios";
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from "./userActionType";

export const fetchUsersRequest = () => {
  return {
    type: USER_REQUEST,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: USER_ERROR,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest);
    axios
      .get("https://devza.com/tests/tasks/listusers", {
        headers: {
          AuthToken: "U0QPhQReDsnJmidL941N1wzNN77KPvHL",
        },
      })
      .then((res) => {
        const users = res.data.users;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};
