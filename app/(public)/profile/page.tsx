"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchuser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    fetchuser();
  }, []);

  useEffect(() => {
    const fetchprofile = async () => {
      if (!user?.id) return;
      const { data: data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    };
    fetchprofile();
  }, [user]);

  return (
    <div className="mt-20 text-black p-4 md:p-8 md:max-w-[80%] md:mx-auto  ">
      <Card>
        <CardContent>
          {/* name */}
          <div className="w-full h-[40vh]  obect-contain">
            <Image
              src={user?.user_metadata?.picture ?? "/logo.png"}
              alt={"cover image"}
              className="object-cover h-[40vh] w-full"
              width={500}
              height={200}
            />
          </div>
          <div className="flex flex-col text-lg pt-5 gap-4">
            <CardTitle>Profile</CardTitle>
            <div>
              <p>name</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.full_name}
              </CardDescription>
            </div>
            {/* email */}
            <div>
              <p>email</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.email}
              </CardDescription>
            </div>
            {/* contact */}
            <div>
              <p>contact</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.contact}
              </CardDescription>
            </div>
            {/* school */}
            <div>
              <p>school</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.school}
              </CardDescription>
            </div>
            {/* level */}
            <div>
              <p>level or year in school</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.level}
              </CardDescription>
            </div>
            {/* budget */}
            <div>
              <p>budget for hostels </p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.budget}
              </CardDescription>
            </div>
            {/* country */}
            <div>
              <p>Nationality</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.from_country}
              </CardDescription>
            </div>
            {/* bio */}
            <div>
              <p>your bio</p>
              <CardDescription className="shadow-lg rounded-lg p-2">
                {profile?.bio}
              </CardDescription>
            </div>
            <div className="w-full">
              <Button
                className="bg-miaccent/80 text-xl text-white px-8 py-6 cursor-pointer hover:bg-miaccent font-bold tracking-wide shadow-lg hover:-translate-y-0.5 duration-500 ease-out w-full"
                onClick={() => router.push(`/profile/${user?.id}`)}
              >
                update your profile
                <UploadCloud size={22} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
