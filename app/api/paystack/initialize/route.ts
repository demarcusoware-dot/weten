import { paystack } from "@/lib/paystack";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, amount, subaccount_code, booking_id } = await req.json();

  const response = await paystack.post("/transaction/initialize", {
    email,
    amount: Number(amount) * 100,
    subaccount: subaccount_code,
    bearer: "subaccount",
    metadata: {
      booking_id,
      purpose: "hostel_payment",
    },
  });

  return NextResponse.json(response.data);
}
