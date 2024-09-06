import { ChatComponent, PageLk, PageLkTitle } from "../../../../shared/components";
import "@nlux/themes/nova.css";

export function Chat() {
  return (
    <PageLk title={<PageLkTitle title="Chat page" />}>
      <ChatComponent />
    </PageLk>
  );
}
