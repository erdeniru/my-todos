import { combineReducers } from 'redux';
import { mainReducer } from './main-reducer';
import { taskReducer } from './task-reducer';

export const reducers = combineReducers({
    mainReducer,
    taskReducer,
});
