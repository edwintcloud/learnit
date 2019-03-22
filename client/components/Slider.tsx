import styled from "styled-components";

interface Props {
 
}

export default styled.div<Props>`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    position: absolute;
    animation: slide-in .5s forwards;
    width: 96vw;
    margin-left: 2vw;
    margin-right: 2vw;
    overflow: hidden;
    margin-top: 80px;
    transform: translateY(100%);
    @keyframes slide-in {
        from {
            
        }
        to {
            transform: translateY(0%);
           
        }
    }
`;