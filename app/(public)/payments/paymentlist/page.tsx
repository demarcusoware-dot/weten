"use client";

import PaymentCard from "@/components/payment/paymentscard";
import { supabase } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [payments, setPayments] = useState<any>(null);

  useEffect(() => {
    const fetchuser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      // use the user.id or profile id to get the list of payments
      // if(user?.id) return ;
      const { data, error: paymentError } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at");
    };
  }, []);

  return (
    <div className="mt-20 pt-8 md:max-w-[90%] md:mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <PaymentCard
              key={index}
              email="marcuoware@gmail.com"
              amount="500"
              created_at={"12-05-35"}
              className=""
            />
          );
        })}
      </div>
    </div>
  );
}
