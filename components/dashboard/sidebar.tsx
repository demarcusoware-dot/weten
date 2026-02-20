"use client";

import {
  Home,
  MessageSquare,
  CreditCard,
  Bell,
  FileText,
  Menu,
  X,
  BarChart4,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "Home", href: "/hostel", icon: Home },
  { name: "Analytics", href: "/dashboard", icon: BarChart4 },
  { name: "Messages", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Payments", href: "/payments/paymentlist", icon: CreditCard },
  { name: "bookings", href: "/dashboard/bookings", icon: Bell },
  { name: "Contents", href: "/dashboard/content", icon: FileText },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-20">
      
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-2 z-50 md:hidden bg-miprimary text-white p-2 rounded-lg"
      >
        <Menu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50 top-0 left-0 h-screen
          bg-white shadow-lg transition-all duration-300
          flex flex-col items-center
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-30 md:w-20 md:hover:w-64 group
        `}
      >
        <div className="flex flex-col items-center  p-4 h-full">
          {/* Close (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="self-end mb-6 md:hidden"
          >
            <X />
          </button>

          {/* Logo */}
          <Image
            src="/logo-icon.png"
            width={40}
            height={40}
            alt="logo"
            priority
            className="mb-10 "
          />

          {/* Nav */}
          <nav className="flex flex-col gap-8 w-full">
            {links.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-miprimary hover:text-white"
              >
                <Icon />
                <span className="hidden md:group-hover:inline font-bold uppercase">
                  {name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
