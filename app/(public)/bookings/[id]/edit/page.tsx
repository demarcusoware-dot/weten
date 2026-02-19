"use client";
import BookingForm from "@/components/profile/bookingform";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page(props: PageProps) {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [booking, setBooking] = useState<any>();

  // fetches the user profile -> bookingform
  useEffect(() => {
    const fetchbooking = async () => {
      const { data, error } = await supabase
        .from("hostel_bookings")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      setBooking(data);
    };
    fetchbooking();
  }, []);

  return (
    <section className="mt-20 p-8">
      <BookingForm booking={booking} />{" "}
    </section>
  );
}
