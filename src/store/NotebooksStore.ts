import { MemoType, NotebookType } from "@/types/item";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  notebooks: NotebookType[];
  addNotebook: (id: string, title: string) => void;
  editNotebook: (id: string, editTitle: string) => void;
  deleteNotebook: (id: string) => void;
  addMemoToNotebook: (notebookId: string, memo: MemoType) => void;
  editMemoToNotebook: (
    notebookId: string,
    memoId: string,
    memo: MemoType
  ) => void;
  deleteMemoToNotebook: (notebookId: string, memoId: string) => void;
};

export const useNoteBooksStore = create(
  persist<State>(
    (set) => ({
      notebooks: [],
      addNotebook: (id: string, title: string) => {
        set((state) => ({
          ...state,
          notebooks: [
            ...state.notebooks,
            { id, notebookTitle: title, memos: [] },
          ],
        }));
      },
      editNotebook: (id: string, editTitle: string) => {
        set((state) => ({
          ...state,
          notebooks: state.notebooks.map((notebook) => {
            if (notebook.id === id) {
              return {
                ...notebook,
                notebookTitle: editTitle,
              };
            }
            return notebook;
          }),
        }));
      },
      deleteNotebook: (id: string) =>
        set((state) => ({
          ...state,
          notebooks: state.notebooks.filter((notebook) => notebook.id !== id),
        })),
      addMemoToNotebook: (notebookId: string, memo: MemoType) => {
        set((state) => ({
          ...state,
          notebooks: state.notebooks.map((notebook) => {
            if (notebook.id === notebookId) {
              return {
                ...notebook,
                memos: [...notebook.memos, memo],
              };
            }
            return notebook;
          }),
        }));
      },
      editMemoToNotebook: (
        notebookId: string,
        memoId: string,
        updatedMemo: MemoType
      ) => {
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => {
            if (notebook.id === notebookId) {
              const memoIndex = notebook.memos.findIndex(
                (memo) => memo.id === memoId
              );

              if (memoIndex !== -1) {
                notebook.memos[memoIndex] = updatedMemo;
                return notebook;
              }
            }
            return notebook;
          }),
        }));
      },
      deleteMemoToNotebook: (notebookId: string, memoId: string) =>
        set((state) => ({
          ...state,
          notebooks: state.notebooks.map((notebook) => {
            if (notebook.id === notebookId) {
              return {
                ...notebook,
                memos: notebook.memos.filter((memo) => memo.id !== memoId),
              };
            }
            return notebook;
          }),
        })),
    }),
    {
      name: "notebooks",
    }
  )
);
