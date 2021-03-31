import styled from "styled-components";
import { Row as antdRow, Col as antdCol, Layout as antdLayout } from "antd";

const antdFooter = antdLayout.Footer;

export const Footer = styled(antdFooter)`
  background-color: #f7931e;

  position: relative;

  padding-top: 5vh;
  padding-bottom: 5vh;
`;

export const FooterWrapper = styled.div`
  max-width: 1140px;
  margin: auto;
`;

export const Top = styled(antdRow)``;

export const Product = styled(antdCol)`
  > dl {
    > dt {
      color: white;
      font-size: 1.8vmin;
      font-weight: 300;
    }
    > dd {
      margin-left: 1vw;
      margin-top: 1vh;
      margin-bottom: 1vh;

      > a {
        color: white;
        font-size: 1.5vmin;
        font-weight: 100;
      }
    }
  }
`;

export const Contact = styled(antdCol)`
  > dl {
    > dt {
      color: white;
      font-size: 1.8vmin;
      font-weight: 300;
    }
    > dd {
      margin-left: 1vw;
      margin-top: 1vh;
      margin-bottom: 1vh;

      > a {
        color: white;
        font-size: 1.5vmin;
        font-weight: 100;
        > svg {
          margin-right: 0.5vw;
        }
      }
    }
  }
`;

export const Organization = styled(antdCol)`
  > dl {
    > dt {
      color: white;
      font-size: 1.8vmin;
      font-weight: 300;
    }
    > dd {
      margin-left: 1vw;
      margin-top: 1vh;
      margin-bottom: 1vh;

      > a {
        color: white;
        font-size: 1.5vmin;
        font-weight: 100;
      }
    }
  }
`;

export const Info = styled(antdCol)`
  height: 100%;
  position: relative;
`;

export const Logo = styled.img`
  width: 20vmin;
  display: block;

  margin: auto;
`;

export const Bottom = styled(antdRow)`
  max-width: 1140px;

  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
`;

export const Declaration = styled(antdCol)`
  > p {
    font-size: 1.5vmin;
    color: white;
    text-align: center;
    line-height: 1.2;
    font-weight: 100;
  }
`;
