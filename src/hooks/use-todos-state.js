import { useState, useEffect } from 'react';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const useTodosState = (userId) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(TODOS_URL + `?userId=${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось получить ответ от сервера');
                }
                return response.json();
            })
            .then((data) => {
                setTodos(data);
                console.log('Загрузка данных выполнена', data);
            })
            .catch((error) => {
                console.log('Ошибка загрузки данных', error);
            });
    }, []);

    return { todos };
};
