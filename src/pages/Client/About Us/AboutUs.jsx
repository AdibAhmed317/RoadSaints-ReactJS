import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';

const aboutUsContent = `
Welcome to RoadSaints, your trusted source for premium bike accessories. We are dedicated to providing the best quality accessories for bike enthusiasts. Our team is passionate about bikes and aims to bring you the latest and most innovative products in the industry. Whether you're a casual rider or a seasoned biker, we have something for everyone.

Our mission is to enhance your biking experience by offering a wide range of accessories that combine functionality and style. From safety gear to performance-enhancing equipment, we strive to meet the diverse needs of the biking community.

At RoadSaints, we believe that biking is more than just a mode of transportation; it's a lifestyle. Our products are carefully curated to reflect the spirit of adventure, freedom, and camaraderie that comes with being a part of the biking community.

Thank you for choosing RoadSaints as your partner in biking adventures. Join us on this exciting journey and gear up for the ride of a lifetime!
`;

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className='p-6 bg-gray-900 text-white h-screen'>
        <h2 className='text-3xl font-bold mb-4'>About Us</h2>
        <p className='text-gray-200 leading-loose'>{aboutUsContent}</p>
      </div>
    </div>
  );
};

export default AboutUs;
