import React from "react";
import fetch from "isomorphic-unfetch";

const INITIAL_STATE = {};

export const Context = React.createContext(INITIAL_STATE);

export default class Provider extends React.Component {
  state = INITIAL_STATE;

  actions = {
    updateState: (name: any, value: any) => {
      this.setState({ [name]: value });
    },
    getResource: async (name: string, url: string) => {
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}${url}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        this.setState({[name]: data});
        // persist to local storage
        localStorage.setItem(name, JSON.stringify(data));
      } catch(err) {
        console.log(err);
        // if network fails, attempt to load from local storage
        const data = localStorage.getItem(name);
        if (data != null) {
          this.setState({[name]: JSON.parse(data)});
          console.log("Data was loaded from local storage.");
        }
      }
      
    },
    postResource: async (name: any, url: string, postData: any) => {
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}${url}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
          },
            body: JSON.stringify(postData)
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        this.setState({[name]: data});
        // persist to local storage
        localStorage.setItem(name, JSON.stringify(data));
      } catch(err) {
        console.log(err);
        // if network fails, attempt to load from local storage
        const data = localStorage.getItem(name);
        if (data != null) {
          this.setState({[name]: JSON.parse(data)});
          console.log("Data was loaded from local storage.");
        }
      }    
    },
    getUser: async () => {
        const data = localStorage.getItem("user");
        if (data != null) {
          this.setState({user: JSON.parse(data)});
          console.log("User was loaded from local storage.");
        }  
    },
    addResource: (resource: any) => {
      this.setState({
        resources: [
          ...this.state.resources,
          {
            ...resource,
            user: {
              ...this.state.user
            }
          }
        ]
      });
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
