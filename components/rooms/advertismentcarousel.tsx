import React from "react";
import { Carousel, CarouselContent } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import AdvertisementBoard from "./advertismentcard";

interface advertisementprops {
  adverts: any;
  className?: string;
}

export default function AdvertisementCarousel(props: advertisementprops) {
  return (
    <div className={cn("", props.className)}>
      <Carousel
        className="w-full p-2 md:p-10 shadow-none"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="flex gap-4 p-4">
          {props.adverts?.map((item: any, index: number) => {
            return <AdvertisementBoard key={index} {...item} />;
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
