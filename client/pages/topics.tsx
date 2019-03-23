// import fetch from "isomorphic-unfetch";
import React from "react";
import {
  Consumer,
  Context,
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
import Link from "next/link";
import { throws } from "assert";

interface Props {
  topics?: any
  query?: any
  error?: any
}

export default class extends React.Component<Props> {
  static contextType = Context;
  static async getInitialProps({ query }: { query: any}) {
    try {
      const fetchTopics = await fetch(
        `${process.env.BACKEND_URL}/api/v1/topics/by_category/${query.category_id}`
      );
      const topics = await fetchTopics.json();
      return {
        topics,
        query
      };
    } catch(error) {
      return {
        error
      };
    }
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
    if (this.props.error) {
      console.log(this.props.error)
    }
  }

  navigateTopic = (topic: any) => {
    console.log(topic)
  };

  render() {
    console.log(this.context)
    return (
      <Consumer>
        {(context: any) => {
          return (
            <Container height="100vh" rows="1fr 80px">
              <p>&nbsp;</p>
              <Navbar cols="90px repeat(2, 1fr)">
              <Link href="/">
                <Navlink
                  align="left"
                  size="2em"
                  padding="0 30px"
                >
                  <Logo src="static/img/logo1.png" alt="logo" />
                </Navlink>
                </Link>
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
                    values={this.context.categories && this.context.categories}
                    defaultValue={this.props.query.category_id}
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
                    {this.props.topics && this.props.topics.map((topic: any, i: number) => (
                      <Link href={{
                        pathname: "/topic",
                        query: { 
                          id: topic.id
                        }
                      }}>
                      <Card
                        key={i}
                        {...topic}
                      />
                      </Link>
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
