import styled from "styled-components";

interface Props {
  justify?: string
  margin?: string
}

export default styled.div<Props>`
  display: flex;
  width: 98vw;
  max-width: 800px;
  flex-wrap: wrap;
  ${props => props.justify && `justify-self: ${props.justify};`}
  @media (max-width: 768px) {
    justify-content: center;
    margin: 0;
  }
  ${props => props.margin && `margin: ${props.margin};`}
`;
