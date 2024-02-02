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
    <div className="mx-auto mt-40 sm:mt-5 w-full sm:w-[1104px] overflow-x-auto rounded-xl border shadow">
      <div className="flex justify-between items-start gap-6 mb-4">
        <div className="flex flex-col items-start gap-4 mt-20 ml-5">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4">
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
      <table className="min-w-full border-collapse sm:border-separate sm:border-spacing-y-2">
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
      <div className="bottom-0 right-0 sm:flex sm:flex-col items-end gap-6 mr-6 mb-6">
        <div className="text-base sm:text-xl font-medium">Total amount</div>
        <div className="text-xs sm:text-[28px] font-bold">
          <div className="text-xs sm:text-[28px] font-bold">
            $
            {totalAmountForSelectedCategory
              ? totalAmountForSelectedCategory.toFixed(2)
              : "0.00"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch } from "react-redux";
// import { cleartopNav } from "../../Redux/Features/NavbarSlice";
// import {
//   getTransactionForHomeCare,
//   getTransactionForPharmacy,
//   getTransactionForFood,
// } from "../../API/ApiCall";

// // Component for date input
// const DateInput = ({ label, selectedDate, onChange }) => (
//   <div className="text-gray-500 text-base font-normal leading-tight tracking-tight relative">
//     {label}
//     <div className="text-slate-400 text-base font-normal leading-tight tracking-tight mt-3 relative">
//       <DatePicker
//         selected={selectedDate}
//         className="border text-gray-900 w-[118px] h-12 px-3 py-2.5 justify-start items-center gap-2 flex rounded-lg"
//         onChange={onChange}
//       />
//       {/* Icon updated for consistency */}
//       <svg
//         className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-1 top-4"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
//       </svg>
//     </div>
//   </div>
// );

// // Component for category filter
// const CategoryFilter = ({ selectedCategory, onSelect }) => (
//   <div className="flex justify-center items-center space-x-6">
//     {["Homecare", "Pharmacy", "Food"].map((category) => (
//       <div
//         key={category}
//         onClick={() => onSelect(category)}
//         className={`${
//           selectedCategory === category
//             ? "border-b-2 border-black text-zinc-800 text-xl font-medium"
//             : "text-gray-400"
//         } cursor-pointer`}
//       >
//         {category}
//       </div>
//     ))}
//   </div>
// );

// // Updated Transactions component
// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [totalAmountForSelectedCategory, setTotalAmountForSelectedCategory] =
//     useState(0);
//   const [selectedCategory, setSelectedCategory] = useState("Homecare");

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(cleartopNav());
//     fetchTransactions();
//   }, [dispatch, startDate, endDate, selectedCategory]);

//   const fetchTransactions = () => {
//     const formattedStartDate = formatDate(startDate);
//     const formattedEndDate = formatDate(endDate);

//     let fetchFunction;
//     switch (selectedCategory) {
//       case "Homecare":
//         fetchFunction = getTransactionForHomeCare;
//         break;
//       case "Pharmacy":
//         fetchFunction = getTransactionForPharmacy;
//         break;
//       case "Food":
//         fetchFunction = getTransactionForFood;
//         break;
//       default:
//         fetchFunction = getTransactionForHomeCare;
//     }

//     fetchFunction(formattedStartDate, formattedEndDate).then(({ data }) => {
//       setTransactions(data.data.transaction);
//       setTotalAmountForSelectedCategory(data.data.total_income);
//     });
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: "numeric", month: "numeric", day: "numeric" };
//     return date.toLocaleDateString("en-US", options);
//   };

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     if (endDate < date) {
//       setEndDate(date);
//     }
//   };

//   const handleEndDateChange = (date) => {
//     if (date >= startDate) {
//       setEndDate(date);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     fetchTransactions();
//   };

//   return (
//     <div className="mx-auto mt-40 sm:mt-5 w-full sm:w-[1104px] overflow-x-auto rounded-xl border shadow">
//       <div className="flex justify-between items-start gap-6 mb-4">
//         <div className="flex flex-col items-start gap-4 mt-20 ml-5">
//           <CategoryFilter
//             selectedCategory={selectedCategory}
//             onSelect={handleCategorySelect}
//           />
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4">
//           <DateInput
//             label="Starting Date"
//             selectedDate={startDate}
//             onChange={handleStartDateChange}
//           />
//           <DateInput
//             label="Ending Date"
//             selectedDate={endDate}
//             onChange={handleEndDateChange}
//           />
//         </div>
//       </div>

//       {/* Updated Table Section */}
//       <div className="p-5">
//         <div className="relative overflow-x-auto">
//           <table className="w-full text-sm text-left text-gray-500">
//             <thead className="text-xs text-gray-400 uppercase bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3">Order ID</th>
//                 <th className="px-6 py-3">Customer</th>
//                 <th className="px-6 py-3">Payment Type</th>
//                 <th className="px-6 py-3">Transaction ID</th>
//                 <th className="px-6 py-3">Date</th>
//                 <th className="px-6 py-3">Amount</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Invoice</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((item, index) => (
//                 <tr key={index} className={`bg-white border-b`}>
//                   <td className="px-6 py-4">{item._id}</td>
//                   <td className="px-6 py-4">
//                     {item.profile_id.first_name} {item.profile_id.last_name}
//                   </td>
//                   <td className="px-6 py-4">{item.payment_type}</td>
//                   <td className="px-6 py-4">{item.payment_id}</td>
//                   <td className="px-6 py-4">{formatDate(item.created_at)}</td>
//                   <td className="px-6 py-4">{item.payable_amount}</td>
//                   <td className="px-6 py-4">{item.order_status}</td>
//                   <td className="px-6 py-4">{item.invoice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="bottom-0 right-0 sm:flex sm:flex-col items-end gap-6 mr-6 mb-6">
//         <div className="text-base sm:text-xl font-medium">Total amount</div>
//         <div className="text-xs sm:text-[28px] font-bold">
//           $
//           {totalAmountForSelectedCategory
//             ? totalAmountForSelectedCategory.toFixed(2)
//             : "0.00"}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;
