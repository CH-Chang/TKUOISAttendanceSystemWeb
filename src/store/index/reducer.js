import { actionTypes } from "./index";
import { fromJS } from "immutable";

const defaultState = fromJS({
  posts: [],
  status: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP5_POSTS:
      return state.set("posts", action.value);
    case actionTypes.GET_PRACTICE_STATUS:
      return state.set("status", action.value);
    default:
      return state;
  }
};
