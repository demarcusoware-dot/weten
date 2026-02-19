"use client";

import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { seteuid } from "process";
import { useEffect, useState } from "react";

export default function SiteFooter() {
  const [user, setUser] = useState<any>(null);

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

  return (
    <footer className="w-full  border-t  bg-miprimary ">
      <div className="p-12  grid grid-cols-2 lg:grid-cols-3  md:max-w-[85%] md:gap-8 md:mx-auto justify-center ">
        {/* Column 1 */}
        <div className=" md:p-8">
          <h3 className="text-2xl font-extrabold  text-white p-4 ">
            Navigation
          </h3>
          <ul className="space-y-2 text-white text-base md:text-lg p-4  flex  flex-col gap-4">
            <li>
              <Link href="/" className="hover:text-misecondary text-white">
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="hover:text-misecondary text-white"
              >
                Manage Hostel
              </Link>
            </li>
            <li>
              <Link
                href="#subscriptions"
                className="hover:text-misecondary text-white"
              >
                Subscriptons
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-misecondary text-white"
                href="/hostel"
              >
                Book a Hostel
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-misecondary text-white"
                href="/hostel"
              >
                Search
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className=" md:p-8">
          <h3 className="text-2xl font-extrabold  p-4  text-white">Discover</h3>
          <ul className="space-y-2 text-white text-base md:text-lg p-4  flex flex-col gap-4">
            <li>
              <Link
                href="#top-rated"
                className="hover:text-misecondary text-white"
              >
                Top Rated Hostels
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-misecondary text-white">
                Campus Gossips
              </Link>
            </li>
            <li>
              <Link
                href="#more-info"
                className="hover:text-misecondary text-white"
              >
                More Info
              </Link>
            </li>

            <li>
              <Link
                href="#testimonials"
                className="hover:text-misecondary text-white"
              >
                testimonials
              </Link>
            </li>

            <li>
              <Link href="/hostel" className=" text-white">
                Hostels
              </Link>
            </li>
          </ul>
        </div>
        {/* Column 3 */}
        <div className=" md:p-8">
          <h3 className="text-2xl font-extrabold  p-4  text-white">Support</h3>
          <ul className="space-y-2  text-base md:text-lg p-4 flex flex-col gap-4">
            <li>
              <Link
                href={`/chat/${"scalf.io" + user?.id}?roomName=${
                  user?.id
                }&username=${user?.email}`}
                className="hover:text-misecondary text-white"
              >
                Help center
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-misecondary text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/policy"
                className="hover:text-misecondary text-white"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-miaccent font-extrabold p-6">
        © {new Date().getFullYear()} Scalf.io. All rights reserved.
      </div>
      <a
        href="https://www.flaticon.com/free-icons/success"
        title="success icons"
      >
        Success icons created by Talha Dogar - Flaticon
      </a>
    </footer>
  );
}
