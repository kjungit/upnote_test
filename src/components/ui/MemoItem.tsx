"use client";
import { useCurrentMemo } from "@/store/CurrentMemoStore";
import { useCurrentNoteBook } from "@/store/CurrentNoteBookStore";
import { useMountStore } from "@/store/MountStore";
import { useNoteBooksStore } from "@/store/NotebooksStore";
import { MemoType } from "@/types/item";
import React, { useState } from "react";

export default function MemoItem({
  item: { id, memoTitle, description, time },
}: {
  item: MemoType;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentMemo, setCurrentMemo } = useCurrentMemo();
  const { currentNotebook, deleteCurrentNotebook } = useCurrentNoteBook();
  const { deleteMemoToNotebook } = useNoteBooksStore();
  const { setIsEditorMounted } = useMountStore();

  return (
    <>
      <li
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          const updatedCurrent = {
            ...currentMemo,
            id,
            memoTitle,
            description,
            time,
          };
          setCurrentMemo(updatedCurrent);
          setIsEditorMounted(false);
        }}
        className="relative flex w-full cursor-pointer min-h-[110px] px-6 flex-col justify-between  py-4 hover:bg-[#2d2e31] "
      >
        <p className="font-bold text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {memoTitle}
        </p>
        <p className="text-sm text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden">
          {description}
        </p>
        <span className="font-thin text-xs">{time}</span>
        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteCurrentNotebook(id);
              deleteMemoToNotebook(currentNotebook.id, id);
            }}
            className="absolute bottom-4 right-4 text-sm rounded-md px-4 py-2 bg-red-700/40"
          >
            Delete
          </button>
        )}
      </li>
      <div className="border-b-0 border w-[280px] border-gray-600" />
    </>
  );
}
