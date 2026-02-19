"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { PackageOpen } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState<any>(null);
  const params = useParams<{ id: string }>();
  const { id } = params;

  const pay = async (email: string, amount: string) => {
    const res = await fetch("/api/paystack/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount }),
    });

    const data = await res.json();
    window.location.href = data.data.authorization_url;
  };

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

  if (id === "basic") {
    return (
      <div className="mt-16">
        <div>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={500}
            height={500}
            className="bg-clip h-[40vh] object-contain w-full bg-gray-400"
          />
        </div>
        <p className="p-4 md:p-8 md:max-w-5xl   mt-20 text-xl text-left tracking-wide leading-7">
          the basic subscriptions runs a semester , you can choose to pay per
          semester or pay yearly. we keep track of your subsciptions and when
          you do not renew the subscriptions we do not renew the subscription we
          dont take down your stuffs . we only chat your communications . so we
          dont allow people to message you. if they do , you wont see it only
          notifications.
        </p>
        <div className="p-4 mt-10">
          <Button
            onClick={() => pay(user?.email, "30000")}
            className="w-full  text-lg hover:bg-miaccent hover:-translate-y-0.5 ease-out cursor-pointer px-4 py-8 shadow-lg  font-bold bg-miaccent uppercase tracking-wide"
          >
            subscribe
            <PackageOpen size={40} />
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-16">
      <div>
        <Image
          alt="logo"
          src={"/logo.png"}
          width={500}
          height={500}
          className="bg-clip h-[40vh] object-contain w-full bg-gray-400"
        />
      </div>
      <p className="p-4 md:p-8 md:max-w-5xl   mt-20 text-xl text-left tracking-wide leading-7">
        the premium subscriptions runs a semester , you can choose to pay per
        semester or pay yearly. we keep track of your subsciptions and when you
        do not renew the subscriptions we do not renew the subscription we dont
        take down your stuffs . we only chat your communications . so we dont
        allow people to message you. if they do , you wont see it only
        notifications.
      </p>
      <div className="p-4 mt-10">
        <Button
          onClick={() => pay(user?.email, "50000")}
          className="w-full  text-lg hover:bg-miaccent hover:-translate-y-0.5 ease-out cursor-pointer px-4 py-8 shadow-lg  font-bold bg-miaccent uppercase tracking-wide"
        >
          subscribe
          <PackageOpen size={40} />
        </Button>
      </div>
    </div>
  );
}
