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
export const UserEmailVerify = async (email) => {
  console.log("verify email", email);
  return await Instance.post("/doctor/check-doctor-email", { email });
};

export const VerifyEmail = async (email, otp) => {
  return await Instance.post("/auth/doctor/verify-email", { email, otp });
};
export const forgotOtp = async (email, otp) => {
  return await Instance.post("/auth/doctor/validate-otp", { email, otp });
};
export const SetPassword = async (email, reset_password_token, password) => {
  console.log("passwordsss:", email, reset_password_token, password);
  return await Instance.post("/auth/doctor/set-password", {
    email,
    reset_password_token,
    password,
  });
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
export const addFoodCategory = async (data) => {
  return await Instance.post("/main-categories/food/create", data);
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

export const editFoodProduct = async (data) => {
  console.log(data);
  return await Instance.put(`/product/food/update`, data);
};

export const filterFoodAPi = async (data, page) => {
  return await Instance.get(`product/all-products/${data}?page=${page}`);
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

export const DoctorForgotdata = async (email) => {
  return await Instance.post("/auth/doctor/forgot-password", { email });
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
export const getAllLabTestsApi = async (page) => {
  return await Instance.get(`/tests?page=${page}`);
};
export const getRecommendedTestApi = async (page) => {
  return await Instance.get(`tests/all-tests?recommended=${true}&page=${page}`);
};
export const getDisbledTestApi = async (page) => {
  return await Instance.get(`tests/all-tests?disabled=${true}&page=${page}`);
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

export const teliaddCategory = async (data) => {
  return await Instance.post(`/main-categories/doctor/create`, data);
};
export const teliUpadateCate = async (data) => {
  return await Instance.put(`/main-categories/doctor/update`, data);
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
  return await Instance.get(`/doctor/admin/all?page=${page}`);
};
export const GetSearchAllDoctors = async (search) => {
  return await Instance.get(`/doctor/admin/all?search=${search}`);
};

export const CanclationDoctor = async (id) => {
  return await Instance.get(`/doctor/admin/decline-doctor?doctor_id=${id}`);
};
export const getPharmaProductApi = async (pageNumber) => {
  return await Instance.get(`/product/pharma?page=${pageNumber}`);
};
export const getFoodProductApi = async (pageNumber) => {
  return await Instance.get(`/product/food?page=${pageNumber}`);
};
export const disableFoodProduct = async (data) => {
  return await Instance.delete(`/food/${data}`);
};
export const disabledFoodProductApi = async (data) => {
  return await Instance.get(`/product/admin/disabled?type=FOOD&page=${data}`);
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

export const GetDoctorWithdrawalRequsts = async (page = 1) => {
  return await Instance.get(`/withdrawal/withdrawal-requests?page=${page}`);
};

export const AprovingwithdrawalRequest = async (id) => {
  return await Instance.post(`/withdrawal/accept-withdrawal-request/${id}`);
};
export const addProductApi = async (data) => {
  return await Instance.post(`/product/pharma/create`, data);
};
export const addFoodProductApi = async (data) => {
  return await Instance.post(`/product/food/create`, data);
};

export const countryCodesApi = async (data) => {
  const apiUrl = "https://restcountries.com/v3.1/all";

  return await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const countriesArray = data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
      return countriesArray;
      // Now 'countriesArray' contains information about all countries
      console.log(countriesArray);
    })
    .catch((error) => console.error("Error fetching country data:", error));
};

export const editPharmaProduct = async (data) => {
  console.log(data);
  return await Instance.put(`/product/pharma/update`, data);
};
export const disabledFarmaProductApi = async (data) => {
  return await Instance.get(`/product/admin/disabled?type=PHARMA&page=${data}`);
};
export const filterPharmaAPi = async (data, page) => {
  return await Instance.get(`product/all-products/${data}?page=${page}`);
};
export const GetDrAprovedWithdrawalRequsts = async (page = 1) => {
  return await Instance.get(
    `/withdrawal/accepted-withdrawal-requests?page=${page}`
  );
};
export const getAppoinmentsApi = async (year, month, date, page) => {
  return await Instance.get(
    `/bookings/all?date=${year}-${month}-${date}&page=${page}`
  );
};
export const getLabTestsbyCategoryApi = async (cat_id) => {
  return await Instance.get(`/tests?category_id=${cat_id}`);
};
export const getCategoryDetailsById = async (cat_id) => {
  console.log(cat_id);
  return await Instance.post(
    `/sub-categories/get-category-details?id=${cat_id}`
  );
};

export const getFoodSubCategory = async (data) => {
  return await Instance.get(`sub-categories/${data}`);
};
export const UpadateFoodCategory = async (data) => {
  return await Instance.put(`/main-categories/food/update`, data);
};
export const getPharmaOrders = async () => {
  return await Instance.get("/order/pharma/all-orders");
};
export const disablePharmaProduct = async (data) => {
  return await Instance.delete(`/product/${data}`);
};
export const getAllCouponsApi = async (data) => {
  return await Instance.get(
    `/coupon/get-all?page=1&pageSize=${data}&pageSize=5`
  );
};

export const addCouponApi = async (data) => {
  return await Instance.post(`/coupon/create`, data);
};

export const updateCouponApi = async (data) => {
  return await Instance.put(`/coupon/update`, data);
};
export const addHomecareCategory = async (data) => {
  return await Instance.post(`main-categories/home-care/create`, data);
};
export const getRecommendedTestsbyCategoryApi = async (cat_id, page) => {
  return await Instance.get(
    `tests/all-tests?recommended=${true}&page=${page}&category_id=${cat_id}`
  );
};
export const getDisbledTestByCatApi = async (cat_id) => {
  return await Instance.get(
    `tests/all-tests?disabled=${true}&category_id=${cat_id}`
  );
};
export const getCurrentAppoinmentsApi = async (year, month, date, page) => {
  return await Instance.get(
    `/bookings/all?date=${year}-${month}-${date}&page=${page}`
  );
};
export const homeCareUpadateCate = async (data) => {
  return await Instance.put(`/main-categories/home-care/update`, data);
};
export const createTests = async (data) => {
  return await Instance.post(`/tests/create`, data);
};
export const editTests = async (data) => {
  console.log("to update", data);
  return await Instance.put(`/tests/update`, data);
};
export const getSingleTestApi = async (id) => {
  console.log(id);
  return await Instance.get(`/tests/single/${id}`);
};
export const disableTest = async (id) => {
  return await Instance.delete(`/tests/delete?id=${id}`);
};
export const recommendedTest = async (id) => {
  return await Instance.put(`/tests/update-recommended?test_id=${id}`);
};
export const getAllCategoryTests = async () => {
  return await Instance.put(`/tests`);
};
export const addResultApi = async (data) => {
  return await Instance.post(`/bookings/add-result`, data);
};

export const getDoctorProfileAndWallet = async () => {
  return await Instance.get("/doctor/doctor-profile");
};
export const getApointments = async (endDate) => {
  return await Instance.get(
    `/appointment/total-appoinments?startDate=01/25/2023&endDate=${endDate}`
  ).catch((err) => {
    console.log(err);
  });
};
export const addWithdrawRequest = async (data) => {
  return await Instance.post("/withdrawal/add-withdrawal-request", data);
};
export const getAvailableSlot = async () => {
  return await Instance.get("/slots/time-slots");
};

export const addAvailableSlot = async (data) => {
  return await Instance.post("doctor/add-slots", data);
};

export const getTodayApointments = async (page = 1) => {
  return await Instance.get(
    `/appointment/doctor-appointments?status=upcoming&&page=${page}`
  );
};
export const getNotificationApi = async () => {
  return await Instance.get(`/notification`);
};
export const readNotification = async (data) => {
  return await Instance.post(`/notification/mark-read?id=${data}`);
};
export const unreadNotification = async () => {
  return await Instance.get(`/notification/read?read=false`);
};

export const updateFcmApi = async (data) => {
  return await Instance.post(`/user/update-fcm-token`, data);
};
export const sendNotification = async (data) => {
  return await Instance.post(`/notification/send-notification`, data);
};
export const updatesubcat = async (data) => {
  return await Instance.put(`/sub-categories/update`, data);
};