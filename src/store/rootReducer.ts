import { combineReducers } from '@reduxjs/toolkit';
import toDoListReducer from '@/store/test';

const reducer = combineReducers({ toDoListReducer });

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
