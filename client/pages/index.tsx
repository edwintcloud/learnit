import fetch from "isomorphic-unfetch";
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
  posts: any
  imgLoaded: any
  error?: any
  categories?: any
}

export default class extends React.Component<Props> {
  static contextType = Context;
  static async getInitialProps() {
    try {
      const fetchCategories = await fetch(
        `${process.env.BACKEND_URL}/api/v1/categories`
      );
      const categories = await fetchCategories.json();
      return {
        categories
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
    this.setPosterLoader();
    if (this.props.error) {
      console.log(this.props.error)
    }
    if (this.props.categories) {
      this.context.updateState("categories", this.props.categories);
    }
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
            {this.props.categories && this.props.categories.map((category: any, index: any) => 
            <Link href={{
              pathname: "/topics",
              query: { 
                category_id: category.id,
                category_name: category.name
              }
            }}>
              <Chip
              key={index}
              as="a"
            >
              {category.name}
            </Chip>
            </Link>
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
