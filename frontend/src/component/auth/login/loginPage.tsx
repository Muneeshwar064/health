import { useState } from 'react'
import './login.css'
import { Button, Card, Nav } from 'react-bootstrap'
import CommonForm from './Fragment/commonForm'
import Signup from '../signup/signup'
import UserDetailspopUp from './../signup/fragment/userDetailspopUp'
import { useNavigate } from 'react-router-dom'

const loginPage = ({ loggedIn }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loginState, setLoginState] = useState<string>("Admin")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [signUpModel, setSignUpModel] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userResponse, setUserResponse] = useState<any>();
    console.log(userResponse);

    return (
        <div className='background-Login-Image'>
            <div className='d-flex justify-content-center align-items-center'>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" className="justify-content-center" defaultActiveKey={loginState}>
                            <Nav.Item>
                                <Nav.Link eventKey="Admin" onClick={() => setLoginState("Admin")} >
                                    Administrator
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="User" onClick={() => setLoginState("User")}>User Login </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Hospital" onClick={() => setLoginState("Hospital")}>Hospital</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className='text-center'> {` ${loginState} Login`}</Card.Title>
                        <Card.Body>
                            <CommonForm role={loginState==="Admin"?"admin" : loginState==="User"? "patient":"hospital"} loggedIn={loggedIn} />
                            <div className='mt-2' >
                                <Button variant="info" type="submit" style={{ width: '-webkit-fill-available' }} onClick={() => setSignUpModel(true)}>Register Us</Button>
                            </div>
                            {signUpModel && <Signup show={signUpModel} handleClose={() => setSignUpModel(false)} loginDetail={(res: any) => setUserResponse(res)} />}
                        </Card.Body>
                    </Card.Body>
                </Card>
                {
                    userResponse && <UserDetailspopUp show={userResponse ? true : false} userData={userResponse} handleClose={() => setUserResponse(false)} />
                }
            </div>
        </div>
    )
}

export default loginPage