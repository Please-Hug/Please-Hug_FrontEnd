import { create } from "zustand";

const useTokenPayload = create((set) => ({
  tokenPayload: null,
  setTokenPayload: (tokenPayload) => set({ tokenPayload }),
  clearTokenPayload: () => set({ tokenPayload: null }),
}));

export default useTokenPayload;
