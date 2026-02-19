"use client";
import BookingCard from "@/components/bookings/bookingcard";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function page() {
  const [bookings, setBookings] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user?.id) return;

      // fetch the profile roles
      const { data, error: profileError }: any = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (!data?.role) return;

      if (data?.role === "student") {
        const { data: booking, error: bookingError } = await supabase
          .from("hostel_bookings")
          .select("*")
          .eq("student_id", user?.id);
        setBookings(booking);
      } else {
        const { data: booking, error: bookingError } = await supabase
          .from("hostel_bookings")
          .select("*")
          .eq("hostel_id", data?.hostel_id)
          .order("created_at");
        setBookings(booking);
      }
    };
    fetchUser();
  }, []);

  if (bookings?.length === 0)
    return (
      <div className="w-full mt-30  h-[80vh]   relative ">
        <div className=" h-[75vh] object-contain absolute ">
          <Image
            src="/logo-icon.png"
            alt="logo"
            width={400}
            height={400}
            className="blur-md w-full h-[50vh] opacity-40 animate-pulse object-contain "
          />
        </div>
        <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-misecondary to-miprimary bg-clip-text text-transparent text-center">
          You have no bookings
        </p>
      </div>
    );

  return (
    <section className="">
      <div className="mt-20  flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:items-start p-4 ">
        {bookings?.map((item: any, index: number) => {
          return <BookingCard key={index} hostel={item} />;
        })}
      </div>
    </section>
  );
}
