import React, { useState, useContext, useEffect } from "react";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { AuthContext } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
// import { v4 } from "uuid";

const ResponsiveComponentCustomer = () => {
  const isAuth = useContext(AuthContext);
  const [userData, setuserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [screen, setScreen] = useState(0);

  const fetchUserDocument = async () => {
    if (isAuth && !userData) {
      // console.log("portal-auth");
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
    if (!userData) {
      fetchUserDocument();
    }
    // if (userData) {
    // 	setLocation(userData["location"]);
    // 	setUserType(userData["userType"]);
    // 	// console.log(userType);
    // }
  });

  const handleInputChange = (e) => {
    // setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // setLocation(searchQuery);
    // fetchDocument();
  };

  const allrequests = () => {
    setScreen(0);
  };

  const myRequests = () => {
    setScreen(1);
  };
  return (
    <div className="p-12">
      <div className=" flex flex-wrap gap-3 items-center justify-evenly text-center mt- 4 mb-8">
        {/* <BackButton/> */}
        <h1 className="text-transparent font-bold ml-2">
          <span className="text-black text-4xl">Available </span>
          <span className="text-orange-500 text-4xl"> Availabilities</span>
        </h1>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-r"
          >
            Search
          </button>
        </div>
        {userData && userData["userType"] === "Providers" && (
          <div className="flex gap-3 flex-wrap justify-center  items-center mt-10">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-3 rounded-md "
              onClick={allrequests}
            >
              All Availabilities
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-3 rounded-md ml-4"
              onClick={myRequests}
            >
              My Uploads
            </button>
          </div>
        )}
      </div>

      {screen === 0 && userData && (
        <TableComponentCustomerAll userData={userData} />
      )}
      {screen === 1 && <TableComponentCustomerUser userData={userData} />}
    </div>
  );
};

const TableComponentCustomerUser = ({ userData }) => {
  const [document, setDocuments] = useState(null);
  const navigate = useNavigate();
  const fetchDocument = async () => {
    // console.log(2);
    // console.log(location);
    if (!document) {
      try {
        const now = Timestamp.now();
        // const oneHourFromNow = new Timestamp(
        // 	now.seconds + 3600,
        // 	now.nanoseconds
        // );
        // console.log(2);

        const q = query(
          collection(db, "availability"),
          where("email", "==", userData.email),
          where("accepted", "==", false),
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
  };

  useEffect(() => {
    // console.log(1);
    if (!document) {
      fetchDocument();
    }
    // console.log(userData);
  });

  const deleteRequest = async (uid) => {
    // console.log(uid);
    if (window.confirm("Are you sure you want to Delete this Request?")) {
      try {
        const q = query(
          collection(db, "availability"),
          where("uid", "==", uid)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          alert("Error! Confirmation not sent. Data not found.");
        } else {
          querySnapshot.forEach((doc) => {
            const transactionRef = doc.ref;
            updateDoc(transactionRef, { accepted: true })
              .then(() => {
                alert("Upload Deleted!");
                navigate("/portal");
                // window.location.reload();
                // location.reload();
              })
              .catch((error) => {
                console.log("Error updating document:", error);
                alert("Error! Could not delete.");
              });
          });
        }
      } catch (error) {
        console.log("Error fetching document from Firebase:", error);
        alert("Error! Confirmation not send");
      }
    }
  };

  return (
    <div className="">
      <table className="hidden md:block min-w-full bg-white border-gray-300 p-6">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Organization Name
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Food Type
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Quantity
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Prepared Time
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Expiry Time
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Address
            </th>
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
							Contact Number
						</th> */}
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Description
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-center"></th>
            {/* {userType === "Customers" && (
						)} */}
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
						Email
					</th> */}
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
						Location
					</th> */}
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
							Picture Path
						</th> */}
          </tr>
        </thead>
        <tbody>
          {document &&
            document.length !== 0 &&
            document.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b text-left">
                  {item.orgName} <br />
                  {item.phoneNumber}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {item.foodType}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {moment(item.preparedTime.toDate()).format("MMMM Do YYYY")}
                  <br />
                  {moment(item.preparedTime.toDate()).format("h:mm a")}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {moment(item.expiryTime.toDate()).format("MMMM Do YYYY")}
                  <br />
                  {moment(item.expiryTime.toDate()).format("h:mm a")}
                </td>
                <td className="px-6 py-4 border-b text-left">{item.address}</td>
                {/* <td className="px-6 py-4 border-b text-left">
									{item.phoneNumber}
								</td> */}
                <td className="px-6 py-4 border-b text-left">
                  {item.description}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteRequest(item.uid)}
                  >
                    Delete
                  </button>
                </td>
                {/* <td className="px-6 py-4 border-b text-left">
								{item.email}
							</td> */}
                {/* <td className="px-6 py-4 border-b text-left">
								{item.location}
							</td> */}
                {/* <td className="px-6 py-4 border-b text-left">
								{item.picturePath}
							</td> */}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="md:hidden pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6] w-full">
        <div class="">
          <div class="flex max-w-2xl mx-auto flex-wrap">
            {document &&
              document.length !== 0 &&
              document.map((item, index) => (
                <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                  <div class="bg-white rounded-lg overflow-hidden mb-10">

                    <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-left">

                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Organization Name :</strong> <br /> &nbsp; &nbsp; {item.orgName}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Contact Number : </strong><br /> &nbsp; &nbsp; {item.phoneNumber}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Food Type :</strong> <br /> &nbsp; &nbsp;  {item.foodType}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Quantity :</strong> <br /> &nbsp; &nbsp; {item.quantity}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Prepared Time : </strong><br /> &nbsp; &nbsp;    {moment(item.preparedTime.toDate()).format("MMMM Do YYYY h:mm a")}
                      </h1><h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                         <strong>Expiry Time : </strong><br /> &nbsp; &nbsp;   {moment(item.expiryTime.toDate()).format("MMMM Do YYYY h:mm a")}
                      </h1><h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Address :</strong><br /> &nbsp; &nbsp;  {item.address}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Description :</strong><br /> &nbsp; &nbsp; {item.description}
                      </h1>

                      <div className="w-full flex justify-center items-center">
                      <button
                        class="
                     inline-block
                     py-2
                     px-7
                     bg-red-500
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-white
                     font-medium
                     hover:border-primary hover:bg-primary hover:bg-red-700
                     transition
                     mt-3
                     "
                     onClick={() => deleteRequest(item.uid)}
                      >
                        Delete
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
      {document && document.length === 0 && (
        <div className=" flex items-center justify-center p-8">
          <h2 className="text-2xl">No data</h2>
        </div>
      )}
    </div>
  );
};

const TableComponentCustomerAll = ({ userData }) => {
  const navigate = useNavigate();
  const userType = userData.userType;
  const [document, setDocuments] = useState(null);
  // const [location, setLocation] = useState(userData.location);

  const fetchDocument = async () => {
    // console.log(2);
    // console.log(location);
    if (!document) {
      try {
        const now = Timestamp.now();
        const q = query(
          collection(db, "availability"),
          where("accepted", "==", false),
          where("location", "==", userData["location"]),
          where("expiryTime", ">", now)
        );
        const querySnapshot = await getDocs(q);
        const documentsData = querySnapshot.docs.map((doc) => doc.data());
        setDocuments(documentsData);
        // console.log(documentsData);
        // console.log(data);
        // data = setDocuments;
      } catch (error) {
        console.log("Error fetching document from Firebase:", error);
      }
    }
  };

  useEffect(() => {
    // console.log(1);
    if (!document) {
      fetchDocument();
    }
    // console.log(userData);
  });

  // const [searchQuery, setSearchQuery] = useState(location);

  const accept = async (item) => {
    console.log(item);
    console.log(userData);
    if (window.confirm("Do you wish to send request?")) {
      // const uniqueId = v4();
      const transaction = {
        uid: item["uid"],
        provider: item["email"],
        customer: userData["email"],
        pickUp: item["address"],
        providerOrgName: item["orgName"],
        expiryTime: item["expiryTime"],
        confirmed: "pending",
        customerContact: userData["phoneNumber"],
        providerContact: item["phoneNumber"],
        cusOrgName: userData["orgName"],
        quantity: item["quantity"],
        foodType: item["foodType"],
        providerCoordinates: item["coordinates"],
        customerCoordinates: userData["coordinates"],
      };

      if (userData) {
        try {
          // const uniqueId = v4();
          const userCollection = collection(db, "transactions");
          await setDoc(doc(userCollection, item["uid"]), transaction);

          const q = query(
            collection(db, "availability"),
            where("uid", "==", item["uid"])
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            alert("Error! Confirmation not sent. Data not found.");
          } else {
            querySnapshot.forEach((doc) => {
              const transactionRef = doc.ref;
              updateDoc(transactionRef, {
                accepted: true,
              })
                .then(() => {
                  alert("Request sent!");
                  navigate("/portal");
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
          alert("Request not send!");
        }
      }
    }
  };

  return (
    <div className=" w-full ">
      <table className="hidden md:block min-w-full bg-whitemx-auto p-6">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Organization Name
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Food Type
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Quantity
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Prepared Time
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Expiry Time
            </th>
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Address
            </th>
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
							Contact Number
						</th> */}
            <th className="px-6 py-3 bg-gray-100 border-b text-left">
              Description
            </th>
            {userType === "Customers" && (
              <th className="px-6 py-3 bg-gray-100 border-b text-center"></th>
            )}
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
						Email
					</th> */}
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
						Location
					</th> */}
            {/* <th className="px-6 py-3 bg-gray-100 border-b text-left">
							Picture Path
						</th> */}
          </tr>
        </thead>
        <tbody>
          {document &&
            document.length !== 0 &&
            document.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b text-left">
                  {item.orgName} <br />
                  {item.phoneNumber}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {item.foodType}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {moment(item.preparedTime.toDate()).format("MMMM Do YYYY")}
                  <br />
                  {moment(item.preparedTime.toDate()).format("h:mm a")}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {moment(item.expiryTime.toDate()).format("MMMM Do YYYY")}
                  <br />
                  {moment(item.expiryTime.toDate()).format("h:mm a")}
                </td>
                <td className="px-6 py-4 border-b text-left">{item.address}</td>
                {/* <td className="px-6 py-4 border-b text-left">
									{item.phoneNumber}
								</td> */}
                <td className="px-6 py-4 border-b text-left">
                  {item.description}
                </td>
                {userType === "Customers" && (
                  <td className="px-6 py-4 border-b text-center">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                      onClick={() => {
                        accept(item);
                      }}
                    >
                      Request
                    </button>
                  </td>
                )}
                {/* <td className="px-6 py-4 border-b text-left">
								{item.email}
							</td> */}
                {/* <td className="px-6 py-4 border-b text-left">
								{item.location}
							</td> */}
                {/* <td className="px-6 py-4 border-b text-left">
								{item.picturePath}
							</td> */}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="md:hidden pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6] w-full">
        <div class="">
          <div class="flex max-w-2xl mx-auto flex-wrap">
            {document &&
              document.length !== 0 &&
              document.map((item, index) => (
                <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                  <div class="bg-white rounded-lg overflow-hidden mb-10">

                    <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-left">

                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Organization Name :</strong> <br /> &nbsp; &nbsp; {item.orgName}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Contact Number : </strong><br /> &nbsp; &nbsp; {item.phoneNumber}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Food Type :</strong> <br /> &nbsp; &nbsp;  {item.foodType}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Quantity :</strong> <br /> &nbsp; &nbsp; {item.quantity}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Prepared Time : </strong><br /> &nbsp; &nbsp;    {moment(item.preparedTime.toDate()).format("MMMM Do YYYY h:mm a")}
                      </h1><h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                         <strong>Expiry Time : </strong><br /> &nbsp; &nbsp;   {moment(item.expiryTime.toDate()).format("MMMM Do YYYY h:mm a")}
                      </h1><h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Address :</strong><br /> &nbsp; &nbsp;  {item.address}
                      </h1>
                      <h1
                        class="
                        font-semibold
                        text-dark text-sm
                        sm:text-md
                        md:text-md
                        lg:text-md
                        xl:text-md
                        2xl:text-md
                        mb-4
                        block
                        hover:text-primary"
                      >
                        <strong>Description :</strong><br /> &nbsp; &nbsp; {item.description}
                      </h1>

                      <div className="w-full flex justify-center items-center">
                      {/* <button
                        class="
                     inline-block
                     py-2
                     px-7
                     bg-orange-500
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-white
                     font-medium
                     hover:border-primary hover:bg-primary hover:bg-orange-700
                     transition
                     mt-3
                     "
                      >
                        View Details
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
      {document && document.length === 0 && (
        <div className=" flex items-center justify-center p-8">
          <h2 className="text-2xl">No data</h2>
        </div>
      )}
    </div>
  );
};

export default ResponsiveComponentCustomer;
