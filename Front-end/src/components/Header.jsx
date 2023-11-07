import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
import { useStyles } from '../utils';

const Header = ({isLoggedin,setIsloggedin}) => {
    const [value, setValue] = useState()
    const classes = useStyles()
    const handleLogout = ()=>{
      localStorage.removeItem("userId")
      setIsloggedin(!isLoggedin)
    }
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);",
      }}
    >
      <Toolbar>
        <Typography className={classes.font} variant="h4">
          BlogsApp
        </Typography>
        {isLoggedin && (
          <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>
        )}
        <Box display={"flex"} marginLeft={"auto"}>
          {!isLoggedin && (
            <>
              <Button
                className={classes.font}
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: 1, borderRadius: 10 }}
                variant="contained"
                color="warning"
              >
                Login
              </Button>
              <Button
                className={classes.font}
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: 1, borderRadius: 10 }}
                variant="contained"
                color="warning"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedin && (
            <Button
              className={classes.font}
              onClick={handleLogout}
              LinkComponent={Link}
              to="/auth"
              sx={{ margin: 1, borderRadius: 10 }}
              variant="contained"
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header