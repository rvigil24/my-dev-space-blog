import Layout from "../../components/Layout";

export default function BlogPage({ posts }) {
  console.log(posts);
  return (
    <Layout title="Blog">
      <h1>Blog</h1>
    </Layout>
  );
}
