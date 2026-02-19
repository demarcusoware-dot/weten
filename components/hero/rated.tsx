"use client";

import Hostelcard from "../hostel/hostecard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Rated() {
  // state variables
  const [isMobile, setIsMobile] = useState(false);
  const [ratedhostels, setRatedhostels] = useState<any>(null);

  useEffect(() => {
    // gets hostels with ratiing above 5
    const fetchratedhostels = async () => {
      const { data, error }: any = await supabase
        .from("hostels")
        .select("*")
        .gte("rating", 4.5)
        .limit(10);
      setRatedhostels(data);
    };
    // Detect screen size safely (no hydration error)
    fetchratedhostels();
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div id="top-rated" className="md:max-w-[95%] md:mx-auto my-30">
      <Carousel
        className="w-full p-2 md:p-10 shadow-none"
        plugins={
          isMobile
            ? [
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                }),
              ]
            : []
        }
      >
        <CarouselContent className="flex gap-4 p-4">
          {ratedhostels?.map((item: any, index: number) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3"
            >
              <Hostelcard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons (Desktop only) */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
