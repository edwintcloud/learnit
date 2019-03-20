import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 2%, 0.5);
  height: 80px;
  width: 100vw;
  -webkit-box-shadow: 0px 2px 20px -1px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 2px 20px -1px rgba(0, 0, 0, 1);
  box-shadow: 0px 2px 20px -1px rgba(0, 0, 0, 1);
`;
