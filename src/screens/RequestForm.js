import React, { useState, useContext, useEffect } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import { useNavigate } from "react-router-dom";
import { doc, collection, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../utils/AuthContext";
import { v4 as uuidv4 } from "uuid";

const RequestForm = () => {
  return (
    <div className="">
      <Navbar />
      <InputForm />
      <ContactFooter />
    </div>
  );
};

const InputForm = () => {
  const [description, setDescription] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [address, setAddress] = useState("");
  const [deadlineT, setDeadlineT] = useState("");
  const [people, setPeople] = useState(0);

  const isAuth = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setuserData] = useState(null);

  const fetchDocument = async () => {
    if (isAuth && !userData) {
      // console.log(1);
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
    if (window.confirm("Do you want to submit this Request?")) {
      e.preventDefault();

      const email = isAuth["providerData"][0].uid;
      const location = userData["location"];
      const phoneNumber = userData["phoneNumber"];
      const orgName = userData["orgName"];
      const deadline = Timestamp.fromDate(new Date(deadlineT));
      const coordinates = userData["coordinates"];
      const uid = uuidv4();

      const userDatapost = {
        description,
        accepted,
        address,
        deadline,
        orgName,
        people,
        email,
        location,
        phoneNumber,
        uid,
        coordinates,
      };

      if (isAuth) {
        try {
          const { v4: uuidv4 } = require("uuid");
          const uniqueId = uuidv4();

          const userCollection = collection(db, "requests");
          await setDoc(doc(userCollection, uniqueId), userDatapost);
          alert("Request send!");
          navigate("/portal");
        } catch (error) {
          console.log("Error fetching document from Firebase:", error);
        }
      }

      // Reset form fields
      setDescription("");
      setAccepted(false);
      setAddress("");
      setDeadlineT("");
      setPeople(0);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-center items-center p-16">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Post a Request</h2>
          <form onSubmit={handleSubmit} className="container">
            <div className="mb-4">
              <label htmlFor="people" className="block mb-2 text-gray-800">
                Number of People
              </label>
              <input
                type="number"
                id="people"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="deadline" className="block mb-2 text-gray-800">
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={deadlineT}
                onChange={(e) => setDeadlineT(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
