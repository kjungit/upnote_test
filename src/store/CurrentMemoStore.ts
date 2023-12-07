import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MemoType } from "@/types/item";

type State = {
  currentMemo: MemoType;
  setCurrentMemo: (currentMemo: MemoType) => void;
};

const initialState: State = {
  currentMemo: {
    id: "",
    memoTitle: "",
    description: "",
    time: "",
  },
  setCurrentMemo: (currentMemo: MemoType) => {},
};

export const useCurrentMemo = create(
  persist<State>(
    (set) => ({
      ...initialState,
      setCurrentMemo: (currentMemo: MemoType) =>
        set((state) => ({ ...state, currentMemo })),
    }),
    {
      name: "currentMemo",
    }
  )
);
