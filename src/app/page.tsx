import MemoSection from "@/components/MemoSection";
import NoteBooksSection from "@/components/NoteBooksSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="h-screen border-x-2 border-black min-w-[1400px] max-w-[1920px] flex justify-center">
      <NoteBooksSection />
      <MemoSection />
    </div>
  );
}
