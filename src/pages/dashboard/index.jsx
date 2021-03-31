import React, { Component, Fragment } from "react";

import Header from "../../components/common/header/index";
import Footer from "../../components/common/footer/index";
import { Content, Wrapper, Left, Right } from "./style";

import News from "../../components/dashboard/news/index";
import Attendance from "../../components/dashboard/attendance/index";
import Activity from "../../components/dashboard/activity/index";
import My from "../../components/dashboard/my/index";
import Carousel from "../../components/dashboard/carousel/index";
import Cover from "../../components/dashboard/cover/index";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <Header history={this.props.history} />
        <Content>
          <Wrapper gutter={48}>
            <Left span={8}>
              <News />
              <Attendance />
              <Activity />
            </Left>
            <Right span={16}>
              <My />
              <Carousel />
              <Cover />
            </Right>
          </Wrapper>
        </Content>
        <Footer />
      </Fragment>
    );
  }
}

export default Index;
