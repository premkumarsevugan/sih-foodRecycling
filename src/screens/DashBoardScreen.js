import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import History from "../utils/History";
import Chart from "../utils/ChartComponent";
import DataScreen from "../utils/DataCard";
import { AuthContext } from "../utils/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Requests from "../utils/Requests";
import RequestsCustomer from "../utils/RequestsCustomer";

const DashBoardScreen = () => {
  return (
    <div className="">
      <Navbar />
      <Dashboard />
        <ContactFooter />
      {/* <div className="absolute bottom-0 left-0 w-full">
      </div> */}
    </div>
  );
};

const Dashboard = () => {
  const [screen, setScreen] = useState(0);
  const isAuth = useContext(AuthContext);
  const [userData, setuserData] = useState(null);
  // const [document, setDocuments] = useState([]);

  const fetchDocument = async () => {
    if (isAuth && !userData) {
      // console.log(123);
      try {
        // console.log("navbar");
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

  const requests = () => {
    setScreen(0);
  };

  const history = () => {
    setScreen(1);
  };

  const data = () => {
    setScreen(2);
  };

  const charts = () => {
    setScreen(3);
  };

  return (
    <div className="">
      {/* Side Menu Bar */}
      <div className="flex justify-center items-center p-4 ">
        {/* Menu items */}
        <ul className="flex justify-center p-4">
          {userData && (
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2.5 rounded m-4"
                onClick={requests}
              >
                Requests
              </button>
            </li>
          )}

          {/* {userData && (
						<li>
							<button
								className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2.5 rounded m-4"
								onClick={history}
							>
								History
							</button>
						</li>
					)} */}

          {userData && (
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded m-4"
                onClick={data}
              >
                Data
              </button>
            </li>
          )}
          {userData && (
            <li>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded m-4"
                onClick={charts}
              >
                Charts
              </button>
            </li>
          )}

          {/* ... Add more menu items */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="bg-white p-8">
        {screen === 0 && userData && userData["userType"] === "Providers" && (
          <Requests />
        )}
        {screen === 0 && userData && userData["userType"] === "Customers" && (
          <RequestsCustomer />
        )}
        {screen === 2 && userData && <DataScreen />}
        {screen === 3 && <Chart />}
      </div>
    </div>
  );
};

export default DashBoardScreen;
