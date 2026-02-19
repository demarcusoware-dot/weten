import Sidebar from "@/components/dashboard/sidebar";
import { adminlinks } from "@/lib/constant";
import AdminSidebar from "./adminsidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex gap-4 w-full min-h-screen">
        <AdminSidebar links={adminlinks} />
        <div className="flex-grow w-full ml-16 md:ml-50">{children}</div>
      </div>
    </>
  );
}
