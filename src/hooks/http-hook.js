import {useCallback, useState, useEffect, useRef} from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const request = useCallback(async (url, method = 'GET', body, headers = {}) => {
        try {
            const abortController = new AbortController();
            activeHttpRequests.current.push(abortController);
            setIsLoading(true);
            const response = await fetch(url, {
                method,
                body: body,
                headers,
                signal: abortController.signal,
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }
            setIsLoading(false);
            return result;
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
        return null;
    }, []);

    const clearError = () => {
        setError(null);
    };

    //clean-up function which is returned from useEffect hook will be called before each useEffect call or during unmount of the component using this hook
    useEffect(() => {
        return () => {
            //abort all ongoing http request
            activeHttpRequests.current.forEach((abortController) => abortController.abort());
        };
    }, []);

    return {
        isLoading,
        error,
        request,
        clearError,
    };
};

export default useHttp;
