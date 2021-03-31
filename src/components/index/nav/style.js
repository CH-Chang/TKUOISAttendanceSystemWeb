import styled from "styled-components";
import { Col } from "antd";
import { Link } from "react-router-dom";

import logoTKUInfoCenter from "../../../assets/img/logo/logoTkuInfoCenter.svg";

export const NavWrapper = styled.div`
  width: 100%;

  margin: 0;
  margin-top: 40%;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

export const LeftWrapper = styled(Col)``;

export const RightWrapper = styled(Col)``;

export const Logo = styled.img.attrs({ src: logoTKUInfoCenter })`
  width: 30vmin;

  padding: 10px;

  box-sizing: content-box;
`;

export const LoginBtn = styled(Link)`
  margin: 10px;
  padding: 10px;

  text-align: center;

  border: 1px solid #f7931e;
  border-radius: 10px;

  color: #f7931e;
  background: #fff;

  outline: none;

  font-size: 2vmin;
  font-weight: 100;

  > svg {
    margin-right: 5px;
  }

  &:hover {
    background: #f7931e;
    color: #fff;
  }
`;

export const ApplyBtn = styled(Link)`
  margin: 10px;
  padding: 10px;

  text-align: center;

  border: 1px solid #f7931e;
  border-radius: 10px;

  color: #fff;
  background: #f7931e;

  outline: none;

  font-size: 2vmin;
  font-weight: 100;

  > svg {
    margin-right: 5px;
  }

  &:hover {
    background: #fff;
    color: #f7931e;
  }
`;

export const Slogan = styled.p`
  margin-top: 30px;

  text-align: center;
  font-size: 1.5vmin;

  color: #f7931e;
`;
