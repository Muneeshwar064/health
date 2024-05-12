import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import person from "../../../../assets/person.png"
function userDetailspopUp({ show, handleClose, userData }: any) {
    console.log(userData);
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>

                <Modal.Body>
                    <h4 className='text-center'> SuccessFully Registered Above Detail</h4>
                    <div className='d-flex justify-content-center mt-2'>
                        <Image width={150} height={150} src={person} roundedCircle />
                    </div>

                    <div className='text-center'>
                        <div className='mt-2'>
                            Name : {userData.name}
                        </div>
                        <div className='mt-2'>
                            Email : {userData.email}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default userDetailspopUp