import { createTodoFetch, readTodosFetch, updateTodoFetch } from '../../api/api';

export const FETCH_TODOS_READING = 'FETCH_TODOS_READING';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILED = 'FETCH_TODOS_FAILED';

export const SORT_TODOS_ASC = 'SORT_TODOS_ASC';
export const SORT_TODOS_DESC = 'SORT_TODOS_DESC';

export const SET_FILTER = 'SET_FILTER';

export const FETCH_TODOS_CREATING_TODO = 'FETCH_TODOS_CREATING_TODO';
export const FETCH_TODOS_UPDATING_TODO = 'FETCH_TODOS_UPDATING_TODO';
export const FETCH_TODOS_SUCCESS_TODO = 'FETCH_TODOS_SUCCESS_TODO';
export const FETCH_TODOS_FAILED_TODO = 'FETCH_TODOS_FAILED_TODO';

export const fetchTodos = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_TODOS_READING });
    try {
        const { mainReducer } = getState();
        let url_param = '';
        if (mainReducer.filter !== '') url_param = 'title_like=' + mainReducer.filter;
        const todos = await readTodosFetch(url_param);
        dispatch({ type: FETCH_TODOS_SUCCESS, payload: todos });
        console.log('Загрузка данных выполнена', todos);
    } catch (error) {
        dispatch({ type: FETCH_TODOS_FAILED, payload: error.message });
        console.log('Ошибка загрузки данных', error);
    }
};

export const sortTodosAsc = () => (dispatch, getState) => {
    const { mainReducer } = getState();
    dispatch({ type: SORT_TODOS_ASC, payload: mainReducer.todos });
};

export const sortTodosDesc = () => (dispatch, getState) => {
    const { mainReducer } = getState();
    dispatch({ type: SORT_TODOS_DESC, payload: mainReducer.todos });
};

export const changeFilter = (filter) => (dispatch) => {
    dispatch({ type: SET_FILTER, payload: filter });
};

export const createTodo = (todo) => async (dispatch) => {
    dispatch({ type: FETCH_TODOS_CREATING_TODO });
    try {
        const newTodo = await createTodoFetch(todo);
        dispatch({ type: FETCH_TODOS_SUCCESS_TODO, payload: newTodo });
        console.log('Запись добавлена, ответ сервера:', newTodo);
    } catch (error) {
        dispatch({ type: FETCH_TODOS_FAILED_TODO, payload: error.message });
        console.log('Ошибка добавления записи', error);
    }
};

export const updateTodoCompleted = (todoId, completed) => async (dispatch) => {
    dispatch({ type: FETCH_TODOS_UPDATING_TODO, payload: todoId });
    try {
        const updatedTodo = await updateTodoFetch({ id: todoId, completed });
        dispatch({ type: FETCH_TODOS_SUCCESS_TODO, payload: updatedTodo });
        console.log('Запись обновлена, ответ сервера:', updatedTodo);
    } catch (error) {
        dispatch({ type: FETCH_TODOS_FAILED_TODO, payload: error.message });
        console.log('Ошибка обновления записи', error);
    }
};
