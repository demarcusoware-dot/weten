"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  title?: string;
  message: string;
  time: string;
  unread?: boolean;
  onClick?: () => void;
}

export default function NotificationCard({
  title,
  message,
  time,
  unread = false,
  onClick,
}: NotificationCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "shadow-lg shadow-misecondary cursor-pointer",
        unread && "border-l-4 border-blue-500 shadow-miprimary"
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        {/* Icon */}
        <div className="p-2 rounded-full bg-misecondary dark:bg-miprimary">
          <Bell size={40} className="w-10 h-10 text-white dark:text-white" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold tracking-wide">
              {title && title}
            </h3>
            <span className="text-xs text-neutral-500">{time && time}</span>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 truncate max-w-[250px]">
            {message}
          </p>
        </div>

        {/* Unread Dot */}
        {unread && (
          <span className="w-3 h-3 rounded-full bg-blue-600 shadow-md"></span>
        )}
      </CardContent>
    </Card>
  );
}
