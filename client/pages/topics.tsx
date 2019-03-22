// import fetch from "isomorphic-unfetch";
import React from "react";
import {
  Consumer,
  Container,
  Navbar,
  Navlink,
  ImageLoader,
  Poster,
  Card,
  Text,
  Logo,
  Search,
  Slider,
  Select
} from "../components";
import Router from "next/router";

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

  navigateTopic = (topic: any) => {
    console.log(topic)
  };

  render() {
    return (
      <Consumer>
        {(context: any) => {
          return (
            <Container height="100vh" rows="1fr 80px">
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
                <Search />
                <Navlink align="right" size="1em" padding="0 30px">
                  Login
                </Navlink>
              </Navbar>
              <ImageLoader style={{ backgroundColor: "#000" }}>
                <Poster
                  id="poster"
                  src="static/img/poster1.jpg"
                  alt="poster"
                  className="loaded"
                />
              </ImageLoader>
              {/* <Text size="2em" margin="20px">Choose a Topic</Text> */}
              <Slider>
                <Container rows="min-content min-content calc(100vh - 60px - 132px)" margin="15px 0 0 0" gap="15px">
                <Container cols="min-content 1fr">
                <Text
                    margin="0 30px"
                    size="18px"
                    color="rgba(73, 73, 73, 1)"
                    weight="800"
                    align="center"
                  >
                    Category:
                  </Text>
                  <Select
                    values={["onesdasdasdasdasda", "two"]}
                    defaultValue="two"
                  />
                </Container>
                  <Text
                    margin="0 30px"
                    size="28px"
                    color="rgba(73, 73, 73, 1)"
                    weight="800"
                  >
                    Topics
                  </Text>
                  <Container overflow="true" rows="repeat(auto-fill, 90px)">
                    {context.topics && context.topics.map((topic: any, i: number) => (
                      <Card
                        key={i}
                        onClick={() => this.changeRoute("/topic", { id: topic.id })}
                        {...topic}
                      />
                    ))}
                  </Container>
                </Container>
              </Slider>
            </Container>
          );
        }}
      </Consumer>
    );
  }
}