import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import { loginUserList } from '../../../service/loginList';
import men from "../../../../assets/men.jpg";
import women from "../../../../assets/female.jpg";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const hospitalDetailList = ({ hospital }: any) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hospitalDetail, setHospitalDetail] = useState<any>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hospitalUserDetail, setHospitalUserDetail] = useState<any>({ show: false, details: [] });
    console.log(hospitalUserDetail);

    const deleteUser = (val: any) => {
        console.log(val[0].email)

    }

    const hospitalList = () => {
        try {
            loginUserList({ "role": "hospital" }).then((res) => {
                if (res && res.status === 200) {
                    setHospitalDetail(res.data);
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
        hospitalList();

    }, [])

    return (

        <div className='text-white p-3'>
            <Card  >
                <h4 className='text-center '> Hospital Detail List</h4>
                <Card.Body style={{ height: 'calc(100vh - 145px)', overflowY: 'scroll', border: '1px solid black' }} className='scrollbar'>
                    <div className='grid-container'>
                        {
                            hospitalDetail && hospitalDetail.length !== 0 && hospitalDetail.map((val: any, index: number) => (
                                <div className='grid-item ' key={index}>
                                    <Card >
                                        <Card.Body>
                                            {val?.gender === "male" ? <Card.Img variant="top" src={men} width={70} height={100} alt="men" /> : <Card.Img variant="top" src={women} width={700} height={100} alt="women" />}
                                            <div className='text-center mt-2'> {val?.name}</div>
                                            <div className='d-flex justify-content-between'><MdEdit size={25} />
                                                <MdDelete size={25} onClick={() => setHospitalUserDetail({ show: true, details: [val] })} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </Card.Body>
            </Card>


            {hospitalUserDetail.show && <Modal centered show={hospitalUserDetail.show} onHide={() => setHospitalUserDetail({ show: false, details: [] })}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure You Want To Delete You can't Recover This Client Another Time</Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="danger" onClick={() => setHospitalUserDetail({ show: false, details: [] })}>
                        Close
                    </Button> */}
                    <Button variant="success" onClick={() => deleteUser(hospitalUserDetail.details)}>
                        Delete User
                    </Button>
                </Modal.Footer>
            </Modal>}

        </div>

    )
}


export default hospitalDetailList;