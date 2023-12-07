"use client";

import { useCurrentNoteBook } from "@/store/CurrentNoteBookStore";
import React, { useEffect, useState } from "react";
import LexicalTextEditor from "./LexicalTextEditor";
import { useNoteBooksStore } from "@/store/NotebooksStore";
import { v4 as uuidv4 } from "uuid";
import currentTime from "@/utils/currentTime";
import { useCurrentMemo } from "@/store/CurrentMemoStore";
import ModalPortal from "./ui/ModalPortal";
import NotebooksBox from "./NotebooksBox";
import { useMountStore } from "@/store/MountStore";
import MemoList from "./MemoList";

export default function MemoSection() {
  const [isAdd, setIsAdd] = useState(false);

  const { currentNotebook, setCurrentNotebook } = useCurrentNoteBook();
  const { currentMemo, setCurrentMemo } = useCurrentMemo();
  const { addMemoToNotebook } = useNoteBooksStore();

  const { isMounted, setIsMounted, isEditorMounted, setIsEditorMounted } =
    useMountStore();

  const uniqueId = uuidv4();

  const onClickClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    setIsMounted(true);
    setIsEditorMounted(true);
    return () => {
      setIsEditorMounted(false);
      setIsMounted(false);
    };
  }, [currentMemo, currentNotebook, isMounted]);

  const updatedCurrent = {
    ...currentNotebook,
    memos: [
      ...currentNotebook.memos,
      {
        id: uniqueId,
        memoTitle: "New Note",
        description: "No additional text",
        time: currentTime(),
      },
    ],
  };

  return (
    isMounted &&
    (currentNotebook.id === "" ? (
      <>
        <div className="h-auto w-full flex flex-col justify-center items-center">
          <p>You can organize notes of same topic info notebooks.</p>
          <button
            onClick={() => {
              setIsAdd(!isAdd);
            }}
            className="text-[#4a92fe] mt-4"
          >
            Create New Notebook
          </button>
        </div>
        {isAdd && (
          <ModalPortal>
            <div
              onClick={onClickClose}
              className="fixed  z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center"
            >
              <NotebooksBox setIsAdd={setIsAdd} />
            </div>
          </ModalPortal>
        )}
      </>
    ) : (
      <div className="w-full h-full flex relative">
        {currentNotebook.memos.length ? (
          <section className="flex w-full">
            <div className="w-[320px] h-full border-r-2 border-black flex flex-col items-center">
              <div className="w-[320px] whitespace-nowrap text-ellipsis overflow-hidden h-12 border-b border-black bg-[#27282b] flex items-center px-5">
                <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                  {currentNotebook.notebookTitle}
                </p>
              </div>
              <MemoList currentNotebook={currentNotebook} />
            </div>
            {isEditorMounted && <LexicalTextEditor currentMemo={currentMemo} />}
            <button
              onClick={() => {
                addMemoToNotebook(currentNotebook.id, {
                  id: uniqueId,
                  memoTitle: "New Note",
                  description: "No additional text",
                  time: currentTime(),
                });

                setCurrentMemo({
                  ...currentMemo,
                  id: uniqueId,
                  memoTitle: "New Note",
                  description: "No additional text",
                  time: currentTime(),
                });
                setCurrentNotebook(updatedCurrent);
                setIsMounted(false);
                setIsEditorMounted(false);
              }}
              className={` absolute right-4 top-4 
              rounded-md h-10 bg-[#4a92fe] border-[#4a92fe] px-4`}
            >
              New Memo
            </button>
          </section>
        ) : (
          <div className="h-auto w-full flex flex-col justify-center items-center">
            <p> Have a thought to jot down? Tap on the button below</p>
            <button
              onClick={() => {
                addMemoToNotebook(currentNotebook.id, {
                  ...currentMemo,
                  id: uniqueId,
                  memoTitle: "New Note",
                  description: "No additional text",
                  time: currentTime(),
                });

                setCurrentMemo({
                  ...currentMemo,
                  id: uniqueId,
                  memoTitle: "New Note",
                  description: "No additional text",
                  time: currentTime(),
                });
                setCurrentNotebook(updatedCurrent);
                setIsMounted(false);
                setIsEditorMounted(false);
              }}
              className="text-[#4a92fe] mt-4"
            >
              New Memo
            </button>
          </div>
        )}
      </div>
    ))
  );
}
