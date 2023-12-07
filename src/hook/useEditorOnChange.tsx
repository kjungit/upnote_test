import { useCurrentMemo } from "@/store/CurrentMemoStore";
import { useCurrentNoteBook } from "@/store/CurrentNoteBookStore";
import { useNoteBooksStore } from "@/store/NotebooksStore";
import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import useDebounce from "./useDebounce";
import currentTime from "@/utils/currentTime";

export const useEditorOnChange = () => {
  const { currentNotebook, addOrUpdateMemo } = useCurrentNoteBook();
  const { currentMemo, setCurrentMemo } = useCurrentMemo();
  const { editMemoToNotebook } = useNoteBooksStore();
  const debounceTime = 300;
  const prepopulatedRichText = () => {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
      const paragraph = $createParagraphNode();
      if (currentMemo.memoTitle === "New Note") return;
      paragraph.append(
        $createTextNode(currentMemo.memoTitle).toggleFormat("bold"),
        $createTextNode("\n"),
        $createTextNode(currentMemo.description)
      );
      root.append(paragraph);
    }
    return root as unknown as InitialEditorStateType;
  };

  const handleChange = useDebounce((editorState: any) => {
    editorState.read(() => {
      const root = $getRoot();
      const res = root.__cachedText as string;
      setCurrentMemo({
        ...currentMemo,
        memoTitle: res.split("\n")[0],
        time: currentTime(),
        description: res.split("\n").slice(1).join("\n"),
      });

      addOrUpdateMemo({
        id: currentMemo.id,
        memoTitle: res.split("\n")[0],
        time: currentTime(),
        description: res.split("\n").slice(1).join("\n"),
      });

      editMemoToNotebook(currentNotebook.id, currentMemo.id, {
        ...currentMemo,
        memoTitle: res.split("\n")[0],
        time: currentTime(),
        description: res.split("\n").slice(1).join("\n"),
      });
    });
  }, debounceTime);
  return {
    handleChange,
    prepopulatedRichText,
  };
};
