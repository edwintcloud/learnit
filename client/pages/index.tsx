import React from "react";
import {
  Container,
  Navbar,
  Navlink,
  ImageLoader,
  Poster,
  Text,
  Heading,
  Chip,
  ChipBox,
  Logo,
  Context
} from "../components";
import Link from "next/link";

interface Props {
  router?: any
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
    this.setPosterLoader();
    await this.context.getResource("categories", "/api/v1/categories");
    this.context.updateState("topicsAnimate", true);
  }

  render() {
    return (
      <Container height="100vh" rows="80px 1fr">
        <p>&nbsp;</p>
        <Navbar cols="repeat(2, 1fr)">
          <Link href="/">
          <Navlink
            align="left"
            size="2em"
            padding="0 30px"
            cols="40px 1fr"
          >
          
            <Logo src="static/img/logo1.png" alt="logo" />
            Learnit
          </Navlink>
          </Link>
          <Navlink align="right" size="1em" padding="0 30px">
            Login
          </Navlink>
        </Navbar>
        <ImageLoader style={{ backgroundColor: "#000" }}>
          <Poster id="poster" src="static/img/poster1.jpg" alt="poster" />
        </ImageLoader>
        <Container overflow="true" rows="min-content min-content 1fr">
          <Heading>What Would You Like to Learn?</Heading>
          <ChipBox justify="center" maxWidth="800px">
            {this.context.categories && this.context.categories.map((category: any, index: any) => 
              <Chip
              key={index}
              as="a"
              onClick={() => setTimeout(this.props.router.push({
                pathname: "/topics",
                query: { 
                  category_id: category.id
                }
              }), 100)}
              // onMouseEnter={() => this.props.router.prefetch(
              //   {
              //     pathname: "/topics",
              //     query: { 
              //       category_id: category.id
              //     }
              //   }
              // )}
            >
              {category.name}
            </Chip>
            )}
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
  }
}
