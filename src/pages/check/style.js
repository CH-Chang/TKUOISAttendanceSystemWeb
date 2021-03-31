import styled from "styled-components";
import { Layout as antdLayout } from "antd";

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

export const HeadlineBox = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export const HeadlineTW = styled.h1`
  padding-bottom: 0.2rem;

  color: #f7931e;
  font-size: 2.5vmin;

  border-bottom: 1px solid #f7931e;
`;

export const HeadlineEN = styled.h2`
  color: #f7931e;
  font-size: 1.5vmin;
  text-transform: uppercase;
`;

export const Text = styled.div`
  margin-left: 2rem;
`;
