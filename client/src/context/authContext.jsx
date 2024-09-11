import { useState, useEffect, createContext } from "react";
import axios from "axios";  // Ensure axios is imported

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true  // This allows cookies to be sent/received
        });
        setCurrentUser(res.data)
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8800/api/auth/logout", {}, {
                withCredentials: true  // Ensure cookies are sent
            });
            setCurrentUser(null);
            // You can use a navigation system (e.g., React Router) instead of reloading the page
            // navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
            // Handle the error or notify the user
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
    </AuthContext.Provider>
    );

};