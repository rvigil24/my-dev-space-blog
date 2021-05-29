import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import marked from "marked";
import matter from "gray-matter";

//components
import Layout from "../../components/Layout";
import CategotyLabel from "../../components/CategoryLabel";

export default function PostPage({ frontmatter, content, slug }) {
  const { title, category, cover_image, date, author, excerpt, author_image } =
    frontmatter;

  return (
    <Layout title={title}>
      <Link href="/blog">
        <a>Go back</a>
      </Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          {/* title and category */}
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategotyLabel category={category} />
        </div>

        {/* cover image */}
        <img className="w-full rounded " src={cover_image} alt={title} />

        {/* author details */}
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center ">
            <img
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              alt={author}
              src={author_image}
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        {/* post content */}
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markDownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markDownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    }, // will be passed to the page component as props
  };
}
