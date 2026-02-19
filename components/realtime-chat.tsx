"use client";

import { cn } from "@/lib/utils";
import { ChatMessageItem } from "@/components/chat-message";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useRealtimeChat } from "@/hooks/use-realtime-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface RealtimeChatProps {
  roomName: string;
  username: string;
  onMessage?: (messages: ChatMessage[]) => void;
  messages?: ChatMessage[];
}

export type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    email: string;
    name?: string;
  };
};

export const RealtimeChat = ({
  roomName,
  username,
  onMessage,
  messages: initialMessages = [],
}: RealtimeChatProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    username,
  });

  const [dbMessages, setDbMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select(
          `
        id,
        message,
        created_at,
        username
      `
        )
        .eq("room_id", roomName)
        .order("created_at", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      const formatted: ChatMessage[] = data.map((m) => ({
        id: m.id,
        content: m.message,
        createdAt: m.created_at,
        user: {
          email: m.username,
        },
      }));

      setDbMessages(formatted);
    };

    fetchMessages();
  }, [roomName]);

  // Merge realtime messages with initial messages
  const allMessages = useMemo(() => {
    const merged = [...dbMessages, ...realtimeMessages];

    const unique = merged.filter(
      (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
    );

    return unique.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }, [dbMessages, realtimeMessages]);

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !isConnected) return;
      sendMessage(newMessage);

      await supabase.from("chat_messages").insert({
        room_id: roomName,
        message: newMessage,
        username: username,
      });
      setNewMessage("");
    },
    [newMessage, isConnected, sendMessage]
  );

  return (
    <div className="flex flex-col  w-full bg-background shadow-lg shadow-miprimary rounded-lg text-foreground antialiased">
      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground ">
            No messages yet. Start the conversation!
          </div>
        ) : null}
        <div className="space-y-1  h-[64vh] ">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null;
            const showHeader =
              !prevMessage || prevMessage.user.email !== message.user.email;

            return (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ChatMessageItem
                  message={message}
                  isOwnMessage={message.user.email === username}
                  showHeader={showHeader}
                />
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex w-full  border-t border-border p-4 items-center gap-4"
      >
        <Input
          className={cn(
            "rounded-lg shadow-lg px-4 py-8 bg-background text-sm transition-all duration-300",
            isConnected && newMessage.trim() ? "w-[calc(100%-36px)]" : "w-full"
          )}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        {isConnected && newMessage.trim() && (
          <Button
            className="flex items-center bg-miaccent hover:bg-miaccent   rounded-full animate-in fade-in slide-in-from-right-4 duration-300 "
            type="submit"
            disabled={!isConnected}
          >
            <Send className="flex items-center justify-center" size={40} />
          </Button>
        )}
      </form>
    </div>
  );
};
