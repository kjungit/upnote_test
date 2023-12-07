"use client";
import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "./ui/icons/MenuIcon";
import Dropdwon from "./ui/Dropdwon";
import { useNoteBooksStore } from "@/store/NotebooksStore";
import ModalPortal from "./ui/ModalPortal";
import NotebooksBox from "./NotebooksBox";
import { useCurrentNoteBook } from "@/store/CurrentNoteBookStore";
import { useCurrentMemo } from "@/store/CurrentMemoStore";
import { useMountStore } from "@/store/MountStore";
import { NotebookType } from "@/types/item";

const dropdownData = ["Edit", "Delete"];

export default function NoteBooksItem({
  item: { id, notebookTitle, memos },
}: {
  item: NotebookType;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { setIsMounted, setIsEditorMounted } = useMountStore();
  const { currentNotebook, setCurrentNotebook, deleteCurrentNotebook } =
    useCurrentNoteBook();

  const { currentMemo, setCurrentMemo } = useCurrentMemo();

  const dropdownRef: React.RefObject<HTMLDivElement> = useRef(null);
  const onClickClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
  };

  const { deleteNotebook } = useNoteBooksStore();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isClick) setIsHovered(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsClick(false);
      setIsHovered(false);
    }
  };
  const handleClick = () => {
    const updatedCurrent = {
      ...currentNotebook,
      id,
      notebookTitle,
      memos,
    };
    setCurrentNotebook(updatedCurrent);
    if (currentNotebook.memos.length !== 0) {
      const updatedCurrentMemo = {
        ...currentMemo,
        id: currentNotebook.memos[currentNotebook.memos.length - 1].id,
        memoTitle:
          currentNotebook.memos[currentNotebook.memos.length - 1].memoTitle,
        description:
          currentNotebook.memos[currentNotebook.memos.length - 1].description,
        time: currentNotebook.memos[currentNotebook.memos.length - 1].time,
      };
      setCurrentMemo(updatedCurrentMemo);
      setIsMounted(false);
    }
  };

  useEffect(() => {
    if (currentNotebook.memos.length !== 0) {
      const updatedCurrentMemo = {
        ...currentMemo,
        id: currentNotebook.memos[currentNotebook.memos.length - 1].id,
        memoTitle:
          currentNotebook.memos[currentNotebook.memos.length - 1].memoTitle,
        description:
          currentNotebook.memos[currentNotebook.memos.length - 1].description,
        time: currentNotebook.memos[currentNotebook.memos.length - 1].time,
      };
      setCurrentMemo(updatedCurrentMemo);
      setIsEditorMounted(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li
      className={`${
        isHovered && "bg-[#2d2e31] w-[290px] border-r-2 border-black"
      }
      
      ${currentNotebook.id === id && "bg-[#2d2e31] border-r-2 border-black"}
        cursor-pointer  w-[290px] relative flex justify-between items-center h-12 py-2 px-4`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick()}
    >
      <p className="w-10/12 whitespace-nowrap text-ellipsis overflow-hidden">
        {notebookTitle}
      </p>
      {isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsClick(true);
          }}
        >
          <MenuIcon />
        </button>
      )}
      {isClick && (
        <div className="right-4 absolute z-50" ref={dropdownRef}>
          <Dropdwon>
            {dropdownData.map((item) => (
              <li
                key={item}
                className="m-1 flex cursor-pointer items-center rounded-md px-4 hover:bg-[#1559be]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item === "Delete") {
                    const updatedCurrent = {
                      ...currentNotebook,
                      id: "",
                      notebookTitle: "",
                    };
                    deleteNotebook(id);
                    setCurrentNotebook(updatedCurrent);
                  }
                  if (item === "Edit") {
                    setIsEdit(true);
                  }
                  setIsClick(false);
                }}
              >
                {item}
              </li>
            ))}
          </Dropdwon>
        </div>
      )}
      {isEdit && (
        <ModalPortal>
          <div
            onClick={onClickClose}
            className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center"
          >
            <NotebooksBox
              setIsAdd={setIsEdit}
              idValue={id}
              titleValue={notebookTitle}
            />
          </div>
        </ModalPortal>
      )}
    </li>
  );
}
