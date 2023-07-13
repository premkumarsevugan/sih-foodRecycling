import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navBar";
import ContactFooter from "../utils/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
	const isAuth = useContext(AuthContext);
	const [userData, setuserData] = useState(null);

	const fetchDocument = async () => {
		if (isAuth && !userData) {
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

	return (
		<div className="">
			<Navbar />
			{!userData && <LoadingText />}
			{userData && <ResponsiveComponent userData={userData} />}
			<div className="w-full">
				<ContactFooter />
			</div>
		</div>
	);
};

const LoadingText = () => {
	return (
		<div className=" p-16 text-center text-2xl text-black">
			<p className="text-2xl">Loading...</p>
		</div>
	);
};

const ResponsiveComponent = ({ userData }) => {
	const navigate = useNavigate();

	const handleCus = () => {
		navigate("/request");
	};

	const handlePro = () => {
		navigate("/availability");
	};

	const handleDash = () => {
		navigate("/dashboardScreen");
	};

	return (
		<div className="flex flex-wrap items-center px-4 h-120">
			<div className="w-full md:w-1/3 p-8 ml-">
				<h1 className="text-transparent font-bold ml-2">
					<span className="text-black text-8xl">We help</span> <br />
					<span className="text-orange-500 text-8xl">Save Food</span>
				</h1>
				<p className="text-sm mt-4">
				FoodSaver is dedicated to reducing food waste and ensuring that no one goes hungry. We believe that every bit of food can make a difference, and our mission is to connect surplus food with organizations and individuals who need it the most.
				</p>
			</div>

			<div className="w-full flex-col items-center md:w-2/3 p-4 mt-12">
				<div className="">
					{userData["userType"] === "Customers" && (
						<div className="container flex items-center justify-evenly">
							<div className="flex flex-col items-center">
								<h1 className="text-transparent font-bold ml-2 mb-4">
									<span className="text-black text-4xl">
										Post a Request
									</span>
								</h1>
								<button
									className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mb-12"
									onClick={handleCus}
								>
									Customers
								</button>
							</div>
							<div className="flex flex-col items-center">
								<h1 className="text-transparent font-bold ml-2 mb-4">
									<span className="text-black text-4xl">
										Go to DashBoard
									</span>
								</h1>
								<button
									className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mb-12"
									onClick={handleDash}
								>
									Dashboard
								</button>
							</div>
						</div>
					)}

					{userData["userType"] === "Providers" && (
						<div className="container flex flex-wrap items-center justify-evenly">
							<div className="flex flex-col items-center">
								<h1 className="text-transparent font-bold ml-2 mb-4">
									<span className="text-black text-xl">
										Post an Availability
									</span>
								</h1>
								<button
									className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded mb-12"
									onClick={handlePro}
								>
									Providers
								</button>
							</div>
							<div className="flex flex-col items-center">
								<h1 className="text-transparent font-bold ml-2 mb-4">
									<span className="text-black text-xl">
										Go to DashBoard
									</span>
								</h1>
								<button
									className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded mb-12"
									onClick={handleDash}
								>
									Dashboard
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
