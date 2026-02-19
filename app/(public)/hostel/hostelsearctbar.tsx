"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export interface Hostel {
  id: string;
  name: string;
  type: string; // e.g., "Apartment", "Hostel"
  price: number;
  roomKind: number; // 1,2,3,4...
}

interface HostelSearchProps {
  hostels: Hostel[];
}

export default function HostelSearch({ hostels }: HostelSearchProps) {
  const [query, setQuery] = useState("");

  // Filter hostels based on query
  const filteredHostels = useMemo(() => {
    if (!hostels) return;
    const lower = query.toLowerCase();

    return hostels.filter((hostel) => {
      const matchesName = hostel.name.toLowerCase().includes(lower);
      const matchesType = hostel.type.toLowerCase().includes(lower);
      const matchesPrice = hostel.price.toString().includes(lower);
      const matchesRoom = hostel.roomKind.toString().includes(lower);

      return matchesName || matchesType || matchesPrice || matchesRoom;
    });
  }, [query]);

  return (
    <div className="w-full my-10 mx-auto space-y-4">
      {/* Search input */}
      <div className=" w-full flex gap-2">
        <Input
          placeholder="Search by name, type, price, or room kind..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" w-full py-6"
        />
        <Button className="py-6  bg-miaccent capitalize font-bold text-lg ">
          {" "}
          <PlusCircle /> search
        </Button>
      </div>
    </div>
  );
}
