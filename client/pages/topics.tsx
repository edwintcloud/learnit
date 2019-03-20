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
  Card,
  Text,
  Logo,
  Search,
  ChipBox
} from "../components";
import Router from 'next/router'

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
    // this.setPosterLoader();
  }

  changeRoute = (route?: string, query?: Object) => {
    Router.push({
      pathname: route,
      query: query
    });
  };

  render() {
    return (
      <Consumer>
        {(context: any) => {
          return (
            <Container height="100vh" rows="80px min-content">
              <p>&nbsp;</p>
              <Navbar cols="90px repeat(2, 1fr)">
                <Navlink
                  align="left"
                  size="2em"
                  padding="0 30px"
                  onClick={() => this.changeRoute("/")}
                >
                  <Logo src="static/img/logo1.png" alt="logo" />
                </Navlink>
                <Search></Search>
                <Navlink align="right" size="1em" padding="0 30px">
                  Login
                </Navlink>
              </Navbar>
              <ImageLoader style={{ backgroundColor: "#000" }}>
                <Poster id="poster" src="static/img/poster1.jpg" alt="poster" className="loaded" />
              </ImageLoader>
              <Text size="2em" margin="20px">Choose a Topic</Text>
              <Container overflow rows="min-content 1fr">
              <ChipBox margin="0 0 0 20px">
                  {[...Array(20)].map((_: any, i: number) => 
                    <Card
                    key={i}
                    imgSrc="static/img/poster1.jpg"
                    text="topic 1 is about this and that and blah blah blah and such and suchtopic 1 is about this and that and blah blah blah and such and such"
                   ></Card>
                  )}
              </ChipBox>
              <Copyright>Copyright &copy; 2019 Learnit</Copyright>
              </Container>
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
