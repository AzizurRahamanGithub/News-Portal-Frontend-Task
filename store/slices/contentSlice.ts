import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";
import type { Content, PaginatedResponse } from "@/types";

interface ContentState {
  items: Content[];
  loading: boolean;
  error: string | null;
  count: number;
  next: string | null;
  previous: string | null;
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

export const fetchContent = createAsyncThunk(
  "content/fetchAll",
  async (params?: Record<string, string | number>) => {
    const response = await apiClient.get("/news/content/", { params });
    const { data } = response.data; 
    return {
      results: Array.isArray(data) ? data : [],
      count: Array.isArray(data) ? data.length : 0,
      next: null,
      previous: null,
    } satisfies PaginatedResponse<Content>;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch content";
      });
  },
});

export default contentSlice.reducer;
