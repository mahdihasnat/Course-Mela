import React from "react";
import axios from "axios";
import { useLoginContext } from "../../../store/contexts/LoginContext";
import { useState } from "react";
import LoginService from "../../../services/auth/LoginService";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { Form, useFormik } from "formik";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Container,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("User name is required"),
      password: Yup.string()
        .min(3, "Password is weak")
        .required("Required"),
    }),

    onSubmit: (values) => {
      /// TODO do something to login
      // event.preventDefault();

      LoginService.LoginWithDispatch(
        values.username,
        values.password,
        dispatch
      );

      console.log("Login clicked ");
      navigate("/");
    },
  });

  const [state, dispatch] = useLoginContext();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const handleCloseModal = () => {
    dispatch({ type: "LOGIN_MODAL_CANCELED" });
  };

  // const handleSubmit = async (event) => {
  //   // const url = joinUrl(baseUrl, 'status');
  //   // console.log(url);
  //   // try {
  //   //   const response = await axios.get(url);
  //   //   console.log(response);
  //   //   // TODO: handle success response
  //   //   // dispatch(testServerSuccess(response.data));
  //   //   dispatch({ type: "LOGIN" });
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   // dispatch({ type: "LOGIN" })
  //   // dispatch(Login("jhon", "123"));
  //
  // };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <Card p={2}>
          <CardHeader title={"Log in to Dive into study world!"} />
          <CardContent>
            <Stack p={5} rowGap={5}>
              <TextField
                label={"User Name"}
                name={"username"}
                id={"username"}
                type={"text"}
                variant={"outlined"}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                required
              />

              <TextField
                label={"Password"}
                id={"password"}
                name={"password"}
                type={"password"}
                variant={"outlined"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                required
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type={"submit"}
              // size="large"
              color="secondary"
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

export default Login;
