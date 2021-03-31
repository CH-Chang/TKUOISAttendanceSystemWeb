import React, { Component } from "react";
import { connect } from "react-redux";

import { actionCreators } from "../../../store/index/index";

import { StatusWrapper, ProgressCircle } from "./style";

class StatusTab extends Component {
  render() {
    const { status } = this.props;
    return (
      <StatusWrapper>
        {status.map((elem, index) => {
          return (
            <ProgressCircle
              key={elem.room}
              type="circle"
              percent={
                elem.total === 0 ? 0 : (elem.available / elem.total) * 100
              }
              width={90}
              format={() => {
                if (elem.total !== 0) {
                  return (
                    <p>
                      {elem.room}
                      <br />
                      <span>{`${elem.available}/${elem.total}`}</span>
                    </p>
                  );
                } else {
                  return (
                    <p>
                      {elem.room}
                      <br />
                      <span>未開放</span>
                    </p>
                  );
                }
              }}
            />
          );
        })}
      </StatusWrapper>
    );
  }

  componentDidMount() {
    const { status, getPracticeStatus } = this.props;

    getPracticeStatus(status);
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.getIn(["Index", "status"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPracticeStatus(status) {
      if (status.length === 0) dispatch(actionCreators.getPracticeStatus());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusTab);
