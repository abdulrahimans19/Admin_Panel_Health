import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from '../../../Redux/Features/NavbarSlice';

export default function PharmaOrder() {
    const dispatch = useDispatch();

    useEffect(()=>
    {
        dispatch(pharmacyNav());
    },[])
  return (
    <div>

      <div ><h1 className='p-3 text-xl font-semibold'>Order </h1></div>
      <div>
      <div className='flex justify-center '>
      <form class="flex items-baseline justify-center">   
    <label for="voice-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
        </div>
        <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 placeholder-gray-400" placeholder="Search Mockups, Logos, Design Templates..." required/>
    </div>
 
    <div className="flex items-center px-2.5 mt-4 py-0.5 text-base font-semibold text-green-500 text-center">
        <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
            <option disabled value="">
                Filter By Category
            </option>
            <option value="full">
                Today
            </option>
            <option value="Fever">Yesterday</option>
        </select>
    </div>
</form>


      </div>
      </div>
      <div className='p-5'>

      <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-400 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b">
                <th scope="row" class="px-6 py-4  font-medium text-gray-900 whitespace-nowrap">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Silver
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Laptop
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b">
                <th scope="row" class="px-6 py-4  text-gray-900 whitespace-nowrap">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Silver
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Laptop
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b">
                <th scope="row" class="px-6 py-4  font-medium text-gray-900 whitespace-nowrap">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Silver
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Laptop
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    $2999
                </td>
            </tr>
        </tbody>
    </table>
</div>

      </div>
    </div>
  )
}
