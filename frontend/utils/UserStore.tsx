// store/userStore.ts
import { create } from 'zustand';

import { User } from '@/constants/interfaces';

interface UserStore {
    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),
}));
