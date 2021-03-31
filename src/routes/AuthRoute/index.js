import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Index = (props) => {
  const { component: Component, isLogin, path, ...rest } = props;
  if (isLogin) {
    if (path === "/login")
      return (
        <Route
          {...rest}
          render={() => {
            return <Redirect to="/dashboard" />;
          }}
        />
      );
    else
      return (
        <Route
          {...rest}
          render={(props) => {
            return <Component {...props} />;
          }}
        />
      );
  } else {
    if (path !== "/login")
      return (
        <Route
          {...rest}
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
      );
  }
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.getIn(["User", "isLogin"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
