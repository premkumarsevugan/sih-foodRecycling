import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import "./index.css";
import HomePage from "./screens/homepage";
import LoginScreen from "./screens/loginScreen";
import SignUpComponent from "./screens/signupScreen";
import AuthProvider from "./utils/AuthContext";
import PortalScreen from "./screens/portal";
import Dashboard from "./screens/Dashboard";
import AvailabilityForm from "./screens/AvailabilityForm";
import RequestForm from "./screens/RequestForm";
import AvailabilitiesCard from "./screens/AvailabilitiesCard";
import RequestCard from "./screens/RequestsCard";
import { AuthContext } from "./utils/AuthContext";
import DashBoardScreen from "./screens/DashBoardScreen";
import Navbar from "./screens/navBar";


function App() {
	const isAuth = useContext(AuthContext);
	if (isAuth === null) {
		return <div>Loading...</div>;
	}
	return (
		<div className="h-full w-full" style={{ width: "100%" }}>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route exact path="/login" element={<LoginScreen />} />
						<Route
							exact
							path="/signup"
							element={<SignUpComponent />}
							/>
						<Route
							exact
							path="/portal"
							element={<PortalScreen/>}
							/>
						<Route
							exact
							path="/availabilitycard"
							element={<AvailabilitiesCard />}
						/>
						<Route
							exact
							path="/requestcard"
							element={<RequestCard/>}
							/>
						<Route
							exact
							path="/request"
							element={<RequestForm />}
							/>
						<Route
							exact
							path="/availability"
							element={<AvailabilityForm />}
							/>
						<Route
							exact
							path="/dashboard"
							element={<Dashboard/>}
							/>
						<Route
							exact
							path="/dashboardScreen"
							element={<DashBoardScreen/>}
							/>
						
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
};

export default App;
