import React, { useEffect, useState } from 'react'
import "./patient.css"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ButtonGroup, Card, Col, Container, Dropdown, DropdownButton, DropdownDivider, Row } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { AddPatientDetails, getUserListDetail, mailCall } from '../../service/PatientDetails';
import { toast } from 'react-toastify';
import emailjs from "@emailjs/browser";
import men from "../../../assets/men.jpg";
import RechangePassword from '../shared/rechangePassword';

const Patient_client = ({ loggedOFF }: any) => {

    const [userData, setUserData] = useState<any>();
    const [RechangePass, setRechangePass] = useState<boolean>(false);

    const initialValues = {
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: sessionStorage.getItem('email'),
        emergencyContactNumber: '',
        bloodGroup: '',
        familyDoctorContact: '',
        aadharNumber: '',
    };

    const initialValuesEDit = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        contactNumber: userData?.contactNumber,
        email: userData?.email,
        emergencyContactNumber: userData?.emergencyContactNumber,
        bloodGroup: userData?.bloodGroup,
        familyDoctorContact: userData?.familyDoctorContact,
        aadharNumber: userData?.aadharNumber,
    }
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        contactNumber: Yup.string().required('Contact number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        emergencyContactNumber: Yup.string().required('Emergency contact number is required'),
        bloodGroup: Yup.string().required('Blood group is required'),
        familyDoctorContact: Yup.string().required('Family doctor contact details are required'),
        aadharNumber: Yup.string().matches(/^\d{12}$/, 'Aadhar number must be 12 digits').required('Aadhar number is required'),
    });
    const logOff = () => {
        sessionStorage.setItem("isLoggedIn", 'false');
        sessionStorage.setItem("access_token", "");
        sessionStorage.setItem("role", "");
        loggedOFF();
    }
    const postPatientDetails = async (val: any) => {
        const values = { ...val, role: 'patient' };
        console.log(values);
        try {
            AddPatientDetails(values).then((res) => {
                if (res && res.status === 200) {
                    try {
                        mailCall({ email: values.email }).then((res: any) => {
                            if (res && res.status === 200) {
                                toast.success("Registration Success and mail send", {
                                    position: "top-center",
                                    autoClose: 1000,
                                });
                                setUserData([]);
                                getDetails();
                            }
                        }).catch((err: any) => {
                            alert(err);
                        })
                    }
                    catch (err) {
                        alert(err);
                    }
                }
                else {

                    toast.error('registration failed', {
                        position: "top-center",
                        autoClose: 4000, // Close after 4 seconds
                    });
                }
            }).catch((err) => {
                alert(err);
                toast.error('network error', {
                    position: "top-center",
                    autoClose: 4000, // Close after 4 seconds
                });
            })
        }
        catch (err) {
            alert(err);
            toast.error('network error', {
                position: "top-center",
                autoClose: 4000, // Close after 4 seconds
            });
        }
    }

    const getDetails = () => {
        try {
            getUserListDetail().then((res: any) => {
                if (res && res.status === 200) {
                    setUserData(res.data.find((val: any) => val.email === sessionStorage.getItem('email')))
                }
            }).catch((err: any) => {
                console.log(err)
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getDetails();

    }, [])


    return (
        <div className='background-patient-Image'>
            <header className='w-100'>
                <Row style={{ width: '100vw' }} className='p-2'>
                    <Col xs={4} sm={4} lg={4} md={4} className='d-flex justify-content-center align-items-center'>
                        <div >
                            Accidental Emergency Information System
                        </div>
                    </Col>
                    <Col xs={4} sm={6} lg={4} md={4} className='d-flex justify-content-center align-items-center'>
                        <div className='text-center'>
                            User Information
                        </div>
                    </Col>
                    <Col xs={4} sm={6} lg={4} md={4} className='d-flex justify-content-end align-items-center'>
                        <div className='text-end'>
                            <DropdownButton
                                title={<img src={men} style={{ borderRadius: "50%" }} alt="icon" width={50} height={30} />}
                            >
                                <Dropdown.Item className='text-center' onClick={() => setRechangePass(true)} >Change Password</Dropdown.Item>
                                <DropdownDivider />
                                <Dropdown.Item className='text-center' onClick={() => loggedOFF()} >Logout</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </Col>
                </Row>
            </header>

            {RechangePass ?
                <RechangePassword /> :
                <main>
                    <section>
                        <Container className='d-flex justify-content-center align-items-center'>
                            <Card style={{ width: '80vw' }}>
                                <Card.Body>
                                    {
                                        <Formik
                                            enableReinitialize
                                            initialValues={userData ? initialValuesEDit : initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={(values, { resetForm }) => {
                                                postPatientDetails(values);
                                                resetForm();

                                            }}
                                        >
                                            {({ errors, touched, isValid }) => (
                                                <Form className='form-group'>
                                                    <h4 className='text-center'> Patient Details</h4>
                                                    <Row>
                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="firstName">First Name <span className='text-danger'> *</span></label>
                                                                <Field className="form-control " type="text" disabled={userData && true} id="firstName" name="firstName" />
                                                                <ErrorMessage name="firstName" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.firstName && errors.firstName ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>

                                                            </div>
                                                        </Col>
                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="lastName">Last Name <span className='text-danger'> *</span></label>
                                                                <Field type="text" className="form-control " disabled={userData && true} id="lastName" name="lastName" />
                                                                <ErrorMessage name="lastName" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.lastName && errors.lastName ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="contactNumber">Contact Number <span className='text-danger'> *</span></label>
                                                                <Field type="text" className="form-control " disabled={userData && true} id="contactNumber" name="contactNumber" />
                                                                <ErrorMessage name="contactNumber" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.contactNumber && errors.contactNumber ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="email">Email Address <span className='text-danger'> *</span></label>
                                                                <Field type="email" className="form-control " disabled={true} id="email" name="email" />
                                                                <ErrorMessage name="email" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.email && errors.email ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>
                                                            </div>
                                                        </Col>


                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="emergencyContactNumber">Emergency Contact Number<span className='text-danger'> *</span></label>
                                                                <Field type="text" className="form-control " disabled={userData && true} id="emergencyContactNumber" name="emergencyContactNumber" />
                                                                <ErrorMessage name="emergencyContactNumber" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.emergencyContactNumber && errors.emergencyContactNumber ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>

                                                            </div>
                                                        </Col>


                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="aadharNumber">Aadhar Number<span className='text-danger'> *</span></label>
                                                                <Field type="text" className="form-control " disabled={userData && true} id="aadharNumber" name="aadharNumber" />
                                                                <ErrorMessage name="aadharNumber" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.aadharNumber && errors.aadharNumber ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>

                                                            </div>
                                                        </Col>


                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="bloodGroup">Blood Group <span className='text-danger'> *</span></label>
                                                                <Field as="select" className="form-control " disabled={userData && true} id="bloodGroup" name="bloodGroup" >
                                                                    <option value="">Select a blood group</option>
                                                                    {bloodGroups.map(group => (
                                                                        <option key={group} value={group}>{group}</option>
                                                                    ))}
                                                                </Field>

                                                                <ErrorMessage name="bloodGroup" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.bloodGroup && errors.bloodGroup ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>

                                                            </div>
                                                        </Col>
                                                        <Col xs={12} sm={6} lg={3} md={4}>
                                                            <div className="form-group mt-2 " >
                                                                <label htmlFor="familyDoctorContact">Family Doctor Contact Details <span className='text-danger'> *</span></label>
                                                                <Field type="text" className="form-control " disabled={userData && true} id="familyDoctorContact" name="familyDoctorContact" />
                                                                <ErrorMessage name="familyDoctorContact" component="div" className="error-message text-danger" >
                                                                    {(msg) => touched.familyDoctorContact && errors.familyDoctorContact ? <div className='text-danger'>{msg}</div> : null}
                                                                </ErrorMessage>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    {!userData && <Row className='mt-3'>
                                                        <Col type="varient" className='d-flex justify-content-center'>
                                                            <button type="submit" className="btn btn-success w-25">Submit</button>
                                                        </Col>
                                                    </Row>}
                                                </Form>
                                            )}
                                        </Formik>}
                                </Card.Body>
                            </Card>
                        </Container>
                    </section>
                </main>
            }        </div>
    )
}

export default Patient_client