"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Loader2, PlusCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import SuccessLogo from "../general/sucesslogo";
import { useRouter } from "next/navigation";

const bookingSchema = z.object({
  hostel_name: z.string().min(2, "Hostel name is required"),
  applicant_name: z.string(),
  report_date_start: z.string().min(1, "Start date is required"),
  report_date_end: z.string().optional(),
  payment_type: z.enum(["semester", "yearly"]),
  price: z.string(),
});
interface pageprops {
  hostel?: any;
  profile?: any;
  booking?: any;
}
type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm(props: pageprops) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      hostel_name: "",
      report_date_start: "",
      report_date_end: "",
      payment_type: "semester",
      price: "",
      applicant_name: "",
    },
  });

  useEffect(() => {
    if (!props?.booking) return;
    form.reset({
      hostel_name: props.booking.hostel_name ?? "",
      price: props.booking.price ?? "",
      applicant_name: props.booking.applicant_name ?? "",
      payment_type: props.booking.payment_type ?? "",
      report_date_end: props.booking.report_date_end ?? "",
      report_date_start: props.booking.report_date_start ?? "",
    });
  }, [props?.booking, form]);

  useEffect(() => {
    if (!props?.hostel || !props?.profile) return;
    form.reset({
      hostel_name: props.hostel.label ?? "",
      price: props.hostel.price ?? "",
      applicant_name: props.profile.full_name ?? "",
    });
  }, [props?.hostel, props?.profile, form]);

  const onSubmit = async (values: BookingFormValues) => {
    if (!props?.booking) {
      if (!props?.hostel || !props?.profile) return;
      const { data, error } = await supabase.from("hostel_bookings").insert({
        hostel_id: props.hostel.id,
        student_id: props.profile.id,
        hostel_name: props.hostel.label,
        price: props.hostel.price,
        contact: props.profile.contact,
        course: props.profile.course,
        applicant_name: props.profile.full_name,
        report_date_start: values.report_date_start,
        report_date_end: values.report_date_end,
        payment_type: values.payment_type,
      });
    } else {
      // update the booking
      await supabase
        .from("hostel_bookings")
        .update(values)
        .eq("id", props.booking.id);
    }

    setLoading(false);
    setSuccess(true);
    router.push("/bookings");
  };

  return (
    <div className=" md:max-w-[85%] md:mx-auto p-6 bg-white  border rounded-lg shadow-lg">
      {success ? (
        <SuccessLogo link="bookings" />
      ) : (
        <div>
          {loading ? (
            <div>
              <Loader2 className="" size={50} />
            </div>
          ) : (
            <div className="space-y-12">
              <h2 className="text-xl text-miprimary text-center font-semibold mb-6">
                Make Hostel Booking
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 gap-5"
                >
                  {/* Hostel Name */}
                  <FormField
                    name="hostel_name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostel Name</FormLabel>
                        <FormControl>
                          <Input disabled {...field} className="py-6" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*applicant Name */}
                  <FormField
                    name="applicant_name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Applicant Name</FormLabel>
                        <FormControl>
                          <Input disabled {...field} className="py-6" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Date */}
                  <FormField
                    name="report_date_start"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="py-6" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date */}
                  <FormField
                    name="report_date_end"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date (optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="py-6" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* Payment Type */}
                  <FormField
                    name="payment_type"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="py-6 border rounded w-full"
                          >
                            <option value="semester">Semester</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    name="price"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (GHS)</FormLabel>
                        <FormControl>
                          <Input disabled {...field} className="py-6" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full py-6 text-lg  cursor-pointer bg-miaccent hover:bg-miaccent/90 flex items-center justify-center gap-2"
                  >
                    {props?.booking ? "update booking" : "Submit booking"}{" "}
                    <PlusCircle size={20} />
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
