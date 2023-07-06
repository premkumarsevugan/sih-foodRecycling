import React, { useState, useContext, useEffect } from "react";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../utils/AuthContext";

const DataScreen = () => {
  const isAuth = useContext(AuthContext);
  const [userData, setuserData] = useState(null);
  const [document, setDocuments] = useState(null);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [pending, setPending] = useState(0);

  const fetchDocument = async () => {
    if (isAuth && !userData) {
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

  const fetchUserDocument = async () => {
    if (userData && !document) {
      try {
        const customerQuery = query(
          collection(db, "transactions"),
          where("customer", "==", userData["email"])
        );
        const providerQuery = query(
          collection(db, "transactions"),
          where("provider", "==", userData["email"])
        );

        const customerSnapshot = await getDocs(customerQuery);
        const providerSnapshot = await getDocs(providerQuery);

        const customerDocumentsData = customerSnapshot.docs.map((doc) =>
          doc.data()
        );
        const providerDocumentsData = providerSnapshot.docs.map((doc) =>
          doc.data()
        );

        const documentsData = customerDocumentsData.concat(
          providerDocumentsData
        );
        setDocuments(documentsData);

        // console.log(documentsData);

        let a = 0,
          b = 0,
          c = 0;

        documentsData.forEach((doc) => {
          if (doc.confirmed === "confirmed") {
            a++;
            // console.log(1);
          } else if (doc.confirmed === "rejected") {
            b++;
            // console.log(0);
          } else if (doc.confirmed === "pending") {
            c++;
            // console.log(3);
          }
        });

        setAccepted(a);
        setRejected(b);
        setPending(c);

        // console.log(accepted, rejected, pending);
      } catch (error) {
        console.log("Error fetching document from Firebase:", error);
      }
    }
  };

  useEffect(() => {
    fetchDocument();
    // console.log(userData);
    if (userData) {
      fetchUserDocument();
      // console.log(document);
    }
  });

  return (
    <div className="text-center px-8 py-8 mt-2">
      <div className="flex items-center justify-center mb-6">
        <h4 className="text-3xl font-bold mb-4 text-black mx-4">Your Data</h4>
      </div>
      <div className="flex justify-evenly space-x-4">
        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
          {/* <div className="text-6xl text-orange-500">
						<img
							src={delivery}
							alt="Logo"
							className="-18 w-18 ml-6"
						/>
					</div> */}
          <div className="text-xl font-bold mt-4 mb-4 text-orange-500">
            Pending requests
          </div>
          <p className="text-2xl font-bold text-black">{pending}</p>
        </div>
        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
          {/* <div className="text-6xl text-orange-500">
						<img src={app} alt="Logo" className="h-18 w-18 ml-8" />
					</div> */}
          <div className="text-xl font-bold mt-4 mb-4 text-orange-500">
            Accepted Requests
          </div>
          <p className="text-2xl font-bold text-black">{accepted}</p>
        </div>

        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
          <div className="text-xl font-bold mt-4 mb-4 text-orange-500">
            Rejected Request
          </div>
          <p className="text-2xl font-bold text-black">{rejected}</p>

          {/* <div className="text-6xl text-orange-500 mt-6 ml-10">
						<img src={food} alt="Logo" className="h-18 w-18" />
					</div> */}
        </div>
      </div>
    </div>
  );
};

export default DataScreen;
