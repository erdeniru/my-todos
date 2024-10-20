import { HTTP_METHOD } from '../constants/http-method';

const TODOS_URL = 'http://localhost:3003/todos';

const fetchServer = async (
    method = HTTP_METHOD.GET,
    { id, ...payload } = {},
    query = '',
) => {
    let url = TODOS_URL;

    if (method !== HTTP_METHOD.POST && id !== undefined) url += `/${id}`;
    if (query !== '') url += `?${query}`;

    let options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };

    if (
        method === HTTP_METHOD.POST ||
        method === HTTP_METHOD.PUT ||
        method === HTTP_METHOD.PATCH
    ) {
        options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Не удалось получить ответ от сервера');
    }

    return await response.json();
};

export const createTodoFetch = (newTodo) => fetchServer(HTTP_METHOD.POST, newTodo);
export const readTodoFetch = (todoId) => fetchServer(HTTP_METHOD.GET, { id: todoId });
export const readTodosFetch = (queryUrl) => fetchServer(HTTP_METHOD.GET, {}, queryUrl);
export const updateTodoFetch = (todoData) => fetchServer(HTTP_METHOD.PATCH, todoData);
export const deleteTodoFetch = (todoId) =>
    fetchServer(HTTP_METHOD.DELETE, { id: todoId });
