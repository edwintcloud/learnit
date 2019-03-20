import styled from "styled-components";

const Box = styled.div`
  width: 300px;
  height: 80px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.5);
  background-color: hsla(0, 0%, 100%, 0.8);
  border-radius: 3px;
  display: grid;
  grid-template-columns: min-content 1fr;
  justify-items: center;
  margin: 5px 30px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 3px 0 0 3px;
`;

const Text = styled.p`
  ${(props: any) => props.margin && `margin: ${props.margin};`}
  overflow: hidden;
  margin: 5px;
`;

const TextBox = styled.div`
  display: grid;
  height: 80px;
  margin: 0;
  font-size: 1em;
  overflow-y: hidden;
  -webkit-box-shadow: -2px 0px 8px -2px rgba(255,255,255,1);
  -moz-box-shadow: -2px 0px 8px -2px rgba(255,255,255,1);
  box-shadow: -2px 0px 8px -2px rgba(255,255,255,1);
`;


export default (props: any) => (
  <Box {...props}>
    <Image src={props.imgSrc} />
    <TextBox>
      <Text {...props} margin="0"><strong>{props.title}</strong></Text>
      <Text {...props} margin="0">{props.text}</Text>
    </TextBox>
  </Box>
)