import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { signUp } from "../../service/auth";
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  role: Yup.string().required('Role is required')
})

const Signup = ({ show, handleClose, loginDetail }: any) => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const signupDetails = (values: any) => {
    console.log(values);

    try {
      signUp(values).then((res: any) => {
        if (res && res.status === 201) {
          console.log(res);
          toast.success("Registration Success", {
            position: "top-center",
            autoClose: 4000,
          });
          loginDetail(res.data)
          handleClose()

        }
        else {
          toast.error('registration failed', {
            position: "top-center",
            autoClose: 4000, // Close after 4 seconds
          });
        }
      }).catch((err: any) => {
        toast.error('network error', {
          position: "top-center",
          autoClose: 4000, // Close after 4 seconds
        });

      })
    }
    catch {
      console.log("failed ")
    }
  }
  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              phoneNumber: '',
              gender: '',
              role: ''
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log(values);
              signupDetails(values);
              resetForm();
            }}
          >
            {({ isSubmitting, touched, errors, isValid }) => (
              <Form className='form-group'>
                <h4 className='text-center'> Signup Page</h4>
                <div className="form-group mt-2 " >
                  <label htmlFor="name" className='mb-2'>User Name<span className='text-danger'> *</span></label>
                  <Field type="text" id="name" className="form-control " placeholder="User Name" name="name" />
                  <ErrorMessage name="name" component="div" className="error-message text-danger" >
                    {(msg) => touched.name && errors.name ? <div className='text-danger'>{msg}</div> : null}
                  </ErrorMessage>
                </div>
                <div>
                  <label htmlFor="email" className='mb-2'>Email <span className='text-danger'> *</span></label>
                  <Field type="email" className="form-control " placeholder="Email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error-message text-danger" >
                    {(msg) => touched.email && errors.email ? <div className='text-danger'>{msg}</div> : null}
                  </ErrorMessage>
                </div>
                <div style={{ position: "relative" }}>
                  <label htmlFor="password" className='mb-2'>Password <span className='text-danger'> *</span></label>
                  <Field type={passwordShow ? "text" : "password"} className="form-control " placeholder="Password" id="password" name="password" />
                  <div className="postition-abs">
                    {
                      passwordShow ? <IoEye size={20} onClick={() => setPasswordShow(false)} /> : <IoEyeOff size={20} onClick={() => setPasswordShow(true)} />
                    }
                  </div>
                  <ErrorMessage name="password" component="div" className="error-message text-danger" >
                    {(msg) => touched.password && errors.password ? <div className='text-danger'>{msg}</div> : null}
                  </ErrorMessage>

                </div>
                <div>
                  <label htmlFor="phoneNumber" className='mb-2'>Phone Number <span className='text-danger'> *</span></label>
                  <Field type="text" className="form-control " id="phoneNumber" placeholder="Phone Number" name="phoneNumber" />
                  <ErrorMessage name="phoneNumber" component="div" className="error-message text-danger" >
                    {(msg) => touched.phoneNumber && errors.phoneNumber ? <div className='text-danger'>{msg}</div> : null}
                  </ErrorMessage>
                </div>
                <div>
                  <label htmlFor="gender" className='mb-2'>Gender <span className='text-danger'> *</span></label>
                  <Field as="select" className="form-control" placeholder="Gender" id="gender" name="gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="error-message text-danger" >
                    {(msg) => touched.gender && errors.gender ? <div className='text-danger'>{msg}</div> : null}
                  </ErrorMessage>
                </div>

                <div>
                  <label htmlFor="role" className='mb-2'>Role</label>
                  <Field as="select" className="form-control" id="role" name="role">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="hospital">Hospital</option>
                    <option value="patient">User</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="error-message text-danger" >
                    {(msg) => touched.role && errors.role ? <div className='text-danger'>{msg}</div> : null}
                  </ErrorMessage>
                </div>
                <div className='row justify-content-between mt-3 '>
                  <div className='col-4 text-center'>
                    <Button variant="secondary" style={{ width: '-webkit-fill-available' }} onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                  <div className='col-4'>

                  </div>
                  <div className='col-4 text-center'>
                    <Button variant="primary" type="submit" style={{ width: '-webkit-fill-available' }} disabled={isSubmitting} >
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

        </Modal.Body>
      </Modal>
    </div >
  )
}

export default Signup