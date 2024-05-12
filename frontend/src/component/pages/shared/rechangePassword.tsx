import React from 'react';
import { Card, Button, Form, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PasswordChange } from '../../service/auth';
import { Console } from 'console';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Old password is required'),
    newPassword: Yup.string()
        .min(8, 'New password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
});

const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: sessionStorage.getItem("email"),
};

const RechangePassword = () => {
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        try {
            PasswordChange({ email: values?.email, oldPassword: values?.oldPassword, newPassword: values?.newPassword }).then((res) => {
                if (res && res.status === 200) {
                    toast.success("Password Changed", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    setSubmitting(false);
                }
                else {
                    toast.error("Failed", {
                        position: "top-center",
                        autoClose: 1000,
                    });

                }
            })
        }
        catch (err) {
            toast.error("Failed", {
                position: "top-center",
                autoClose: 1000,
            });
        }

    };

    return (
        <div className='password_rechange'>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Change Password</Card.Title>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors,
                            isSubmitting, isValid
                        }: any) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl
                                        type="password"
                                        name="oldPassword"
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.oldPassword && !!errors.oldPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.oldPassword}
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl
                                        type="password"
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.newPassword && !!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPassword}
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        //@ts-ignore
                                        value={values.email}
                                        disabled={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <div className='d-flex justify-content-center mt-2'>

                                    <Button type="submit" variant="primary" >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>

        </div>
    );
};

export default RechangePassword;
