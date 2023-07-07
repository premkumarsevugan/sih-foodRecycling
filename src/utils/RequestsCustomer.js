import React, { useState, useContext, useEffect } from "react";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { AuthContext } from "../utils/AuthContext";
import PendRequests from "./PendRequests";

const RequestsCustomer = () => {
  return (
    <div className="">
      <div>
        <PendRequests />
      </div>
      <div>
        <DoneRequests />
      </div>
    </div>
  );
};

const DoneRequests = () => {
  const isAuth = useContext(AuthContext);
  const [userData, setuserData] = useState(null);
  const [document, setDocuments] = useState([]);

  const fetchUserDocument = async () => {
    if (isAuth && !userData) {
      // console.log(userData);
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
    // helper();
    fetchUserDocument();
    // console.log(document);
  });

  const fetchDocument = async () => {
    // console.log(2);
    // console.log(location);
    // if(location) {
    if (userData) {
      try {
        const now = Timestamp.now();
        // const oneHourFromNow = new Timestamp(
        // 	now.seconds + 3600,
        // 	now.nanoseconds
        // );

        const q = query(
          collection(db, "transactions"),
          where("customer", "==", userData["email"]),
          where("confirmed", "in", ["confirmed", "rejected"]),
          where("expiryTime", ">", now)
        );

        const querySnapshot = await getDocs(q);
        const documentsData = querySnapshot.docs.map((doc) => doc.data());
        setDocuments(documentsData);
        // console.log(document);
        // console.log(data);
        // data = setDocuments;
      } catch (error) {
        console.log("Error fetching document from Firebase:", error);
      }
    }
    // }
  };

  useEffect(() => {
    fetchDocument();
    // console.log(userData);
  }, [userData]);

  const goToLocation = (item) => {
    // console.log(item);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const sourceLat = position.coords.latitude;
          const sourceLng = position.coords.longitude;

          const destinationLat = item.providerCoordinates._lat;
          const destinationLng = item.providerCoordinates._long;

          // console.log(sourceLat, sourceLng, destinationLat, destinationLat);

          const url = `https://www.google.com/maps/dir/${sourceLat},${sourceLng}/${destinationLat},${destinationLng}`;
          alert("Use phone for accurate location tracking!");
          window.open(url, "_blank");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get location. Try again or try after some time.");
          return;
        }
      );
    } catch (e) {
      alert("Error! Could not get Location. Try after some time!");
    }
  };

  return (
    <div>
      <h1 className="text-transparent font-bold ml-2 text-center mt-6 mb-6">
        <span className="text-black text-2xl"> Processed Requests </span>
        {/* <span className="text-orange-500 text-4xl"> Food </span> */}
      </h1>
      <div className="flex justify-center">
        <table className=" divide-gray-200  ">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Organization Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                FoodType
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                quantity
              </th>
              {/* <th
							  scope="col"
							  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						  >
							  customer
						  </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ProviderContact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                DeadLine
              </th>
              {/* <th
							  scope="col"
							  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						  >
							  pickUp
						  </th> */}
              {/* <th
							  scope="col"
							  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						  >
							  provider
						  </th>
						  <th
							  scope="col"
							  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						  >
							  providerContact
					  </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              {/* <th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								></th> */}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {document.length !== 0 &&
              document.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.providerOrgName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.foodType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.quantity}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
								  {booking.customer}
							  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.providerContact} <br />
                    {booking.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(booking.expiryTime.toDate()).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                    {/* {booking.expiryTime} */}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
								  {booking.pickUp}
							  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap">
								  {booking.provider}
								  </td>
								  <td className="px-6 py-4 whitespace-nowrap">
								  {booking.providerContact}
							  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`rounded px-4 py-2 ${
                        booking.confirmed === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                      onClick={() => {
                        if (booking.confirmed === "confirmed") {
                          goToLocation(booking);
                        }
                      }}
                    >
                      {/* {booking.confirmed === "pending" ||
											  booking.confirmed === "rejected"
												  ? "Confirm"
												  : "Confirmed"} */}
                      {booking.confirmed === "confirmed" ? "Pick Up" : ""}
                      {booking.confirmed === "rejected" ? "Rejected" : ""}
                    </button>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
										<button
											className="rounded px-4 py-2 bg-red-500 text-white"
											onClick={() => {
												reject(booking);
											}}
										>
											Cancel
										</button>
									</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
          {document && document.length === 0 && (
            <div className=" text-xl text-center p-6 mt-6">No Data to Show</div>
          )}
    </div>
  );
};

export default RequestsCustomer;
