"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { subaccountSchema, SubaccountValues } from "@/components/hostel/schema";
import { WalletCards } from "lucide-react";
import { ghanaPaymentProviders } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function WalletForm() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const form = useForm<SubaccountValues>({
    resolver: zodResolver(subaccountSchema),
    defaultValues: {
      business_name: "Mastercard hostel",
      settlement_bank: "",
      account_number: "",
      provider_type: "mobile_money",
      percentage_charge: 1,
    },
  });

  useEffect(() => {
    // fetchs the user details
    const fetchuser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchuser();
  }, []);

  const onSubmit = async (data: SubaccountValues) => {
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const res: any = await fetch("/api/paystack/subaccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_name: data.business_name,
        settlement_bank: data.settlement_bank,
        account_number: data.account_number,
        provider_type: data.provider_type,
        percentage_charge: 1,
        owner_id: user.id,
      }),
    });
    const result = await res.json();
    console.log(result);

    if (!res.ok) {
      console.log("Subaccount creation failed");
      toast.error("❌ Could not create wallet");
    }
    // ✅ update hostel with subaccount_code
    await supabase
      .from("hostels")
      .update({ subaccount_code: result.subaccount_code })
      .eq("manager_id", user.id);

    toast.success("🎉 Wallet created successfully");
    form.reset();
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Create Paystack Wallet
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-8"
          >
            {/* Business Name */}
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      className="px-4 py-8 shadow-lg"
                      placeholder="Sunrise Hostel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Number */}
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      className="px-4 py-8 shadow-lg"
                      placeholder="10-digit number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="settlement_bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Settlement Method</FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value); // ✅ IMPORTANT

                      const provider = ghanaPaymentProviders.find(
                        (p) => p.code === value
                      );

                      if (provider) {
                        form.setValue("provider_type", provider.type);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="px-4 py-8 shadow-lg">
                        <SelectValue placeholder="Select bank or MoMo" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {ghanaPaymentProviders.map((p) => (
                        <SelectItem key={p.code} value={p.code}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full gap-2 py-7 text-lg hover:-translate-y-0.5 ease-out cursor-pointer bg-miaccent shadow-lg hover:bg-miaccent "
            >
              Create Wallet
              <WalletCards size={20} />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
