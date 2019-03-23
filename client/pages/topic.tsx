// import fetch from "isomorphic-unfetch";
import React from "react";
import { Context, Text } from "../components";
import { styled, Grid } from "reakit";
import { Dots } from "@zendeskgarden/react-loaders";

interface Props {
  router?: any;
}

export default class extends React.Component<Props> {
  static contextType = Context;

  state = {
    topic: {
      name: "",
      description: ""
    }
  };

  async componentDidMount() {
    await this.context.getResource(
      "resources",
      `/api/v1/resources/by_topic/${this.props.router.query.id}`
    );
    if (!this.context.topics) {
      await this.context.getResource(
        "topics",
        `/api/v1/topics/by_category/${this.props.router.query.category_id}`
      );
    }
    if (this.context.topics) {
      const topic = this.context.topics.find(
        (topic: any) => topic.id == this.props.router.query.id
      );
      topic && this.setState({ topic });
    }
  }

  render() {
    const GridBox = styled(Grid)`
      margin-top: 80px;
      height: calc(100vh - 80px);
      overflow-y: auto;
      background-color: #fff;
      grid-template: "a b";
      & > div {
        max-width: 55vw;
        padding: 30px;
      }
      @media (max-width: 960px) {
        min-height: calc(100vh - 180px);
        grid-template: "a" min-content "b";
        & > div {
          max-width: 100vw;
          padding: 20px;
        }
      }
    `;

    const ArrowIcon = styled.svg`
      width: 36px;
      display: block;
      height: 36px;
      :hover {
        cursor: pointer;
      }
    `;

    const CardGridBox = styled(Grid)`
      padding: 15px 0 15px 15px;
      border-bottom: 1px solid #e4e6e8;
      height: 180px;
    `;

    if (
      !this.state.topic.name ||
      !this.state.topic.description ||
      !this.context.resources
    ) {
      return (
        <GridBox templateColumns="1fr" templateRows="1fr" justifyItems="center" alignItems="center">
          <Dots size="40px" color="rgba(73,73,73,1)" />
        </GridBox>
      );
    }

    return (
      <GridBox>
        <Grid.Item area="a">
          <Text
            margin="0 20px 0 0"
            size="48px"
            color="rgba(73, 73, 73, 1)"
            weight="800"
            align="center"
            justify="start"
          >
            {this.state.topic.name}
          </Text>
          <Text
            margin="15px 0 0 3px"
            size="18px"
            color="rgba(73, 73, 73, 1)"
            weight="300"
            align="center"
            justify="start"
          >
            {this.state.topic.description}
          </Text>
        </Grid.Item>
        <Grid.Item area="b">
          <Grid templateColumns="repeat(2, 1fr)">
            <Text
              margin="0"
              size="28px"
              color="rgba(73, 73, 73, 1)"
              weight="800"
            >
              Resources
            </Text>
            <Text
              margin="0"
              size="18px"
              color="rgba(73, 73, 73, 1)"
              weight="800"
              justify="end"
              align="center"
              hover="underline"
            >
              + Add
            </Text>
          </Grid>

          <Grid templateRows="repeat(auto-fill, 180px)">
            {this.context.resources &&
              this.context.resources.map((resource: any, i: number) => (
                <CardGridBox templateColumns="min-content 1fr" gap="15px">
                  <Grid
                    templateRows="1fr 1fr 1fr"
                    style={{ alignItems: "center" }}
                  >
                    <ArrowIcon viewBox="0 0 22 22">
                      <path
                        d="M2 20h18L11 5z"
                        fill="#bbc0c4"
                        transform="translate(0, 1)"
                      />
                    </ArrowIcon>
                    <Text
                      as="p"
                      size="14px"
                      margin="0"
                      color="hsl(207, 7%, 45%)"
                      weight="600"
                      align="center"
                      justify="center"
                    >
                      {Number(resource.up_votes) - Number(resource.down_votes)}
                    </Text>
                    <ArrowIcon viewBox="0 0 22 22" style={{}}>
                      <path
                        d="M2 5h18L11 20z"
                        fill="#bbc0c4"
                        transform="translate(0, -5)"
                      />
                    </ArrowIcon>
                  </Grid>
                  <Grid
                    template={`"a" "b" "c" min-content`}
                    gap="10px"
                    padding={"10px 0 10px 10px"}
                    height={160}
                  >
                    <Grid.Item
                      area="a"
                      style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
                    >
                      {resource.description}
                    </Grid.Item>
                    <Grid.Item
                      area="b"
                      style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
                    >
                      <a href={resource.link} target="_blank">
                        {resource.link}
                      </a>
                    </Grid.Item>
                    <Grid.Item
                      area="c"
                      style={{
                        alignSelf: "end",
                        justifySelf: "end",
                        overflowX: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      By: {resource.author}
                    </Grid.Item>
                  </Grid>
                </CardGridBox>
              ))}
          </Grid>
        </Grid.Item>
      </GridBox>
    );
  }
}
