import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { Hero } from '../../../components/Hero Section/Hero';


const LandingPage = () => {


  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;
