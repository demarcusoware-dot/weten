"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RealtimeChat } from "@/components/realtime-chat";
import { supabase } from "@/lib/supabase/client";
import { ChatMessage } from "@/hooks/use-realtime-chat";
import { id } from "date-fns/locale";
import Image from "next/image";

interface pageprops {
  params: {
    id: string;
  };
}
export default function Page(props: pageprops) {
  const params = useParams<{ id: string }>();
  const roomName = params.id;
  const [username, setUsername] = useState<string | any>("");
  const [previousMessages, setPreviousMessages] = useState<ChatMessage[]>([]);
  const [mdata, setMdata] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUsername(data.user?.email ?? "anonymous");
    };
    getUser();
  }, []);

  useEffect(() => {
    const ensureRoomExists = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // try insert; ignore if already exists
      await supabase.from("chat_rooms").upsert({
        id: roomName,
        created_by: user.id,
      });
    };

    ensureRoomExists();
  }, [roomName]);

  useEffect(() => {
    const loadMessages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setMdata((prev: any) => user);
      setUsername(user?.email ?? "anonymous");
      const { data, error } = await supabase
        .from("chat_messages")
        .select(
          `
          id
          message
          created_at
          username
`
        )
        .eq("room_id", username + roomName)
        .order("created_at");

      const formatted: ChatMessage[] = mdata?.map((m: any) => ({
        id: m.id,
        content: m.message,
        createdAt: m.created_at,
        user: {
          email: m.username ?? "anonymous",
        },
      }));

      setPreviousMessages(formatted);
    };
    loadMessages();
  }, [username, roomName]);

  return (
    <div className="w-full h-screen p-4 md:p-6 mt-20 md:max-w-[60%] relative md:mx-auto gap-4 flex flex-col ">
      <Image
        src={"/logo.png"}
        alt=""
        width={500}
        height={200}
        className="w-full h-20 bg-gray-400 object-cover p-2 "
      />
      <p className="text-2xl capitalize text-miprimary text-center  ">
        {roomName.startsWith("scalf.io") && "Welcome to our supports"}
      </p>
      <RealtimeChat
        username={username}
        roomName={roomName}
        messages={previousMessages}
      />
    </div>
  );
}
