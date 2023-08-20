import React from 'react';
import HeroImage from '../../assets/Hero.jpg';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className='bg-gray-400 text-black flex flex-col md:flex-row items-center justify-center'>
      <div className='container mx-auto text-center h-screen justify-center items-center flex'>
        <div>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Welcome to RoadSaints!
          </h1>
          <p className='text-lg md:text-xl mb-8'>
            Your Trusted Source for Premium Bike Accessories.
          </p>
          <Link
            to='/Products'
            className='bg-blue-900 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-lg'>
            Explore Our Collection
          </Link>
        </div>
      </div>
      <div className='flex-grow w-full h-screen'>
        <img
          src={HeroImage}
          alt='Hero Image'
          className='max-w-full mx-auto h-full object-cover'
        />
      </div>
    </div>
  );
};
