import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const Products = ({ addToCart, addToWishlist }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:49907/api/products/allproducts"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (productId, quantity) => {
    addToCart(productId, quantity);
  };

  return (
    <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.ProductId}
          className="flex flex-col justify-between p-6 transition duration-300 transform bg-gray-800 rounded-lg hover:scale-105 hover:bg-gray-700"
        >
          <div>
            <img
              src="https://i.postimg.cc/qRhp9vyG/essential-motorcycle-accessories.jpg"
              alt={product.ProductName}
              className="object-cover w-full h-40 mb-4 rounded-lg"
            />
            <h3 className="mb-2 text-xl font-semibold">
              {product.ProductName}
            </h3>
            <p className="mb-2 text-gray-300">{product.Description}</p>
            <p className="mb-2 text-gray-300">
              In Stock: {product.StockQuantity}
            </p>
            <p className="mb-2 text-gray-300">
              Product Type: {product.Category.CategoryName}
            </p>
            <p className="mb-2 font-bold text-blue-300">
              Price: ${product.Price}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex gap-4">
                <label className="flex items-center justify-center text-gray-300">
                  Product Quantity:
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-12 h-8 p-1 text-xl text-center text-black bg-gray-300 border rounded-md"
                  id={`quantity-${product.ProductId}`}
                />
              </div>
              <div>
                <button
                  onClick={(event) => {
                    const quantityInput =
                      event.target.parentElement.parentElement.querySelector(
                        `#quantity-${product.ProductId}`
                      );
                    const quantity = parseInt(quantityInput.value, 10);
                    handleAddToCart(product.ProductId, quantity);
                  }}
                  className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <button
              onClick={() => addToWishlist(product.ProductId)}
              className="text-red-500 transition duration-300 transform hover:text-red-600 hover:scale-110"
            >
              <FaHeart size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
