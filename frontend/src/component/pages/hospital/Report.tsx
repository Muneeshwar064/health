import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { getPatientDetails, getUserListDetail } from '../../service/PatientDetails';
import { IoSearchOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
const Report = () => {
    const [reportData, setReportData] = useState<any>([]);
    const [findReportData, setFindReportData] = useState<any>([]);
    const [inputValue, setInputValue] = useState<string>("");
    useEffect(() => {
        try {
            getUserListDetail().then((res: any) => {
                console.log(res);
                if (res && res.status === 200) {
                    setReportData(res.data);
                }
                else {
                    alert("some error occur");
                }
            }).catch((err: any) => {
                alert("some error occur");
            })
        }
        catch (err) {
            alert("some error occur");
        }
    }, []);
    function searchDataByEmail(email: string, data: []) {
        return data.filter((item: any) => item.email.toLowerCase() === email.toLowerCase());
    }
    const reduceValue = () => {
        const emailPresent = searchDataByEmail(inputValue, reportData);
        setFindReportData(emailPresent);
        console.log(emailPresent);
    }

    return (
        <div className="d-flex justify-content-center align-items-center sizeReducer" >
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <h5 className='text-center'>Report User Details</h5>
                    <div className='absolute-container'>
                        <input type='email' placeholder='Email' onChange={(e) => setInputValue(e.target.value)} className='w-100' />
                        <div className="absolute-child">
                            <MdCancel color='red' className="mx-2" onClick={() => setFindReportData([])} />
                            <IoSearchOutline size={22} onClick={reduceValue} />
                        </div>
                    </div>
                    <div className='reportCardSlice'>
                        {findReportData && findReportData.length === 0 && <div className=' mt-3  d-flex justify-content-center'><h5> No Found Data</h5> </div>}
                        {findReportData && findReportData.length !== 0 && findReportData.map((value: any) => (
                            <Table striped bordered hover className='mt-5' size='xs'>
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

                        ))
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Report