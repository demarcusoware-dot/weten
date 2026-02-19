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
  const [profile, setProfile] = useState<any>();
  const [hostel, setHostel] = useState<any>();
  const params = useParams<{ id: string }>();
  const { id } = params;

  // fetches the user profile -> bookingform
  useEffect(() => {
    const fetchhostel = async () => {
      // this is
      const { data, error } = await supabase
        .from("hostels")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // check if the user variable is available.
      if (!user?.id) return;
      const prof = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(prof.data);
      setHostel(data);
    };
    fetchhostel();
  }, [id]);

  return (
    <section className="mt-20 p-8">
      <BookingForm hostel={hostel} profile={profile} />{" "}
    </section>
  );
}
