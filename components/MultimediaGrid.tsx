"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchMultimedia, fetchMultimediaDetail } from "@/store/slices/multimediaSlice";
import MultimediaPopup from "./MultimediaPopup";

const MEDIA_CONFIG: Record<string, { icon: string; color: string }> = {
  text:    { icon: "",  color: "text-red-600"  },
  image:   { icon: "", color: "text-gray-600" },
  audio:   { icon: "", color: "text-gray-600" },
  video:   { icon: "", color: "text-red-600"  },
  youtube: { icon: "",  color: "text-red-600"  },
};

export default function MultimediaGrid() {
  const dispatch = useAppDispatch();
  const { items, loading, selectedItem } = useAppSelector((s) => s.multimedia);

  useEffect(() => {
    dispatch(fetchMultimedia());
  }, [dispatch]);

  return (
    <>
      <Section title="Multimedia Content Examples">
        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {items.map((m) => {
              const cfg = MEDIA_CONFIG[m.content_type] ?? MEDIA_CONFIG.text;
              return (
                <MediaBadgeBox
                  key={m.id}
                  icon={cfg.icon}
                  iconColor={cfg.color}
                  label={m.title || m.content_type_display}
                  onClick={() => dispatch(fetchMultimediaDetail(m.id))}
                />
              );
            })}
            {items.length === 0 &&
              (["text", "image", "audio", "video", "youtube"] as const).map((t) => (
                <MediaBadgeBox
                  key={t}
                  icon={MEDIA_CONFIG[t].icon}
                  iconColor={MEDIA_CONFIG[t].color}
                  label={t}
                />
              ))}
          </div>
        )}
      </Section>

      {selectedItem && <MultimediaPopup />}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 border-l-4 border-[#3b2db5]">
      <h2 className="text-[#3b2db5] font-bold text-lg mb-2.5">{title}</h2>
      <div className="border-t-2 border-teal-400 mb-4" />
      {children}
    </div>
  );
}

function MediaBadgeBox({ icon, iconColor, label, onClick }: {
  icon: string;
  iconColor: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-md px-4 py-3 flex items-center gap-2 bg-white hover:border-[#3b2db5] transition-colors cursor-pointer"
    >
      <span className={`${iconColor} font-bold text-base`}>{icon}</span>
      <span className={`${iconColor} font-semibold text-sm`}>{label}</span>
      {onClick && <span className="text-gray-300 text-xs ml-auto">🔍</span>}
    </div>
  );
}