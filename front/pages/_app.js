import Layout from "../components/layout";
import "../styles/globals.scss";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <title>To Do List App</title>
        <meta name="description" content="Simple to do list" />

        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
