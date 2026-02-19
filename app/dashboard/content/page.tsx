"use client";

import CreateNotifications from "@/components/dashboard/createnotifications";
import { HostelDetailsForm } from "@/components/hostel/hostelform";
import { HostelRoomForm } from "@/components/hostel/hostelroomform";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div className="p-6 md:p-16 mt-10">
      <div className="flex flex-col gap-8">
        <Button onClick={() => router.push("/payments")} className="">
          allow payments
        </Button>
        <CreateNotifications />
        <HostelDetailsForm />
        <HostelRoomForm />
      </div>
    </div>
  );
}
