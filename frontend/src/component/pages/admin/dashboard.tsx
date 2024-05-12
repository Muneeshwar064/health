import React, { useEffect, useState } from 'react'
import { ButtonGroup, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import PatientDetailList from './Fragment/patientDetailList';
import HospitalDetailList from './Fragment/hospitalDetailList';
import "./dashboard.css";
import men from "../../../assets/men.jpg";
import { loginUserList } from '../../service/loginList';

const Dashboard = ({ loggedOFF }: any) => {

  const logOff = () => {
    sessionStorage.setItem("isLoggedIn", 'false');
    sessionStorage.setItem("access_token", "");
    sessionStorage.setItem("role", "");
    loggedOFF();
  }

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
              Project Admin
            </div>
          </Col>
          <Col xs={4} sm={6} lg={4} md={4} className='d-flex justify-content-end align-items-center'>
            <div className='text-end'>
              <DropdownButton
                title={<img src={men} style={{ borderRadius: "50%" }} alt="icon" width={50} height={30} />}
              >
                <Dropdown.Item onClick={() => loggedOFF()} >Logout</Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </header>
      <main>
        <Container>
          <Row>
            <Col>
              <PatientDetailList />
            </Col>
            <Col>
              <HospitalDetailList />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard;