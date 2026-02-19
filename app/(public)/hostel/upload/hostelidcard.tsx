"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowRightCircle,
  Footprints,
  Landmark,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface hostelcardprops {
  label: string;
  city: string;
  price: string;
  rating?: string;
  className?: string;
  images: any[];
  id: string;
}

export default function Hostelcard(props: hostelcardprops) {
  const router = useRouter();
  const price = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "code",
    maximumFractionDigits: 2,
  }).format(parseInt(props.price));
  const imageurl: any = props?.images[0];
  return (
    <Card className=" overflow-hidden p-0 shadow-lg shadow-misecondary ease-out   rounded-lg relative hover:scale-[1.02] transition-all cursor-pointer">
      <div className="h-[30vh] w-full max-w-full p-0 rounded-t-lg object-contain ">
        <Image
          src={imageurl ?? "/logo.png"}
          alt={props.label}
          width={800}
          height={800}
          className="object-cover h-[30vh] aspect-rect w-full rounded-t-lg"
        />
      </div>
      <CardContent className=" p-4 flex flex-col gap-4 rounded-b-lg w-full text-black  z-10 ">
        <div className="flex items-end gap-4 w-full justify-between relative ">
          <Badge className="p-0 text-white bg-miprimary shadow-lg text-base pr-3 uppercase absolute z-20 rounded-none -top-20 right-0">
            {props.rating && (
              <p className=" text-white font-medium bg-misecondary text-base text-white p-4 round-r-full">
                ⭐ {props.rating}
              </p>
            )}
            {parseInt(props.rating as string) >= 2.5
              ? "highly rated"
              : "premium"}
          </Badge>
        </div>

        <CardTitle className="text-2xl uppercase  font-extrabold tracking-wide  ">
          {props.label}
        </CardTitle>

        <CardDescription className="flex gap-2 tracking-wide  items-end w-full">
          <Footprints size={22} className="text-miprimary" />
          800 miles from main campus
          <span className="text-lg  capitalize"></span>
        </CardDescription>

        <CardDescription className=" font-sans flex gap-2  tracking-wide ">
          <MapPin className="text-miprimary" size={22} />
          <span className="text-lg capitalize ">{props.city}</span>
        </CardDescription>

        <CardDescription className=" flex gap-2  ">
          <Landmark size={22} className="text-miprimary" />
          <span className="text-lg">{price}</span>
        </CardDescription>

        <Button
          onClick={() => router.push(`/hostel/${props.id}`)}
          className=" w-full bg-miaccent/90 text-white cursor-pointer hover:bg-miaccent  tracking-wide hover:-translate-y-0.5 hover:shadow-misecondary hover:shadow-lg  px-6 py-6 duration-500 ease-out  capitalize text-lg font-extrabold shadow-lg  "
        >
          view
          <ArrowRightCircle size={40} />
        </Button>
      </CardContent>
    </Card>
  );
}
