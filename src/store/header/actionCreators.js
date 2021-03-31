import { actionTypes } from "./index";

export const toggleMenu = (value) => {
  return {
    type: actionTypes.TOGGLE_MENU,
    value: value,
  };
};
