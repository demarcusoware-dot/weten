"use client";

import Link from "next/link";
import { MessageCircle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Roomlistcard from "./roomlistcard";

interface ChatRoom {
  id: string;
  name: string;
  unread: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface ChatRoomListProps {
  rooms: ChatRoom[];
}

export default function ChatRoomList({ rooms }: ChatRoomListProps) {
  return (
    <div className="w-full flex flex-col gap-4 md:max-w-[80%] md:mx-auto  space-y-5 ">
      <div>
        {rooms &&
          rooms.map((item: any, index: number) => {
            return <Roomlistcard key={index} {...item} />;
          })}
      </div>
    </div>
  );
}
