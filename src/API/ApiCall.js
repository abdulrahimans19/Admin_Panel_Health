import Instance from "./Axios";

export const RegisterDatacall = async (data) => {
  return await Instance.post("/userregister", data);
};
export const Validate = async (data) => {
  return await Instance.get(`/userregister?user=${data}`);
};
export const LoginUserdata = async (data) => {
  return await Instance.post("/auth/sign-in", data);
};

export const SignupUserdata = async(data) =>{
  return await Instance.post("/auth/doctor/sign-up", data);
};

export const DoctorForgotdata = async(data) =>{
  return await Instance.post("/auth/doctor/forgot-password", data);
} ;










