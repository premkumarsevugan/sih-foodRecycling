import React, { useState, useContext, useEffect } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
// import BackButton from "../utils/BackButton";
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
import { AuthContext } from "../utils/AuthContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RequestsCard = () => {
	return (
		<div className="">
			<Navbar />
			<ResponsiveComponentProvider />
			<div className="absolute bottom-0 left-0 w-full">
				<ContactFooter />
			</div>
		</div>
	);
};

const ResponsiveComponentProvider = () => {
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
			<div className=" flex items-center justify-evenly text-center mt- 4 mb-8">
				{/* <BackButton/> */}
				<h1 className="text-transparent font-bold ml-2">
					<span className="text-black text-4xl">Available </span>
					<span className="text-orange-500 text-4xl"> Requests</span>
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
				{userData && userData["userType"] === "Customers" && (
					<div className="">
						<button
							className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-3 rounded-md "
							onClick={allrequests}
						>
							All requests
						</button>
						<button
							className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-3 rounded-md ml-4"
							onClick={myRequests}
						>
							My Requests
						</button>
					</div>
				)}
			</div>

			{screen === 0 && userData && (
				<TableComponentProviderAll userData={userData} />
			)}
			{screen === 1 && <TableComponentProviderUser userData={userData} />}
		</div>
	);
};

const TableComponentProviderUser = ({ userData }) => {
	const [document, setDocuments] = useState(null);
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
					collection(db, "requests"),
					where("email", "==", userData.email),
					where("accepted", "==", false),
					where("deadline", ">", now)
				);
				const querySnapshot = await getDocs(q);
				const documentsData = querySnapshot.docs.map((doc) =>
					doc.data()
				);
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
					collection(db, "requests"),
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
								alert("Request Deleted!");
								window.location.reload();
								// navigate("/dashboardscreen");
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
			<table className="min-w-full bg-white border border-gray-300 p-6">
				<thead>
					<tr>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Organization Name
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-center">
							People
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-center">
							Deadline
						</th>
						{/* <th className="px-6 py-3 bg-gray-100 border-b text-left">Email</th> */}
						<th className="px-6 py-3  bg-gray-100 border-b text-center">
							Address
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Contact Number
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Description
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-center"></th>
					</tr>
				</thead>
				<tbody>
					{document &&
						document.length !== 0 &&
						document.map((item, index) => (
							<tr key={index}>
								<td className="px-6 py-4 border-b text-left">
									{item.orgName}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{item.people}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{moment(item.deadline.toDate()).format(
										"MMMM Do YYYY, h:mm a"
									)}
								</td>
								{/* <td className="px-6 py-4 border-b text-left">{item.email}</td> */}
								<td className="px-6 py-4 border-b text-left">
									{item.address}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.phoneNumber}
								</td>
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
								{/* {userType === "Providers" && (
									<td className="px-6 py-4 border-b text-left">
										<button
											className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
											// onClick={}
										>
											Help
										</button>
									</td>
								)} */}
								{/* <td className="px-6 py-4 border-b text-center">
									{item.accepted === false ? (
									) : (
										item.accepted.toString()
									)}
								</td> */}
							</tr>
						))}
				</tbody>
			</table>
			{document && document.length === 0 && (
				<div className=" flex items-center justify-center p-8">
					<h2 className="text-2xl">No data</h2>
				</div>
			)}
		</div>
	);
};

const TableComponentProviderAll = ({ userData }) => {
	// console.log(userData);
	const navigate = useNavigate();
	const userType = userData.userType;
	const [document, setDocuments] = useState(null);
	const [location, setLocation] = useState(userData.location);

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
					collection(db, "requests"),
					where("location", "==", location),
					where("accepted", "==", false),
					where("deadline", ">", now)
				);
				const querySnapshot = await getDocs(q);
				const documentsData = querySnapshot.docs.map((doc) =>
					doc.data()
				);
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

	const help = () => {
		navigate("/availability");
	};

	return (
		<div className="">
			<table className="min-w-full bg-white border border-gray-300 p-6">
				<thead>
					<tr>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Organization Name
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-center">
							People
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-center">
							Deadline
						</th>
						{/* <th className="px-6 py-3 bg-gray-100 border-b text-left">Email</th> */}
						<th className="px-6 py-3  bg-gray-100 border-b text-center">
							Address
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Contact Number
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Description
						</th>
						{userType === "Providers" && (
							<th className="px-6 py-3 bg-gray-100 border-b text-center"></th>
						)}
					</tr>
				</thead>
				<tbody>
					{document &&
						document.length !== 0 &&
						document.map((item, index) => (
							<tr key={index}>
								<td className="px-6 py-4 border-b text-left">
									{item.orgName}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{item.people}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{moment(item.deadline.toDate()).format(
										"MMMM Do YYYY, h:mm a"
									)}
								</td>
								{/* <td className="px-6 py-4 border-b text-left">{item.email}</td> */}
								<td className="px-6 py-4 border-b text-left">
									{item.address}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.phoneNumber}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.description}
								</td>
								{userType === "Providers" && (
									<td className="px-6 py-4 border-b text-left">
										<button
											className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
											onClick={help}
										>
											Help
										</button>
									</td>
								)}
								{/* <td className="px-6 py-4 border-b text-center">
									{item.accepted === false ? (
									) : (
										item.accepted.toString()
									)}
								</td> */}
							</tr>
						))}
				</tbody>
			</table>
			{document && document.length === 0 && (
				<div className=" flex items-center justify-center p-8">
					<h2 className="text-2xl">No data</h2>
				</div>
			)}
		</div>
	);
};

export default RequestsCard;
