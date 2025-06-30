import { create } from "zustand";

const initialBreadcrumbItems = [
  { label: "사용자의 대시보드", path: "/" },
  { label: "홈", path: "/" },
];

const useBreadcrumbStore = create((set) => ({
  breadcrumbItems: initialBreadcrumbItems,
  setBreadcrumbItems: (items) => set({ breadcrumbItems: items }),
  clearBreadcrumbItems: () =>
    set({
      breadcrumbItems: initialBreadcrumbItems,
    }),
}));

export default useBreadcrumbStore;
