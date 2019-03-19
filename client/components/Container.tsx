import styled from "styled-components";

interface Props {
    rows?: string
    cols?: string
    padding?: string
    margin?: string
}

export default styled.div<Props>`
  display: grid;
  ${props => props.rows && `grid-template-rows: ${props.rows};`}
  ${props => props.cols && `grid-template-columns: ${props.cols};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.margin && `margin: ${props.margin};`}
`;