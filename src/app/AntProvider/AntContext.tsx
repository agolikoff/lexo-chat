import { createContext, useContext } from "react";
import { AntContextType } from "./types";

const AntContext = createContext<AntContextType | null>(null);

export const AntProvider = AntContext.Provider;

export function useAntContext() {
  const context = useContext(AntContext);

  if (!context) {
    throw new Error("Нельзя использовать AntContext вне AntProvider");
  }

  return context;
}
