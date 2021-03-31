import { fromJS } from "immutable";

import { actionTypes } from "./index";
import { apiGetTop5Posts } from "../../apis/post";
import { apiGetTop5Attendances } from "../../apis/attendance";
import { apiGetTop5Activities } from "../../apis/activity";
import { apiGetUserDetail } from "../../apis/member";
import {
  apiGetMonthCoverTimes,
  apiGetMonthGeneralTimes,
  apiGetMonthAccumMoney,
} from "../../apis/statistics";

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

export const getTop5Attendances = () => {
  return (dispatch) => {
    apiGetTop5Attendances()
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getTop5AttendancesAction(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTop5Activities = () => {
  return (dispatch) => {
    apiGetTop5Activities()
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getTop5ActivitiesAction(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUserDetail = () => {
  return (dispatch) => {
    apiGetUserDetail()
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getUserDetailAction(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUserWork = () => {
  return async (dispatch) => {
    let work = {
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
    };

    let res;
    res = await apiGetMonthGeneralTimes();
    if (res.status === 200 && res.data.code === 0) {
      work.general.required = res.data.data.required;
      work.general.executed = res.data.data.executed;
    }
    console.log(res.data.data);

    res = await apiGetMonthCoverTimes();
    if (res.status === 200 && res.data.code === 0) {
      work.cover.required = res.data.data.required;
      work.cover.executed = res.data.data.executed;
    }

    res = await apiGetMonthAccumMoney();
    if (res.status === 200 && res.data.code === 0) {
      work.money = res.data.data.money;
    }

    work.isFinished = true;

    console.log(getUserWorkAction(work));

    return dispatch(getUserWorkAction(work));
  };
};

const getTop5PostsAction = (value) => {
  return {
    type: actionTypes.GET_TOP5_POSTS,
    value: fromJS(value),
  };
};

const getTop5AttendancesAction = (value) => {
  return {
    type: actionTypes.GET_TOP5_ATTENDANCES,
    value: fromJS(value),
  };
};

const getTop5ActivitiesAction = (value) => {
  return {
    type: actionTypes.GET_TOP5_ACTIVITIES,
    value: fromJS(value),
  };
};

const getUserDetailAction = (value) => {
  return {
    type: actionTypes.GET_USER_DETAIL,
    value: fromJS({
      isFinished: true,
      staffNum: value.staffNum,
      name: value.name,
      college: value.college,
      department: value.department,
      sex: value.sex,
      email: value.email,
    }),
  };
};

const getUserWorkAction = (value) => {
  return {
    type: actionTypes.GET_USER_WORK,
    value: fromJS(value),
  };
};
