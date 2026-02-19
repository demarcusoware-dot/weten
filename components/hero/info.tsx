"use client";
import { BookOpen, Coffee, Droplet, Toilet, Wifi, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";
import Heading3 from "../general/heading3";
import Heading2 from "../general/heading2";

export type Amenity = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export const amenities: Amenity[] = [
  { id: "wifi", label: "Wi‑Fi", icon: <Wifi className="h-10 w-10" /> },
  {
    id: "study-room",
    label: "Study room",
    icon: <BookOpen className="h-10 w-10" />,
  },

  {
    id: "free-electricity",
    label: "Free electricity",
    icon: <Zap className="h-10 w-10" />,
  },
  {
    id: "attached-washroom",
    label: "Attached washroom",
    icon: <Toilet className="h-10 w-10" />,
  },
  {
    id: "clean-water",
    label: "Clean drinking water",
    icon: <Droplet className="h-10 w-10" />,
  },
  {
    id: "relaxation-spot",
    label: "Relaxation spot",
    icon: <Coffee className="h-10 w-10" />,
  },
];

export default function HeroInfo() {
  return (
    <section className="my-30 md:flex  md:flex-row-reverse ">
      <div
        id="more-info"
        className="w-full    bg-miprimary/75 bg-gradient-to-r flex items-center justify-center flex-col from-misecondary/80 md:h-[screen] md:py-20 md:p-8 p-4 "
      >
        <Heading2
          className=" capitalize text-4xl text-right text-white  md:text-5xl max-w-[80%]   leading-0.7 tracking-wide p-4"
          text="Eco-friendly student's housing with all essentials included"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 my-10 items-center justify-center ">
          {amenities.map((item, index) => {
            return <InfolistItem key={index} {...item} />;
          })}
        </div>
      </div>
      <div className=" max-w-full  md:h-screen  w-full  object-cover">
        <Image
          src="/info.jpg"
          alt="info"
          width={750}
          height={500}
          className="w-full  md:h-screen object-cover "
        />
      </div>
    </section>
  );
}

interface infoprops {
  icon: any;
  label: string;
}
const InfolistItem = (props: infoprops) => {
  return (
    <div className="">
      <div className="flex items-center flex-col gap-4">
        <div className="rounded-full text-white  bg-miprimary p-4 w-18">
          {props.icon}
        </div>
        <p className="capitalize text-base text-miaccent  text-wrap text-center">
          {props.label}
        </p>
      </div>
    </div>
  );
};
