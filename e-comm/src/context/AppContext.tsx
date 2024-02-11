import React, { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const AppContext = createContext<any>(null);

// Create the context provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);

  function saveUserData() {
    let encodeToken: any = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodeToken);
    setUserData(decodedToken);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    return router.push("/login");
  }

  const handleLogoClick = () => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      // Check if the token exists to determine if the user is logged in
      if (token !== null) {
        router.push("/"); // Replace '/home' with the route you want to navigate to
      } else {
        // If the user is not logged in, handle this scenario (e.g., show a login dialog)
        // For example:
        // alert("Please log in to access this feature."); // Show an alert asking the user to log in
        // // Alternatively, you can display a login dialog/modal or redirect to the login page
        toast.error("Please login to access this feature.");
      }
    } else {
      // Handle the scenario where localStorage is not available
      console.error("localStorage is not available in this environment.");
    }
  };

  const handleAutoNavigate = () => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      // Retrieve userToken from localStorage or any other storage mechanism
      const userToken = localStorage.getItem("userToken");

      // Check if userToken exists
      if (!userToken) {
        // Redirect to the home page if userToken doesn't exist
        router.push("/login");
        toast.error("please Login to use all features");
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        saveUserData,
        logOut,
        handleLogoClick,
        handleAutoNavigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
