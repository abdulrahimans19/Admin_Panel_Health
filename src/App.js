import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import LoggedInUser from "./ProtectedRoutes/LoggedInUser";
import LoggedOutUser from "./ProtectedRoutes/LoggedOutUser";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import TeleMedicine from './Pages/TeleMedicine';
import Homecare from './Pages/Homecare';
import Pharmacy from './Pages/Pharmacy';
import Food from './Pages/Food';
import Transaction from './Pages/Transaction';

function App() {
  return (
    <Routes>
           <Route element={< LoggedOutUser/>}>

           <Route element={<Home />} path="" >
           <Route element={<Dashboard />} path="/dashboard" />
           <Route element={<TeleMedicine />}path='/telemedicine' />
           <Route element={<Homecare />} path="/homecare" />
           <Route element={<Pharmacy />} path="/pharmacy" />
           <Route element={<Food />} path="/food" />
           <Route element={<Transaction />} path="/transaction" />


           </Route>

           </Route>
        <Route element={< LoggedInUser/>}>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />


        </Route>


    </Routes>

  );
}

export default App;
