import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Wrapper, Table, Action, ActionLink } from "./style";
import { actionCreators } from "../../../store/check/index";

class Index extends Component {
  constructor(props) {
    super(props);

    this.getAction = this.getAction.bind(this);
    this.actionEditClick = this.actionEditClick.bind(this);
  }

  render() {
    const { checkRecordTable } = this.props;
    return (
      <Wrapper>
        <Table
          columns={[
            { title: "日期", dataIndex: "date", key: "date", align: "center" },
            { title: "星期", dataIndex: "week", key: "week", align: "center" },
            {
              title: "班別",
              dataIndex: "shift",
              key: "shift",
              align: "center",
              render: (shift) => {
                return `${shift.name}`;
              },
            },
            {
              title: "工讀生",
              dataIndex: "staff",
              key: "staff",
              align: "center",
              render: (staff) => {
                return `${staff.staffNum} ${staff.name}`;
              },
            },
            {
              title: "簽到",
              dataIndex: "checkin",
              key: "checkin",
              align: "center",
              editable: true,
              render: (checkin) => {
                if (checkin) return `${checkin}`;
                return `無簽到紀錄`;
              },
            },
            {
              title: "簽退",
              dataIndex: "checkout",
              key: "checkout",
              align: "center",
              editable: true,
              render: (checkout) => {
                if (checkout) return `${checkout}`;
                return `無簽退紀錄`;
              },
            },
            {
              title: "狀態",
              dataIndex: "status",
              key: "status",
              align: "center",
            },
            {
              title: "操作",
              key: "action",
              dataIndex: "coverPostId",
              align: "center",
              render: (coverPostId, record) =>
                this.getAction(coverPostId, record),
            },
          ].map((col) => {
            if (col.editable === false) {
              return col;
            }

            return {
              ...col,
              onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
              }),
            };
          })}
          dataSource={checkRecordTable}
        />
      </Wrapper>
    );
  }

  getAction(coverPostId, record) {
    const { role, currentEditingId } = this.props;
    if (role === 3) {
      if (coverPostId) {
        return <ActionLink>代班</ActionLink>;
      }
    } else {
      if (coverPostId) {
        return (
          <Fragment>
            {currentEditingId === record.id ? (
              <Action
                onClick={() => {
                  this.actionEditFinishClick(record);
                }}
              >
                儲存
              </Action>
            ) : (
              <Action
                onClick={() => {
                  this.actionEditClick(record);
                }}
              >
                修改
              </Action>
            )}
            <Action>刪除</Action>
            <ActionLink>代班</ActionLink>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            {currentEditingId === record.id ? (
              <Action
                onClick={() => {
                  this.actionEditFinishClick(record);
                }}
              >
                儲存
              </Action>
            ) : (
              <Action
                onClick={() => {
                  this.actionEditClick(record);
                }}
              >
                修改
              </Action>
            )}
            <Action>刪除</Action>
          </Fragment>
        );
      }
    }
  }

  actionEditClick(record) {
    console.log(record);
  }

  actionEditFinishClick(record) {
    console.log(record);
  }
}

const mapStateToProps = (state) => {
  return {
    checkRecordTable: state.getIn(["Check", "checkRecordTable"]).toJS(),
    role: state.getIn(["User", "role"]),
    currentEditingId: state.getIn(["User", "currentEditingId"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentEditingId(id) {
      dispatch(actionCreators.getChangeCurrentEditingIdAction(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
