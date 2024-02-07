import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { foodNavdata, pharmacyNav } from "../Redux/Features/NavbarSlice";
import { useReactToPrint } from "react-to-print";

import cx from "../assets/images/Customer.png";
import or from "../assets/images/orderInfo.png";
import ad from "../assets/images/address.png";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getFoodOrders, getPharmaOrders } from "../API/ApiCall";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("success");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const componentRef = useRef(); // Ref for the component to print
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderId } = useParams();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const foodResponse = await getFoodOrders();
        const pharmaResponse = await getPharmaOrders();

        const foodOrders = foodResponse.data.data.orders || [];
        const pharmaOrders = pharmaResponse.data.data.orders || [];

        // Check if orderId is in foodOrders or pharmaOrders
        const matchedOrder =
          foodOrders.find((order) => order._id === orderId) ||
          pharmaOrders.find((order) => order._id === orderId);

        if (!matchedOrder) {
          return;
        }

        // Check product type and dispatch corresponding action
        const productType = matchedOrder.product_type;
        if (productType === "PHARMA") {
          dispatch(pharmacyNav());
        } else if (productType === "FOOD") {
          dispatch(foodNavdata());
        }

        setOrders([matchedOrder]); // Set the matched order to state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchFunction();
  }, [dispatch, orderId]);

  // Utility function to format price
  function formatPrice(price) {
    const number = parseFloat(price);
    return !isNaN(number) ? number.toFixed(2) : "No Price Available";
  }

  function formatDate(dateTimeString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(dateTimeString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    setDropdownVisible(false);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // Optional: Add callback functions for onBeforePrint and onAfterPrint
  });

  if (!orders || orders.length === 0) {
    return <div>Loading...</div>;
  }

  const matchedOrder = orders.find((order) => order._id === orderId);
  if (!matchedOrder) {
    return <div>No matching order found</div>;
  }

  const responsiveStyles = {
    container: {
      margin: "0 auto",
      padding: "0 15px",
      maxWidth: "1200px", // Max width for large screens, centers content on larger screens
    },
    header: {
      display: "flex",
      flexDirection: "column", // Stacks items vertically on small screens
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "30px",
    },
    details: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around", // Adjusts spacing on smaller screens
    },
    detailItem: {
      marginBottom: "20px",
      flex: "1 1 200px", // Allows items to grow and wraps them to the next line on small screens
    },
    // Add more responsive styling as needed...
  };
  return (
    <>
      <style>
        {`
      @media print {
        .no-print {
          display: none;
        }
        body {
          margin: 0;
          padding: 0;
        }
        .print-container {
          margin: 20mm; 
        }
      }
    `}
      </style>
      <div className="print-container" ref={componentRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <div>
            <div>
              <strong>Order Id:</strong> {orderId}
            </div>
            {/* <div
              style={{
                marginRight: "10px",
                color:
                  status === "success"
                    ? "green"
                    : status === "pending"
                    ? "yellow"
                    : "red",
              }}
            >
              {status}
            </div> */}
          </div>
          <div style={{ position: "relative" }}>
            {/* <div onClick={() => setDropdownVisible(!isDropdownVisible)}>
              Change Status &#9660;
            </div> */}

            {matchedOrder.order_status === "Created" ? null : ( // If order status is "Created," do not render the refund button
              // Render the refund button for other order statuses
              <button
                type="button"
                class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Refund
              </button>
            )}
            {isDropdownVisible && (
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  zIndex: "1",
                  cursor: "pointer",
                }}
              >
                {["success", "pending", "declined"].map((option) => (
                  <div key={option} onClick={() => handleChangeStatus(option)}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={cx}
              alt="Customer Profile"
              style={{
                width: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>
                {" "}
                <h2>Customer</h2>
              </strong>
              {matchedOrder ? (
                <>
                  <p>
                    Full Name:{" "}
                    {matchedOrder?.address_id?.full_name || "No data"}
                  </p>
                  <p>Email: {matchedOrder?.address_id?.email || "No data"}</p>
                  <p>
                    Phone: {matchedOrder?.address_id?.phone_number || "No data"}
                  </p>
                </>
              ) : (
                <p>No matching order found</p>
              )}
            </div>
          </div>
          <div
            style={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={or}
              alt="Order Info"
              style={{
                width: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>
                <h2>Order Info</h2>
              </strong>
              {matchedOrder ? (
                <>
                  <p>
                    Shipping: {matchedOrder?.address_id?.shipping || "No data"}
                  </p>
                  <p>Payment Type: {matchedOrder?.payment_type || "No data"}</p>
                  <p>Transaction ID: {matchedOrder?.payment_id || "No data"}</p>
                  <p>Status: {matchedOrder?.order_status || "No data"}</p>
                </>
              ) : (
                <p>No matching order found</p>
              )}
            </div>
          </div>

          <div
            style={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={ad}
              alt="Address"
              style={{
                width: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>
                <h2>Address</h2>
              </strong>
              {matchedOrder ? (
                <>
                  <p>Address: {matchedOrder?.address_id?.state || "No data"}</p>
                  <p>{matchedOrder?.address_id?.city || "No data"}</p>
                  <p>{matchedOrder?.address_id?.street_address || "No data"}</p>
                  <p>{matchedOrder?.address_id?.zip_code || "No data"}</p>
                </>
              ) : (
                <p>No matching order found</p>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Products
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="bg-white border-b">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {order._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.address_id
                        ? order.address_id.full_name
                        : "No Name Available"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.product_id && order.product_id.name
                        ? order.product_id.name
                        : "No Product"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.quantity || "0"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.created_at
                        ? formatDate(order.created_at)
                        : "Date Unavailable"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      ${formatPrice(order.product_id ? order.price : "0")}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.order_status || "Status Unavailable"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* billing */}
        <div
          className="billing-details"
          style={{
            marginTop: "20px",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <div>
            <strong>Subtotal:</strong>
            <span
              style={{
                display: "inline-block",
                width: "140px",
                textAlign: "left",
              }}
            >
              ${matchedOrder?.real_total_amount?.toFixed(2) || "No data"}
            </span>
          </div>
          <div>
            <strong>Tax (10%):</strong>
            <span
              style={{
                display: "inline-block",
                width: "140px",
                textAlign: "left",
              }}
            >
              $
              {(matchedOrder?.real_total_amount * 0.1)?.toFixed(2) || "No data"}
            </span>
          </div>
          <div>
            <strong>Discount:</strong>
            <span
              style={{
                display: "inline-block",
                width: "140px",
                textAlign: "left",
              }}
            >
              ${matchedOrder?.discounted_amount?.toFixed(2) || "No data"}{" "}
            </span>
          </div>
          <div>
            <strong>Shipping:</strong>
            <span
              style={{
                display: "inline-block",
                width: "140px",
                textAlign: "left",
              }}
            >
              ${matchedOrder?.shipping_amount?.toFixed(2) || "No data"}{" "}
              {/* Assuming shipping_amount exists */}{" "}
            </span>
          </div>
          <div>
            <strong>Total:</strong>
            <span
              style={{
                display: "inline-block",
                width: "140px",
                textAlign: "left",
              }}
            >
              ${matchedOrder?.total_amount?.toFixed(2) || "No data"}{" "}
            </span>
          </div>
          <div>
            <strong>Status:</strong>
            <span
              style={{
                display: "inline-block",
                width: "140px",
                textAlign: "left",
              }}
            >
              {matchedOrder?.order_status || "No data"}{" "}
            </span>
          </div>

          <div className="no-print mr-10 mt-5">
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
