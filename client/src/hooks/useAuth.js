import {createContext, useMemo, useContext } from 'react';
import useLocalStorage from './useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', null);

    const login = (token) => {
        window.localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        setToken(null);
    };

    const value = useMemo(() => {
        return { token, login, logout };
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
