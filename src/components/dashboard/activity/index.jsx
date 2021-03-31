import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Wrapper,
  TitleBox,
  Title,
  ActivityBox,
  ActivityItemBox,
  ActivityItemTitle,
  ActivityItemStatus,
} from "./style";
import { actionCreators } from "../../../store/dashboard/index";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activities } = this.props;
    return (
      <Wrapper>
        <TitleBox>
          <Title>登入紀錄</Title>
        </TitleBox>
        <ActivityBox>
          {activities.map((elem) => {
            return (
              <ActivityItemBox>
                <ActivityItemTitle>{elem.time}</ActivityItemTitle>
                <ActivityItemStatus
                  className={`${elem.status === "成功" ? "success" : "fail"}`}
                >{`${elem.ip} ${elem.status}`}</ActivityItemStatus>
              </ActivityItemBox>
            );
          })}
        </ActivityBox>
      </Wrapper>
    );
  }

  componentDidMount() {
    const { getTop5Activities, activities } = this.props;

    if (activities.length === 0) {
      getTop5Activities();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.getIn(["Dashboard", "activities"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTop5Activities() {
      return dispatch(actionCreators.getTop5Activities());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
