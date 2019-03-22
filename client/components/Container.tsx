import styled from "styled-components";

interface Props {
  rows?: string;
  cols?: string;
  padding?: string;
  margin?: string;
  height?: string;
  overflow?: string
  direction?: string
  gap?: string
  width?: string
  align?: string
  justify?: string
  reactive?: string
  maxWidth?: string
}

export default styled.div<Props>`
  display: grid;
  ${props => props.rows && `grid-template-rows: ${props.rows};`}
  ${props => props.cols && `grid-template-columns: ${props.cols};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.overflow && `overflow-y: auto;`}
  ${props => props.direction && `grid-auto-flow: ${props.direction};`}
  ${props => props.gap && `grid-gap: ${props.gap};`}
  ${props => props.align && `align-self: ${props.align};`}
  ${props => props.justify && `justify-self: ${props.justify};`}
  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
  ${props => props.reactive && `
    @media (max-width: 768px) {
      ${props.rows && `
        grid-template-columns: ${props.rows};
        grid-template-rows: unset;
      ` || `
        grid-template-rows: ${props.cols};
        grid-template-columns: unset;
      `}
    }
  `}
`;
