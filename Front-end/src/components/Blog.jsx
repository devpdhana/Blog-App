import React from 'react'
import {Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStyles } from '../utils';

const Blog = ({title,description,image,userName,isUser,blogId}) => {
  const navigate = useNavigate()
  const classes = useStyles()
  const handleEdit=()=>{
    navigate(`/myBlogs/${blogId}`)
  }

  const sendDeleteRequest = async () => {
    const res = await axios.delete(`http://localhost:3000/api/blogs/${blogId}`).catch(e=>console.log(e));
    const data = res.data
    return data
  };

  const handleDelete = () => {
    sendDeleteRequest().then(()=>navigate('/')).then(()=>navigate('/blogs'));
  };
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 5px 10px #ccc",
        ":hover:": { boxShadow: "10px 10px 10px 20px #ccc" },
      }}
    >
      {isUser && (
        <Box
          display={"flex"}
          sx={{ marginLeft: "auto", color: "rgb(63,94,251)" }}
        >
          <IconButton
            onClick={handleEdit}
            color='warning'
            sx={{ marginLeft: "auto"}}
          >
            <EditIcon />
          </IconButton>
          <IconButton color='error' onClick={handleDelete}>
            <DeleteOutline />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar
            className={classes.font}
            sx={{ bgcolor: "red" }}
            aria-label="recipe"
          >
            {userName && userName.charAt(0)}
          </Avatar>
        }
        title={title}
      />
      <CardMedia component="img" height="194" image={image} alt="Image" />
      <hr />
      <br />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b>
          {" : "}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Blog