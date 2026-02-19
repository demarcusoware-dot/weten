"use client";
import { Button } from "../ui/button";
import {
  BookOpenCheck,
  CheckCircle,
  ChevronDownCircle,
  ChevronLeftCircle,
  FootprintsIcon,
  Landmark,
  MapPin,
  MessageCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { toast } from "sonner";
import { currencyfunc } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import RoomDetailsCard from "../rooms/roomdetailscard";

interface idprops {
  hostel: any;
  hostelId: string;
}

export default function Idpagecomp({ hostel, hostelId }: idprops) {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const newPrice = currencyfunc(hostel?.price);
  const router = useRouter();
  const imagerul = hostel?.images[0];
  console.log(message);

  useEffect(() => {
    const fetchuser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser((prev: any) => user);

      // dfetch manager
      const { data, error: manError } = await supabase
        .from("hostels")
        .select("*")
        .eq("id", hostel?.hostel_id);
    };

    fetchuser();
  }, []);
  console.log(hostel);
  const sendreview = async () => {
    if (!hostel || !user) return;

    const { data, error } = await supabase.from("reviews").upsert({
      hostel_id: hostel.id,
      user_id: user.id,
      message: message.trim(),
    });

    setMessage("");
    toast.success("review sent!");
  };

  return (
    <div className="relative">
      <div className="max-w-full h-[60vh] relative  object-cover ">
        {/* <div className="w-full h-full absolute transparent  inset-0 bg-black/60 z-20" /> */}
        <Image
          src={imagerul ?? "/logo.png"}
          alt={hostel?.label ?? "hostel image"}
          width={800}
          height={500}
          className="w-full h-[60vh] object-cover"
        />
      </div>
      <Card className="relative p-0 shadow-none rounded-none h-full">
        <CardContent className="md:flex  gap-8 gap-4 p-4 ">
          <div className="flex flex-col gap-6 py-10  w-full">
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-4xl font-extrabold  uppercase  text-lg tracking-wide">
                {hostel?.label}
              </CardTitle>
              <Button
                variant={"outline"}
                onClick={() => router.push("/hostel")}
                className="text-lg title text-miaccent font-extrabold "
              >
                <ChevronLeftCircle className="text-lg " size={30} />
                Go back
              </Button>
            </div>

            <CardDescription className="text-lg flex gap-4 ">
              <MapPin />
              {hostel?.city}
            </CardDescription>

            <CardDescription className="flex text-lg gap-4">
              <Landmark />
              {newPrice}
            </CardDescription>
            <CardDescription className=" text-lg flex gap-4">
              <FootprintsIcon />1 mile from main campus
            </CardDescription>
            <CardDescription className="flex text-lg gap-4">
              {true ? (
                <>
                  <CheckCircle />
                  room available
                </>
              ) : (
                <>
                  <XCircle /> no more space
                </>
              )}
            </CardDescription>
          </div>
        </CardContent>
        <Link
          href={"#reviewform"}
          className="flex flex-col items-center jusity-center gap-4"
        >
          <p className="text-lg">add a review</p>
          <ChevronDownCircle className="text-miaccent" />
        </Link>
      </Card>

      <div className="grid grid-cols-2  gap-4 py-10 p-4  ">
        <Button
          onClick={() => router.push(`/bookings/${hostelId}`)}
          className="w-full py-6 text-lg bg-white hover:bg-FFFFAE hover:ease-out hover:-translate-y-0.5 capitalize text-miprimary  shadow-lg "
        >
          Book
          <BookOpenCheck />
        </Button>
        <Button
          onClick={() =>
            router.push(
              `/chat/${user.id}?roomName=${user?.id}&username=${user?.email}&to=${hostel?.manager_id}}`
            )
          }
          className="w-full py-6 hover:bg-miaccent cursor-pointer hover:ease-out hover:-translate-y-0.5  text-lg shadow-lg  bg-miaccent text-white"
        >
          Chat
          <MessageCircle />
        </Button>
      </div>

      {hostel?.rooms ? (
        <p className="text-center text-2xl text-miprimary font-bold  py-5">
          Rooms types and pricing
        </p>
      ) : (
        <p className="text-center text-2xl text-miprimary font-bold  py-5">
          you have no room pricing listed here.
        </p>
      )}
      <div className="flex flex-col gap-4 md:grid md:grid-col-2 lg:grid-cols-3 items-center md:max-w-[95%] md:mx-auto p-4 md:p-8 ">
        {hostel?.rooms &&
          hostel.rooms?.map((item: any, index: number) => {
            return <RoomDetailsCard key={index} {...item} />;
          })}
      </div>

      {/* <div className="p-4 md:p-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Add a Review</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.trim())}
              cols={500}
              className="shadow-lg p-8 col-span-[500] my-5 "
              placeholder="enter your review"
            />
            <Button
              onClick={sendreview}
              variant={"secondary"}
              className="bg-miaccent w-full  hover:bg-miaccent cursor-pointer py-6"
            >
              send a review
            </Button>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
