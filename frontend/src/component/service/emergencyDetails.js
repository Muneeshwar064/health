import axios from "axios";
export const getEmergencyDetails= async () => {
    return await axios.get(
      process.env.REACT_APP_API_PATIENT_DETAILS + "/api/hospital/userdetail",
    );
  };