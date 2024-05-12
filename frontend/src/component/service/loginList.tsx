import axios from "axios";
export const loginUserList = async (values: any) => {
    console.log(values);
  return await axios.get(
    process.env.REACT_APP_API_USER_LOGIN + "/api/users/userList",
    { params: {
        role:values?.role
      }}
  );
};
