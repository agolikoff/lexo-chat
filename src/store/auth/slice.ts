import { createSlice } from "@reduxjs/toolkit";
import { signInAction } from "./actions";
import { TOKEN_KEY } from "./constants";

type State = {
  token: string | null;
  loadingToken: boolean;
  loadingLogin: boolean;
};

const initialState: State = {
  token: localStorage.getItem(TOKEN_KEY),
  loadingToken: false,
  loadingLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInAction.pending, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(signInAction.fulfilled, (state, { payload }) => {
      state.loadingLogin = false;
      state.token = payload;
      localStorage.setItem(TOKEN_KEY, payload);
    });
    builder.addCase(signInAction.rejected, (state) => {
      state.loadingLogin = false;
    });
  },
});

export const { actions, reducer } = authSlice;
