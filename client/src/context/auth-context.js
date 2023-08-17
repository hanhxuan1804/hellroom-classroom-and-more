// this file no longer used
import {createContext, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/slice/authSlice';
import {authS} from '../redux/selector';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const auth = useSelector(authS);

    const login = (data) => {
        dispatch(loginSuccess(data));
    };

    const logout = () => {
        dispatch(logout());
    };

    const getUser = () => {
        return auth.user;
    };
    const isAuthenticated = () => {
        return auth.isAuthenticated;
    };

    const value = useMemo(() => {
        return { login, logout,
            getUser, isAuthenticated };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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