import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegistrationService from '../../../services/auth/RegistrationService';

const Registration = () => {
    const formik = useFormik({
        initialValues: {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('User name is required'),
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(3, 'Password is weak').required('Required'),
            confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            RegistrationService.register(
                values.userName,
                values.firstName,
                values.lastName,
                values.email,
                values.password,

            ).then(res => {
                console.log(res);
                console.error('redirect to login with homepage');
            }).catch(err => {
                alert(err.message);
            }).finally(() => {})
        },
    });
    return (
        

        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="userName">user Name</label>
            <input
                id="userName"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
                <div>{formik.errors.userName}</div>
            ) : null}

            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}

            {/* <label htmlFor='password'>Password</label>
            <input
                id = 'password' */}

            <label htmlFor="password">password </label>
            <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}

            <label htmlFor="confirmPassword">confirm Password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                ) : null}


            <button type="submit">Submit</button>
        </form>
    );
};

export default Registration;