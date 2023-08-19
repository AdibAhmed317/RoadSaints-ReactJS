import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const teamMembers = [
  {
    name: 'Emon Singha',
    email: 'emonsingha209@gmail.com',
    role: 'Co-Founder'
  },
  {
    name: 'Adib Ahmed',
    email: 'adibahmed317@gmail.com',
    role: 'Co-Founder'
  }
];

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className='p-6 bg-gray-900 text-white h-screen'>
        <h2 className='text-2xl font-bold mb-4'>Contact Us</h2>
        <div className='mb-8'>
          <h3 className='text-xl font-semibold mb-2'>Our Team</h3>
          <div className='grid grid-cols-2 gap-6'>
            {teamMembers.map((member, index) => (
              <div key={index} className='bg-gray-800 p-4 rounded-lg'>
                <h4 className='text-lg font-semibold'>{member.name}</h4>
                <p className='text-gray-300'>{member.role}</p>
                <p className='text-blue-300'>{member.email}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-2'>Contact Information</h3>
          <p>Name: RoadSaints</p>
          <p>Email: info@roadsaints.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
