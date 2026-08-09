import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";
import type { Multimedia, PaginatedResponse } from "@/types";

interface MultimediaState {
  items: Multimedia[];
  selectedItem: Multimedia | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
  count: number;
  next: string | null;
  previous: string | null;
}

const initialState: MultimediaState = {
  items: [],
  selectedItem: null,
  loading: false,
  detailLoading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

export const fetchMultimedia = createAsyncThunk(
  "multimedia/fetchAll",
  async (params?: Record<string, string | number>) => {
    const response = await apiClient.get("/news/multimedia/", { params });
    const { data } = response.data; 
    return {
      results: data,
      count: data.length,
      next: null,
      previous: null,
    } satisfies PaginatedResponse<Multimedia>;
  }
);

export const fetchMultimediaDetail = createAsyncThunk(
  "multimedia/fetchDetail",
  async (id: number) => {
    const response = await apiClient.get(`/news/multimedia/${id}/`);
    return response.data.data as Multimedia; 
  }
);

const multimediaSlice = createSlice({
  name: "multimedia",
  initialState,
  reducers: {
    clearSelectedItem(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultimedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMultimedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchMultimedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch multimedia";
      })
      .addCase(fetchMultimediaDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchMultimediaDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchMultimediaDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message ?? "Failed to fetch multimedia detail";
      });
  },
});

export const { clearSelectedItem } = multimediaSlice.actions;
export default multimediaSlice.reducer;
