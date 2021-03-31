import React, { Fragment } from "react";

import Header from "../../components/common/header/index";
import Footer from "../../components/common/footer/index";
import { Content } from "./style";

const Index = (props) => {
  return (
    <Fragment>
      <Header history={props.history} />
      <Content>{getForm(props)}</Content>
      <Footer />
    </Fragment>
  );
};

const getForm = (props) => {
  const type = new URLSearchParams(props.location.search).get("type");
  if (type === "security") {
    return getSecurityForm();
  } else if (type === "fixer") {
    return getFixerForm();
  } else {
    return null;
  }
};

const getSecurityForm = () => {
  return <div>1</div>;
};

const getFixerForm = () => {
  return <div>2</div>;
};

export default Index;
