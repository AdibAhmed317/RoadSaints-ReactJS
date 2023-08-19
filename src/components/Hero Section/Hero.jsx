import React from 'react';
import HeroImage from '../../assets/Hero.jpg';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className='bg-blue-900 text-white flex items-center justify-center flex-grow'>
      <div className='container mx-auto text-center'>
        <div>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Welcome to RoadSaints!
          </h1>
          <p className='text-lg md:text-xl mb-8'>
            Your Trusted Source for Premium Bike Accessories.
          </p>
          <Link
            to='/Products'
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg'
          >
            Explore Our Collection
          </Link>
        </div>
      </div>
      <div className='flex-grow w-full h-full'>
        <img
          src={HeroImage}
          alt='Hero Image'
          className='max-w-full mx-auto h-full' // Center image horizontally
        />
      </div>
    </div>
  );
};