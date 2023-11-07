import React, { useState } from 'react'
import {Box, Button, TextField, Typography} from'@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = ({ isLoggedin, setIsLoggedin }) => {
  const [isSignup, setIssignup] = useState(false);
  const navigate = useNavigate()
  const [inputValues, setInputvalues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [user,setUser] = useState()
  const handleChange = (e) => {
    setInputvalues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:3000/api/users/${type}`, {
        name: inputValues.name,
        email: inputValues.email,
        password: inputValues.password,
      })
      .catch((e) => console.log(e));
      const userData = await res.data
      setUser(userData)
      console.log(userData)
      return userData
  };
  // const sendRequest = async (type = "login") => {
  //   try {
  //     const res = await axios.post(`http://localhost:3000/api/users/${type}`, {
  //       name: inputValues.name,
  //       email: inputValues.email,
  //       password: inputValues.password,
  //     });
  //     return res.data; // Return the response data
  //   } catch (e) {
  //     console.error(e); // Log the error
  //     throw e; // Rethrow the error to propagate it
  //   }
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
      .then(res=>localStorage.setItem('userId',res.user._id))
        .then(() => setIsLoggedin(!isLoggedin))
        .then(()=>navigate('/blogs'))
    } else {
      sendRequest()
        .then((res) => localStorage.setItem("userId", res.user._id))
        .then(() => setIsLoggedin(!isLoggedin))
        .then(() => navigate("/blogs"));
    }
  };
  return (
    <div>
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
          width={400}
        >
          <Typography variant="h3" padding={3}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              variant='outlined'
              value={inputValues.name}
              onChange={handleChange}
              placeholder="Name"
              margin={"normal"}
            />
          )}
          <TextField
          variant='outlined'
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
          variant='outlined'
            name="password"
            value={inputValues.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            sx={{ margin: 3, borderRadius: 3 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={(e) => setIssignup(!isSignup)}
            sx={{ margin: 3, borderRadius: 3 }}
          >
            Change into {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login