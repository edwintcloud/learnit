import styled from "styled-components";

interface Props {
    padding?: string
    margin?: string
}

export default styled.img<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: stretch;
  z-index: -100;
  @media (max-width: 768px) {
    object-fit: cover;
  }
`;