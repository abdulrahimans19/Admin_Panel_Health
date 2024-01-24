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

export const getPharmaCategory = async () => {
  return await Instance.get("/main-categories/pharma");
};
export const MainDoctorCategories = async (data) => {
  return await Instance.get("/main-categories/doctor");
};
export const DoctorRequests = async () => {
  return await Instance.get("/doctor/admin/pending-doctor");
};
export const AprovetDoctor = async (id) => {
  console.log(id);
  return await Instance.get(`/doctor/admin/accept-doctor?doctor_id=${id}`);
};

export const GetAllDoctors = async (page = 1) => {
  console.log("page number is == ", page);
  return await Instance.get(`/doctor/admin/all?page=${page}`);
};

export const CanclationDoctor = async (id) => {
  return await Instance.get(`/doctor/admin/decline-doctor?doctor_id=${id}`);
};
