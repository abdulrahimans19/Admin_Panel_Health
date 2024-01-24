import Instance from "./Axios";
import axios from "axios";
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

export const UploadImageUrl = async (token) => {
  return await Instance.get("/aws/generate-presigned-url").then(
    async ({ data }) => {
      const presignedUrl = data.data.presignedUrl;
      const imageUrl = data.data.publicUrl;
      return data;
    }
  );
};
export const uploadToAws = async (presignedUrl, uploadImage) => {
  try {
    console.log(uploadImage, "image");
    let response = await axios.put(presignedUrl, uploadImage, {
      headers: {
        "Content-Type": uploadImage.type,
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addCategory=async (data)=>
{

  return await Instance.post(`/main-categories/pharma/create`,data);
}
export const UpadateCate =async (data)=>
{
  return await Instance.put(`/main-categories/pharma/update`,data);

}