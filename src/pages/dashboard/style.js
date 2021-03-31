import styled from "styled-components";
import { Layout as antdLayout, Row as antdRow, Col as antdCol } from "antd";

const antdContent = antdLayout.Content;

export const Content = styled(antdContent)`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;

  padding-top: 5rem;
  padding-bottom: 5rem;

  min-height: 100vh;
`;

export const Wrapper = styled(antdRow)``;

export const Left = styled(antdCol)``;

export const Right = styled(antdCol)``;
