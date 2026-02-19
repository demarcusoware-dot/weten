"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const navs = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "hostels",
    href: "/hostel",
  },
  {
    label: "bookings",
    href: "/booking",
  },
  {
    label: "dashboard",
    href: "/dashboard",
  },
];
export default function Navlist() {
  const router = useRouter();

  return (
    <div className="">
      <div className="flex gap-2">
        {navs.map((item, index) => {
          return (
            <Button
              key={index}
              onClick={() => router.push(`${item.href}`)}
              className="bg-blue-400 text-lg font-bold "
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
