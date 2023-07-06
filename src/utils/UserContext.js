// import React, { createContext, useState, useContext, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import { doc, collection, setDoc , getDoc} from "firebase/firestore";
// import { db } from "../firebase";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
// 	const isAuth = useContext(AuthContext);
// 	const [userData, setUserData] = useState(null);

// 	const fetchDocument = async (isAuth) => {
// 		console.log(isAuth);
// 		while(!userData){
// 			if (isAuth) {
// 				const docRef = doc(db, "users", isAuth["providerData"][0].uid);
// 				const docSnapshot = await getDoc(docRef);
	
// 				if (docSnapshot.exists()) {
// 					setUserData(docSnapshot.data());
// 				} else {
// 					console.log("Document not found");
// 				}
// 				try {
// 				} catch (error) {
// 					console.log("Error fetching document from Firebase:", error);
// 				}
// 			}

// 		}
// 		console.log(userData);
// 	};

// 	useEffect(() => {
// 		fetchDocument();
// 		// console.log(userData);
// 	});


// 	return (
// 		<UserContext.Provider value={{ userData, fetchDocument }}>
// 			{children}
// 		</UserContext.Provider>
// 	);
// };

// export default UserProvider;