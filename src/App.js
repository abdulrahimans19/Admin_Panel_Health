import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import LoggedInUser from "./ProtectedRoutes/AdminLoggedOut";
import LoggedOutUser from "./ProtectedRoutes/AdminLoggedIn";
import Home from "./Pages/Admin/Home";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Admin/Dashboard";
import Homecare from "./Pages/Admin/homecare/HomecareCategories";
import TeleMedicine from "./Pages/Admin/telemedicine/TeleMedicine";
// import Pharmacy from "./Pages/Admin/Pharmacy";
// import Pharmacy from "./Pages/Admin/Pharmacy";
import Food from "./Pages/Admin/Food";
import Transaction from "./Pages/Admin/Transaction";
import ForgotPassword from "./Pages/Forgot";
import Success from "./Pages/succes";
import Otp from "./Pages/Otp";
import SetNewPass from "./Pages/SetNewPass";
import Doctor from "./Pages/Admin/telemedicine/Doctor";
import DoctorHome from "./Pages/Doctor/DoctorHome";
import LoggedInDoctor from "./ProtectedRoutes/LoggedInDoctor";
import { HomecareLabItems } from "./Pages/Admin/homecare/HomecareLabItems";
import PharmaCategory from "./Pages/Admin/pharmacy/PharmaCategory";
import PharmaProduct from "./Pages/Admin/pharmacy/PharmaProduct";
import PharmaOrder from "./Pages/Admin/pharmacy/PharmaOrder";
import PharmaReview from "./Pages/Admin/pharmacy/PharmaReview";
import AppoinmentDetails from "./Pages/Admin/homecare/AppoinmentDetails";
import FoodCategory from "./Pages/Admin/Food/Categories";
import FoodProduct from "./Pages/Admin/Food/Products";
import FoodOrder from "./Pages/Admin/Food/Orders";
import FoodReview from "./Pages/Admin/Food/Review";
import OrdeeDetails from "./components/OrderDetails";
import OverView from "./Pages/Doctor/Dashboard/OverView";
import DocTransaction from "./Pages/Doctor/transaction/Transaction";
import AppointmentHistory from "./Pages/Doctor/AppointmentHistory/AppointmentHistory";
import Appointments from "./Pages/Doctor/Appointments/Appointments";
import WithdrawalPannel from "./Pages/Admin/telemedicine/Withdrawal";
import Notification from "./components/Navbar/Notification";
import SignupProfile from "./Pages/SignupProfile";
import Coupons from "./Pages/Admin/coupons/Coupons";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { requestForToken, onMessageListener } from "./firebase/Firebaseconfig";
import { getCartItems } from "./Redux/Features/NavbarSlice";
function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  // const notify = () =>  toast(<ToastDisplay/>);
  // function ToastDisplay() {
  //   return (
  //     <div>
  //       <p><b>{notification?.title}</b></p>
  //       <p>{notification?.body}</p>
  //     </div>
  //   );
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("sophwe_token"));
    const SowphweeFcm = localStorage.getItem("sophwee_fcm");
    console.log(SowphweeFcm, "token");
console.log(user);
    if (user) {
      if (!SowphweeFcm) {
        console.log("if working");
        requestForToken();
      }
    }

    if (user?.user_role == "Admin") {
      dispatch(getCartItems());
    

    }
  }, []);

  // onMessageListener()
  //   .then((payload) => {
  //     toast.success(
  //       `${payload?.notification?.title}:${payload.notification?.body}`,
  //       {
  //         duration: 6000,
  //         position: "top-right",
  //       }
  //     );
  //     // setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
  //   })
  //   .catch((err) => console.log("failed: ", err));

  return (
    <Routes>
      <Route element={<LoggedOutUser />}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route element={<Home />} path="">
          <Route element={<Notification />} path="/notification" />
          <Route element={<OrdeeDetails />} path="/order/:orderId/details" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<TeleMedicine />} path="/telemedicine/category" />
          <Route
            element={<WithdrawalPannel />}
            path="/telemedicine/Withdrawalpannal"
          />
          {/* <Route element={<Homecare />} path="/homecare" /> */}

          <Route element={<Doctor />} path="/telemedicine/doctor" />

          {/* <Route element={<Pharmacy />} path="/pharmacy" /> */}

          <Route element={<PharmaCategory />} path="/pharmacy/category" />
          <Route element={<PharmaProduct />} path="/pharmacy/product" />
          <Route element={<PharmaOrder />} path="/pharmacy/order" />
          <Route element={<PharmaReview />} path="/pharmacy/review" />

          <Route element={<FoodCategory />} path="/food/categories" />
          <Route element={<FoodProduct />} path="/food/product" />
          <Route element={<FoodOrder />} path="/food/order" />
          <Route element={<FoodReview />} path="/food/review" />

          <Route element={<Homecare />} path="/homecare" />
          <Route element={<HomecareLabItems />} path="homecare/lab-items" />
          <Route
            element={<AppoinmentDetails />}
            path="homecare/appoinment-details"
          />
          <Route element={<Homecare />} path="/homecare/categories" />
          {/* <Route element={<Pharmacy />} path="/pharmacy" /> */}
          <Route element={<Food />} path="/food" />
          <Route element={<Transaction />} path="/transaction" />

          <Route element={<Coupons />} path="/coupons" />
        </Route>
      </Route>

      <Route element={<LoggedInDoctor />}>
        <Route element={<DoctorHome />} path="">
          <Route element={<OverView />} path="/doctor/overview" />
          <Route element={<Appointments />} path="/doctor/appointments" />
          <Route element={<AppointmentHistory />} path="/doctor/history" />
          <Route element={<DocTransaction />} path="/doctor/transaction" />
        </Route>
      </Route>

      <Route element={<LoggedInUser />}>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<ForgotPassword />} path="/forgot" />
        <Route element={<Success />} path="/Success" />
        <Route element={<Otp />} path="/otp" />
        <Route element={<SetNewPass />} path="/set-password" />
        <Route element={<SignupProfile />} path="/set-profile" />
      </Route>
    </Routes>
  );
}

export default App;
