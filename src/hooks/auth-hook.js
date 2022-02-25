import {useState, useCallback, useEffect} from 'react';

let loginTimer;
const useAuth = () => {
    const [authToken, setAuthToken] = useState('');
    const [userId, setUserId] = useState('');

    const logOut = useCallback(() => {
        setAuthToken(null);
        setUserId('');
        localStorage.removeItem('userData');
        clearTimeout(loginTimer);
    }, []);

    const logIn = useCallback(
        (user) => {
            setAuthToken(user.authToken);
            setUserId(user.userId);
            const expirationTime = JSON.parse(localStorage.getItem('userData'))?.expirationTime || new Date().getTime() + 1000 * 60 * 60;
            localStorage.setItem('userData', JSON.stringify({userId: user.userId, authToken: user.authToken, expirationTime: new Date(expirationTime).toISOString()}));
            loginTimer = setTimeout(logOut, new Date(expirationTime).getTime() - new Date().getTime());
        },
        [logOut]
    );

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.authToken && new Date(userData.expirationTime).getTime() > new Date().getTime()) {
            logIn(userData);
        } else {
            logOut();
        }
    }, [logIn, logOut]);

    return {
        authToken,
        userId,
        logIn,
        logOut,
    };
};

export default useAuth;
