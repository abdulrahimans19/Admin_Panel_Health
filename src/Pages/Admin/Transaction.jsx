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
        className="border text-gray-900 w-[118px] h-12 px-4 py-2.5 justify-start items-center gap-2 flex rounded-lg"
        onChange={onChange}
      />
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-3 top-3"
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
  <div className="left-0 top-0 absolute justify-start items-center gap-6 inline-flex">
    {["Homecare", "Pharmacy", "Food"].map((category) => (
      <div
        key={category}
        onClick={() => onSelect(category)}
        className={`${
          selectedCategory === category
            ? "border-b-2 border-black text-zinc-800 text-xl"
            : "text-gray-400"
        } cursor-pointer font-medium font-['Roboto Flex']`}
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

  useEffect(() => {
    dispatch(cleartopNav());
    fetchTransactions();
  }, [dispatch, startDate, endDate, selectedCategory]);

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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchTransactions();
  };

  return (
    <div>
      <div className="right-[200px] top-[120px] absolute flex-row justify-start items-start gap-[20px] inline-flex">
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

      <div className="left-[283px] top-[200px] absolute flex-col justify-start items-start gap-6 inline-flex">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </div>

      {/* New table section */}
      <table className="left-[283px] top-[280px] absolute w-[1104px] border-collapse">
        <thead>
          <tr>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Order ID
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Customer
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Payment Type
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Transaction ID
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Date
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Amount
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Status
            </th>
            <th className="text-gray-400 text-sm font-semibold font-['Roboto Flex'] leading-tight">
              Invoice
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr
              key={item}
              className={`border ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.transaction}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.profile_id.first_name} {item.profile_id.last_name}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.paymentType}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.payment_id}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.date}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.discount_price}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.order_status}
              </td>
              <td className="text-gray-900 text-sm font-['Roboto Flex'] leading-tight px-4 py-2">
                {item.invoice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Total Amount Section for Selected Category at the bottom right */}
      <div className="absolute bottom-0 right-0 flex flex-col items-end gap-6 mr-6 mb-6">
        <div className="text-xl font-medium">Total amount</div>
        <div className="text-[28px] font-bold">
          ${totalAmountForSelectedCategory}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
