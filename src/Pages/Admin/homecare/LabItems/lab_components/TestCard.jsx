import React, { useState } from "react";
import AddLabItemsButton from "../../AddLabItemsButton";
import LabModal from "./LabModal";
import EditLabModal from "./EditLabModal";
import { disableTest, getSingleTestApi, recommendedTest } from "../../../../../API/ApiCall";
import { useSelector } from "react-redux";

function TestCard({data,getAllTests,type ,getLabTestsbyCategory}) {
  // const [showLabModal, setShowLabModal] = useState(false);
  const [editshowModal1, setEditShowModal1] = useState(false);
  const [showList, setShowList] = useState(false);
  const [testCard,setTestCard]=useState([])

  const toggleModal=()=>{
    setShowList(!showList)
  }
  const { testFilter } = useSelector((state) => {
    return state.admin;
  });
  const disabled = () => {
    console.log(data,"this id of card");
    disableTest(data._id).then((data)=>{

      if(testFilter){
        getLabTestsbyCategory(testFilter)
      }else{
        getAllTests()
      }

    
    setShowList(false);

    }).catch((err)=>
    {
      console.log(err);
    })
  };
  const recommended=()=>{
    recommendedTest(data._id).then((data)=>{
      getAllTests()
      setShowList(false)

    })
  }

  // const toggleModal = () => {
  //   setShowLabModal(!showLabModal);
  // };
const toggleEditModal=()=>{
  setEditShowModal1(!editshowModal1)
}
// const getOneTest=(test_id)=>{
//   getSingleTestApi(test_id).then((data)=>{
//     console.log(data.data.data.test);
//     setTestCard(data.data.data.test)
//   })
// }
  return (
    <div
    >
      
      {/* {showLabModal &&
        <LabModal callback={toggleModal} />
      } */}
      {
      editshowModal1 && 
      <EditLabModal valdata={data} callback={toggleEditModal} setEditShowModal1={setEditShowModal1} getAllTests={getAllTests} />
      }
      <div class="relative">
        {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}

        <div class="px-5  h-52 py-2.5 rounded-lg border border-zinc-300 flex-col">
          <div class="flex-col justify-start items-start flex">
          <div className="flex justify-between w-full">
               <div className="">
                <p class="text-lg font-semibold">{data?.name}</p>
              </div>
              <button
                  onClick={toggleModal}
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="inline-block dark:focus:ring-gray-700 rounded-lg text-sm p-2"
                  type="button"
                >
                  <svg
                    class="w-4 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                
               </div>
            <div className="flex text gap-10">
              {/* {isdisbled ? 
                <div className="top-0 absolute p-2">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="w-6 h-3 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 "></span>
                  </label>
                </div>
               : null} */}

             
             
              <div
                className=""
                // onClick={(event) => toggleMenu(event)}
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              >
              
                {showList && (
                  <div
                    id="dropdown"
                    class=" absolute right-16 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                   { type ==='' &&(
                    <ul class="py-2 bg-slate-100 hover:bg-white rounded-md" aria-labelledby="dropdownButton">
                      
                    <li>
                    <a
                      onClick={()=>{
                        setEditShowModal1(true)
                        // getOneTest(data.data._id)
                      }}
                      href="#"
                      class="block px-4 py-2 text-sm text-neutral-950 hover:bg-gray-100 dark:text-black dark:hover:text-black"
                    >
                      Edit
                    </a>
                  </li>
                  
                
                    <li>
                    
                      <a
                      onClick={disabled}
                      href="#"
                      class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:text-red-600"
                    >
                      disable
                    </a>
                    
                  </li>
                  
                  
                    {data.is_recommended ? null : <li>
                    <a
                      onClick={recommended}
                      href="#"
                      class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100  dark:text-black dark:hover:text-black"
                    >
                      Add to Recommended
                    </a>
                  </li>}
                  
                </ul>
                   )} 
                   { type ==='recommended' &&(
                    <ul class="py-2" aria-labelledby="dropdownButton">
                      
                    <li>
                    <a
                      onClick={()=>{
                        setEditShowModal1(true)
                        // getOneTest(data.data._id)
                      }}
                      href="#"
                      class="block px-4 py-2 text-sm text-neutral-950 hover:bg-gray-100 dark:text-black dark:hover:text-black"
                    >
                      Edit
                    </a>
                  </li>
                  
                
                    <li>
                    
                      <a
                      onClick={disabled}
                      href="#"
                      class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:text-red-600"
                    >
                      disable
                    </a>
                    
                  </li>
                  
                  
                </ul>
                   )} 
                   { type ==='disabled' &&(
                    <ul class="py-2" aria-labelledby="dropdownButton">
                      
                    <li>
                    <a
                      onClick={()=>{
                        setEditShowModal1(true)
                        // getOneTest(data.data._id)
                      }}
                      href="#"
                      class="block px-4 py-2 text-sm text-neutral-950 hover:bg-gray-100 dark:text-black dark:hover:text-black"
                    >
                      Edit
                    </a>
                  </li>
                  
                
                    <li>
                    
                      <a
                      onClick={disabled}
                      href="#"
                      class="block px-4 py-2 text-sm text-green-500 hover:bg-gray-100 dark:hover:text-green-800"
                    >
                      enable
                    </a>
                    
                  </li>
                  
                  
                </ul>
                   )}
                  </div>
                )}
              </div>
            </div>
            <div class="justify-start items-start gap-2.5 inline-flex">
              <h3 class="text-black text-xs font-normal">
                Includes {data?.daily_test_limit} tests
              </h3>
              <div class="justify-start items-end gap-1 flex">
                <div class="w-3.5 h-3.5 relative">
                  <div class="w-3.5 h-3.5 left-0 top-0 absolute"></div>
                </div>
                <div class="text-black text-xs font-light">
                  Reports in {data?.testing_time} Hrs
                </div>
              </div>
            </div>
            <div class="w-6 h-6 left-[290px] top-[4px] absolute">
              <div class="w-6 h-6 left-0 top-[24px] absolute origin-top-left -rotate-90">
                <div class="w-6 h-6 left-0 top-0 absolute"></div>
              </div>
            </div>
          </div>
          <div class="justify-end items-center gap-40 inline-flex">
            <div class="justify-end items-center gap-1 flex">
              <div class="flex-col justify-center items-start gap-2.5 inline-flex">
                <p class="text-green-400 text-xs font-normal line-through">
                  AED {data?.price + 50}
                </p>
                <p class="text-green-600 text-base font-bold">
                  AED {data?.price}
                </p>
                <div class="justify-start items-end">
                <div class="">
                  
                </div>
                <div class="text-black text-xs font-semibold" >
                  {data.is_recommended ? "Recommended test" : "" }
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCard;
