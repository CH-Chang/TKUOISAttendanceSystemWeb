import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Row as antdRow,
  Col as antdCol,
  Form as antdForm,
  Input as antdInput,
  Button as antdButton,
} from "antd";

import bgLogin from "../../assets/img/bg/bgLogin.jpg";

export const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: white;
  background-image: url(${bgLogin});
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;

  position: relative;
`;

export const PartWrapper = styled(antdRow)`
  width: 100%;
  height: 100%;
`;

export const LeftWrapper = styled(antdCol)`
  height: 100%;
`;

export const RightWrapper = styled(antdCol)`
  height: 100%;
`;

export const Logo = styled.img`
  width: 25vmin;

  position: absolute;
  left: 40%;
  top: 35%;
`;

export const Slogan = styled.h2`
  position: absolute;
  top: 60%;
  left: 50%;

  font-size: 4vmin;
  font-weight: 100;
  color: #f7931e;

  > span {
    font-weight: 300;
  }
`;

export const OperationWrapper = styled.div`
  width: 100%;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translateX(-50%) translateY(-50%);
`;

export const OperationTitleBox = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const OperationTitle = styled.h1`
  color: #f7931e;
  font-size: 5.5vmin;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  > span {
    font-size: 4vmin;
  }
`;

export const FormBox = styled.div`
  padding-left: 25%;
  padding-right: 25%;

  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

export const LoginForm = styled(antdForm)``;

export const LoginFormItem = styled(antdForm.Item)`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;

  text-align: right;
`;

export const IdInput = styled(antdInput)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;

  border: 0;
  border-bottom: 2px solid #ddd;

  font-size: 1.8vmin;

  &:hover {
    border-bottom: 2px solid #ddd;
    box-shadow: 0 0 0 0 transparent;
  }

  &.ant-input-affix-wrapper-focused {
    border-bottom: 2px solid #f7931e;
    box-shadow: 0 0 0 0 transparent;
  }

  > span {
    margin-right: 10px;
  }
`;

export const PasswordInput = styled(antdInput)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;

  border: 0;
  border-bottom: 2px solid #ddd;

  font-size: 1.8vmin;

  &:hover {
    border-bottom: 2px solid #ddd;
    box-shadow: 0 0 0 0 transparent;
  }

  &.ant-input-affix-wrapper-focused {
    border-bottom: 2px solid #f7931e;
    box-shadow: 0 0 0 0 transparent;
  }

  > span {
    margin-right: 10px;
  }
`;

export const SubmitInput = styled(antdButton)`
  display: block;
  margin-left: auto;
  margin-right: auto;

  border: 1px solid #f7931e;
  background-color: white;

  color: #f7931e;
  font-size: 1.8vmin;

  &:hover {
    border: 1px solid #f7931e;
    color: white;
    background-color: #f7931e;
  }

  &:focus {
    border: 1px solid #f7931e;
    color: white;
    background-color: #f7931e;
  }
`;

export const ForgotLink = styled(Link)`
  text-align: center;

  color: #f7931e;

  &:hover {
    color: #f7931e;
  }
`;
