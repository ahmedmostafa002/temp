"use client";

import { Card, CardBody, Chip } from "@nextui-org/react";
import { Download } from "lucide-react";
import type { Message } from "@/types"; // Updated import path

interface EmailListItemProps {
  message: Message;
  onPress: () => void;
}

// Helper function (can be moved to a utils file if used elsewhere)
const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

export default function EmailListItem({ message, onPress }: EmailListItemProps) {
  return (
    <Card
      isPressable
      onPress={onPress}
      className={`w-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/50 ${
        !message.isRead ? "border-primary-400 bg-primary-50/30 dark:bg-primary-900/10" : "bg-content1"
      }`}
      shadow="sm"
    >
      <CardBody className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              {!message.isRead && (
                <Chip size="sm" color="primary" variant="flat" className="h-5 text-xs">
                  New
                </Chip>
              )}
              <span className="text-sm font-semibold truncate text-foreground">
                {message.from}
              </span>
            </div>
            <p className="text-sm truncate text-foreground-700 mb-0.5">
              {message.subject}
            </p>
          </div>
          <div className="flex flex-col items-end text-xs text-foreground-500">
            <span>{formatTimeAgo(message.timestamp)}</span>
            {message.hasAttachments && (
              <Download className="h-3.5 w-3.5 mt-1 text-foreground-400" />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
