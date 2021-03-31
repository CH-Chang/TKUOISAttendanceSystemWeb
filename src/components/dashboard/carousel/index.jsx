import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, Carousel, CarouselItemImg } from "./style";

class Index extends Component {
  render() {
    return (
      <Wrapper>
        <Carousel autoplay>
          <CarouselItemImg src="https://photo.tku.edu.tw/photos/2020_add10840-0fbc-429c-9991-bf1c264c5740.jpg" />
          <CarouselItemImg src="https://photo.tku.edu.tw/photos/2020_627757c3-0804-44a3-a31a-f3c8e583200e.jpg" />
        </Carousel>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
