import { combineReducers } from '@reduxjs/toolkit';
import test from '@/store/test';
// import testReducer1 from '@/store/test1';

const rootReducer = combineReducers({ test /** ,testReducer1*/ });
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
