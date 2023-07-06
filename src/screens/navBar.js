import React, { useState, useEffect, useContext } from "react";
import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { PopupMenu } from "react-simple-widgets";
import { FaUser } from "react-icons/fa";

const Navbar = () => {

	const navigate = useNavigate();
	const isAuth = useContext(AuthContext);
	// console.log(isAuth['providerData'][0].uid);

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
				// navigate("/");
			}
		}
	};

	useEffect(() => {
		fetchDocument();
		// console.log(userData);
	});

	const handleLogout = async () => {
		try {
			await auth.signOut();
			navigate("/");

		} catch (error) {
			console.log("Error logging out:", error);
		}
	};

	return (
		<nav className="flex items-center justify-between bg-white p-4 shadow-sm">
			<div className="flex items-center ">
				<img
					src={logo}
					alt="Logo"
					className="md:h-12 md:w-12 sm:h-4 sm:w-4"
				/>
				<span className="ml-4 text-3xl font-bold ">
					<span className="text-orange-500">
						FOOD
					</span>
					<span className="text-black">
						SAVER
					</span>
				</span>
			</div>

			{!isAuth && (
				<div>
					<Link
						to="/login"
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-2 border-2 border-black"
					>
						Log In
					</Link>
					<Link
						to="/signup"
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded border-2 border-black"
					>
						Sign Up
					</Link>
				</div>
			)}

			{isAuth && userData && (
				<div className="flex items-center ">
					<Link
						to="/"
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-black"
					>
						Home
					</Link>

					<Link
						to="/portal"
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-black"
					>
						Portal
					</Link>

					<Link
						to="/dashboard"
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-black"
					>
						Dashboard
					</Link>

					<PopupMenu className="">
						<button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded border-2 border-black">
							<div className="flex ">
								<FaUser className="mr-2" />
								<small>Profile</small>
							</div>
						</button>

						<div className="bg-white rounded-sm ">
							<div className="card-body px-4 py-4 text-center">
								<div className="flex justify-center mb-4">
									<FaUser className="text-xl text-orange-500" />
								</div>

								<h5 className="mb-4 mt-2 text-black">
									{userData["name"]}
								</h5>
								<hr/>

								<p className="mb-4 mt-2">{userData["email"]}</p>
								<hr/>

								<p className="mb-4 mt-2">{userData["userType"]}</p>
								<hr/>

								<hr />
								<div className="d-grid mt-4">
									<button
										className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mr-2"
										onClick={handleLogout}
									>
										<small>Logout</small>
									</button>
								</div>
							</div>
						</div>
					</PopupMenu>
				</div>
			)}
		</nav>
	);
};


export default Navbar;
