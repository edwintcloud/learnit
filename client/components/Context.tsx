import React from "react";

const INITIAL_STATE = {
  topics: [
    {
      id: 1,
      name: "Topic1",
      description: "test1"
    },
    {
      id: 2,
      name: "Topic1",
      description: "test1"
    },
    {
      id: 3,
      name: "Topic1",
      description: "test1"
    },
    {
      id: 4,
      name: "Topic1",
      description: "test1"
    }
  ]
};

const Context = React.createContext(INITIAL_STATE);

export default class Provider extends React.Component {
  state = INITIAL_STATE;

  actions = {
    updateState: (name: any, value: any) => {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          ...this.actions
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
