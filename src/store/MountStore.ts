import { create } from "zustand";

type State = {
  isMounted: boolean;
  setIsMounted: (isMounted: boolean) => void;
  isEditorMounted: boolean;
  setIsEditorMounted: (isMounted: boolean) => void;
};

const initialState: State = {
  isMounted: false,
  setIsMounted: (isMounted: boolean) => {},
  isEditorMounted: false,
  setIsEditorMounted: (isMounted: boolean) => {},
};

export const useMountStore = create<State>((set) => ({
  ...initialState,
  setIsMounted: (isMounted: boolean) => set({ isMounted }),
  setIsEditorMounted: (isMounted: boolean) =>
    set({ isEditorMounted: isMounted }),
}));
