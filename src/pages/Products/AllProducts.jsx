import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Products from '../../components/Product Card/ProductCard';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AllProducts = () => {
  const navigate = useNavigate();
  
  const addToWishlist = async (productId) => {
    const customerId = localStorage.getItem('CustomerId');
    if (customerId) {
      try {
        const response = await axios.post('http://localhost:49907/api/wishlist/addtowishlist', {
          CustomerId: customerId,
          ProductId: productId,
        });

        if (response.status === 200) {
          console.log(`Added product with ID ${productId} to wishlist for customer ${customerId}`);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
      }
    } else {
      navigate('/SignIn');
    }
  };

  const addToCart = async (productId) => {
    const customerId = localStorage.getItem('CustomerId');
    if(customerId) {
      const quantityInput = document.querySelector(`#quantity-${productId}`);
    const quantity = parseInt(quantityInput.value, 10);
  
    try {
      const cartResponse = await axios.get(`http://localhost:49907/api/shoppingcart/details/${customerId}`);
      const existingCartItem = cartResponse.data.find(item => item.ProductId === productId);
      if(!existingCartItem)
      {
        const response = await axios.post('http://localhost:49907/api/shoppingcart/addcart', {
        CartId: null,
        CustomerId: customerId,
        ProductId: productId,
        Quantity: quantity,
      });
  
      if (response.status === 200) {
        console.log(`Added ${quantity} units of product with ID ${productId} to cart ${customerId}`);
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `Added ${quantity} units of product to your cart.`,
        });
        window.location.reload();
      }
      }
      else
      {
        const updatedQuantity = existingCartItem.Quantity + quantity;
        const response = await axios.put(`http://localhost:49907/api/shoppingcart/update/${existingCartItem.CartId}`, {
          Quantity: updatedQuantity,
        });

        if (response.status === 200) {
          console.log(`Added ${quantity} units of product with ID ${productId} to cart ${customerId}`);
          Swal.fire({
            icon: 'success',
            title: 'Added to Cart!',
            text: `Added ${quantity} units of product to your cart.`,
          });
        }
        
      }
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
    }
    else {
      navigate('/SignIn');
    }
  };

  return (
    <>
      <Navbar />
      <div className='p-6 text-white bg-gray-900'>
        <h2 className='mb-8 text-3xl font-bold text-center'>
          Explore Bike Accessories
        </h2>
        <Products addToCart={addToCart} addToWishlist={addToWishlist} />
      </div>
    </>
  );
};

export default AllProducts;
