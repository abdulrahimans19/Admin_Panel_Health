import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetOrderDetails, GetHomeCareOrder } from "../API/ApiCall";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint

const Invoice = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const componentRef = useRef(); // Ref for the component to print

  useEffect(() => {
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
              {order.profile_id.first_name} {order.profile_id.last_name}
            </h3>
            <div>{order.address_id.street_address}k</div>
            <div>{order.address_id.city} </div>
            <div>{order.address_id.zip_code}</div>
            <div>{order.address_id.phone_number}</div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          {/* Order Details */}
          <table style={styles.tableStyle}>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Payment Type</th>
                <th>Date</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.test_id &&
              order.test_id.tests &&
              order.test_id.tests.length > 0 ? (
                order.test_id.tests.map((test, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{test.name}</td>
                    <td>{test.payment_type}</td>
                    <td>{test.date}</td>
                    <td>${parseFloat(order.total_price).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No tests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <table style={{ ...styles.tableStyle, width: "auto" }}>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>${parseFloat(order.total_price).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>${parseFloat(order.discount_price).toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>
                    ${parseFloat(order.payable_amount).toFixed(2)}
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
    </div>
  );
};

export default Invoice;