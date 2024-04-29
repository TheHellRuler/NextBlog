"use client"
import fetchBlog,{blog} from '@/utils/blog';
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
    };
    fetchData();
  }, []);
  const filteredBlogs = Blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase())
);
  const Goto = (slug:string) => {
    window.location.href = `/blog?id=${slug}`;
  }
  return (
    <>
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
        {loading ? (<p>Fetching Blogs.Please Wait.</p>):(<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6" >
          {filteredBlogs.map((blog) => (
            <div key={blog.slug} className="bg-white rounded shadow-md overflow-hidden" onClick={()=>{Goto(blog.slug)}}>
              <img src={blog.urlToImage} alt={blog.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600">{blog.description}</p>
               { /*<Link href={`/blog?id=${blog.slug}`} className="text-blue-500 hover:underline">Read more
                </Link>*/}
              </div>
            </div>
          ))}
        </div>)}
      </div>
    </>
  );
};


