import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "./store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
