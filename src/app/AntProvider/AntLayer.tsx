import { useState, PropsWithChildren, useMemo, useCallback } from "react";
import { AntProvider } from "./AntContext";
import { AntMode } from "./types";
import { Colors } from "../../shared/constants/colors";
import { ConfigProvider, theme } from "antd";
import antdRuLocale from "antd/es/locale/ru_RU";

const { darkAlgorithm, defaultAlgorithm } = theme;

const DEFAULT_FONT =
  '"JetBrains Mono", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

export function AntLayer({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<AntMode>("dark");

  const isDarkMode = useMemo(() => mode === "dark", [mode]);

  const onToggleMode = useCallback(() => setMode(isDarkMode ? "light" : "dark"), [isDarkMode]);

  return (
    <AntProvider
      value={{
        mode,
        setMode,
        isDarkMode,
        onToggleMode,
      }}
    >
      <ConfigProvider
        locale={antdRuLocale}
        theme={{
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            fontFamily: DEFAULT_FONT,
          },
          components: {
            Layout: {
              // algorithm: true,
              headerBg: "black",
            },
            Slider: {
              // algorithm: true,
              handleSize: 12,
              railSize: 2,
              handleColor: Colors.SECONDARY,
              handleActiveColor: Colors.SECONDARY,
              handleLineWidth: 2,
              handleLineWidthHover: 4,
              trackBg: Colors.SECONDARY,
              trackHoverBg: Colors.SECONDARY,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntProvider>
  );
}
