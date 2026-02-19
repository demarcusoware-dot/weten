"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsCard({
  title,
  description,
  total,
  buttonText = "View Details",
  buttonLink = "/",
  chartData = [],
  dataKey = "revenue",
}: any) {
  return (
    <Card className="  rounded-lg shadow-lg shadow-miprimary  object-contain  transition">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">{title}</CardTitle>
        <p className="text-lg text-center  mb-4">{total}</p>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {/* Total Revenue */}

        {/* Histogram Chart */}
        <div className=" w-full h-60 rounded-lg p-2">
          <ResponsiveContainer className="w-full" width="100%" height="100%">
            <BarChart
              className="bg-misecondary text-miprimary hover:bg-miprimary"
              data={chartData}
            >
              <XAxis dataKey="month" hide />
              <YAxis hide className="bg-miprimary text-xl" />
              <Tooltip labelClassName="rounded-lg" />
              <Bar
                dataKey={dataKey}
                className="text-miprimary text-m"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={buttonLink} className="w-full">
          <Button className="w-full  bg-miaccent py-6 capitalize hover:bg-miaccent cursor-pointer hover:-translate-y-0.5 hover:ease-out tracking-wide shadow-lg text-white font-bold ">
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
