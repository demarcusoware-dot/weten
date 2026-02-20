// // import { del } from "@vercel/blob";
// // import { NextResponse } from "next/server";

// // export async function POST(req: Request) {
// //   const { pathname } = await req.json();

// //   await del(pathname);

// //   return NextResponse.json({ success: true });
// // }

// import { supabase } from "@/lib/supabase/client";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { pathname } = await req.json();

//   if (!pathname) {
//     return NextResponse.json({
//       success: false,
//       error: "No file path provided",
//     });
//   }

//   const { data, error } = await supabase.storage
//     .from("scalf.io-bucket") // replace with your bucket name
//     .remove([pathname]); // remove expects an array of file paths

//   if (error) {
//     console.error("Error deleting file:", error.message);
//     return NextResponse.json({ success: false, error: error.message });
//   }

//   return NextResponse.json({ success: true });
// }
