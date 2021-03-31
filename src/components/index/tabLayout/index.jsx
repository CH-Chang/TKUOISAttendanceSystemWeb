import React, { Fragment } from "react";

import { Tab, TabItem } from "./style";

import PostsTab from "../postsTab/index";
import StatusTab from "../statusTab/index";

const TabLayout = () => {
  return (
    <Fragment>
      <Tab tabPosition="top">
        <TabItem tab="最新消息" key="posts">
          <PostsTab />
        </TabItem>
        <TabItem tab="實習狀況" key="status">
          <StatusTab />
        </TabItem>
      </Tab>
    </Fragment>
  );
};

export default TabLayout;
