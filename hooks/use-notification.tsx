// hooks/useRealtimeNotifications.ts
"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

export function useRealtimeNotifications(userId?: string) {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const notification = payload.new;

          // Only show if it's for this user or broadcast
          if (
            notification.target_user_id === null ||
            notification.target_user_id === userId
          ) {
            // In-app toast
            toast(notification.message);

            // Browser notification
            // showBrowserNotification(notification.message);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
}
