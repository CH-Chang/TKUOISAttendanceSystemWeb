// 引入原始庫
import React, { Fragment, Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import zh_TW from "antd/lib/locale-provider/zh_TW";

// 引入原始庫CSS
import "antd/dist/antd.css";

// 引入自寫Style
import { ResetStyle, GlobalStyle, AntdThemeStyle } from "./style";

// 引入自寫組件
import Index from "./pages/index/index";
import Post from "./pages/post/index";
import Recruit from "./pages/recruit/index";
import Apply from "./pages/apply/index";
import Login from "./pages/login/index";
import Dashboard from "./pages/dashboard/index";
import Check from "./pages/check/index";

import { apiGetUser } from "./apis/member";
import { actionCreators } from "./store/user/index";

// 引入自定義路由攔截
import AuthRoute from "./routes/AuthRoute/index";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <ConfigProvider locale={zh_TW}>
          <ResetStyle />
          <GlobalStyle />
          <AntdThemeStyle />

          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/post" exact component={Post} />
              <Route path="/recruit" exact component={Recruit} />
              <Route path="/apply" exact component={Apply} />
              <Route path="/login" exact component={Login} />
              <AuthRoute path="/dashboard" exact component={Dashboard} />
              <AuthRoute path="/check" exact component={Check} />
              <Redirect to="/" />
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    async persistLogin() {
      const res = await apiGetUser();
      dispatch(actionCreators.persistLogin(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
