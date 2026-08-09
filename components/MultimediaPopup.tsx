"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearSelectedItem } from "@/store/slices/multimediaSlice";

export default function MultimediaPopup() {
  const dispatch = useAppDispatch();
  const { selectedItem, detailLoading } = useAppSelector((s) => s.multimedia);

  if (!selectedItem) return null;

  const file = selectedItem.file as string | null;

  return (
    <div onClick={() => dispatch(clearSelectedItem())} className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-7 w-[90%] max-w-xl relative max-h-[85vh] overflow-y-auto">
        <button onClick={() => dispatch(clearSelectedItem())} className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer leading-none">
          ✕
        </button>

        {detailLoading ? (
          <p className="text-gray-400 text-center py-10">Loading...</p>
        ) : (
          <>
            <span className="text-xs text-white bg-[#3b2db5] px-3 py-1 rounded-full font-semibold">
              {selectedItem.content_type_display}
            </span>

            <h3 className="text-[#1a1a2e] font-bold text-lg mt-3 mb-4">
              {selectedItem.title}
            </h3>

            {selectedItem.content_type === "image" && file && (
              <img src={file} alt={selectedItem.title ?? ""} className="w-full rounded-md object-contain max-h-96" />
            )}

            {selectedItem.content_type === "video" && file && (
              <video controls className="w-full rounded-md">
                <source src={file} />
                Your browser does not support video.
              </video>
            )}

            {selectedItem.content_type === "audio" && file && (
              <audio controls className="w-full mt-2">
                <source src={file} />
                Your browser does not support audio.
              </audio>
            )}

            {selectedItem.content_type === "youtube" && file && (
              <a href={file} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-md font-semibold no-underline hover:bg-red-700 transition-colors">
                ▶ Open in YouTube
              </a>
            )}

            {selectedItem.content_type === "text" && file && (
              <div className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: file }} />
            )}

            {!file && (
              <p className="text-gray-400 text-sm text-center py-5">No content found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}