import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { foodNavdata, pharmacyNav } from "../Redux/Features/NavbarSlice";
import cx from "../assets/images/Customer.png";
import or from "../assets/images/orderInfo.png";
import ad from "../assets/images/address.png";
import { useParams } from "react-router-dom";
import { getFoodOrders } from "../API/ApiCall";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("success");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();

  const { orderId } = useParams();

  useEffect(() => {
    dispatch(foodNavdata());
    getFoodOrders()
      .then(({ data }) => {
        console.log(data.data.orders);
        setOrders(data.data.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [dispatch]);

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    setDropdownVisible(false);
  };

  if (!orders || orders.length === 0) {
    return <div>Loading...</div>;
  }

  const matchedOrder = orders.find((order) => order._id === orderId);

  return (
    <div style={{ margin: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <div>
          <div>Order Id: {orderId}</div>
          <div
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
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div onClick={() => setDropdownVisible(!isDropdownVisible)}>
            Change Status &#9660;
          </div>
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
            style={{ width: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          <div>
            <h2>Customer</h2>
            {matchedOrder ? (
              <>
                <p>Full Name: {matchedOrder.address_id.full_name}</p>
                <p>Email: {matchedOrder.address_id.email}</p>
                <p>Phone: {matchedOrder.address_id.phone_number}</p>
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
            style={{ width: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          <div>
            <h2>Order Info</h2>
            {matchedOrder ? (
              <>
                <p>Shipping: {matchedOrder.address_id.shipping}</p>
                <p>Payment Type: {matchedOrder.payment_type}</p>
                <p>Transaction ID: {matchedOrder.payment_id}</p>
                <p>Status: {matchedOrder.order_status}</p>
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
            style={{ width: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          <div>
            <h2>Address</h2>
            {matchedOrder ? (
              <>
                <p>Address: {matchedOrder.address_id.state}</p>
                <p>{matchedOrder.address_id.city}</p>
                <p>{matchedOrder.address_id.street_address}</p>
                <p>{matchedOrder.address_id.zip_code}</p>
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
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {matchedOrder ? (
                <tr
                  key={matchedOrder.product_id._id}
                  className="bg-white border-b"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {matchedOrder.product_id.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {matchedOrder.quantity}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {matchedOrder.total_amount}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3">
                    No matching order found or products are not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* billing */}
      <div className="billing-details" style={{ marginTop: "20px" ,alignItems: "flex-end", textAlign: "right"}}>
        <div>
          <strong>Subtotal:{matchedOrder.real_total_amount}</strong>
        </div>
        <div>
          <strong>Tax (10%):{matchedOrder.real_total_amount}</strong>
        </div>
        <div>
          <strong>Discount:{matchedOrder.discounted_amount}</strong>
        </div>
        <div>
          <strong>Shipping:{matchedOrder.real_total_amount}</strong>
        </div>
        <div>
          <strong>Total:{matchedOrder.total_amount}</strong>
        </div>
        <div>
          <strong>Status:{matchedOrder.order_status}</strong> {""}
        </div>
        <div className="buttons-section">
          <button className="back-button">Back</button>
          <button className="print-button">Print</button>
        </div>
      </div>
    </div>
  );
}
