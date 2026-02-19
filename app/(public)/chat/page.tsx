"use client";
import ChatRoomList from "@/app/dashboard/chat/chatroomlist";
import { supabase } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [rooms, setRooms] = useState<any>(null);
  const data = [
    {
      id: "1",
      name: "marcusgideon@gmail.com",
      unread: 2,
      lastMessage: "this is marcus",
      lastMessageTime: "8:32pm",
    },
    {
      id: "2",
      name: "gideon@gmail.com",
      unread: 1,
      lastMessage: "marcus",
      lastMessageTime: "8:32pm",
    },
    {
      id: "3",
      name: "marceon@gmail.com",
      unread: 2,
      lastMessage: "this is marcus dsafajofij ioajio ",
      lastMessageTime: "8:32pm",
    },
    {
      id: "4",
      name: "pricy@gmail.com",
      unread: 2,
      lastMessage: "this is pricy",
      lastMessageTime: "8:32pm",
    },
    {
      id: "5",
      name: "owarecus@gmail.com",
      unread: 2,
      lastMessage: "big boys",
      lastMessageTime: "8:32pm",
    },
  ];
  useEffect(() => {
    const getrooms = async () => {
      const { data, error } = await supabase.from("chat_rooms").select("*");
      setRooms(data);
    };
    getrooms();
  }, []);

  return (
    <div className="mt-20">
      <div className="p-4">
        <ChatRoomList rooms={rooms} />
      </div>
    </div>
  );
}
