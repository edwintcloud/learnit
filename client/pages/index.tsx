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
  Heading,
  Chip,
  ChipBox
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
              <Container overflow rows="1fr min-content 1fr">
                <Heading>
                  What Would You Like to Learn?
                </Heading>
                <ChipBox>
                  <Chip as="a">Web Design</Chip>
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
                
                <Copyright>Copyright &copy; 2019 Learnit</Copyright>
              </Container>
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
