// import fetch from "isomorphic-unfetch";
import React from "react";
import { Context, Text, AddResource } from "../components";
import {
  styled,
  Grid,
  Overlay,
  Block,
  Backdrop,
  Button,
  Portal,
  Provider
} from "reakit";
import defaultTheme from "reakit-theme-default";
import { Dots } from "@zendeskgarden/react-loaders";

interface Props {
  router?: any;
}

const GridBox = styled(Grid)`
  margin-top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background-color: #fff;
  grid-template: "a b";
  & > div:last-child {
    width: 55vw;
  }
  & > div {
    padding: 30px;
  }
  @media (max-width: 960px) {
    min-height: calc(100vh - 180px);
    grid-template: "a" min-content "b";
    & > div:last-child {
      width: unset;
      max-width: 100vw;
      padding: 20px;
    }
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
`;

export default class extends React.Component<Props> {
  static contextType = Context;

  state = {
    topic: {
      name: "",
      description: ""
    }
  };

  async componentDidMount() {
    await this.context.getUser();
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

  createResource = async (postData: any) => {
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/resources/authorized/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.context.user.token}`
          },
            body: JSON.stringify({...postData, topic_id: Number(this.props.router.query.id)})
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
      } catch(err) {
        console.log(err);
      }   
    window.location.reload();
  };

  render() {
    if (
      !this.state.topic.name ||
      !this.state.topic.description ||
      !this.context.resources
    ) {
      return (
        <GridBox
          templateColumns="1fr"
          templateRows="1fr"
          justifyItems="center"
          alignItems="center"
        >
          <Dots size="40px" color="rgba(73,73,73,1)" />
        </GridBox>
      );
    }

    return (
      <Provider theme={defaultTheme}>
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
              <Overlay.Container>
                {overlay => (
                  <>
                    <Text
                      margin="0"
                      size="18px"
                      color="rgba(73, 73, 73, 1)"
                      weight="800"
                      justify="end"
                      align="center"
                      hover="underline"
                      {...overlay}
                      onClick={overlay.show} 
                      
                    >
                      + Add
                    </Text>
                    <Backdrop use={[Portal, Overlay.Hide]} {...overlay} />
                    <Overlay use={Portal} {...overlay}>
                        {this.context.user && <AddResource onClick={this.createResource} /> || `You must be logged in!`}
                    </Overlay>
                  </>
                )}
              </Overlay.Container>
            </Grid>

            <Grid templateRows="repeat(auto-fill, 1fr)">
              {this.context.resources &&
                this.context.resources.map((resource: any, i: number) => (
                  <CardGridBox templateColumns="min-content 1fr" gap="15px">
                    <Grid templateRows="1fr" alignItems="start">
                      <Grid templateRows="1fr 1fr 1fr" marginTop={10}>
                        <ArrowIcon viewBox="0 0 22 22">
                          <path
                            d="M2 20h18L11 5z"
                            fill="#bbc0c4"
                            transform="translate(0, 1)"
                            onClick={() =>
                              (document.getElementById("votes").innerHTML =
                                Number(
                                  document.getElementById("votes").innerHTML
                                ) + 1)
                            }
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
                          id="votes"
                        >
                          {Number(resource.up_votes) -
                            Number(resource.down_votes)}
                        </Text>
                        <ArrowIcon viewBox="0 0 22 22" style={{}}>
                          <path
                            d="M2 5h18L11 20z"
                            fill="#bbc0c4"
                            transform="translate(0, -5)"
                            onClick={() =>
                              (document.getElementById("votes").innerHTML =
                                Number(
                                  document.getElementById("votes").innerHTML
                                ) - 1)
                            }
                          />
                        </ArrowIcon>
                      </Grid>
                    </Grid>
                    <Grid
                      template={`"a" "b" "c" min-content`}
                      gap="10px"
                      padding={"10px 0 10px 10px"}
                    >
                      <Grid.Item
                        area="a"
                        style={{
                          overflowX: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {resource.description}
                      </Grid.Item>
                      <Grid.Item
                        area="b"
                        style={{
                          overflowX: "hidden",
                          textOverflow: "ellipsis"
                        }}
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
                        By: {resource.user.first_name}{" "}
                        {resource.user.last_name[0]}.
                      </Grid.Item>
                    </Grid>
                  </CardGridBox>
                ))}
            </Grid>
          </Grid.Item>
        </GridBox>
      </Provider>
    );
  }
}
