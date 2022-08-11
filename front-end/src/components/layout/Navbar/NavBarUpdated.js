import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  ButtonGroup,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLoginContext } from "../../../store/contexts/LoginContext";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { INSTRUCTOR, ROLE_INSTRUCTOR } from "../../../shared/StringConstant";
import { Login } from "@mui/icons-material";
import { LOG_OUT, LOGIN_MODAL_PRESSED } from "../../../store/auth/AuthTypes";
import { useNavigate } from "react-router-dom";

const MuiNavbar = () => {
  const [{ isSignedIn, userRole }, dispatch] = useLoginContext();
  const navigate = useNavigate();

  const buttonSpacing = 2;

  const handleLogin = () => {
    dispatch({ type: LOGIN_MODAL_PRESSED });
  };

  const handleLogout = () => {
    console.log("logout");
    // localStorage.removeItem('jwtToken');

    dispatch({ type: LOG_OUT });
    localStorage.clear();
    navigate("/");
  };

  const studentNavbarOption = () => {
    return <Button color={"inherit"}>My Courses</Button>;
  };

  const instructorNavbarOption = () => {
    return (
      <Button color={"inherit"} href={"/add-course"}>
        Add Course
      </Button>
    );
  };

  const guestNavbarOption = () => {
    return (
      <Stack spacing={buttonSpacing} direction="row">
        <Button variant={"contained"} href={"./login"}>
          LOGIN
        </Button>

        <Button
          variant={"contained"}
          href={"/register"}
          startIcon={<Login />}
          color={"success"}
        >
          Register
        </Button>
      </Stack>
    );
  };

  return (
    <AppBar
      position="static"
      color={"transparent"}
      sx={{ backgroundColor: "#455a64" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          href={"/"}
        >
          <CatchingPokemonIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          COURSEMELA
        </Typography>

        {isSignedIn ? (
          <Stack direction="row" spacing={buttonSpacing}>
            <Button color="inherit" href={"/"}>
              Home
            </Button>
            {userRole === ROLE_INSTRUCTOR
              ? instructorNavbarOption()
              : studentNavbarOption()}
            <Button color="inherit" onClick={handleLogout}>
              LOGOUT
            </Button>
          </Stack>
        ) : (
          guestNavbarOption()
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavbar;
