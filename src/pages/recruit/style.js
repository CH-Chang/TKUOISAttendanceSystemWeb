import styled from "styled-components";
import { Link } from "react-router-dom";
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

export const Headline = styled.div`
  display: inline-block;

  > h1 {
    font-size: 2.5vmin;
    color: #f7931e;

    border-bottom: 1px solid #f7931e;
  }

  > h2 {
    font-size: 1.8vmin;
    color: #f7931e;

    text-transform: uppercase;
  }
`;

export const Text = styled.div`
  margin-left: 2rem;
`;

export const Guild = styled.div`
  margin-top: 3rem;

  > p {
    color: #232323;
    font-size: 1.8vmin;

    line-height: 1.2;

    > span {
      font-size: 2vmin;

      margin-left: 10px;
    }
  }
`;

export const PromotionWrapper = styled.div`
  margin-top: 3rem;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: flex-end;

  > h2 {
    font-weight: 300;
    font-size: 2vmin;
    display: inline-block;

    padding: 0.8rem 1.5rem 0.8rem 1.5rem;
    background-color: #f7931e;
    color: white;

    border: 1px solid #f7931e;
    border-radius: 30px;
  }
  > h3 {
    font-weight: 300;
    margin-left: 0.8rem;
    display: inline-block;

    text-transform: uppercase;
    font-size: 2vmin;
    color: #f7931e;

    border-bottom: 1px solid #f7931e;
  }
`;

export const Promotions = styled.div`
  width: 100%;

  margin-top: 3rem;
`;

export const Promotion = styled.div`
  width: 33%;

  display: inline-block;

  > h5 {
    font-size: 1.8vmin;
    text-align: center;
    color: #f7931e;

    margin-top: 1.5rem;
  }
  > div {
    width: 20vmin;
    height: 20vmin;

    background: #f7931e;
    border-radius: 999rem;
    margin: auto;

    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    > svg {
      font-size: 10vmin;
      margin: auto;
      text-align: center;
      color: white;
    }
  }
`;

export const FormLinkWrapper = styled.div`
  margin-top: 3rem;
`;

export const FormLinks = styled.div`
  margin-top: 3rem;
`;

export const FormLink = styled(Link)`
  margin: 0px 10px;
  padding: 0.5rem 0.8rem;

  color: #f7931e;
  font-size: 1.5vmin;

  background: white;

  border: 1px solid #f7931e;
  border-radius: 5rem;

  &:hover {
    background: #f7931e;
    color: white;
  }
`;
