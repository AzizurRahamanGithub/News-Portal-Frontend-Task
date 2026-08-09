import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";
import type { NewsArticle, PaginatedResponse } from "@/types";

interface ArticlesState {
  items: NewsArticle[];
  loading: boolean;
  error: string | null;
  count: number;
  next: string | null;
  previous: string | null;
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (params?: Record<string, string | number>) => {
    const response = await apiClient.get("/news/articles/", { params });
    const { data } = response.data; 
    return {
      results: Array.isArray(data) ? data : [],
      count: Array.isArray(data) ? data.length : 0,
      next: null,
      previous: null,
    } satisfies PaginatedResponse<NewsArticle>;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch articles";
      });
  },
});

export default articlesSlice.reducer;
