import styled from "styled-components";
import { Carousel as antdCarousel } from "antd";

export const Wrapper = styled.div`
  width: 100%;

  margin-top: 1rem;
`;

export const Carousel = styled(antdCarousel)`
  height: 25vh;
  overflow: hidden;

  border: 0;
  border-radius: 5px;
`;

export const CarouselItemImg = styled.img``;
