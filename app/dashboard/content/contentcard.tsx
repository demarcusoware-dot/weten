"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface contentprops {
  label: string;
  icon: any;
  href: string;
}

export default function ContentCard(props: contentprops) {
  return (
    <Link className="" href={props.href}>
      <Card className="max-w-5xl shadow-lg shadow-misecondary">
        <CardHeader className="">
          <CardTitle className="text-4xl uppercase  text-miprimary font-bold">
            {props.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-2xl ">{props.icon}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
