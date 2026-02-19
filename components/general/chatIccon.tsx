"use client";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface chaticonprops {
  receiverId?: string;
}

export default function ChatIcon(props: chaticonprops) {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchuser = async () => {
      const { data }: any = await supabase.auth.getUser();
      setUser((prev: any) => data.user);
    };
    fetchuser();
  }, []);

  return (
    <Link
      href={`/chat/${user?.id}?roomName=${user?.id}&username=${
        user?.email
      }&to=${"owaremarcuskofi@gmail.com"}`}
      className="absolute bottom-5 right-5 z-40 fixed max-w-25   object-contain p-2"
    >
      {pathname.startsWith("/hostel/") || pathname.startsWith("/chat") ? (
        <div
          className={`object-contain w-10 h-10 shadow-lg rounded-full  bg-miaccent p-1 flex items-center justify-center hidden `}
        >
          <Image
            src="/icons.png"
            alt="icon"
            width={200}
            height={200}
            className="text-miaccent w-10 h-10  object-contain"
          />
        </div>
      ) : (
        <div className="object-contain w-15 h-15 shadow-lg rounded-full bg-miaccent p-3 flex items-center justify-center">
          <Image
            src="/icons.png"
            alt="icon"
            width={400}
            height={400}
            className="text-miaccent w-15 h-15  object-contain"
          />
        </div>
      )}
    </Link>
  );
}
