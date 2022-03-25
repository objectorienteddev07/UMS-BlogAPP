import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import icon from "../../assets/icon.png";
import actionTypes from "../../redux/constants/actionTypes.js";
import useStyles from "./styles";

const Navbar = () => {
  // getting the user auth data  from the local storage which we set in the reducer
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });

    navigate("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // checking if the jwt session token is expired or not!! if yes then logout the user!!
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={`${classes.appBar} !flex-col md:!flex-row  h-[100px] lg:h-[80px]`} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img className={`${classes.image} w-[30px] lg:w-[40px] `} src={icon} alt="icon" />
        <Typography
          component={Link}
          to="/"
          className={`${classes.heading} !text-xl md:!text-3xl !font-black !text-orange-600 !ml-6`}
          variant="h2"
          align="center"
        >
          The Articles
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;