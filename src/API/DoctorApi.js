import Instance from "./Axios";
import axios from "axios";
export const DoctorLogInApi = async (data) => {
  return await Instance.post("/auth/doctor/sign-in", data);
};
export const getApointmentByDate = async (date, page = 1) => {
  return await Instance.get(
    `/appointment/doctor-appointments?status=upcoming&date=${date}&&page=${page}`
  );
};
export const getAllApointment = async (page = 1) => {
  return await Instance.get(
    `/appointment/doctor-appointments?status=completed&&page=${page}`
  );
};
