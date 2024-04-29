
export interface blog {
    slug: string,
    title: string,
    description: string,
    content: string,
    urlToImage: string,
}
//To-Do implement caching
export default async function fetchBlogs(){
    try {
      const response = await fetch('https://raw.githubusercontent.com/darkphoenix2704/json-host/main/news.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
