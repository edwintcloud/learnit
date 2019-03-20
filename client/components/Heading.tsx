import styled from "styled-components";


export default styled.h1`
  color: rgba(255, 255, 255, 0.8);
  font-size: 4em;
  font-weight: 300;
  align-self: center;
  justify-self: center;
  text-align: center;
  margin-top: 20vh;
  margin-bottom: 50px;

  @media (max-width: 980px) {
    font-size: 3.4em;
    margin: 15vh 5px 50px 5px;
  }

  @media (max-width: 700px) {
    font-size: 3em;
    margin: 10vh 5px 50px 5px;
  }
`;
