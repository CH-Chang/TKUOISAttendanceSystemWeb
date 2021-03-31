import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div``;

export const TitleBox = styled.div`
  padding-bottom: 0.8rem;
`;

export const Title = styled.h2`
  color: #f7931e;
  font-size: 1.8vmin;
`;

export const NewsBox = styled.div`
  margin-left: 1rem;
`;

export const NewsItemBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  padding-top: 0.8rem;
  padding-bottom: 0.8rem;

  border-bottom: 1px solid #ddd;
`;

export const NewsItemTitle = styled(Link)`
  flex: 1;

  font-size: 1.6vmin;
  text-align: left;
  color: #3b3b3b;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: #f7931e;
  }
  &:active {
    color: #e18519;
  }
`;

export const NewsItemTime = styled.p`
  font-size: 1.4vmin;
  text-align: right;
  color: #3b3b3b;
`;
