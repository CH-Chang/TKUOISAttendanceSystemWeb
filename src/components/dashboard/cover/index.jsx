import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import {
  Wrapper,
  TitleBox,
  Title,
  CoverBox,
  CoverItemBox,
  CoverItemIcon,
  CoverItemDetails,
  CoverItemDetail,
  CoverItemLinks,
  CoverItemApplyLink,
} from "./style";

class Index extends Component {
  render() {
    const { covers } = this.props;
    return (
      <Wrapper>
        <TitleBox>
          <Title>最新代班</Title>
        </TitleBox>
        <CoverBox>
          {covers.map((elem) => {
            return (
              <CoverItemBox>
                <CoverItemIcon>
                  <FontAwesomeIcon icon={fas.faUserCircle} />
                </CoverItemIcon>
                <CoverItemDetails>
                  <CoverItemDetail>代班發起：000 某個人</CoverItemDetail>
                  <CoverItemDetail>
                    代班時間：2020/07/28 週二 晚上班
                  </CoverItemDetail>
                  <CoverItemDetail>代班薪資：每小時新台幣158元</CoverItemDetail>
                </CoverItemDetails>
                <CoverItemLinks>
                  <CoverItemApplyLink>我要代班</CoverItemApplyLink>
                </CoverItemLinks>
              </CoverItemBox>
            );
          })}
        </CoverBox>
      </Wrapper>
    );
  }

  componentDidMount() {
    const { getTop5Covers, covers } = this.props;

    if (covers.length === 0) getTop5Covers();
  }
}

const mapStateToProps = (state) => {
  return {
    covers: state.getIn(["Dashboard", "covers"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTop5Covers() {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
