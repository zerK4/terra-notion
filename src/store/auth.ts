import { create } from 'zustand';
import { getSession, logout } from '../app/actions/authActions';
import { UserType } from '../db/schema';
import { User } from 'lucia';
import { UserInterface } from '../interfaces/user';

export interface AuthStoreInterface {
  logout: (callback: () => void) => void;
  user: UserInterface | null;
}

export const useAuthStore = create<AuthStoreInterface>((set) => ({
  logout: (callback: () => void) => {
    logout()
      .then((res) => {
        console.log('logged out');
        callback();
      })
      .catch((err: any) => {
        console.log(err.message, 'Error when logging out.');
        return err;
      });
  },
  user: null,
}));
