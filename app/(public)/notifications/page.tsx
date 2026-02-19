"use client";
import NotificationsFeed from "@/app/dashboard/notifications/notficationlogic";
import NotificationCard from "@/app/dashboard/notifications/notficationlogic";
import { supabase } from "@/lib/supabase/client";
import { BellMinus, MailWarning } from "lucide-react";
import { useEffect, useState } from "react";

export default function page() {
  const [notices, setNotices] = useState<any>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchuser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      setUser(user);
    };
    fetchuser();
  }, []);

  useEffect(() => {}, []);
  if (!notices)
    return (
      <div className="text-4xl flex  w-full justify-center gap-4 text-miprimary font-extrabold  mt-20 text-center  capitalize">
        you have no notifications.
        <BellMinus size={34} />
      </div>
    );
  return (
    <div className="mt-20 p-4 md:p-8">
      <div>
        <NotificationsFeed key={user?.id} userId={user?.id} />
      </div>
    </div>
  );
}
