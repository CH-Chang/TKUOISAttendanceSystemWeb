import { fromJS } from "immutable";
import { actionTypes } from "./index";

const defaultState = fromJS({
  checkRecordForm: {
    isFinished: false,
    staffNums: [],
    shifts: [],
    status: [],
  },
  checkRecordTable: [],
  submitLoading: false,
  exportLoading: false,
  currentEditingKey: "",
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHECK_RECORD_FORM:
      return state.set("checkRecordForm", action.value);
    case actionTypes.GET_CONDITIONAL_ATTENDANCES:
      return state.set("checkRecordTable", action.value);
    case actionTypes.SWITCH_SUBMIT_LOADING:
      return state.set("submitLoading", action.value);
    case actionTypes.SWITCH_EXPORT_LOADING:
      return state.set("exportLoading", action.value);
    case actionTypes.CHANGE_CURRENT_EDITING_ID:
      return state.set("currentEditingKey", action.value);
    default:
      return state;
  }
};
