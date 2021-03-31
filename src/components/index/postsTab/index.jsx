import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actionCreators } from "../../../store/index/index";

import { PostsWrapper, Post } from "./style";

class PostsTab extends Component {
  render() {
    const { posts } = this.props;
    return (
      <PostsWrapper>
        {posts.map((elem, index) => {
          return (
            <Link to={`/post/?serialNum=${elem.serialNum}`} key={elem.title}>
              <Post>
                <h2>{elem.title}</h2>
                <h3>{elem.time}</h3>
              </Post>
            </Link>
          );
        })}
      </PostsWrapper>
    );
  }

  componentDidMount() {
    const { posts, getTop5Posts } = this.props;
    getTop5Posts(posts);
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.getIn(["Index", "posts"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTop5Posts(posts) {
      if (posts.length === 0) dispatch(actionCreators.getTop5Posts());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsTab);
