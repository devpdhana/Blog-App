import Header from "./components/Header"
import React, { useEffect, useState } from "react"
import {Route, Routes} from 'react-router-dom'

import Login from './components/Login' 
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
function App() {
  const [isLoggedin,setIsLoggedin] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem("userId")){
      setIsLoggedin(!isLoggedin)
    }
  },[])
  return (
    <React.Fragment>
      <header>
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
      </header>
      <main>
        <Routes>
          <Route
            path="/auth"
            element={
              <Login isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
            }
          />
          {isLoggedin && (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myblogs" element={<UserBlogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App
