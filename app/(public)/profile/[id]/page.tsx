"use client";
import ProfileForm from "@/components/profile/profileform";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface pageprops {
  params: {
    id: string;
  };
}
export default function page(props: pageprops) {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const fetchprofile = async () => {
      const { data, error }: any = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      setProfile(data);
    };
    fetchprofile();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div>
        <ProfileForm profile={profile} id={id} />
      </div>
    </div>
  );
}
