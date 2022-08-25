import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { useLoginContext } from "../../../store/contexts/LoginContext";

import { ROLE_INSTRUCTOR } from "../../../shared/StringConstant";
import { Login } from "@mui/icons-material";
import { LOG_OUT } from "../../../store/auth/AuthTypes";
import { useNavigate } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { Box } from "@mui/system";

const MuiNavbar = () => {
  const [{ isSignedIn, userRole }, dispatch] = useLoginContext();
  const navigate = useNavigate();

  const buttonSpacing = 2;

  const handleLogout = () => {
    console.log("logout");
    // localStorage.removeItem('jwtToken');

    dispatch({ type: LOG_OUT });
    localStorage.clear();
    navigate("/");
  };

  const studentNavbarOption = () => {
    return (
      <>
        <Button color={"inherit"}>My Courses</Button>
        <Button color={"inherit"} href={"/plans"}>
          My Plans
        </Button>
        <Button color={"inherit"} href={"/promo"}>
          Gifts
        </Button>
      </>
    );
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
          <Box>
            <img
              src={require("../../../assets/logo.png")}
              alt="logo"
              width="125"
            />
          </Box>
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Box pr={3}>
          <SearchBar
            style={{ height: "2.5rem" }}
            onRequestSearch={(data) => {
              navigate(`/course/search/?search=${data}`);
            }}
          />
        </Box>

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
