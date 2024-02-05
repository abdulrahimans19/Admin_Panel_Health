import Instance from "./Axios";
import axios from "axios";
export const DoctorLogInApi = async (data) => {
  return await Instance.post("/auth/doctor/sign-in", data).catch((err) => {
    console.log(err);
  });
};
export const getApointmentByDate = async (date, page = 1) => {
  return await Instance.get(
    `/appointment/doctor-appointments?status=upcoming&date=${date}&&page=${page}`
  ).catch((err) => {
    console.log(err);
  });
};
export const getAllApointment = async (page = 1) => {
  return await Instance.get(
    `/appointment/doctor-appointments?status=completed&&page=${page}`
  ).catch((err) => {
    console.log(err);
  });
};

export const getMyWithdrawelHisoty = async (page = 1) => {
  console.log(page, "in page is page");

  return await Instance.get(
    `/withdrawal/my-withdrawal-requests?page=${page}`
  ).catch((err) => {
    console.log(err);
  });
};
export const updateAppointmentApi = async (data) => {
  return await Instance.post(
    `/appointment/update-appointment-status`,{appoinment_id:data}
  ).catch((err) => {
    console.log(err);
  });
};
export const addPrescription = async (data) => {
  return await Instance.post(
    `appointment/add-prescription`,data
  ).catch((err) => {
    console.log(err);
  });
};