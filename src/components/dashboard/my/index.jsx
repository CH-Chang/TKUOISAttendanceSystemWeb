import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import {
  Wrapper,
  Top,
  Bottom,
  TitleBox,
  Title,
  LinkBox,
  EditLink,
  InfoBox,
  Info,
  WorkBox,
  WorkProgress,
  WorkDetail,
  WorkDetailTitle,
  WorkDetailMoney,
} from "./style";
import { actionCreators } from "../../../store/dashboard/index";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, work } = this.props;
    return (
      <Wrapper>
        <Top>
          <TitleBox>
            <Title>
              歡迎回來，
              <span>
                {user.staffNum} {user.name}
              </span>
            </Title>
          </TitleBox>
          <LinkBox>
            <EditLink>
              <FontAwesomeIcon icon={fas.faBars}></FontAwesomeIcon>
            </EditLink>
          </LinkBox>
        </Top>
        <Bottom>
          <InfoBox>
            <Info>學院：{user.college}</Info>
            <Info>系級：{user.department}</Info>
            <Info>性別：{user.sex}</Info>
            <Info>郵件：{user.email}</Info>
          </InfoBox>
          <WorkBox>
            <WorkProgress
              type="circle"
              width={100}
              percent={
                work.general.required === 0
                  ? 0
                  : (work.general.executed / work.general.required) * 100
              }
              format={() => {
                return (
                  <p>
                    本月時數
                    <br />
                    {work.general.executed}/{work.general.required}
                  </p>
                );
              }}
            />
            <WorkProgress
              type="circle"
              width={100}
              percent={
                work.cover.required === 0
                  ? 0
                  : (work.cover.executed / work.cover.required) * 100
              }
              format={() => {
                return (
                  <p>
                    代班時數
                    <br />
                    {work.cover.executed}/{work.cover.required}
                  </p>
                );
              }}
            />
            <WorkDetail>
              <WorkDetailTitle>累積金額</WorkDetailTitle>
              <WorkDetailMoney>NTD {work.money} 元</WorkDetailMoney>
            </WorkDetail>
          </WorkBox>
        </Bottom>
      </Wrapper>
    );
  }

  componentDidMount() {
    const { getUserDetail, getUserWork, user, work } = this.props;

    if (user.isFinished === false) getUserDetail();
    if (work.isFinished === false) getUserWork();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getIn(["Dashboard", "user"]).toJS(),
    work: state.getIn(["Dashboard", "work"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail() {
      return dispatch(actionCreators.getUserDetail());
    },
    getUserWork() {
      return dispatch(actionCreators.getUserWork());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
