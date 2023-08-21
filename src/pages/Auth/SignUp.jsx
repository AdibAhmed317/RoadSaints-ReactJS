import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [CustomerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    CustomerName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!CustomerName) {
      newErrors.CustomerName = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit';
    }

    if (!address) {
      newErrors.address = 'Address is required';
    }

    if (!phone) {
      newErrors.phone = 'Phone Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newCustomer = {
        CustomerName,
        email,
        password,
        address,
        phone,
        isAdmin: false,
      };

      try {
        const response = await axios.post(
          'http://localhost:49907/api/customers/addcustomer',
          newCustomer
        );

        if (response.status === 200) {
          console.log('Customer added successfully:', response.data);
          navigate('/SignIn');
        } else {
          console.log('Failed to add customer');
        }
      } catch (error) {
        console.error('Error adding customer:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center h-screen bg-gray-900'>
        <form
          onSubmit={handleSubmit}
          className='w-1/3 p-6 rounded-lg shadow-md bg-sky-400'
        >
          <h2 className='mb-4 text-2xl font-bold'>Sign Up</h2>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              className={`mt-1 p-2 border rounded w-full ${
                errors.CustomerName ? 'border-red-500' : ''
              }`}
              value={CustomerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            {errors.CustomerName && (
              <p className='text-sm text-red-500'>{errors.CustomerName}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              className={`mt-1 p-2 border rounded w-full ${
                errors.email ? 'border-red-500' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              className={`mt-1 p-2 border rounded w-full ${
                errors.password ? 'border-red-500' : ''
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Address
            </label>
            <input
              type='text'
              className={`mt-1 p-2 border rounded w-full ${
                errors.address ? 'border-red-500' : ''
              }`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && (
              <p className='text-sm text-red-500'>{errors.address}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='tel'
              className={`mt-1 p-2 border rounded w-full ${
                errors.phone ? 'border-red-500' : ''
              }`}
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone}</p>
            )}
          </div>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
          >
            Sign Up
          </button>
          <div className='flex gap-2 mt-2'>
          <p>Already Member?</p>
          <Link to='/SignIn'>
            Login Here
          </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
