import { fromJS } from "immutable";

import { actionTypes } from "./index";

import { apiGetCheckRecordForm } from "../../apis/form";
import { apiGetConditionalAttendances } from "../../apis/attendance";

export const getCheckRecordForm = () => {
  return async (dispatch) => {
    let res;
    res = await apiGetCheckRecordForm();
    if (res.status === 200 && res.data.code === 0) {
      return dispatch(
        getCheckRecordFormAction({
          isFinished: true,
          staffNums: res.data.data.staffNums,
          shifts: res.data.data.shifts,
          status: res.data.data.status,
        })
      );
    }
  };
};

export const getConditionalAttendances = (params) => {
  return async (dispatch) => {
    let res;
    res = await apiGetConditionalAttendances(params);

    if (res.status === 200 && res.data.code === 0) {
      return dispatch(getConditionAttendancesAction(res.data.data));
    }
  };
};

export const getSwitchSubmitLoadingAction = (value) => {
  return {
    type: actionTypes.SWITCH_SUBMIT_LOADING,
    value: value,
  };
};

export const getSwitchExportLoadingAction = (value) => {
  return {
    type: actionTypes.SWITCH_EXPORT_LOADING,
    value: value,
  };
};

export const getChangeCurrentEditingIdAction = (value) => {
  return {
    type: actionTypes.CHANGE_CURRENT_EDITING_ID,
    value: value,
  };
};

const getCheckRecordFormAction = (value) => {
  return {
    type: actionTypes.GET_CHECK_RECORD_FORM,
    value: fromJS(value),
  };
};

const getConditionAttendancesAction = (value) => {
  return {
    type: actionTypes.GET_CONDITIONAL_ATTENDANCES,
    value: fromJS(value),
  };
};
