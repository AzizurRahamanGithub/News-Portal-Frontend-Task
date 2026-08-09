import MultimediaGrid from "@/components/MultimediaGrid";
import ArticleList from "@/components/ArticleList";
import ContentSidebar from "@/components/ContentSidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="bg-gradient-to-br from-[#3b2db5] to-[#6c3fd4] py-14 px-6 text-center">
        <h1 className="text-4xl font-bold text-white m-0">
          Interactive Teaching Platform
        </h1>
        <p className="text-white/75 mt-3 text-base">
          Click on highlighted terms to explore multimedia content
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-7 items-start">
        <div className="flex-1 min-w-0">
          <MultimediaGrid />
          <ArticleList />
        </div>
        <div className="w-72 shrink-0">
          <ContentSidebar />
        </div>
      </div>
    </div>
  );
}