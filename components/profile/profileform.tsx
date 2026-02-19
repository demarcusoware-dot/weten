"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, PlusCircle, Users } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import SuccessLogo from "../general/sucesslogo";
import { supabase } from "@/lib/supabase/client";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name is too short"),
  email: z.string(),
  from_country: z.string().optional(),
  contact: z.string().optional(),
  school: z.string().optional(),
  course: z.string().optional(),
  level: z.string().optional(),
  budget: z.string().optional(),
  bio: z.string().optional(),
  hostel_id: z.string().optional(),
});

type ProfileFormType = z.infer<typeof profileSchema>;

interface pageprops {
  profile?: any;
  id?: string;
}

export default function ProfileForm({ profile, id }: pageprops) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // zod form typing
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      from_country: "",
      contact: "",
      email: "",
      school: "",
      course: "",
      level: "",
      budget: "",
      bio: "",
      hostel_id: "",
    },
  });

  const onSubmit = async (values: ProfileFormType) => {
    // Insert hostel into Supabase
    setLoading((prev) => !prev);

    // updating the profile database for that particular users
    await supabase.from("profiles").update(values).eq("id", id);
    setLoading((prev) => !prev);
    setSuccess((prev) => !prev);
    form.reset();
    toast.success("😊profile was updated!🔥");
    redirect("/hostel");
  };
  useEffect(() => {
    if (!profile) return;

    form.reset({
      full_name: profile.full_name ?? "",
      from_country: profile.from_country ?? "",
      contact: profile.contact ?? "",
      school: profile.school ?? "",
      course: profile.course ?? "",
      level: profile.level ?? "",
      budget: profile.budget ?? "",
      bio: profile.bio ?? "",
      email: profile.email ?? "",
    });
  }, [profile, form]);

  return (
    <div className="md:p-8 w-full">
      {success ? (
        <SuccessLogo link="profile" />
      ) : (
        <div className="mt-20 shadow-miprimary p-4 bg-white shadow rounded-xl md:max-w-[80%] md:mx-auto">
          <h2 className="text-xl text-center text-misecondary tracking-wide font-semibold mb-4">
            Profile
          </h2>
          <Form {...form}>
            <div>
              {loading ? (
                <div>
                  <Loader2 className="" size={50} />
                </div>
              ) : (
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <FormField
                    name="full_name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            className="py-6 shadow-lg"
                            placeholder="Your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "from_country",
                      "contact",
                      "school",
                      "course",
                      "level",
                      "budget",
                    ].map((k) => (
                      <FormField
                        key={k}
                        name={k as keyof ProfileFormType}
                        control={form.control}
                        render={({ field }: any) => (
                          <FormItem>
                            <FormLabel>{k.replace("_", " ")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="py-6 shadow-lg" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* Bio */}
                  <FormField
                    name="bio"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself..."
                            {...field}
                            className="py-6 shadow-lg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Metadata (hidden UX power) */}

                  <Button className="w-full py-6 bg-miaccent tracking-wide hover:bg-miaccent hover:-translate-y-0.5 text-lg font-bold tracking-wide">
                    save profile
                    <PlusCircle />
                  </Button>
                </form>
              )}
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
