import React, { useState } from "react";
import Navbar from "./navBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (input) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(input);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all the required fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Not a valid Email!");
      return;
    }
    try {
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error);
      alert("Error signing in. Try again with correct email and password!");
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="absolute top-3 right-2 text-gray-600 text-sm"
                onClick={handleTogglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <button
              className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Not a user?{" "}
            <Link to="/signup" className="text-orange-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
