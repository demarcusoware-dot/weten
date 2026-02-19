"use client";

import Image from "next/image";

interface Sponsor {
  imageUrl: string;
  name: string;
}

interface SponsorSliderProps {
  sponsors: Sponsor[];
  speed?: number; // seconds
}

export default function SponsorSlider({
  sponsors,
  speed = 20,
}: SponsorSliderProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-max mx-auto gap-10 animate-[slide_linear_infinite]"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div key={index} className="flex items-center gap-3 shrink-0">
            <Image
              src={sponsor.imageUrl}
              alt={sponsor.name}
              width={100}
              height={100}
              className=" w-100 h-30 object-contain"
            />
          </div>
        ))}
      </div>

      {/* inline keyframes via Tailwind */}
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
