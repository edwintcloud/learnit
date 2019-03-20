import styled from "styled-components";

interface Props {
  justify?: string
  margin?: string
  maxWidth?: string
}

export default styled.div<Props>`
  display: flex;
  width: 98vw;
  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}

  flex-wrap: wrap;
  ${props => props.justify && `justify-self: ${props.justify};`}
  @media (max-width: 768px) {
    justify-content: center;
    margin: 0;
  }
  ${props => props.margin && `margin: ${props.margin};`}
`;
