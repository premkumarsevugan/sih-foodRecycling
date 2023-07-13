import React, { useState, useContext, useEffect } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import ResponsiveComponentCustomer from "../utils/ResponsiveComponentCustomer"

const AvailabilitiesCard = () => {
  return (
    <div className="">
      <Navbar />
      <ResponsiveComponentCustomer />
      <div className="w-full">
				<ContactFooter />
			</div>
    </div>
  );
};


export default AvailabilitiesCard;
