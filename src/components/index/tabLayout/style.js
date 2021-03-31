import styled from "styled-components";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export const Tab = styled(Tabs)`
  width: 60%;

  margin: 0;
  margin-top: 20%;
  margin-left: auto;
  margin-right: auto;

  > .ant-tabs-nav {
    > .ant-tabs-nav-wrap {
      > .ant-tabs-nav-list {
        /* 沒被選中的時候 */
        > .ant-tabs-tab {
          &:hover {
            color: #f7931e;
          }
          > .ant-tabs-tab-btn {
            &:active {
              color: #ce7813;
            }
          }
        }
        /* 選中的時候 */
        > .ant-tabs-tab-active {
          > .ant-tabs-tab-btn {
            color: #f7931e;
          }
        }
        /* 選中的時候的下方拉條 */
        > .ant-tabs-ink-bar {
          background: #f7931e;
        }
      }
    }
  }
`;

export const TabItem = styled(TabPane)``;
