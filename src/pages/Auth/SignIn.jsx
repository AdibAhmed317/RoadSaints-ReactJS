import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in with:', email, password);
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center h-screen bg-gray-900'>
        <form
          onSubmit={handleSubmit}
          className='w-1/3 p-6 bg-sky-400 rounded-lg shadow-md'
        >
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
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md'
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
