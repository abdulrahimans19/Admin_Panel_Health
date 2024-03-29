import Instance from "./Axios";
import axios from "axios";
import BulkInstance from "./BultAxios";
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
  return await Instance.post("/doctor/check-doctor-email", { email });
};

export const VerifyEmail = async (email, otp) => {
  return await Instance.post("/auth/doctor/verify-email", { email, otp });
};
export const forgotOtp = async (email, otp) => {
  return await Instance.post("/auth/doctor/validate-otp", { email, otp });
};
export const SetPassword = async (email, reset_password_token, password) => {
  return await Instance.post("/auth/doctor/set-password", {
    email,
    reset_password_token,
    password,
  });
};

export const getPharmaCategory = async () => {
  return await Instance.get("/main-categories/pharma");
};
export const getTransactionForHomeCare = async (startDate, endDate, page) => {
  return await Instance.get(`/admin/transaction/home-care?page=${page}`, {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};
export const getTransactionForPharmacy = async (startDate, endDate, page) => {
  return await Instance.get(`/admin/transaction/pharma?page=${page}`, {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};

export const getTransactionForFood = async (startDate, endDate, page) => {
  return await Instance.get(`/admin/transaction/food?page=${page}`, {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};
export const addFoodCategory = async (data) => {
  return await Instance.post("/main-categories/food/create", data);
};

// Import your Axios instance

export const GetOrderDetails = async (data) => {
  return await Instance.get(`order/get-details?id=${data}`);
};
export const GetHomeCareOrder = async (data) => {
  return await Instance.get(`admin/single/home-care-details?id=${data}`);
};

export const getFoodCategory = async () => {
  return await Instance.get("/main-categories/food");
};
export const getFoodProducts = async () => {
  return await Instance.get("/product/food");
};
export const getFoodOrders = async (page) => {
  return await Instance.get(`/order/food/all-orders?page=${page}`);
};

export const editFoodProduct = async (data) => {
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
  return await Instance.get("/main-categories/doctor", data);
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
  return await Instance.get(`/order/monthly-earnings?type=${data}`);
};
export const GetAllDoctors = async (page = 1) => {
  return await Instance.get(`/doctor/admin/all?page=${page}`);
};
export const GetSearchAllDoctors = async (search) => {
  return await Instance.get(`/doctor/admin/all?search=${search}`);
};

export const filterCategoryByIdApi = async (categoryId, page, search) => {
  try {
    const response = await Instance.get(`/doctor/admin/all`, {
      params: {
        page: page,
        category_id: categoryId,
        search: search,
      },
    });

    return response.data; // You can also return the data if needed
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // You can throw the error again if needed
  }
};

export const blockedfilterCategoryByIdApi = async (
  categoryId,
  page,
  search
) => {
  console.log("api thias");
  try {
    //pending-doctor
    const response = await Instance.get(`/doctor/admin/blocked-doctor`, {
      params: {
        page: page,
        category_id: categoryId,
        search: search,
      },
    });

    return response.data; // You can also return the data if needed
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // You can throw the error again if needed
  }
};

export const pendingfilterCategoryByIdApi = async (
  categoryId,
  page,
  search
) => {
  console.log("api thias");
  try {
    //pending-doctor
    const response = await Instance.get(`/doctor/admin/pending-doctor`, {
      params: {
        page: page,
        category_id: categoryId,
        search: search,
      },
    });

    return response.data; // You can also return the data if needed
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // You can throw the error again if needed
  }
};

export const CanclationDoctor = async (id) => {
  return await Instance.get(
    `/doctor/admin/decline-doctor?doctor_id=${id}`
  ).then((err) => console.log(err));
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
    })
    .catch((error) => console.error("Error fetching country data:", error));
};

export const AllCountry = async (data) => {
  const apiUrl = "https://trial.mobiscroll.com/content/countries.json";

  return await fetch(apiUrl)
    .then((response) => response.json())
    // .then((data) => {
    //   const countriesArray = data.map((country) => ({
    //     name: country.name.common,
    //     code: country.cca2,
    //   }));
    //   return countriesArray;
    //   // Now 'countriesArray' contains information about all countries
    // })
    .catch((error) => console.error("Error fetching country data:", error));
};

export const editPharmaProduct = async (data) => {
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
export const getPharmaOrders = async (page) => {
  return await Instance.get(`/order/pharma/all-orders?page=${page}`);
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
  console.log(year, month, date);
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
  return await Instance.put(`/tests/update`, data);
};
export const getSingleTestApi = async (id) => {
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
export const fcmTOkenRemoveApi = async () => {
  const fcm = localStorage.getItem("sophwe_fcm");
  return await Instance.post("/user/remove-fcm-token", { fcm_token: fcm });
};
export const BulkUploadApi = async ({ wholeData, type }) => {
  return await BulkInstance.post(`/product/${type}/create/multiple`, wholeData);
};
