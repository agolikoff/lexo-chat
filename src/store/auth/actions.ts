import { createAppAsyncThunk } from "../helpers";

export const signInAction = createAppAsyncThunk("auth/sign-in", async ({ login }: { login: string }) => {
  return Promise.resolve(login);
});
