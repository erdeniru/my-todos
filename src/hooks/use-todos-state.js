import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';
import { createTodoFetch, readTodosFetch, updateTodoFetch } from '../api/api';

export const useTodosState = () => {
    const [todos, setTodos] = useState([]);

    const [filter, setFilter] = useState('');
    const debounceFilter = useDebounce(filter, 500);

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [currentTodoId, setCurrentTodoId] = useState(null);

    useEffect(() => {
        let url_param = '';
        if (debounceFilter !== '') url_param = 'title_like=' + debounceFilter;

        readTodosFetch(url_param)
            .then((data) => {
                setTodos(data);
                console.log('Загрузка данных выполнена', data);
            })
            .catch((error) => {
                console.log('Ошибка загрузки данных', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debounceFilter]);

    const addTodo = (data) => {
        setIsCreating(true);

        createTodoFetch(data)
            .then((data) => {
                setTodos((prevTodos) => [...prevTodos, data]);
                console.log('Запись добавлена, ответ сервера:', data);
            })
            .catch((error) => {
                console.log('Ошибка добавления записи', error);
            })
            .finally(() => {
                setIsCreating(false);
            });
    };

    const updateCompletedTodo = (id, completed) => {
        setCurrentTodoId(id);
        setIsUpdating(true);

        updateTodoFetch({ id, completed })
            .then((data) => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === data.id ? { ...todo, completed: completed } : todo,
                    ),
                );
                console.log('Запись обновлена, ответ сервера:', data);
            })
            .catch((error) => {
                console.log('Ошибка обновления записи', error);
            })
            .finally(() => {
                setIsUpdating(false);
                setCurrentTodoId(null);
            });
    };

    return {
        todos,
        filter,
        setFilter,
        addTodo,
        updateCompletedTodo,
        isLoading,
        isCreating,
        isUpdating,
        currentTodoId,
    };
};
