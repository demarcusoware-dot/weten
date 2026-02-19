"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

export default function JoinNewsletter() {
  return (
    <section className="p-8  max-w-[95%] mx-auto bg-misecondary rounded-lg my-30 md:max-w-[95%] md:mx-auto">
      <div className="w-full flex items-center justify-center gap-4  ">
        <Input
          className="w-full bg-white py-8 px-4"
          placeholder="example@gmail.com"
        />
        <Button
          onClick={() => toast.success("you joined successfully!.")}
          className="text-lg text-card bg-miaccent capitalize font-bold py-8 px-8"
        >
          <PlusCircle size={22} />
          join
        </Button>
      </div>
    </section>
  );
}
