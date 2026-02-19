"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Image from "next/image";

interface testprops {
  message: string;
  author: string;
}
export function TestimonialCard(props: testprops) {
  return (
    <Card className="relative rounded-lg  shadow-lg shadow-misecondary bg-card p-4 overflow-hidden ">
      {/* Faint Background Quote Icon */}
      <Quote className="absolute top-4 right-0 h-12 w-12 text-miprimary opacity-20 p-2" />

      <CardHeader className="relative z-10 p-0">
        <p className="text-xl text-gray-800 leading-relaxed max-w-[90%]">
          “{props.message}”
        </p>
      </CardHeader>

      <CardContent className="relative z-10 mt-4 p-0">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={200}
          className="opacity-40"
        />
        <p className="font-semibold text-lg text-miprimary font-bold text-right">
          — {props.author}
        </p>
      </CardContent>
    </Card>
  );
}
