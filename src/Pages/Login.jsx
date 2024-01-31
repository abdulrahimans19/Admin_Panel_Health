// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { LoginUserdata } from "../API/ApiCall";
// import AdminImage from "../assets/login/images/adminLogin.png";
// import { useNavigate } from "react-router-dom";
// import doctorImage from "../assets/login/images/doctorLogin.png";

// const Login = () => {
//   const [loginType, setLoginType] = useState("doctor");

//   // const handleToggle = () => {
//   //   setLoginType((prevLoginType) => (prevLoginType === 'doctor' ? 'admin' : 'doctor'));
//   // };

//   const navigate = useNavigate();

//   const [errmsg, setErrmsg] = useState("");
//   const [bgImage, setbgImage] = useState("../assets/login/images/login.png");

//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [email, setEmail] = useState("");
//   const [toggledata, setToggledata] = useState(true);

//   const LoginUser = (e) => {
//     e.preventDefault();

//     setErrmsg("");

//     const form = new FormData(e.target);
//     const UserData = Object.fromEntries(form);

//     if (toggledata) {
//       LoginUserdata(UserData)
//         .then((data) => {
//           console.log();

//           localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
//           navigate("/");
//         })
//         .catch((err) => {
//           setErrmsg("email or password is incorrect");
//         });
//     } else {
//       console.log("doctor log in");
//     }

//     // Validate(UserData.email).then(data=>
//     //   {
//     //     navigate('/home')
//     //   }).catch(err=>
//     //     {
//     //       navigate('/addetails')
//     //     })
//   };

//   // const getImageUrl = (data) => {
//   //   console.log("owrngirg");
//   //   console.log(data);
//   //   data === "doctor"
//   //     ? setbgImage("doctor")
//   //     : setbgImage("../assets/login/images/login.png");
//   // };

//   const toggle = (data) => {
//     if (data == "doctor") {
//       setToggledata(false);
//     } else {
//       setToggledata(true);
//     }
//   };

//   // email validation
//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);

//     // Check if the email is valid using a regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(newEmail));
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left side with image */}
//       <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
//         {toggledata ? (
//           <motion.img
//             key={loginType}
//             src={AdminImage}
//             alt={`Login Image - ${loginType}`}
//             className="object-cover w-full h-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           />
//         ) : (
//           <motion.img
//             key={loginType}
//             src={doctorImage}
//             alt={`Login Image - ${loginType}`}
//             className="object-cover w-full h-full transition duration-75"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           />
//         )}
//       </div>

//       <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
//         <div className="max-w-md w-full space-y-8 ">
//           <div>
//             <div className="flex justify-center">
//               <div className="border-2 border-black rounded-3xl xl h-14 w-56  ">
//                 <div className="flex gap-20 justify-center h-full">
//                   <div className="flex justify-around w-full">
//                     <p
//                       onClick={() => {
//                         toggle("admin");
//                       }}
//                       className={`${
//                         toggledata
//                           ? "bg-blue-950  border-black  border-2"
//                           : " text-black "
//                       }  w-full cursor-pointer text-center rounded-3xl text-white text-2xl flex items-center justify-center `}
//                     >
//                       Admin
//                     </p>

//                     <div
//                       onClick={() => {
//                         toggle("doctor");
//                       }}
//                       className={`${
//                         !toggledata
//                           ? "bg-blue-950 border-2 border-black"
//                           : " text-black"
//                       }  w-full  text-center cursor-pointer  rounded-3xl text-white text-2xl flex items-center justify-center`}
//                     >
//                       doctor
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-center">
//               <h2 className="mt-6 text-5xl p-5 font-extrabold text-gray-900">
//                 Hello {!toggledata ? "Doctor" : "Admin"}!
//               </h2>
//             </div>
//             <div className="flex items-center justify-center">
//               <h2 className="mt-6 text-3xl font-thin text-gray-400">
//                 welcome back
//               </h2>
//             </div>
//           </div>
//           <form onSubmit={LoginUser} className="mt-8 space-y-6">
//             {/* Your form elements go here */}
//             {/* Example: */}
//             <div class="relative">
//               <input
//                 value={email}
//                 onChange={handleEmailChange}
//                 name="email"
//                 type="email"
//                 className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
//                 placeholder="Email Address"
//               />
//               {!isValidEmail && (
//                 <p style={{ color: "red" }}>Invalid email address</p>
//               )}

//               {/* <label
//                 for="floating_outlined"
//                 class="absolute text-sm text-gray-500   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
//               >
//                 Floating outlined
//               </label> */}
//             </div>

//             <div class="relative">
//               <input
//                 name="password"
//                 type="password"
//                 className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
//                 placeholder=" Password"
//               />
//               {errmsg && <p style={{ color: "red" }}>{errmsg}</p>}

//               {/* <label
//                 for="floating_outlined1"
//                 class="absolute text-sm text-gray-500   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
//               >
//                 Floating outlined
//               </label> */}
//             </div>

//             <div>
//               <button className="w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center mt-10">
//                 <div className="text-white text-1xl font-semibold font-['Roboto Flex']">
//                   Login
//                 </div>
//               </button>
//             </div>
//             <div className="flex justify-end items-center">
//               <a
//                 href="/forgot"
//                 className="text-cyan-900 text-1xl font-medium font-['Roboto Flex'] mr-10"
//               >
//                 Forgot Password?
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { LoginUserdata } from "../API/ApiCall";
import AdminImage from "../assets/login/images/adminLogin.png";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/login/images/doctorLogin.png";
import { DoctorLogInApi } from "../API/DoctorApi";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("Admin");
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const LoginUser = (e) => {
    e.preventDefault();
    setErrmsg("");

    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);

    if (selectedOption === "Admin") {
      LoginUserdata(UserData)
        .then((data) => {
          localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
          navigate("/");
        })
        .catch((err) => {
          setErrmsg("Email or password is incorrect");
        });
    } else {
      console.log("else is working");
      DoctorLogInApi(UserData)
        .then((data) => {
          localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
          navigate("/doctor/overview");
        })
        .catch((err) => {
          setErrmsg("Email or password is incorrect");
        });
      console.log("doc log");
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
        <img
          src={selectedOption === "Admin" ? AdminImage : doctorImage}
          alt={`Login Image - ${selectedOption}`}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <div className="relative w-[340px] h-[68px] bg-white rounded-[60px] border border-zinc-400 overflow-hidden">
              <div
                className={`absolute left-0 top-0 ${
                  selectedOption === "Admin"
                    ? "w-[170px]"
                    : "w-[170px] left-[170px]"
                } h-full bg-blue-950 rounded-[60px] shadow`}
              />
              <button
                onClick={() => handleToggle("Admin")}
                className={`${
                  selectedOption === "Admin"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black"
                }`}
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "170px",
                  height: "68px",
                  borderRadius: "60px",
                  border: "none",
                  fontSize: "22.76px",
                  fontWeight: "medium",
                  fontFamily: "Roboto Flex",
                }}
              >
                Admin
              </button>

              <button
                onClick={() => handleToggle("Doctor")}
                className={`${
                  selectedOption === "Doctor"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black"
                }`}
                style={{
                  position: "absolute",
                  left: "170px",
                  top: "0",
                  width: "170px",
                  height: "68px",
                  borderRadius: "60px",
                  border: "none",
                  fontSize: "22.76px",
                  fontWeight: "medium",
                  fontFamily: "Roboto Flex",
                }}
              >
                Doctor
              </button>
            </div>

            <div className="flex items-center justify-center">
              <h2 className="mt-6 mr-20 text-5xl p-5 font-extrabold text-gray-900">
                Hello {selectedOption === "Admin" ? "Admin" : "Doctor"}!
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <h2 className=" mr-20 text-3xl font-thin text-gray-400">
                Welcome back
              </h2>
            </div>
          </div>
          <form onSubmit={LoginUser} className="mt-8 space-y-6">
            <div className="relative">
              <input
                value={email}
                onChange={handleEmailChange}
                name="email"
                type="email"
                className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
                placeholder="Email Address"
              />
              {!isValidEmail && (
                <p style={{ color: "red" }}>Invalid email address</p>
              )}
            </div>

            <div className=" relative">
              <input
                name="password"
                type="password"
                className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
                placeholder=" Password"
              />
              {errmsg && <p style={{ color: "red" }}>{errmsg}</p>}
            </div>
            {selectedOption === "Doctor" && (
              <a
                href="/forgot"
                className="text-cyan-900 text-1xl font-medium font-['Roboto Flex'] mr-10 flex justify-end items-center"
              >
                Forgot Password?
              </a>
            )}

            <div>
              <button
                className="w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center "
                type="submit"
              >
                <div className="text-white text-1xl font-semibold font-['Roboto Flex']">
                  Login
                </div>
              </button>
              {selectedOption === "Doctor" && (
                <div className="flex items-center ml-20 mt-6">
                  <span>Dont have an account? </span>
                  <a
                    href="/register"
                    className="text-cyan-900 text-1xl font-medium font-['Roboto Flex'] "
                  >
                    Signup
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
