// import React, { useState } from "react";

// const transactionsData = [
//   // Replace with actual data
//   { orderId: 1, customerName: "John Doe", paymentType: "Credit Card", transactionId: "123456", date: "2022-01-20", amount: 150.5, status: "succeeded" },
//   // Add more transactions
// ];

// const TransactionTable = ({ transactions }) => {
//   return (
//     <table className="border-collapse w-full mt-5">
//       <thead>
//         <tr>
//           <th>Order ID</th>
//           <th>Customer Name</th>
//           <th>Payment Type</th>
//           <th>Transaction ID</th>
//           <th>Date</th>
//           <th>Amount</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {transactions.map((transaction) => (
//           <tr key={transaction.transactionId}>
//             <td>{transaction.orderId}</td>
//             <td>{transaction.customerName}</td>
//             <td>{transaction.paymentType}</td>
//             <td>{transaction.transactionId}</td>
//             <td>{transaction.date}</td>
//             <td>{transaction.amount}</td>
//             <td>{transaction.status}</td>
//             <td>
//               <button className="text-blue-600">Download Invoice</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const TransactionPage = () => {
//   const [category, setCategory] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredTransactions = transactionsData.filter((transaction) =>
//     (category === "All" || transaction.category === category) &&
//     (statusFilter === "All" || transaction.status === statusFilter) &&
//     (transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <div className="max-w-3xl mx-auto mt-10">
//       <div className="flex items-center justify-center space-x-3 mb-5">
//         <input
//           type="text"
//           placeholder="Search by Customer Name or Transaction ID"
//           className="border p-2 w-1/2"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2"
//         >
//           <option value="All">All</option>
//           <option value="Homecare">Homecare</option>
//           <option value="Pharmacy">Pharmacy</option>
//           <option value="Food">Food</option>
//         </select>
//       </div>

//       <div className="flex items-center justify-between mb-5">
//         <div>
//           <span>Filter by Status:</span>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border p-2"
//           >
//             <option value="All">All</option>
//             <option value="Succeeded">Succeeded</option>
//             <option value="Decline">Decline</option>
//           </select>
//         </div>
//       </div>

//       <TransactionTable transactions={filteredTransactions} />
//     </div>
//   );
// };

// export default TransactionPage;import React, { useState, useEffect } from "react";

import React, { useState, useEffect } from "react";

// Fetch orders data from API (replace with your actual implementation)
const fetchOrders = async () => {
  // Simulate API call
  const data = await fetch("/api/orders");
  const orders = await data.json();
  return orders;
};

function PharmacyDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const handleSearchChange = (event) => {
    // Update search query and filter orders
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Filter orders based on selected category
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <div className="flex items-center justify-center space-x-3 mb-5 mt-20">
        <input
          style={{
            width: "300px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          type="text"
          placeholder="Search..."
        />
      </div>
 
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginTop: "10px"      ,     alignItems: "flex-start",
}}>
          <button
            style={{
              padding: "10px 15px",
              border: "none",
             
              background: selectedCategory === "" ? "#3498db" : "",
              color: selectedCategory === "" ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick("")}
          >
            All
          </button>
          <button
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              background:
                selectedCategory === "Homecare" ? "#3498db" : "",
              color: selectedCategory === "Homecare" ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick("Homecare")}
          >
            Homecare
          </button>
          <button
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              background:
                selectedCategory === "Pharmacy" ? "#3498db" : "",
              color: selectedCategory === "Pharmacy" ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick("Pharmacy")}
          >
            Pharmacy
          </button>
          <button
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              background: selectedCategory === "Food" ? "#3498db" : "",
              color: selectedCategory === "Food" ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick("Food")}
          >
            Food
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "20px 0",
            backgroundColor: "#f5f5f5",

          }}
        >
          <thead style={{ background: "#f0f0f0" }}>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Payment Type</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.paymentType}</td>
                <td>{order.transactionId}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
  );
}

export default PharmacyDashboard;
