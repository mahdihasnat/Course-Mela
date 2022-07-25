import React from 'react';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import RegistrationService from '../../../services/auth/RegistrationService';
import {INSTRUCTOR, STUDENT} from '../../../shared/StringConstant';
import {useLoginContext} from '../../../store/contexts/LoginContext';
import {LoginWithDispatch} from '../../../store/storeIndex';
import {useNavigate} from 'react-router-dom';
import LoginService from '../../../services/auth/LoginService';
import {Container, Form, Row} from 'reactstrap';
import {Button} from 'reactstrap';
import './Registraion.css'
// import {Button} from 'bo';	


const Registration = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useLoginContext();
    const formik = useFormik({
        initialValues: {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            picked: STUDENT,
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
            // alert(JSON.stringify(values, null, 2));
            RegistrationService.register(
                values.userName,
                values.firstName,
                values.lastName,
                values.email,
                values.password,
                values.picked,
            ).then(res => {
                alert('account was created successfully');
                console.log(res);
                console.error('redirect to login with homepage');
                LoginService.LoginWithDispatch(values.userName, values.password, dispatch);
                navigate('/');
            }).catch(err => {
                alert(err.message);
            }).finally(() => {
            })
        },
    });
    return (
        <section className="gradient-custom">
            <Container className=" p-5">
                <Row className="justify-content-center align-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                            <div className="card-body">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Let's start our journey!</h3>
                                <Form onSubmit={formik.handleSubmit}>
                                    {/*<div className="row">*/}
                                    {/*<div className="col-md-6 mb-4">*/}
                                    <div className="form-outline">
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
                                        ) : null}
                                        {/*</div>*/}
                                        {/*</div>*/}
                                    </div>

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

                                    <label htmlFor="password">Password </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                    ) : null}

                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div>{formik.errors.confirmPassword}</div>
                                    ) : null}

                                    <div id="my-radio-group">Role</div>
                                    <div role="group" aria-labelledby="my-radio-group">
                                        <label>
                                            <input type="radio" name="picked" value={STUDENT}
                                                   onClick={formik.handleChange}/>
                                            student
                                        </label>
                                        <label>
                                            <input type="radio" name="picked" value={INSTRUCTOR}
                                                   onClick={formik.handleChange}/>
                                            instructor
                                        </label>


                                    </div>

                                    <Row>
                                        <Button className="col-md-2 justify-content-center offset-5" type="submit"
                                                color="primary">Register</Button>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </section>
    )

};

export default Registration;