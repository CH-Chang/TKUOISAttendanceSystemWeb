import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout as antdLayout } from "antd";

const antdHeader = antdLayout.Header;

export const Header = styled(antdHeader)`
  height: 20vh;

  position: relative;

  background-color: #f7931e;

  overflow: visible;

  line-height: 1;
`;

export const Logo = styled.img`
  width: 18vmin;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);
`;

export const Nav = styled.div`
  position: absolute;

  right: 2vw;
  bottom: 2vh;

  display: flex;
  flex-direction: row;
`;

export const LinkHome = styled(Link)`
  display: inline-block;

  padding-left: 0.5vw;
  padding-right: 0.5vw;

  color: white;
  font-size: 1.8vmin;
  text-decoration: none;

  &:hover {
    color: white;
  }

  &:after {
    display: block;

    content: "";

    padding-bottom: 2px;

    border-bottom: 2px solid white;

    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 250ms ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }

  > svg {
    margin-right: 0.2rem;
  }
`;

export const LinkLogin = styled(Link)`
  display: inline-block;

  padding-left: 0.5vw;
  padding-right: 0.5vw;

  color: white;
  font-size: 1.8vmin;
  text-decoration: none;

  &:hover {
    color: white;
  }

  &:after {
    display: block;

    content: "";

    padding-bottom: 2px;

    border-bottom: 2px solid white;

    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 250ms ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }

  > svg {
    margin-right: 0.2rem;
  }
`;

export const LinkMenu = styled(Link)`
  display: inline-block;

  padding-left: 0.5vw;
  padding-right: 0.5vw;

  color: white;
  font-size: 1.8vmin;
  text-decoration: none;

  &:hover {
    color: white;
  }

  &:after {
    display: block;

    content: "";

    padding-bottom: 2px;

    border-bottom: 2px solid white;

    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 250ms ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }

  > svg {
    margin-right: 0.2rem;
  }
`;

export const Menu = styled.div`
  width: 100%;

  background-color: white;

  border: 1px solid #ddd;
  border-radius: 5px;

  box-shadow: 5px 5px 10px #ddd;

  position: absolute;
  top: 3vh;

  z-index: 1;
`;

export const MenuTitle = styled.div`
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  margin-left: auto;
  margin-right: auto;

  text-align: center;
  font-size: 1.8vmin;

  > svg {
    margin-right: 10px;
    color: #232323;
  }
  > span {
    color: #f7931e;
  }
`;

export const MenuLink = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  position: relative;

  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
`;

export const MenuLinkItem = styled(Link)`
  width: 50%;

  float: left;

  padding-top: 0.5vh;
  padding-bottom: 0.5vh;

  text-align: center;
  font-size: 1.8vmin;
  color: #232323;

  &:hover {
    color: #f7931e;
  }
`;

export const MenuLogout = styled.button`
  display: block;

  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  margin-right: auto;
  margin-left: auto;

  padding-top: 0.8vh;
  padding-bottom: 0.8vh;
  padding-left: 1vw;
  padding-right: 1vw;

  outline: none;

  background-color: white;
  border: 1px solid #f7931e;
  border-radius: 25px;

  color: #f7931e;
  font-size: 1.5vmin;

  cursor: pointer;

  &:hover {
    color: white;
    background-color: #f7931e;
    transition: all 300ms ease-in-out;
  }
`;
