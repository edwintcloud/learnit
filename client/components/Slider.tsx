import styled from "styled-components";

interface Props {
  animated?: boolean;
}

export default styled.div<Props>`
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  width: 100vw;
  overflow: hidden;
  margin-top: 80px;
  
  ${props => props.animated && `
    transform: translateY(100%);
    animation: slide-in 0.7s ease-in-out forwards;
    @keyframes slide-in {
        from {
        }
        to {
        transform: translateY(0%);
        }
    }
  `}
  
`;