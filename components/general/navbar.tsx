"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileNav from "./menubar";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchuser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser((prev: any) => data.user);
    };
    fetchuser();
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("selectedRole");
    if (!user?.id) return;

    const updateuserrole = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      setProfile(data);
      if (!role) return;
      await supabase.from("profiles").update({ role }).eq("id", user?.id);
    };
    updateuserrole();
  }, [user]);

  return (
    <section className="text-miaccent w-full  mx-auto h-16 fixed top-0 left-0 z-50 flex items-center gap-4 justify-between p-4 bg-miprimary ">
      <div className=" object-contain ">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={60}
          className=" p-2 object-cover bg-gray-400  shadow-lg"
        />
      </div>
      <div className="flex gap-4 items-center">
        {profile?.role == "manager" && (
          <Link
            className="text-lg hover:underline hover:underline-miaccent underline-offset-6"
            href={"/dashboard"}
          >
            dashboard
          </Link>
        )}
        <MobileNav />
      </div>
    </section>
  );
}
