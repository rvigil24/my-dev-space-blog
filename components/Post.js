import Image from "next/image";
import Link from "next/link";
import * as matter from "gray-matter";

//components
import CategoryLabel from "./CategoryLabel";

export default function Post({ post }) {
  const { frontmatter: data } = post;
  const { cover_image, title, date, category, slug, excerpt } = data;
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {/* thumbnail */}
      <Image
        src={cover_image}
        alt={title}
        className="mb-4 rounded"
        height={420}
        width={600}
      />

      {/* details */}
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{date}</span>
        <div>
          <CategoryLabel category={category} />
        </div>
      </div>

      {/* slug */}
      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{excerpt}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>
        <div className="flex items-center">
          <img
            src={post.frontmatter.author_image}
            alt=""
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          />
          <h3 className="text-gray-700 font-bold">{post.frontmatter.author}</h3>
        </div>
      </div>
    </div>
  );
}
