// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { RegisterDatacall } from "../API/ApiCall";
// // const Register = () => {
// //   const Navigate = useNavigate();
// //   const [err, setErr] = useState();
// //   const RegisterForm = (e) => {
// //     e.preventDefault();
// //     setErr("");
// //     const form = new FormData(e.target);
// //     const Userdata = Object.fromEntries(form);

// //     if (Userdata.username.length < 5) {
// //       setErr("username need to be atleast 5 letters");
// //     } else if (Userdata.password.length < 5) {
// //       setErr("password need to be atleast 5 letters");
// //     } else {
// //       RegisterDatacall(Userdata)
// //         .then((data) => {
// //           Navigate("/", { state: { reg: "successfully registered" } });
// //         })
// //         .catch((err) => {
// //           setErr("email already exist");
// //         });
// //     }
// //   };

// //   return (
// //     <div className="bg-gray-900">
// //       <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
// //         <div className="md:w-1/3 max-w-sm">
// //           <img
// //             src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
// //             alt="Sample image"
// //           />
// //         </div>
// //         <div className="md:w-1/3 max-w-sm">
// //           <p className="text-2xl flex justify-center font-bold mb-3 text-white">
// //             Register
// //           </p>
// //           <p className="text-red-500 font-bold">{err}</p>
// //           <form onSubmit={RegisterForm} action="">
// //             <input
// //               name="username"
// //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
// //               type="text"
// //               placeholder="Username"
// //             />

// //             <input
// //               name="email"
// //               className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
// //               type="email"
// //               placeholder="Email Address"
// //             />
// //             <input
// //               name="password"
// //               className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
// //               type="password"
// //               placeholder="Password"
// //             />

// //             <div className="text-center md:text-left">
// //               <button
// //                 className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
// //                 type="submit"
// //               >
// //                 Register
// //               </button>
// //             </div>
// //           </form>

// //           <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
// //             Already have an account!{" "}
// //             <a
// //               onClick={() => {
// //                 Navigate("/");
// //               }}
// //               className="text-red-600 hover:underline hover:underline-offset-4"
// //               href="#"
// //             >
// //               Login
// //             </a>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Register;

// import React, { useState } from "react";
// import { SignupUserdata } from "../API/ApiCall";
// import { useNavigate } from "react-router-dom";
// import doctorImage from "../assets/login/images/doctorLogin.png";

// const Register = () => {
//   const [selectedOption, setSelectedOption] = useState("Doctor");
//   const navigate = useNavigate();
//   const [errmsg, setErrmsg] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [email, setEmail] = useState("");
//   const [passerror, setError] = useState("");

//   // password comparison
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleToggle = (option) => {
//     // Only keep logic for "Doctor"
//     if (option === "Doctor") {
//       setSelectedOption(option);
//     }
//   };

//   const signUser = (e) => {
//     e.preventDefault();

//     const form = new FormData(e.target);
//     const UserData = Object.fromEntries(form);

//     // console.log(UserData);

//     if (selectedOption === "Doctor") {
//       if (password !== confirmPassword) {
//         setError("Passwords do not match");
//       } else {
//         SignupUserdata(UserData)
//           .then((data) => {
//             localStorage.setItem(
//               "sophwe_token",
//               JSON.stringify(data.data.data)
//             );
//             navigate("/otp");
//           })
//           .catch((err) => {
//             setErrmsg("email alredy exist");
//           });
//       }
//     } else {
//       console.log("Invalid login option");
//     }

//     //   if(selectedOption === "Doctor"){
//     //     if (password !== confirmPassword) {
//     //       setError('Passwords do not match');
//     //     }
//     //   }else{
//     //     SignupUserdata(UserD
//     // ata)
//     //     .then((data) => {

//     //             localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
//     //             navigate("/login");

//     //           })
//     //           .catch((err) => {
//     //             setErrmsg("user alredy exist");
//     //             alert('user alredy exist')

//     //           });
//     //   }
//   };

//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(newEmail));
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
//         <img
//           src={doctorImage}
//           alt={`Login Image - ${selectedOption}`}
//           className="object-cover w-full h-full"
//         />
//       </div>

//       <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
//         <div className="max-w-md w-full space-y-8 ">
//           <div>
//             <div className="relative w-[340px] h-[68px] bg-white rounded-[60px] border border-zinc-400 overflow-hidden">
//               <button
//                 onClick={() => handleToggle("Doctor")}
//                 className={`${
//                   selectedOption === "Doctor"
//                     ? "bg-blue-950 text-white"
//                     : "bg-white text-black"
//                 }`}
//                 style={{
//                   position: "absolute",
//                   left: "0",
//                   top: "0",
//                   width: "170px",
//                   height: "68px",
//                   borderRadius: "60px",
//                   border: "none",
//                   fontSize: "22.76px",
//                   fontWeight: "medium",
//                   fontFamily: "Roboto Flex",
//                 }}
//               >
//                 Doctor
//               </button>
//             </div>

//             <div className="flex items-center justify-center">
//               <h2 className="mt-6 mr-20 text-5xl p-5 font-extrabold text-gray-900">
//                 Hello Doctor!
//               </h2>
//             </div>

//             <div className="flex items-center justify-center">
//               <h2 className=" mr-20 text-3xl font-thin text-gray-400">
//                 Welcome back
//               </h2>
//             </div>
//           </div>

//           <form onSubmit={signUser} className="mt-8 space-y-6">
//             <div className="relative">
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
//             </div>

//             <div className="relative">
//               <input
//                 name="password"
//                 type="password"
//                 className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
//                 placeholder=" Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="relative">
//               <input
//                 name="password"
//                 type="password"
//                 className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
//                 placeholder="Confirm Password"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               {passerror && <p style={{ color: "red" }}>{passerror}</p>}
//             </div>
//             <div>
//               <button
//                 className="w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center mt-10"
//                 type="submit"
//               >
//                 <div className="text-white text-1xl font-semibold font-['Roboto Flex']">
//                   Continue
//                 </div>
//               </button>
//             </div>

//             <div className="flex items-center ml-20 mt-6">
//               <span>Already have an account? </span>
//               <a
//                 href="/login"
//                 className="text-cyan-900 text-1xl font-medium font-['Roboto Flex'] "
//               >
//                 Login
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import doctorImage from "../assets/login/images/doctorLogin.png";
import SignupProfile from "./SignupProfile";

const Register = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [passerror, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupProfile, setShowSignupProfile] = useState(false); // State to manage popup visibility

  const signUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (password.length !== 5) {
      setError("Password must be atleast 5 digits");
    } else {
      setShowSignupProfile(true);
    }
  };
  const isFormFilled = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Image Section: Now hidden on small screens, visible on lg and above */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
        <img
          src={doctorImage}
          alt="Login Image - Doctor"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Signup Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Form and content go here */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Hello Doctor!
            </h2>
            <p className="text-xl lg:text-2xl font-light text-gray-400">
              New here? Get started!
            </p>
          </div>

          <form onSubmit={signUser} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  value={email}
                  onChange={handleEmailChange}
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-full border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email Address"
                />
                {!isValidEmail && (
                  <p className="text-red-500 text-sm mt-2">
                    Invalid email address
                  </p>
                )}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-full border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full rounded-full border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passerror && (
                  <p className="text-red-500 text-sm mt-2">{passerror}</p>
                )}
              </div>
            </div>

            <button
              disabled={!isFormFilled()}
              className="group relative w-full h-[54px] flex justify-center py-2 px-4 border  bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-full text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </form>

          <div className="flex justify-center">
            <p className="text-sm font-medium text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>

          {showSignupProfile && (
            <SignupProfile
              email={email}
              password={password}
              onClose={() => setShowSignupProfile(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
