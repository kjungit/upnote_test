export type NotebookType = {
  id: string;
  notebookTitle: string;
  memos: MemoType[];
};

export type MemoType = {
  id: string;
  memoTitle: string;
  description: string;
  time: string;
};
