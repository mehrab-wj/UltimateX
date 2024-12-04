import { create } from "zustand";

type UserStoreType = {
	user: any;
	setUser: (user: any) => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
	user: null,
	setUser: (user: any) => set({ user }),
}));
