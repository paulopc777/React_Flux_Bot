import { create } from "zustand";

// Definição do tipo para o estado de erro
export interface ErrorState {
  SelectItem: string;
  Visible: boolean;
}

export const selectView = (state: any) => ({
  SelectItem: state.SelectItem,
  Visible: state.Visible,
  SetBox: state.SetBox,
  SetVisible: state.SetVisible,
});

// Criação do estado com Zustand
const BoxEdit = create((set: any, get: any) => ({
  SelectItem: "",
  Visible: false,
  SetBox: (SelectItem: string) => set({ SelectItem: SelectItem }),
  SetVisible: (value: any) => set({ Visible: value }),
}));

export default BoxEdit;
