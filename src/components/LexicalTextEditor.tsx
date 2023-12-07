"use client";
import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import exampleTheme from "@/utils/editor/themes/ExampleTheme";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { MemoType } from "@/types/item";
import { useEditorOnChange } from "@/hook/useEditorOnChange";

export default function LexicalTextEditor({
  currentMemo,
}: {
  currentMemo: MemoType;
}) {
  const { handleChange, prepopulatedRichText } = useEditorOnChange();

  return (
    <LexicalComposer
      initialConfig={{
        editorState: prepopulatedRichText,
        namespace: currentMemo.memoTitle,
        theme: exampleTheme,
        onError(error: any) {
          throw error;
        },
        nodes: [HeadingNode, QuoteNode],
      }}
    >
      <div className="h-full w-full relative">
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className="h-full p-8 outline-none " />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return (
    <div className="absolute top-8 left-8 pointer-events-none text-gray-500">
      The first line becomes the title.
    </div>
  );
}
