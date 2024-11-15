import { deleteTodoFetch, readTodoFetch, updateTodoFetch } from '../../api/api';

export const FETCH_TODO_READING = 'FETCH_TODO_READING';
export const FETCH_TODO_UPDATING = 'FETCH_TODO_UPDATING';
export const FETCH_TODO_DELETING = 'FETCH_TODO_DELETING';

export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILED = 'FETCH_TODO_FAILED';

export const readTodo = (todoId) => async (dispatch) => {
    dispatch({ type: FETCH_TODO_READING });

    try {
        const todo = await readTodoFetch(todoId);
        dispatch({ type: FETCH_TODO_SUCCESS, payload: todo });
        console.log('Чтение записи выполнена, ответ сервера:', todo);
    } catch (error) {
        dispatch({ type: FETCH_TODO_FAILED, payload: error.message });
        console.log('Ошибка чтения записи', error);
    }
};

export const updateTodo = (todo) => async (dispatch) => {
    dispatch({ type: FETCH_TODO_UPDATING });

    try {
        const updatedtodo = await updateTodoFetch(todo);
        dispatch({ type: FETCH_TODO_SUCCESS, payload: updatedtodo });
        console.log('Запись обновлена, ответ сервера:', updatedtodo);
    } catch (error) {
        dispatch({ type: FETCH_TODO_FAILED, payload: error.message });
        console.log('Ошибка обновления записи', error);
    }
};

export const deleteTodo = (todoId) => async (dispatch) => {
    dispatch({ type: FETCH_TODO_DELETING });

    try {
        const todo = await deleteTodoFetch(todoId);
        dispatch({ type: FETCH_TODO_SUCCESS, payload: {} });
        console.log('Удаление записи выполнено, ответ сервера:', todo);
    } catch (error) {
        dispatch({ type: FETCH_TODO_FAILED, payload: error.message });
        console.log('Ошибка удаления записи', error);
    }
};
