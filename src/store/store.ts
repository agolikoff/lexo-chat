import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
  extra: any;
};
