import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetOrderDetails, GetHomeCareOrder } from "../API/ApiCall";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from "../Redux/Features/NavbarSlice";

const Invoice = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const componentRef = useRef(); // Ref for the component to print
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(pharmacyNav());
    const fetchTransaction = async () => {
      setIsLoading(true);

      try {
        let response = await GetOrderDetails(orderId);
        if (
          !response.data ||
          !response.data.data ||
          !response.data.data.order ||
          !response.data.data.order.product_type
        ) {
          response = await GetHomeCareOrder(orderId);
        }

        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.order
        ) {
          setOrder(response.data.data.order);
        } else {
          console.log("No order found or error in response structure.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [orderId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Use the ref for printing
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
              {order.profile_id?.first_name || "No data"}{" "}
              {order.profile_id?.last_name || "No data"}
            </h3>
            <div>{order.address_id?.street_address || "No data"}</div>
            <div>{order.address_id?.city || "No data"}</div>
            <div>{order.address_id?.zip_code || "No data"}</div>
            <div>{order.address_id?.phone_number || "No data"}</div>
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
                {order.test_id &&
                order.test_id.tests &&
                order.test_id.tests.length > 0 ? (
                  order.test_id.tests.map((test, index) => (
                    <tr key={index}>
                      {" "}
                      {/* Make sure to use a unique key for list items */}
                      <td>{index + 1}</td>
                      <td>{test.name || "No data"}</td>
                      <td>{test.payment_type || "No data"}</td>
                      <td>{test.date || "No data"}</td>
                      <td>${parseFloat(order.total_price).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No tests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* billing */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <table style={{ ...styles.tableStyle, width: "auto" }}>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>
                  $
                  {order.total_price
                    ? parseFloat(order.total_price).toFixed(2)
                    : "No data"}
                </td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>
                  $
                  {order.discount_price
                    ? parseFloat(order.discount_price).toFixed(2)
                    : "No data"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>
                    $
                    {order.payable_amount
                      ? parseFloat(order.payable_amount).toFixed(2)
                      : "No data"}
                  </strong>
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
            .printHide {
              display: none;
            }
            body {
              margin: 0;
              padding: 0;
            }
          }
        `}
      </style>
      <style>
        {`
  .custom-table th, .custom-table td {
    padding: 12px 15px; /* Adjust padding as needed */
    text-align: left; /* Ensure consistent text alignment */
    border-bottom: 1px solid #ddd; /* Consistent border styling */
  }

  /* Optional: Specify widths for each column for better control */
  .custom-table th:nth-child(1), .custom-table td:nth-child(1) { width: 20%; }
  .custom-table th:nth-child(2), .custom-table td:nth-child(2) { width: 30%; }
  .custom-table th:nth-child(3), .custom-table td:nth-child(3) { width: 25%; }
  .custom-table th:nth-child(4), .custom-table td:nth-child(4) { width: 15%; }
  .custom-table th:nth-child(5), .custom-table td:nth-child(5) { width: 10%; }

  @media print {
    .printHide {
      display: none;
    }
    body {
      margin: 0;
      padding: 0;
    }
  }
`}
      </style>
    </div>
  );
};

export default Invoice;
