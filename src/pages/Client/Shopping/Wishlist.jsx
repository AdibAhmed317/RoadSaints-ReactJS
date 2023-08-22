import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";
import { FaTimes, FaCartPlus } from "react-icons/fa";
import "../../../index.css";
import Dp from '../../../assets/hero.jpg';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    const customerId = localStorage.getItem("CustomerId");

    if (customerId) {
      try {
        const response = await axios.get(
          `http://localhost:49907/api/wishlist/details/${customerId}`
        );

        if (response.status === 200) {
          const wishlistDetails = response.data;
          setWishlistItems(wishlistDetails);
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    }
  };

  const handleRemoveWishlistItem = async (wishlistId) => {
    try {
      const response = await axios.delete(
        `http://localhost:49907/api/wishlist/deletewishlistitem/${wishlistId}`
      );

      if (response.status === 200) {
        const updatedWishlistItems = wishlistItems.filter(
          (item) => item.WishlistId !== wishlistId
        );
        setWishlistItems(updatedWishlistItems);
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  const handleAddToCart = async (productId, wishlistId) => {
    const customerId = localStorage.getItem("CustomerId");
    const quantity = parseInt(1, 10);
    try {
        const response = await axios.post('http://localhost:49907/api/shoppingcart/addcart', {
          CartId: null,
          CustomerId: customerId,
          ProductId: productId,
          Quantity: quantity,
        });
    
        if (response.status === 200) {
          console.log(`Added ${quantity} units of product with ID ${productId} to cart ${customerId}`);
          await handleRemoveWishlistItem(wishlistId);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Navbar />
      <div className="container py-12 mx-auto">
        <h2 className="mb-8 text-3xl font-semibold">Your Wishlist</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <div key={item.WishlistId} className="relative design-item">
              <div className="design-image">
                <img src={Dp} alt={item.Product.ProductName} />
              </div>
              <div className="design-details">
                <p className="design-product-name">Product Name: {item.Product.ProductName}</p>
                <p className="design-product-price">Price: ${item.Product.Price}</p>
                <div className="absolute right-2 top-2">
                <button
                  className="design-remove-button"
                  onClick={() => handleRemoveWishlistItem(item.WishlistId)}
                >
                  <FaTimes />
                </button>
                </div>
                <button
                  className="design-add-cart-button"
                  onClick={() => handleAddToCart(item.ProductId, item.WishlistId)}
                >
                  <FaCartPlus /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
