import styled from "styled-components";

interface Props {
  animated?: boolean;
}

export default styled.div<Props>`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: absolute;
  
  width: 96vw;
  margin-left: 2vw;
  margin-right: 2vw;
  overflow: hidden;
  margin-top: 80px;
  
  ${props => props.animated && `
    transform: translateY(100%);
    animation: slide-in 0.5s forwards;
    @keyframes slide-in {
        from {
        }
        to {
        transform: translateY(0%);
        }
    }
  `}
  
`;