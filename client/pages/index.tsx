// import fetch from "isomorphic-unfetch";
import React from "react";
import {
  Consumer,
  Container,
  Navbar,
  Navlink,
  ImageLoader,
  Poster,
  Copyright,
  Card
} from "../components";

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

  setPosterLoader() {
    const win: any = window;
    const img: any = window.document.getElementById("poster");
    const newImg = new win.Image();
    newImg.onload = () => {
      img.classList.add("loaded");
    };
    newImg.src = img.src;
  }

  componentDidMount() {
    this.setPosterLoader();
  }

  render() {
    return (
      <Consumer>
        {(context: any) => {
          return (
            <Container height="100vh" rows="80px 1fr">
            <p>s</p>
              <Navbar>
                <Navlink align="left" size="2em">
                  Learnit
                </Navlink>
                <Navlink align="right" size="1em">
                  Login
                </Navlink>
              </Navbar>
              <ImageLoader style={{ backgroundColor: "#000" }}>
                <Poster id="poster" src="static/img/poster1.jpg" alt="poster" />
              </ImageLoader>
              <Container overflow>
                <Card><h1 style={{width: '100%', textAlign:'center'}}>Hello</h1>></Card>
                <Copyright>Copyright &copy; 2019 Learnit</Copyright>
              </Container>

              
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
