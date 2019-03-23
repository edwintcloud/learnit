import React from "react";
import { Context, Container, Card, Text, Slider, Select } from "../components";
// import { Grid } from "reakit";
import Link from "next/link";
import { Dots } from "@zendeskgarden/react-loaders";

interface Props {
  router?: any;
}

export default class extends React.Component<Props> {
  static contextType = Context;

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
      <Slider animated={this.context.topicsAnimate}>
        <Container
          rows="min-content min-content calc(100vh - 60px - 132px)"
          margin="30px 0 0 0"
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
            {(this.context.topics &&
              this.context.topics.map((topic: any, i: number) => (
                <Link
                  prefetch
                  href={{
                    pathname: "/topic",
                    query: {
                      category_id: this.props.router.query.category_id,
                      id: topic.id
                    }
                  }}
                >
                  <Card key={i} {...topic} />
                </Link>
              ))) || (
              <Dots
                size="40px"
                color="rgba(73,73,73,1)"
                style={{ alignSelf: "center", justifySelf: "center" }}
              />
            )}
          </Container>
        </Container>
      </Slider>
    );
  }
}
