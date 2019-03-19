import App from "next/app";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { title } from "./_document";
import Provider from "../components/Context";

// Any global CSS variables and selectors we want
const GlobalStyle = createGlobalStyle`
  :root {
   --padding: 2rem;
   --max-width: 50rem;
  }
  body, html {
    height: 100%;
    font-family: 'PT Sans', sans-serif;
    margin: 0;
    overflow-x: hidden;
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

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Provider>
          <Component {...pageProps} router={router} />
          <GlobalStyle />
        </Provider>
      </>
    );
  }
}
