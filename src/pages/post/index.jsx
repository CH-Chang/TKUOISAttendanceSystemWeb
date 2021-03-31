import React, { Fragment, Component } from "react";

import Header from "../../components/common/header/index";
import Footer from "../../components/common/footer/index";

class Post extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Footer />
      </Fragment>
    );
  }

  componentDidMount() {
    //new URLSearchParams(this.props.location.search).get("serialNum")
  }
}

export default Post;
