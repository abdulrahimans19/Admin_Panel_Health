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
export const getPharmaOrders = async () => {
  return await Instance.get("/order/pharma/all-orders");
};
export const getTransactionForHomeCare = async (startDate, endDate) => {
  return await Instance.get("/admin/transaction/home-care", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};
export const getTransactionForPharmacy = async (startDate, endDate) => {
  return await Instance.get("/admin/transaction/pharma", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};

export const getTransactionForFood = async (startDate, endDate) => {
  return await Instance.get("/admin/transaction/food", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};
export const addFoodCategory = async (data) => {
  return await Instance.post(`/main-categories/food/create`, data);
};
export const UpadateFoodCategory = async (data) => {
  return await Instance.put(`/main-categories/food/update`, data);
};
export const createFoodSubCategory = async (data) => {
  return await Instance.post(`/sub-categories/create`, data);
};
export const getFoodSubCategory = async (data) => {
  return await Instance.get(`sub-categories/${data}`);
};
export const getFoodCategory = async () => {
  return await Instance.get("/main-categories/food");
};
export const getFoodProducts = async () => {
  return await Instance.get("/product/food");
};
export const getFoodOrders = async () => {
  return await Instance.get("/order/food/all-orders");
};
export const getFoodReview = async (foodId, page) => {
  try {
    const response = await Instance.get(`/review/get-review/${foodId}`, {
      params: {
        page: page,
      },
    });

    // Handle the response
    console.log(response.data);
    return response.data; // You can also return the data if needed
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // You can throw the error again if needed
  }
};

export const SignupUserdata = async (data) => {
  return await Instance.post("/auth/doctor/sign-up", data);
};

export const DoctorForgotdata = async (data) => {
  return await Instance.post("/auth/doctor/forgot-password", data);
};

export const MainDoctorCategories = async (data) => {
  return await Instance.get("/main-categories/doctor");
};
export const DoctorRequests = async () => {
  return await Instance.get("/doctor/admin/pending-doctor");
};
export const AprovetDoctor = async (id) => {
  return await Instance.get(`/doctor/admin/accept-doctor?doctor_id=${id}`);
};
export const GetHomecareCategoriesApi = async () => {
  return await Instance.get(`/main-categories/home-care`);
};
export const getAllLabTestsApi = async () => {
  return await Instance.get(`/tests`);
};
export const getRecommendedTestApi = async () => {
  return await Instance.get(`tests/all-tests?recommended=${true}`);
};
export const getDisbledTestApi = async () => {
  return await Instance.get(`tests/all-tests?disabled=${true}`);
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

export const addCategory = async (data) => {
  return await Instance.post(`/main-categories/pharma/create`, data);
};
export const UpadateCate = async (data) => {
  return await Instance.put(`/main-categories/pharma/update`, data);
};
export const createSubCategory = async (data) => {
  return await Instance.post(`/sub-categories/create`, data);
};
export const getSubCatData = async (data) => {
  return await Instance.get(`sub-categories/${data}`);
};
export const monthlyEarningApi = async (data) => {
  console.log(data);
  console.log(`/order/monthly-earnings?type=/${data}`);
  return await Instance.get(`/order/monthly-earnings?type=${data}`);
};
export const GetAllDoctors = async (page = 1) => {
  console.log(page, " = = =page in api");

  return await Instance.get(`/doctor/admin/all?page=${page}`);
};

export const CanclationDoctor = async (id) => {
  return await Instance.get(`/doctor/admin/decline-doctor?doctor_id=${id}`);
};
export const getPharmaProductApi = async (pageNumber) => {
  return await Instance.get(`/product/pharma?page=${pageNumber}`);
};
export const totalDoctorApi = async (pageNumber) => {
  return await Instance.get(`/admin/total-doctor`);
};
export const TotalAppointmentApi = async (pageNumber) => {
  return await Instance.get(`/admin/new-appoinments`);
};
export const getProductApi = async (data) => {
  return await Instance.get(`/review/get-review${data}`);
};
export const BlockOrUnBlockDoctor = async (id) => {
  console.log("Block or un block doctur ");
  return await Instance.get(
    `/doctor/admin/change-block-status?doctor_id=${id}`
  );
};

export const GetAllBlockd = async () => {
  return await Instance.get("/doctor/admin/blocked-doctor");
};

export const GetDoctorWithdrawalRequsts = async (page) => {
  return await Instance.get("/withdrawal/withdrawal-requests?page=1");
};

export const AprovingwithdrawalRequest = async (id) => {
  return await Instance.post(`/withdrawal/accept-withdrawal-request/${id}`);
};

export const getAppoinmentsApi = async (year,month,date) => {
  return await Instance.get(`/bookings/all?date=${year}-${month}-${date}`);
};