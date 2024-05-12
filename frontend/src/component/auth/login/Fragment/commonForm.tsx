import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { logIn } from '../../../service/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const CommonForm = ({ role, loggedIn }: any) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const loginSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one digit')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
            .test(
                'password',
                'Password must contain at least one of each: lowercase letter, uppercase letter, digit, and special character',
                value =>
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[@$!%*?&]/.test(value)
            )
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const postUserData = (val: any) => {
        const userDetailsData = { ...val, roleIdentification: role }
        try {
            logIn(userDetailsData).then((res: any) => {

                if (res && res.status === 201) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('role', res.data.role);
                    sessionStorage.setItem('access_token', res.data.token);
                    sessionStorage.setItem("email", res.data.email);
                    toast.success("SuccessFully Login", { position: "top-right" })
                    loggedIn();
                    console.log(res.data);
                    if (res.data.role === "admin") {
                        navigate("/Dashboard");
                    }
                    if (res.data.role === "patient") {
                        navigate("/Patient");
                    }
                    if (res.data.role === "hospital") {
                        navigate("/Hospital");
                    }
                    window.location.reload();
                }
                if (res && res.status === 204) {
                    toast.error("password is Incorrect", { position: "top-right" })
                }

            }).catch((err: any) => {
                toast.error(err.response.data.error, { position: "top-center" })
            })
        }
        catch (err) {
            toast.error('An error occurred! Please try again later.');
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    postUserData(values);
                }}
            >
                {({ isSubmitting, touched, errors, isValid }) => (
                    <Form className='form-group'>
                        <div className="form-group mt-2 "  >
                            <label htmlFor="email" className='mb-2'>Email</label>
                            <Field type="email" className="form-control " id="email" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="error-message text-danger" >
                                {(msg) => touched.email && errors.email ? <div className='text-danger'>{msg}</div> : null}
                            </ErrorMessage>
                        </div>

                        <div className="form-group mt-2" style={{ position: "relative" }} >
                            <label htmlFor="password" className='mb-2'>Password</label>
                            <Field type={passwordShow ? "text" : "password"} className="form-control " id="password" name="password" placeholder="Password" />
                            <div className="postition-abs">
                                {
                                    passwordShow ? <IoEye size={20} onClick={() => setPasswordShow(false)} /> : <IoEyeOff size={20} onClick={() => setPasswordShow(true)} />
                                }
                            </div>
                            <ErrorMessage name="password" component="div" className=" error-message">
                                {(msg) => touched.password && errors.password ? <div className='text-danger'>{msg}</div> : null}
                            </ErrorMessage>
                        </div>
                        <div className='mt-2' >
                            <Button variant="success" type="submit" disabled={!isValid} style={{ width: '-webkit-fill-available' }}> Submit</Button>
                        </div>
                    </Form>)}
            </Formik>
        </div>
    )
}

export default CommonForm