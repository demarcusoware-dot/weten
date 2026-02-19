import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn, currencyfunc } from "@/lib/utils";
import Image from "next/image";

interface paymentcardprops {
  className?: string;
  email: string;
  amount: string;
  created_at: string;
}

export default function PaymentCard(props: paymentcardprops) {
  const editeddate = new Date(props.created_at);
  return (
    <div className={cn("p-2 ", props.className)}>
      <Card className=" shadow-lg shadow-miprimary">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-miprimary text-center tracking-wide">
            Payments
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Image
            className="w-full bg-gray-400 opacity-30 h-full object-cover  "
            src={"/logo.png"}
            alt="logog gogo "
            width={500}
            height={500}
          />
          -+{" "}
          <div className="flex flex-col gap-4 z-10 bg-white/80 ">
            <div className="flex items-center justify-between">
              <p className="text-lg tracking-wide capitalize">email</p>
              <CardDescription className="text-lg tracking-wide ">
                {props.email}
              </CardDescription>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg tracking-wide capitalize">amount</p>
              <CardDescription className="text-lg tracking-wide capitalize">
                {currencyfunc(props.amount)}
              </CardDescription>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg tracking-wide capitalize">created at</p>
              <CardDescription className="text-lg tracking-wide">
                {editeddate.toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
