import styled from "styled-components";
import { Text } from "./";

const Box = styled.div`
  border-radius: 3px;
  display: grid;
  height: 80px;
  grid-template-columns: min-content 1fr;
  justify-items: center;
  margin: 5px 30px;
  align-items: center;
  grid-gap: 10px;
  cursor: pointer;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  :hover {
    p:first-of-type {
      text-decoration: underline;
      text-decoration-color: rgb(75, 63, 101);
    }
  }

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
  overflow: hidden;
`;


export default (props: any) => (
  <Box {...props}>
    {props.img_url && 
      <Image src={props.img_url} />
    || <Image src="static/img/notfound.jpg" />}
    <TextBox>
      <Text 
        as="p"
        margin="0 10px 5px 0"
        size="16px"
        color="rgba(73, 73, 73, 1)"
        weight="600"
      >{props.name}</Text>
      <Text 
        as="p"
        margin="0 10px 0 0"
        size="14px"
        color="rgba(73, 73, 73, 1)"
        weight="300"
        truncate="yes"
      >{props.description}</Text>
    </TextBox>
  </Box>
)