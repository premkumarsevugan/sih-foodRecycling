import React, { useState, useContext, useEffect } from "react";
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { AuthContext } from "../utils/AuthContext";
// import { useNavigate } from "react-router-dom";

const Requests = () => {
  const isAuth = useContext(AuthContext);
  // const navigate = useNavigate();
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
          where("provider", "==", userData["email"]),
          where("expiryTime", "<", now)
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

  const confirm = async (transaction) => {
    // console.log("C");
    // console.log(transaction);

    try {
      const q = query(
        collection(db, "transactions"),
        where("uid", "==", transaction["uid"])
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert("Error! Confirmation not sent. Data not found.");
      } else {
        querySnapshot.forEach((doc) => {
          const transactionRef = doc.ref;
          updateDoc(transactionRef, { confirmed: "confirmed" })
            .then(() => {
              alert("Request Confirmed!");
              window.location.reload();
              // navigate("/dashboardscreen");
              // location.reload();
            })
            .catch((error) => {
              console.log("Error updating document:", error);
              alert("Error! Confirmation not sent.");
            });
        });
      }
    } catch (error) {
      console.log("Error fetching document from Firebase:", error);
      alert("Error! Confirmation not send");
    }
  };

  const reject = async (transaction) => {
    if (transaction["confirmed"] !== "rejected") {
      try {
        const q = query(
          collection(db, "transactions"),
          where("uid", "==", transaction["uid"])
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          alert("Error! Confirmation not sent. Data not found.");
        } else {
          querySnapshot.forEach((doc) => {
            const transactionRef = doc.ref;
            updateDoc(transactionRef, { confirmed: "rejected" })
              .then(() => {
                alert("Request rejected!");
                window.location.reload();
                // navigate("/dashboardscreen");
                // location.reload();
              })
              .catch((error) => {
                console.log("Error updating document:", error);
                alert("Error! Confirmation not sent.");
              });
          });
        }
      } catch (error) {
        console.log("Error fetching document from Firebase:", error);
        alert("Error! Confirmation not send");
      }
    } else {
      alert("Already rejected!");
    }
  };

  return (
    <div>
      <h1 className="text-transparent font-bold ml-2 text-center mb-6">
        <span className="text-black text-2xl"> History </span>
        {/* <span className="text-orange-500 text-4xl"> Food </span> */}
      </h1>
      {document.length === 0 && (
        <div className="text-lg text-center">No History Available</div>
      )}

      {document.length !== 0 && (
        <div className="container flex justify-center">
          <table className=" divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Organization Name
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
                  customerContact
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
                  FoodType
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Confirm
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Reject
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {document.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.cusOrgName}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
								{booking.customer}
							</td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.customerContact} <br />
                    {booking.customer}
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
                    {booking.foodType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`rounded px-4 py-2 ${
                        booking.confirmed === "pending" ||
                        booking.confirmed === "rejected"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      } text-white`}
                      onClick={() => {
                        confirm(booking);
                      }}
                    >
                      {booking.confirmed === "pending" ||
                      booking.confirmed === "rejected"
                        ? "Confirm"
                        : "Confirmed"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`rounded px-4 py-2 ${
                        booking.confirmed === "pending" ||
                        booking.confirmed === "confirmed"
                          ? "bg-red-600"
                          : "bg-orange-500"
                      } text-white`}
                      onClick={() => {
                        reject(booking);
                      }}
                    >
                      {booking.confirmed === "rejected" ? "Rejected" : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Requests;
