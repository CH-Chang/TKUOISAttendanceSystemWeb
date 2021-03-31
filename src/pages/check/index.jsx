import React, { Component, Fragment } from "react";

import Header from "../../components/common/header/index";
import Footer from "../../components/common/footer/index";
import { Content, HeadlineBox, HeadlineTW, HeadlineEN, Text } from "./style";

import Operation from "../../components/check/operation/index";
import Record from "../../components/check/record/index";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <Header history={this.props.history} />
        <Content>
          <HeadlineBox>
            <HeadlineTW>打卡紀錄</HeadlineTW>
            <HeadlineEN>check record</HeadlineEN>
          </HeadlineBox>
          <Text>
            <Operation />
            <Record />
          </Text>
        </Content>
        <Footer />
      </Fragment>
    );
  }
}

export default Index;
