"use client";
import React from "react";
import {
  CalendarIcon,
  MapPin,
  BedDouble,
  ArrowRightCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "../../lib/utils ";
import { useRouter } from "next/navigation";

interface searchprops {
  className?: string;
}

export default function SearchBtn(props: searchprops) {
  const [date, setDate] = React.useState<Date>();
  const router = useRouter();

  return (
    <div
      className={cn(
        "bg-micard  rounded-lg z-40 relative -top-20 max-w-[97%] md:max-w-[80%] mx-auto shadow-lg shadow-misecondary border p-4",
        props.className
      )}
    >
      {/* -------- City Select -------- */}
      <div>
        <label className="text-sm font-medium mb-1 block">City</label>
        <Select>
          <SelectTrigger className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accra">Accra</SelectItem>
            <SelectItem value="kumasi">Kumasi</SelectItem>
            <SelectItem value="takoradi">Takoradi</SelectItem>
            <SelectItem value="cape-coast">Cape Coast</SelectItem>
            <SelectItem value="tamale">Tamale</SelectItem>
            <SelectItem value="ho">Ho</SelectItem>
            <SelectItem value="koforidua">Koforidua</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* -------- Date Picker -------- */}
      <div className="flex flex-col  gap-4">
        <label className="text-sm font-medium mb-1 block">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>

      {/* -------- Room Type Select -------- */}
      <div className="py-4">
        <label className="text-sm font-medium mb-1 block">Room Type</label>
        <Select>
          <SelectTrigger className="w-full">
            <BedDouble className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 in room</SelectItem>
            <SelectItem value="2">2 in room</SelectItem>
            <SelectItem value="3">3 in room</SelectItem>
            <SelectItem value="4">4 in room</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* -------- Search Button -------- */}
      <div className="flex items-end">
        <Button
          onClick={() => router.push("/hostel")}
          className={
            "w-full h-11 shadow-lg px-6 py-6 text-white bg-miaccent/80 cursor-pointer font-bold tracking-wide hover:-translate-y-0.5 duration-500 ease-out font-semibold text-md hover:bg-miaccent  "
          }
        >
          Book a Room
          <ArrowRightCircle />
        </Button>
      </div>
    </div>
  );
}
