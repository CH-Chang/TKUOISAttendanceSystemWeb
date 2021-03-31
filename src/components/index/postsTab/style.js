import styled from "styled-components";

export const PostsWrapper = styled.div`
  width: 100%;
`;

export const Post = styled.div`
  width: 100%;

  padding: 5px 10px 5px 10px;

  border: 0;
  border-bottom: 1px solid #ddd;

  &:hover {
    background: #ddd;
    border-radius: 5px;
  }

  > h2 {
    text-align: left;

    font-size: 1.6vmin;
  }

  > h3 {
    text-align: right;

    font-size: 1.2vmin;
  }
`;
