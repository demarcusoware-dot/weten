"use client";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

interface pageprops {
  created_by: string;
  created_at: string;
  to?: string;
}
export default function Roomlistcard({
  created_by,
  created_at,
  to,
}: pageprops) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchuser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", created_by)
        .single();
      setUser(data);
    };
  }, []);
  console.log(user);
  return (
    <div>
      <div>
        <Card>
          <CardContent>
            <div className="">
              <div></div>
              <CardTitle></CardTitle>
              <div></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
