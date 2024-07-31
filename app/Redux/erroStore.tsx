import { create } from "zustand";

// Definição do tipo para o estado de erro
export interface ErrorState {
  Text: string;
  Visible: boolean;
  ErrorImg?: string;
}

export const selectError = (state: any) => ({
  Error: state.Error,
  SetNewError: state.SetNewError,
  ToggleErrorVisibility: state.ToggleErrorVisibility,
});

// Criação do estado com Zustand
const ErrorView = create((set: any, get: any) => ({
  Error: { Text: "Error", Visible: false, ErrorImg: "" },
  SetNewError: (error: ErrorState) => set({ Error: error }),
  // Função para alternar a visibilidade do erro
  ToggleErrorVisibility: () =>
    set((state: any) => ({
      Error: {
        ...state.Error,
        Visible: !state.Error.Visible,
      },
    })),
}));

export default ErrorView;
