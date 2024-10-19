import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TODOS_URL = 'http://localhost:3003/todos';

export const useTodoState = (initialId) => {
    const [id, setId] = useState(initialId || null);

    const [todo, setTodo] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    //FIXME: удалить фунцию resetTodo после реализации формы редактирования задания
    const [initialTodo, setInitialTodo] = useState(todo);

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== null) {
            fetch(TODOS_URL + '/' + id)
                .then((response) => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            navigate('/task-not-exist', { replace: true });
                            return;
                        }
                        throw new Error('Не удалось получить ответ от сервера');
                    }
                    return response.json();
                })
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

    const addTodo = (data) => {
        setIsCreating(true);

        fetch(TODOS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось получить ответ от сервера');
                }
                return response.json();
            })
            .then((data) => {
                setId(data.id);
                setTodo(data);
                console.log('Запись добавлена, ответ сервера:', data);
            })
            .catch((error) => {
                console.log('Ошибка добавления записи', error);
            })
            .finally(() => {
                setIsCreating(false);
            });
    };

    const deleteTodo = () => {
        setIsDeleting(true);

        fetch(TODOS_URL + '/' + id, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось получить ответ от сервера');
                }
                return response.json();
            })
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

        fetch(TODOS_URL + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(todo),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось получить ответ от сервера');
                }
                return response.json();
            })
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
        addTodo,
        deleteTodo,
        updateTodo,
        resetTodo,
        isLoading,
        isCreating,
        isDeleting,
        isUpdating,
    };
};
