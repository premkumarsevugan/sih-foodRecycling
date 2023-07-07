import React, { useState } from "react";
import Navbar from "./navBar";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, collection, setDoc, GeoPoint } from "firebase/firestore";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("Customers");
  const [orgName, setOrgName] = useState("");
  const [locationPer, setLocationPer] = useState("Coimbatore");
  const [orgLocation, setOrgLocation] = useState("Your current Location");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleOrgChange = (e) => {
    setOrgName(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidPhoneNumber = (input) => {
    const numericInput = Number(input);
    return !isNaN(numericInput) && input.length === 10;
  };

  const isValidEmail = (input) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(input);
  };

  const handleSignUp = async () => {
    // event.preventDefault();
    if (
      email === "" ||
      name === "" ||
      phoneNumber === "" ||
      orgName === "" ||
      password === "" ||
      password2 === "" ||
      location === ""
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Not a valid Email!");
      return;
    }
    if (password !== password2) {
      alert("Passwords don't match. Try again with same password.");
      return;
    }
    if (password.length < 6) {
      alert("Password should be atleast six characters long!");
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Enter a valid Phone Number.");
      return;
    }
    if (
      window.confirm(
        "Your current Location will be set as your default location. Use a mobile phone for accurate location!"
      )
    ) {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // setPosition(position);
            // console.log(position);
            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);
            const geoPoint = new GeoPoint(
              position.coords.latitude,
              position.coords.longitude
            );

            // console.log(geoPoint);
            // alert(position.coords.latitude + " " + position.coords.longitude);

            // Create user account with email and password
            await createUserWithEmailAndPassword(auth, email, password);

            // Store user data in Firestore
            setLocation("Coimbatore");
            const userData = {
              email: email,
              name: name,
              phoneNumber: phoneNumber,
              // "location" : location,
              location: locationPer,
              userType: userType,
              orgName: orgName,
              coordinates: geoPoint,
            };

            // // const userDocRef = doc(db, "users", user.uid);
            const userCollection = collection(db, "users");
            await setDoc(doc(userCollection, email), userData);
            navigate("/");
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Error getting location:", error);
            // alert("Could not get location. Try again or try after some time.");
            return;
          }
        );
      } catch (error) {
        // Handle sign-up error
        // console.error("Error signing up:", error);
        alert("Error Signing up. Try again or try again after some time.");
      }
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center items-center bg-gray-100 ">
        <div className="bg-white p-12 rounded shadow-lg m-12">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter a password"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 text-gray-800">
              Retype Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password2"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={password2}
              onChange={handlePasswordChange2}
              placeholder="Password"
            />
            <button
              className="absolute right-2 bottom-2.5 text-gray-600 text-sm"
              onClick={handleTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 text-gray-800">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+91"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block mb-2 text-gray-800">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter City Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block mb-2 text-gray-800">
              User Type
            </label>
            <select
              id="userType"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="Customers">Customers</option>
              <option value="Providers">Providers</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block mb-2 text-gray-800">
              Organization Name
            </label>
            <input
              type="text"
              id="orgName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={orgName}
              onChange={handleOrgChange}
              placeholder="Enter Organization name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block mb-2 text-gray-800">
              Organization Location
            </label>
            <select
              id="userType"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={orgLocation}
              readOnly
              // onChange={handleUserTypeChange}
            >
              <option value="Customers">Current Location</option>
              {/* <option value="Providers">Providers</option> */}
            </select>
          </div>

          <div>
            <button
              className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
