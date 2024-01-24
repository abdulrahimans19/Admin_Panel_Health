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
  console.log(id);
  return await Instance.get(`/doctor/admin/accept-doctor?doctor_id=${id}`);
};
