import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    const customerId = localStorage.getItem("CustomerId");

    if (customerId) {
      try {
        const response = await axios.get(
          `http://localhost:49907/api/orders/history/${customerId}`
        );

        if (response.status === 200) {
          const history = response.data;
          setOrderHistory(history);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    }
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Navbar />
      <div className="container py-12 mx-auto">
        <h2 className="mb-8 text-3xl font-semibold">Order History</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {orderHistory.map((order) => (
            <div key={order.OrderId} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Order ID: {order.OrderId}</h3>
              <p>Order Date: {order.OrderDate}</p>
              <p>Total Amount: ${order.TotalAmount}</p>
              <h4 className="mt-2 text-lg font-semibold">Order Details:</h4>
              <ul className="ml-6 list-disc">
                {order.OrderDetails.map((detail) => (
                  <li key={detail.OrderDetailId}>
                    Product Name: {detail.Product.ProductName}, Price: {detail.Product.Price}, Quantity: {detail.Quantity}, Subtotal: ${detail.Subtotal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
