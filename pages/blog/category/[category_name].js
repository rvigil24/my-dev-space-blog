import fs from "fs";
import path from "path";
import * as matter from "gray-matter";

//utils
import { sortByDate } from "@/utils/index";
import { POSTS_PER_PAGE } from "@/config/index";

//components
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";

export default function CategoryNamePage({ posts, category }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Posts in {category}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => {
    return {
      params: {
        category_name: category,
      },
    };
  });

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace("md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  //filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      category: category_name,
    },
  };
}
