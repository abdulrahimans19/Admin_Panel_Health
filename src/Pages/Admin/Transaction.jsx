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

// Updated DateInput component for better responsiveness
const DateInput = ({ label, selectedDate, onChange }) => (
  <div className="text-gray-500 text-base font-normal leading-tight tracking-tight relative w-full">
    {label}
    <div className="mt-3 relative">
      <DatePicker
        selected={selectedDate}
        className="w-full h-12 px-3 py-2.5 rounded-lg border border-gray-300"
        onChange={onChange}
      />
    </div>
  </div>
);

// Updated CategoryFilter for better responsiveness
const CategoryFilter = ({ selectedCategory, onSelect }) => (
  <div className="w-full overflow-x-auto">
    <div className="flex gap-4 justify-center sm:justify-start">
      {["Homecare", "Pharmacy", "Food"].map((category) => (
        <div
          key={category}
          onClick={() => onSelect(category)}
          className={`${
            selectedCategory === category
              ? "text-black border-b-2 border-black font-medium"
              : "text-gray-400"
          } cursor-pointer whitespace-nowrap`}
        >
          {category}
        </div>
      ))}
    </div>
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
  const [noDataAvailable, setNoDataAvailable] = useState(false);

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
      if (
        !data ||
        !data.data.transaction ||
        data.data.transaction.length === 0
      ) {
        setNoDataAvailable(true);
        setTransactions([]);
        setTotalAmountForSelectedCategory(0);
      } else {
        setNoDataAvailable(false);
        setTransactions(
          data.data.transaction.map((item) => ({
            ...item,
            _id: item._id || "No Data Available",
            profile_id: item.profile_id
              ? `${item.profile_id.first_name || "No Data"} ${
                  item.profile_id.last_name || "Available"
                }`
              : "No Data Available",
            payment_type: item.payment_type || "No Data Available",
            payment_id: item.payment_id || "No Data Available",
            created_at: item.created_at || new Date(), // Assuming date is required, else "No Data Available"
            payable_amount:
              item.payable_amount !== undefined
                ? item.payable_amount
                : "No Data Available",
            order_status: item.order_status || "No Data Available",
            invoice: item.invoice || "No Data Available",
          }))
        );
        setTotalAmountForSelectedCategory(data.data.total_income || 0);
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Event handler for start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate < date) {
      setEndDate(date);
    }
  };

  // Event handler for end date change
  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  // Event handler for category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchTransactions();
  };

  return (
    <div className="mx-auto mt-5 w-full overflow-x-auto rounded-xl border shadow px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full">
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
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {" "}
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Order ID
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Customer
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Payment Type
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Transaction ID
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Date
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Amount
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Status
              </th>
              <th className="py-2 text-xs md:text-sm font-semibold text-gray-500 px-2 md:px-4">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {noDataAvailable ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No Data Available
                </td>
              </tr>
            ) : (
              transactions.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b`}
                >
                  <td className="py-2 text-sm px-4">{item._id}</td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {item.profile_id.first_name} {item.profile_id.last_name}
                  </td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {item.payment_type}
                  </td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {item.payment_id}
                  </td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {item.payable_amount}
                  </td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {item.order_status}
                  </td>
                  <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                    {item.invoice}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>Total Amount:</div>
        <div className="text-lg font-bold">
          $
          {totalAmountForSelectedCategory
            ? totalAmountForSelectedCategory.toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
