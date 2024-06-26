import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, login, logout, signup } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    const handleLogin = async (username, password) => {
        const response = await login(username, password);
        setIsAuth(response.success);
        return response;
    };

    const handleSignup = async (username, email, firstName, lastName, password) => {
        const response = await signup(username, email, firstName, lastName, password);
        setIsAuth(response.success);
        return response;
    };

    const handleLogout = () => {
        logout();
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, handleLogin, handleSignup, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
