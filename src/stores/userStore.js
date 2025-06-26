import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: {
    name: "",
    course: "",
    rank: "",
    level: 0,
    currentExp: 0,
    maxExp: 0,
    profileImg: null,
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () =>
    set({
      userInfo: {
        name: "",
        course: "",
        rank: "",
        level: 0,
        currentExp: 0,
        maxExp: 0,
        profileImg: null,
      },
    }),
}));

export default useUserStore;
