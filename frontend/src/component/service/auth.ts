import axios from "axios";
export const logIn = async (values: any) => {
  return await axios.post(
    process.env.REACT_APP_API_USER_LOGIN + "/api/users/login",
    values
  );
};

export const signUp = async (values: any) => {
  return await axios.post(
    process.env.REACT_APP_API_USER_LOGIN + "/api/users",
    values
  );
};

export const PasswordChange = async(values:any)=>{
  return await axios.post(
    process.env.REACT_APP_API_USER_LOGIN + "/api/users/Change_Password",
    values
  );
}
