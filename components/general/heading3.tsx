import { cn } from "@/lib/utils";
import React from "react";
interface headingprops {
  text: string;
  className?: string;
}

export default function Heading3(props: headingprops) {
  return (
    <h4 className={cn(`text-lg md:text-xl  leading-tight `, props.className)}>
      {props.text}
    </h4>
  );
}
