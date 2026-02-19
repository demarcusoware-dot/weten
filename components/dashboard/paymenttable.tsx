"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data }: any = supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

      setPayments(data || []);
    };

    fetchPayments();
  }, []);

  return (
    <Card className="w-full col-span-full shadow-lg shadow-misecondary m-2 my-20 max-w-[95%] mx-auto rounded-2xl">
      <CardContent className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Paystack Payments Received
          </CardTitle>
        </CardHeader>
        <div className="rounded-lg border overflow-hidden w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Email</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-sm text-neutral-500"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              )}

              {payments.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.reference}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        p.status === "success" ? "default" : "destructive"
                      }
                    >
                      {p.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-medium">
                    GHS {p.amount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(p.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
