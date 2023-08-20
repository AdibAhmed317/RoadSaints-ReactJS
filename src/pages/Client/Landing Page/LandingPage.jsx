import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { Hero } from '../../../components/Hero Section/Hero';
import HeroAbout from './HeroAbout';
import HeroContact from './HeroContact';

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <Hero />
      <HeroAbout />
      <HeroContact />
      <Footer />
    </div>
  );
};

export default LandingPage;
