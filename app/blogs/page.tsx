"use client"
import fetchBlog,{blog} from '@/utils/blog';
import { log } from 'console';
import { useState,useEffect } from 'react';


export default function BlogsPage(){
  const [searchTerm, setSearchTerm] = useState('');
  const [Blogs, setBlogs] = useState<blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlog();
      setBlogs(data);
      setLoading(false);
      data.map((Blog:blog) => {
        if(localStorage.getItem(Blog.slug)===null){
          localStorage.setItem(Blog.slug,"true")
        }

      })
    };
    fetchData();
  }, []);
  const filteredBlogs = Blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase())
);
  const Goto = (slug:string) => {
    localStorage.setItem(slug,"false")
    window.location.href = `/blog?id=${slug}`;
  }

  const checkNew = (id:string) =>{
    const data = localStorage.getItem(id)
    if(data==="false"){
      return false
    }else{
      return true
    }
  }
  return (
  <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
        <input
          type="text"
          placeholder="Search blogs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      {loading ? (<p>Fetching Blogs. Please Wait.</p>) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.slug} className="bg-white rounded shadow-md overflow-hidden" onClick={() => { Goto(blog.slug) }}>
              <img src={blog.urlToImage} alt={blog.title} className="w-full h-32 object-cover" />
              <div className="relative p-4">
                {checkNew(blog.slug)?(<img src="/new.png" alt="New" className="absolute top-0 left-0" style={{ width: '50px', height: 'auto', filter: 'invert(80%) sepia(100%) saturate(10000%) hue-rotate(200deg) brightness(100%) contrast(100%)' }} />):null}
                <div className="mt-4">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600">{blog.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


