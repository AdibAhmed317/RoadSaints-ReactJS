import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCartDetails();
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  const fetchCartDetails = async () => {
    const customerId = localStorage.getItem("CustomerId");

    if (customerId) {
      try {
        const response = await axios.get(
          `http://localhost:49907/api/shoppingcart/details/${customerId}`
        );

        if (response.status === 200) {
          const cartDetails = response.data;
          setCartItems(cartDetails);
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    }
  };

  const handleDeleteCartItem = async (cartId) => {
    try {
      const response = await axios.delete(
        `http://localhost:49907/api/shoppingcart/deletecart/${cartId}`
      );

      if (response.status === 200) {
        const updatedCartItems = cartItems.filter(
          (item) => item.CartId !== cartId
        );
        setCartItems(updatedCartItems);
        calculateSubtotal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const calculateSubtotal = () => {
    let total = 0;

    for (const item of cartItems) {
      total += item.Quantity * item.Product.Price;
    }

    setSubtotal(total);
  };

  function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const customerId = localStorage.getItem("CustomerId");
  const combinedData = {
    order: {
      CustomerId: customerId,
      OrderDate: getFormattedDateTime(),
      TotalAmount: subtotal,
    },
    orderDetails: cartItems.map((item) => ({
      ProductId: item.ProductId,
      Quantity: item.Quantity,
      Subtotal: item.Quantity * item.Product.Price,
    })),
  };

  const handleConfirmOrder = async () => {
    const combinedDataJSON = JSON.stringify(combinedData, null, 2);
    console.log(combinedDataJSON);
    console.log(combinedData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:49907/api/orders/addorder",
        combinedDataJSON,
        config
      );

      if (response.status === 200) {
        console.log("Order confirmed successfully!");
        const customerId = localStorage.getItem("CustomerId");
        try {
          const response = await axios.delete(
            `http://localhost:49907/api/shoppingcart/deletecartsbycustomer/${customerId}`
          );

          if (response.status === 200) {
            setCartItems([]);
            calculateSubtotal();
            window.location.reload();
          }
        } catch (error) {
          console.error("Error deleting cart item:", error);
        }
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      console.log(combinedData);
    }
  };

  const handleRemoveAll = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:49907/api/shoppingcart/deletecartsbycustomer/${customerId}`
      );

      if (response.status === 200) {
        setCartItems([]);
        calculateSubtotal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing all items:", error);
    }
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
    <Navbar />
    <div className="container py-12 mx-auto">
      <h2 className="mb-8 text-3xl font-semibold">Your Cart</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cartItems.map((item) => (
          <div key={item.CartId} className="relative design-item">
            <div className="design-image">
              <img src={item.Product.ImageUrl} alt={item.Product.ProductName} />
            </div>
            <div className="design-details">
              <p className="design-product-name">Product Name: {item.Product.ProductName}</p>
              <p className="design-product-price">Price: ${item.Product.Price}</p>
              <p className="design-product-price">Quantity: {item.Quantity}</p>
              <div className="absolute right-2 top-2">
              <button
                className="design-remove-button"
                onClick={() => handleDeleteCartItem(item.CartId)}
              >
                <FaTimes />
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 mt-8 bg-gray-800 rounded-lg shadow-md">
        <h3 className="mb-2 text-xl font-semibold">Subtotal</h3>
        <p className="text-lg">Total: ${subtotal}</p>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 text-white bg-red-700 rounded-md hover:bg-red-600"
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
          <button
            className="px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-600"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Cart;
