import React from 'react'
// import ButtonIconimage from "../../assets/images/element-plus.png";

function Button({data,callback}) {
  return (
    <button class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium font-'Roboto Flex' px-2 sm:px-4 py-1 sm:py-2 rounded-md float-right sm:float-none">
        {/* <img src={ButtonIconimage} class="w-6 h-6 mr-2"></img> */}
        {data}
        </button>
  )
}

export default Button
