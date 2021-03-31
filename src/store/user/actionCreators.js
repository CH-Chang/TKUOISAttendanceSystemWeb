import { actionTypes } from "./index";
import { apiGetUser, apiLogin, apiLogout } from "../../apis/member";

export const login = (account, password) => {
  return async (dispatch) => {
    const res = await apiLogin({ account, password });
    if (res.status === 200 && res.data.code === 0) {
      dispatch(
        getLoginAction({
          isLogin: true,
          token: res.data.token,
          user: res.data.user,
          err: "",
        })
      );
    } else {
      dispatch(
        getLoginAction({
          isLogin: false,
          token: "",
          user: { account: "", name: "", role: "" },
          err: res.data.msg,
        })
      );
    }

    return Promise.resolve();
  };
};

export const logout = () => {
  return async (dispatch) => {
    const res = await apiLogout();
    if (res.status === 200 && res.data.code === 0) {
      dispatch(getLogoutAction());
    }
    return Promise.resolve();
  };
};

const getLoginAction = (value) => {
  return {
    type: actionTypes.LOGIN,
    value: {
      isLogin: value.isLogin,
      token: value.token,
      user: value.user,
      err: value.err,
    },
  };
};

const getLogoutAction = () => {
  return {
    type: actionTypes.LOGOUT,
    value: {
      isLogin: false,
      token: "",
      user: { account: "", name: "", role: "" },
      err: "",
    },
  };
};
