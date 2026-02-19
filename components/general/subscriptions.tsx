"use client";
import { subscriptions } from "@/lib/constant";
import React from "react";
import SubscriptionCard from "./subscriptionscard";

export default function Subscriptions() {
  const subscription = subscriptions;

  return (
    <div id="subscriptions" className="my-30 p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 md:max-w-[85%] md:mx-auto space-y-10 md:space-y-0">
        {subscription.map((item: any, index: number) => {
          return <SubscriptionCard key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
