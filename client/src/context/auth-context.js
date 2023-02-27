import {createContext, useMemo, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', null);
    const [user, setUser] = useLocalStorage('user', null);

    const login = (token, user) => {
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const getUser = () => {
        return window.localStorage.getItem('user');
    };
    const isAuthenticated = () => {
        return token !== null; 
    };

    const value = useMemo(() => {
        return { token, user , login, logout,
            getUser, setUser,  isAuthenticated };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}