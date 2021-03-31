import styled from "styled-components";
import { Link } from "react-router-dom";
import { Progress } from "antd";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

export const Top = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;

  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

  border: 0;
  border-bottom: 1px solid #ddd;
`;

export const Bottom = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;

  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TitleBox = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  color: #3b3b3b;
  text-align: left;
  font-size: 1.8vmin;

  > span {
    color: #f7931e;
    font-size: 2.2vmin;
  }
`;

export const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
`;

export const EditLink = styled(Link)`
  color: #3b3b3b;

  &:hover {
    color: #f7931e;
  }

  &:active {
    color: #e18519;
  }
`;

export const InfoBox = styled.div`
  height: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-items: left;
`;

export const Info = styled.p`
  display: block;

  text-align: left;
  font-size: 1.6vmin;
  color: #3b3b3b;

  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const WorkBox = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
`;

export const WorkProgress = styled(Progress)`
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
          font-size: 1.6vmin;
          color: #f7931e;
          line-height: 2vmin;
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
          font-size: 1.6vmin;
          color: #f7931e;
          line-height: 2vmin;
        }
      }
    }
  }
`;

export const WorkDetail = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;

export const WorkDetailTitle = styled.p`
  text-align: left;
  font-size: 1.6vmin;
  color: #3b3b3b;

  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
`;
export const WorkDetailMoney = styled.p`
  text-align: center;
  font-size: 2.5vmin;
  color: #f7931e;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
