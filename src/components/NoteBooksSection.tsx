"use client";
import React, { useEffect, useState } from "react";
import BottomArowIcon from "./ui/icons/BottomArowIcon";
import PlusIcon from "./ui/icons/PlusIcon";
import ModalPortal from "./ui/ModalPortal";
import NoteBooksItem from "./NoteBooksItem";
import NotebooksBox from "./NotebooksBox";
import { useNoteBooksStore } from "@/store/NotebooksStore";
import { useMountStore } from "@/store/MountStore";

export default function NoteBooksSection() {
  const [isAdd, setIsAdd] = useState(false);
  const { notebooks } = useNoteBooksStore();
  const { isMounted, setIsMounted } = useMountStore();
  const [isClick, setIsClick] = useState(false);
  const onClickClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-[290px] h-full border-r-2 border-black">
      <div className="flex text-[#4a92fe] h-16 p-2 justify-between items-center ">
        <div className="flex items-center">
          {isClick ? (
            <button className="-rotate-90" onClick={() => setIsClick(!isClick)}>
              <BottomArowIcon />
            </button>
          ) : (
            <button onClick={() => setIsClick(!isClick)}>
              <BottomArowIcon />
            </button>
          )}

          <h2>NOTEBOOKS</h2>
        </div>

        <button
          onClick={() => {
            setIsAdd(!isAdd);
          }}
        >
          <PlusIcon />
        </button>
      </div>
      {isMounted && (
        <ul className="w-[290px]">
          {notebooks &&
            !isClick &&
            notebooks.map((item) => (
              <NoteBooksItem key={item.id} item={item} />
            ))}
        </ul>
      )}
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
    </div>
  );
}
