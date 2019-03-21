import styled from "styled-components";

interface Props {
    size?: string
    underline?: any
    margin?: string
    color?: string
    weight?: string
    align?: string
    truncate?: string
}

export default styled.h1<Props>`
  ${props => props.color && `color: ${props.color};`}
  ${props => props.weight && `font-weight: ${props.weight};`}
  ${props => props.size && `font-size: ${props.size};`}
  ${props => props.underline && `text-decoration: underline;`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.align && `align-self: ${props.align};`}
  ${props => props.truncate && `
    overflow: hidden;
    :after {
        content: "\\02026";  

        box-sizing: content-box;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;

        float: right; 
        position: relative;
        top: -25px; 
        left: 100%; 
        width: 3em; 
        margin-left: -3em;
        padding-right: 5px;
        
        text-align: right;
    }
  `}
`;
