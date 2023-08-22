import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import UserContext from "../../../context/UserContext";

const CustomerProfile = () => {
  const { customerid, isAdmin } = useContext(UserContext);
  const [idParam, setIdParam] = useState(null);
  const [customerDetails, setCustomerDetails] = useState();

  useEffect(() => {
    if (isAdmin) {
      setIdParam(customerid);
    }

    if (idParam) {
      fetchcustomerDetails();
    }
  }, [isAdmin, idParam]);

  const fetchcustomerDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:49907/api/customers/details/${idParam}`
      );

      setCustomerDetails(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!customerDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="object-cover w-full h-48 md:w-48"
                src="https://via.placeholder.com/150"
                alt="Customer Profile"
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                Customer Details
              </div>
              <h2 className="mt-2 text-2xl font-semibold leading-7 text-gray-900">
                {customerDetails.CustomerName}
              </h2>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  <strong>Customer ID:</strong> {customerDetails.CustomerId}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Email:</strong> {customerDetails.Email}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Address:</strong> {customerDetails.Address}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Phone:</strong> {customerDetails.Phone}
                </p>
              </div>
              <div className="mt-4">
                <Link to="/" className="text-indigo-600 hover:text-indigo-800">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
