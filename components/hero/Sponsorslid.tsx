import React from "react";
import SponsorSlider from "./sponsors";
import { sponsors } from "@/lib/constant";

export default function Sponsors() {
  return (
    <div className="">
      <SponsorSlider sponsors={sponsors} />
    </div>
  );
}
