"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  onImagesChange: (urls: string[]) => void;
}

export function HostelImagesForm({ onImagesChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileName = `${crypto.randomUUID()}-${file.name}`;

      const { error } = await supabase.storage
        .from("hostel-images")
        .upload(fileName, file);

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage
        .from("hostel-images")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    onImagesChange(uploadedUrls);
    setUploading(false);
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p className="text-sm">Uploading images...</p>}
    </div>
  );
}
