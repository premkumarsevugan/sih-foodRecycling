import React, { useState, useContext, useEffect, useNavigate } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import {
	doc,
	collection,
	setDoc,
	getDocs,
	getDoc,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../utils/AuthContext";

const PortalScreen = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Navbar />
			{/* <ResponsiveComponent/>
			<ResponsiveComponentProvider />
			<ResponsiveComponentCustomer /> */}
			{/* <div className="mt-11">
				<ContactFooter />
			</div> */}
		</div>
	);
};

const ResponsiveComponentProvider = () => {
	return (
		<div className="container">
			<TableComponentProvider />
		</div>
	);
};

const ResponsiveComponentCustomer = () => {
	return (
		<div className="container">
			<TableComponentCustomer />
		</div>
	);
};

const TableComponentProvider = () => {
	const isAuth = useContext(AuthContext);
	const [userData, setuserData] = useState(null);
	const [location, setLocation] = useState("");
	const [document, setDocuments] = useState([]);
	const [searchQuery, setSearchQuery] = useState(location);

	const fetchUserDocument = async () => {
		if (isAuth && !userData) {
			console.log("portal-auth");
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
		if (userData) {
			setLocation(userData["location"]);
			// console.log(location);
		}
	});

	const fetchDocument = async () => {
		console.log(1);
		console.log(location);
		// if(location) {
		try {
			const q = query(
				collection(db, "requests"),
				where("location", "==", location)
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
		// }
	};

	useEffect(() => {
		fetchDocument();
		// console.log(userData);
	}, [location]);

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		setLocation(searchQuery);
		// fetchDocument();
	};

	return (
		<div className="container p-12">
			<div className=" flex items-center justify-evenly text-center mt- 4 mb-8">
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
			</div>

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
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Location
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Address
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Description
						</th>
						{/* <th className="px-6 py-3 bg-gray-100 border-b text-center">
							Accepted
						</th> */}
					</tr>
				</thead>
				<tbody>
					{document.length !== 0 &&
						document.map((item, index) => (
							<tr key={index}>
								<td className="px-6 py-4 border-b text-left">
									{item.orgName}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{item.people}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{item.deadline
										.toString()
										.replace("T", " / ")}
								</td>
								{/* <td className="px-6 py-4 border-b text-left">{item.email}</td> */}
								<td className="px-6 py-4 border-b text-left">
									{item.location}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.address}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.description}
								</td>
								{/* <td className="px-6 py-4 border-b text-center">
									{item.accepted === false ? (
										<button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
											Accept
										</button>
									) : (
										item.accepted.toString()
									)}
								</td> */}
							</tr>
						))}
				</tbody>
			</table>
			{document.length === 0 && (
				<div className=" flex items-center justify-center p-8">
					<h2 className="text-2xl">No data</h2>
				</div>
			)}
		</div>
	);
};

const TableComponentCustomer = () => {
	const isAuth = useContext(AuthContext);
	const [userData, setuserData] = useState(null);
	const [location, setLocation] = useState("");
	const [document, setDocuments] = useState([]);

	const fetchUserDocument = async () => {
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

	useEffect(() => {
		// helper();
		fetchUserDocument();
		if (userData) {
			setLocation(userData["location"]);
			// console.log(location);
		}
	});

	const fetchDocument = async () => {
		console.log(2);
		console.log(location);
		// if(location) {
		try {
			const q = query(
				collection(db, "availability"),
				where("location", "==", location)
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
		// }
	};

	useEffect(() => {
		fetchDocument();
		// console.log(userData);
	}, [location]);

	const [searchQuery, setSearchQuery] = useState(location);

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		setLocation(searchQuery);
		// fetchDocument();
	};

	return (
		<div className="container p-12">
			<div className="flex items-center justify-evenly text-center mt- 4 mb-8">
				<h1 className="text-transparent font-bold ml-2">
					<span className="text-black text-4xl">Available </span>
					<span className="text-orange-500 text-4xl"> Food</span>
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
			</div>

			<table className="min-w-full bg-white border border-gray-300 p-6">
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
							Prepared Time / Purchased Time
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Expiry Time
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Address
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-left">
							Description
						</th>
						<th className="px-6 py-3 bg-gray-100 border-b text-center">
							Accepted
						</th>
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
					{document.length !== 0 &&
						document.map((item, index) => (
							<tr key={index}>
								<td className="px-6 py-4 border-b text-left">
									{item.orgName}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.foodType}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.quantity}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.preparedTime
										.toString()
										.replace("T", " / ")}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.expiryTime
										.toString()
										.replace("T", " / ")}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.address}
								</td>
								<td className="px-6 py-4 border-b text-left">
									{item.description}
								</td>
								<td className="px-6 py-4 border-b text-center">
									{item.accepted === false ? (
										<button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
											Accept
										</button>
									) : (
										item.accepted.toString()
									)}
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
			{document.length === 0 && (
				<div className=" flex items-center justify-center p-8">
					<h2 className="text-2xl">No data</h2>
				</div>
			)}
		</div>
	);
};

const ResponsiveComponent = () => {
	const navigate = useNavigate();

	const handleCus = () => {
		navigate("/portal/request");
	};

	const handlePro = () => {
		navigate("/portal/availability");
	};

	return (
		<div className="flex flex-wrap items-center px-4 h-120">
			<div className="w-full md:w-1/3 p-8 ml-">
				<h1 className="text-transparent font-bold ml-2">
					<span className="text-black text-8xl">We help</span> <br />
					<span className="text-orange-500 text-8xl">Save Food</span>
				</h1>
				<p className="text-sm mt-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					eleifend pretium turpis, ac tincidunt ex condimentum id.
					Fusce eleifend suscipit ante, eu iaculis nisl eleifend at.
				</p>
			</div>

			<div className="w-full md:w-2/3 p-4 flex flex-col items-center mt-12">
				<h1 className="text-transparent font-bold ml-2 mb-4">
					<span className="text-black text-4xl">Post a Request</span>
				</h1>
				<button
					className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mb-12"
					onClick={handleCus}
				>
					Customers
				</button>
				<h1 className="text-transparent font-bold ml-2 mb-4">
					<span className="text-black text-4xl">
						Post an Availability
					</span>
				</h1>
				<button
					className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded mb-12"
					onClick={handlePro}
				>
					Providers
				</button>
				{/* <h1 className="text-transparent font-bold ml-2 mb-4">
					<span className="text-black text-4xl">
						View Requests and Availabilities
					</span>
				</h1>
				<button
					className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
					onClick={handlePortal}
				>
					Portal
				</button> */}
			</div>
		</div>
	);
};

export default PortalScreen;
