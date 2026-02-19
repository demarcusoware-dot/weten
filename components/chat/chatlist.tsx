"use client";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils ";
import { useEffect, useState } from "react";

interface chatlistprops {
  className?: string;
  hostels: any;
}

export default function chatlist(props: chatlistprops) {
  const [user, setUser] = useState<any>(null);
  const [rooms, setRooms] = useState<any>(null);

  useEffect(() => {
    const fetchuser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
    };
    fetchuser();
  }, []);

  useEffect(() => {
    if (user?.id) return;
    const fetchrooms = async () => {
      const { data: rooms, error: roomsError } = await supabase
        .from("rooms")
        .select("*")
        .eq("created_by", user.id);
    };
  }, [user]);

  return (
    <div className={cn("", props.className)}>
      <div></div>
    </div>
  );
}
