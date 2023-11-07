import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const labelStyle = {mb:1,mt:2,fontSize:"23px",fontWeight:"bold"}
const BlogDetails = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const [inputs,setInputs] = useState({
    title:"",description:"",image:""
  })
  const fetchDetails = async()=>{
    const res = await axios.get(`http://localhost:3000/api/blogs/${id}`).catch(e=>console.log(e))
    const data = res.data.blog
    return data
  }
  
  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }
  useEffect(()=>{
    fetchDetails().then((data)=>setInputs(data))
  },[])

  const sendUpdateRequest = async()=>{
    const res = await axios.put(`http://localhost:3000/api/blogs/update/${id}`,{
      title:inputs.title,description:inputs.description,image:inputs.image
    }).catch(e=>console.log(e))
    const data = res.data
    return data
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    sendUpdateRequest().catch(e=>console.log(e))
    navigate('/myblogs')
  }
  return (
    <form onSubmit={handleSubmit}>
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      // alignItems={"center"}
      margin={"auto"}
      marginTop={5}
      padding={3}
      borderRadius={10}
      boxShadow={"10px 10px 10px 20px #ccc"}
      width={"80%"}
      border={3}
      borderColor={"Background"}
    >
      <Typography variant="h3" textAlign={"center"}>
        Edit post
      </Typography>
      <InputLabel sx={labelStyle}>Title</InputLabel>
      <TextField name="title" onChange={handleChange} value={inputs.title} />
      <InputLabel sx={labelStyle}>Description</InputLabel>
      <TextField
        name="description"
        onChange={handleChange}
        value={inputs.description}
      />
      <InputLabel sx={labelStyle}>Image URL</InputLabel>
      <TextField name="image" onChange={handleChange} value={inputs.image} />
      <Box textAlign={"center"}>
        <Button
        type={"submit"}
          sx={{ m: 2, width: "50%", textAlign: "center" }}
          variant="contained"
          color="warning"
        >
          Update
        </Button>
      </Box>
    </Box>
    </form>
  );
}

export default BlogDetails