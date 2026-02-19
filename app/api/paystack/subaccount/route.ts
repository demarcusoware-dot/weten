import { paystack } from "@/lib/paystack";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const reference = await crypto.randomUUID();

  const {
    business_name,
    settlement_bank,
    account_number,
    percentage_charge,
    owner_id,
  } = body;

  const response = await paystack.post("/subaccount", {
    business_name,
    settlement_bank,
    reference,
    owner_id,
    account_number,
    percentage_charge,
  });

  return NextResponse.json(response.data.data);
}
