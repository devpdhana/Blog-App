import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../utils";

const AddBlog = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const classes = useStyles()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    user: userId,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:3000/api/blogs/add", inputs)
      .catch((e) => console.log(e));
    return res.data;
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequest().then(() => navigate('/myBlogs'));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"auto"}
        marginTop={5}
        padding={3}
        borderRadius={10}
        boxShadow={"10px 10px 10px 20px #ccc"}
        width={"80%"}
        border={3}
        borderColor={"rgb(63,94,251)"}
      >
        <Typography
          variant="h3"
          padding={3}
          color={"gray"}
          fontWeight={"bold"}
          textAlign={"center"}
          className={classes.font}
        >
          Post your blog
        </Typography>
        <TextField
          className={classes.font}
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin={"normal"}
          placeholder="Title"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.font}
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin={"normal"}
          placeholder="Description"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.font}
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin={"normal"}
          placeholder="Image URL"
          variant="outlined"
          fullWidth
        />
        <Button
          className={classes.font}
          type="submit"
          variant="contained"
          color="warning"
        >
          Add blog
        </Button>
      </Box>
    </form>
  );
};

export default AddBlog;
