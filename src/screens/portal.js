import React, { useState, useContext, useEffect } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import { useNavigate } from "react-router-dom";

const PortalScreen = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <ResponsiveComponent />
      <div className="absolute bottom-0 left-0 w-full">
        <ContactFooter />
      </div>
    </div>
  );
};

const ResponsiveComponent = () => {
  const navigate = useNavigate();

  const handleCus = () => {
    navigate("/requestcard");
  };

  const handlePro = () => {
    navigate("/availabilitycard");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center px-4 h-120 mt-8">
        <div className="w-full md:w-1/3 p-8">
          <h1 className="text-transparent font-bold ml-2">
            <span className="text-black text-8xl">We help</span> <br />
            <span className="text-orange-500 text-8xl">Save Food</span>
          </h1>
          <p className="text-sm mt-4">
          FoodSaver is dedicated to reducing food waste and ensuring that no one goes hungry. We believe that every bit of food can make a difference, and our mission is to connect surplus food with organizations and individuals who need it the most.
          </p>
        </div>

        <div className="w-full flex-col items-center md:w-2/3 p-4 mt-12">
          <div className="container flex items-center justify-evenly">
            <div className="flex flex-col items-center">
              <h1 className="text-transparent font-bold ml-2 mb-4">
                <span className="text-black text-4xl">View Availabilities</span>
              </h1>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded mb-12"
                onClick={handlePro}
              >
                Availabilities
              </button>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-transparent font-bold ml-2 mb-4">
                <span className="text-black text-4xl">View Requests</span>
              </h1>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mb-12"
                onClick={handleCus}
              >
                Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalScreen;
