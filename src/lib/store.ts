import { User } from '@/domain/models';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  authToken: string | null;
  setAuthToken: (authToken: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  logOut: () => void;
}

// auth store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      authToken: null,
      user: null,
      setAuthToken: (authToken: string) => set({ authToken: authToken }),
      setUser: (user: User) => set({ user: user }),

      logOut: () => {
        // reset user and auth token
        set({ user: null, authToken: null });
      },
    }),
    {
      name: 'wfc__auth-state',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
