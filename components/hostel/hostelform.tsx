"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hostelDetailsSchema, HostelDetailsValues } from "./schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { UploadCloud } from "lucide-react";

type HostelPayload = HostelDetailsValues & {
  images: any[];
  payment_type: string[];
  manager_id: string;
};

export function HostelDetailsForm() {
  //states variables
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [paymentType, setPaymentType] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // zod forms typing
  const form = useForm<HostelDetailsValues>({
    resolver: zodResolver(hostelDetailsSchema),
    defaultValues: {
      label: "",
      establishment_year: "",
      number_of_buildings: "",
      description: "",
      owner_name: "",
      owner_contact: "",
      price: "",
      city: "",
      manager_contact: "",
      manager_name: "",
    },
  });

  // images upload functionality
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Upload failed");
      setUploading(false);
      return;
    }

    const { urls } = await res.json();
    setImageUrls((prev) => [...prev, ...urls]);
    setUploading(false);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const fetchusers = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchusers();
    console.log(user);
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  // submit the forms to database
  const onSubmit = async (data: HostelDetailsValues) => {
    setSaving(true);
    const payload: HostelPayload = {
      ...data,
      label: data?.label.toLowerCase(),
      manager_id: user?.id,
      payment_type: paymentType,
      images: imageUrls,
    };

    // Insert into Supabase
    await supabase.from("hostels").insert([payload]).select("id").single();

    form.reset();
    setSaving(false);
    router.push("/hostel");
    toast.success("😊hostel was listed!🔥");
  };

  return (
    <Card className="shadow-lg shadow-miprimary">
      <CardHeader className="text-2xl font-bold text-center">
        <CardTitle>Hostel Information</CardTitle>
      </CardHeader>

      <CardContent className="">
        <form
          className="flex flex-col gap-4 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <Label className="text-lg py-2">Hostel Name *</Label>
            <Input
              placeholder="enter hostel name ,please always add either hostel or homestel."
              className="px-4 py-8  text-lg shadow-lg"
              {...form.register("label")}
            />
          </div>

          <div className="md:flex w-full gap-4 flex-grow">
            <div className="w-full">
              <Label className="text-lg py-2 capitalize">price *</Label>
              <Input
                placeholder="enter average pricing "
                className="px-4 py-8  text-lg shadow-lg"
                {...form.register("price")}
              />
              <div className="w-full"></div>

              <Label className="text-lg py-2">location *</Label>
              <Input
                placeholder="enter city where the hostel is located"
                className="px-4 py-8 text-lg shadow-lg"
                {...form.register("city")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-lg py-2">Estabilishment Year *</Label>
              <Input
                placeholder="year hostel was built"
                className="px-4 py-8 text-lg shadow-lg"
                {...form.register("establishment_year")}
              />
            </div>

            <div>
              <Label className="text-lg py-2">Buildings *</Label>
              <Input
                className="px-4 py-8 text-lg shadow-lg"
                placeholder="number of hostel with the same name"
                {...form.register("number_of_buildings")}
              />
            </div>
          </div>

          <div className="md:flex gap-4">
            <div className="w-full">
              <Label className="text-lg py-2 capitalize">
                manager's name *
              </Label>
              <Input
                placeholder="the name of the portal or manager"
                className="px-4 py-8 text-lg shadow-lg"
                {...form.register("manager_name")}
              />
            </div>
            <div className="w-full capitalize">
              <Label className="text-lg py-2">manager's contact *</Label>
              <Input
                placeholder="phone number of manager"
                className="px-4 py-8 text-lg shadow-lg"
                {...form.register("manager_contact")}
              />
            </div>
          </div>

          <div className="md:flex gap-4 items-center">
            <div className="w-full">
              <Label className="text-lg py-2">Owner's Name</Label>
              <Input
                placeholder="the name of  the  owner"
                className="px-4 py-8 text-lg shadow-lg"
                {...form.register("owner_name")}
              />
            </div>
            <div className="w-full">
              <Label className="text-lg py-2">Owner Contact</Label>
              <Input
                placeholder="the phone number of owner"
                className="px-4 py-8 text-lg shadow-lg"
                {...form.register("owner_contact")}
              />
            </div>
          </div>

          <div className="">
            <Label className="text-lg py-2">Hostel Images *</Label>
            <Input
              className="px-4 py-8 text-lg shadow-lg"
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleImageUpload}
            />

            {uploading && (
              <p className="text-sm text-muted-foreground mt-1 py-2">
                Uploading images…
              </p>
            )}

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {imageUrls.map((url, index) => (
                  <img
                    key={url + index}
                    src={url ?? "/logo.png"}
                    alt="Hostel"
                    className="h-24 w-full rounded object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="">
            <Label className="text-lg py-2">Description</Label>
            <Textarea
              placeholder="tell us a little about your hostel."
              className="px-4 py-8 text-lg shadow-lg"
              {...form.register("description")}
            />
          </div>

          <div className="py-3 text-lg">
            <p className="capitalize">
              select at least one payments type for the room .{" "}
            </p>
            <div className="shadow-lg  my-2 px-4 py-6 flex flex-col gap-2 text-lg">
              <Label>
                <input
                  type="checkbox"
                  checked={paymentType?.includes("yearly") ?? ""}
                  onChange={(e) => {
                    setPaymentType((prev: string[]) => {
                      if (e.target.checked) {
                        return [...prev, "yearly"];
                      }
                      return prev.filter((v) => v !== "yearly");
                    });
                  }}
                />
                yearly payments
              </Label>
              <Label>
                <input
                  type="checkbox"
                  checked={paymentType?.includes("semester") ?? ""}
                  onChange={(e) => {
                    setPaymentType((prev: string[]) => {
                      if (e.target.checked) {
                        return [...prev, "semester"];
                      }
                      return prev.filter((v) => v !== "semester");
                    });
                  }}
                />
                semester payments
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            disabled={uploading || saving}
            className="py-8 px-4 hover:bg-miaccent z- cursor-pointer text-lg bg-miaccent text-white flex items-center justify-center"
          >
            {saving ? "Saving..." : "Save Hostel"}
            <UploadCloud size={22} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
