import { fromJS } from "immutable";

import { actionTypes } from "./index";
import { apiGetTop5Posts } from "../../apis/post";
import { apiGetPracticeStatus } from "../../apis/status";

// 向外提供請求函數
export const getTop5Posts = () => {
  return (dispatch) => {
    apiGetTop5Posts()
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getTop5PostsAction(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPracticeStatus = () => {
  return (dispatch) => {
    apiGetPracticeStatus()
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getPracticeStatusAction(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 向外產生action區

// 向內產生action區
const getTop5PostsAction = (value) => {
  return {
    type: actionTypes.GET_TOP5_POSTS,
    value: fromJS(value),
  };
};

const getPracticeStatusAction = (value) => {
  return {
    type: actionTypes.GET_PRACTICE_STATUS,
    value: fromJS(value),
  };
};
