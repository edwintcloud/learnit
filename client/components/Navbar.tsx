import styled from "styled-components";

interface Props {
  cols?: string
}

export default styled.div<Props>`
  display: grid;
  ${props => props.cols && `grid-template-columns: ${props.cols};`}
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 2%, 0.1);
  height: 80px;
  width: 100vw;
  z-index: 1000;
`;
