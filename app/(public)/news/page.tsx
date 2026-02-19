import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="mt-40">
      <div className="p-4 md:p-8 md:max-w-[85%] md:mx-auto">
        <Card className="shadow-lg shadow-miprimary ">
          <CardContent className="flex flex-col gap-4 p-4">
            <CardTitle className="text-2xl text-center leading-7 uppercase  font-bold text-miprimary">
              Campus news and gossips{" "}
            </CardTitle>
            <Image
              src="/logo.png"
              alt="logo"
              width={500}
              height={500}
              className="bg-gray-400 h-[30vh] obect-contain"
            />
            <CardDescription className="text-center text-lg capitalize tracking-wide leading-7 ">
              we currently working on this to give you a gist of campus updates.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
