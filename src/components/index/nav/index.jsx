import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import {
  NavWrapper,
  LeftWrapper,
  RightWrapper,
  Logo,
  LoginBtn,
  ApplyBtn,
  Slogan,
} from "./style";

const Index = (props) => {
  const { isLogin } = props;
  return (
    <NavWrapper>
      <LeftWrapper>
        <Logo />
      </LeftWrapper>
      <RightWrapper>
        <LoginBtn to={isLogin === true ? "/dashboard" : "/login"}>
          <FontAwesomeIcon icon={fas.faSignInAlt} size="1x" />
          {isLogin === true ? "進入系統" : "登入系統"}
        </LoginBtn>

        <ApplyBtn to="/recruit">
          <FontAwesomeIcon icon={fas.faUserPlus} size="1x" />
          加入我們
        </ApplyBtn>

        <Slogan>- 創造最吸引人的大學資訊化校園 -</Slogan>
      </RightWrapper>
    </NavWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.getIn(["User", "isLogin"]),
  };
};

export default connect(mapStateToProps)(Index);
