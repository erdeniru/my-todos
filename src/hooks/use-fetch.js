import { useCallback, useState, useEffect } from 'react';

export const useFetch = (url, options = {}, dependencies = []) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const callbackMemoized = useCallback(() => {
        setLoading(true);
        setError(undefined);
        setValue(undefined);

        fetch(url, { ...options })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось получить ответ от сервера');
                }
                return response.json();
            })
            .then((data) => {
                console.log('data:', data);
                setValue(data);
            })
            .catch((error) => {
                console.log('error:', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, dependencies);

    useEffect(() => {
        callbackMemoized();
    }, [callbackMemoized]);

    return { loading, error, value };
};
