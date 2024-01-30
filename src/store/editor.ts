import { create } from 'zustand';

export interface EditorStoreInterface {
  autoSave: boolean;
  saveDate: number;
  saved: boolean;
  isSaving: boolean;
}

export const editorStore = create<EditorStoreInterface>((set) => ({
  autoSave: true,
  saveDate: 0,
  saved: false,
  isSaving: false,
}));
