"use client";
import AnalyticsCard from "@/components/dashboard/analysiscard";
import RevenueBookingsChart from "./annulchart";
import PaymentsTable from "@/components/dashboard/paymenttable";

const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 900 },
  { month: "Apr", revenue: 2200 },
];

export default function Dashboard() {
  return (
    <div className="max-w-full flex flex-col gap-8 w-full">
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-8  gap-4 ">
        <AnalyticsCard
          title="Total Revenue"
          description="Revenue generated for the selected month"
          total="¢18,400"
          buttonText="Open Revenue Page"
          buttonLink="/dashboard/revenue"
          chartData={revenueData}
          dataKey="revenue"
        />

        <AnalyticsCard
          title="Total Bookings"
          description="Bookings completed this month"
          total="356"
          buttonText="Go to Bookings"
          buttonLink="/dashboard/bookings"
          chartData={[
            { month: "Jan", revenue: 40 },
            { month: "Feb", revenue: 70 },
            { month: "Mar", revenue: 55 },
            { month: "Apr", revenue: 90 },
          ]}
          dataKey="revenue"
        />
        <AnalyticsCard
          title="Total Chats"
          description="messaging completed this month"
          total="6000"
          buttonText="Go to chart"
          buttonLink="/dashboard/chat"
          chartData={[
            { month: "Jan", revenue: 1000 },
            { month: "Feb", revenue: 2000 },
            { month: "Mar", revenue: 550 },
            { month: "Apr", revenue: 910 },
          ]}
          dataKey="revenue"
        />
      </div>
      <RevenueBookingsChart />
      <PaymentsTable />
    </div>
  );
}
