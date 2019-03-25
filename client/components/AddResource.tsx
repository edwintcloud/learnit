import React from "react";
import { Field, Input, styled, Grid, Button } from "reakit";
import { Text } from "./";

interface ValidationProps {
  errored?: boolean;
  onClick?: any
}

const ValidationInput = styled(Input)<ValidationProps>`
  border: 1px solid #d8dcde;
  border-radius: 3px;
  transition: border-color 0.25s ease-in-out, box-shadow 0.1s ease-in-out,
    background-color 0.25s ease-in-out, color 0.25s ease-in-out;
  :focus {
    outline: none;
    border-color: #1f73b7;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }
  ${(props: any) =>
    props.errored &&
    `
          color: #e35b66;
          border-color: #e35b66; 
          :focus {
            border-color: #e35b66; 
            box-shadow: 0 0 0 3px rgba(204, 51, 64, .35);
          }
        `}
`;

const ValidationMessage = styled.div`
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' color='%23CC3340'%3E%3Cg fill='none' stroke='currentColor'%3E%3Ccircle cx='7.5' cy='8.5' r='7'/%3E%3Cpath stroke-linecap='round' d='M7.5 4.5V9'/%3E%3C/g%3E%3Ccircle cx='7.5' cy='12' r='1' fill='currentColor'/%3E%3C/svg%3E");
  color: #cc3340 !important;
  background-repeat: no-repeat;
  background-position: 0;
  padding-left: 20px;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.33333;
  color: #49545c;
  font-size: 12px;
`;

interface Props {}

export default class extends React.Component<Props> {
  state = {};

  onChange = (e: any) => {
    this.setState({[e.target.name]:e.target.value});
  }

  onClick = async () => {
    await this.props.onClick(this.state, this.props.overlay);
    this.setState({
      description: "",
      link: ""
    });
  }

  render() {
    return (
      <Grid backgroundColor="white" gap={15}>
        <Text
          margin="0"
          size="28px"
          color="rgba(73, 73, 73, 1)"
          weight="800"
        >
          Add a Resource
        </Text>
        <Field>
          <ValidationInput
            placeholder="Description"
            type="text"
            errored={this.state.descriptionError}
            onChange={this.onChange}
            value={this.state.description}
            name="description"
            use="textarea"
            width={300}
            padding={10}
            height={70}
          />
          {this.state.descriptionError && (
            <ValidationMessage>There was an error!</ValidationMessage>
          )}
        </Field>
        <Field>
          <ValidationInput
            placeholder="Link"
            type="text"
            errored={this.state.linkError}
            onChange={this.onChange}
            value={this.state.link}
            name="link"
          />
          {this.state.linkError && (
            <ValidationMessage>There was an error!</ValidationMessage>
          )}
        </Field>
        <Button backgroundColor="rgb(51, 51, 102)" onClick={this.onClick}>
          Add
        </Button>
      </Grid>
    );
  }
}
