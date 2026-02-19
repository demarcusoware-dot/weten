"use client";
import BookingCard from "@/components/bookings/bookingcard";
import { supabase } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [bookings, setBookings] = useState<any>(null);

  useEffect(() => {
    const fetchbookings = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user?.id) return;
      const { data: hostels, error } = await supabase
        .from("hostels")
        .select("*")
        .eq("manager_id", user.id);

      console.log(hostels);
      if (!hostels || hostels.length === 0) {
        setBookings([]);
        return;
      }

      // filter out the ids
      let hostelsIds = hostels?.map((h) => h.id);

      const { data, error: bookingError } = await supabase
        .from("hostel_bookings")
        .select("*")
        .in("hostel_id", hostelsIds);

      setBookings(data);
      console.log(bookings);
    };
    fetchbookings();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4 justify-between">
        {bookings?.map((item: any, index: number) => {
          return <BookingCard key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
