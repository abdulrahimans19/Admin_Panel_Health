import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import { Link } from "react-router-dom";
import {
  getTransactionForHomeCare,
  getTransactionForPharmacy,
  getTransactionForFood,
} from "../../API/ApiCall";

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

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalAmountForSelectedCategory, setTotalAmountForSelectedCategory] =
    useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Homecare");
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleartopNav());
    fetchTransactions();
  }, [startDate, endDate, selectedCategory]);

  const fetchTransactions = async () => {
    setIsLoading(true);
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

    try {
      const { data } = await fetchFunction(
        formattedStartDate,
        formattedEndDate
      );
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
            _id: item._id || "No Id Available",
            profile_id: item.profile_id
              ? `${item.profile_id.first_name || ""} ${
                  item.profile_id.middle_name || ""
                } ${item.profile_id.last_name || ""}`.trim()
              : "No Data Available",
            payment_type: item.payment_type || "No Payment Available",
            payment_id: item.payment_id || "No Payment Id Available",
            created_at: item.created_at || new Date(),
            payable_amount:
              item.payable_amount !== undefined
                ? item.payable_amount
                : "No Payment Available",
            order_status: item.order_status || "No Status Available",
            invoice: item.invoice || "No Invoice Available",
          }))
        );
        setTotalAmountForSelectedCategory(data.data.total_income || 0);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate < date) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
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
                    <td className="py-2 text-sm px-4">
                      {item._id || "No Id Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      {item.profile_id || "No Data Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      {item.payment_type || "No Payment Type Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      {item.payment_id || "No Payment ID Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      {formatDate(item.created_at) || "No Date Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      $
                      {!isNaN(parseFloat(item.payable_amount))
                        ? parseFloat(item.payable_amount).toFixed(2)
                        : "No Amount Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      {item.order_status || "No Status Available"}
                    </td>
                    <td className="whitespace-no-wrap py-2 sm:py-4 text-xs sm:text-sm font-['Roboto Flex'] leading-tight px-2 sm:px-4">
                      <Link to={`/invoice/${item._id}/details`}>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          id="download"
                        >
                          <path
                            fill="#000"
                            d="M12 4a1 1 0 0 0-1 1v9.529l-4.218-4.223a1.043 1.043 0 0 0-1.476 0 1.046 1.046 0 0 0 0 1.478l5.904 5.91c.217.217.506.319.79.305.284.014.573-.088.79-.305l5.904-5.91a1.046 1.046 0 0 0 0-1.478 1.043 1.043 0 0 0-1.476 0L13 14.529V5a1 1 0 0 0-1-1zM5 21a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"
                          ></path>
                        </svg>{" "}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && (
        <div className="flex justify-between items-center mt-4">
          <div>Total Amount:</div>
          <div className="text-lg font-bold">
            $
            {totalAmountForSelectedCategory
              ? totalAmountForSelectedCategory.toFixed(2)
              : "0.00"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
