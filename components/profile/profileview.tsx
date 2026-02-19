"use client";
import ProfileForm from "./profileform";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface profileviewprops {
  className?: string;
}
export default function ProfileView() {
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();

  return (
    <div className={""}>
      <ProfileForm />
    </div>
  );
}
