import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'; // Import sweetalert2
import 'sweetalert2/dist/sweetalert2.min.css'; 
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setCustomerid } = useContext(UserContext);
  const { setIsAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  const setCookie = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3); 

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

      Swal.fire({
        title: 'Sign In Successful',
        icon: 'success',
        timer: 2000, // Display for 2 seconds
        showConfirmButton: false,
      });
    } catch (error) {
      setErrorMessage('Email/Password did not match');
      console.log(error);

      Swal.fire({
        title: 'Sign In Failed',
        text: 'Email/Password did not match',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center h-screen bg-gray-900'>
        <form
          onSubmit={handleSubmit}
          className='w-1/3 p-6 rounded-lg shadow-md bg-sky-400'>
          <h2 className='mb-4 text-2xl font-bold'>Sign In</h2>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              className='w-full p-2 mt-1 border rounded'
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
              className='w-full p-2 mt-1 border rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'>
            Sign In
          </button>
          <br />
          <div className='flex gap-2 mt-2'>
          <p>New Member?</p>
          <Link to='/SignUp'>
            Register Here
          </Link>
          </div>
          <span className='text-red-500'>{errorMessage}</span>
        </form>
      </div>
    </>
  );
};

export default SignIn;
