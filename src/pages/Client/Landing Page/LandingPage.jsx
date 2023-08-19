import React, { useContext, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { Hero } from '../../../components/Hero Section/Hero';
import UserContext from '../../../context/UserContext';

const LandingPage = () => {
  const { isAdmin, customerid } = useContext(UserContext);
  useEffect(() => {
    console.log(isAdmin);
    console.log(customerid);
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;
