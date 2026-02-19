import { HostelRoomForm } from "@/components/hostel/hostelroomform";
import React from "react";

interface pageprops {
  params: {
    id: string;
  };
}

export default function page(props: pageprops) {
  return (
    <div>
      <HostelRoomForm />{" "}
    </div>
  );
}
