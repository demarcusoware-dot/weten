"use client";

import { useEffect, useState } from "react";
import NotificationCard from "./notficationcard";
import { supabase } from "@/lib/supabase/client";

interface NotificationsFeedProps {
  userId?: string; // current logged-in user
}

interface Notification {
  id: string;
  title?: string;
  message: string;
  type: "info" | "warning" | "success"; // your existing schema types
  created_by: string;
  created_at: string;
}

export default function NotificationsFeed({ userId }: NotificationsFeedProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 1️⃣ Fetch previous notifications from DB (excluding the creator)
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .neq("created_by", userId) // exclude notifications created by self
        .order("created_at", { ascending: false }); // latest first

      if (error) {
        console.error("Error fetching notifications:", error);
      } else if (data) {
        setNotifications(data as Notification[]);
      }
    };

    fetchNotifications();
  }, [userId]);

  // 2️⃣ Subscribe to real-time notifications
  useEffect(() => {
    if (!userId) return;

    const subscription = supabase
      .channel("public:notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const newNotification = payload.new as Notification;

          // only broadcast to others, not the creator
          if (newNotification.created_by !== userId) {
            setNotifications((prev) => [newNotification, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return (
    <div className="flex flex-col gap-2">
      {notifications.length === 0 && <p>No notifications yet</p>}
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          title={n?.title ?? ""}
          message={n.message}
          time={new Date(n.created_at).toLocaleString()}
          unread={true} // since we are not tracking per-user read yet
        />
      ))}
    </div>
  );
}
