import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MemoType, NotebookType } from "@/types/item";

type State = {
  currentNotebook: NotebookType;
  setCurrentNotebook: (currentNotebook: NotebookType) => void;
  deleteCurrentNotebook: (id: string) => void;
  addOrUpdateMemo: (memo: MemoType) => void;
};

const initialState: State = {
  currentNotebook: {
    id: "",
    notebookTitle: "",
    memos: [],
  },
  setCurrentNotebook: (currentNotebook: NotebookType) => {},
  deleteCurrentNotebook: (id: string) => {},
  addOrUpdateMemo: (memo: MemoType) => {},
};

export const useCurrentNoteBook = create(
  persist<State>(
    (set) => ({
      ...initialState,
      setCurrentNotebook: (currentNotebook: NotebookType) =>
        set((state) => ({ ...state, currentNotebook })),
      addOrUpdateMemo: (memo: MemoType) =>
        set((state) => {
          const existingIndex = state.currentNotebook.memos.findIndex(
            (m) => m.id === memo.id
          );

          if (existingIndex !== -1) {
            const updatedMemos = [...state.currentNotebook.memos];
            updatedMemos[existingIndex] = memo;

            return {
              ...state,
              currentNotebook: {
                ...state.currentNotebook,
                memos: updatedMemos,
              },
            };
          }

          return {
            ...state,
            currentNotebook: {
              ...state.currentNotebook,
              memos: [...state.currentNotebook.memos, memo],
            },
          };
        }),
      deleteCurrentNotebook: (id: string) =>
        set((state) => ({
          ...state,
          currentNotebook: {
            ...state.currentNotebook,
            memos: state.currentNotebook.memos.filter((memo) => memo.id !== id),
          },
        })),
    }),
    {
      name: "currentNotebook",
    }
  )
);
