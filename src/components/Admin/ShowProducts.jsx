import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:49907/api/products/allproducts'
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Product?',
        text: 'Are you sure you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:49907/api/products/deleteproduct/${productId}`,
          { withCredentials: true }
        );
        console.log(res.data);

        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          fetchProducts();
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Unable to delete the product.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <div className='bg-gray-900 text-white p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div
              key={product.ProductId}
              className='bg-gray-800 p-6 rounded-lg flex flex-col justify-between'>
              <div>
                <img
                  src='https://i.postimg.cc/qRhp9vyG/essential-motorcycle-accessories.jpg'
                  alt={product.ProductName}
                  className='w-full h-40 object-cover mb-4 rounded-lg'
                />
                <h3 className='text-xl font-semibold mb-2'>
                  {product.ProductName}
                </h3>
                <p className='text-gray-300 mb-2'>{product.Description}</p>
                <p className='text-blue-300 font-bold mb-2'>
                  Price: ${product.Price}
                </p>
              </div>
              <div className='flex justify-between items-center'>
                <Link
                  to={`/admin/edit-product/${product.ProductId}`} // Replace with actual route
                  className='mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
                  Edit
                </Link>
                <Link
                  to={`/admin/product-details/${product.ProductId}`} // Replace with actual route
                  className='mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'>
                  Details
                </Link>
                <button
                  onClick={() => deleteProduct(product.ProductId)}
                  className='mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProducts;
