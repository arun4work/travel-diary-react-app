import React, {createContext} from 'react';
import useAuth from '../../hooks/auth-hook';

const initialContext = {
    authToken: null,
    userId: '',
    isLogin: false,
    logIn: () => {},
    logOut: () => {},
};

const AuthContext = createContext(initialContext);

export const AuthContextProvider = (props) => {
    const {authToken, userId, logIn, logOut} = useAuth();

    const context = {
        authToken: authToken,
        userId: userId,
        logIn: logIn,
        logOut: logOut,
    };

    return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
