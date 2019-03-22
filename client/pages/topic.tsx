// import fetch from "isomorphic-unfetch";
import React from "react";
import {
  Consumer,
  Container,
  Navbar,
  Navlink,
  ImageLoader,
  Poster,
  OgCard,
  Box,
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

  render() {
    return (
      <Consumer>
        {(context: any) => {
          return (
            <Container height="100vh" rows="80px">
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
                <Text
                  as="a"
                  color="rgba(255, 255, 255, 0.8)"
                  size="24px"
                  align="center"
                  hover="underline"
                  onClick={() => Router.back()}
                >Back</Text>
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
              <Box>
                <Container cols="1fr 1fr" margin="50px 15px" gap="15px" height="calc(100% - 15px - 15px)" reactive="swap" overflow="true">
                <Container rows="min-content min-content" gap="15px">
                  <Text
                      margin="0 30px"
                      size="48px"
                      color="rgba(73, 73, 73, 1)"
                      weight="800"
                      align="center"
            
                    >
                      Web Development
                    </Text>
                    <Text
                      margin="0 30px"
                      size="18px"
                      color="rgba(73, 73, 73, 1)"
                      weight="300"
                      align="center"
                      justify="center"
                    >
                      Web development is the work involved in developing a web site for the Internet (World Wide Web) or an intranet (a private network).[1] Web development can range from developing a simple single static page of plain text to complex web-based internet applications (web apps), electronic businesses, and social network services. A more comprehensive list of tasks to which web development commonly refers, may include web engineering, web design, web content development, client liaison, client-side/server-side scripting, web server and network security configuration, and e-commerce development.
                    </Text>
                    
                </Container>
                <Container rows="min-content 1fr" align="center" gap="10px" overflow="true" height="50vh" >
                <Container cols="1fr 1fr" align="center" >
                <Text
                    margin="0 30px"
                    size="28px"
                    color="rgba(73, 73, 73, 1)"
                    weight="800"
                  >
                    Resources
                  </Text>
                  <Text
                    margin="0 30px"
                    size="18px"
                    color="rgba(73, 73, 73, 1)"
                    weight="800"
                    justify="end"
                    align="center"
                    hover="underline"
                  >
                    + Add
                  </Text>
                
                </Container>
                
                  <Container overflow="true" rows="repeat(auto-fill, 90px)">
                    {context.topics && context.topics.map((topic: any, i: number) => (
                      <OgCard
                        key={i}
                        onClick={() => this.changeRoute("/topic", { id: topic.id })}
                        {...topic}
                      />
                    ))}
                  </Container>
                </Container>
                </Container>
              </Box>
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
