import fs from "fs";
import path from "path";
import * as matter from "gray-matter";

//utils
import { getPosts } from "@/lib/post";

//components
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";

export default function CategoryNamePage({ posts, category, categories }) {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-4">
        {/* category list */}
        <div className="col-span-1">
          <CategoryList categories={categories} />
        </div>

        {/* posts */}
        <div className="col-span-4">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {category}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
          </div>
        </div>
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

  const posts = getPosts();

  //categories list
  const categoriesList = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categoriesList)];

  //filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      category: category_name,
      categories: uniqueCategories,
    },
  };
}
