import { create } from 'zustand';

export interface GeneralStoreInterface {
  loading: boolean;
}

export const generalStore = create<GeneralStoreInterface>((set) => ({
  loading: false,
}));
