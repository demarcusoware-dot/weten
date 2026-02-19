import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { createClient } from "@/lib/supabase/server";
import ChatRoomList from "@/app/dashboard/chat/chatroomlist";

interface chatidprops {
  className?: string;
  label: string;
  userName: string;
  roomName: string;
  avatar: string;
}
export default async function chatId(props: chatidprops) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const fetchedChatRooms: any = await supabase
    .from("chat-rooms")
    .select("*")
    .eq("created_by", user?.id)
    .maybeSingle();

  return (
    <div className="">
      <Card className="">
        <CardContent className="">
          {fetchedChatRooms &&
            fetchedChatRooms.map((item: any, index: number) => {
              return <ChatRoomList {...item} key={index} />;
            })}
        </CardContent>
      </Card>
    </div>
  );
}
