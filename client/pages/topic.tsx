// import fetch from "isomorphic-unfetch";
import React from "react";
import {
  Context,
  Container,
  Navbar,
  Navlink,
  ImageLoader,
  Poster,
  OgCard,
  Box,
  Text,
  Logo,
} from "../components";

interface Props {
  router?: any;
}

export default class extends React.Component<Props> {
  static contextType = Context;

  state = {
    topic:{
      name: "s",
      description: ""
    }
  };

  setPosterLoader() {
    const win: any = window;
    const img: any = window.document.getElementById("poster");
    const newImg = new win.Image();
    newImg.onload = () => {
      img.classList.add("loaded");
    };
    newImg.src = img.src;
  }

  async componentDidMount() {
    await this.context.getResource("resources", `/api/v1/resources/by_topic/${this.props.router.query.id}`);
    if (!this.context.topics) {
      await this.context.getResource(
        "topics",
        `/api/v1/topics/by_category/${this.props.router.query.category_id}`
      );
    }
    if (this.context.topics) {
      const topic = this.context.topics.find((topic: any) => topic.id == this.props.router.query.id);
      topic && this.setState({topic});
    }
  }

  render() {
    return (
      <Container height="100vh" rows="80px">
        <p>&nbsp;</p>
        <Navbar cols="90px repeat(2, 1fr)">
          <Navlink
            align="left"
            size="2em"
            padding="0 30px"
            onClick={() => setTimeout(this.props.router.push("/"), 100)}
            onMouseEnter={() => this.props.router.prefetch("/")}
          >
            <Logo src="static/img/logo1.png" alt="logo" />
          </Navlink>
          <Text
            as="a"
            color="rgba(255, 255, 255, 0.8)"
            size="24px"
            align="center"
            hover="underline"
            onClick={() => {
              this.props.router.back();
            }}
          >
            Back
          </Text>
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
        <Box>
          <Container
            cols="1fr 1fr"
            margin="50px 15px"
            gap="15px"
            height="calc(100% - 15px - 15px)"
            reactive="swap"
            overflow="true"
          >
            <Container rows="min-content min-content" gap="15px">
              <Text
                margin="0 30px"
                size="48px"
                color="rgba(73, 73, 73, 1)"
                weight="800"
                align="center"
                justify="start"
              >
                {this.state.topic.name}
              </Text>
              <Text
                margin="0 30px"
                size="18px"
                color="rgba(73, 73, 73, 1)"
                weight="300"
                align="center"
                justify="start"
              >
                {this.state.topic.description}
              </Text>
            </Container>
            <Container
              rows="min-content 1fr"
              align="center"
              gap="10px"
              overflow="true"
              height="50vh"
            >
              <Container cols="1fr 1fr" align="center">
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
                {this.context.resources &&
                  this.context.resources.map((resource: any, i: number) => (
                    <OgCard key={i} {...resource} />
                  ))}
              </Container>
            </Container>
          </Container>
        </Box>
      </Container>
    );
  }
}
