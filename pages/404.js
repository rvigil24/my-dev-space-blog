import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="page not found">
      <div className="flex flex-col items-center mt-20">
        <Image
          className="bg-gray-800 rounded-2xl"
          src="https://res.cloudinary.com/dfrcck8j7/image/upload/v1622156821/my-dev-space-blog/logo_wkltsp.png"
          width={70}
          height={70}
        />

        <h1 className="text-6xl my-5">Error!</h1>
        <h2 className="text-4xl text-gray-400 mb-5">
          This page does not exist
        </h2>
      </div>
    </Layout>
  );
}
