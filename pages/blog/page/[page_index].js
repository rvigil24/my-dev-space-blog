import fs from "fs";
import path from "path";

//utils
import { getPosts } from "@/lib/post";
import { POSTS_PER_PAGE } from "@/config/index";

//components
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
import Pagination from "@/components/Pagination";

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-4">
        {/* category list */}
        <div className="col-span-1">
          <CategoryList categories={categories} />
        </div>

        {/* posts */}
        <div className="col-span-4">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
          </div>
        </div>
      </div>

      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);
  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts();
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  //categories list
  const categoriesList = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categoriesList)];

  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
