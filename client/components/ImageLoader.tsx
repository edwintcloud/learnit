import styled from "styled-components";

export default styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -90;
  top: 0;
  left: 0;
  img {
      opacity: 0;
      transition: opacity 0.1s ease-out;
  }
`;