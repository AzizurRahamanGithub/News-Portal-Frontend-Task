import { configureStore } from "@reduxjs/toolkit";
import multimediaReducer from "./slices/multimediaSlice";
import articlesReducer from "./slices/articlesSlice";
import contentReducer from "./slices/contentSlice";

export const store = configureStore({
  reducer: {
    multimedia: multimediaReducer,
    articles: articlesReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
