import { create } from "zustand";

const getInitialDarkMode = (): boolean => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode === "true" || false;
};


const DarkMode = create((set: any, get: any) => ({
  dark: getInitialDarkMode(),
  toggleDarkMode: () => {
    set((state: any) => {
      const newDarkMode = !state.dark;
      localStorage.setItem("darkMode", newDarkMode.toString());
      return { dark: newDarkMode };
    });
  },
  setDarkMode: (dark: boolean) => {
    set({ dark });
    localStorage.setItem("darkMode", dark.toString());
  },
}));

export default DarkMode;
