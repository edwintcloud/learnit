import styled from "styled-components";

interface Props {
    align?: string
    size?: string
    padding?: string
    cols?: string
  }

export default styled.a<Props>`
  ${props => props.align && `justify-self: ${props.align};`}
  ${props => props.size && `font-size: ${props.size};`}
  align-self: center;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  cursor: pointer;
  height: 100%;
  display: grid;
  align-items: center;
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.cols && `grid-template-columns: ${props.cols};`}
  :hover {
      background-color: hsla(0, 0%, 2%, 0.6);
  }
`;