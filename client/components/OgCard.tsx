import styled from "styled-components";
import { Text, Container } from "./";

const Box = styled.div`
  border-radius: 3px;
  display: grid;
  height: 80px;
  grid-template-columns: 40px 1fr min-content;
  justify-items: center;
  margin: 5px 30px;
  align-items: center;
  grid-gap: 20px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Image = styled.img`
  height: 80px;
  width: 100px;
  object-fit: cover;
  border-radius: 3px;

  box-sizing: border-box;
`;

const TextBox = styled.div`
  justify-self: start;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: min-content;
  width: min-content;
  overflow: hidden;
  margin-right: 10px;
`;

const Icon = styled.svg`
  width: 22px;
  display: block;
  height: 22px;
  :hover {
    cursor: pointer;
  }
`;

export default (props: any) => (
  <Box {...props}>
    <Container rows="repeat(3, min-content)" gap="5px">
      <Icon viewBox="0 0 22 22">
        <path d="M2 20h18L11 5z" fill="#bbc0c4" />
      </Icon>
      <Text
        as="p"
        size="12px"
        margin="0"
        color="hsl(207, 7%, 45%)"
        weight="600"
        align="center"
        justify="center"
      >
        {Number(props.up_votes) - Number(props.down_votes)}
      </Text>
      <Icon viewBox="0 0 22 22" style={{}}>
        <path d="M2 5h18L11 20z" fill="#bbc0c4" transform="translate(0, -5)" />
      </Icon>
    </Container>
    <TextBox>
      <Container cols="1fr 1fr" gap="10px">
        <Text
          as="p"
          size="18px"
          margin="0"
          color="rgba(73, 73, 73, 1)"
          weight="400"
          align="center"
          justify="end"
        >
          Link:
        </Text>
        <Text
          as="a"
          size="17px"
          color="rgba(73, 73, 73, 1)"
          weight="500"
          hover="underline"
          justify="end"
          style={{
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
          onClick={() => window.open(props.link, '_blank')}
        >
          {props.link}
        </Text>
      </Container>
      {props.coupon && (
        <Container cols="1fr 1fr" gap="15px">
          <Text
            as="p"
            size="18px"
            margin="0"
            color="rgba(73, 73, 73, 1)"
            weight="400"
            align="center"
            justify="start"
          >
            Coupon:
          </Text>
          <Text
            as="a"
            size="17px"
            color="rgba(73, 73, 73, 1)"
            weight="500"
            hover="underline"
            justify="end"
          >
            {props.coupon}
          </Text>
        </Container>
      )}
    </TextBox>
    {(props.imgSrc && <Image src={props.imgSrc} />) || (
      <Image src="static/img/notfound.jpg" />
    )}
  </Box>
);
