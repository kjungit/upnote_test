import React from "react";
import MemoItem from "./ui/MemoItem";
import { NotebookType } from "@/types/item";

export default function MemoList({
  currentNotebook,
}: {
  currentNotebook: NotebookType;
}) {
  return (
    <ul className="overflow-y-auto w-[320px] h-full flex flex-col items-center">
      {currentNotebook &&
        currentNotebook.memos
          .slice(0)
          .reverse()
          .map((item) => <MemoItem key={item.id} item={item} />)}
    </ul>
  );
}
