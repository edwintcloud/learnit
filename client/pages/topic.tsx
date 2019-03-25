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
  List,
  Provider
} from "reakit";
import defaultTheme from "reakit-theme-default";
import { Dots } from "@zendeskgarden/react-loaders";

interface Props {
  router?: any;
}

const GridBox = styled(Grid)`
  background-color: #fff;
  grid-template: "a b";
  overflow: hidden;
  & > div:last-child {
    width: 55vw;
  }
  @media (max-width: 960px) {
    min-height: calc(100vh - 180px);
    grid-template: "a" min-content "b";
    & > div:last-child {
      padding-top: 30px;
      width: unset;
      max-width: 100vw;
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

const Breadcrumb = styled(List)`
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  align-items: center;
  justify-items: start;
  & > li {
    display: flex;
    align-items: center;
    margin: 0;
  }

  & > li a {
    float: left;
    max-height: 40px;
    width: max-content;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div {
      width: 1em;
      height: 100%;
      vertical-align: top;
      content: "";
      margin: 1px 0.57143em;
      background: no-repeat 50% / 1em
        url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' color='%2368737D'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' d='M4.5 15l6.6-6.6c.2-.2.2-.5 0-.7L4.5 1'/%3E%3C/svg%3E");
  }
`;

const GridA = styled(Grid)`
  background-color: white;
  margin-top: 80px;
  padding: 20px;
  grid-gap: 15px; 
  height: calc(100vh - 80px);
  overflow-y: auto;
  z-index: 1;
  grid-template-rows: min-content min-content;
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
    if (!this.context.categories) {
      await this.context.getResource("categories", "/api/v1/categories");
    }
    await this.context.getUser();
  }

  createResource = async (postData: any, overlay: any) => {
    if (!postData.description || !postData.link || postData.description.length < 3 || postData.link.length < 3) {
      return overlay.hide();
    }
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/resources/authorized/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.context.user.token}`
          },
          body: JSON.stringify({
            ...postData,
            topic_id: Number(this.props.router.query.id)
          })
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      this.context.addResource(data);
    } catch (err) {
      console.log(err);
    }
    overlay.hide();
  };

  createVote = async (id: number, type: string) => {
    if (!this.context.user) return alert("You must be logged in to vote!");
    const postData = {
      type: type,
      user_id: this.context.user.id,
      resource_id: id
    };
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/resources/authorized/vote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.context.user.token}`
          },
            body: JSON.stringify(postData)
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        const voteEl = document.getElementById(`votes${id}`);
        if (type === "up") {
          voteEl.innerHTML = Number(voteEl.innerHTML)+1
        } else {
          voteEl.innerHTML = Number(voteEl.innerHTML)-1
        }
      } catch(err) {
        console.log(err);
        alert("You have already voted for this resource!");
      }    
  };

  countVotes = (votes: any) => {
    let sum = 0;
    votes.forEach((vote: any) => {
      if (vote.type === "up") {
        sum += 1;
      }
      if (vote.type === "down") {
        sum -= 1;
      }
    });
    return `${sum}`;
  };

  render() {
    if (
      !this.state.topic.name ||
      !this.state.topic.description ||
      !this.context.resources
    ) {
      return (
        <GridA
          templateColumns="1fr"
          templateRows="1fr"
          justifyItems="center"
          alignItems="center"
        >
          <Dots size="40px" color="rgba(73,73,73,1)" />
        </GridA>
      );
    }

    return (
      <Provider theme={defaultTheme}>
        <GridA>
          <Breadcrumb>
            <li>{this.context.categories && this.context.categories.map((category: any, i: any) => category.id == this.props.router.query.category_id && <a key={i} href="" onClick={(e)=> {e.preventDefault();this.props.router.back()}}>{category.name}</a>)}</li>
            <div></div>
            <li>{this.state.topic.name}</li>
          </Breadcrumb>
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
                        {(this.context.user && (
                          <AddResource overlay={overlay} onClick={this.createResource} />
                        )) ||
                          `You must be logged in!`}
                      </Overlay>
                    </>
                  )}
                </Overlay.Container>
              </Grid>

              <Grid templateRows="repeat(auto-fill, 1fr)">
                {this.context.resources &&
                  this.context.resources.map((resource: any, i: number) => (
                    <CardGridBox key={i} templateColumns="min-content 1fr" gap="15px">
                      <Grid templateRows="1fr" alignItems="start">
                        <Grid templateRows="1fr 1fr 1fr" marginTop={10}>
                          <ArrowIcon viewBox="0 0 22 22">
                            <path
                              d="M2 20h18L11 5z"
                              fill="#bbc0c4"
                              transform="translate(0, 1)"
                              onClick={() =>
                                this.createVote(resource.id, "up")
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
                            id={`votes${resource.id}`}
                          >
                            {(resource.votes && resource.votes.length > 0 &&
                              this.countVotes(resource.votes)) || `0`}
                          </Text>
                          <ArrowIcon viewBox="0 0 22 22" style={{}}>
                            <path
                              d="M2 5h18L11 20z"
                              fill="#bbc0c4"
                              transform="translate(0, -5)"
                              onClick={() =>
                                this.createVote(resource.id, "down")
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
        </GridA>
      </Provider>
    );
  }
}
