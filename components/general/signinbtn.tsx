"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase/client";

export default function SignInBtn() {
  const [role, setRole] = useState<"student" | "manager" | null>(null);

  const handleSignIn = async (selectedRole: "student" | "manager") => {
    setRole(selectedRole);

    localStorage.setItem("selectedRole", selectedRole);
    // Trigger Google OAuth
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/hostel`,
      },
    });
    // After redirect, call:

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("Sign-in initiated as", selectedRole);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-miaccent rounded-lg shadow-lg text-white tracking-wide px-8 py-2 text-base font-bold hover:bg-miaccent">
          Log In
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-40 flex flex-col gap-2   mr-5"
      >
        <DropdownMenuItem
          className="hover:bg-miaccent text-base   "
          onClick={() => handleSignIn("student")}
        >
          Student
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-miaccent text-base "
          onClick={() => handleSignIn("manager")}
        >
          Manager
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
