import { FETCH_STATUS } from '../constants/fetch-status';

export const initialState = {
    main: {
        todos: [],
        filter: '',
        currentTodoId: null,
        status: FETCH_STATUS.NONE,
        error: '',
    },
    task: {
        todo: {},
        status: FETCH_STATUS.NONE,
        error: '',
    },
};
