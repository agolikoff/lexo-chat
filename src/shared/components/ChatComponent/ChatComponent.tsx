import { AiChat, useAsStreamAdapter } from "@nlux/react";
import "@nlux/themes/nova.css";
import { send } from "./send";
import { personas } from "./personas";
import { useAntContext } from "../../../shared/hooks";
import styles from "./ChatComponent.module.scss";

export function ChatComponent() {
  const adapter = useAsStreamAdapter(send, []);
  const { isDarkMode } = useAntContext();
  return (
    <AiChat
      className={styles.chatComponents}
      adapter={adapter}
      personaOptions={personas}
      displayOptions={{ colorScheme: isDarkMode ? "dark" : "light" }}
    />
  );
}
