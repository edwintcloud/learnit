import styled from "styled-components";

const Select = styled.select`
  min-width: 100px;
  width: min-content;
  padding: 5px 10px;
  font-size: 1em;
  font-family: inherit;
  box-sizing: border-box;
  cursor: pointer;

  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(73, 73, 73, 1);
  :focus {
    outline: none;
  }
`;

const Option = styled.option`

`;

export default (props: any) => (
  <Select defaultValue={props.defaultValue}>
    {props.values && props.values.map((value: any, index: any) => 
      <Option key={index} value={value}>{value}</Option>  
    )}
  </Select>
)