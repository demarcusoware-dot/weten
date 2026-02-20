// import { paystack } from "@/lib/paystack";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, amount } = await req.json();

//     const response = await paystack.post("/transaction/initialize", {
//       email,
//       amount,
//     });

//     return NextResponse.json(response.data);
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to initialize transaction" },
//       { status: 500 }
//     );
//   }
// }
