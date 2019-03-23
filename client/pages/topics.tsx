import React from "react";
import {
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

interface Props {
  router?: any;
}

export default class extends React.Component<Props> {
  static contextType = Context;

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
    await this.getTopics(this.props.router.query.category_id);
    if (!this.context.categories) {
      await this.context.getResource("categories", "/api/v1/categories");
    }
  }

  componentWillUnmount() {
    this.context.updateState("topicsAnimate", false);
  }

  async getTopics(category_id: string) {
    await this.context.getResource(
      "topics",
      `/api/v1/topics/by_category/${category_id}`
    );
  }

  render() {
    return (
      <Container height="100vh" rows="1fr 80px">
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
        <Slider animated={this.context.topicsAnimate}>
          <Container
            rows="min-content min-content calc(100vh - 60px - 132px)"
            margin="15px 0 0 0"
            gap="15px"
          >
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
                values={this.context.categories}
                defaultValue={this.props.router.query.category_id}
                onChange={(e: any) => this.getTopics(e.target.value)}
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
              {this.context.topics &&
                this.context.topics.map((topic: any, i: number) => (
                  <Card
                    key={i}
                    {...topic}
                    onClick={() =>
                      setTimeout(this.props.router.push({
                        pathname: "/topic",
                        query: {
                          category_id: this.props.router.query.category_id,
                          id: topic.id
                        }
                      }), 100)
                    }
                    onMouseEnter={() => this.props.router.prefetch({
                      pathname: "/topic",
                      query: {
                        category_id: this.props.router.query.category_id,
                        id: topic.id
                      }
                    })}
                  />
                ))}
            </Container>
          </Container>
        </Slider>
      </Container>
    );
  }
}
