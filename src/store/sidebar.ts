import { create } from 'zustand';

export interface SidebarStoreInterface {
  isClosed: boolean;
  shouldOpen: boolean;
  tempShow: boolean;
}

export const sidebarStore = create<SidebarStoreInterface>((set) => ({
  isClosed: false,
  shouldOpen: false,
  tempShow: false,
}));
