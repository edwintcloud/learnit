// import fetch from "isomorphic-unfetch";
import React from "react";
import { Consumer, Container } from "../components";

interface Props {
  posts: any;
  imgLoaded: any;
}

export default class extends React.Component<Props> {
  static async getInitialProps() {
    // const fetchPosts = await fetch(
    //   "https://jsonplaceholder.typicode.com/posts"
    // );
    // const posts = await fetchPosts.json();
    // return {
    //   posts
    // };
  }

  render() {

    return (
      <Consumer>
        {(context: any) => {
          return (
            <Container>
              Hello
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
