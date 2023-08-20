import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import axios from 'axios';

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
    const customerId = localStorage.getItem('CustomerId');

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
        console.error('Error fetching cart details:', error);
      }
    }
  };

  const calculateSubtotal = () => {
    let total = 0;

    for (const item of cartItems) {
      total += item.Quantity * item.Product.Price;
    }

    setSubtotal(total);
  };

  const customerId = localStorage.getItem('CustomerId');
      const combinedData = {
        order: { 
          CustomerId: customerId,
          OrderDate: "2023-08-18",
          TotalAmount: subtotal,
        },
        orderDetails: cartItems.map(item => ({
          ProductId: item.ProductId,
          Quantity: item.Quantity,
          Subtotal: item.Quantity * item.Product.Price,
        })),
      };

  const handleConfirmOrder = async () => {
    console.log(combinedData);
    try {
      const response = await axios.post(
        'http://localhost:49907/api/orders/addorder',
        combinedData
      );
  
      if (response.status === 200) {
        console.log('Order confirmed successfully!');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      console.log(combinedData);
    }
  };
  

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <Navbar />
      <div className='container mx-auto py-12'>
        <h2 className='text-3xl font-semibold mb-8'>Your Cart</h2>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {cartItems.map((item) => (
            <div
              key={item.CartId}
              className='bg-gray-800 rounded-lg p-6 shadow-md'
            >
              <img
                src={item.Product.ImageUrl}
                alt={item.Product.ProductName}
                className='w-24 h-24 mx-auto mb-4 rounded-md'
              />
              <p className='text-gray-300 font-semibold text-lg'>{item.Product.ProductName}</p>
              <p className='text-gray-500'>Quantity: {item.Quantity}</p>
              <p className='text-gray-400'>Price: ${item.Product.Price}</p>
            </div>
          ))}
        </div>
        <div className='mt-8 bg-gray-800 rounded-lg p-6 shadow-md'>
          <h3 className='text-xl font-semibold mb-2'>Subtotal</h3>
          <p className='text-lg'>Total: ${subtotal}</p>
          <button
            className='mt-4 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md'
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
