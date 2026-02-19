import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { supabase } from "./supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyfunc(value: any) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "code",
    maximumFractionDigits: 2,
  }).format(value);
}


// /**
//  * Create (or get) a chat room for a user
//  */

// export async function getOrCreateChatRoom(userId: string) {
//   // Check if room already exists
//   const { data: existingRoom } = await supabase
//     .from("chat_rooms")
//     .select("id")
//     .eq("user", userId)
//     .single();

//   if (existingRoom) {
//     return existingRoom.id;
//   }

//   // Create new room
//   const { data: newRoom, error } = await supabase
//     .from("chat_rooms")
//     .insert({
//       user: userId,
//     })
//     .select("id")
//     .single();

//   return newRoom?.id;
// }

// /**
//  * Create a chat message
//  */
// export async function createChatMessage({
//   roomId,
//   senderId,
//   message,
// }: {
//   roomId: string;
//   senderId: string;
//   message: string;
// }) {
//   await supabase.from("chat_messages").insert({
//     room_id: roomId,
//     sender_id: senderId,
//     message,
//   });
// }
