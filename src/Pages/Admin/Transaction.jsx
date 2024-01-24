import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import {
  getTransactionForHomeCare,
  getTransactionForPharmacy,
  getTransactionForFood,
} from "../../API/ApiCall";

// Component for date input
const DateInput = ({ label, selectedDate, onChange }) => (
  <div className="text-gray-500 text-base font-normal leading-tight tracking-tight relative">
    {label}
    <div className="text-slate-400 text-base font-normal leading-tight tracking-tight mt-3 relative">
      <DatePicker
        selected={selectedDate}
        className="border text-gray-900 w-[118px] h-12 px-3 py-2.5 justify-start items-center gap-2 flex rounded-lg"
        onChange={onChange}
      />
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-1 top-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </div>
  </div>
);

// Component for category filter
const CategoryFilter = ({ selectedCategory, onSelect }) => (
  <div className="flex justify-center items-center space-x-6">
    {["Homecare", "Pharmacy", "Food"].map((category) => (
      <div
        key={category}
        onClick={() => onSelect(category)}
        className={`${
          selectedCategory === category
            ? "border-b-2 border-black text-zinc-800 text-xl font-medium"
            : "text-gray-400"
        } cursor-pointer`}
      >
        {category}
      </div>
    ))}
  </div>
);


// Component for transactions
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalAmountForSelectedCategory, setTotalAmountForSelectedCategory] =
    useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Homecare");

  const dispatch = useDispatch();

  // useEffect for fetching transactions
  useEffect(() => {
    dispatch(cleartopNav());
    fetchTransactions();
  }, [dispatch, startDate, endDate, selectedCategory]);

  // Function to fetch transactions based on selected category and date range
  const fetchTransactions = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    let fetchFunction;
    switch (selectedCategory) {
      case "Homecare":
        fetchFunction = getTransactionForHomeCare;
        break;
      case "Pharmacy":
        fetchFunction = getTransactionForPharmacy;
        break;
      case "Food":
        fetchFunction = getTransactionForFood;
        break;
      default:
        fetchFunction = getTransactionForHomeCare;
    }

    fetchFunction(formattedStartDate, formattedEndDate).then(({ data }) => {
      setTransactions(data.data.transaction);
      setTotalAmountForSelectedCategory(data.data.total_income);
    });
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Event handler for start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Event handler for end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Event handler for category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchTransactions();
  }; 
  
  
  
  return (
    <div className="mx-auto mt-30 sm:mt-5 w-full sm:w-[1104px] overflow-x-auto rounded-xl border shadow">
      <div className="flex justify-between items-start gap-6 mb-4">


        <div className="flex flex-col items-start gap-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
        <div className="flex flex-row items-end gap-6">
          <DateInput
            label="Starting Date"
            selectedDate={startDate}
            onChange={handleStartDateChange}
          />
          <DateInput
            label="Ending Date"
            selectedDate={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>


 


      {/* Table Section */}
      <table className="mx-auto min-w-full sm:border-separate sm:border-spacing-y-2 sm:border-spacing-x-2">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Order ID
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Customer
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Payment Type
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Transaction ID
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Date
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Amount
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Status
            </th>
            <th className="whitespace-normal py-2 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 px-2 sm:px-4">
              Invoice
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } border-b`}
            >
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item._id}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item.profile_id.first_name} {item.profile_id.last_name}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item.paymentType}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item.payment_id}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {formatDate(item.created_at)}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item.discount_price}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item.order_status}
              </td>
              <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                {item.invoice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bottom-0 right-0 sm:flex sm:flex-col items-end gap-6 mr-6 mb-6">
        <div className="text-base sm:text-xl font-medium">Total amount</div>
        <div className="text-xs sm:text-[28px] font-bold">
          ${totalAmountForSelectedCategory}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
