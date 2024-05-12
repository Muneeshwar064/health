import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  },
};

export const getPatientDetails = async () => {
  return await axios.get(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/PatientDetails",
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    }
  );
};
export const AddPatientDetails = async (values: any) => {
  return await axios.post(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/PatientDetails",
    JSON.stringify(values),
    config
  );
};
export const updatePatientDetails = async (values: any) => {
  return await axios.put(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/PatientDetails",
    JSON.stringify(values),
    config
  );
};
export const deletePatientDetails = async (values: any) => {
  return await axios.delete(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/PatientDetails/" + values,
    config
  );
};

export const adminPatientEdit = async (values: any) => {
  return await axios.patch(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/PatientDetails/admin",
    values
  );
};

export const getPatientDetailSingleList = async (values: any) => {
  return await axios.get(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/PatientDetails/admin",
    {
      params: {
        email: values,
      },
    }
  );
};

export const mailCall = async (values: any) => {
  return await axios.post(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/mail",
    values
  );
};

export const getUserListDetail = async () => {
  return await axios.get(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/patientDetails/patient"
  );
};

export const deletePatient = async (values:any) => {
  return await axios.post(
    process.env.REACT_APP_API_PATIENT_DETAILS + "/api/patientDetails/patient",
    values
  );
};

