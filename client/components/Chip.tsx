import styled from "styled-components";

interface Props {
    as?: string
    margin?: string
}

// Thank you Material-UI: ref -> https://material-ui.com/demos/chips/#chip
export default styled.div<Props>`
    color: rgba(255, 255, 255, 0.7);
    justify-self: center;
    width: fit-content;
    height: 32px;
    cursor: pointer;
    border: none;
    display: inline-flex;
    outline: none;
    padding: 0 30px;
    margin: 3px;
    font-size: 0.987rem;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-sizing: border-box;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    align-items: center;
    white-space: nowrap;
    border-radius: 16px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: hsla(246, 9%, 23%, 0.8);
    ${props => props.margin && `margin: ${props.margin};`}
    :hover {
        background-color: hsla(246, 9%, 25%, 0.9);
    }
`;