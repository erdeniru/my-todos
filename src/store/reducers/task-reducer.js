import { initialState } from '../initial-state';
import { FETCH_TODO_READING, FETCH_TODO_UPDATING, FETCH_TODO_DELETING } from '../actions';
import { FETCH_TODO_SUCCESS, FETCH_TODO_FAILED } from '../actions';
import { FETCH_STATUS } from '../../constants/fetch-status';

export const taskReducer = (state = initialState.task, { type, payload }) => {
    switch (type) {
        case FETCH_TODO_READING:
            return {
                ...state,
                status: FETCH_STATUS.READING,
            };

        case FETCH_TODO_UPDATING:
            return {
                ...state,
                status: FETCH_STATUS.UPDATING,
            };

        case FETCH_TODO_DELETING:
            return {
                ...state,
                status: FETCH_STATUS.DELETING,
            };

        case FETCH_TODO_SUCCESS:
            return {
                ...state,
                todo: payload,
                status: FETCH_STATUS.NONE,
            };

        case FETCH_TODO_FAILED:
            return {
                ...state,
                status: FETCH_STATUS.NONE,
            };

        default:
            return state;
    }
};
