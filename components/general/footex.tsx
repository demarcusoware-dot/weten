"use client";
import Link from "next/link";
import React from "react";

interface footexprops {
  href: string;
  label: string;
}

export default function footex(props: footexprops) {
  return (
    <Link href={props.href} className="">
      {props.label}
    </Link>
  );
}
