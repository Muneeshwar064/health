import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { loginUserList } from '../../../service/loginList';
import men from "../../../../assets/men.jpg";
import women from "../../../../assets/female.jpg";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SideLeftOverLayout from './sideLeftOverLayout';
import { toast } from 'react-toastify';
import { deletePatient } from '../../../service/PatientDetails';
function PatientDetailList() {

    const [patientDetail, setPatientDetail] = useState<any>([]);
    const [patientUserDetail, setPatientUserDetail] = useState<any>({ show: false, details: [] });
    const [editPatientUserDetail, setEditPatientUserDetail] = useState<any>({ show: false, details: [] });
    const deleteUser = (val: any) => {
        setEditPatientUserDetail({ show: false, details: [] })
        try {
            deletePatient({ email: val[0].email }).then((res: any) => {
                if (res && res.status === 200) {
                    toast.success("success", {
                        position: "top-center",
                        autoClose: 100,
                    });
                    userList();
                    setEditPatientUserDetail({ show: false, details: [] })
                }
            }).catch((err) => {
                toast.error("Failed", {
                    position: "top-center",
                    autoClose: 1000,
                });
                setEditPatientUserDetail({ show: false, details: [] })

            })
        }
        catch (err) {
            toast.error("Failed", {
                position: "top-center",
                autoClose: 1000,
            });
            setEditPatientUserDetail({ show: false, details: [] })

        }
    }


    const userList = () => {

        try {
            loginUserList({ "role": "patient" }).then((res) => {
                if (res && res.status === 200) {
                    setPatientDetail(res.data);
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        catch (err) {
            console.log(err);
        }


    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        userList()
    }, [])


    return (

        <div className='text-white p-3'>

            <Card  >

                <h4 className='text-center'> User Detail List</h4>

                <Card.Body style={{ height: 'calc(100vh - 145px)', overflowY: 'scroll', border: '1px solid black' }} className='scrollbar'>
                    <div className='grid-container'>
                        {
                            patientDetail && patientDetail.length !== 0 && patientDetail.map((val: any, index: number) => (
                                <div className='grid-item' key={index}>
                                    <Card >
                                        <Card.Body>
                                            {val?.gender === "male" ? <Card.Img variant="top" src={men} width={70} height={100} alt="men" /> : <Card.Img variant="top" src={women} width={700} height={100} alt="women" />}
                                            <div className='text-center mt-2'> {val?.name}</div>
                                            <div className='d-flex justify-content-between' onClick={() => setEditPatientUserDetail({ show: true, details: [val] })}><MdEdit size={25} />
                                                <MdDelete size={25} onClick={() => setPatientUserDetail({ show: true, details: [val] })} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </Card.Body>
            </Card>

            {patientUserDetail.show && <Modal centered show={patientUserDetail.show} onHide={() => setPatientUserDetail({ show: false, details: [] })}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure You Want To Delete You can't Recover This Client Another Time</Modal.Body>
                <Modal.Footer>

                    <Button variant="success" onClick={() => deleteUser(patientUserDetail.details)}>
                        Delete User
                    </Button>
                </Modal.Footer>
            </Modal>}

            {editPatientUserDetail.show && <SideLeftOverLayout show={editPatientUserDetail.show} val={editPatientUserDetail.details} handleClose={() => setEditPatientUserDetail({ show: false, details: [] })} />}
        </div>
    )
}

export default PatientDetailList;