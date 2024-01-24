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
import OverView from "./Pages/Doctor/Dashboard/OverView";
import DocTransaction from "./Pages/Doctor/transaction/Transaction";
import AppointmentHistory from "./Pages/Doctor/AppointmentHistory/AppointmentHistory";
import Appointments from "./Pages/Doctor/Appointments/Appointments";

function App() {
  return (
    <Routes>
      <Route element={<LoggedOutUser />}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route element={<Home />} path="">
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<TeleMedicine />} path="/telemedicine/category" />
          {/* <Route element={<Homecare />} path="/homecare" /> */}

          <Route element={<Doctor />} path="/telemedicine/doctor" />
          <Route element={<HomecareLabItems/>} path="homecare/lab-items" />
          <Route element={<AppoinmentDetails/>} path="homecare/appoinment-details" />
          
          <Route element={<Homecare />} path="/homecare/categories"/>
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
          {/* <Route element={<Pharmacy />} path="/pharmacy" /> */}
          <Route element={<Food />} path="/food" />
          <Route element={<Transaction />} path="/transaction" />
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
      </Route>
    </Routes>
  );
}

export default App;
