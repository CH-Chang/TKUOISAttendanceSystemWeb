import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import {
  Header,
  Logo,
  Nav,
  LinkHome,
  LinkLogin,
  LinkMenu,
  Menu,
  MenuTitle,
  MenuLink,
  MenuLogout,
  MenuLinkItem,
} from "./style";
import { actionCreators as HeaderActionCreators } from "../../../store/header/index";
import { actionCreators as UserActionCreators } from "../../../store/user/index";
import logoTkuInfoCenterWhite from "../../../assets/img/logo/logoTkuInfoCenterWhite.svg";

class Index extends Component {
  constructor(props) {
    super(props);

    this.nav = this.nav.bind(this);
    this.menu = this.menu.bind(this);
    this.linkMenuMouseEnter = this.linkMenuMouseEnter.bind(this);
    this.linkMenuMouseLeave = this.linkMenuMouseLeave.bind(this);
    this.menuMouseEnter = this.menuMouseEnter.bind(this);
    this.menuMouseLeave = this.menuMouseLeave.bind(this);
    this.menuLogoutClick = this.menuLogoutClick.bind(this);
  }

  render() {
    return (
      <Header>
        <Logo src={logoTkuInfoCenterWhite} />
        {this.nav()}
      </Header>
    );
  }

  nav() {
    const { isLogin } = this.props;

    if (isLogin) {
      return (
        <Nav>
          <LinkHome to="/">
            <FontAwesomeIcon icon={fas.faHome} />
            回到首頁
          </LinkHome>
          <LinkMenu
            to="#"
            onMouseEnter={this.linkMenuMouseEnter}
            onMouseLeave={this.linkMenuMouseLeave}
          >
            <FontAwesomeIcon icon={fas.faBars} />
            功能選單
          </LinkMenu>
          {this.menu()}
        </Nav>
      );
    } else {
      return (
        <Nav>
          <LinkHome to="/">
            <FontAwesomeIcon icon={fas.faHome} />
            回到首頁
          </LinkHome>
          <LinkLogin to="/login">
            <FontAwesomeIcon icon={fas.faSignInAlt} />
            登入系統
          </LinkLogin>
        </Nav>
      );
    }
  }

  menu() {
    const { isMenuShow, name } = this.props;

    if (isMenuShow) {
      return (
        <Menu
          onMouseEnter={this.menuMouseEnter}
          onMouseLeave={this.menuMouseLeave}
        >
          <MenuTitle>
            <FontAwesomeIcon icon={fas.faUserCircle} />
            您好，<span>{name}</span>
          </MenuTitle>
          <MenuLink>
            <MenuLinkItem to="/dashboard">我的主頁</MenuLinkItem>
            <MenuLinkItem to="/check">打卡紀錄</MenuLinkItem>
            <MenuLinkItem>代班徵招</MenuLinkItem>
            <MenuLinkItem>公物租借</MenuLinkItem>
            <MenuLinkItem>公告編修</MenuLinkItem>
            <MenuLinkItem>人員編修</MenuLinkItem>
          </MenuLink>
          <MenuLogout onClick={this.menuLogoutClick}>系統登出</MenuLogout>
        </Menu>
      );
    } else {
      return null;
    }
  }

  linkMenuMouseEnter() {
    const { isMenuShow, toggleMenu } = this.props;

    if (isMenuShow === false) {
      toggleMenu(!isMenuShow);
    }
  }

  linkMenuMouseLeave() {
    const { isMenuShow, toggleMenu } = this.props;

    this.menuTimer = setTimeout(() => {
      toggleMenu(!isMenuShow);
    }, 200);
  }

  menuMouseEnter() {
    clearTimeout(this.menuTimer);
  }

  menuMouseLeave() {
    const { isMenuShow, toggleMenu } = this.props;

    toggleMenu(!isMenuShow);
  }

  menuLogoutClick() {
    const { logout, history } = this.props;

    logout().then(() => {
      history.push("/");
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.getIn(["User", "isLogin"]),
    name: state.getIn(["User", "name"]),
    isMenuShow: state.getIn(["Header", "isMenuShow"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu(value) {
      return dispatch(HeaderActionCreators.toggleMenu(value));
    },
    logout() {
      return dispatch(UserActionCreators.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
