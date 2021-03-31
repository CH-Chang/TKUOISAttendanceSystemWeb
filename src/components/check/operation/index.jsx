import React, { Component } from "react";
import { connect } from "react-redux";
import XLSX from "xlsx";
import FileSaver from "file-saver";

import {
  Wrapper,
  OperationBox,
  CheckRecordFormBox,
  QuickLinkBox,
  BoxTitleBox,
  BoxTitle,
  BoxContentBox,
  CheckRecordForm,
  CheckRecordFormItem,
  Select,
  Option,
  RangePicker,
  Submit,
  QuickLink,
  Export,
} from "./style";
import { actionCreators } from "../../../store/check/index";
import { RSAEncrypt } from "../../../utils/RSAHelper";
import { apiExportConditionalAttendances } from "../../../apis/attendance";

class Index extends Component {
  checkRecordFormRef = React.createRef();

  constructor(props) {
    super(props);

    this.submitCheckRecordFormClick = this.submitCheckRecordFormClick.bind(
      this
    );
    this.exportCheckRecordFormClick = this.exportCheckRecordFormClick.bind(
      this
    );
    this.generateCheckRecordExcel = this.generateCheckRecordExcel.bind(this);
  }

  render() {
    const { checkRecordForm, submitLoading, exportLoading } = this.props;
    return (
      <Wrapper>
        <OperationBox gutter={32}>
          <CheckRecordFormBox span={14}>
            <BoxTitleBox>
              <BoxTitle>查詢表單</BoxTitle>
            </BoxTitleBox>
            <BoxContentBox>
              <CheckRecordForm
                ref={this.checkRecordFormRef}
                layout="horizontal"
              >
                <CheckRecordFormItem
                  label="工讀編號"
                  name="staffNums"
                  validateTrigger="onBlur"
                  validateFirst={true}
                  rules={[
                    {
                      required: true,
                      message: "請選擇工讀編號",
                    },
                  ]}
                >
                  <Select placeholder="請選擇工讀編號" mode="multiple">
                    {checkRecordForm.staffNums.map((elem) => {
                      return (
                        <Option
                          value={elem.staffNum}
                        >{`${elem.staffNum} ${elem.name}`}</Option>
                      );
                    })}
                  </Select>
                </CheckRecordFormItem>
                <CheckRecordFormItem
                  label="查詢區間"
                  name="times"
                  validateTrigger="onBlur"
                  validateFirst={true}
                  rules={[
                    {
                      required: true,
                      message: "請指定查詢區間",
                    },
                  ]}
                >
                  <RangePicker format="YYYY-MM-DD" />
                </CheckRecordFormItem>
                <CheckRecordFormItem
                  label="查詢班別"
                  name="shifts"
                  validateTrigger="onBlur"
                  validateFirst={true}
                  rules={[
                    {
                      required: true,
                      message: "請選擇查詢班別",
                    },
                  ]}
                >
                  <Select placeholder="請選擇查詢班別" mode="multiple">
                    {checkRecordForm.shifts.map((elem) => {
                      return (
                        <Option
                          value={elem.id}
                        >{`${elem.name} ${elem.start}~${elem.end}`}</Option>
                      );
                    })}
                  </Select>
                </CheckRecordFormItem>
                <CheckRecordFormItem
                  label="紀錄狀態"
                  name="status"
                  validateTrigger="onBlur"
                  validateFirst={true}
                  rules={[
                    {
                      required: true,
                      message: "請選擇記錄狀態",
                    },
                  ]}
                >
                  <Select placeholder="請選擇記錄狀態" mode="multiple">
                    {checkRecordForm.status.map((elem) => {
                      return <Option value={elem.id}>{elem.name}</Option>;
                    })}
                  </Select>
                </CheckRecordFormItem>
                <CheckRecordFormItem className="formRight">
                  <Submit
                    shape="round"
                    htmlType="button"
                    size="middle"
                    loading={submitLoading}
                    onClick={this.submitCheckRecordFormClick}
                  >
                    紀錄查詢
                  </Submit>
                  <Export
                    shape="round"
                    htmlType="button"
                    size="middle"
                    loading={exportLoading}
                    onClick={this.exportCheckRecordFormClick}
                  >
                    匯出紀錄
                  </Export>
                </CheckRecordFormItem>
              </CheckRecordForm>
            </BoxContentBox>
          </CheckRecordFormBox>
          <QuickLinkBox span={10}>
            <BoxTitleBox>
              <BoxTitle>快速查詢</BoxTitle>
            </BoxTitleBox>
            <BoxContentBox>
              <QuickLink>查詢本日記錄</QuickLink>
              <QuickLink>查詢本周記錄</QuickLink>
              <QuickLink>查詢本月記錄</QuickLink>
              <QuickLink>匯出本月紀錄</QuickLink>
              <QuickLink>匯出上月紀錄</QuickLink>
            </BoxContentBox>
          </QuickLinkBox>
        </OperationBox>
      </Wrapper>
    );
  }

  componentDidMount() {
    const { checkRecordForm, getCheckRecordForm } = this.props;

    if (checkRecordForm.isFinished === false) getCheckRecordForm();
  }

  submitCheckRecordFormClick() {
    const { getConditionalAttendances, switchSubmitLoading } = this.props;

    switchSubmitLoading(true);

    this.checkRecordFormRef.current
      .validateFields()
      .then((values) => {
        let params = {
          staffNums: RSAEncrypt(values.staffNums.toString()),
          times: RSAEncrypt(
            [
              values.times[0].format("YYYY-MM-DD"),
              values.times[1].format("YYYY-MM-DD"),
            ].toString()
          ),
          shifts: RSAEncrypt(values.shifts.toString()),
          status: RSAEncrypt(values.status.toString()),
        };

        getConditionalAttendances(params)
          .then(() => {
            switchSubmitLoading(false);
          })
          .catch((err) => {
            switchSubmitLoading(false);
          });
      })
      .catch((err) => {
        switchSubmitLoading(false);
      });
  }

  exportCheckRecordFormClick() {
    const { switchExportLoading } = this.props;
    const self = this;

    switchExportLoading(true);

    this.checkRecordFormRef.current
      .validateFields()
      .then((values) => {
        let params = {
          staffNums: RSAEncrypt(values.staffNums.toString()),
          times: RSAEncrypt(
            [
              values.times[0].format("YYYY-MM-DD"),
              values.times[1].format("YYYY-MM-DD"),
            ].toString()
          ),
          shifts: RSAEncrypt(values.shifts.toString()),
          status: RSAEncrypt(values.status.toString()),
        };

        apiExportConditionalAttendances(params)
          .then((res) => {
            if (res.status === 200 && res.data.code === 0) {
              self.generateCheckRecordExcel(res.data.data);
            }
            switchExportLoading(false);
          })
          .catch((err) => {
            switchExportLoading(false);
          });
      })
      .catch((err) => {
        switchExportLoading(false);
      });
  }

  generateCheckRecordExcel(data) {
    let wb = XLSX.utils.book_new();
    let wsStatistics = XLSX.utils.aoa_to_sheet([
      [
        "工讀生編號",
        "工讀生姓名",
        "要求時數",
        "完成時數",
        "準時",
        "遲到",
        "早退",
        "遲到早退",
        "曠班",
        "未簽退",
        "執行中",
        "未執行",
        "時薪",
        "薪資",
      ],
    ]);
    let wsAttendances = XLSX.utils.aoa_to_sheet([
      [
        "日期",
        "班別",
        "工讀生",
        "簽到時間",
        "簽到備註",
        "簽退時間",
        "簽退備註",
        "狀況",
      ],
    ]);
    let wsCovers = XLSX.utils.aoa_to_sheet([
      ["申請人", "代班人", "同意人", "代班日期", "代班班別"],
    ]);

    data.statistics.forEach((elem) => {
      XLSX.utils.sheet_add_aoa(
        wsStatistics,
        [
          [
            elem.staff.staffNum,
            elem.staff.staffName,
            elem.required,
            elem.executed,
            elem.onTime,
            elem.late,
            elem.leaveEarly,
            elem.lateAndLeaveEarly,
            elem.absent,
            elem.noCheckout,
            elem.executing,
            elem.unexecuted,
            elem.payhour,
            elem.salary,
          ],
        ],
        { origin: -1 }
      );
    });
    XLSX.utils.book_append_sheet(wb, wsStatistics, "統計資料表");

    data.attendances.forEach((elem) => {
      XLSX.utils.sheet_add_aoa(
        wsAttendances,
        [
          [
            elem.date,
            elem.shift,
            `${elem.staff.staffNum} ${elem.staff.staffName}`,
            typeof elem.checkin === "undefined" ? "無簽到記錄" : elem.checkin,
            typeof elem.checkinNote === "undefined" ? "" : elem.checkinNote,
            typeof elem.checkout === "undefined" ? "無簽退紀錄" : elem.checkout,
            typeof elem.checkoutNote === "undefined" ? "" : elem.checkoutNote,
            elem.status,
          ],
        ],
        { origin: -1 }
      );
    });
    XLSX.utils.book_append_sheet(wb, wsAttendances, "打卡紀錄表");

    data.covers.forEach((elem) => {
      XLSX.utils.sheet_add_aoa(
        wsCovers,
        [
          [
            `${elem.requester.requesterId} ${elem.requester.requesterName}`,
            `${elem.recipient.recipientId} ${elem.recipient.recipientName}`,
            `${elem.approver.approverName}`,
            elem.shift,
            elem.date,
          ],
        ],
        { origin: -1 }
      );
    });
    XLSX.utils.book_append_sheet(wb, wsCovers, "代班紀錄表");

    let s2ab = (s) => {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    };

    let tmpDown = new Blob(
      [
        s2ab(
          XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: false,
            type: "binary",
          })
        ),
      ],
      { type: "" }
    );

    FileSaver.saveAs(tmpDown, "淡江大學資訊處考勤統計.xlsx");
  }
}

const mapStateToProps = (state) => {
  return {
    checkRecordForm: state.getIn(["Check", "checkRecordForm"]).toJS(),
    submitLoading: state.getIn(["Check", "submitLoading"]),
    exportLoading: state.getIn(["Check", "exportLoading"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCheckRecordForm() {
      return dispatch(actionCreators.getCheckRecordForm());
    },
    getConditionalAttendances(params) {
      return dispatch(actionCreators.getConditionalAttendances(params));
    },
    switchSubmitLoading(value) {
      return dispatch(actionCreators.getSwitchSubmitLoadingAction(value));
    },
    switchExportLoading(value) {
      return dispatch(actionCreators.getSwitchExportLoadingAction(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
