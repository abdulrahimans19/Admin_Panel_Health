import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from '../../firebase/Firebaseconfig';

const Notification = () => {
  const [notification, setNotification] = useState({title: '', body: ''});
  // const notify = () =>  toast(<ToastDisplay/>);
  // function ToastDisplay() {
  //   return (
  //     <div>
  //       <p><b>{notification?.title}</b></p>
  //       <p>{notification?.body}</p>
  //     </div>
  //   );
  // };

  useEffect(() => {
    if (notification?.title ){
      toast.success(
        `${notification?.title}`,
        {
          duration:6000,
          position:"top-right"
        }
      )
    //  notify()
    }
 
  }, [notification])

  requestForToken();

  onMessageListener()
    .then((payload) => {
      toast.success(
        `${payload?.notification?.title}:${payload.notification?.body}`,
        {
          duration:6000,
          position:"top-right"
        }
      )
      // setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));

  return (
//   <form onSubmit={handleSubmit}>
    //     <div className="   fixed inset-0 flex items-center justify-center overflow-hidden">
    //       <div className= "  w-full sm:w-[80%] h-full sm:h-[90%] max-w-[800px] max-h-[600px] bg-[#1C3A68] rounded-lg border border-white border-opacity-10 backdrop-blur-[39.60px] relative flex flex-col sm:flex-row overflow-hidden">
    //         {/* Close Button at the Top Right */}
    //         <button
    //           type="button"
    //           onClick={() => onClose()}
    //           className="absolute top-0 right-0 m-2  border-2 border-white border-opacity-40 rounded-[20px] rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    //         >
    //           <svg
    //             className="h-6 w-6"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             aria-hidden="true"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M6 18L18 6M6 6l12 12"
    //             />
    //           </svg>
    //         </button>
    //         <div
    //           className="flex-1 flex flex-col items-center mt-[180px] text-white"
    //           onDragOver={handleDragOver}
    //           onDrop={handleDrop}
    //           onPaste={handlePaste}
    //         >
    //           {/* Conditionally render the SVG or the selected image */}
    //           {!selectedImage ? (
    //             <div className="cursor-pointer" onClick={handleSvgClick}>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-40 w-40 fill-white stroke-indigo-500 border-2 border-white border-opacity-40 rounded-[20px] p-8"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    //                 />
    //               </svg>
    //             </div>
    //           ) : (
    //             <div className="relative w-40 h-40">
    //               <img
    //                 src={selectedImage}
    //                 alt="Selected"
    //                 className="absolute inset-0 w-full h-full object-cover border-2 border-white border-opacity-40 rounded-[20px] p-8"
    //               />
    //             </div>
    //           )}
    //           <input
    //             id="upload"
    //             type="file"
    //             className="hidden"
    //             onChange={handleFileSelect}
    //             ref={fileInputRef}
    //           />
    //         </div>

    //         {/* Second Column with input fields row-wise */}
    //         <div className="flex-1  sm:mt-0 bg-[#1C3A68] text-white">
    //           <h2 className="text-2xl font-bold mb-4 sm:text-3xl mt-7">
    //             Profile Info
    //           </h2>
    //           <p className="text-gray-300 mb-4 sm:text-lg">
    //             Fill in the data for your profile. It will take a couple of
    //             minutes.
    //           </p>
    //           <div className="p-5">
    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Full Name</span>
    //               </div>
    //               <input
    //                 type="text"
    //                 placeholder="Enter full name"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, name: e.target.value })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>

    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Gender</span>
    //               </div>
    //               <select
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray-400 p-2 px-3 my-2"
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, gender: e.target.value })
    //                 }
    //                 value={formData.gender} // Added to control the selected value
    //               >
    //                 <option value="">Select Gender</option> {/* Default option */}
    //                 <option value="male">Male</option>
    //                 <option value="female">Female</option>
    //               </select>
    //             </label>

    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Country</span>
    //               </div>
    //               <input
    //                 type="text"
    //                 placeholder="Enter your country"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, country: e.target.value })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>
    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Professional Category</span>
    //               </div>
    //               <input
    //                 type="text"
    //                 placeholder="Enter your profession"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, profession: e.target.value })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>

    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Experience</span>
    //               </div>
    //               <input
    //                 type="number"
    //                 placeholder="Enter your experience"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, experience: e.target.value })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>
    //           </div>
    //         </div>

    //         {/* Third Column with input fields and buttons */}
    //         <div className="flex-1 mt-[50px] p-7 sm:order-1 bg-[#1C3A68] text-white">
    //           <div className="mt-20">
    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Upload Certificate</span>
    //               </div>
    //               <input
    //                 type="file"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, certificate: e.target.files[0] })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>

    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Consultation Fee</span>
    //               </div>
    //               <input
    //                 type="number"
    //                 placeholder="Set rate"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, consulting_fee: e.target.value })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>
    //             <label className="text-[13px] font-normal font-['Roboto Flex'] ">
    //               <div className="label">
    //                 <span className="label-text">Description</span>
    //               </div>
    //               <textarea
    //                 placeholder="Tell us about yourself"
    //                 className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 h-[70px] resize-none my-2" // Add my-2 to add margin on top and bottom
    //                 onChange={(e) =>
    //                   setFormData({ ...formData, description: e.target.value })
    //                 }
    //               />

    //               <div className="label"></div>
    //             </label>
    //           </div>
    //           <div className="flex items-center mb-4 mt-6">
    //             <input
    //               type="checkbox"
    //               id="agreeCheckbox"
    //               className="form-checkbox h-5 w-5 text-indigo-600"
    //               onChange={handleCheckboxChange} // Attach the onChange handler
    //               checked={isAgreed} // Control the checkbox state
    //             />
    //             <label
    //               htmlFor="agreeCheckbox"
    //               className="ml-1 text-gray-300 cursor-pointer"
    //             >
    //               I agree with terms of use
    //             </label>
    //           </div>

    //           <div className="flex justify-between">
    //             <button
    //               type="submit"
    //               className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
    //               disabled={!isAgreed} // Disable button based on isAgreed state
    //             >
    //               Register
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
     <></>
  )
}

export default Notification;