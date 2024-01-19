import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import LoggedInUser from "./ProtectedRoutes/AdminLoggedOut";
import LoggedOutUser from "./ProtectedRoutes/AdminLoggedIn";
import Home from "./Pages/Admin/Home";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Admin/Dashboard";
import TeleMedicine from "./Pages/Admin/TeleMedicine";
import Homecare from "./Pages/Admin/Homecare";
import Pharmacy from "./Pages/Admin/Pharmacy";
import Food from "./Pages/Admin/Food";
import Transaction from "./Pages/Admin/Transaction";
import ForgotPassword from "./Pages/Forgot";
import Success from "./Pages/succes";
import Otp from "./Pages/Otp";
import SetNewPass from "./Pages/SetNewPass";

function App() {
  return (
    <Routes>
      <Route element={<LoggedOutUser />}>
        <Route element={<Home />} path="/">
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<TeleMedicine />} path="/telemedicine/category" />
          <Route element={<Homecare />} path="/homecare" />
          <Route element={<Pharmacy />} path="/pharmacy" />
          <Route element={<Food />} path="/food" />
          <Route element={<Transaction />} path="/transaction" />
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
