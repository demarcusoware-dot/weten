"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { HousePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const roomSchema = z.object({
  room_type: z.string().min(1, "Room type is required"),
  price: z.string(),
  hostel_name: z.string(),
});

export type RoomValues = z.infer<typeof roomSchema>;

export function HostelRoomForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const form = useForm<RoomValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      room_type: "",
      price: "",
      hostel_name: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("files", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Room image upload failed");
      setUploading(false);
      return;
    }

    const { urls } = await res.json();
    setImageUrl(urls[0]);
    setUploading(false);
  };

  const onSubmit = async (data: RoomValues) => {
    if (!imageUrl) {
      form.setError("room_type", { message: "Room image is required" });
      return;
    }
    const payload = {
      ...data,
      image: imageUrl,
    };
    console.log(payload);
    const { data: room, error }: any = await supabase
      .from("hostels")
      .select("rooms")
      .eq("label", payload.hostel_name.toLowerCase);

    if (!data?.hostel_name) return;
    await supabase
      .from("hostels")
      .update({ rooms: [...room, payload] })
      .eq("label", payload.hostel_name.toLowerCase());

    form.reset();
    setImageUrl(null);
    form.reset();
    router.push("/hostel");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-center">
          Add room various prices for your hostel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 text-lg"
          >
            {/* Hostel name */}
            <FormField
              control={form.control}
              name="hostel_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="py-2 text-lg">hostel name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="always add either hostel or homstel to your hostel name"
                      className="px-4 py-8"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="py-2 text-lg">Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      className="px-4 py-8"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormItem className="py-3">
              <FormLabel className="py-2 text-lg">Room Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                className="px-4 py-8"
                disabled={uploading}
                onChange={handleImageUpload}
              />
              {uploading && (
                <p className="text-sm text-muted-foreground mt-1">
                  Uploading image…
                </p>
              )}
              {imageUrl && (
                <div className="mt-3">
                  <img
                    src={imageUrl}
                    alt="Room"
                    className="h-32 w-full rounded object-cover"
                  />
                </div>
              )}
            </FormItem>
            {/* Room Type */}
            <FormField
              control={form.control}
              name="room_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="py-2 text-lg">Room Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="px-4 py-3">
                        <SelectValue placeholder="Select Room Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 in 1">1 in 1</SelectItem>
                        <SelectItem value="2 in 1">2 in 1</SelectItem>
                        <SelectItem value="3 in 1">3 in 1</SelectItem>
                        <SelectItem value="4 in 1">4 in 1</SelectItem>
                        <SelectItem value="5 in 1">5 in 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="px-4 py-8 bg-miaccent hover:bg-miaccent text-lg"
              disabled={uploading}
            >
              Add Room
              <HousePlus />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
