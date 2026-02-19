import { dashboardlinks } from "@/lib/constant";
import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full gap-0 ">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
