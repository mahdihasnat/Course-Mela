import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import RegistrationService from "../../../services/auth/RegistrationService";
import { INSTRUCTOR, STUDENT } from "../../../shared/StringConstant";
import { useLoginContext } from "../../../store/contexts/LoginContext";
import { LoginWithDispatch } from "../../../store/storeIndex";
import { useNavigate } from "react-router-dom";
import LoginService from "../../../services/auth/LoginService";
import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import { Button, TextField } from "@mui/material";
import "./Registraion.css";

const Registration = () => {
	const navigate = useNavigate();
	const [state, dispatch] = useLoginContext();
	const formik = useFormik({
		initialValues: {
			userName: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			picked: STUDENT,
		},
		validationSchema: Yup.object({
			userName: Yup.string().required("User name is required"),
			firstName: Yup.string()
				.max(15, "Must be 15 characters or less")
				.required("Required"),
			lastName: Yup.string()
				.max(20, "Must be 20 characters or less")
				.required("Required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string()
				.min(3, "Password is weak")
				.required("Required"),
			confirmPassword: Yup.string()
				.required("Please confirm your password")
				.oneOf([Yup.ref("password")], "Passwords do not match"),
		}),
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
			console.log(values);
			RegistrationService.register(
				values.userName,
				values.firstName,
				values.lastName,
				values.email,
				values.password,
				values.picked
			)
				.then((res) => {
					alert("account was created successfully");
					console.log(res);
					console.error("redirect to login with homepage");
					LoginService.LoginWithDispatch(
						values.userName,
						values.password,
						dispatch
					);
					navigate("/");
				})
				.catch((err) => {
					alert(err.message);
				})
				.finally(() => {});
		},
	});
	return (
		<Paper
			className="gradient-custom"
			sx={{ padding: "32px" }}
			elevation={2}
		>
			<h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
				Let's start our journey!
			</h3>
			<form onSubmit={formik.handleSubmit}>
				<Stack container spacing={4}>
					{/*<div className="row">*/}
					{/*<div className="col-md-6 mb-4">*/}
					{/* <div className="form-outline">
                                        <label className="form-label" htmlFor="userName">User Name</label>

                                        <input
                                            id="userName"
                                            name="userName"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.userName}
                                            className="form-control form-control-lg"
                                        />
                                        {formik.touched.userName && formik.errors.userName ? (
                                            <div>{formik.errors.userName}</div>
                                        ) : null} */}
					{/*</div>*/}
					{/*</div>*/}
					{/* </div> */}
					<Stack>
						<TextField
							label={"User Name"}
							id={"userName"}
							type={"text"}
							variant={"outlined"}
							value={formik.values.userName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.userName &&
								Boolean(formik.errors.userName)
							}
							helperText={
								formik.touched.userName &&
								formik.errors.userName
							}
							required
						/>

						<TextField
							label={"First Name"}
							id={"firstName"}
							type={"text"}
							variant={"outlined"}
							value={formik.values.firstName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.firstName &&
								Boolean(formik.errors.firstName)
							}
							helperText={
								formik.touched.firstName &&
								formik.errors.firstName
							}
							required
						/>

						<TextField
							label={"Last Name"}
							id={"lastName"}
							type={"text"}
							variant={"outlined"}
							value={formik.values.lastName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.lastName &&
								Boolean(formik.errors.lastName)
							}
							helperText={
								formik.touched.lastName &&
								formik.errors.lastName
							}
							required
						/>

						<TextField
							label={"Email"}
							id={"email"}
							type={"email"}
							variant={"outlined"}
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.email &&
								Boolean(formik.errors.email)
							}
							helperText={
								formik.touched.email && formik.errors.email
							}
							required
						/>

						<TextField
							label={"Password"}
							id={"password"}
							type={"password"}
							variant={"outlined"}
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.password &&
								Boolean(formik.errors.password)
							}
							helperText={
								formik.touched.password &&
								formik.errors.password
							}
							required
						/>

						<TextField
							label={"Confirm Password"}
							id={"confirmPassword"}
							type={"password"}
							variant={"outlined"}
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.confirmPassword &&
								Boolean(formik.errors.confirmPassword)
							}
							helperText={
								formik.touched.confirmPassword &&
								formik.errors.confirmPassword
							}
							required
						/>
					</Stack>

					<div id="my-radio-group">Role</div>
					<div role="group" aria-labelledby="my-radio-group">
						<label>
							<input
								type="radio"
								name="picked"
								value={STUDENT}
								onClick={formik.handleChange}
							/>
							student
						</label>
						<label>
							<input
								type="radio"
								name="picked"
								value={INSTRUCTOR}
								onClick={formik.handleChange}
							/>
							instructor
						</label>
					</div>

					<Grid justify="center">
						<Button variant={"contained"} type={"submit"}>
							Register
						</Button>
					</Grid>

					{/*</Container>*/}
				</Stack>
			</form>
		</Paper>
	);
};

export default Registration;
