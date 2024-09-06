import { Dispatch, SetStateAction } from "react";

export type AntMode = "dark" | "light";

export type AntContextType = {
  mode: AntMode;
  setMode: Dispatch<SetStateAction<AntMode>>;
  isDarkMode: boolean;
  onToggleMode: VoidFunction;
};
