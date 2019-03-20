import styled from "styled-components";

interface Props {
  
}

export default styled.div<Props>`
  display: flex;
  width: 98vw;
  max-width: 800px;
  flex-wrap: wrap;
  height: fit-content;
  justify-self: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
