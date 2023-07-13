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
	const [overlay,setOverlay] = useState(false);

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
	const toggleOverlay = () =>{
		setOverlay(!overlay);
	}

	const handleLogout = async () => {
		try {
			await auth.signOut();
			navigate("/");

		} catch (error) {
			console.log("Error logging out:", error);
		}
	};

	return (
		<nav className="flex items-center justify-between bg-white p-4 shadow-sm relative">
			<div className="flex items-center ">
				<img
					src={logo}
					alt="Logo"
					className="h-12 w-12 "
				/>
				<span className="ml-0 md:ml-2 text-3xl font-bold transform transition scale-75 md:scale-100 ">
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
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
					>
						Log In
					</Link>
					<Link
						to="/signup"
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
					>
						Sign Up
					</Link>
				</div>
			)}

			{isAuth && userData && (
				<div className="sm:flex items-center ">
					<div className="hidden sm:flex items-center">
						<Link
							to="/"
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
						>
							Home
						</Link>

						<Link
							to="/portal"
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
						>
							Portal
						</Link>

						<Link
							to="/dashboard"
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
						>
							Dashboard
						</Link>

						<PopupMenu className="">
							<button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150">
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
					<button onClick={toggleOverlay}  className="px-4 py-2 bg-orange-500 rounded-md text-white sm:hidden shadow-md">
					<svg style={{ fill: 'white' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
					</button>
					{overlay && (
						<div className="bg-white absolute top-0 left-0 w-full h-screen z-30 ">
							<div className="flex w-full justify-end mt-3">
								<button onClick={toggleOverlay} className="px-4 mr-3 py-2 bg-orange-500 rounded-md text-white ">
								<svg style={{ fill: 'white' }}  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
								</button>
							</div>
							<div className=" space-y-10 flex flex-col items-center mt-20">
						<Link
							to="/"
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
							onClick={toggleOverlay}
						>
							Home
						</Link>

						<Link
							to="/portal"
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
							onClick={toggleOverlay}
						>
							Portal
						</Link>

						<Link
							to="/dashboard"
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150"
							onClick={toggleOverlay}
						>
							Dashboard
						</Link>

						<PopupMenu className="">
							<button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-8 border-2 border-none transition transform hover:scale-105 duration-150">
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
						</div>
							
					)}
				</div>
				
			)}
		</nav>
	);
};


export default Navbar;
