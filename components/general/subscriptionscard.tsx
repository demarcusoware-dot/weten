"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import {
  AlignVerticalJustifyEndIcon,
  BookCheck,
  BookMarked,
  ChartCandlestick,
  ChartNetwork,
  CheckCircle,
  Currency,
  DollarSign,
  LucideCurrency,
  PlaneTakeoff,
} from "lucide-react";
import { currencyfunc } from "../../lib/utils ";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface subscriptioncardprops {
  id: string;
  label: string;
  details: any[];
  amount: string;
}

export default function SubscriptionCard(props: subscriptioncardprops) {
  const router = useRouter();

  return (
    <div className="shadow-lg shadow-miprimary rounded-lg">
      <Card className="rounded-lg">
        <CardHeader className="text-3xl uppercase">
          <CardTitle className="text-4xl text-center font-extrabold text-clip text-miprimary tracking-wide ">
            {props.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 space-y-5 relative">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={500}
            height={500}
            className="bg-clip h-[30vh] object-contain w-full bg-gray-400"
          />
          <div className="flex flex-col gap-4 md:p-8 relative  flex-wrap  shadow-lg p-2 rounded-lg">
            <p className="capitalize bg-misecondary  text-base text-white rounded-xs shadow-lg shadow-misecondary  p-4 max-w-[200px] absolute  -right-5 -top-15 ml-auto">
              {currencyfunc(props.amount)}/ semester
            </p>
            {props.details.map((item, index) => {
              return (
                <div key={index} className="flex items-start gap-4 ">
                  <CheckCircle size={28} className="text-misecondary" />
                  <CardDescription className="capitalize text-lg leading-7 tracking-wide">
                    {item.content}
                  </CardDescription>
                </div>
              );
            })}
          </div>
          <CardAction className="w-full">
            <Button
              onClick={() => router.push(`subscription/${props.label}`)}
              className="w-full text-lg hover:bg-miaccent hover:-translate-y-0.5 ease-out cursor-pointer px-4 py-8 shadow-lg  font-bold bg-miaccent capitalize tracking-wide"
            >
              choose plan
              <BookCheck size={30} />
            </Button>
          </CardAction>
        </CardContent>
      </Card>
    </div>
  );
}
