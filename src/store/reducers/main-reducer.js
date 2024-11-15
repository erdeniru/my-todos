import { initialState } from '../initial-state';
import { FETCH_TODOS_READING, SET_FILTER } from '../actions';
import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILED } from '../actions';
import { SORT_TODOS_ASC, SORT_TODOS_DESC } from '../actions';
import { FETCH_TODOS_CREATING_TODO, FETCH_TODOS_UPDATING_TODO } from '../actions';
import { FETCH_TODOS_SUCCESS_TODO, FETCH_TODOS_FAILED_TODO } from '../actions';
import { FETCH_STATUS } from '../../constants/fetch-status';

export const mainReducer = (state = initialState.main, { type, payload }) => {
    switch (type) {
        case FETCH_TODOS_READING:
            return {
                ...state,
                status: FETCH_STATUS.READING,
                currentTodoId: null,
            };

        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: payload,
                status: FETCH_STATUS.NONE,
            };

        case FETCH_TODOS_FAILED:
            return {
                ...state,
                status: FETCH_STATUS.NONE,
                error: payload,
            };

        case SORT_TODOS_ASC:
            const orderedTodosByTitleAsc = payload.sort((a, b) =>
                a.title < b.title ? -1 : a.title > b.title ? 1 : 0,
            );
            return {
                ...state,
                todos: orderedTodosByTitleAsc,
            };

        case SORT_TODOS_DESC:
            const orderedTodosByTitleDesc = payload.sort((a, b) =>
                a.title < b.title ? 1 : a.title > b.title ? -1 : 0,
            );
            return {
                ...state,
                todos: orderedTodosByTitleDesc,
            };

        case SET_FILTER:
            return {
                ...state,
                filter: payload,
            };

        case FETCH_TODOS_CREATING_TODO:
            return {
                ...state,
                status: FETCH_STATUS.CREATING,
            };

        case FETCH_TODOS_UPDATING_TODO:
            return {
                ...state,
                status: FETCH_STATUS.UPDATING,
                currentTodoId: payload,
            };

        case FETCH_TODOS_SUCCESS_TODO:
            let touchedTodos = state.todos;
            if (state.status === FETCH_STATUS.CREATING) {
                touchedTodos = [...state.todos, payload];
            } else if (state.status === FETCH_STATUS.UPDATING) {
                touchedTodos = state.todos.map((todo) =>
                    todo.id === payload.id ? payload : todo,
                );
            }
            return {
                ...state,
                todos: touchedTodos,
                status: FETCH_STATUS.NONE,
                currentTodoId: payload.id,
            };

        case FETCH_TODOS_FAILED_TODO:
            return {
                ...state,
                status: FETCH_STATUS.NONE,
            };

        default:
            return state;
    }
};
