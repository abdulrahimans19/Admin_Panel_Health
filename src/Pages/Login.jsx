// Login.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginUserdata } from "../API/ApiCall";
import AdminImage from "../assets/login/images/login.png";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/login/images/login.png"
const Login = () => {
  const [loginType, setLoginType] = useState("doctor");

  // const handleToggle = () => {
  //   setLoginType((prevLoginType) => (prevLoginType === 'doctor' ? 'admin' : 'doctor'));
  // };

  const navigate = useNavigate();

  const [errmsg, setErrmsg] = useState("");
const [bgImage, setbgImage] = useState("../assets/login/images/login.png")
  const LoginUser = (e) => {
    e.preventDefault();

    setErrmsg("");

    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);

    LoginUserdata(UserData)
      .then((data) => {
        console.log(data.data.accessToken);
        localStorage.setItem("Userdata", data.data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        setErrmsg("email/password is incorrect");
      });

    // Validate(UserData.email).then(data=>
    //   {
    //     navigate('/home')
    //   }).catch(err=>
    //     {
    //       navigate('/addetails')
    //     })
  };

  const getImageUrl = (data) => {
    console.log('owrngirg');
    console.log(data);
  data === "doctor"
      ? setbgImage("doctor")
      : setbgImage("../assets/login/images/login.png")
  };

  const [toggledata, setToggledata] = useState(true);
  const toggle = (data) => {
    if (data == "doctor") {
      setToggledata(false);
     
    } else {
      setToggledata(true);
     
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
    { toggledata? 
       <motion.img
            key={loginType}
            src={AdminImage}
            alt={`Login Image - ${loginType}`}
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
             :  <motion.img
            key={loginType}
            src={doctorImage}
            alt={`Login Image - ${loginType}`}
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

    }
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <div className="flex justify-center">
              <div className="border-2 border-black rounded-3xl xl h-14 w-56  ">
                <div className="flex gap-10 justify-center h-full">
                  <div className="flex justify-around w-full">
                    <p
                      onClick={() => {
                        toggle("admin");
                      }}
                      className={`${
                        toggledata
                          ? "bg-blue-950  border-black  border-2"
                          : " text-black "
                      }  w-full cursor-pointer text-center rounded-3xl text-white text-2xl flex items-center justify-center `}
                    >
                      Admin
                    </p>

                    <div
                      onClick={() => {
                        toggle("doctor");
                      }}
                      className={`${
                        !toggledata
                          ? "bg-blue-950 border-2 border-black"
                          : " text-black"
                      }  w-full  text-center cursor-pointer  rounded-3xl text-white text-2xl flex items-center justify-center`}
                    >
                      doctor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <h2 className="mt-6 text-5xl p-5 font-extrabold text-gray-900">
                Hello {!toggledata? "Doctor" : "Admin"}!
              </h2>
            
            </div>
            <div className="flex items-center justify-center">
              <h2 className="mt-6 text-3xl font-thin text-gray-400">
               welcome back
              </h2>
            
            </div>
          </div>
          <form className="mt-8 space-y-6">
            {/* Your form elements go here */}
            {/* Example: */}
            <div class="relative">
    <input type="email" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floating outlined</label>
</div>

<div class="relative">
    <input type="password" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floating outlined</label>
</div>

            <div>
              <button
                type="submit"
                className="bg-blue-950 text-white p-2 w-full rounded-md hover:bg-blue-800"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
