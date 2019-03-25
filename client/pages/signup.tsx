// import fetch from "isomorphic-unfetch";
import React from "react";
import { Context, Text } from "../components";
import {
  styled,
  Grid,
  Label,
  Button,
  Input,
  Field,
  Provider,
  InlineFlex
} from "reakit";
import defaultTheme from "reakit-theme-default";
import GoogleLogin from "react-google-login";
import isEmail from "validator/lib/isEmail";

const GridBox = styled(Grid)`
  margin-top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  & > div {
    width: 500px;
    padding: 30px;
    margin-bottom: 20vh;
  }
  @media (max-width: 960px) {
    min-height: calc(100vh - 180px);
    & > div {
      width: 100vw;
      padding: 20px;
      margin-bottom: unset;
    }
  }
`;

interface ValidationProps {
  errored?: boolean;
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

const Form = styled(Grid)``;

interface GoogleButtonProps {
  clientId?: string | undefined;
}

const GoogleButton = styled(GoogleLogin)<GoogleButtonProps>`
  justify-content: center;
  font-size: inherit !important;
  & > div {
    padding-top: 14px !important;
  }
`;

const Divider = styled.div`
  text-align: center;
  overflow: hidden;

  & > span {
    padding: 16px;
    position: relative;
    color: rgb(118, 118, 118);

    :before,
    :after {
      border-bottom: 1px solid #e4e4e4;
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      width: 100vw;
    }

    :after {
      right: unset;
      left: 100%;
    }
  }
`;

interface Props {
  router?: any;
}

export default class extends React.Component<Props> {
  static contextType = Context;

  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    first_nameError: false,
    last_nameError: false,
    emailError: false,
    passwordError: false,
    confirm_passwordError: false
  };

  async componentDidMount() {
    console.log(this.props)
  }

  googleSignin = async (res: any) => {
    console.log(res.profileObj);
    const { email, familyName, givenName, googleId } = res.profileObj;
    await this.context.postResource("user", "/api/v1/users/create", {
      first_name: givenName,
      last_name: familyName,
      email: email,
      password: googleId
    });
    console.log(JSON.stringify(this.state));
    this.props.router.push("/");
  };

  onChange = (e: any) => {
    if (e.target.name === "confirm_password") {
      if (e.target.value !== this.state.password) {
        this.setState({ confirm_passwordError: true });
      } else {
        this.setState({ confirm_passwordError: false });
      }
    } else {
      this.setState({ confirm_passwordError: false });
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 6) {
        this.setState({ passwordError: true });
      } else {
        this.setState({ passwordError: false });
      }
    } else {
      this.setState({ passwordError: false });
    }
    this.setState({
      [e.target.name]: e.target.value,
      first_nameError: false,
      last_nameError: false,
      emailError: false
    });
  };

  onSubmit = async () => {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = this.state;
    let errors = false;

    if (first_name.length < 3) {
      errors = true;
      this.setState({ first_nameError: true });
    }
    if (last_name.length < 3) {
      errors = true;
      this.setState({ last_nameError: true });
    }
    if (!isEmail(email)) {
      errors = true;
      this.setState({ emailError: true });
    }
    if (password.length < 6) {
      errors = true;
      this.setState({ passwordError: true });
    }
    if (confirm_password !== password || confirm_password === "") {
      errors = true;
      this.setState({ confirm_passwordError: true });
    }

    if (!errors) {
      await this.context.postResource(
        "user",
        "/api/v1/users/create",
        this.state
      );
      console.log(JSON.stringify(this.state));
      this.props.router.push("/");
    }
  };

  render() {
    return (
      <Provider theme={defaultTheme}>
        <GridBox>
          <Grid templateRows="min-content min-content">
            <Text
              margin="30px"
              size="38px"
              color="rgba(73, 73, 73, 1)"
              weight="800"
              align="center"
              justify="center"
            >
              Signup
            </Text>
            <Form
              templateRows="min-content min-content min-content min-content min-content min-content"
              gap={10}
            >
              <Field>
                <ValidationInput
                  placeholder="First Name"
                  type="text"
                  errored={this.state.first_nameError}
                  onChange={this.onChange}
                  value={this.state.first_name}
                  name="first_name"
                />
                {this.state.first_nameError && (
                  <ValidationMessage>
                    Names must be at least 3 characters!
                  </ValidationMessage>
                )}
              </Field>
              <Field>
                <ValidationInput
                  placeholder="Last Name"
                  type="text"
                  errored={this.state.last_nameError}
                  onChange={this.onChange}
                  value={this.state.last_name}
                  name="last_name"
                />
                {this.state.last_nameError && (
                  <ValidationMessage>
                    Names must be at least 3 characters!
                  </ValidationMessage>
                )}
              </Field>
              <Field>
                <ValidationInput
                  placeholder="Email Address"
                  type="email"
                  errored={this.state.emailError}
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                />
                {this.state.emailError && (
                  <ValidationMessage>
                    Please enter a valid email!
                  </ValidationMessage>
                )}
              </Field>
              <Field>
                <ValidationInput
                  placeholder="Enter Password"
                  errored={this.state.passwordError}
                  onChange={this.onChange}
                  value={this.state.password}
                  name="password"
                  type="password"
                />
                {this.state.passwordError && (
                  <ValidationMessage>
                    Passwords must be at least 6 characters!
                  </ValidationMessage>
                )}
              </Field>
              <Field>
                <ValidationInput
                  placeholder="Confirm Password"
                  errored={this.state.confirm_passwordError}
                  onChange={this.onChange}
                  value={this.state.confirm_password}
                  name="confirm_password"
                  type="password"
                />
                {this.state.confirm_passwordError && (
                  <ValidationMessage>Passwords must match!</ValidationMessage>
                )}
              </Field>
              <Grid marginTop={20} gap={15}>
                <Button
                  backgroundColor="rgb(51, 51, 102)"
                  onClick={this.onSubmit}
                >
                  Create Account
                </Button>
                <Divider>
                  <span>or</span>
                </Divider>
                <GoogleButton
                  clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
                  uxMode="redirect"
                  buttonText="Sign in With Google"
                  onSuccess={this.googleSignin}
                  onFailure={(err: any) => console.log(err)}
                  className="button"
                  isSignedIn={true}
                />
              </Grid>
            </Form>
          </Grid>
        </GridBox>
      </Provider>
    );
  }
}
