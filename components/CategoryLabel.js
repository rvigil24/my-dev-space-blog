import Link from "next/link";

export default function CategoryLabel({ category }) {
  const colorKey = {
    JavaScript: "yellow",
    Ruby: "red",
    Python: "green",
    PHP: "purple",
    CSS: "blue",
  };

  return (
    <div
      style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
      className={`text-xs px-3 bg-${colorKey[category]}-200 text-${colorKey[category]}-800 rounded-full`}
    >
      <Link href={`/blog/category/${category.toLowerCase()}`}>
        <a>{category}</a>
      </Link>
    </div>
  );
}
