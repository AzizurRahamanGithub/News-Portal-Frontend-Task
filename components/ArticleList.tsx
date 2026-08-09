"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchArticles } from "@/store/slices/articlesSlice";
import { fetchMultimediaDetail } from "@/store/slices/multimediaSlice";
import MultimediaPopup from "./MultimediaPopup";

export default function ArticleList() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.articles);
  const { selectedItem } = useAppSelector((s) => s.multimedia);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest("[data-media-id]");
    if (target) {
      const id = target.getAttribute("data-media-id");
      if (id) dispatch(fetchMultimediaDetail(Number(id)));
    }
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>;

  return (
    <>
      {items.map((article) => (
        <div key={article.id} className="bg-white rounded-lg p-6 mb-6 border-l-4 border-[#3b2db5]">
          <h2 className="text-[#3b2db5] font-bold text-lg mb-2.5">{article.title}</h2>
          <div className="border-t-2 border-teal-400 mb-4" />
          <p className="text-xs text-gray-400 mb-3">
            {new Date(article.created_at).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
          <div
            onClick={handleBodyClick}
            className="text-base leading-loose text-gray-700 space-y-3 [&_.media-embed]:cursor-pointer [&_.media-embed]:hover:bg-purple-200 [&_.media-embed]:transition-colors"
            dangerouslySetInnerHTML={{ __html: article.body ?? "" }}
          />
        </div>
      ))}

      {selectedItem && <MultimediaPopup />}
    </>
  );
}