import Instance from "./Axios";
import axios from "axios";
export const DoctorLogInApi = async (data) => {
  return await Instance.post("/auth/doctor/sign-in", data);
};
export const getApointmentByDate = async (date) => {
  return await Instance.get(
    `/appointment/doctor-appointments?status=upcoming&date=${date}`
  );
};
export const getAllApointment = async () => {
  return await Instance.get(
    "/appointment/doctor-appointments?status=completed"
  );
};
