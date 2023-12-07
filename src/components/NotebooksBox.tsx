"use client";
import { useCurrentNoteBook } from "@/store/CurrentNoteBookStore";
import { useNoteBooksStore } from "@/store/NotebooksStore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface NotebooksBoxProps {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  idValue?: string;
  titleValue?: string;
}

export default function NotebooksBox({
  setIsAdd,
  idValue,
  titleValue,
}: NotebooksBoxProps) {
  const [title, setTitle] = useState("");
  const uniqueId = uuidv4();

  const { currentNotebook, setCurrentNotebook } = useCurrentNoteBook();
  const { addNotebook, editNotebook, deleteNotebook } = useNoteBooksStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClick = (state: string) => {
    switch (state) {
      case "edit":
        idValue && editNotebook(idValue, title);
        break;
      case "add":
        addNotebook(uniqueId, title);
        const updatedCurrent = {
          ...currentNotebook,
          id: uniqueId,
          notebookTitle: title,
          memos: [],
        };
        setCurrentNotebook(updatedCurrent);

        break;
      case "delete":
        const deleteCurrent = {
          ...currentNotebook,
          id: "",
          notebookTitle: "",
        };
        setCurrentNotebook(deleteCurrent);
        idValue && deleteNotebook(idValue);
        break;
    }
    setIsAdd(false);
  };

  const handleClickPrevention = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idValue) {
      handleClick("edit");
    } else {
      handleClick("add");
    }
  };

  useEffect(() => {
    titleValue && setTitle(titleValue);
  }, []);

  return (
    <div
      onClick={handleClickPrevention}
      className="bg-[#28292a] p-10 w-[600px] h-[500px] rounded-2xl fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 shadow-md"
    >
      <h3 className="text-lg font-bold text-center mb-6">
        Create New Notebook
      </h3>

      <div className="h-full flex flex-col justify-between pb-10">
        <form
          className="w-full flex justify-between items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="text-lg font-bold">
            Name
          </label>
          <input
            defaultValue={titleValue}
            autoFocus
            type="text"
            id="name"
            className="w-[400px] h-[36px] outline-none bg-[#46464a] p-4"
            placeholder="Enter notebook name"
            onChange={handleChange}
          />
        </form>
        {idValue ? (
          <div className="flex justify-between">
            <button
              className={`
                rounded-md h-10  px-4 text-red-700`}
              onClick={() => handleClick("delete")}
            >
              Delete
            </button>
            <button
              className={`
                rounded-md h-10 bg-[#4a92fe] border-[#4a92fe] px-4`}
              onClick={() => handleClick("edit")}
            >
              Update
            </button>
          </div>
        ) : (
          <button
            className={`${
              title === ""
                ? " border-gray-600 text-gray-600 "
                : "bg-[#4a92fe] border-[#4a92fe]"
            }
                rounded-md h-10 border`}
            onClick={() => {
              handleClick("add");
            }}
            disabled={title === ""}
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
}
