import React, { useState, useContext, useEffect } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import ResponsiveComponentCustomer from "../utils/ResponsiveComponentCustomer"

const AvailabilitiesCard = () => {
  return (
    <div className="">
      <Navbar />
      <ResponsiveComponentCustomer />
      <div className="absolute bottom-0 left-0 w-full">
				<ContactFooter />
			</div>
    </div>
  );
};


export default AvailabilitiesCard;
