"use client";
import { amenities } from "@/components/hero/info";
import Idpagecomp from "@/components/hostel/idpagecomp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ratedhostels } from "@/lib/constant";
import { supabase } from "@/lib/supabase/client";
import { currencyfunc } from "@/lib/utils";
import {
  BookOpenCheck,
  CheckCircle,
  ChevronLeftCircle,
  FootprintsIcon,
  Landmark,
  MapPin,
  MessageCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [hostel, setHostel] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchhostel = async () => {
      const { data, error } = await supabase
        .from("hostels")
        .select("*")
        .eq("id", id)
        .single();
      setHostel(data);
    };
    fetchhostel();
  }, [id]);

  return (
    <div className="">
      <Idpagecomp hostel={hostel} hostelId={id} />
    </div>
  );
}
