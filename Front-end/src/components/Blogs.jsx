import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'

const Blogs = () => {
  const [blogs,setBlogs]= useState()
  const sendRequest = async()=>{
    const blogs = await axios
      .get("http://localhost:3000/api/blogs")
      .catch(e=>console.log(e))
      const data = await blogs.data
      return data
  }


  useEffect(()=>{
    sendRequest().then((data)=>setBlogs(data.blogs))
  },[])
  return (
    <div>{
      blogs && blogs.map((blog,i)=>(
        <Blog key={i}
        blogId={blog._id}
        isUser={localStorage.getItem("userId")===blog.user._id}
        title={blog.title}
        description= {blog.description}
        image={blog.image}
        userName={blog.user.name}/>
      ))
      }
    </div>
  );
}

export default Blogs