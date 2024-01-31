import { create } from 'zustand';

export interface PageStoreInterface {
  pageName: string;
  pageId: string;
  sharedLink: string | null;
}

export const pageStore = create<PageStoreInterface>((set) => ({
  pageName: '',
  pageId: '',
  sharedLink: null,
}));
