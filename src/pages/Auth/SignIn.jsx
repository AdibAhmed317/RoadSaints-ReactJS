import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Cookies from 'js-cookie';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setCustomerid } = useContext(UserContext);
  const { setIsAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  const setCookie = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3); // Set to 3 days from now

    const cookieAttributes = {
      expires: expirationDate,
      path: '/',
    };

    Cookies.set('AuthCookie', 'IsAdmin=True', cookieAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        Email: email,
        Password: password,
      };

      const res = await axios.post(
        'http://localhost:49907/api/customers/login',
        loginData
      );

      if (res.data.IsAdmin) {
        setCookie();
      }

      console.log(res.data);
      localStorage.setItem('isAdmin', res.data.IsAdmin);
      localStorage.setItem('CustomerId', res.data.CustomerId);

      setCustomerid(res.data.CustomerId);
      setIsAdmin(res.data.IsAdmin);

      navigate('/');
    } catch (error) {
      setErrorMessage('Email/Password did not match');
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center h-screen bg-gray-900'>
        <form
          onSubmit={handleSubmit}
          className='w-1/3 p-6 bg-sky-400 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              className='mt-1 p-2 border rounded w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              className='mt-1 p-2 border rounded w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>
            Sign In
          </button>
          <br />
          <span className='text-red-500'>{errorMessage}</span>
        </form>
      </div>
    </>
  );
};

export default SignIn;
