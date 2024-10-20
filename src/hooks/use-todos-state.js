import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';

const TODOS_URL = 'http://localhost:3003/todos';

export const useTodosState = () => {
    const [todos, setTodos] = useState([]);

    const [filter, setFilter] = useState('');
    const debounceFilter = useDebounce(filter, 500);

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [currentTodoId, setCurrentTodoId] = useState(null);

    useEffect(() => {
        let url_param = '';
        if (debounceFilter !== '') {
            url_param = '?title_like=' + debounceFilter;
        }

        fetch(TODOS_URL + url_param) // фильтрацию выполняем на стороне сервера
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
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debounceFilter]);

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

    const deleteTodo = (id) => {
        setCurrentTodoId(id);
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
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
                console.log('Запись удалена, ответ сервера:', data);
            })
            .catch((error) => {
                console.log('Ошибка удаления записи', error);
            })
            .finally(() => {
                setIsDeleting(false);
                setCurrentTodoId(null);
            });
    };

    const updateTodo = (id, todo) => {
        setCurrentTodoId(todo.id);
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
                setTodos((prevTodos) =>
                    prevTodos.map((value) => (value.id === data.id ? todo : value)),
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

    const updateCompletedTodo = (id, completed) => {
        setCurrentTodoId(id);
        setIsUpdating(true);

        fetch(TODOS_URL + '/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                completed: completed,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось получить ответ от сервера');
                }
                return response.json();
            })
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
        deleteTodo,
        updateTodo,
        updateCompletedTodo,
        isLoading,
        isCreating,
        isDeleting,
        isUpdating,
        currentTodoId,
    };
};
