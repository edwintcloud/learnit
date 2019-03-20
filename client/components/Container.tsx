import styled from "styled-components";

interface Props {
  rows?: string;
  cols?: string;
  padding?: string;
  margin?: string;
  height?: string;
  overflow?: boolean
}

export default styled.div<Props>`
  display: grid;
  ${props => props.rows && `grid-template-rows: ${props.rows};`}
  ${props => props.cols && `grid-template-columns: ${props.cols};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.overflow && `overflow-y: auto;`}
`;
