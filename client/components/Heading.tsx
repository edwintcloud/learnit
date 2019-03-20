import styled from "styled-components";


export default styled.h1`
  color: rgba(255, 255, 255, 0.8);
  font-size: 4em;
  align-self: center;
  justify-self: center;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 3em;
  }

  @media (max-width: 980px) {
    font-size: 3.4em;
  }
`;
