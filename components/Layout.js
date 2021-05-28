import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children, keywords, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to My Dev Space",
  keywords: "development, coding, programming",
  description: "Awesome blog about developing!",
};
