import { create } from 'zustand';

export interface SidebarStoreInterface {
  isClosed: boolean;
  shouldOpen: boolean;
}

export const sidebarStore = create<SidebarStoreInterface>((set) => ({
  isClosed: false,
  shouldOpen: false,
}));
