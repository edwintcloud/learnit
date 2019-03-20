import styled from "styled-components";

const Box = styled.div`
  width: 300px;
  height: 50px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.5);
  background-color: hsla(0, 0%, 100%, 0.8);
  border-radius: 3px;
  display: grid;
  grid-template-columns: 50px 1fr;
  justify-items: center;
  margin: 5px 30px;
`;

const Image = styled.img`
  height: 102%;
  width: 50px;
  object-fit: cover;
  border-radius: 3px 0 0 3px;
`;

const Text = styled.p`
  margin: 0;
  padding: 3px;
  font-size: .8em;
  overflow: hidden;
  -webkit-box-shadow: -2px 0px 8px -2px rgba(255,255,255,1);
  -moz-box-shadow: -2px 0px 8px -2px rgba(255,255,255,1);
  box-shadow: -2px 0px 8px -2px rgba(255,255,255,1);
`;


export default (props: any) => (
  <Box {...props}>
    <Image src={props.imgSrc} />
    <Text>{props.text}</Text>
  </Box>
)