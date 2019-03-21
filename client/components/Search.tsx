import styled from "styled-components";

const Label = styled.label`
  position: relative;
  display: grid;
  :before {
    content: "";
    position: absolute;
    left: 10px;
    top: 12px;
    bottom: 0;
    width: 30px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='hsla(0, 0%, 100%, 0.8)'%3E%3Cpath d='m2.5 7c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5m13.1 6.9-2.8-2.9c.7-1.1 1.2-2.5 1.2-4 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.5 0 2.9-.5 4-1.2l2.9 2.8c.2.3.5.4.9.4.3 0 .6-.1.8-.4.5-.5.5-1.2 0-1.7'%3E%3C/path%3E%3C/svg%3E")
      center / contain no-repeat;
  }
`;

const Input = styled.input`
  padding: 10px 14px 10px 40px;
  font-size: 1.2em;
  background-color: hsla(0, 0%, 0%, 0);
  color: rgba(255, 255, 255, 0.9);
  border: none;
  align-self: center;
  margin-top: 3px;
  justify-self: start;
  @media (max-width: 768px) {
    max-width: 40vw;
  }
`;

export default (props: any) => (
  <Label {...props}>
    <Input {...props} placeholder="Search topics..." />
  </Label>
);
