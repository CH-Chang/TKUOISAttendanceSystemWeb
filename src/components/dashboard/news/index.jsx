import React, { Component } from "react";
import { connect } from "react-redux";

import { actionCreators } from "../../../store/dashboard/index";
import {
  Wrapper,
  TitleBox,
  Title,
  NewsBox,
  NewsItemBox,
  NewsItemTitle,
  NewsItemTime,
} from "./style";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;
    return (
      <Wrapper>
        <TitleBox>
          <Title>最新消息</Title>
        </TitleBox>
        <NewsBox>
          {posts.map((elem, index) => {
            return (
              <NewsItemBox>
                <NewsItemTitle
                  to={`/post/?serialNum=${elem.serialNum}`}
                  key={elem.title}
                >
                  {elem.title}
                </NewsItemTitle>
                <NewsItemTime>{elem.time}</NewsItemTime>
              </NewsItemBox>
            );
          })}
        </NewsBox>
      </Wrapper>
    );
  }

  componentDidMount() {
    const { getTop5Posts, posts } = this.props;

    if (posts.length === 0) getTop5Posts();
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.getIn(["Dashboard", "posts"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTop5Posts() {
      return dispatch(actionCreators.getTop5Posts());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
