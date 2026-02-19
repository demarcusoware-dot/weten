import React from "react";
import ArtisticCounter from "./figures";

export default function ArtisticCounterDiv() {
  return (
    <div className="">
      <div className="max-w-[90%] mx-auto my-30  md:flex md:flex-col md:gap-8  md:space-y-5">
        <ArtisticCounter title="Hostels" number={500} />
        <ArtisticCounter title="Users" number={5000} />
        <ArtisticCounter title="Engagements" number={15000} />
      </div>
    </div>
  );
}
