"use client"
//page for detailed blog
import fetchBlog,{blog} from '@/utils/blog'
import { redirect, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState,useEffect } from 'react'
export default function Page() {
  const params = useSearchParams()
  const [Blogs, setBlogs] = useState<blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlog();
      setBlogs(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const id = params.get('id') || '' //Get blog slug from url parameter
  const blog = Blogs.find((blog) => blog.slug === id) as blog
  if (blog === undefined && !loading) {
    redirect('/blogs')
  }
  return (
    <div className="container mx-auto py-8 relative">
      {loading ? (
        <p>Loading.. Please Wait</p>
      ) : (
        <div className="mx-auto flex flex-col lg:flex-row items-start">
          {/* Home Button */}
          <Link href="/blogs">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ position: 'absolute', top: '1rem', left: '.5rem' }}>
                Home
              </button>
              </Link>
          <img src={blog.urlToImage} alt={blog.title} className="w-full lg:w-3/5 h-auto rounded-lg mb-8 lg:mr-12 lg:mb-0" style={{ marginTop: '3rem' }} />
          <div className="lg:w-3/5">
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-600 mt-4 text-lg">{blog.description}</p>
            <p className="text-gray-600 mt-4">{blog.content}</p>
          </div>
        </div>
      )}
    </div>
    )
  }
