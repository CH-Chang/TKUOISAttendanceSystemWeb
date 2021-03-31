import { fromJS } from "immutable";
import { actionTypes } from "./index";

const defaultState = fromJS({
  isMenuShow: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MENU:
      return state.set("isMenuShow", action.value);
    default:
      return state;
  }
};
