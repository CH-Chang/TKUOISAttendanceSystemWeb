import { fromJS } from "immutable";
import { actionTypes } from "./index";

const defaultState = fromJS({
  isLogin: false,
  account: "",
  name: "",
  role: "",
  err: "",
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      if (action.value.isLogin)
        localStorage.setItem("token", action.value.token);

      return state
        .set("isLogin", action.value.isLogin)
        .set("account", action.value.user.account)
        .set("name", action.value.user.name)
        .set("role", action.value.user.role)
        .set("err", action.value.err);

    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      return state
        .set("isLogin", action.value.isLogin)
        .set("account", action.value.user.account)
        .set("name", action.value.user.name)
        .set("role", action.value.user.role)
        .set("err", action.value.err);

    default:
      return state;
  }
};
