import Instance from "./Axios";
import axios from "axios";
export const DoctorLogInApi= async (data) => {
    return await axios.post("http://15.207.227.81:3001/api/auth/doctor/sign-in", data);
  };
  