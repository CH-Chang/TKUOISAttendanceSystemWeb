import styled from "styled-components";
import { Progress } from "antd";

export const StatusWrapper = styled.div`
  width: 100%;

  float: left;
`;

export const ProgressCircle = styled(Progress)`
  padding: 5px;

  box-sizing: content-box;

  &.ant-progress-status-normal {
    > .ant-progress-inner {
      > .ant-progress-circle {
        > .ant-progress-circle-path {
          stroke: #f7931e;
        }
      }
      > .ant-progress-text {
        > p {
          font-size: 1.8vmin;
          color: #232323;
          > span {
            font-size: 1.5vmin;
          }
        }
      }
    }
  }

  &.ant-progress-status-success {
    > .ant-progress-inner {
      > .ant-progress-circle {
        > .ant-progress-circle-path {
          stroke: #f7931e;
        }
      }
      > .ant-progress-text {
        > p {
          font-size: 1.8vmin;
          color: #f7931e;
          > span {
            font-size: 1.5vmin;
          }
        }
      }
    }
  }
`;
