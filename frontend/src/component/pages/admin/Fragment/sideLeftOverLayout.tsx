import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Offcanvas } from 'react-bootstrap';
import * as Yup from 'yup';
import { adminPatientEdit, getPatientDetailSingleList } from '../../../service/PatientDetails';
import { toast } from 'react-toastify';
import { loginUserList } from '../../../service/loginList';

const SideLeftOverLayout = ({ show, handleClose, val }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData] = useState<any>({});
    const userid = val[0].email;


    const initialValues = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        contactNumber: userData.contactNumber,
        email: userData.email,
        emergencyContactNumber: userData.emergencyContactNumber,
        bloodGroup: userData.bloodGroup,
        familyDoctorContact: userData.familyDoctorContact,
    };
    const initialValuesSample = {

        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        emergencyContactNumber: '',
        bloodGroup: '',
        familyDoctorContact: '',

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
    });


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => {
        try {
            getPatientDetailSingleList(userid).then((res: any) => {
                if (res && res.status === 200) {
                    if (res.data) {
                        console.log(res.data[0]._id);
                        const values = res.data.find((val: any) => val.email === userid);
                        console.log(values);
                        setUserData(values);
                    }

                }
            }).catch((err: any) => {
                console.log(err)
            })
        }
        catch (err) {
            console.log(err);
        }

    }, [userid])



    const editDetails = (val: any) => {
        console.log(val);
        try {
            adminPatientEdit(val).then((res: any) => {
                if (res && res.status === 200) {
                    toast.success("successfully Updated This User");
                    handleClose();
                }
            }).catch((err: any) => {
                console.log(err)
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Client User Name : {val[0]?.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Formik
                        enableReinitialize
                        initialValues={userData ? initialValues : initialValuesSample}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            editDetails(values);
                            resetForm();

                        }}
                    >
                        {({ errors, touched, isValid }) => (
                            <Form className='form-group'>
                                <h4 className='text-center'> Patient Details</h4>

                                <div className="form-group mt-2 " >
                                    <label htmlFor="firstName">First Name <span className='text-danger'> *</span></label>
                                    <Field className="form-control " type="text" id="firstName" name="firstName" />
                                    <ErrorMessage name="firstName" component="div" className="error-message text-danger" >
                                        {(msg) => touched.firstName && errors.firstName ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>

                                </div>


                                <div className="form-group mt-2 " >
                                    <label htmlFor="lastName">Last Name <span className='text-danger'> *</span></label>
                                    <Field type="text" className="form-control " id="lastName" name="lastName" />
                                    <ErrorMessage name="lastName" component="div" className="error-message text-danger" >
                                        {(msg) => touched.lastName && errors.lastName ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>
                                </div>


                                <div className="form-group mt-2 " >
                                    <label htmlFor="contactNumber">Contact Number <span className='text-danger'> *</span></label>
                                    <Field type="text" className="form-control " id="contactNumber" name="contactNumber" />
                                    <ErrorMessage name="contactNumber" component="div" className="error-message text-danger" >
                                        {(msg) => touched.contactNumber && errors.contactNumber ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>
                                </div>

                                <div className="form-group mt-2 " >
                                    <label htmlFor="email">Email Address <span className='text-danger'> *</span></label>
                                    <Field type="email" disabled={true} className="form-control " id="email" name="email" />
                                    <ErrorMessage name="email" component="div" className="error-message text-danger" >
                                        {(msg) => touched.email && errors.email ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>
                                </div>

                                <div className="form-group mt-2 " >
                                    <label htmlFor="emergencyContactNumber">Emergency Contact Number<span className='text-danger'> *</span></label>
                                    <Field type="text" className="form-control " id="emergencyContactNumber" name="emergencyContactNumber" />
                                    <ErrorMessage name="emergencyContactNumber" component="div" className="error-message text-danger" >
                                        {(msg) => touched.emergencyContactNumber && errors.emergencyContactNumber ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>

                                </div>

                                <div className="form-group mt-2 " >
                                    <label htmlFor="bloodGroup">Blood Group <span className='text-danger'> *</span></label>
                                    <Field as="select" className="form-control " id="bloodGroup" name="bloodGroup" >
                                        <option value="">Select a blood group</option>
                                        {bloodGroups.map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </Field>

                                    <ErrorMessage name="bloodGroup" component="div" className="error-message text-danger" >
                                        {(msg) => touched.bloodGroup && errors.bloodGroup ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>

                                </div>

                                <div className="form-group mt-2 " >
                                    <label htmlFor="familyDoctorContact">Family Doctor Contact Details <span className='text-danger'> *</span></label>
                                    <Field type="text" className="form-control " id="familyDoctorContact" name="familyDoctorContact" />
                                    <ErrorMessage name="familyDoctorContact" component="div" className="error-message text-danger" >
                                        {(msg) => touched.familyDoctorContact && errors.familyDoctorContact ? <div className='text-danger'>{msg}</div> : null}
                                    </ErrorMessage>
                                </div>

                                <div className='d-flex justify-content-between px-2 mt-4'>
                                    <Button variant="danger" onClick={handleClose}> close</Button>
                                    <Button variant="success" type='submit'> Edit Client</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default SideLeftOverLayout;