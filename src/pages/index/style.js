import styled from "styled-components";
import { Col, Row } from "antd";

import bgIndex from "../../assets/img/bg/bgIndex.jpg";

export const IndexWrapper = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: white;
  background-image: url(${bgIndex});
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

export const PartWrapper = styled(Row)`
  height: 100%;
`;

export const LeftWrapper = styled(Col)`
  height: 100%;
`;

export const RightWrapper = styled(Col)`
  height: 100%;
`;

export const Declaration = styled.div`
  position: absolute;

  bottom: 30px;
  right: 30px;

  text-align: right;
  font-size: 1.5vmin;

  padding-right: 10px;

  border: 0;
  border-right: 1px solid #888;
`;
