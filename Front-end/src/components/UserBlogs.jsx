import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog.jsx'
const UserBlogs = () => {
  const id = localStorage.getItem('userId')
  const [userBlogs,setUserBlogs] = useState()
  const sendRequest = async()=>{
    const res = await axios.get(`http://localhost:3000/api/blogs/user/${id}`).catch(e=>console.log(e))
    const blogs = res.data
    setUserBlogs(blogs.user.blogs)
    return blogs
  }
  useEffect(()=>{
    sendRequest()
  },[])
  return (
    <div>
      {userBlogs &&
        userBlogs.map((blog, i) => (
          <Blog
            key={i}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            isUser={true}
            blogId={blog._id}
          />
        ))}
    </div>
  );
}

export default UserBlogs