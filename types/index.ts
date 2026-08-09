export interface Multimedia {
  id: number;
  title: string | null;
  content_type: "text" | "image" | "audio" | "video" | "youtube";
  content_type_display: string;
  file: string | null;  
  created_at: string;
}

export interface NewsArticle {
  id: number;
  title: string | null;
  body: string | null;
  created_at: string;
}

export interface Content {
  id: number;
  title: string | null;
  body: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}