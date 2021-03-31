import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100%;

  margin-top: 2rem;
`;

export const TitleBox = styled.div`
  padding-bottom: 0.8rem;
`;

export const Title = styled.h2`
  font-size: 1.8vmin;
  color: #f7931e;
`;

export const CoverBox = styled.div`
  margin-left: 0.5rem;
  box-sizing: border-box;
`;

export const CoverItemBox = styled.div`
  width: 100%;

  margin-top: 0.8rem;
  margin-bottom: 0.8rem;

  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  border: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

export const CoverItemIcon = styled.div`
  width: 8vmin;
  height: 8vmin;

  border: 0;
  background: #f7931e;
  border-radius: 999rem;

  font-size: 6vmin;
  color: white;

  position: relative;

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

export const CoverItemDetails = styled.div`
  flex: 1;

  margin-left: 1rem;
`;

export const CoverItemDetail = styled.p`
  font-size: 1.6vmin;
  color: #3b3b3b;
  text-align: left;

  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
`;

export const CoverItemLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

export const CoverItemApplyLink = styled(Link)`
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;

  background-color: white;
  border: 1px solid #f7931e;
  border-radius: 10px;

  text-align: center;
  font-size: 1.6vmin;
  color: #f7931e;

  cursor: pointer;

  &:hover {
    color: white;
    background-color: #f7931e;
  }
`;
