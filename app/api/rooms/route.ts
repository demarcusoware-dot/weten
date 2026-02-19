// import { put } from "@vercel/blob";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const files = formData.getAll("files") as File[];

//   const urls: string[] = [];

//   for (const file of files) {
//     const blob = await put(
//       `hostels/${crypto.randomUUID()}-${file.name}`,
//       file,
//       { access: "public" }
//     );

//     urls.push(blob.url);
//   }

//   return NextResponse.json({ urls });
// }

import { supabase } from "@/lib/supabase/client"; // make sure this points to your Supabase client
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  const urls: string[] = [];

  for (const file of files) {
    // Generate a unique path
    const filePath = `hostels/${crypto.randomUUID()}-${file.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("scalf.io-bucket") // replace with your bucket name
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Error uploading file:", error.message);
      continue; // skip this file if upload fails
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("scalf.io-bucket")
      .getPublicUrl(filePath);

    urls.push(publicUrlData.publicUrl); // publicUrlData has the publicUrl property

    console.log(urls);
  }

  return NextResponse.json({ urls });
}
