"use client";

import Hostelcard from "./upload/hostelidcard";
import HostelSearch from "./hostelsearctbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function page() {
  const [hostels, setHostels] = useState<any>(null);

  useEffect(() => {
    const fetchhostels = async () => {
      const { data, error } = await supabase.from("hostels").select("*");
      setHostels(data);
    };
    fetchhostels();
  }, []);

  return (
    <section className="w-full">
      <div className="max-w-[93%] mx-auto">
        <div className="pt-10">
          <h2 className="text-4xl text-left   pt-10 capitalize  text-misecondary font-extrabold tracking-wide ">
            search for all hostels , homstels and apartments listing on your
            campus here.
          </h2>
          <HostelSearch hostels={hostels} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 item-center    lg:grid-cols-3 gap-4 space-y-10 md:space-y-0  py-10 ">
          {hostels?.map((item: any, index: number) => {
            return <Hostelcard key={index + item.label} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
}
