import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Wrapper,
  TitleBox,
  Title,
  AttendancesBox,
  AttendancesItemBox,
  AttendancesItemTitle,
  AttendancesItemStatus,
} from "./style";
import {} from "../../../store/dashboard/actionCreators";
import { actionCreators } from "../../../store/dashboard";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { role, attendances } = this.props;
    if (role === 3) {
      return (
        <Wrapper>
          <TitleBox>
            <Title>近期打卡</Title>
          </TitleBox>
          <AttendancesBox>
            {attendances.map((elem) => {
              return (
                <AttendancesItemBox>
                  <AttendancesItemTitle>{`${elem.date} ${elem.weekday} ${elem.shift}`}</AttendancesItemTitle>
                  <AttendancesItemStatus
                    className={`${elem.status === "準時" ? "ontime" : ""} ${
                      elem.status === "未執行" ? "unexecuted" : ""
                    }`}
                  >
                    {elem.status}
                  </AttendancesItemStatus>
                </AttendancesItemBox>
              );
            })}
          </AttendancesBox>
        </Wrapper>
      );
    }

    return null;
  }

  componentDidMount() {
    const { role, getTop5Attendances, attendances } = this.props;

    if (role === 3 && attendances.length === 0) {
      getTop5Attendances();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.getIn(["User", "role"]),
    attendances: state.getIn(["Dashboard", "attendances"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTop5Attendances() {
      return dispatch(actionCreators.getTop5Attendances());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
