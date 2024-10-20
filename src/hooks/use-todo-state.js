import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodoFetch, readTodoFetch, updateTodoFetch } from '../api/api';

export const useTodoState = (initialId) => {
    const [id, setId] = useState(initialId || null);

    const [todo, setTodo] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [initialTodo, setInitialTodo] = useState(todo);

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== null) {
            readTodoFetch(id)
                .then((data) => {
                    setTodo(data);
                    setInitialTodo(data);
                    console.log('Загрузка данных выполнена', data);
                })
                .catch((error) => {
                    console.log('Ошибка загрузки данных', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id, navigate]);

    const resetTodo = () => {
        setTodo(initialTodo);
    };

    const deleteTodo = () => {
        setIsDeleting(true);

        deleteTodoFetch(id)
            .then((data) => {
                setTodo({});
                setId(null);
                console.log('Запись удалена, ответ сервера:', data);
            })
            .catch((error) => {
                console.log('Ошибка удаления записи', error);
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    const updateTodo = () => {
        setIsUpdating(true);

        updateTodoFetch(todo)
            .then((data) => {
                setTodo(data);
                console.log('Запись обновлена, ответ сервера:', data);
            })
            .catch((error) => {
                console.log('Ошибка обновления записи', error);
            })
            .finally(() => {
                setIsUpdating(false);
            });
    };

    return {
        todo,
        setTodo,
        deleteTodo,
        updateTodo,
        resetTodo,
        isLoading,
        isDeleting,
        isUpdating,
    };
};
