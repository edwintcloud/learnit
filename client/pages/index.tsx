// import fetch from "isomorphic-unfetch";
import React from "react";
import {
  Consumer,
  Container,
  Navbar,
  Navlink,
  ImageLoader,
  Poster,
  Text,
  Heading,
  Chip,
  ChipBox,
  Logo
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
    this.setPosterLoader();
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
            <Container height="100vh" rows="80px 1fr">
              <p>&nbsp;</p>
              <Navbar cols="repeat(2, 1fr)">
                <Navlink
                  align="left"
                  size="2em"
                  padding="0 30px"
                  cols="40px 1fr"
                  onClick={() => this.changeRoute("/")}
                >
                  <Logo src="static/img/logo1.png" alt="logo" />
                  Learnit
                </Navlink>
                <Navlink align="right" size="1em" padding="0 30px">
                  Login
                </Navlink>
              </Navbar>
              <ImageLoader style={{ backgroundColor: "#000" }}>
                <Poster id="poster" src="static/img/poster1.jpg" alt="poster" />
              </ImageLoader>
              <Container overflow rows="min-content min-content 1fr">
                <Heading>What Would You Like to Learn?</Heading>
                <ChipBox justify="center" maxWidth="800px">
                  <Chip as="a" onClick={() => this.changeRoute("/topics", {category: "Web Design"})}>Web Design</Chip>
                  <Chip as="a">Business</Chip>
                  <Chip as="a">IT Management</Chip>
                  <Chip as="a">Office Productivity</Chip>
                  <Chip as="a">Personal Development</Chip>
                  <Chip as="a">UI/UX Design</Chip>
                  <Chip as="a">Marketing</Chip>
                  <Chip as="a">Lifestyle</Chip>
                  <Chip as="a">Photography</Chip>
                  <Chip as="a">Health &amp; Fitness</Chip>
                  <Chip as="a">Music</Chip>
                  <Chip as="a">Teaching</Chip>
                  <Chip as="a">Machine Learning</Chip>
                  <Chip as="a">Science</Chip>
                </ChipBox>

                <Text
                as="p"
                margin="30px"
                color="rgba(255, 255, 255, 0.8)"
                align="end"
              >
                Copyright &copy; 2019 Learnit
              </Text>
              </Container>
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
