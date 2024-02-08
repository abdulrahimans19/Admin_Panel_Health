import React, { useEffect, useState, useRef } from "react";
import { GetOrderDetails, GetHomeCareOrder } from "../API/ApiCall";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from "../Redux/Features/NavbarSlice";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();
  const location = useLocation();
  const { orderId, orderType } = location.state;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true);

      try {
        let response;
        if (orderType === "Homecare") {
          response = await GetHomeCareOrder(orderId);
        } else {
          // Handles both Food and Pharma
          response = await GetOrderDetails(orderId);
        }

        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.order
        ) {
          const normalizedData = normalizeOrderData(
            response.data.data.order,
            orderType
          );
          setOrder(normalizedData);
        } else {
          console.error("No order data found");
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, orderType]);

  const normalizeOrderData = (data, orderType) => {
    const address = data.address_id
      ? `${data.address_id.street_address}, ${data.address_id.city}, ${data.address_id.zip_code}`
      : "No address data";

    const customerName = data.profile_id
      ? `${data.profile_id.first_name} ${data.profile_id.last_name}`
      : "No customer data";

    let items = [];
    let subtotal = 0;
    let discount = 0;
    let totalAmount = 0;

    if (orderType === "Homecare") {
      items = data.test_id.tests.map((test) => ({
        name: test.name || "No test name",
        paymentType: data.payment_type || "No payment type",
        date: data.date ? new Date(data.date).toLocaleDateString() : "No date",
        qty: data.number_of_test || "quantity not available",
        price: data.test_id.price || 0,
      }));
      subtotal = data.total_price || 0;
      discount = data.discount_price || 0;
      totalAmount = data.payable_amount || 0;
    } else {
      items.push({
        name: data.product_id.name || "No product name",
        paymentType: data.payment_type || "No payment type",
        date: data.created_at
          ? new Date(data.created_at).toLocaleDateString()
          : "No date",
        qty: data.quantity || "quantity not available",
        price: data.product_id.price || 0,
      });
      subtotal = data.total_amount || 0;
      discount = data.discounted_amount || 0;
      totalAmount = data.real_total_amount || 0;
    }

    return {
      id: data._id,
      customerName,
      items,
      address,
      subtotal,
      discount,
      totalAmount,
      paymentId: data.payment_id,
      orderStatus: data.order_status,
    };
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No transaction found for ID: {orderId}</div>;
  }

  const today = new Date();
  const formattedToday = `${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })}, ${today.getFullYear()}`;

  const styles = {
    container: { padding: "2rem", maxWidth: "1200px", margin: "auto" },
    cardStyle: {
      margin: "30px",
      boxShadow: "0px 1px 2px 1px rgba(154, 154, 204, 0.22)",
      border: "none",
      padding: "20px",
    },
    headerFooterStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      borderBottom: "1px solid #e6e6f2",
      padding: "20px 0",
    },
    textStyle: { color: "#3d405c" },
    tableStyle: {
      width: "100%",
      marginBottom: "1rem",
      color: "#212529",
      borderCollapse: "collapse",
    },
    printButtonStyle: {
      marginTop: "20px",
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div ref={componentRef} style={styles.cardStyle}>
        <div style={styles.headerFooterStyle}>
          {/* Header */}
          <h1>
            <strong>Invoice</strong> {order._id}
          </h1>

          <div>{formattedToday}</div>
        </div>
        {/* From/To section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap", // Ensure responsiveness
          }}
        >
          <div>
            <h5
              style={{
                fontSize: "15px",
                marginBottom: "15px",
                color: styles.textStyle.color,
              }}
            >
              From:
            </h5>
            <h3 style={{ margin: "0", color: styles.textStyle.color }}>
              SOphw
            </h3>
            <div>29, Singla Street</div>
            <div>Sikeston, New Delhi 110034</div>
            <div>Email: contact@bbbootstrap.com</div>
            <div>Phone: +91 9897 989 989</div>
          </div>
          <div>
            <div>
              <h5
                style={{
                  fontSize: "15px",
                  marginBottom: "15px",
                  color: styles.textStyle.color,
                }}
              >
                To:
              </h5>
              <h3 style={{ margin: "0", color: styles.textStyle.color }}>
                {order.customerName}
              </h3>
              <div>{order.address}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          {/* Order Details */}
          <div className="relative overflow-x-auto">
            <table
              className="w-full text-sm text-left text-gray-500 custom-table"
              style={{ borderCollapse: "collapse" }}
            >
              <thead className="text-xs text-gray-400 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.paymentType}</td>
                    <td>{item.date}</td>
                    <td>{item.qty}</td>
                    <td>${item.price.toFixed(2)}</td>
                  </tr>
                ))}
                {order.items.length === 0 && (
                  <tr>
                    <td colSpan="5">No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Billing Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <table style={{ ...styles.tableStyle, width: "auto" }}>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>-${order.discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>${order.totalAmount.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button style={styles.printButtonStyle} onClick={handlePrint}>
        Print/Download PDF
      </button>
      <style>
        {`
  @media print {
    body, html {
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: visible;
    }
    .custom-table {
      width: 100% !important;
      table-layout: fixed; /* Change layout to fixed to manage column widths */
    }
    .custom-table th, .custom-table td {
      padding: 6px; /* Slightly reduce padding */
      text-align: left;
      border-bottom: 1px solid #ddd;
      word-wrap: break-word; /* Ensure content wraps */
      overflow: hidden; /* Hide overflow */
      text-overflow: ellipsis; /* Show ellipsis for overflowed content */
      max-width: 0; /* Ensure wrapping applies */
      font-size: 10pt; /* Slightly reduce font size */
    }
    /* Target specific columns for width adjustments, if necessary */
    .custom-table th:nth-child(2), .custom-table td:nth-child(2) {
      max-width: 100px; /* Adjust based on your content and needs */
    }
    .printHide {
      display: none;
    }
  }
`}
      </style>
    </div>
  );
};

export default Invoice;
