"use client";
import { WalletForm } from "@/components/payment/walletform";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  return (
    <div className="mt-20 md:p-8">
      <p className="text-4xl text-center text-miprimary font-extrabold capitalize tracking-wide">
        we only accept momo payments now.
      </p>
      <p className="text-lg text-justify max-w-[80%] md:max-w-4xl tracking-wide leading-7 mx-auto py-5 ">
        This do not hold your money , it only create a secure account for you to
        receive money with your number only. only numbers that are meant to
        receive payment are meant to be used here. we advice you add 1% charges
        to your original hostel prices when working here here.
      </p>

      <div className="grid grid-cols-1 md:flex md:justify-center md:mt-20 md:gap-16 max-w-[80%] mx-auto ">
        <div className="max-w-full object-contain ">
          <Image
            src={"/payment.png"}
            alt="payment pic"
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>
        <WalletForm />
      </div>
    </div>
  );
}
