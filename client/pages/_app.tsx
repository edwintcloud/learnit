import App from "next/app";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { title } from "./_document";
import Provider from "../components/Context";
import { Navbar, Navlink, ImageLoader, Poster, Logo, Consumer, Text } from "../components";
import Link from "next/link";

// Any global CSS variables and selectors we want
const GlobalStyle = createGlobalStyle`
  :root {
   --padding: 2rem;
   --max-width: 50rem;
  }
  body, html {
    height: 100%;
    margin: 0;
    overflow-x: hidden; 
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: rgba(73,73,73,1);
  }
  .loaded {
    opacity: 1!important;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx
  }: {
    Component: any;
    ctx: any;
  }): Promise<any> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  setPosterLoader() {
    const win: any = window;
    const img: any = window.document.getElementById("poster");
    const newImg = new win.Image();
    newImg.onload = () => {
      img.classList.add("loaded");
    };
    newImg.src = img.src;
  }

  logoutUser = () => {
    localStorage.removeItem("user");
    window.location.reload(); 
  };

  async componentDidMount() {
    this.setPosterLoader();
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Provider>
          <Consumer>
            {(context: any) => (
              <Navbar cols="1fr min-content min-content">
              <Link prefetch href="/">
                <Navlink align="left" size="2em" padding="0 30px" cols="40px 1fr">
                  <Logo src="static/img/logo1.png" alt="logo" />
                  Learnit
                </Navlink>
              </Link>
              {!context.user && (
                <>
                  <Link prefetch href="/signup">
                    <Navlink align="right" size="1.1em" padding="0 30px">
                      Signup
                    </Navlink>
                  </Link>
                  <Link prefetch href="/login">
                    <Navlink align="right" size="1.1em" padding="0 30px">
                      Login
                    </Navlink>
                  </Link>
                </>
              ) ||
              <> 
              <Text
                as="p"
                size="1.1em"
                color="rgba(255,255,255,0.9)"
                style={{alignSelf: 'center', whiteSpace: 'nowrap'}}
                margin="0 20px"
              ></Text>
                <Navlink align="right" size="1.1em" padding="0 30px" onClick={this.logoutUser}>
                      Logout
                </Navlink>
              </>}
            </Navbar>
            )}
          
          </Consumer>
          <ImageLoader style={{ backgroundColor: "#000" }}>
            <Poster id="poster" src="static/img/poster1.jpg" alt="poster" />
          </ImageLoader>
          <Component {...pageProps} router={router} />
          <GlobalStyle />
        </Provider>
      </>
    );
  }
}
