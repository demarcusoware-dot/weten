"use client";
import { cn, currencyfunc } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";

interface roomprops {
  hostel_name: string;
  image: { publicUrl: string };
  room_type: string;
  available_rooms?: string;
  className?: string;
  price: string;
}

function RoomDetailsCard(props: roomprops) {
  console.log(props);
  return (
    <div
      className={cn("rounded-lg shadow-lg shadow-miprimary ", props.className)}
    >
      <Card className="p-0 rounded-lg">
        <CardContent className="flex flex-col p-0 w-full rounded-lg">
          <div className="aspect-rect object-contain max-w-full ">
            <Image
              src={props.image.publicUrl ?? "/logo.png"}
              alt="roomsdetails pics"
              width={500}
              height={500}
              className="object-cover w-full h-auto rounded-t-lg"
            />
          </div>

          <div className="rounded-b-lg z-10 p-4">
            <div className="text-lg  flex  items-center justify-between gap-4 space-y-5">
              <h3 className="capitalize text-lg">room type</h3>
              <CardDescription className="text-miprimary text-lg font-bold">
                {props?.room_type}
              </CardDescription>
            </div>

            <div className="text-lg flex  items-center justify-between gap-4">
              <h3 className="capitalize text-lg">pricing </h3>
              <CardDescription className="text-miprimary text-lg font-bold">
                {currencyfunc(props?.price)}
              </CardDescription>
            </div>
            {false && (
              <div className="text-lg flex  items-center justify-between gap-4">
                <h3 className="capitalize">available rooms</h3>
                <CardDescription>{props?.available_rooms}</CardDescription>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RoomDetailsCard;
