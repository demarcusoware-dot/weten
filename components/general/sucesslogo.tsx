"use client";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

interface comprops {
  link: string;
}
export default function SuccessLogo({ link }: comprops) {
  return (
    <div className="flex flex-col items-center jusitfy-center max-w-[80%] mx-auto mt-20 object-cotain">
      <Image
        alt="success.logo"
        src="/success.png"
        width={500}
        height={500}
        className="object-contain"
      />
      <p className="flex gap-2 text-lg font-bold">
        {" "}
        <CheckCircle className="text-miaccent" size={20} /> thank you for
        updating your {link}
      </p>
    </div>
  );
}
