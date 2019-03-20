import styled from "styled-components";

interface Props {
    size?: string
    underline?: any
    margin?: string
}

export default styled.h1<Props>`
  color: rgba(255, 255, 255, 0.8);
  ${props => props.size && `font-size: ${props.size};`}
  ${props => props.underline && `text-decoration: underline;`}
  ${props => props.margin && `margin: ${props.margin};`}
  font-weight: 300;
`;
