import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';

type StateType = {
  id: string;
  name: string;
};

const name = 'test';

const initialState: StateType = {
  id: '',
  name: '',
};

const reducers = {
  setState: (state, action: PayloadAction<TestActionPayload>) => {
    const { name, id } = action.payload;
    state.name = name;
    state.id = id;
  },
};

// Thunck 정의
const asyncThunk = {
  create: createAsyncThunk('fetchTodo', async ({ test1, test2 }: { test1: number; test2: number }, thunkAPI) => {
    // try {
    //   return (await getSplashImage(1)).data;
    // } catch (e) {
    //   return thunkAPI.rejectWithValue(await e.response.data);
    // }
  }),
};

const extraReducer = {
  create: (state: StateType, action: PayloadAction) => {
    state.name;
  },
  remove: (state: StateType) => {
    state.name;
  },
};

// CreateSlice 정의
export const testSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) => {
    const create = asyncThunk.create;
    builder
      .addCase(create.pending, extraReducer.create)
      .addCase(create.fulfilled, extraReducer.create)
      .addCase(create.rejected, extraReducer.remove);
  },
});

// Selector 정의
export const selector = (state: RootState) => ({ id: state.test.id, name: state.test.name });
export const { setState } = testSlice.actions;

export default testSlice.reducer;
