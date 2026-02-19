"use client";
import { cn } from "../../lib/utils ";
import React from "react";
import Heading2 from "../general/heading2";
import { Text } from "../general/text";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface heroprops {
  className?: string;
}
export default function Hero(props: heroprops) {
  return (
    <section
      className={cn(
        "md:flex md:items-center max-w-[90%] font-sans md:max-w-[70%] mx-auto md:jusity-center md:pt-10 w-full md:gap-4 ",
        props.className
      )}
    >
      <div className="flex  flex-col gap-4 p-4 max-w-4xl md:p-12 ">
        <Heading2
          text="Access thousands of supervised, modern hostels nationwide."
          className=" capitalize text-miprimary font-sans text-left text-4xl  md:text-5xl  tracking-wide leading-0.7 font-bold "
        />
        <Text
          className=" text-lg  text-left font-sans"
          text="Clean, affordable student hostels in safe and secure environments. "
        />
      </div>
      <div className="max-w-full h-[50vh] object-cover ">
        <Image
          src="/hero.png"
          alt="logo"
          width={500}
          height={500}
          className="  h-[50vh] object-cover"
          priority={true}
        />
      </div>
    </section>
  );
}
