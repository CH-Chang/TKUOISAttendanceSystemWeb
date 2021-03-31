import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 1.5rem;
`;

export const TitleBox = styled.div`
  padding-bottom: 0.8rem;
`;

export const Title = styled.h2`
  color: #f7931e;
  font-size: 1.8vmin;
`;

export const ActivityBox = styled.div`
  margin-left: 1rem;
`;

export const ActivityItemBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  padding-top: 0.8rem;
  padding-bottom: 0.8rem;

  border-bottom: 1px solid #ddd;
`;

export const ActivityItemTitle = styled.h2`
  flex: 1;

  font-size: 1.6vmin;
  text-align: left;
  color: #3b3b3b;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ActivityItemStatus = styled.p`
  font-size: 1.4vmin;
  text-align: right;
  color: #3b3b3b;

  &.success {
    color: green;
  }

  &.fail {
    color: red;
  }
`;
