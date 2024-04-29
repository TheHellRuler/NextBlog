"use client"
//page for detailed blog
import fetchBlog,{blog} from '@/utils/blog'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default async function Page() {
  const params = useSearchParams()
  const Blogs = await fetchBlog() as blog[]
  const id = params.get('id') || '' //Get blog slug from url parameter
  const blog = Blogs.find((blog) => blog.slug === id)
  if (blog === undefined) {
    return(<p>Okda</p>)
  }
  return (
      <div className="container mx-auto py-8">
        <div className=" mx-auto flex flex-col lg:flex-row items-center">
          <img src={blog.urlToImage} alt={blog.title} className="w-full lg:w-3/5 h-auto rounded-lg mb-8 lg:mr-12 lg:mb-0" />
          <div className="lg:w-3/5">
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-600 mt-4 text-lg">{blog.description}</p>
            <p className="text-gray-600 mt-4">{blog.content}</p>
          </div>
        </div>
      </div>
    )
  }