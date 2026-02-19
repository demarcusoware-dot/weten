import { paystack } from "@/lib/paystack";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ reference: string }> }
) {
  const { reference } = await context.params;

  const response = await paystack.get(`/transaction/verify/${reference}`);

  return NextResponse.json(response.data);
}
