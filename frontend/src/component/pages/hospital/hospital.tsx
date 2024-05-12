import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Carousel, Col, Container, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap'
import './hospital.css';
import { toast } from 'react-toastify';
import { getEmergencyDetails } from '../../service/emergencyDetails';
import GoogleMapReact from '../hospital/maps';
import men from "../../../assets/men.jpg";
import Report from './Report';
const Hospital = ({ loggedOFF }: any) => {

  const [emergencyData, setEmergencyData] = useState<any>([]);
  const [uiTimer, setUiTimer] = useState(0);
  const [report, setReport] = useState<boolean>(false);
  const AnyReactComponent = ({ text }: any) => <div>{text}</div>;
  const defaultProps: any = {
    center: {
      lat: "11.0168445",
      lng: "76.9558321"
    },
    zoom: 11
  }

  const getDetails = () => {
    try {
      getEmergencyDetails().then((res: any) => {

        if (res && res.status === 200) {
          // toast.success("Founded Some Data", {
          //   position: "top-center",
          //   autoClose: 4000,
          // });
          setEmergencyData(res.data);
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
    catch (err) {
      toast.error('network error', {
        position: "top-center",
        autoClose: 4000, // Close after 4 seconds
      });
    }
  }


  useEffect(() => {
    getDetails();// Initial call
    const interval = setInterval(() => {
      getDetails();
      setUiTimer(0);// Fetch markers every 30 seconds
    }, 30000);
    const uiTimerInterval = setInterval(() => {
      setUiTimer(prevTimer => prevTimer + 1); // Update UI timer every second
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(interval);
      clearInterval(uiTimerInterval);
    };
  }, []);


  return (
    <div className='background-hospital-Image'>
      <header className='w-100'>
        <Row style={{ width: '100vw' }} className='p-2'>
          <Col xs={4} sm={4} lg={4} md={4} className='d-flex justify-content-center align-items-center'>
            <div >
              Accidental Emergency Information System
            </div>
          </Col>
          <Col xs={4} sm={6} lg={4} md={4} className='d-flex justify-content-center align-items-center'>
            <div className='text-center'>
              Hospital Admin
            </div>
          </Col>
          <Col xs={4} sm={6} lg={4} md={4} className='d-flex justify-content-end align-items-center'>
            <div className='text-end'>
              <DropdownButton
                title={<img src={men} style={{ borderRadius: "50%" }} alt="icon" width={50} height={30} />}
              >
                <Dropdown.Item onClick={() => setReport(true)} className='text-center'> Report</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setReport(false)} className='text-center'> Emergency Details</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => loggedOFF()} className='text-center' >Logout</Dropdown.Item>

              </DropdownButton>
            </div>
          </Col>
        </Row>
      </header>
      <main>
        {report ? <Report /> : <><div className='d-flex justify-content-end'>
          <span className="p-2 text-red" style={{ cursor: "pointer" }} onClick={() => getDetails}>
            <span className='text-danger'>
              click or {uiTimer} second automatically to get Data
            </span>
          </span>
        </div><div>
            <Row className='px-3'>
              {emergencyData.map((value: any, index: number) => (
                <Col xs={12} sm={5} lg={5} md={5}>
                  <Card className='size-hospital'>
                    <Card.Body>
                      <div style={{ width: "100%", height: "100px" }}>
                        <GoogleMapReact
                          latitude={value.latitude} // New York City latitude
                          longitude={value.longitude} // New York City longitude
                          zoom={8} />
                      </div>
                      <Card.Title className='mt-2 text-center'>Accident Happened This Patient: {value.lastName}</Card.Title>
                      <Card.Body className='d-flex justify-content-center'>
                        <Table className='mt-5'>
                          <tbody>
                            <tr>
                              <th>
                                Email
                              </th>
                              <td>
                                {value?.email}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                BloodGroup
                              </th>
                              <td>
                                {value?.bloodGroup}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                FirstName
                              </th>
                              <td>
                                {value?.firstName}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                LastName
                              </th>
                              <td>
                                {value?.lastName}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                FamilyDoctorContact
                              </th>
                              <td>
                                {value?.familyDoctorContact}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                EmergencyContactNumber
                              </th>
                              <td>
                                {value?.emergencyContactNumber}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                ContactNumber
                              </th>
                              <td>
                                {value?.contactNumber}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                      <div className='d-flex justify-content-center'>
                        <Button className='text-center' variant="primary">Viewed & Delete</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div></>}
      </main >
    </div >
  )
}

export default Hospital;