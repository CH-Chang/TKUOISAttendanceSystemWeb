import { fromJS } from "immutable";
import { actionTypes } from "./index";

const defaultState = fromJS({
  posts: [],
  attendances: [],
  activities: [],
  covers: [],
  work: {
    isFinished: false,
    money: 0,
    general: {
      required: 0,
      executed: 0,
    },
    cover: {
      required: 0,
      executed: 0,
    },
  },
  user: {
    isFinished: false,
    staffNum: 0,
    name: "",
    college: "",
    department: "",
    sex: "",
    email: "",
  },
  isMyMenuShow: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP5_POSTS:
      return state.set("posts", action.value);
    case actionTypes.GET_TOP5_ATTENDANCES:
      return state.set("attendances", action.value);
    case actionTypes.GET_TOP5_ACTIVITIES:
      return state.set("activities", action.value);
    case actionTypes.GET_USER_DETAIL:
      return state.set("user", action.value);
    case actionTypes.GET_USER_WORK:
      return state.set("work", action.value);
    default:
      return state;
  }
};
