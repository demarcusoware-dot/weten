"use client";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function PayButton({ disabled, ...props }: any) {
  const pay = async () => {
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: props.email,
        amount: props.amount,
        subaccount_code: props.subaccount_code,
        booking_id: props.booking_id,
      }),
    });
    const { data } = await res.json();

    window.location.href = data?.authorization_url;
  };

  return (
    <Button
      className="bg-miaccent px-2 text-white cursor-pointer shadow-lg hover:bg-miaccent hover:ease-out hover:-translate-y-0.5   py-6 capitalize  tracking-wide font-bold"
      onClick={pay}
      disabled={disabled}
    >
      {props.label}
      <CheckCircle size={22} />
    </Button>
  );
}
