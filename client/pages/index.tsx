import React from "react";
import { Text, Chip, ChipBox, Heading, Context } from "../components";
import { Grid } from "reakit";
import Link from "next/link";
import { Dots } from "@zendeskgarden/react-loaders";

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
    this.setPosterLoader();
    await this.context.getResource("categories", "/api/v1/categories");
    this.context.updateState("topicsAnimate", true);
    this.context.getUser();
  }

  render() {
    return (
      <Grid
        templateRows="min-content min-content 1fr"
        style={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}
      >
        <Heading>What Would You Like to Learn?</Heading>
        <ChipBox justify="center" maxWidth="800px">
          {this.context.categories &&
            this.context.categories.map((category: any, index: any) => (
              <Link
                prefetch
                key={index}
                href={{
                  pathname: "/topics",
                  query: {
                    category_id: category.id
                  }
                }}
              >
                <Chip as="a">
                  {category.name}
                </Chip>
              </Link>
            )) || <Dots size="40px" color="rgba(255, 255, 255, 0.8)" />}
        </ChipBox>

        <Text as="p" margin="30px" color="rgba(255, 255, 255, 0.8)" align="end">
          Copyright &copy; 2019 Learnit
        </Text>
      </Grid>
    );
  }
}
