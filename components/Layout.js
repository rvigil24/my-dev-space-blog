import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

export default function Layout({ title, children, keywords, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to My Dev Space",
  keywords: "development, coding, programming",
  description: "Awesome blog about developing!",
};
