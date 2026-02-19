"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000, bookings: 240 },
  { month: "Feb", revenue: 3000, bookings: 221 },
  { month: "Mar", revenue: 5000, bookings: 320 },
  { month: "Apr", revenue: 4780, bookings: 290 },
  { month: "May", revenue: 5890, bookings: 350 },
  { month: "Jun", revenue: 4390, bookings: 200 },
  { month: "Jul", revenue: 7490, bookings: 410 },
  { month: "Aug", revenue: 5400, bookings: 280 },
  { month: "Sep", revenue: 6100, bookings: 300 },
  { month: "Oct", revenue: 7000, bookings: 380 },
  { month: "Nov", revenue: 8000, bookings: 450 },
  { month: "Dec", revenue: 9000, bookings: 520 },
];

export default function RevenueBookingsChart() {
  return (
    <Card className="w-full rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50 col-span-full dark:from-neutral-900 max-w-[95%] mx-auto  shadow-lg shadow-miprimary dark:to-neutral-800 p-6">
      <CardContent className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Revenue & Bookings (Yearly Overview)
          </CardTitle>
        </CardHeader>
        <div className="h-[50vh] w-full">
          <ResponsiveContainer className="w-full " width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e5e7eb"
                className="dark:stroke-neutral-700"
              />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                className="dark:stroke-neutral-400"
              />
              <YAxis stroke="#6b7280" className="dark:stroke-neutral-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffffdd",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  backdropFilter: "blur(6px)",
                }}
                labelStyle={{ fontWeight: "600", color: "#111827" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ stroke: "#2563eb", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                dot={{ stroke: "#16a34a", strokeWidth: 2 }}
                stroke="#16a34a"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
