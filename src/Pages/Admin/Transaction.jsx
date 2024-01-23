import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleartopNav());
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
