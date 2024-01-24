import Instance from "./Axios";
import axios from "axios";
export const DoctorLogInApi= async (data) => {
    return await Instance.post("/auth/sign-in", data);
  };
  