import React, { useState, useContext, useEffect } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import { useNavigate } from "react-router-dom";
import { doc, collection, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../utils/AuthContext";
import { v4 as uuidv4 } from "uuid";

const AvailabilityForm = () => {
  return (
    <div className="">
      <Navbar />
      <FormComponent />
      <ContactFooter />
    </div>
  );
};

const FormComponent = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [preparedTimeT, setPreparedTimet] = useState("");
  const [expiryTimeT, setExpiryTimeT] = useState("");
  const [foodType, setFoodType] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [userData, setuserData] = useState(null);
  const isAuth = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchDocument = async () => {
    if (isAuth && !userData) {
      // console.log(2);
      try {
        const docRef = doc(db, "users", isAuth["providerData"][0].uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setuserData(docSnapshot.data());
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.log("Error fetching document from Firebase:", error);
      }
    }
  };

  useEffect(() => {
    fetchDocument();
    // console.log(userData);
  });

  const handleSubmit = async (e) => {
    if (window.confirm("Do you wish to sbmit this availability?")) {
      e.preventDefault();

      const email = isAuth["providerData"][0].uid;
      const location = userData["location"];
      const phoneNumber = userData["phoneNumber"];
      const preparedTime = Timestamp.fromDate(new Date(preparedTimeT));
      const expiryTime = Timestamp.fromDate(new Date(expiryTimeT));
      const orgName = userData["orgName"];
      const coordinates = userData["coordinates"];
      const uid = uuidv4();

      const userDataupload = {
        description,
        accepted,
        address,
        foodType,
        preparedTime,
        expiryTime,
        orgName,
        quantity,
        picturePath,
        email,
        location,
        phoneNumber,
        uid,
        coordinates,
      };

      if (isAuth) {
        try {
          const uniqueId = uuidv4();

          const userCollection = collection(db, "availability");
          await setDoc(doc(userCollection, uniqueId), userDataupload);
          alert("Availability Uploaded!");
          navigate("/portal");
        } catch (error) {
          // console.log("Error  document from Firebase:", error);
          alert("An error occured! Please Try again!");
          // navigate("/portal");
        }
      }

      // Reset the form
      setAddress("");
      setDescription("");
      setPreparedTimet("");
      setExpiryTimeT("");
      setFoodType("");
      setPicturePath("");
      setQuantity(0);
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded shadow-lg mt-12">
          <h2 className="text-2xl font-bold mb-4">Post an Availability</h2>
          <form onSubmit={handleSubmit} className="container">
            <div className="mb-4">
              <label htmlFor="foodType" className="block mb-2 text-gray-800">
                Food Type
              </label>
              <input
                type="text"
                id="foodType"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={foodType}
                placeholder="Enter Food Type"
                onChange={(e) => setFoodType(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2 text-gray-800">
                Quantity / kg
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="expiryTime" className="block mb-2 text-gray-800">
                Prepared Time
              </label>
              <input
                type="datetime-local"
                id="expiryTime"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={preparedTimeT}
                onChange={(e) => setPreparedTimet(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="expiryTime" className="block mb-2 text-gray-800">
                Expiry Time
              </label>
              <input
                type="datetime-local"
                id="expiryTime"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={expiryTimeT}
                onChange={(e) => setExpiryTimeT(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-gray-800">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={address}
                placeholder="Enter pickup address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-gray-800">
                Description
              </label>
              <input
                type="text"
                id="description"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={description}
                placeholder="Give some description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <div className="mb-4">
						<label
						htmlFor="picturePath"
						className="block mb-2 text-gray-800"
						>
						Picture Path
						</label>
						<input
						type="text"
						id="picturePath"
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
						value={picturePath}
						onChange={(e) => setPicturePath(e.target.value)}
						/>
					</div> */}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityForm;
