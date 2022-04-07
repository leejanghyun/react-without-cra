import { createAction, createReducer } from '@reduxjs/toolkit';

export const action = {
  create: createAction<IToggleToDoPayload>('TOGGLE/TO_DO'),
  remove: createAction<IDeleteToDoPayload>('DELETE/TO_DO'),
};

const initialState: IToDoListState = {
  toDoList: [],
};

export const reducer = {
  create: (state: IToDoListState, action: IToggleToDoAction) => {
    state.toDoList.find((todo: ToDo) => todo.id === action.payload.id).checked =
      action.payload.checked;
  },
  remove: (state: IToDoListState, action: IDeleteToDoAction) => {
    state.toDoList = state.toDoList.filter((todo: ToDo) => todo.id !== action.payload.id);
  },
};

const toDoListReducer = createReducer(initialState, (builder) => {
  builder.addCase(action.create, reducer.create).addCase(action.remove, reducer.remove);
});

export default toDoListReducer;
