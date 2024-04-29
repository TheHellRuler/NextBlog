import RootLayout from "./layout"
import Link from "next/link"
export default function Home() {
  return (
    <RootLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
          <p className="text-lg mb-8">Discover insightful articles and stories written by our team of experts.</p>
          <Link href="/blogs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Explore Blogs
          </Link>
        </div>
      </div>
    </RootLayout>
)}
