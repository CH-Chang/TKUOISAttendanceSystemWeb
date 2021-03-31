import React, { Component } from "react";

import {
  IndexWrapper,
  PartWrapper,
  LeftWrapper,
  RightWrapper,
  Declaration,
} from "./style";

import Tab from "../../components/index/tabLayout/index";
import Nav from "../../components/index/nav/index";

class Index extends Component {
  render() {
    return (
      <IndexWrapper>
        <PartWrapper>
          <LeftWrapper span={12}>
            <Tab />
          </LeftWrapper>
          <RightWrapper span={12}>
            <Nav />
          </RightWrapper>
        </PartWrapper>
        <Declaration>
          <p>
            本網站使用Cookies記錄與存取您的瀏覽使用訊息，若繼續使用網站，即表明您同意
            cookie 及其他類似技術的使用
          </p>
          <p>Copyrights © 2020 All Rights Reserved by CHANG CHIH HSIANG</p>
        </Declaration>
      </IndexWrapper>
    );
  }
}

export default Index;
