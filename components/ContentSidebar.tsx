"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchContent } from "@/store/slices/contentSlice";
import { fetchMultimediaDetail } from "@/store/slices/multimediaSlice";
import MultimediaPopup from "./MultimediaPopup";

function AccordionItem({
  title,
  body,
  isOpen,
  onToggle,
  onMediaClick,
}: any) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    const target = e.target.closest("[data-media-id]");
    if (target) {
      onMediaClick(Number(target.dataset.mediaId));
    }
  };

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 bg-[#3b2db5] text-white text-xs sm:text-sm font-semibold rounded-md"
      >
        <span>{title}</span>
        <span className={`transition ${isOpen ? "rotate-180" : ""}`}>∨</span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          overflow: "hidden",
          transition: "0.3s",
        }}
        ref={contentRef}
      >
        <div
          onClick={handleClick}
          className="bg-white border border-gray-200 px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
}

export default function ContentSidebar() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.content);
  const { selectedItem } = useAppSelector((s) => s.multimedia);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-[#3b2db5] font-bold text-lg sm:text-xl mb-2">
        Expandable Content
      </h2>

      <div className="border-t-2 border-teal-400 mb-4" />

      {items.map((c, i) => (
        <AccordionItem
          key={c.id}
          title={c.title}
          body={c.body}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          onMediaClick={(id: number) =>
            dispatch(fetchMultimediaDetail(id))
          }
        />
      ))}

      {selectedItem && <MultimediaPopup />}
    </>
  );
}