import Image from "next/image";
import React from "react";

export default function LastImage() {
  return (
    <div className=" w-full max-w-full md:max-w-[85%] md:mx-auto my-30">
      <Image
        className="object-cover w-full max-w-full h-auto"
        src="/shadow.png"
        alt="shadow"
        width={1000}
        height={1000}
      />
    </div>
  );
}
